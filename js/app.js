// ========== ValueMind — Main App ==========
import { translations, setLang, t, getLang } from './i18n.js';
import { generateCandleData, renderCandlestickChart } from './chart.js';
import { stockAnalysis } from './stock-analysis-data.js';

// ========== State ==========
let marketData = null;
// cryptoData removed — app focuses on US equities only
let newsData = null;
let fearGreedData = null;
let metaData = null;
let stockDetailsData = null;
let currentMaster = { signal: 'duan', deep: 'duan' };
let currentDeepTab = 'overview';

// Default analysis template for stocks without specific data
function getDefaultAnalysis(symbol, stock) {
  const lang = getLang();
  return {
    exchange: '—',
    revGrowth: '—', epsEst: '—', grossMargin: '—', dataCenterRev: '—',
    peFwd: stock?.pe ? stock.pe + 'x' : '—', peg: '—', evEbitda: '—', ps: '—',
    netMargin: '—', roe: '—', fcfYield: '—', divYield: '—',
    valuationPctl: 50,
    summary: {
      zh: `${symbol}的详细分析数据暂未收录。当前市价 $${stock?.price?.toFixed(2) || '—'}，涨跌幅 ${stock?.change?.toFixed(2) || '—'}%。请在Watchlist中查看更多信息。`,
      en: `Detailed analysis for ${symbol} is not yet available. Current price $${stock?.price?.toFixed(2) || '—'}, change ${stock?.change?.toFixed(2) || '—'}%. Check Watchlist for more info.`,
    },
    verdict: { zh: '暂无评级', en: 'Not rated' },
    verdictColor: 'text-muted',
    questions: {
      zh: [
        { status: 'uncertain', q: '10年后还赚钱？ — 待分析', a: '需要更多数据来判断。' },
        { status: 'uncertain', q: '赚得更多？ — 待分析', a: '需要更多数据来判断。' },
        { status: 'uncertain', q: '护城河？ — 待分析', a: '需要更多数据来判断。' },
      ],
      en: [
        { status: 'uncertain', q: 'Profitable in 10yr? — TBD', a: 'More data needed.' },
        { status: 'uncertain', q: 'Earning more? — TBD', a: 'More data needed.' },
        { status: 'uncertain', q: 'Moat? — TBD', a: 'More data needed.' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'yellow', verdict: '待分析', q: '需要更多研究来判断。' },
        { name: 'Buffett', color: 'yellow', verdict: '待评估', q: '未在能力圈范围内深入分析。' },
        { name: 'Munger', color: 'yellow', verdict: '观察中', q: '需要反转思维分析风险。' },
      ],
      en: [
        { name: 'DYP', color: 'yellow', verdict: 'TBD', q: 'More research needed.' },
        { name: 'Buffett', color: 'yellow', verdict: 'Not assessed', q: 'Not yet analyzed within circle of competence.' },
        { name: 'Munger', color: 'yellow', verdict: 'Watching', q: 'Need inversion analysis on risks.' },
      ],
    },
    earnings: null,
    financialHealth: null,
    moat: null,
    valuation: null,
  };
}

// ========== Signal Data ==========
const signalData = {
  zh: {
    duan: [
      { type:'green', cat:'AI算力', title:'NVIDIA市值破$5T，AI资本开支持续超预期', tk:'NVDA', q:'卖铲子的生意。加仓1110%，但这个价格不追。' },
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'会员制护城河，如茅台。简单、可预测。' },
      { type:'yellow', cat:'SaaS', title:'Salesforce AI agent收入增长强劲，但估值偏高', tk:'CRM', q:'企业AI是好赛道，但CRM的护城河没有想象中深。' },
      { type:'red', cat:'关税政策', title:'特朗普25%对华关税升级', tk:'—', q:'政策驱动不碰。投资找10年不变的东西。' },
    ],
    buffett: [
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'消费者特许权典范。我能理解的好生意。' },
      { type:'green', cat:'能源', title:'雪佛龙提高股息+4%，年化达$6.52', tk:'CVX', q:'石油不会消失。现金流强劲，分红持续增长。' },
      { type:'yellow', cat:'保险', title:'美国保险业综合成本率改善', tk:'BRK.B', q:'Berkshire的能力圈。浮存金是核武器，但当前不够便宜。' },
      { type:'red', cat:'高估值科技', title:'七巨头总市值$20T占标普四成', tk:'—', q:'$3733亿现金说明一切。太贵了。' },
    ],
    munger: [
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'最爱。低毛利高周转，会员费=纯利润。' },
      { type:'green', cat:'AI算力', title:'NVIDIA市值破$5T', tk:'NVDA', q:'好公司可以付合理价格。PEG 0.6。但反转思维：什么让NVDA失败？' },
      { type:'yellow', cat:'医疗', title:'UnitedHealth估值合理但面临反垄断审查', tk:'UNH', q:'医疗是人口老龄化的确定趋势，但监管风险大。' },
      { type:'red', cat:'银行股', title:'美国中小银行因商业地产下跌', tk:'—', q:'资产负债表里隐藏风险太多。赚小钱，可能归零。' },
    ],
  },
  en: {
    duan: [
      { type:'green', cat:'AI Compute', title:'NVIDIA surpasses $5T, AI capex exceeds expectations', tk:'NVDA', q:'Shovel business. +1,110% position. But won\'t chase here.' },
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Membership moat. Simple, predictable.' },
      { type:'yellow', cat:'SaaS', title:'Salesforce AI agent revenue surges, valuation stretched', tk:'CRM', q:'Enterprise AI is good, but CRM moat isn\'t as deep as imagined.' },
      { type:'red', cat:'Tariff', title:'Trump 25% China tariff escalation', tk:'—', q:'Policy-driven = avoid. Find 10-year certainties.' },
    ],
    buffett: [
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Consumer franchise epitome. A business I understand.' },
      { type:'green', cat:'Energy', title:'Chevron hikes dividend +4%, annualized $6.52', tk:'CVX', q:'Oil isn\'t going away. Strong cash flow, growing dividends.' },
      { type:'yellow', cat:'Insurance', title:'US insurance combined ratios improve', tk:'BRK.B', q:'Berkshire\'s sweet spot. Float is our weapon, but not cheap enough.' },
      { type:'red', cat:'Tech Valuation', title:'Mag 7 at $20T = 40% of S&P', tk:'—', q:'$373B cash says it all.' },
    ],
    munger: [
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Favorite. Low margin high turnover. Membership = profit.' },
      { type:'green', cat:'AI Compute', title:'NVIDIA surpasses $5T', tk:'NVDA', q:'Fair price for great companies. PEG 0.6. Invert: what makes NVDA fail?' },
      { type:'yellow', cat:'Healthcare', title:'UnitedHealth fair valuation but antitrust risk', tk:'UNH', q:'Aging population is certain, but regulation is Damocles\' sword.' },
      { type:'red', cat:'Banks', title:'US regional banks drop on CRE concerns', tk:'—', q:'Hidden balance sheet risks. Small gains, potential wipeout.' },
    ],
  },
};

// ========== Data Loading ==========
async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

async function loadAllData() {
  try {
    const [market, news, fg, meta, stockDetails] = await Promise.all([
      loadJSON('data/market.json'),
      loadJSON('data/news.json'),
      loadJSON('data/fear-greed.json'),
      loadJSON('data/meta.json'),
      loadJSON('data/stock-details.json'),
    ]);
    marketData = market;
    newsData = news;
    fearGreedData = fg;
    metaData = meta;
    stockDetailsData = stockDetails;

    renderTicker();
    renderMarketSnapshot();
    renderIndustryPerf();
    renderFearGreed();
    renderAlphaEvents();
    renderMasterOpinions();
    renderNewsFilterBar();
    renderNews();
    renderSectorTags();
    renderImpactTable();
    renderLastUpdate();
    renderTickerSuggestions();

    // Auto-render deep analysis for default ticker
    const defaultTk = document.getElementById('tickerInput')?.value || 'NVDA';
    renderDeepAnalysis(defaultTk);
  } catch (err) {
    console.error('loadAllData error:', err);
  }
}

// ========== Ticker Tape ==========
function renderTicker() {
  const container = document.getElementById('tickerScroll');
  if (!container) return;
  let items = '';
  const addItem = (name, price, change) => {
    const cls = change >= 0 ? 'text-green' : 'text-red';
    const sign = change >= 0 ? '+' : '';
    items += `<span class="ticker-item"><span class="label">${name}</span> <span class="price">${formatPrice(price)}</span> <span class="${cls}">${sign}${change.toFixed(2)}%</span></span>`;
  };
  if (marketData?.indices) {
    const nameMap = { '^GSPC': 'S&P 500', '^IXIC': 'NASDAQ', '^DJI': 'DJI', '^HSI': 'HSI', '000001.SS': 'SSE', '^N225': 'NKY' };
    marketData.indices.forEach(idx => addItem(nameMap[idx.symbol] || idx.symbol, idx.price, idx.change));
  }
  if (marketData?.macro) {
    const nameMap = { '^TNX': '10Y', 'DX-Y.NYB': 'DXY', 'GC=F': 'Gold', 'CL=F': 'WTI', '^VIX': 'VIX' };
    marketData.macro.forEach(m => addItem(nameMap[m.symbol] || m.symbol, m.price, m.change));
  }
  container.innerHTML = items + items;
}

// ========== Market Snapshot ==========
function renderMarketSnapshot() {
  const grid = document.getElementById('snapshotGrid');
  if (!grid) return;
  let html = '';
  const addSnapshot = (name, price, change) => {
    const cls = change >= 0 ? 'text-green' : 'text-red';
    const sign = change >= 0 ? '+' : '';
    html += `<div class="snapshot-item"><div class="name">${name}</div><div class="value mono">${formatPrice(price)}</div><div class="change ${cls}">${sign}${change.toFixed(2)}%</div></div>`;
  };
  if (marketData?.indices) {
    const nameMap = { '^GSPC': 'S&P 500', '^IXIC': 'NASDAQ', '^DJI': 'DJI', '^HSI': 'HSI', '000001.SS': 'SSE', '^N225': 'NKY' };
    marketData.indices.forEach(idx => addSnapshot(nameMap[idx.symbol] || idx.name, idx.price, idx.change));
  }
  grid.innerHTML = html;

  const grid2 = document.getElementById('snapshotGrid2');
  if (!grid2) return;
  html = '';
  if (marketData?.macro) {
    const nameMap = { '^TNX': '10Y Yield', 'DX-Y.NYB': 'DXY', 'GC=F': 'Gold', 'CL=F': 'WTI', '^VIX': 'VIX' };
    marketData.macro.forEach(m => addSnapshot(nameMap[m.symbol] || m.name, m.price, m.change));
  }
  grid2.innerHTML = html;
}

// ========== Fear & Greed ==========
function renderFearGreed() {
  const valEl = document.getElementById('fgValue');
  const labelEl = document.getElementById('fgLabel');
  const fillEl = document.getElementById('fgFill');
  if (!valEl) return;
  const lang = getLang();

  // Prefer fear-greed.json if available, otherwise compute from VIX
  let val, label;
  if (fearGreedData && fearGreedData.value != null) {
    val = fearGreedData.value;
  } else if (marketData?.macro) {
    // Compute from VIX: VIX 12→90(Extreme Greed), VIX 35→10(Extreme Fear)
    const vix = marketData.macro.find(m => m.symbol === '^VIX');
    if (vix) {
      val = Math.round(Math.max(0, Math.min(100, 100 - (vix.price - 12) * (90 / 23))));
    }
  }
  if (val == null) return;

  if (val >= 75) label = lang === 'zh' ? '极度贪婪' : 'Extreme Greed';
  else if (val >= 55) label = lang === 'zh' ? '贪婪' : 'Greed';
  else if (val >= 45) label = lang === 'zh' ? '中性' : 'Neutral';
  else if (val >= 25) label = lang === 'zh' ? '恐惧' : 'Fear';
  else label = lang === 'zh' ? '极度恐惧' : 'Extreme Fear';

  valEl.textContent = val;
  fillEl.style.width = val + '%';
  labelEl.textContent = label;
  labelEl.className = val >= 55 ? 'text-green' : val <= 45 ? 'text-red' : 'text-yellow';
}

