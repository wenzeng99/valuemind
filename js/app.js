// ========== ValueMind — Main App ==========
import { translations, setLang, t, getLang } from './i18n.js';
import { generateCandleData, renderCandlestickChart } from './chart.js';

// ========== State ==========
let marketData = null;
let cryptoData = null;
let newsData = null;
let fearGreedData = null;
let metaData = null;
let currentMaster = { signal: 'duan', deep: 'duan' };
let currentDeepTab = 'overview';

// ========== Stock Analysis Data (keyed by symbol) ==========
const stockAnalysis = {
  NVDA: {
    exchange: 'NASDAQ',
    revGrowth: '+78%', epsEst: '$0.89 vs est $0.84', grossMargin: '73.0%', dataCenterRev: '$35.1B (+93%)',
    peFwd: '24.8x', peg: '0.60', evEbitda: '28.5x', ps: '28.2x',
    netMargin: '55.8%', roe: '115%', fcfYield: '1.8%', divYield: '0.02%',
    valuationPctl: 75,
    summary: {
      zh: 'NVDA是AI基础设施的绝对龙头。Q4营收$39.3B（+78% YoY）大超预期，Blackwell加速出货。PEG 0.6说明增长正在消化高估值。但75分位估值意味着安全边际较薄。',
      en: 'NVDA is the dominant AI infrastructure play. Q4 revenue $39.3B (+78% YoY) crushed estimates, Blackwell ramping ahead of schedule. PEG 0.6 suggests growth digesting premium. At 75th pctl valuation, margin of safety is thin.',
    },
    verdict: { zh: '观望 — 等待$120-130入场', en: 'WATCH — Wait for $120-130 entry' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: 'AI算力=结构性需求。如同淘金热中的铲子。' },
        { status: 'uncertain', q: '赚得更多？ — 不确定', a: '50%+ YoY增速不可持续，将回归15-20%。关键风险：竞争。' },
        { status: 'positive', q: '护城河？ — 强（3-5年）', a: 'CUDA生态是护城河。关注自研芯片（Google/Amazon/Meta）。' },
      ],
      en: [
        { status: 'positive', q: 'Profitable in 10yr? — Yes', a: 'AI compute = structural demand. Like shovels in a Gold Rush.' },
        { status: 'uncertain', q: 'Earning more? — Uncertain', a: '50%+ YoY unsustainable. Growth normalizes to 15-20%. Key risk: competition.' },
        { status: 'positive', q: 'Moat? — Strong (3-5yr)', a: 'CUDA ecosystem is the moat. Watch in-house chips (Google, Amazon, Meta).' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '等$120-130', q: 'NVDA=卖铲子。CUDA=护城河。+1110%加仓。但需要安全边际。' },
        { name: 'Buffett', color: 'yellow', verdict: '能力圈外', q: '好公司，但我不懂芯片迭代。$373B现金就是我的态度。' },
        { name: 'Munger', color: 'green', verdict: '合理价可买', q: 'NVDA之于AI=微软之于PC。PEG 0.6。但反转思维：什么让NVDA失败？' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Wait $120-130', q: 'NVDA = selling shovels. CUDA = moat. +1,110% position. But need margin of safety.' },
        { name: 'Buffett', color: 'yellow', verdict: 'Outside circle', q: 'Great company, but I don\'t understand chip iteration. $373B cash is patient.' },
        { name: 'Munger', color: 'green', verdict: 'Fair price OK', q: 'NVDA in AI = Microsoft in PCs. PEG 0.6 = growth digesting valuation. Control size.' },
      ],
    },
  },
  AAPL: {
    exchange: 'NASDAQ',
    revGrowth: '+4%', epsEst: '$2.40 vs est $2.35', grossMargin: '46.2%', dataCenterRev: 'Services $23.1B (+14%)',
    peFwd: '30.5x', peg: '2.80', evEbitda: '26.1x', ps: '8.9x',
    netMargin: '25.3%', roe: '160%', fcfYield: '3.2%', divYield: '0.44%',
    valuationPctl: 82,
    summary: {
      zh: 'Apple的服务业务持续增长，但iPhone增速放缓。品牌护城河极强但估值偏高（PEG 2.8）。AI功能落后竞争对手，需关注iPhone 17周期。',
      en: 'Apple Services growing steadily but iPhone growth slowing. Brand moat is exceptional but valuation stretched (PEG 2.8). AI features lagging competitors, watch iPhone 17 cycle.',
    },
    verdict: { zh: '持有 — 不追高，回调到$220考虑', en: 'HOLD — Don\'t chase, consider at $220 pullback' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '生态系统粘性极强，20亿+活跃设备。' },
        { status: 'positive', q: '赚得更多？ — 大概率', a: '服务收入占比持续提升，毛利率更高。' },
        { status: 'positive', q: '护城河？ — 极强', a: '品牌+生态+转换成本，几乎不可复制。' },
      ],
      en: [
        { status: 'positive', q: 'Profitable in 10yr? — Yes', a: 'Ecosystem stickiness is extreme, 2B+ active devices.' },
        { status: 'positive', q: 'Earning more? — Likely', a: 'Services revenue share rising, higher margins.' },
        { status: 'positive', q: 'Moat? — Very Strong', a: 'Brand + ecosystem + switching costs, nearly irreplicable.' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'yellow', verdict: '持有不追', q: '好公司但太贵。等大幅回调。' },
        { name: 'Buffett', color: 'green', verdict: '核心持仓', q: '消费者特许权的巅峰。我能理解的最好的生意之一。' },
        { name: 'Munger', color: 'yellow', verdict: '好但贵', q: '伟大企业，但当前价格透支了未来几年增长。' },
      ],
      en: [
        { name: 'DYP', color: 'yellow', verdict: 'Hold, don\'t chase', q: 'Great company but too expensive. Wait for deep pullback.' },
        { name: 'Buffett', color: 'green', verdict: 'Core holding', q: 'Peak consumer franchise. One of the best businesses I understand.' },
        { name: 'Munger', color: 'yellow', verdict: 'Great but pricey', q: 'Wonderful business, but current price discounts years of growth.' },
      ],
    },
  },
  MSFT: {
    exchange: 'NASDAQ',
    revGrowth: '+12%', epsEst: '$3.23 vs est $3.11', grossMargin: '69.4%', dataCenterRev: 'Azure +29%',
    peFwd: '29.8x', peg: '2.10', evEbitda: '24.5x', ps: '12.8x',
    netMargin: '35.6%', roe: '38%', fcfYield: '2.8%', divYield: '0.72%',
    valuationPctl: 70,
    summary: {
      zh: 'Azure云增长29%稳健，Copilot AI推动Office生态升级。估值合理但非便宜（PEG 2.1）。企业级护城河极深。',
      en: 'Azure cloud growth 29% is solid, Copilot AI driving Office ecosystem upgrades. Fair but not cheap valuation (PEG 2.1). Enterprise moat is very deep.',
    },
    verdict: { zh: '可持有 — 回调到$360考虑加仓', en: 'HOLD — Consider adding at $360 pullback' },
    verdictColor: 'text-green',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '企业IT基础设施不可或缺，云+AI双引擎。' },
        { status: 'positive', q: '赚得更多？ — 是', a: 'AI Copilot提价空间大，Azure份额持续增长。' },
        { status: 'positive', q: '护城河？ — 极强', a: 'Office+Azure+GitHub+LinkedIn，生态壁垒极高。' },
      ],
      en: [
        { status: 'positive', q: 'Profitable in 10yr? — Yes', a: 'Enterprise IT infrastructure is essential, cloud + AI dual engines.' },
        { status: 'positive', q: 'Earning more? — Yes', a: 'AI Copilot has pricing power, Azure share keeps growing.' },
        { status: 'positive', q: 'Moat? — Very Strong', a: 'Office + Azure + GitHub + LinkedIn, ecosystem barrier is immense.' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '持有', q: '企业级护城河。理解商业模式，可长持。' },
        { name: 'Buffett', color: 'green', verdict: '能力圈内', q: '盈利能力强，分红增长稳定。' },
        { name: 'Munger', color: 'green', verdict: '好价格好公司', q: '垄断级地位，PEG合理。长期持有。' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Hold', q: 'Enterprise moat. Understand the business, long-term hold.' },
        { name: 'Buffett', color: 'green', verdict: 'In circle', q: 'Strong profitability, stable dividend growth.' },
        { name: 'Munger', color: 'green', verdict: 'Good price, good co', q: 'Monopoly position, reasonable PEG. Long-term hold.' },
      ],
    },
  },
};

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
  };
}

