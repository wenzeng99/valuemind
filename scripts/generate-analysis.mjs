#!/usr/bin/env node
/**
 * generate-analysis.mjs — AI-powered stock analysis generator
 *
 * Reads raw data from data/*.json, calls Claude API to generate
 * structured analysis, outputs data/stock-analysis.json + data/daily-recap.json
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/generate-analysis.mjs [--force]
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const FORCE = process.argv.includes('--force');

const ALL_TICKERS = [
  'NVDA', 'AAPL', 'MSFT', 'COST', 'GOOGL', 'AMZN', 'META', 'TSM',
  'BRK-B', 'BABA', 'AMD', 'CVX', 'COIN', 'CRM', 'UNH', 'XOM',
];

// --- Helpers ---
async function readJSON(filename) {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, filename), 'utf-8');
    return JSON.parse(raw);
  } catch { return null; }
}

function fmtPct(v) { return v != null ? (v > 0 ? '+' : '') + (v * 100).toFixed(1) + '%' : '—'; }
function fmtRatio(v, suffix = 'x') { return v != null ? v.toFixed(1) + suffix : '—'; }
function fmtNum(v) {
  if (v == null) return '—';
  const abs = Math.abs(v);
  if (abs >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${v.toLocaleString()}`;
}

// --- Compute mechanical fields from raw stock-details data ---
function computeMechanicalFields(sd) {
  if (!sd) return {};
  return {
    exchange: sd.sector ? (sd.sector.includes('Technology') ? 'NASDAQ' : 'NYSE') : '—',
    peFwd: sd.forwardPE != null ? fmtRatio(sd.forwardPE) : '—',
    peg: sd.peg != null ? sd.peg.toFixed(2) : '—',
    evEbitda: sd.evEbitda != null ? fmtRatio(sd.evEbitda) : '—',
    ps: sd.ps != null ? fmtRatio(sd.ps) : '—',
    grossMargin: sd.grossMargin != null ? (sd.grossMargin * 100).toFixed(1) + '%' : '—',
    netMargin: sd.netMargin != null ? (sd.netMargin * 100).toFixed(1) + '%' : '—',
    roe: sd.roe != null ? (sd.roe * 100).toFixed(0) + '%' : '—',
    fcfYield: sd.fcfYield != null ? (sd.fcfYield * 100).toFixed(1) + '%' : '—',
    divYield: sd.divYield != null ? (sd.divYield * 100).toFixed(2) + '%' : '—',
    revGrowth: sd.revenueGrowth != null ? fmtPct(sd.revenueGrowth) : '—',
    epsEst: sd.eps != null ? `$${sd.eps.toFixed(2)}` + (sd.epsForward ? ` → fwd $${sd.epsForward.toFixed(2)}` : '') : '—',
    dataCenterRev: '—', // AI will fill context-specific
  };
}

// --- Build context string for one stock ---
function buildStockContext(symbol, sd, stockNews, marketData) {
  const parts = [`=== ${symbol} ===`];

  if (sd) {
    parts.push(`Price: $${sd.price} | Change: ${sd.change}%`);
    parts.push(`Market Cap: ${sd.marketCap} (raw: ${sd.marketCapRaw})`);
    parts.push(`Sector: ${sd.sector || '?'} | Industry: ${sd.industry || '?'}`);
    parts.push(`PE: ${sd.pe?.toFixed(1) || '?'} | Forward PE: ${sd.forwardPE?.toFixed(1) || '?'} | PEG: ${sd.peg?.toFixed(2) || '?'}`);
    parts.push(`EV/EBITDA: ${sd.evEbitda?.toFixed(1) || '?'} | P/S: ${sd.ps?.toFixed(1) || '?'}`);
    parts.push(`Gross Margin: ${sd.grossMargin ? (sd.grossMargin * 100).toFixed(1) + '%' : '?'}`);
    parts.push(`Net Margin: ${sd.netMargin ? (sd.netMargin * 100).toFixed(1) + '%' : '?'}`);
    parts.push(`ROE: ${sd.roe ? (sd.roe * 100).toFixed(1) + '%' : '?'}`);
    parts.push(`EPS: $${sd.eps || '?'} | Forward EPS: $${sd.epsForward || '?'}`);
    parts.push(`Revenue Growth: ${sd.revenueGrowth ? (sd.revenueGrowth * 100).toFixed(1) + '%' : '?'}`);
    parts.push(`FCF Yield: ${sd.fcfYield ? (sd.fcfYield * 100).toFixed(1) + '%' : '?'}`);
    parts.push(`Div Yield: ${sd.divYield ? (sd.divYield * 100).toFixed(2) + '%' : '?'}`);
    parts.push(`52wk: $${sd.fiftyTwoWeekLow} - $${sd.fiftyTwoWeekHigh}`);
    parts.push(`Cash: ${fmtNum(sd.cashPosition)} | Debt: ${fmtNum(sd.totalDebt)} | D/E: ${sd.debtToEquity?.toFixed(2) || '?'} | Current Ratio: ${sd.currentRatio?.toFixed(2) || '?'}`);
    parts.push(`Beta: ${sd.beta?.toFixed(2) || '?'}`);

    if (sd.earningsData) {
      const e = sd.earningsData;
      parts.push(`\n--- Latest Quarterly Earnings (${e.quarter || '?'}) ---`);
      parts.push(`Revenue: ${e.revenueFmt || fmtNum(e.revenue)} | YoY: ${e.revenueYoY != null ? e.revenueYoY + '%' : '?'}`);
      parts.push(`Net Income: ${fmtNum(e.netIncome)} | YoY: ${e.netIncomeYoY != null ? e.netIncomeYoY + '%' : '?'}`);
      parts.push(`Gross Margin (Q): ${e.grossMarginQ != null ? e.grossMarginQ + '%' : '?'}`);
      parts.push(`Net Margin (Q): ${e.netMarginQ != null ? e.netMarginQ + '%' : '?'}`);
      parts.push(`FCF: ${e.fcfFmt || fmtNum(e.freeCashFlow)} | FCF Margin: ${e.fcfMarginQ != null ? e.fcfMarginQ + '%' : '?'}`);
      parts.push(`EBITDA: ${fmtNum(e.ebitda)} | Capex: ${fmtNum(e.capex)}`);
    }
  }

  if (stockNews?.[symbol]?.length > 0) {
    parts.push(`\n--- Recent News ---`);
    stockNews[symbol].slice(0, 5).forEach(n => {
      parts.push(`• [${n.signal || 'neutral'}] ${n.title} (${n.source})`);
    });
  }

  return parts.join('\n');
}

// --- JSON Schema for Claude output ---
const STOCK_ANALYSIS_SCHEMA = `{
  "desc": { "zh": "一句话描述公司主营业务", "en": "One-sentence business description" },
  "dataCenterRev": "核心业务收入 (e.g., 'Services $26.3B (+14%)')",
  "valuationPctl": 0-100的估值百分位数(0=极度便宜, 100=极度昂贵),
  "summary": {
    "zh": "3-4句话的AI分析摘要，包含关键数据和投资逻辑",
    "en": "3-4 sentence AI analysis summary with key data and investment thesis"
  },
  "verdict": { "zh": "一句话判决 (e.g., '买入 — 理由')", "en": "One-line verdict" },
  "verdictColor": "text-green 或 text-yellow 或 text-red",
  "questions": {
    "zh": [
      { "status": "positive/uncertain/negative", "q": "10年后还赚钱？ — 是/否/不确定", "a": "1-2句分析" },
      { "status": "...", "q": "赚得更多？ — ...", "a": "..." },
      { "status": "...", "q": "护城河？ — ...", "a": "..." }
    ],
    "en": [同样结构的英文版]
  },
  "crossVal": {
    "zh": [
      { "name": "DYP", "color": "green/yellow/red", "verdict": "简短判定", "q": "1-2句话模拟段永平视角" },
      { "name": "Buffett", "color": "green/yellow/red", "verdict": "简短判定", "q": "1-2句话模拟巴菲特视角" },
      { "name": "Munger", "color": "green/yellow/red", "verdict": "简短判定", "q": "1-2句话模拟芒格视角" }
    ],
    "en": [同样结构的英文版]
  },
  "earnings": {
    "quarter": "如 'FY2025 Q4' 或 'Q1 2025'",
    "reportDate": "YYYY-MM-DD",
    "zh": {
      "revenue": { "val": "$39.3B", "yoy": "+78%", "beat": "超预期$1.8B 或 符合预期", "note": "关键驱动因素" },
      "eps": { "val": "$0.89", "yoy": "+71%", "beat": "超预期$0.05", "note": "连续X季度超预期等" },
      "fcf": { "val": "$16.8B", "margin": "42.7%", "trend": "↑ 或 ↓ 或 →", "note": "同比变化+原因" },
      "grossMargin": { "val": "73.0%", "trend": "↑ 或 ↓ 或 →", "note": "变化原因" },
      "guidance": "管理层对下季度的指引",
      "highlight": "核心看点，1-2句话",
      "risk": "风险信号，1-2句话"
    },
    "en": {同样结构的英文版}
  },
  "financialHealth": {
    "zh": {
      "cashPosition": "现金 vs 债务描述",
      "debtToEquity": "D/E比率 + 评价",
      "currentRatio": "流动比率 + 评价",
      "capex": "资本开支情况",
      "buyback": "回购和分红情况",
      "summary": "2-3句话总结财务健康度"
    },
    "en": {同样结构}
  },
  "moat": {
    "duan": {
      "zh": { "score": "强/中/弱 + 时间范围", "analysis": "2-3句话段永平视角的护城河分析", "moatType": "护城河类型", "risk": "主要风险" },
      "en": {同样结构}
    },
    "buffett": {
      "zh": { "score": "...", "analysis": "巴菲特视角", "moatType": "...", "risk": "..." },
      "en": {同样结构}
    },
    "munger": {
      "zh": { "score": "...", "analysis": "芒格视角（用反转思维）", "moatType": "...", "risk": "..." },
      "en": {同样结构}
    }
  },
  "valuation": {
    "zh": {
      "dcf": { "value": "$145-165", "method": "DCF方法描述", "note": "关键假设" },
      "peerComp": { "value": "$160-190", "method": "同行对比方法", "note": "对比要点" },
      "grahamMargin": "当前价格 vs DCF的安全边际描述",
      "verdict": "估值总结判断"
    },
    "en": {同样结构}
  }
}`;

const SYSTEM_PROMPT = `你是ValueMind的AI分析引擎，一位同时精通中英文的资深价值投资分析师。你需要为每只股票生成结构化的投资分析JSON。

分析必须包含三位投资大师的视角：
1. **DYP（段永平）**：中国最成功的价值投资者。关注：生意模式是否简单？现金流是否强劲？管理层是否诚实？是否在能力圈内？核心原则："不懂不做"，"买股票就是买公司"。风格务实直接。
2. **Buffett（巴菲特）**：关注护城河持久性（10-20年视角）、能力圈（不懂的不碰）、安全边际（好价格买好公司）。关注消费品、金融、能力圈内的简单商业模式。
3. **Munger（芒格）**：反转思维大师。先思考"什么会让这家公司失败？"，用多元思维模型分析。关注避免愚蠢而非追求聪明。语言犀利幽默。

关键原则：
- 所有数据和数字必须基于提供的财务数据，不要编造
- 估值判断要基于实际PE/PEG/FCF等指标
- verdict颜色：text-green（看好/便宜），text-yellow（中性/等待），text-red（看空/太贵）
- valuationPctl：基于PE在历史和同行中的百分位（0=极便宜，100=极贵）
- earnings数据必须基于提供的最新季度财报数据

你必须输出**纯JSON**，不要包含任何markdown标记或额外文字。`;

const RECAP_SYSTEM_PROMPT = `你是ValueMind的每日市场分析引擎。根据提供的市场数据和新闻，生成每日市场速递的信号墙数据。

为三位大师各生成3-5个信号卡片。每个信号分三类：
- green（看得懂的机会）：确定性高、能力圈内、估值合理的机会
- yellow（能力圈边界）：有潜力但不确定性高或能力圈边缘的标的
- red（不碰清单）：高风险、看不懂、或明显高估的标的

信号应该基于最新的市场数据和新闻，而不是通用建议。包含具体的股票代码（tk字段）。

输出纯JSON，schema如下：
{
  "date": "YYYY-MM-DD",
  "marketSummary": { "zh": "2-3句市场总结", "en": "2-3 sentence market summary" },
  "signals": {
    "duan": [
      { "type": "green/yellow/red", "cat": "分类标签", "title": "信号标题", "tk": "SYMBOL", "q": "1-2句大师风格语录" }
    ],
    "buffett": [...],
    "munger": [...]
  }
}`;

// --- Claude API ---
async function callClaude(client, systemPrompt, userPrompt, maxTokens = 4096) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });
  const text = response.content[0]?.text || '';
  // Extract JSON from response (handle potential markdown wrapping)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  return JSON.parse(jsonMatch[0]);
}

// --- Check if analysis needs regeneration ---
function needsRegeneration(existing, sd) {
  if (FORCE) return true;
  if (!existing) return true;
  if (!existing._generatedAt) return true;

  const age = Date.now() - new Date(existing._generatedAt).getTime();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  if (age > sevenDays) return true;

  // Price moved significantly
  if (sd?.price && existing._price) {
    const priceDelta = Math.abs(sd.price - existing._price) / existing._price;
    if (priceDelta > 0.05) return true; // >5% price change
  }

  return false;
}

// --- Generate analysis for one stock ---
async function generateStockAnalysis(client, symbol, sd, stockNews, marketData) {
  const context = buildStockContext(symbol, sd, stockNews, marketData);
  const userPrompt = `为 ${symbol} 生成投资分析。

当前财务数据和最新消息：
${context}

请严格按照以下JSON schema输出：
${STOCK_ANALYSIS_SCHEMA}

注意：
1. 所有数字必须基于上面提供的实际数据
2. earnings部分的数据必须基于提供的季度财报数据
3. 如果某些数据缺失，用合理推断并标注
4. valuation.dcf的估值范围要基于合理的DCF假设（10yr，WACC 8-12%）`;

  const analysis = await callClaude(client, SYSTEM_PROMPT, userPrompt, 5000);

  // Merge mechanical fields
  const mechanical = computeMechanicalFields(sd);
  return {
    ...mechanical,
    ...analysis,
    // Override mechanical fields only if AI didn't provide better ones
    exchange: analysis.exchange || mechanical.exchange,
    _generatedAt: new Date().toISOString(),
    _price: sd?.price || null,
  };
}

// --- Generate daily recap ---
async function generateDailyRecap(client, marketData, newsData, stockDetails, fearGreed) {
  const parts = ['=== Market Data ==='];

  if (marketData?.indices) {
    parts.push('Indices:');
    marketData.indices.forEach(i => parts.push(`  ${i.symbol} ${i.name}: ${i.price} (${i.change > 0 ? '+' : ''}${i.change}%)`));
  }
  if (marketData?.macro) {
    parts.push('Macro:');
    marketData.macro.forEach(m => parts.push(`  ${m.symbol} ${m.name}: ${m.price} (${m.change > 0 ? '+' : ''}${m.change}%)`));
  }
  if (fearGreed) {
    parts.push(`Fear & Greed: ${fearGreed.value} (${fearGreed.label}) | VIX: ${fearGreed.vix}`);
  }

  // Top movers from watchlist
  if (stockDetails) {
    parts.push('\nWatchlist:');
    Object.entries(stockDetails).forEach(([sym, sd]) => {
      parts.push(`  ${sym}: $${sd.price} (${sd.change > 0 ? '+' : ''}${sd.change}%) PE:${sd.pe?.toFixed(1) || '?'} GM:${sd.grossMargin ? (sd.grossMargin * 100).toFixed(1) + '%' : '?'}`);
    });
  }

  if (newsData?.length > 0) {
    parts.push('\nLatest News:');
    newsData.slice(0, 10).forEach(n => parts.push(`  • [${n.sentiment}] ${n.title} (${n.source})`));
  }

  const userPrompt = `今天是 ${new Date().toISOString().split('T')[0]}。

根据以下市场数据和新闻，生成今日的信号墙数据：
${parts.join('\n')}

为三位大师（duan, buffett, munger）各生成4个信号（至少1个green、1个yellow、1个red）。
信号要基于实际的市场数据和新闻，包含具体股票代码。
输出纯JSON。`;

  return await callClaude(client, RECAP_SYSTEM_PROMPT, userPrompt, 4096);
}

// --- Main ---
async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('Error: ANTHROPIC_API_KEY environment variable required');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  console.log('Loading data files...');
  const [stockDetails, stockNews, newsData, marketData, fearGreed, existingAnalysis] = await Promise.all([
    readJSON('stock-details.json'),
    readJSON('stock-news.json'),
    readJSON('news.json'),
    readJSON('market.json'),
    readJSON('fear-greed.json'),
    readJSON('stock-analysis.json'),
  ]);

  if (!stockDetails || Object.keys(stockDetails).length === 0) {
    console.error('Error: stock-details.json is empty or missing. Run fetch-data.mjs first.');
    process.exit(1);
  }

  // === Phase 1: Generate per-stock analysis ===
  console.log(`\nGenerating stock analysis (${FORCE ? 'FORCE' : 'incremental'})...`);
  const analysis = existingAnalysis || {};
  let generated = 0, skipped = 0;

  for (const symbol of ALL_TICKERS) {
    const sd = stockDetails[symbol];
    if (!sd) {
      console.log(`  ⚠ ${symbol}: no stock details, skipping`);
      skipped++;
      continue;
    }

    if (!needsRegeneration(analysis[symbol], sd)) {
      console.log(`  ⏭ ${symbol}: up-to-date (generated ${analysis[symbol]._generatedAt})`);
      skipped++;
      continue;
    }

    try {
      console.log(`  🔄 ${symbol}: generating analysis...`);
      analysis[symbol] = await generateStockAnalysis(client, symbol, sd, stockNews, marketData);
      generated++;
      console.log(`  ✓ ${symbol}: done`);
    } catch (e) {
      console.error(`  ✗ ${symbol}: ${e.message}`);
      // Keep existing analysis if available
      if (!analysis[symbol]) {
        analysis[symbol] = { ...computeMechanicalFields(sd), _error: e.message, _generatedAt: new Date().toISOString() };
      }
    }

    // Rate limit delay
    if (generated < ALL_TICKERS.length) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  await fs.writeFile(path.join(DATA_DIR, 'stock-analysis.json'), JSON.stringify(analysis, null, 2));
  console.log(`\n✓ stock-analysis.json (${generated} generated, ${skipped} skipped)`);

  // === Phase 2: Generate daily recap ===
  console.log('\nGenerating daily recap...');
  try {
    const recap = await generateDailyRecap(client, marketData, newsData, stockDetails, fearGreed);
    await fs.writeFile(path.join(DATA_DIR, 'daily-recap.json'), JSON.stringify(recap, null, 2));
    console.log('✓ daily-recap.json');
  } catch (e) {
    console.error('✗ daily-recap.json failed:', e.message);
  }

  console.log('\nDone!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