// ========== News ==========
function renderNews() {
  const container = document.getElementById('newsContainer');
  const section = document.getElementById('newsSection');
  const divider = document.getElementById('newsDivider');
  if (!container) return;
  if (!newsData || newsData.length === 0) {
    // Hide entire news section when no data
    if (section) section.style.display = 'none';
    if (divider) divider.style.display = 'none';
    return;
  }
  // Show section when data available
  if (section) section.style.display = '';
  if (divider) divider.style.display = '';

  // Apply classification filter
  let filtered = newsData.slice(0, 15);
  if (activeNewsFilter) {
    filtered = filtered.filter(n => {
      const cls = n.classification || classifyNewsItem(n);
      return cls === activeNewsFilter;
    });
  }
  // Apply tag filter
  if (activeNewsTags.size > 0) {
    filtered = filtered.filter(n => {
      const nTags = (n.tags || []).map(t => typeof t === 'string' ? t : t.symbol || '');
      return [...activeNewsTags].some(ft => nTags.some(nt => nt.includes(ft)));
    });
  }

  let html = '';
  filtered.slice(0, 10).forEach(n => {
    const sentCls = n.sentiment === 'positive' ? 'tag-positive' : n.sentiment === 'negative' ? 'tag-negative' : 'tag-neutral';
    const tags = (n.tags || []).slice(0, 3).map(tag =>
      `<span class="news-tag tag-default">${typeof tag === 'string' ? tag : tag.symbol || tag}</span>`
    ).join('');
    const titleTag = n.url && n.url !== '#'
      ? `<a class="news-title" href="${escapeAttr(n.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(n.title)}</a>`
      : `<span class="news-title">${escapeHtml(n.title)}</span>`;
    // Show classification badge
    const cls = n.classification || classifyNewsItem(n);
    const clsBadge = getClassificationBadge(cls);
    html += `<div class="news-item"><div class="news-time">${escapeHtml(n.time || '')}</div><div class="news-content">${titleTag}<div class="news-meta"><span class="news-source">${escapeHtml(n.source || '')}</span>${clsBadge}${n.sentiment ? `<span class="news-tag ${sentCls}">${n.sentiment}</span>` : ''}${tags}</div></div></div>`;
  });
  if (filtered.length === 0) {
    const lang = getLang();
    const noMatch = lang === 'zh' ? '无匹配新闻' : 'No matching news';
    html = `<div class="news-item"><div class="news-content"><div class="news-title" style="color:var(--text-secondary)">${noMatch}</div></div></div>`;
  }
  container.innerHTML = html;
}

// Classify a news item based on sentiment and tags (heuristic)
function classifyNewsItem(n) {
  const sent = n.sentiment || '';
  const tags = (n.tags || []).map(t => typeof t === 'string' ? t.toLowerCase() : '');
  const title = (n.title || '').toLowerCase();
  if (sent === 'negative' || tags.some(t => t.includes('risk') || t.includes('风险')) || title.includes('crash') || title.includes('暴跌')) return 'urgent';
  if (sent === 'positive' || tags.some(t => t.includes('earn') || t.includes('财报') || t.includes('policy') || t.includes('政策'))) return 'important';
  if (tags.some(t => t.includes('data') || t.includes('数据') || t.includes('inflect'))) return 'inflection';
  return 'noise';
}

function getClassificationBadge(cls) {
  const map = {
    urgent: { icon: '\uD83D\uDD34', cls: 'tag-negative' },
    important: { icon: '\uD83D\uDFE1', cls: 'tag-neutral' },
    inflection: { icon: '\uD83D\uDCA1', cls: 'tag-default' },
    noise: { icon: '\uD83D\uDCAC', cls: 'tag-default' },
  };
  const m = map[cls] || map.noise;
  return `<span class="news-tag ${m.cls}">${m.icon}</span>`;
}

// ========== Last Update ==========
function renderLastUpdate() {
  const el = document.getElementById('lastUpdated');
  if (!el || !metaData) return;
  const d = new Date(metaData.lastUpdated);
  el.textContent = `${t('recap.last_updated')}: ${d.toLocaleString()}`;
}

// ========== Signal Wall ==========
function renderSignals(master) {
  const container = document.getElementById('signalCards');
  if (!container) return;
  const lang = getLang();
  const signals = signalData[lang]?.[master] || signalData.en?.[master] || [];
  const groups = { green: [], yellow: [], red: [] };
  signals.forEach(s => groups[s.type].push(s));
  const groupLabels = { green: t('signal.green'), yellow: t('signal.yellow'), red: t('signal.red') };
  const groupColors = {
    green: { dot: 'background:var(--green)', border: 'type-green' },
    yellow: { dot: 'background:var(--yellow)', border: 'type-yellow' },
    red: { dot: 'background:var(--red)', border: 'type-red' },
  };
  const tagColors = { green: 'tag-positive', yellow: 'tag-neutral', red: 'tag-negative' };

  let html = '';
  ['green', 'yellow', 'red'].forEach(type => {
    if (!groups[type].length) return;
    const gc = groupColors[type];
    html += `<div class="signal-group-label"><span class="signal-dot" style="${gc.dot}"></span><span class="signal-group-text">${groupLabels[type]}</span><span class="text-muted signal-group-count">${groups[type].length}</span></div>`;
    groups[type].forEach(s => {
      const isClickable = s.tk !== '—';
      const clickAttr = isClickable ? `onclick="window.vmApp.goDeepDive('${s.tk}')"` : '';
      const cursorCls = isClickable ? ' signal-card-clickable' : '';
      html += `<div class="signal-card ${gc.border}${cursorCls} fade-in" ${clickAttr}><div class="signal-header"><span class="news-tag ${tagColors[type]}">${escapeHtml(s.cat)}</span>${isClickable ? `<span class="mono text-muted signal-ticker">${s.tk}</span>` : ''}</div><div class="signal-title">${escapeHtml(s.title)}</div><div class="signal-quote">"${escapeHtml(s.q)}"</div></div>`;
    });
  });
  container.innerHTML = html;
}

// ========== Earnings Renderer ==========
function renderEarnings(analysis, lang) {
  const container = document.getElementById('earningsContainer');
  if (!container || !analysis.earnings) { if(container) container.innerHTML = ''; return; }
  const e = analysis.earnings[lang] || analysis.earnings.en;
  const trendIcon = (t) => t === '↑' ? '▲' : t === '↓' ? '▼' : '—';
  const trendCls = (t) => t === '↑' ? 'text-green' : t === '↓' ? 'text-red' : 'text-yellow';
  container.innerHTML = `
    <div class="earnings-header">${analysis.earnings.quarter} | ${analysis.earnings.reportDate}</div>
    <div class="earnings-grid">
      <div class="earnings-item"><div class="earnings-metric">${lang === 'zh' ? '营收' : 'Revenue'}</div><div class="earnings-val mono">${e.revenue.val} <span class="text-green">${e.revenue.yoy}</span></div><div class="earnings-beat text-green">${e.revenue.beat}</div><div class="earnings-note">${e.revenue.note}</div></div>
      <div class="earnings-item"><div class="earnings-metric">EPS</div><div class="earnings-val mono">${e.eps.val} <span class="text-green">${e.eps.yoy}</span></div><div class="earnings-beat text-green">${e.eps.beat}</div><div class="earnings-note">${e.eps.note}</div></div>
      <div class="earnings-item"><div class="earnings-metric">${lang === 'zh' ? '自由现金流' : 'Free Cash Flow'}</div><div class="earnings-val mono">${e.fcf.val} <span class="${trendCls(e.fcf.trend)}">${trendIcon(e.fcf.trend)} ${e.fcf.margin}</span></div><div class="earnings-note">${e.fcf.note}</div></div>
      <div class="earnings-item"><div class="earnings-metric">${lang === 'zh' ? '毛利率' : 'Gross Margin'}</div><div class="earnings-val mono">${e.grossMargin.val} <span class="${trendCls(e.grossMargin.trend)}">${trendIcon(e.grossMargin.trend)}</span></div><div class="earnings-note">${e.grossMargin.note}</div></div>
    </div>
    <div class="earnings-guidance"><strong>${lang === 'zh' ? '指引' : 'Guidance'}:</strong> ${e.guidance}</div>
    <div class="earnings-highlight"><strong>${lang === 'zh' ? '核心看点' : 'Key Thesis'}:</strong> ${e.highlight}</div>
    <div class="earnings-risk"><strong>${lang === 'zh' ? '风险信号' : 'Risk Signals'}:</strong> ${e.risk}</div>
  `;
}

// ========== Financial Health Renderer ==========
function renderFinancialHealth(analysis, lang) {
  const container = document.getElementById('finHealthContainer');
  if (!container || !analysis.financialHealth) { if(container) container.innerHTML = ''; return; }
  const h = analysis.financialHealth[lang] || analysis.financialHealth.en;
  container.innerHTML = `
    <div class="fin-health-grid">
      <div class="stat-row"><span class="stat-label">${lang === 'zh' ? '现金/债务' : 'Cash/Debt'}</span><span class="stat-value">${h.cashPosition}</span></div>
      <div class="stat-row"><span class="stat-label">${lang === 'zh' ? '负债权益比' : 'D/E Ratio'}</span><span class="stat-value">${h.debtToEquity}</span></div>
      <div class="stat-row"><span class="stat-label">${lang === 'zh' ? '流动比率' : 'Current Ratio'}</span><span class="stat-value">${h.currentRatio}</span></div>
      <div class="stat-row"><span class="stat-label">${lang === 'zh' ? '资本开支' : 'Capex'}</span><span class="stat-value">${h.capex}</span></div>
      <div class="stat-row"><span class="stat-label">${lang === 'zh' ? '股东回报' : 'Shareholder Returns'}</span><span class="stat-value">${h.buyback}</span></div>
    </div>
    <div class="fin-health-summary">${h.summary}</div>
  `;
}

// ========== Moat Analysis Renderer (PER MASTER) ==========
function renderMoatAnalysis(analysis, lang, master) {
  const container = document.getElementById('moatContainer');
  if (!container || !analysis.moat) { if(container) container.innerHTML = ''; return; }
  const m = analysis.moat[master]?.[lang] || analysis.moat[master]?.en || analysis.moat.duan?.[lang];
  if (!m) { container.innerHTML = ''; return; }
  const scoreColor = m.score.includes('强') || m.score.includes('Strong') || m.score.includes('极强') || m.score.includes('Very Strong') || m.score.includes('核心') || m.score.includes('Core') ? 'text-green' : m.score.includes('外') || m.score.includes('Outside') ? 'text-yellow' : 'text-yellow';
  container.innerHTML = `
    <div class="moat-header"><span class="fw-600">${lang === 'zh' ? '护城河评级' : 'Moat Rating'}: </span><span class="${scoreColor} fw-700">${m.score}</span></div>
    <div class="moat-type"><span class="text-muted">${lang === 'zh' ? '类型' : 'Type'}:</span> ${m.moatType}</div>
    <div class="moat-analysis">${m.analysis}</div>
    <div class="moat-risk"><span class="text-red fw-600">${lang === 'zh' ? '关键风险' : 'Key Risk'}:</span> ${m.risk}</div>
  `;
}

