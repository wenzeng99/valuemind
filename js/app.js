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

// ========== Signal Data (static — value investor perspectives) ==========
const signalData = {
  zh: {
    duan: [
      { type:'green', cat:'AI算力', title:'NVIDIA市值破$5T，AI资本开支持续超预期', tk:'NVDA', q:'卖铲子的生意。加仓1110%，但这个价格不追。' },
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'会员制护城河，如茅台。简单、可预测。' },
      { type:'yellow', cat:'SaaS', title:'Salesforce AI agent收入增长强劲，但估值偏高', tk:'CRM', q:'企业AI是好赛道，但CRM的护城河没有想象中深。竞争在加剧。' },
      { type:'yellow', cat:'Crypto', title:'BTC ETF单日流入$12亿创纪录', tk:'BTC', q:'不产生现金流但机构化在加速。作为另类资产配置可以理解，但不是价投。' },
      { type:'red', cat:'关税政策', title:'特朗普25%对华关税升级', tk:'—', q:'政策驱动不碰。投资找10年不变的东西。' },
      { type:'red', cat:'Meme', title:'Dogecoin暴涨40%，Meme板块狂欢', tk:'—', q:'不产生现金流。投机不是投资。' },
    ],
    buffett: [
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'消费者特许权典范。我能理解的好生意。' },
      { type:'green', cat:'能源', title:'雪佛龙提高股息+4%，年化达$6.52', tk:'CVX', q:'石油不会消失。现金流强劲，分红持续增长，这是我喜欢的生意。' },
      { type:'yellow', cat:'保险', title:'美国保险业综合成本率改善', tk:'BRK.B', q:'Berkshire的能力圈。浮存金是核武器，但当前不够便宜。' },
      { type:'red', cat:'高估值科技', title:'七巨头总市值$20T占标普四成', tk:'—', q:'$3733亿现金说明一切。太贵了。' },
      { type:'red', cat:'Crypto', title:'DOGE暴涨40%', tk:'—', q:'老鼠药的平方。' },
    ],
    munger: [
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'最爱。低毛利高周转，会员费=纯利润。"逆向思考"典范。' },
      { type:'green', cat:'AI算力', title:'NVIDIA市值破$5T', tk:'NVDA', q:'好公司可以付合理价格。PEG 0.6。但反转思维：什么让NVDA失败？' },
      { type:'yellow', cat:'医疗', title:'UnitedHealth估值合理但面临反垄断审查', tk:'UNH', q:'医疗是人口老龄化的确定趋势，但监管风险是悬在头上的达摩克利斯之剑。' },
      { type:'yellow', cat:'Crypto基建', title:'Coinbase Q4收入翻倍，受益于ETF', tk:'COIN', q:'受益于BTC ETF的"卖铲子"，但加密市场的周期性让我不确定持久性。' },
      { type:'red', cat:'银行股', title:'美国中小银行因商业地产下跌', tk:'—', q:'资产负债表里的隐藏风险太多。赚小钱，可能归零。' },
    ],
  },
  en: {
    duan: [
      { type:'green', cat:'AI Compute', title:'NVIDIA surpasses $5T, AI capex exceeds expectations', tk:'NVDA', q:'Shovel business. +1,110% position. But won\'t chase here.' },
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Membership moat. Simple, predictable.' },
      { type:'yellow', cat:'SaaS', title:'Salesforce AI agent revenue surges, but valuation stretched', tk:'CRM', q:'Enterprise AI is a good lane, but CRM moat isn\'t as deep as imagined.' },
      { type:'yellow', cat:'Crypto', title:'BTC ETF $1.2B single-day inflow, record', tk:'BTC', q:'No cash flow but institutionalizing fast. Not value investing.' },
      { type:'red', cat:'Tariff', title:'Trump 25% China tariff escalation', tk:'—', q:'Policy-driven = avoid. Find 10-year certainties.' },
      { type:'red', cat:'Meme', title:'Dogecoin surges 40%, meme euphoria', tk:'—', q:'No cash flow. Speculation is not investing.' },
    ],
    buffett: [
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Consumer franchise epitome. A business I understand.' },
      { type:'green', cat:'Energy', title:'Chevron hikes dividend +4%, annualized $6.52', tk:'CVX', q:'Oil isn\'t going away. Strong cash flow, growing dividends.' },
      { type:'yellow', cat:'Insurance', title:'US insurance sector combined ratios improve', tk:'BRK.B', q:'Berkshire\'s sweet spot. Float is our weapon, but not cheap enough.' },
      { type:'red', cat:'Tech Valuation', title:'Mag 7 at $20T = 40% of S&P', tk:'—', q:'$373B cash says it all.' },
      { type:'red', cat:'Crypto', title:'DOGE surges 40%', tk:'—', q:'Rat poison squared.' },
    ],
    munger: [
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Favorite. Low margin high turnover. Membership = profit. Inversion exemplified.' },
      { type:'green', cat:'AI Compute', title:'NVIDIA surpasses $5T', tk:'NVDA', q:'Fair price for great companies. PEG 0.6. But invert: what makes NVDA fail?' },
      { type:'yellow', cat:'Healthcare', title:'UnitedHealth fair valuation but antitrust risk', tk:'UNH', q:'Aging population is a certainty, but regulation is Damocles\' sword.' },
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

  // Market indices
  if (marketData?.indices) {
    const nameMap = { '^GSPC': 'S&P 500', '^IXIC': 'NASDAQ', '^DJI': 'DJI', '^HSI': 'HSI', '000001.SS': 'SSE', '^N225': 'NKY' };
    marketData.indices.forEach(idx => addItem(nameMap[idx.symbol] || idx.symbol, idx.price, idx.change));
  }
  // Crypto
  if (cryptoData) {
    cryptoData.slice(0, 3).forEach(c => addItem(c.symbol, c.price, c.change));
  }
  // Macro
  if (marketData?.macro) {
    const nameMap = { '^TNX': '10Y', 'DX-Y.NYB': 'DXY', 'GC=F': 'Gold', 'CL=F': 'WTI', '^VIX': 'VIX' };
    marketData.macro.forEach(m => addItem(nameMap[m.symbol] || m.symbol, m.price, m.change));
  }

  // Duplicate for seamless loop
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

  // Second row: crypto + macro
  const grid2 = document.getElementById('snapshotGrid2');
  if (!grid2) return;
  html = '';
  if (cryptoData) {
    cryptoData.slice(0, 3).forEach(c => addSnapshot(c.symbol, c.price, c.change));
  }
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

    html += `
      <div class="news-item">
        <div class="news-time">${escapeHtml(n.time || '')}</div>
        <div class="news-content">
          ${titleTag}
          <div class="news-meta">
            <span class="news-source">${escapeHtml(n.source || '')}</span>
            ${n.sentiment ? `<span class="news-tag ${sentCls}">${n.sentiment}</span>` : ''}
            ${tags}
          </div>
        </div>
      </div>`;
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

  const groupLabels = {
    green: t('signal.green'),
    yellow: t('signal.yellow'),
    red: t('signal.red'),
  };
  const groupColors = {
    green: { dot: 'background:var(--green)', border: 'type-green' },
    yellow: { dot: 'background:var(--yellow)', border: 'type-yellow' },
    red: { dot: 'background:var(--red)', border: 'type-red' },
  };
  const tagColors = {
    green: 'tag-positive',
    yellow: 'tag-neutral',
    red: 'tag-negative',
  };

  let html = '';
  ['green', 'yellow', 'red'].forEach(type => {
    if (!groups[type].length) return;
    const gc = groupColors[type];
    html += `<div class="signal-group-label"><span class="signal-dot" style="${gc.dot}"></span><span style="font-size:13px;font-weight:600">${groupLabels[type]}</span><span class="text-muted" style="font-size:12px">${groups[type].length}</span></div>`;

    groups[type].forEach(s => {
      const isClickable = s.tk !== '—';
      const clickAttr = isClickable ? `onclick="window.vmApp.goDeepDive('${s.tk}')"` : '';
      const cursorCls = isClickable ? ' signal-card-clickable' : '';
      html += `
        <div class="signal-card ${gc.border}${cursorCls} fade-in" ${clickAttr}>
          <div class="signal-header">
            <span class="news-tag ${tagColors[type]}">${escapeHtml(s.cat)}</span>
            ${isClickable ? `<span class="mono text-muted" style="font-size:11px">${s.tk}</span>` : ''}
          </div>
          <div class="signal-title">${escapeHtml(s.title)}</div>
          <div class="signal-quote">"${escapeHtml(s.q)}"</div>
        </div>`;
    });
  });
  container.innerHTML = html;
}

// ========== Deep Analysis (static demo data) ==========
function renderDeepAnalysis(symbol) {
  // In production, this would fetch real data from market.json watchlist
  const stock = marketData?.watchlist?.find(s => s.symbol === symbol);

  // Update quote header
  const el = (id) => document.getElementById(id);
  if (stock) {
    el('deepSymbol').textContent = stock.symbol;
    el('deepName').textContent = stock.name;
    el('deepPrice').textContent = stock.price.toFixed(2);
    const change = stock.price - (stock.price / (1 + stock.change / 100));
    const cls = stock.change >= 0 ? 'text-green' : 'text-red';
    const sign = stock.change >= 0 ? '+' : '';
    el('deepChange').className = `quote-change ${cls}`;
    el('deepChange').textContent = `${sign}${change.toFixed(2)} (${sign}${stock.change.toFixed(2)}%)`;

    // Stats
    el('deepOpen').textContent = stock.open?.toFixed(2) || '—';
    el('deepHigh').textContent = stock.dayHigh?.toFixed(2) || '—';
    el('deepLow').textContent = stock.dayLow?.toFixed(2) || '—';
    el('deepVolume').textContent = formatVolume(stock.volume);
    el('deepMktCap').textContent = stock.marketCap || '—';
    el('deepPE').textContent = stock.pe ? stock.pe + 'x' : '—';
  }

  // Render chart
  const svg = document.getElementById('chartSvg');
  if (svg) {
    const basePrice = stock?.price || 150;
    const data = generateCandleData(basePrice, 30);
    renderCandlestickChart(svg, data);
  }
}

// ========== Tab Switching ==========
function switchMainTab(tab) {
  ['recap', 'signal', 'deep'].forEach(t => {
    const page = document.getElementById('page-' + t);
    const btn = document.getElementById('mainTab-' + t);
    if (page) page.classList.toggle('active', t === tab);
    if (btn) btn.classList.toggle('active', t === tab);
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
  // Re-render chart with different data length
  const days = { '1D': 1, '1W': 5, '1M': 30, '3M': 90, '1Y': 252, '5Y': 1260 };
  const svg = document.getElementById('chartSvg');
  if (svg) {
    const data = generateCandleData(150, days[period] || 30);
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
    renderSignals(currentMaster.signal);
    renderFearGreed();
    renderNews();
    renderLastUpdate();
  });
  if (langEn) langEn.addEventListener('click', () => {
    setLang('en');
    langEn.classList.add('active');
    langZh.classList.remove('active');
    renderSignals(currentMaster.signal);
    renderFearGreed();
    renderNews();
    renderLastUpdate();
  });
}

// Expose to global scope for onclick handlers
window.vmApp = { switchMainTab, switchMaster, switchDeepTab, switchChartPeriod, goDeepDive, runAnalysis };

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  setLang('zh');
  loadAllData();
  renderSignals('duan');
});