// ========== Signal Data ==========
const signalData = {
  zh: {
    duan: [
      { type:'green', cat:'AI算力', title:'NVIDIA市值破$5T，AI资本开支持续超预期', tk:'NVDA', q:'卖铲子的生意。加仓1110%，但这个价格不追。' },
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'会员制护城河，如茅台。简单、可预测。' },
      { type:'yellow', cat:'SaaS', title:'Salesforce AI agent收入增长强劲，但估值偏高', tk:'CRM', q:'企业AI是好赛道，但CRM的护城河没有想象中深。' },
      { type:'yellow', cat:'Crypto', title:'BTC ETF单日流入$12亿创纪录', tk:'BTC', q:'不产生现金流但机构化在加速。作为另类资产可以理解，但不是价投。' },
      { type:'red', cat:'关税政策', title:'特朗普25%对华关税升级', tk:'—', q:'政策驱动不碰。投资找10年不变的东西。' },
      { type:'red', cat:'Meme', title:'Dogecoin暴涨40%，Meme板块狂欢', tk:'—', q:'不产生现金流。投机不是投资。' },
    ],
    buffett: [
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'消费者特许权典范。我能理解的好生意。' },
      { type:'green', cat:'能源', title:'雪佛龙提高股息+4%，年化达$6.52', tk:'CVX', q:'石油不会消失。现金流强劲，分红持续增长。' },
      { type:'yellow', cat:'保险', title:'美国保险业综合成本率改善', tk:'BRK.B', q:'Berkshire的能力圈。浮存金是核武器，但当前不够便宜。' },
      { type:'red', cat:'高估值科技', title:'七巨头总市值$20T占标普四成', tk:'—', q:'$3733亿现金说明一切。太贵了。' },
      { type:'red', cat:'Crypto', title:'DOGE暴涨40%', tk:'—', q:'老鼠药的平方。' },
    ],
    munger: [
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'最爱。低毛利高周转，会员费=纯利润。' },
      { type:'green', cat:'AI算力', title:'NVIDIA市值破$5T', tk:'NVDA', q:'好公司可以付合理价格。PEG 0.6。但反转思维：什么让NVDA失败？' },
      { type:'yellow', cat:'医疗', title:'UnitedHealth估值合理但面临反垄断审查', tk:'UNH', q:'医疗是人口老龄化的确定趋势，但监管风险大。' },
      { type:'yellow', cat:'Crypto基建', title:'Coinbase Q4收入翻倍，受益于ETF', tk:'COIN', q:'受益于BTC ETF，但加密市场的周期性让我不确定。' },
      { type:'red', cat:'银行股', title:'美国中小银行因商业地产下跌', tk:'—', q:'资产负债表里隐藏风险太多。赚小钱，可能归零。' },
    ],
  },
  en: {
    duan: [
      { type:'green', cat:'AI Compute', title:'NVIDIA surpasses $5T, AI capex exceeds expectations', tk:'NVDA', q:'Shovel business. +1,110% position. But won\'t chase here.' },
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Membership moat. Simple, predictable.' },
      { type:'yellow', cat:'SaaS', title:'Salesforce AI agent revenue surges, valuation stretched', tk:'CRM', q:'Enterprise AI is good, but CRM moat isn\'t as deep as imagined.' },
      { type:'yellow', cat:'Crypto', title:'BTC ETF $1.2B single-day inflow, record', tk:'BTC', q:'No cash flow but institutionalizing fast. Not value investing.' },
      { type:'red', cat:'Tariff', title:'Trump 25% China tariff escalation', tk:'—', q:'Policy-driven = avoid. Find 10-year certainties.' },
      { type:'red', cat:'Meme', title:'Dogecoin surges 40%, meme euphoria', tk:'—', q:'No cash flow. Speculation is not investing.' },
    ],
    buffett: [
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Consumer franchise epitome. A business I understand.' },
      { type:'green', cat:'Energy', title:'Chevron hikes dividend +4%, annualized $6.52', tk:'CVX', q:'Oil isn\'t going away. Strong cash flow, growing dividends.' },
      { type:'yellow', cat:'Insurance', title:'US insurance combined ratios improve', tk:'BRK.B', q:'Berkshire\'s sweet spot. Float is our weapon, but not cheap enough.' },
      { type:'red', cat:'Tech Valuation', title:'Mag 7 at $20T = 40% of S&P', tk:'—', q:'$373B cash says it all.' },
      { type:'red', cat:'Crypto', title:'DOGE surges 40%', tk:'—', q:'Rat poison squared.' },
    ],
    munger: [
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Favorite. Low margin high turnover. Membership = profit.' },
      { type:'green', cat:'AI Compute', title:'NVIDIA surpasses $5T', tk:'NVDA', q:'Fair price for great companies. PEG 0.6. Invert: what makes NVDA fail?' },
      { type:'yellow', cat:'Healthcare', title:'UnitedHealth fair valuation but antitrust risk', tk:'UNH', q:'Aging population is certain, but regulation is Damocles\' sword.' },
      { type:'yellow', cat:'Crypto Infra', title:'Coinbase Q4 revenue doubles on ETF tailwind', tk:'COIN', q:'Shovel play for BTC ETF, but crypto cyclicality concerns me.' },
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
    const [market, crypto, news, fg, meta] = await Promise.all([
      loadJSON('data/market.json'),
      loadJSON('data/crypto.json'),
      loadJSON('data/news.json'),
      loadJSON('data/fear-greed.json'),
      loadJSON('data/meta.json'),
    ]);
    marketData = market;
    cryptoData = crypto;
    newsData = news;
    fearGreedData = fg;
    metaData = meta;

    renderTicker();
    renderMarketSnapshot();
    renderFearGreed();
    renderNews();
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
  if (cryptoData) {
    cryptoData.slice(0, 3).forEach(c => addItem(c.symbol, c.price, c.change));
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
  if (cryptoData) cryptoData.slice(0, 3).forEach(c => addSnapshot(c.symbol, c.price, c.change));
  if (marketData?.macro) {
    const nameMap = { '^TNX': '10Y Yield', 'DX-Y.NYB': 'DXY', 'GC=F': 'Gold', 'CL=F': 'WTI', '^VIX': 'VIX' };
    marketData.macro.slice(0, 2).forEach(m => addSnapshot(nameMap[m.symbol] || m.name, m.price, m.change));
  }
  grid2.innerHTML = html;
}

// ========== Fear & Greed ==========
function renderFearGreed() {
  const valEl = document.getElementById('fgValue');
  const labelEl = document.getElementById('fgLabel');
  const fillEl = document.getElementById('fgFill');
  if (!valEl || !fearGreedData) return;
  const val = fearGreedData.value;
  valEl.textContent = val;
  fillEl.style.width = val + '%';
  const lang = getLang();
  let label = fearGreedData.label;
  if (lang === 'zh') {
    if (val >= 75) label = '极度贪婪';
    else if (val >= 55) label = '贪婪';
    else if (val >= 45) label = '中性';
    else if (val >= 25) label = '恐惧';
    else label = '极度恐惧';
  }
  labelEl.textContent = label;
  labelEl.className = val >= 55 ? 'text-green' : val <= 45 ? 'text-red' : 'text-yellow';
}

// ========== News ==========
function renderNews() {
  const container = document.getElementById('newsContainer');
  if (!container) return;
  if (!newsData || newsData.length === 0) {
    container.innerHTML = `<div class="news-item"><div class="news-content"><div class="news-title" style="color:var(--text-secondary)">${t('recap.no_news')}</div></div></div>`;
    return;
  }
  let html = '';
  newsData.slice(0, 10).forEach(n => {
    const sentCls = n.sentiment === 'positive' ? 'tag-positive' : n.sentiment === 'negative' ? 'tag-negative' : 'tag-neutral';
    const tags = (n.tags || []).slice(0, 3).map(tag =>
      `<span class="news-tag tag-default">${typeof tag === 'string' ? tag : tag.symbol || tag}</span>`
    ).join('');
    const titleTag = n.url && n.url !== '#'
      ? `<a class="news-title" href="${escapeAttr(n.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(n.title)}</a>`
      : `<span class="news-title">${escapeHtml(n.title)}</span>`;
    html += `<div class="news-item"><div class="news-time">${escapeHtml(n.time || '')}</div><div class="news-content">${titleTag}<div class="news-meta"><span class="news-source">${escapeHtml(n.source || '')}</span>${n.sentiment ? `<span class="news-tag ${sentCls}">${n.sentiment}</span>` : ''}${tags}</div></div></div>`;
  });
  container.innerHTML = html;
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

// ========== Deep Analysis — FULLY DYNAMIC ==========
function renderDeepAnalysis(symbol) {
  const stock = marketData?.watchlist?.find(s => s.symbol === symbol);
  const analysis = stockAnalysis[symbol] || getDefaultAnalysis(symbol, stock);
  const lang = getLang();
  const el = (id) => document.getElementById(id);

  // Quote header
  el('deepSymbol').textContent = symbol;
  el('deepExchange').textContent = analysis.exchange || '—';
  el('deepName').textContent = stock?.name || symbol;
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
  } else {
    el('deepPrice').textContent = '—';
    el('deepChange').className = 'quote-change text-muted';
    el('deepChange').textContent = '—';
    ['deepOpen','deepHigh','deepLow','deepVolume','deepMktCap','deepPE'].forEach(id => el(id).textContent = '—');
  }

  // 52-week range
  if (stock?.fiftyTwoWeekLow && stock?.fiftyTwoWeekHigh) {
    const pct = ((stock.price - stock.fiftyTwoWeekLow) / (stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow) * 100).toFixed(0);
    el('range52Low').textContent = '$' + stock.fiftyTwoWeekLow.toFixed(2);
    el('range52High').textContent = '$' + stock.fiftyTwoWeekHigh.toFixed(2);
    el('range52Fill').style.width = pct + '%';
    el('range52Marker').style.left = pct + '%';
  }

  // AI Summary
  el('aiSummaryText').textContent = analysis.summary[lang] || analysis.summary.en;

  // Overview metrics
  el('ovMktCap').textContent = stock?.marketCap ? '$' + stock.marketCap : '—';
  el('ovPE').textContent = stock?.pe ? stock.pe + 'x' : '—';
  el('ovRevGrowth').textContent = analysis.revGrowth;
  el('ovGrossMargin').textContent = analysis.grossMargin;

  // Valuation stats
  el('statPE').textContent = stock?.pe ? stock.pe + 'x' : '—';
  el('statFwdPE').textContent = analysis.peFwd;
  el('statPEG').textContent = analysis.peg;
  el('statEV').textContent = analysis.evEbitda;
  el('statPS').textContent = analysis.ps;
  el('statGrossMargin').textContent = analysis.grossMargin;
  el('statNetMargin').textContent = analysis.netMargin;
  el('statROE').textContent = analysis.roe;
  el('statFCF').textContent = analysis.fcfYield;
  el('statDiv').textContent = analysis.divYield;

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

  // Final verdict
  el('verdictResult').textContent = analysis.verdict[lang] || analysis.verdict.en;
  el('verdictResult').className = 'fw-700 ' + analysis.verdictColor;

  // Chart
  const svg = document.getElementById('chartSvg');
  if (svg) {
    const basePrice = stock?.price || 100;
    const data = generateCandleData(basePrice, 30);
    renderCandlestickChart(svg, data);
  }
}

// ========== Tab Switching ==========
function switchMainTab(tab) {
  ['recap', 'signal', 'deep'].forEach(tabId => {
    const page = document.getElementById('page-' + tabId);
    const btn = document.getElementById('mainTab-' + tabId);
    if (page) page.classList.toggle('active', tabId === tab);
    if (btn) btn.classList.toggle('active', tabId === tab);
  });
  if (tab === 'signal') renderSignals(currentMaster.signal);
  if (tab === 'deep') renderDeepAnalysis(document.getElementById('tickerInput')?.value || 'NVDA');
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
  renderDeepAnalysis(tk);
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

function renderAll() {
  renderSignals(currentMaster.signal);
  renderFearGreed();
  renderNews();
  renderLastUpdate();
  const tk = document.getElementById('tickerInput')?.value || 'NVDA';
  renderDeepAnalysis(tk);
}

window.vmApp = { switchMainTab, switchMaster, switchDeepTab, switchChartPeriod, goDeepDive, runAnalysis, quickTicker };

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