// ========== Valuation Tool — Interactive DCF/PE/PEG ==========
let currentValModel = 'dcf';
let valSliderState = {};
function calculateDCF(params) {
  const { revenue, growthRate, terminalGrowth, wacc, fcfMargin, sharesOutstanding } = params;
  let fcfs = [], rev = revenue;
  // Growth decays from current rate to terminal over 10 years
  // Years 1-5: fast decay, Years 6-10: slow approach to terminal
  const midGrowth = (growthRate + terminalGrowth) / 2;
  for (let yr = 1; yr <= 10; yr++) {
    let g = yr <= 5 ? growthRate - (growthRate - midGrowth) * ((yr - 1) / 4) : midGrowth - (midGrowth - terminalGrowth) * ((yr - 5) / 5);
    rev = rev * (1 + g); fcfs.push(rev * fcfMargin);
  }
  const tv = fcfs[9] * (1 + terminalGrowth) / (wacc - terminalGrowth);
  let pv = 0;
  for (let i = 0; i < 10; i++) pv += fcfs[i] / Math.pow(1 + wacc, i + 1);
  pv += tv / Math.pow(1 + wacc, 10);
  const mid = pv / sharesOutstanding;
  return { low: mid * 0.85, mid, high: mid * 1.15 };
}
function getValDefaults(symbol) {
  const sd = stockDetailsData?.[symbol];
  if (!sd) return null;
  let revenue = sd.revenue || 100e9;
  const price = sd.price || 100;
  const marketCapRaw = sd.marketCapRaw || 1e12, sharesOutstanding = price > 0 ? marketCapRaw / price : 1e9;
  const eps = sd.eps || (price / (sd.pe || 25)), pe = sd.pe || 25, forwardPE = sd.forwardPE || pe;
  // Fix ADR currency mismatch: if revenue > 2x marketCap, Yahoo returned local currency
  if (revenue > marketCapRaw * 2 && sd.netMargin > 0 && eps > 0) {
    revenue = eps * sharesOutstanding / sd.netMargin;
  } else if (revenue > marketCapRaw * 2) {
    revenue = marketCapRaw / 5;
  }
  // Cap growth rate: high growth (>40%) decays faster, prevent compounding absurdity
  let growthRate = sd.revenueGrowth != null ? sd.revenueGrowth : 0.15;
  growthRate = Math.min(growthRate, 0.35); // Cap at 35% even for NVDA
  // FCF margin: use netMargin * 1.2 (typical net-to-FCF conversion) instead of grossMargin * 0.7
  // This gives realistic results for low-margin businesses (UNH, COST) and high-margin (NVDA, META)
  const netMargin = sd.netMargin != null ? sd.netMargin : 0.15;
  const fcfMargin = Math.min(netMargin * 1.2, 0.50); // Cap at 50%
  const grossMargin = sd.grossMargin != null ? sd.grossMargin : 0.5;
  return { revenue, growthRate, grossMargin, fcfMargin, price, sharesOutstanding, eps, pe, forwardPE, terminalGrowth: 0.03, wacc: 0.10 };
}
function renderValuationTool(analysis, lang, symbol) {
  const container = document.getElementById('valuationContainer');
  if (!container) return;
  const defaults = getValDefaults(symbol);
  if (!defaults) {
    if (!analysis.valuation) { container.innerHTML = ''; return; }
    const v = analysis.valuation[lang] || analysis.valuation.en;
    // Dynamic margin of safety using real current price vs DCF range
    const stock = marketData?.watchlist?.find(s => s.symbol === symbol);
    const sd = stockDetailsData?.[symbol];
    const curPrice = stock?.price || sd?.price;
    let marginHTML = `<span class="fw-600">${lang === 'zh' ? '安全边际' : 'Margin of Safety'}:</span> ${v.grahamMargin}`;
    if (curPrice) {
      // Parse DCF range like "$145-165" or "$480-550 (Class B)"
      const dcfMatch = v.dcf.value.match(/\$?([\d,]+)\s*-\s*\$?([\d,]+)/);
      if (dcfMatch) {
        const dcfLow = parseFloat(dcfMatch[1].replace(/,/g, '')), dcfHigh = parseFloat(dcfMatch[2].replace(/,/g, ''));
        const dcfMid = (dcfLow + dcfHigh) / 2;
        const marginNum = (dcfMid - curPrice) / curPrice * 100;
        const marginPct = marginNum.toFixed(1);
        const marginCls = marginNum > 15 ? 'text-green' : marginNum > 0 ? 'text-yellow' : 'text-red';
        const marginLabel = marginNum > 0
          ? (lang === 'zh' ? `安全边际 ${marginPct}%` : `${marginPct}% margin of safety`)
          : (lang === 'zh' ? `溢价 ${Math.abs(marginPct)}%` : `${Math.abs(marginPct)}% premium`);
        marginHTML = `<span class="fw-600">${lang === 'zh' ? '实时安全边际' : 'Live Margin of Safety'}:</span> <span class="${marginCls} fw-600">${lang === 'zh' ? '当前' : 'Current'} $${curPrice.toFixed(2)} vs DCF ${lang === 'zh' ? '中值' : 'mid'} $${dcfMid.toFixed(0)} → ${marginLabel}</span>`;
      }
    }
    container.innerHTML = `<div class="valuation-methods"><div class="val-method"><div class="val-method-label">DCF</div><div class="val-method-value mono fw-700">${v.dcf.value}</div><div class="val-method-detail">${v.dcf.method}</div><div class="val-method-note text-muted">${v.dcf.note}</div></div><div class="val-method"><div class="val-method-label">${lang === 'zh' ? '同行对比' : 'Peer Comp'}</div><div class="val-method-value mono fw-700">${v.peerComp.value}</div><div class="val-method-detail">${v.peerComp.method}</div><div class="val-method-note text-muted">${v.peerComp.note}</div></div></div><div class="val-margin">${marginHTML}</div><div class="val-verdict fw-600">${v.verdict}</div>`;
    return;
  }
  if (!valSliderState[symbol]) {
    valSliderState[symbol] = { terminalGrowth: defaults.terminalGrowth, wacc: defaults.wacc, growthRate: Math.min(Math.max(defaults.growthRate, 0.05), 0.50), fcfMargin: Math.min(Math.max(defaults.fcfMargin, 0.01), 0.50), peMultiple: Math.round(defaults.forwardPE || defaults.pe || 25), forwardEPS: defaults.eps, pegGrowth: defaults.growthRate };
  }
  const st = valSliderState[symbol];
  if (currentValModel === 'dcf') renderDCFPanel(container, defaults, st, symbol, lang);
  else if (currentValModel === 'pe') renderPEPanel(container, defaults, st, symbol, lang);
  else if (currentValModel === 'peg') renderPEGPanel(container, defaults, st, symbol, lang);
  else if (currentValModel === 'peer') renderPeerPanel(container, defaults, symbol, lang);
}
function _valStatus(diff, lang) {
  if (diff < -10) return { cls: 'undervalued', text: lang === 'zh' ? '低估' : 'Undervalued' };
  if (diff > 10) return { cls: 'overvalued', text: lang === 'zh' ? '高估' : 'Overvalued' };
  return { cls: 'fair', text: lang === 'zh' ? '合理' : 'Fair Value' };
}
function _slider(id, label, min, max, step, value, fmt, symbol) {
  return `<div class="val-slider-group"><div class="val-slider-header"><span class="val-slider-label">${label}</span><span class="val-slider-value" id="valDisp_${id}">${fmt(value)}</span></div><div class="val-slider-range"><span class="range-label">${fmt(min)}</span><input type="range" class="val-slider-input" id="valSlider_${id}" min="${min}" max="${max}" step="${step}" value="${value}" oninput="vmApp.onSliderChange('${symbol}','${id}',this.value)"><span class="range-label">${fmt(max)}</span></div></div>`;
}
function renderDCFPanel(container, defaults, st, symbol, lang) {
  const { terminalGrowth: tg, wacc, growthRate: gr, fcfMargin: fm } = st;
  const result = calculateDCF({ revenue: defaults.revenue, growthRate: gr, terminalGrowth: tg, wacc, fcfMargin: fm, sharesOutstanding: defaults.sharesOutstanding });
  const price = defaults.price, diff = ((price - result.mid) / result.mid * 100);
  const { cls: statusCls, text: statusText } = _valStatus(diff, lang);
  const fp = (v) => '$' + v.toFixed(0), fpct = (v) => (v * 100).toFixed(1) + '%', sign = diff >= 0 ? '+' : '';
  const waccVals = [0.08, 0.09, 0.10, 0.11, 0.12], growthVals = [0.02, 0.025, 0.03, 0.035, 0.04];
  let sensHTML = `<table class="sensitivity-table"><caption>${lang === 'zh' ? '敏感性分析: WACC vs 终端增长率' : 'Sensitivity: WACC vs Terminal Growth'}</caption><thead><tr><th>${lang === 'zh' ? 'WACC \\ 终端增速' : 'WACC \\ Term.G'}</th>`;
  growthVals.forEach(g => { sensHTML += `<th>${(g*100).toFixed(1)}%</th>`; });
  sensHTML += '</tr></thead><tbody>';
  waccVals.forEach(w => {
    sensHTML += `<tr><th>${(w*100).toFixed(0)}%</th>`;
    growthVals.forEach(g => {
      const r = calculateDCF({ revenue: defaults.revenue, growthRate: gr, terminalGrowth: g, wacc: w, fcfMargin: fm, sharesOutstanding: defaults.sharesOutstanding });
      const isHL = Math.abs(w - wacc) < 0.001 && Math.abs(g - tg) < 0.001;
      const cd = ((price - r.mid) / r.mid * 100);
      sensHTML += `<td class="${isHL ? 'cell-highlight' : cd < -10 ? 'cell-green' : cd > 10 ? 'cell-red' : 'cell-yellow'}">${fp(r.mid)}</td>`;
    });
    sensHTML += '</tr>';
  });
  sensHTML += '</tbody></table>';
  const dateStr = new Date().toISOString().slice(0, 10);
  container.innerHTML = `${_slider('tg', lang === 'zh' ? '终端增长率' : 'Terminal Growth', 0.01, 0.06, 0.005, tg, fpct, symbol)}${_slider('wacc', 'WACC', 0.06, 0.15, 0.005, wacc, fpct, symbol)}${_slider('gr', lang === 'zh' ? '近期增速' : 'Near-term Growth', 0.05, 0.50, 0.01, gr, fpct, symbol)}${_slider('fm', lang === 'zh' ? 'FCF利润率' : 'FCF Margin', 0.01, 0.50, 0.005, fm, fpct, symbol)}<div class="val-result-box"><div class="val-result-range">${lang === 'zh' ? '估值范围' : 'Fair Value Range'}: ${fp(result.low)} - ${fp(result.high)}</div><div class="val-result-mid">${lang === 'zh' ? '中位数' : 'Midpoint'}: <span class="mid-value">${fp(result.mid)}</span></div><div class="val-result-compare ${statusCls}">${lang === 'zh' ? '当前股价' : 'Current'} ${fp(price)} ${lang === 'zh' ? '相对中位数' : 'vs mid'}: ${sign}${diff.toFixed(1)}% (${statusText})</div></div>${sensHTML}<div class="val-data-source">${lang === 'zh' ? '数据源' : 'Source'}: Yahoo Finance | ${lang === 'zh' ? '更新' : 'Updated'}: ${dateStr}</div>`;
}
function renderPEPanel(container, defaults, st, symbol, lang) {
  const peVal = st.peMultiple, epsVal = st.forwardEPS, fairValue = peVal * epsVal;
  const price = defaults.price, diff = ((price - fairValue) / fairValue * 100);
  const { cls: statusCls, text: statusText } = _valStatus(diff, lang);
  const sign = diff >= 0 ? '+' : '', dateStr = new Date().toISOString().slice(0, 10);
  container.innerHTML = `<div class="val-slider-group"><div class="val-slider-header"><span class="val-slider-label">${lang === 'zh' ? '目标PE倍数' : 'Target PE Multiple'}</span><span class="val-slider-value" id="valDisp_pe">${peVal}x</span></div><div class="val-slider-range"><span class="range-label">10x</span><input type="range" class="val-slider-input" id="valSlider_pe" min="10" max="80" step="1" value="${peVal}" oninput="vmApp.onSliderChange('${symbol}','pe',this.value)"><span class="range-label">80x</span></div></div><div class="val-pe-input-group"><label>${lang === 'zh' ? '远期 EPS' : 'Forward EPS'}</label><input type="number" class="val-pe-input" id="valInput_eps" value="${epsVal.toFixed(2)}" step="0.01" onchange="vmApp.onSliderChange('${symbol}','eps',this.value)"></div><div class="val-result-box"><div class="val-result-range">${lang === 'zh' ? '公允价值' : 'Fair Value'} = ${peVal}x x $${epsVal.toFixed(2)} = <strong>$${fairValue.toFixed(0)}</strong></div><div class="val-result-compare ${statusCls}" style="margin-top:8px">${lang === 'zh' ? '当前股价' : 'Current'} $${price.toFixed(0)} vs $${fairValue.toFixed(0)}: ${sign}${diff.toFixed(1)}% (${statusText})</div></div><div class="val-data-source">${lang === 'zh' ? '数据源' : 'Source'}: Yahoo Finance | ${lang === 'zh' ? '更新' : 'Updated'}: ${dateStr}</div>`;
}
function renderPEGPanel(container, defaults, st, symbol, lang) {
  const pe = defaults.pe || 25, growthPct = (st.pegGrowth * 100);
  const peg = growthPct > 0 ? (pe / growthPct).toFixed(2) : '—';
  const pegNum = parseFloat(peg);
  let statusCls, statusText;
  if (pegNum <= 1.0) { statusCls = 'undervalued'; statusText = lang === 'zh' ? '低估 (PEG<=1)' : 'Undervalued (PEG<=1)'; }
  else if (pegNum <= 1.5) { statusCls = 'fair'; statusText = lang === 'zh' ? '合理 (1<PEG<=1.5)' : 'Fair (1<PEG<=1.5)'; }
  else { statusCls = 'overvalued'; statusText = lang === 'zh' ? '偏高 (PEG>1.5)' : 'Expensive (PEG>1.5)'; }
  const fpct = (v) => (v * 100).toFixed(1) + '%', dateStr = new Date().toISOString().slice(0, 10);
  container.innerHTML = `<div class="val-slider-group"><div class="val-slider-header"><span class="val-slider-label">${lang === 'zh' ? '预期盈利增速 (EPS Growth)' : 'Expected EPS Growth'}</span><span class="val-slider-value" id="valDisp_pegGr">${fpct(st.pegGrowth)}</span></div><div class="val-slider-range"><span class="range-label">5%</span><input type="range" class="val-slider-input" id="valSlider_pegGr" min="0.05" max="1.0" step="0.01" value="${st.pegGrowth}" oninput="vmApp.onSliderChange('${symbol}','pegGr',this.value)"><span class="range-label">100%</span></div></div><div class="val-result-box"><div class="val-result-range">PE = ${pe.toFixed(1)}x, ${lang === 'zh' ? '增速' : 'Growth'} = ${growthPct.toFixed(1)}%</div><div class="val-result-mid">PEG = <span class="mid-value">${peg}</span></div><div class="val-result-compare ${statusCls}" style="margin-top:8px">${statusText}</div></div><div class="val-data-source">${lang === 'zh' ? '数据源' : 'Source'}: Yahoo Finance | ${lang === 'zh' ? '更新' : 'Updated'}: ${dateStr}</div>`;
}
// Get same-industry peers for a given symbol
function getSectorPeers(symbol) {
  for (const [, group] of Object.entries(industryGroups)) {
    if (group.symbols && group.symbols.includes(symbol)) {
      return group.symbols.filter(s => s !== symbol);
    }
  }
  return [];
}

