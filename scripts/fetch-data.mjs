import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

const WATCHLIST = ['NVDA', 'AAPL', 'MSFT', 'COST', 'GOOGL', 'AMZN', 'META', 'TSM', 'BRK-B', 'BABA', 'AMD', 'CVX', 'COIN', 'CRM', 'UNH', 'XOM'];

// --- Yahoo Finance (v8 API) ---
function curlFetchJson(url) {
  const cmd = `curl -s -L -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" "${url}"`;
  const out = execSync(cmd, { timeout: 15000 }).toString();
  return JSON.parse(out);
}

async function fetchYahooQuote(symbols) {
  const results = [];
  for (const symbol of symbols) {
    try {
      const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`;
      const data = curlFetchJson(url);
      const meta = data.chart?.result?.[0]?.meta;
      if (meta) {
        results.push({
          symbol: meta.symbol,
          shortName: meta.shortName || meta.symbol,
          longName: meta.longName || meta.shortName || meta.symbol,
          regularMarketPrice: meta.regularMarketPrice,
          regularMarketPreviousClose: meta.chartPreviousClose || meta.previousClose,
          regularMarketChangePercent: meta.regularMarketPrice && meta.chartPreviousClose
            ? ((meta.regularMarketPrice - meta.chartPreviousClose) / meta.chartPreviousClose) * 100
            : 0,
          regularMarketDayHigh: meta.regularMarketDayHigh,
          regularMarketDayLow: meta.regularMarketDayLow,
          regularMarketOpen: meta.regularMarketPrice,
          regularMarketVolume: meta.regularMarketVolume,
          trailingPE: null,
          marketCap: null,
          fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh,
          fiftyTwoWeekLow: meta.fiftyTwoWeekLow,
        });
        console.log(`    ✓ ${symbol}: $${meta.regularMarketPrice}`);
      }
    } catch (e) {
      console.warn(`    ⚠ ${symbol}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  if (results.length > 0) return results;
  throw new Error('Yahoo Finance API unavailable');
}

async function fetchMarketData() {
  const indexSymbols = ['^GSPC', '^IXIC', '^DJI', '^HSI', '000001.SS', '^N225'];
  const macroSymbols = ['^TNX', 'DX-Y.NYB', 'GC=F', 'CL=F', '^VIX'];

  console.log('  Fetching indices...');
  const indices = await fetchYahooQuote(indexSymbols);
  console.log(`  ✓ ${indices.length} indices`);
  console.log('  Fetching watchlist...');
  const watchlist = await fetchYahooQuote(WATCHLIST.slice(0, 10)); // top 10 for market.json
  console.log(`  ✓ ${watchlist.length} watchlist`);
  console.log('  Fetching macro...');
  const macro = await fetchYahooQuote(macroSymbols);
  console.log(`  ✓ ${macro.length} macro`);

  const mapQuote = (q) => ({
    symbol: q.symbol,
    name: q.shortName || q.longName || q.symbol,
    price: q.regularMarketPrice ?? 0,
    change: q.regularMarketChangePercent ? +(q.regularMarketChangePercent).toFixed(2) : 0,
    prevClose: q.regularMarketPreviousClose ?? 0,
    dayHigh: q.regularMarketDayHigh ?? 0,
    dayLow: q.regularMarketDayLow ?? 0,
  });

  const mapWatchlist = (q) => ({
    symbol: q.symbol,
    name: q.shortName || q.longName || q.symbol,
    price: q.regularMarketPrice ?? 0,
    change: q.regularMarketChangePercent ? +(q.regularMarketChangePercent).toFixed(2) : 0,
    pe: q.trailingPE ? +(q.trailingPE).toFixed(1) : null,
    marketCap: q.marketCap ? formatMarketCap(q.marketCap) : '—',
    volume: q.regularMarketVolume ?? 0,
    dayHigh: q.regularMarketDayHigh ?? 0,
    dayLow: q.regularMarketDayLow ?? 0,
    open: q.regularMarketOpen ?? 0,
    fiftyTwoWeekHigh: q.fiftyTwoWeekHigh ?? 0,
    fiftyTwoWeekLow: q.fiftyTwoWeekLow ?? 0,
  });

  return {
    indices: indices.map(mapQuote),
    watchlist: watchlist.map(mapWatchlist),
    macro: macro.map(mapQuote),
  };
}

function formatMarketCap(val) {
  if (val >= 1e12) return `${(val / 1e12).toFixed(2)}T`;
  if (val >= 1e9) return `${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `${(val / 1e6).toFixed(0)}M`;
  return String(val);
}

// --- Fear & Greed (VIX-based) ---
async function fetchFearGreed(marketData) {
  const vix = marketData?.macro?.find(m => m.symbol === '^VIX');
  if (!vix) return { value: 50, label: 'Neutral', source: 'unavailable' };
  const vixPrice = vix.price || 20;
  const val = Math.round(Math.max(0, Math.min(100, 100 - (vixPrice - 12) * (90 / 23))));
  let label;
  if (val >= 75) label = 'Extreme Greed';
  else if (val >= 55) label = 'Greed';
  else if (val >= 45) label = 'Neutral';
  else if (val >= 25) label = 'Fear';
  else label = 'Extreme Fear';
  return { value: val, label, vix: vixPrice, source: 'VIX-based', timestamp: new Date().toISOString() };
}

// --- News (OpenNews HTTP API) ---
const OPENNEWS_BASE = 'https://opennews.newstool.ai';

function newsHeaders() {
  const apiKey = process.env.OPENNEWS_API_KEY;
  return apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {};
}

async function fetchNews() {
  try {
    const res = await fetch(`${OPENNEWS_BASE}/api/news/latest?limit=20`, { headers: newsHeaders() });
    if (res.ok) {
      const data = await res.json();
      const articles = (data.data || data || []).slice(0, 15);
      return articles.map(a => ({
        title: a.title || a.text || '',
        source: a.source || a.engine_type || 'News',
        url: a.link || a.url || '#',
        time: formatNewsTime(a.created_at || a.timestamp || a.time),
        tags: a.coins || a.tags || [],
        sentiment: a.signal || (a.ai_score > 60 ? 'positive' : a.ai_score < 40 ? 'negative' : 'neutral'),
        score: a.ai_score || null,
      }));
    }
  } catch (e) {
    console.warn('OpenNews latest fetch failed:', e.message);
  }
  return [];
}

// --- Stock-specific News (search per ticker) ---
async function fetchStockNews() {
  const stockNews = {};
  const headers = newsHeaders();
  console.log('  Fetching stock-specific news...');
  for (const symbol of WATCHLIST) {
    try {
      const res = await fetch(`${OPENNEWS_BASE}/api/news/search?keyword=${encodeURIComponent(symbol)}&limit=5`, { headers });
      if (res.ok) {
        const data = await res.json();
        const articles = (data.data || data || []);
        if (articles.length > 0) {
          stockNews[symbol] = articles.map(a => ({
            title: a.title || a.text || '',
            source: a.source || a.engine_type || 'News',
            url: a.link || a.url || '#',
            time: a.created_at || a.timestamp || '',
            score: a.ai_score || null,
            signal: a.signal || 'neutral',
          }));
          console.log(`    ✓ ${symbol}: ${stockNews[symbol].length} articles`);
        }
      }
    } catch (e) {
      // skip silently
    }
    await new Promise(r => setTimeout(r, 300));
  }
  console.log(`  ✓ stock-news for ${Object.keys(stockNews).length} tickers`);
  return stockNews;
}

function formatNewsTime(ts) {
  if (!ts) return '';
  const d = new Date(typeof ts === 'number' ? ts * 1000 : ts);
  if (isNaN(d.getTime())) return '';
  const now = new Date();
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

// --- Stock Details (via yfinance Python script) ---
async function fetchStockDetails() {
  try {
    const scriptPath = path.join(__dirname, 'fetch-stock-details.py');
    console.log('  Running yfinance Python script...');
    const out = execSync(`python3 "${scriptPath}"`, { timeout: 120000 }).toString();
    const data = JSON.parse(out);
    console.log(`  ✓ ${Object.keys(data).length} stock details fetched`);
    return data;
  } catch (e) {
    console.error('  ⚠ Stock details fetch failed:', e.message);
    return {};
  }
}

// --- Main ---
async function main() {
  console.log('Fetching market data...');
  await fs.mkdir(DATA_DIR, { recursive: true });

  const results = await Promise.allSettled([
    fetchMarketData(),
    fetchNews(),
    fetchStockNews(),
    fetchStockDetails(),
  ]);

  const [marketResult, newsResult, stockNewsResult, stockResult] = results;

  // Write market.json
  if (marketResult.status === 'fulfilled') {
    await fs.writeFile(path.join(DATA_DIR, 'market.json'), JSON.stringify(marketResult.value, null, 2));
    console.log('✓ market.json');

    const fg = await fetchFearGreed(marketResult.value);
    await fs.writeFile(path.join(DATA_DIR, 'fear-greed.json'), JSON.stringify(fg, null, 2));
    console.log(`✓ fear-greed.json (VIX=${fg.vix} → F&G=${fg.value} ${fg.label})`);
  } else {
    console.error('✗ market.json failed:', marketResult.reason?.message);
  }

  // Write news.json
  if (newsResult.status === 'fulfilled') {
    await fs.writeFile(path.join(DATA_DIR, 'news.json'), JSON.stringify(newsResult.value, null, 2));
    console.log(`✓ news.json (${newsResult.value.length} articles)`);
  } else {
    console.error('✗ news.json failed:', newsResult.reason?.message);
  }

  // Write stock-news.json
  if (stockNewsResult.status === 'fulfilled') {
    await fs.writeFile(path.join(DATA_DIR, 'stock-news.json'), JSON.stringify(stockNewsResult.value, null, 2));
    console.log(`✓ stock-news.json (${Object.keys(stockNewsResult.value).length} tickers)`);
  } else {
    console.error('✗ stock-news.json failed:', stockNewsResult.reason?.message);
  }

  // Write stock-details.json
  if (stockResult.status === 'fulfilled') {
    await fs.writeFile(path.join(DATA_DIR, 'stock-details.json'), JSON.stringify(stockResult.value, null, 2));
    console.log('✓ stock-details.json');
  } else {
    console.error('✗ stock-details.json failed:', stockResult.reason?.message);
  }

  // Write meta.json
  const meta = {
    lastUpdated: new Date().toISOString(),
    sources: {
      market: marketResult.status === 'fulfilled' ? 'ok' : 'error',
      news: newsResult.status === 'fulfilled' ? 'ok' : 'error',
      stockNews: stockNewsResult.status === 'fulfilled' ? 'ok' : 'error',
      stockDetails: stockResult.status === 'fulfilled' ? 'ok' : 'error',
    }
  };
  await fs.writeFile(path.join(DATA_DIR, 'meta.json'), JSON.stringify(meta, null, 2));
  console.log('✓ meta.json');
  console.log('Done!', meta);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