// Extract ticker mentions from news data
function getNewsHotTickers() {
  if (!newsData || newsData.length === 0) return {};
  const counts = {};
  newsData.forEach(n => {
    const tags = (n.tags || []).map(t => typeof t === 'string' ? t.toUpperCase() : (t.symbol || '').toUpperCase());
    tags.forEach(tk => { if (tk && /^[A-Z]{1,5}(-[A-Z])?$/.test(tk)) counts[tk] = (counts[tk] || 0) + 1; });
    // Also extract tickers from title
    const title = n.title || '';
    const tickerRe = /\b([A-Z]{2,5})\b/g;
    let m;
    while ((m = tickerRe.exec(title)) !== null) {
      const tk = m[1];
      if (stockDetailsData?.[tk] || stockAnalysis[tk]) counts[tk] = (counts[tk] || 0) + 1;
    }
  });
  return counts;
}

function renderPeerPanel(container, defaults, symbol, lang) {
  const sd = stockDetailsData?.[symbol];
  if (!sd) { container.innerHTML = ''; return; }

  // Prioritize same-industry peers, then add others
  const sectorPeers = getSectorPeers(symbol);
  const otherPeers = Object.keys(stockDetailsData || {}).filter(s => s !== symbol && !sectorPeers.includes(s));
  const orderedPeers = [...sectorPeers, ...otherPeers].filter(s => stockDetailsData[s]).slice(0, 8);

  // Get news hot tickers
  const hotTickers = getNewsHotTickers();

  const fr = (v, s) => v != null ? v.toFixed(1) + (s || 'x') : '—', fp = (v) => v != null ? (v * 100).toFixed(1) + '%' : '—';
  const dateStr = new Date().toISOString().slice(0, 10);
  const hotLabel = lang === 'zh' ? '🔥' : '🔥';
  const sectorLabel = lang === 'zh' ? '同行' : 'Peer';

  let rows = `<tr class="current-stock"><td class="col-symbol">${symbol}${hotTickers[symbol] ? ` ${hotLabel}` : ''}</td><td>${fr(sd.pe)}</td><td>${fr(sd.forwardPE)}</td><td>${fp(sd.revenueGrowth)}</td><td>${fp(sd.grossMargin)}</td><td>${fr(sd.evEbitda)}</td></tr>`;
  orderedPeers.forEach(s => {
    const d = stockDetailsData[s];
    const isSector = sectorPeers.includes(s);
    const isHot = hotTickers[s] > 0;
    const badge = (isSector ? `<span class="peer-badge">${sectorLabel}</span>` : '') + (isHot ? `<span class="peer-hot">${hotLabel}${hotTickers[s]}</span>` : '');
    rows += `<tr onclick="vmApp.quickTicker('${s}')" class="${isSector ? 'peer-same-sector' : ''}"><td class="col-symbol">${s}${badge}</td><td>${fr(d.pe)}</td><td>${fr(d.forwardPE)}</td><td>${fp(d.revenueGrowth)}</td><td>${fp(d.grossMargin)}</td><td>${fr(d.evEbitda)}</td></tr>`;
  });

  // News-mentioned tickers section
  let newsSection = '';
  const hotEntries = Object.entries(hotTickers).filter(([tk]) => tk !== symbol && !orderedPeers.includes(tk)).sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (hotEntries.length > 0) {
    const newsTitle = lang === 'zh' ? '📰 新闻关注' : '📰 In the News';
    newsSection = `<div class="peer-news-section"><div class="peer-news-title">${newsTitle}</div><div class="peer-news-tags">`;
    hotEntries.forEach(([tk, count]) => {
      newsSection += `<span class="peer-news-tag" onclick="vmApp.quickTicker('${tk}')">${tk} <span class="peer-hot-count">×${count}</span></span>`;
    });
    newsSection += '</div></div>';
  }

  container.innerHTML = `<table class="peer-comp-table"><thead><tr><th>${lang === 'zh' ? '代码' : 'Symbol'}</th><th>PE</th><th>${lang === 'zh' ? '远期PE' : 'Fwd PE'}</th><th>${lang === 'zh' ? '营收增速' : 'Rev Growth'}</th><th>${lang === 'zh' ? '毛利率' : 'Gross Margin'}</th><th>EV/EBITDA</th></tr></thead><tbody>${rows}</tbody></table>${newsSection}<div class="val-data-source">${lang === 'zh' ? '数据源' : 'Source'}: Yahoo Finance | ${lang === 'zh' ? '更新' : 'Updated'}: ${dateStr}</div>`;
}
function switchValModel(model) {
  currentValModel = model;
  document.querySelectorAll('.val-model-tab').forEach(b => b.classList.toggle('active', b.dataset.vmodel === model));
  const symbol = document.getElementById('tickerInput')?.value?.trim().toUpperCase() || 'NVDA';
  const analysis = stockAnalysis[symbol] || getDefaultAnalysis(symbol);
  renderValuationTool(analysis, getLang(), symbol);
}
function onSliderChange(symbol, param, value) {
  const v = parseFloat(value);
  if (!valSliderState[symbol]) return;
  const st = valSliderState[symbol], fpct = (x) => (x * 100).toFixed(1) + '%';
  if (param === 'tg') { st.terminalGrowth = v; const d = document.getElementById('valDisp_tg'); if(d) d.textContent = fpct(v); }
  else if (param === 'wacc') { st.wacc = v; const d = document.getElementById('valDisp_wacc'); if(d) d.textContent = fpct(v); }
  else if (param === 'gr') { st.growthRate = v; const d = document.getElementById('valDisp_gr'); if(d) d.textContent = fpct(v); }
  else if (param === 'fm') { st.fcfMargin = v; const d = document.getElementById('valDisp_fm'); if(d) d.textContent = fpct(v); }
  else if (param === 'pe') { st.peMultiple = v; const d = document.getElementById('valDisp_pe'); if(d) d.textContent = v + 'x'; }
  else if (param === 'eps') { st.forwardEPS = v; }
  else if (param === 'pegGr') { st.pegGrowth = v; const d = document.getElementById('valDisp_pegGr'); if(d) d.textContent = fpct(v); }
  const analysis = stockAnalysis[symbol] || getDefaultAnalysis(symbol);
  renderValuationTool(analysis, getLang(), symbol);
}
function renderValuation(analysis, lang) {
  const symbol = document.getElementById('tickerInput')?.value?.trim().toUpperCase() || 'NVDA';
  renderValuationTool(analysis, lang, symbol);
}

// ========== Deep Analysis — FULLY DYNAMIC ==========
function renderDeepAnalysis(symbol) {
  const stock = marketData?.watchlist?.find(s => s.symbol === symbol);
  const sd = stockDetailsData?.[symbol]; // real-time financial data from Yahoo
  const analysis = stockAnalysis[symbol] || getDefaultAnalysis(symbol, stock);
  const lang = getLang();
  const el = (id) => document.getElementById(id);

  // Helper: use real data (sd) when available, fallback to hardcoded (analysis)
  const fmtPct = (v) => v != null ? (v * 100).toFixed(1) + '%' : '—';
  const fmtRatio = (v, suffix) => v != null ? v.toFixed(1) + (suffix || 'x') : '—';

  // Quote header
  el('deepSymbol').textContent = symbol;
  el('deepExchange').textContent = analysis.exchange || '—';
  el('deepName').textContent = stock?.name || symbol;
  el('deepDesc').textContent = analysis.desc?.[lang] || '';
  if (stock) {
    el('deepPrice').textContent = stock.price.toFixed(2);
    const change = stock.price - (stock.price / (1 + stock.change / 100));
    const cls = stock.change >= 0 ? 'text-green' : 'text-red';
    const sign = stock.change >= 0 ? '+' : '';
    el('deepChange').className = `quote-change ${cls}`;
    el('deepChange').textContent = `${sign}${change.toFixed(2)} (${sign}${stock.change.toFixed(2)}%)`;
    el('deepOpen').textContent = stock.open?.toFixed(2) || '—';
    el('deepHigh').textContent = stock.dayHigh?.toFixed(2) || '—';
    el('deepLow').textContent = stock.dayLow?.toFixed(2) || '—';
    el('deepVolume').textContent = formatVolume(stock.volume);
    el('deepMktCap').textContent = stock.marketCap || '—';
    el('deepPE').textContent = stock.pe ? stock.pe + 'x' : '—';
  } else if (sd) {
    // Use stock-details data when watchlist doesn't have it
    el('deepPrice').textContent = sd.price?.toFixed(2) || '—';
    const sdChange = sd.change || 0;
    const sdCls = sdChange >= 0 ? 'text-green' : 'text-red';
    const sdSign = sdChange >= 0 ? '+' : '';
    el('deepChange').className = `quote-change ${sdCls}`;
    el('deepChange').textContent = `${sdSign}${sdChange.toFixed(2)}%`;
    el('deepOpen').textContent = '—';
    el('deepHigh').textContent = '—';
    el('deepLow').textContent = '—';
    el('deepVolume').textContent = '—';
    el('deepMktCap').textContent = sd.marketCap ? '$' + sd.marketCap : '—';
    el('deepPE').textContent = sd.pe != null ? sd.pe.toFixed(1) + 'x' : '—';
  } else {
    el('deepPrice').textContent = '—';
    el('deepChange').className = 'quote-change text-muted';
    el('deepChange').textContent = '—';
    ['deepOpen','deepHigh','deepLow','deepVolume','deepMktCap','deepPE'].forEach(id => el(id).textContent = '—');
  }

  // 52-week range (prefer stock-details, fallback to watchlist)
  const w52Low = sd?.fiftyTwoWeekLow || stock?.fiftyTwoWeekLow;
  const w52High = sd?.fiftyTwoWeekHigh || stock?.fiftyTwoWeekHigh;
  const curPrice = stock?.price || sd?.price;
  if (w52Low && w52High && curPrice) {
    const pct = ((curPrice - w52Low) / (w52High - w52Low) * 100).toFixed(0);
    el('range52Low').textContent = '$' + w52Low.toFixed(2);
    el('range52High').textContent = '$' + w52High.toFixed(2);
    el('range52Fill').style.width = pct + '%';
    el('range52Marker').style.left = pct + '%';
  }

  // AI Summary
  el('aiSummaryText').textContent = analysis.summary[lang] || analysis.summary.en;

  // Overview metrics (prefer real data)
  el('ovMktCap').textContent = sd?.marketCap ? '$' + sd.marketCap : (stock?.marketCap ? '$' + stock.marketCap : '—');
  el('ovPE').textContent = sd?.pe != null ? fmtRatio(sd.pe) : (stock?.pe ? stock.pe + 'x' : '—');
  el('ovRevGrowth').textContent = sd?.revenueGrowth != null ? fmtPct(sd.revenueGrowth) : analysis.revGrowth;
  el('ovGrossMargin').textContent = sd?.grossMargin != null ? fmtPct(sd.grossMargin) : analysis.grossMargin;

  // Valuation stats (prefer real data)
  el('statPE').textContent = sd?.pe != null ? fmtRatio(sd.pe) : (stock?.pe ? stock.pe + 'x' : '—');
  el('statFwdPE').textContent = sd?.forwardPE != null ? fmtRatio(sd.forwardPE) : analysis.peFwd;
  el('statPEG').textContent = sd?.peg != null ? sd.peg.toFixed(2) : analysis.peg;
  el('statEV').textContent = sd?.evEbitda != null ? fmtRatio(sd.evEbitda) : analysis.evEbitda;
  el('statPS').textContent = sd?.ps != null ? fmtRatio(sd.ps) : analysis.ps;
  el('statGrossMargin').textContent = sd?.grossMargin != null ? fmtPct(sd.grossMargin) : analysis.grossMargin;
  el('statNetMargin').textContent = sd?.netMargin != null ? fmtPct(sd.netMargin) : analysis.netMargin;
  el('statROE').textContent = sd?.roe != null ? fmtPct(sd.roe) : analysis.roe;
  el('statFCF').textContent = sd?.fcfYield != null ? fmtPct(sd.fcfYield) : analysis.fcfYield;
  el('statDiv').textContent = sd?.divYield != null ? fmtPct(sd.divYield) : analysis.divYield;

  // Financials panel
  el('finRevenue').textContent = analysis.revGrowth;
  el('finEPS').textContent = analysis.epsEst;
  el('finMargin').textContent = analysis.grossMargin;
  el('finSegment').textContent = analysis.dataCenterRev;

  // Valuation thermometer
  const pctl = analysis.valuationPctl;
  let valLabel = pctl >= 75 ? (lang === 'zh' ? '偏贵' : 'Expensive') : pctl >= 50 ? (lang === 'zh' ? '合理' : 'Fair') : (lang === 'zh' ? '便宜' : 'Cheap');
  let valColor = pctl >= 75 ? 'text-red' : pctl >= 50 ? 'text-yellow' : 'text-green';
  el('valPctlLabel').textContent = `${pctl}th pctl — ${valLabel}`;
  el('valPctlLabel').className = valColor + ' fw-600';
  el('valMarker').style.left = pctl + '%';

  // Three questions
  const questions = analysis.questions[lang] || analysis.questions.en;
  const qContainer = el('questionsContainer');
  qContainer.innerHTML = questions.map(q => {
    const statusCls = q.status === 'positive' ? 'positive' : q.status === 'uncertain' ? 'uncertain' : 'negative';
    const headerCls = q.status === 'positive' ? 'text-green' : q.status === 'uncertain' ? 'text-yellow' : 'text-red';
    return `<div class="question-item ${statusCls}"><div class="question-header ${headerCls}">${escapeHtml(q.q)}</div><div class="question-answer">${escapeHtml(q.a)}</div></div>`;
  }).join('');

  // Cross-validation
  const crossVal = analysis.crossVal[lang] || analysis.crossVal.en;
  const cvContainer = el('crossValContainer');
  cvContainer.innerHTML = crossVal.map(cv => {
    const borderCls = cv.color === 'green' ? 'cross-green' : cv.color === 'yellow' ? 'cross-yellow' : 'cross-red';
    const tagCls = cv.color === 'green' ? 'tag-positive' : cv.color === 'yellow' ? 'tag-neutral' : 'tag-negative';
    return `<div class="cross-item ${borderCls}"><div class="flex justify-between items-center mb-4"><span class="cross-name">${cv.name}</span><span class="cross-verdict ${tagCls}">${escapeHtml(cv.verdict)}</span></div><div class="cross-quote">"${escapeHtml(cv.q)}"</div></div>`;
  }).join('');

  // Final verdict — dynamic, based on current price vs DCF + static analysis
  renderDynamicVerdict(analysis, lang, symbol, stock, sd);

  // Chart (removed — K-line chart panel no longer exists)
  const svg = document.getElementById('chartSvg');
  if (svg) {
    const basePrice = stock?.price || 100;
    const data = generateCandleData(basePrice, 30);
    renderCandlestickChart(svg, data);
  }

  // New deep analysis panels
  const master = currentMaster.deep;
  renderEarnings(analysis, lang);
  renderFinancialHealth(analysis, lang);
  renderMoatAnalysis(analysis, lang, master);
  renderValuation(analysis, lang);
}

// ========== Dynamic Verdict ==========
function renderDynamicVerdict(analysis, lang, symbol, stock, sd) {
  const verdictEl = document.getElementById('verdictResult');
  if (!verdictEl) return;

  const curPrice = stock?.price || sd?.price;
  const defaults = getValDefaults(symbol);

  // Get DCF fair value
  let dcfMid = null;
  if (defaults) {
    const st = valSliderState[symbol] || { terminalGrowth: defaults.terminalGrowth, wacc: defaults.wacc, growthRate: Math.min(Math.max(defaults.growthRate, 0.05), 0.50), fcfMargin: Math.min(Math.max(defaults.fcfMargin, 0.01), 0.50) };
    const result = calculateDCF({ revenue: defaults.revenue, growthRate: st.growthRate, terminalGrowth: st.terminalGrowth, wacc: st.wacc, fcfMargin: st.fcfMargin, sharesOutstanding: defaults.sharesOutstanding });
    dcfMid = result.mid;
  } else if (analysis.valuation) {
    // Parse from static DCF string
    const v = analysis.valuation[lang] || analysis.valuation.en;
    if (v?.dcf?.value) {
      const m = v.dcf.value.match(/\$?([\d,]+)\s*-\s*\$?([\d,]+)/);
      if (m) dcfMid = (parseFloat(m[1].replace(/,/g, '')) + parseFloat(m[2].replace(/,/g, ''))) / 2;
    }
  }

  if (!curPrice || !dcfMid) {
    // Fallback to static verdict
    verdictEl.textContent = analysis.verdict[lang] || analysis.verdict.en;
    verdictEl.className = 'fw-700 ' + analysis.verdictColor;
    return;
  }

  const marginPct = ((dcfMid - curPrice) / curPrice * 100);
  const pe = sd?.pe || defaults?.pe;
  const fwdPE = sd?.forwardPE || defaults?.forwardPE;

  // Determine action
  let action, color, detail;
  if (marginPct > 30) {
    action = lang === 'zh' ? '强烈买入' : 'Strong Buy';
    color = 'text-green';
    detail = lang === 'zh'
      ? `当前 $${curPrice.toFixed(0)} 低于 DCF 公允值 $${dcfMid.toFixed(0)} 达 ${marginPct.toFixed(0)}%，安全边际充足`
      : `Current $${curPrice.toFixed(0)} is ${marginPct.toFixed(0)}% below DCF fair value $${dcfMid.toFixed(0)}, ample margin of safety`;
  } else if (marginPct > 10) {
    action = lang === 'zh' ? '买入' : 'Buy';
    color = 'text-green';
    detail = lang === 'zh'
      ? `当前 $${curPrice.toFixed(0)} 低于公允值 $${dcfMid.toFixed(0)} 约 ${marginPct.toFixed(0)}%，有一定安全边际`
      : `Current $${curPrice.toFixed(0)} is ${marginPct.toFixed(0)}% below fair value $${dcfMid.toFixed(0)}, some margin of safety`;
  } else if (marginPct > -10) {
    action = lang === 'zh' ? '持有观望' : 'Hold / Watch';
    color = 'text-yellow';
    detail = lang === 'zh'
      ? `当前 $${curPrice.toFixed(0)} 接近公允值 $${dcfMid.toFixed(0)}（偏差 ${marginPct > 0 ? '+' : ''}${marginPct.toFixed(0)}%），估值合理但缺乏安全边际`
      : `Current $${curPrice.toFixed(0)} near fair value $${dcfMid.toFixed(0)} (${marginPct > 0 ? '+' : ''}${marginPct.toFixed(0)}%), fairly valued but no margin of safety`;
  } else if (marginPct > -25) {
    action = lang === 'zh' ? '偏贵 — 等回调' : 'Expensive — Wait';
    color = 'text-red';
    detail = lang === 'zh'
      ? `当前 $${curPrice.toFixed(0)} 溢价 ${Math.abs(marginPct).toFixed(0)}%（公允值 $${dcfMid.toFixed(0)}），建议等待回调至 $${(dcfMid * 0.95).toFixed(0)} 以下`
      : `Current $${curPrice.toFixed(0)} at ${Math.abs(marginPct).toFixed(0)}% premium (fair $${dcfMid.toFixed(0)}), wait for pullback to $${(dcfMid * 0.95).toFixed(0)}`;
  } else {
    action = lang === 'zh' ? '严重高估 — 勿追' : 'Overvalued — Avoid';
    color = 'text-red';
    detail = lang === 'zh'
      ? `当前 $${curPrice.toFixed(0)} 溢价 ${Math.abs(marginPct).toFixed(0)}%（公允值 $${dcfMid.toFixed(0)}），远超合理估值`
      : `Current $${curPrice.toFixed(0)} at ${Math.abs(marginPct).toFixed(0)}% premium to fair value $${dcfMid.toFixed(0)}, well above reasonable valuation`;
  }

  // Add PE context
  let peNote = '';
  if (pe && fwdPE) {
    peNote = lang === 'zh'
      ? ` | PE ${pe.toFixed(1)}x → 远期 ${fwdPE.toFixed(1)}x`
      : ` | PE ${pe.toFixed(1)}x → Fwd ${fwdPE.toFixed(1)}x`;
  }

  verdictEl.innerHTML = `<span class="${color}">${action}</span><div style="font-size:13px;font-weight:400;margin-top:6px;color:var(--text-secondary)">${detail}${peNote}</div>`;
  verdictEl.className = 'fw-700';
}

// ========== Tab Switching ==========
function switchMainTab(tab) {
  ['recap', 'signal', 'deep', 'compare'].forEach(tabId => {
    const page = document.getElementById('page-' + tabId);
    const btn = document.getElementById('mainTab-' + tabId);
    if (page) page.classList.toggle('active', tabId === tab);
    if (btn) btn.classList.toggle('active', tabId === tab);
  });
  if (tab === 'signal') renderSignals(currentMaster.signal);
  if (tab === 'deep') renderDeepAnalysis(document.getElementById('tickerInput')?.value || 'NVDA');
  if (tab === 'compare') renderComparisonPage();
}

function switchMaster(master, ctx) {
  currentMaster[ctx] = master;
  const selector = document.getElementById(`masterSelector-${ctx}`);
  if (selector) {
    selector.querySelectorAll('.master-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.master === master);
    });
  }
  if (ctx === 'signal') renderSignals(master);
  if (ctx === 'deep') {
    renderDeepAnalysis(document.getElementById('tickerInput')?.value || 'NVDA');
  }
}

function switchDeepTab(tab) {
  currentDeepTab = tab;
  document.querySelectorAll('.deep-panel').forEach(p => p.classList.toggle('active', p.id === 'dpanel-' + tab));
  document.querySelectorAll('.deep-tab').forEach(b => b.classList.toggle('active', b.dataset.dtab === tab));
}

function switchChartPeriod(period) {
  document.querySelectorAll('.chart-period-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === period);
  });
  const days = { '1D': 1, '1W': 5, '1M': 30, '3M': 90, '1Y': 252, '5Y': 1260 };
  const svg = document.getElementById('chartSvg');
  if (svg) {
    const stock = marketData?.watchlist?.find(s => s.symbol === (document.getElementById('tickerInput')?.value || 'NVDA'));
    const data = generateCandleData(stock?.price || 100, days[period] || 30);
    renderCandlestickChart(svg, data);
  }
}

function goDeepDive(tk) {
  document.getElementById('tickerInput').value = tk;
  switchMainTab('deep');
  // renderDeepAnalysis already called by switchMainTab
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function runAnalysis() {
  const tk = document.getElementById('tickerInput')?.value.trim().toUpperCase();
  if (!tk) return;
  renderDeepAnalysis(tk);
}

// ========== Ticker Suggestions ==========
function renderTickerSuggestions() {
  const container = document.getElementById('tickerSuggestions');
  if (!container) return;
  const suggestions = [];
  if (marketData?.watchlist) {
    marketData.watchlist.forEach(s => {
      const cls = s.change >= 0 ? 'text-green' : 'text-red';
      const sign = s.change >= 0 ? '+' : '';
      suggestions.push({ symbol: s.symbol, change: s.change, cls, sign });
    });
  }
  suggestions.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  let html = '';
  suggestions.slice(0, 8).forEach(s => {
    html += `<button class="ticker-chip" onclick="vmApp.quickTicker('${s.symbol}')"><span class="ticker-chip-symbol">${s.symbol}</span><span class="${s.cls}">${s.sign}${s.change.toFixed(1)}%</span></button>`;
  });
  container.innerHTML = html;
}

function quickTicker(symbol) {
  const input = document.getElementById('tickerInput');
  if (input) input.value = symbol;
  renderDeepAnalysis(symbol);
}

// ========== Helpers ==========
function formatPrice(val) {
  if (val == null) return '—';
  if (val >= 1000) return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (val >= 1) return val.toFixed(2);
  return val.toFixed(4);
}

function formatVolume(val) {
  if (!val) return '—';
  if (val >= 1e9) return (val / 1e9).toFixed(1) + 'B';
  if (val >= 1e6) return (val / 1e6).toFixed(1) + 'M';
  if (val >= 1e3) return (val / 1e3).toFixed(0) + 'K';
  return String(val);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ========== Init ==========
function initLang() {
  const langZh = document.getElementById('lang-zh');
  const langEn = document.getElementById('lang-en');
  if (langZh) langZh.addEventListener('click', () => {
    setLang('zh');
    langZh.classList.add('active');
    langEn.classList.remove('active');
    renderAll();
  });
  if (langEn) langEn.addEventListener('click', () => {
    setLang('en');
    langEn.classList.add('active');
    langZh.classList.remove('active');
    renderAll();
  });
}

// ========== Alpha Events Data ==========
function getAlphaEvents() {
  return {
    zh: [
      {
        conclusion: 'NVDA Q4营收$39.3B超预期+78%，AI算力现金流持续验证',
        impacts: [
          { asset: 'NVDA', direction: 'up', note: 'FCF创新高$16.8B，Blackwell加速出货' },
          { asset: 'AMD/TSM', direction: 'up', note: 'AI算力板块整体受益' },
        ],
        priority: 'important', // urgent / important / inflection
        tags: ['财报', '行业动态'],
      },
      {
        conclusion: '美联储官员暗示降息推迟，10Y收益率升至4.15%',
        impacts: [
          { asset: '成长股', direction: 'down', note: 'DCF折现率上升，估值承压' },
          { asset: 'BRK-B/银行', direction: 'up', note: '保险浮存金/净息差受益' },
        ],
        priority: 'urgent',
        tags: ['央行', '政策'],
      },
      {
        conclusion: '中国出台新一轮消费刺激政策，恒指反弹2.3%',
        impacts: [
          { asset: 'BABA/BYD', direction: 'up', note: '电商+新能源车政策利好' },
          { asset: 'AAPL中国', direction: 'mixed', note: '消费复苏但竞争加剧' },
        ],
        priority: 'important',
        tags: ['政策', '机会'],
      },
      {
        conclusion: '特朗普宣布对华关税从25%升至35%，供应链风险升级',
        impacts: [
          { asset: 'AAPL/TSLA', direction: 'down', note: '中国供应链成本上升' },
          { asset: 'COST', direction: 'down', note: '进口商品成本转嫁压力' },
        ],
        priority: 'urgent',
        tags: ['政策', '风险'],
      },
    ],
    en: [
      {
        conclusion: 'NVDA Q4 revenue $39.3B beat +78%, AI compute cash flow thesis confirmed',
        impacts: [
          { asset: 'NVDA', direction: 'up', note: 'FCF record $16.8B, Blackwell ramping fast' },
          { asset: 'AMD/TSM', direction: 'up', note: 'AI compute sector broadly benefits' },
        ],
        priority: 'important',
        tags: ['Earnings', 'Industry'],
      },
      {
        conclusion: 'Fed officials signal rate cut delay, 10Y yield rises to 4.15%',
        impacts: [
          { asset: 'Growth stocks', direction: 'down', note: 'Higher DCF discount rate compresses valuations' },
          { asset: 'BRK-B/Banks', direction: 'up', note: 'Insurance float/NIM benefits' },
        ],
        priority: 'urgent',
        tags: ['Central Bank', 'Policy'],
      },
      {
        conclusion: 'China launches new consumer stimulus, HSI rebounds 2.3%',
        impacts: [
          { asset: 'BABA/BYD', direction: 'up', note: 'E-commerce + EV policy tailwind' },
          { asset: 'AAPL China', direction: 'mixed', note: 'Consumer recovery but competition intensifies' },
        ],
        priority: 'important',
        tags: ['Policy', 'Opportunity'],
      },
      {
        conclusion: 'Trump raises China tariffs from 25% to 35%, supply chain risk escalates',
        impacts: [
          { asset: 'AAPL/TSLA', direction: 'down', note: 'China supply chain costs rising' },
          { asset: 'COST', direction: 'down', note: 'Import cost pass-through pressure' },
        ],
        priority: 'urgent',
        tags: ['Policy', 'Risk'],
      },
    ],
  };
}

// ========== Alpha Events Renderer ==========
function renderAlphaEvents() {
  const container = document.getElementById('alphaEventsContainer');
  if (!container) return;
  const lang = getLang();
  const events = getAlphaEvents()[lang] || getAlphaEvents().en;

  const priorityMap = {
    urgent:     { icon: '\uD83D\uDD34', zh: '急需决策', en: 'Urgent' },
    important:  { icon: '\uD83D\uDFE1', zh: '重要监控', en: 'Important' },
    inflection: { icon: '\uD83D\uDCA1', zh: '数据转折', en: 'Inflection' },
  };
  const dirIcon = { up: '\u2191', down: '\u2193', mixed: '\u2194' };
  const dirCls = { up: 'text-green', down: 'text-red', mixed: 'text-yellow' };

  const title = lang === 'zh' ? '今日关键事件' : "Today's Key Events";
  let html = `<div class="alpha-events-section"><div class="alpha-events-title">${title}</div><div class="alpha-events-grid">`;

  events.forEach(ev => {
    const p = priorityMap[ev.priority] || priorityMap.important;
    const priorityLabel = `${p.icon} ${lang === 'zh' ? p.zh : p.en}`;
    const tagsHtml = ev.tags.map(tag => `<span class="news-tag tag-default">#${tag}</span>`).join('');

    let impactsHtml = '';
    ev.impacts.forEach(imp => {
      impactsHtml += `<div class="alpha-impact-item"><span class="alpha-impact-asset mono">${escapeHtml(imp.asset)}</span><span class="alpha-impact-dir ${dirCls[imp.direction]}">${dirIcon[imp.direction]}</span><span class="alpha-impact-note">${escapeHtml(imp.note)}</span></div>`;
    });

    html += `<div class="alpha-event-card alpha-priority-${ev.priority} fade-in">
      <div class="alpha-event-priority">${priorityLabel}</div>
      <div class="alpha-event-conclusion">${escapeHtml(ev.conclusion)}</div>
      <div class="alpha-event-impacts">${impactsHtml}</div>
      <div class="alpha-event-tags">${tagsHtml}</div>
    </div>`;
  });

  html += '</div></div>';
  container.innerHTML = html;
}

// ========== Industry Performance Row ==========
function getIndustryPerformance() {
  return {
    zh: [
      { name: '科技', change: 1.2 },
      { name: '消费', change: -0.8 },
      { name: '能源', change: 0.3 },
      { name: '金融', change: -0.5 },
      { name: '医疗', change: 0.1 },
      { name: '工业', change: 0.6 },
      { name: '地产', change: -1.1 },
    ],
    en: [
      { name: 'Tech', change: 1.2 },
      { name: 'Consumer', change: -0.8 },
      { name: 'Energy', change: 0.3 },
      { name: 'Finance', change: -0.5 },
      { name: 'Healthcare', change: 0.1 },
      { name: 'Industrial', change: 0.6 },
      { name: 'Real Estate', change: -1.1 },
    ],
  };
}

function renderIndustryPerf() {
  const container = document.getElementById('industryPerfRow');
  if (!container) return;
  const lang = getLang();
  const data = getIndustryPerformance()[lang] || getIndustryPerformance().en;
  const label = lang === 'zh' ? '行业表现' : 'Sector Performance';
  let html = `<span class="industry-perf-label">${label}</span>`;
  data.forEach((s, i) => {
    const cls = s.change >= 0 ? 'text-green' : 'text-red';
    const sign = s.change >= 0 ? '+' : '';
    if (i > 0) html += '<span class="industry-perf-sep">|</span>';
    html += `<span class="industry-perf-item"><span class="industry-perf-name">${s.name}</span> <span class="${cls} mono">${sign}${s.change.toFixed(1)}%</span></span>`;
  });
  container.innerHTML = html;
}

// ========== Master Quick Opinions Row ==========
function getMasterQuickOpinions() {
  return {
    zh: [
      { name: '段永平', opinion: '高估值缩水期，应观望', style: 'text-yellow' },
      { name: 'Buffett', opinion: '现金充足，等待机会', style: 'text-green' },
      { name: 'Munger', opinion: '优质公司值得长期持有', style: 'text-green' },
    ],
    en: [
      { name: 'DYP', opinion: 'High valuation contraction, stay patient', style: 'text-yellow' },
      { name: 'Buffett', opinion: 'Cash heavy, waiting for opportunities', style: 'text-green' },
      { name: 'Munger', opinion: 'Quality businesses worth holding long-term', style: 'text-green' },
    ],
  };
}

function renderMasterOpinions() {
  const container = document.getElementById('masterOpinionsRow');
  if (!container) return;
  const lang = getLang();
  const data = getMasterQuickOpinions()[lang] || getMasterQuickOpinions().en;
  const title = lang === 'zh' ? '大师观点' : 'Master Opinions';
  let html = `<div class="master-opinions-title">${title}</div><div class="master-opinions-grid">`;
  data.forEach(m => {
    html += `<div class="master-opinion-item"><span class="master-opinion-name">${escapeHtml(m.name)}</span><span class="master-opinion-text ${m.style}">${escapeHtml(m.opinion)}</span></div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

// ========== News Classification Filter ==========
let activeNewsFilter = null; // null = show all
let activeNewsTags = new Set();

function renderNewsFilterBar() {
  const container = document.getElementById('newsFilterBar');
  if (!container) return;
  const lang = getLang();

  const filters = [
    { key: 'urgent',     icon: '\uD83D\uDD34', zh: '急需决策', en: 'Urgent' },
    { key: 'important',  icon: '\uD83D\uDFE1', zh: '重要监控', en: 'Important' },
    { key: 'inflection', icon: '\uD83D\uDCA1', zh: '数据转折', en: 'Inflection' },
    { key: 'noise',      icon: '\uD83D\uDCAC', zh: '媒体噪声', en: 'Noise' },
  ];

  const tags = [
    { key: '政策', en: 'Policy' },
    { key: '央行', en: 'Central Bank' },
    { key: '财报', en: 'Earnings' },
    { key: '并购', en: 'M&A' },
    { key: '风险', en: 'Risk' },
    { key: '机会', en: 'Opportunity' },
    { key: '行业动态', en: 'Industry' },
  ];

  let html = '<div class="news-filter-buttons">';
  filters.forEach(f => {
    const active = activeNewsFilter === f.key ? ' news-filter-active' : '';
    const label = lang === 'zh' ? f.zh : f.en;
    html += `<button class="news-filter-btn${active}" onclick="vmApp.filterNews('${f.key}')">${f.icon} ${label}</button>`;
  });
  html += '</div><div class="news-filter-tags">';
  tags.forEach(tag => {
    const tagLabel = lang === 'zh' ? tag.key : tag.en;
    const active = activeNewsTags.has(tag.key) ? ' news-tag-active' : '';
    html += `<button class="news-tag-pill${active}" onclick="vmApp.toggleNewsTag('${tag.key}')">#${tagLabel}</button>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

function filterNews(key) {
  activeNewsFilter = activeNewsFilter === key ? null : key;
  renderNewsFilterBar();
  renderNews();
}

function toggleNewsTag(tag) {
  if (activeNewsTags.has(tag)) {
    activeNewsTags.delete(tag);
  } else {
    activeNewsTags.add(tag);
  }
  renderNewsFilterBar();
  renderNews();
}

// ========== Sector Tags (Expandable with clickable stocks) ==========
let expandedSector = null;

function renderSectorTags() {
  const container = document.getElementById('sectorTags');
  if (!container) return;
  const lang = getLang();
  const hotTickers = getNewsHotTickers();
  // Determine sector status dynamically based on news mentions
  function sectorStatus(stocks) {
    const totalMentions = stocks.reduce((sum, s) => sum + (hotTickers[s.tk] || 0), 0);
    if (totalMentions >= 5) return 'hot';
    if (totalMentions >= 2) return 'active';
    return 'neutral';
  }
  const baseSectors = [
    { name: lang === 'zh' ? 'AI算力' : 'AI Compute', stocks: [
      { tk: 'NVDA', note: lang === 'zh' ? 'GPU龙头，Q4 FCF $16.8B' : 'GPU leader, Q4 FCF $16.8B' },
      { tk: 'AMD', note: lang === 'zh' ? 'MI300X追赶，数据中心+32%' : 'MI300X catching up, DC +32%' },
      { tk: 'TSM', note: lang === 'zh' ? '代工垄断，先进制程护城河' : 'Foundry monopoly, node moat' },
    ]},
    { name: lang === 'zh' ? '能源/石油' : 'Energy/Oil', stocks: [
      { tk: 'CVX', note: lang === 'zh' ? '股息+4%年化$6.52，FCF强劲' : 'Div +4% annualized $6.52, strong FCF' },
      { tk: 'XOM', note: lang === 'zh' ? '全球最大石油公司，现金牛' : 'Largest oil major, cash cow' },
    ]},
    { name: lang === 'zh' ? '消费/零售' : 'Consumer', stocks: [
      { tk: 'COST', note: lang === 'zh' ? '会员续费93.4%，消费者特许权' : '93.4% renewal, consumer franchise' },
      { tk: 'AAPL', note: lang === 'zh' ? '服务毛利>70%，安装基20亿' : 'Services GM >70%, 2B installed base' },
    ]},
    { name: lang === 'zh' ? '企业SaaS' : 'Enterprise SaaS', stocks: [
      { tk: 'MSFT', note: lang === 'zh' ? 'Azure AI ARR $13B，Copilot变现' : 'Azure AI ARR $13B, Copilot monetizing' },
      { tk: 'GOOGL', note: lang === 'zh' ? '搜索+Cloud双引擎，AI投入大' : 'Search + Cloud dual engine, heavy AI spend' },
    ]},
    { name: lang === 'zh' ? '中概股' : 'China ADR', stocks: [
      { tk: 'BABA', note: lang === 'zh' ? '云智能分拆+回购，估值极低' : 'Cloud spin-off + buyback, ultra cheap valuation' },
    ]},
  ];
  // Add news hot badge to stock notes
  const sectors = baseSectors.map(s => ({
    ...s,
    status: sectorStatus(s.stocks),
    stocks: s.stocks.map(st => ({
      ...st,
      note: (hotTickers[st.tk] ? `🔥${hotTickers[st.tk]} ` : '') + st.note,
    })),
  }));
  const sLabel = lang === 'zh' ? '关联重点板块' : 'Key Sectors in Focus';
  let html = `<div class="section-label">${sLabel}</div><div class="sector-tags-row">`;
  sectors.forEach((s, i) => {
    const cls = s.status === 'hot' ? 'sector-tag-hot' : s.status === 'active' ? 'sector-tag-active' : 'sector-tag-neutral';
    const isExp = expandedSector === i;
    html += `<button class="sector-tag ${cls}${isExp ? ' sector-tag-open' : ''}" onclick="vmApp.toggleSector(${i})"><span class="sector-dot"></span>${s.name}<span class="sector-arrow">${isExp ? '▲' : '▼'}</span></button>`;
  });
  html += '</div>';
  if (expandedSector !== null && sectors[expandedSector]) {
    const s = sectors[expandedSector];
    html += '<div class="sector-stock-list">';
    s.stocks.forEach(st => {
      html += `<div class="sector-stock-item" onclick="vmApp.goDeepDive('${st.tk}')"><span class="sector-stock-tk">${st.tk}</span><span class="sector-stock-note">${st.note}</span><span class="sector-stock-arrow">→</span></div>`;
    });
    html += '</div>';
  }
  container.innerHTML = html;
}

function toggleSector(idx) {
  expandedSector = expandedSector === idx ? null : idx;
  renderSectorTags();
}

// ========== Impact Table (Dynamic, clickable tickers) ==========
function renderImpactTable() {
  const container = document.getElementById('impactTableContainer');
  if (!container) return;
  const lang = getLang();
  const impacts = [
    { event: lang === 'zh' ? 'NVDA财报超预期' : 'NVDA earnings beat', tickers: ['NVDA', 'AMD', 'TSM'], dir: 'bullish', logic: lang === 'zh' ? 'AI资本开支周期加速，FCF创新高验证现金流' : 'AI capex cycle accelerating, record FCF validates cash flow' },
    { event: lang === 'zh' ? '10Y收益率上行' : '10Y yield rising', tickers: ['BRK-B', 'COST'], dir: 'mixed', logic: lang === 'zh' ? '折现率↑压缩成长股估值，利好价值股/保险浮存金' : 'Higher discount rate compresses growth; benefits value stocks/insurance float' },
    { event: lang === 'zh' ? '中国刺激政策' : 'China stimulus', tickers: ['BABA', 'GOOGL'], dir: 'bullish', logic: lang === 'zh' ? '消费复苏利好电商，关注自由现金流改善' : 'Consumer recovery benefits e-commerce, watch FCF improvement' },
    { event: lang === 'zh' ? '关税升级' : 'Tariff escalation', tickers: ['AAPL', 'COST'], dir: 'bearish', logic: lang === 'zh' ? '供应链成本↑ → 毛利率承压，关注定价权能否转嫁' : 'Supply chain cost ↑ → margin pressure, watch pricing power pass-through' },
  ];
  const dirMap = { bullish: { cls: 'text-green', zh: '看多', en: 'Bullish' }, bearish: { cls: 'text-red', zh: '看空', en: 'Bearish' }, mixed: { cls: 'text-yellow', zh: '混合', en: 'Mixed' } };
  let html = `<table class="impact-table"><thead><tr><th>${t('recap.th_event')}</th><th>${t('recap.th_assets')}</th><th class="text-center">${t('recap.th_dir')}</th><th class="hide-mobile">${t('recap.th_logic')}</th></tr></thead><tbody>`;
  impacts.forEach(imp => {
    const tickerLinks = imp.tickers.map(tk => `<a class="impact-ticker" onclick="vmApp.goDeepDive('${tk}')">${tk}</a>`).join(', ');
    const d = dirMap[imp.dir];
    html += `<tr><td>${imp.event}</td><td class="mono">${tickerLinks}</td><td class="text-center"><span class="${d.cls} fw-600">${d[lang] || d.en}</span></td><td class="hide-mobile text-muted">${imp.logic}</td></tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

function renderAll() {
  renderSignals(currentMaster.signal);
  renderFearGreed();
  renderAlphaEvents();
  renderIndustryPerf();
  renderMasterOpinions();
  renderNewsFilterBar();
  renderNews();
  renderSectorTags();
  renderImpactTable();
  renderLastUpdate();
  const tk = document.getElementById('tickerInput')?.value || 'NVDA';
  renderDeepAnalysis(tk);
}

// ========== Compare Page (行业对标) ==========
const industryGroups = {
  all: { zh: '全部', en: 'All', symbols: [] }, // populated dynamically
  ai_chip: { zh: 'AI/芯片', en: 'AI/Chips', symbols: ['NVDA', 'AMD', 'TSM'] },
  tech_giant: { zh: '科技巨头', en: 'Tech Giants', symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'] },
  consumer: { zh: '消费', en: 'Consumer', symbols: ['COST', 'BABA'] },
  energy: { zh: '能源', en: 'Energy', symbols: ['CVX', 'XOM'] },
  fin_health: { zh: '金融/医疗/SaaS', en: 'Finance/Health/SaaS', symbols: ['BRK-B', 'UNH', 'CRM'] },
};

let currentIndustry = 'all';
let compareSortCol = 'pe';
let compareSortAsc = true;

function getCompareStocks(industry) {
  if (!stockDetailsData) return [];
  const allSymbols = Object.keys(stockDetailsData);
  industryGroups.all.symbols = allSymbols;
  const symbols = industryGroups[industry]?.symbols || allSymbols;
  return symbols.filter(s => stockDetailsData[s]).map(symbol => {
    const d = stockDetailsData[symbol];
    return {
      symbol,
      price: d.price,
      pe: d.pe,
      forwardPE: d.forwardPE,
      peg: d.peg,
      evEbitda: d.evEbitda,
      grossMargin: d.grossMargin,
      revenueGrowth: d.revenueGrowth,
      roe: d.roe,
      marketCap: d.marketCap,
    };
  });
}

function getValuationStatus(pe, stocks) {
  const lang = getLang();
  const validPEs = stocks.map(s => s.pe).filter(v => v && v > 0);
  if (!pe || pe <= 0 || validPEs.length === 0) return { label: '—', cls: 'status-fair' };
  validPEs.sort((a, b) => a - b);
  const median = validPEs[Math.floor(validPEs.length / 2)];
  if (pe < median * 0.8) return { label: lang === 'zh' ? '💰 便宜' : '💰 Cheap', cls: 'status-cheap' };
  if (pe > median * 1.2) return { label: lang === 'zh' ? '⚠️ 偏贵' : '⚠️ Expensive', cls: 'status-expensive' };
  return { label: lang === 'zh' ? '✓ 合理' : '✓ Fair', cls: 'status-fair' };
}

function renderComparisonPage() {
  renderIndustrySelector();
  renderComparisonTable();
  renderScatterPlot();
}

function renderIndustrySelector() {
  const container = document.getElementById('industrySelector');
  if (!container) return;
  const lang = getLang();
  let html = '';
  Object.entries(industryGroups).forEach(([key, group]) => {
    const active = currentIndustry === key ? ' active' : '';
    const label = lang === 'zh' ? group.zh : group.en;
    html += `<button class="compare-industry-btn${active}" onclick="vmApp.switchIndustry('${key}')">${label}</button>`;
  });
  container.innerHTML = html;
}

function switchIndustry(industry) {
  currentIndustry = industry;
  renderComparisonPage();
}

function sortCompareTable(col) {
  if (compareSortCol === col) {
    compareSortAsc = !compareSortAsc;
  } else {
    compareSortCol = col;
    compareSortAsc = true;
  }
  renderComparisonTable();
}

function renderComparisonTable() {
  const container = document.getElementById('compareTableContainer');
  if (!container) return;
  const lang = getLang();
  let stocks = getCompareStocks(currentIndustry);
  if (stocks.length === 0) {
    container.innerHTML = '<div class="loading">Loading stock data...</div>';
    return;
  }

  // Sort
  stocks.sort((a, b) => {
    let va = a[compareSortCol], vb = b[compareSortCol];
    if (va == null) va = compareSortAsc ? Infinity : -Infinity;
    if (vb == null) vb = compareSortAsc ? Infinity : -Infinity;
    if (compareSortCol === 'symbol') {
      return compareSortAsc ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    }
    return compareSortAsc ? va - vb : vb - va;
  });

  const cols = [
    { key: 'symbol', label: lang === 'zh' ? '公司' : 'Company' },
    { key: 'price', label: lang === 'zh' ? '股价' : 'Price' },
    { key: 'pe', label: 'PE' },
    { key: 'forwardPE', label: lang === 'zh' ? '远期PE' : 'Fwd PE' },
    { key: 'evEbitda', label: 'EV/EBITDA' },
    { key: 'grossMargin', label: lang === 'zh' ? '毛利率' : 'Gross Margin' },
    { key: 'revenueGrowth', label: lang === 'zh' ? '增速' : 'Growth' },
    { key: 'roe', label: 'ROE' },
    { key: 'status', label: lang === 'zh' ? '状态' : 'Status' },
  ];

  let html = '<table class="compare-table"><thead><tr>';
  cols.forEach(col => {
    const isActive = compareSortCol === col.key ? ' sort-active' : '';
    const arrow = compareSortCol === col.key ? (compareSortAsc ? '▲' : '▼') : '↕';
    if (col.key === 'status') {
      html += `<th>${col.label}</th>`;
    } else {
      html += `<th class="${isActive}" onclick="vmApp.sortCompareTable('${col.key}')">${col.label} <span class="sort-arrow">${arrow}</span></th>`;
    }
  });
  html += '</tr></thead><tbody>';

  stocks.forEach(s => {
    const status = getValuationStatus(s.pe, stocks);
    const fmtPct = v => v != null ? (v * 100).toFixed(1) + '%' : '—';
    const fmtNum = v => v != null ? v.toFixed(1) : '—';
    html += `<tr onclick="vmApp.goDeepDive('${s.symbol}')">`;
    html += `<td class="col-symbol">${s.symbol}</td>`;
    html += `<td>$${s.price?.toFixed(2) || '—'}</td>`;
    html += `<td>${fmtNum(s.pe)}</td>`;
    html += `<td>${fmtNum(s.forwardPE)}</td>`;
    html += `<td>${fmtNum(s.evEbitda)}</td>`;
    html += `<td>${fmtPct(s.grossMargin)}</td>`;
    html += `<td class="${s.revenueGrowth >= 0 ? 'text-green' : 'text-red'}">${fmtPct(s.revenueGrowth)}</td>`;
    html += `<td>${fmtPct(s.roe)}</td>`;
    html += `<td class="col-status"><span class="${status.cls}">${status.label}</span></td>`;
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

function renderScatterPlot() {
  const container = document.getElementById('scatterPlotContainer');
  if (!container) return;
  const lang = getLang();
  const stocks = getCompareStocks(currentIndustry);
  if (stocks.length === 0) {
    container.innerHTML = '<div class="loading">Loading...</div>';
    return;
  }

  // Filter to stocks with valid PE and growth
  const valid = stocks.filter(s => s.pe && s.pe > 0 && s.pe < 200 && s.revenueGrowth != null);
  if (valid.length === 0) {
    container.innerHTML = '<div class="text-muted text-center" style="padding:40px">No valid data for scatter plot</div>';
    return;
  }

  const W = 720, H = 420;
  const margin = { top: 40, right: 40, bottom: 55, left: 60 };
  const plotW = W - margin.left - margin.right;
  const plotH = H - margin.top - margin.bottom;

  const pes = valid.map(s => s.pe);
  const growths = valid.map(s => s.revenueGrowth * 100);

  const peMin = Math.max(0, Math.min(...pes) - 5);
  const peMax = Math.max(...pes) + 5;
  const gMin = Math.min(...growths) - 5;
  const gMax = Math.max(...growths) + 5;

  // Medians
  const sortedPE = [...pes].sort((a, b) => a - b);
  const sortedG = [...growths].sort((a, b) => a - b);
  const medianPE = sortedPE[Math.floor(sortedPE.length / 2)];
  const medianG = sortedG[Math.floor(sortedG.length / 2)];

  const scaleX = pe => margin.left + ((pe - peMin) / (peMax - peMin)) * plotW;
  const scaleY = g => margin.top + plotH - ((g - gMin) / (gMax - gMin)) * plotH;

  let svg = `<svg class="scatter-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;

  // Grid lines
  for (let i = 0; i <= 5; i++) {
    const x = margin.left + (plotW / 5) * i;
    const y = margin.top + (plotH / 5) * i;
    svg += `<line x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + plotH}" class="scatter-grid-line"/>`;
    svg += `<line x1="${margin.left}" y1="${y}" x2="${margin.left + plotW}" y2="${y}" class="scatter-grid-line"/>`;
    // X tick labels
    const peVal = peMin + ((peMax - peMin) / 5) * i;
    svg += `<text x="${x}" y="${margin.top + plotH + 18}" text-anchor="middle" class="scatter-tick-label">${peVal.toFixed(0)}</text>`;
    // Y tick labels
    const gVal = gMax - ((gMax - gMin) / 5) * i;
    svg += `<text x="${margin.left - 8}" y="${y + 4}" text-anchor="end" class="scatter-tick-label">${gVal.toFixed(0)}%</text>`;
  }

  // Median lines
  const medX = scaleX(medianPE);
  const medY = scaleY(medianG);
  svg += `<line x1="${medX}" y1="${margin.top}" x2="${medX}" y2="${margin.top + plotH}" class="scatter-median-line"/>`;
  svg += `<line x1="${margin.left}" y1="${medY}" x2="${margin.left + plotW}" y2="${medY}" class="scatter-median-line"/>`;

  // Quadrant labels
  const quadLabels = lang === 'zh'
    ? { tl: '高增低估', tr: '高增高估', bl: '低增低估', br: '低增高估' }
    : { tl: 'High Growth\nLow PE', tr: 'High Growth\nHigh PE', bl: 'Low Growth\nLow PE', br: 'Low Growth\nHigh PE' };
  const quadColors = { tl: '#00B074', tr: '#FF9500', bl: '#999999', br: '#FF3B30' };

  const qLabelX = { tl: margin.left + 10, tr: margin.left + plotW - 10, bl: margin.left + 10, br: margin.left + plotW - 10 };
  const qLabelY = { tl: margin.top + 18, tr: margin.top + 18, bl: margin.top + plotH - 10, br: margin.top + plotH - 10 };
  const qAnchor = { tl: 'start', tr: 'end', bl: 'start', br: 'end' };

  ['tl', 'tr', 'bl', 'br'].forEach(q => {
    const lines = quadLabels[q].split('\n');
    lines.forEach((line, i) => {
      svg += `<text x="${qLabelX[q]}" y="${qLabelY[q] + i * 15}" text-anchor="${qAnchor[q]}" class="scatter-quadrant-label" fill="${quadColors[q]}">${line}</text>`;
    });
  });

  // Axis labels
  const xLabel = lang === 'zh' ? 'PE (市盈率)' : 'PE Ratio';
  const yLabel = lang === 'zh' ? '营收增速 (%)' : 'Revenue Growth (%)';
  svg += `<text x="${margin.left + plotW / 2}" y="${H - 5}" text-anchor="middle" class="scatter-axis-label">${xLabel}</text>`;
  svg += `<text x="15" y="${margin.top + plotH / 2}" text-anchor="middle" class="scatter-axis-label" transform="rotate(-90, 15, ${margin.top + plotH / 2})">${yLabel}</text>`;

  // Dots
  valid.forEach(s => {
    const x = scaleX(s.pe);
    const y = scaleY(s.revenueGrowth * 100);
    const g = s.revenueGrowth * 100;
    // Quadrant color
    let color;
    if (s.pe <= medianPE && g >= medianG) color = quadColors.tl; // high growth, low PE
    else if (s.pe > medianPE && g >= medianG) color = quadColors.tr;
    else if (s.pe <= medianPE && g < medianG) color = quadColors.bl;
    else color = quadColors.br;

    svg += `<circle cx="${x}" cy="${y}" r="6" fill="${color}" class="scatter-dot" onclick="vmApp.goDeepDive('${s.symbol}')"/>`;
    svg += `<text x="${x}" y="${y - 10}" text-anchor="middle" class="scatter-label">${s.symbol}</text>`;
  });

  svg += '</svg>';
  container.innerHTML = svg;
}

window.vmApp = { switchMainTab, switchMaster, switchDeepTab, switchChartPeriod, goDeepDive, runAnalysis, quickTicker, toggleSector, filterNews, toggleNewsTag, switchIndustry, sortCompareTable, switchValModel, onSliderChange };

document.addEventListener('DOMContentLoaded', () => {
  const d = new Date();
  const dateStr = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
  const dateEl = document.getElementById('dateDisplay');
  if (dateEl) dateEl.textContent = dateStr;
  const dateLabel = document.getElementById('dateLabel');
  if (dateLabel) dateLabel.textContent = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  initLang();
  setLang('zh');
  loadAllData();
  renderSignals('duan');
});
