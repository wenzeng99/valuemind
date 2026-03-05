import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

// --- Yahoo Finance (v8 API with crumb) ---
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
    // Delay between requests
    await new Promise(r => setTimeout(r, 1000));
  }
  if (results.length > 0) return results;
  throw new Error('Yahoo Finance API unavailable');
}

async function fetchMarketData() {
  const indexSymbols = ['^GSPC', '^IXIC', '^DJI', '^HSI', '000001.SS', '^N225'];
  const watchlistSymbols = ['NVDA', 'AAPL', 'MSFT', 'COST', 'GOOGL', 'AMZN', 'META', 'TSM', 'BRK-B', 'BABA'];
  const macroSymbols = ['^TNX', 'DX-Y.NYB', 'GC=F', 'CL=F', '^VIX'];

  // Fetch sequentially to avoid rate limiting
  console.log('  Fetching indices...');
  const indices = await fetchYahooQuote(indexSymbols);
  console.log(`  ✓ ${indices.length} indices`);
  console.log('  Fetching watchlist...');
  const watchlist = await fetchYahooQuote(watchlistSymbols);
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

// --- CoinGecko (free, no API key) ---
async function fetchCryptoData() {
  const ids = 'bitcoin,ethereum,solana,binancecoin,ripple,dogecoin,cardano';
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ValueMind/1.0' }
  });
  if (!res.ok) throw new Error(`CoinGecko API error: ${res.status}`);
  const data = await res.json();
  return data.map(c => ({
    symbol: c.symbol.toUpperCase(),
    name: c.name,
    price: c.current_price,
    change: c.price_change_percentage_24h ? +(c.price_change_percentage_24h).toFixed(2) : 0,
    marketCap: formatMarketCap(c.market_cap),
    volume24h: formatMarketCap(c.total_volume),
    high24h: c.high_24h,
    low24h: c.low_24h,
    image: c.image,
  }));
}

// --- Fear & Greed Index (alternative.me) ---
async function fetchFearGreed() {
  const url = 'https://api.alternative.me/fng/?limit=1';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fear & Greed API error: ${res.status}`);
  const data = await res.json();
  const fg = data.data?.[0];
  return {
    value: parseInt(fg?.value || '50'),
    label: fg?.value_classification || 'Neutral',
    timestamp: fg?.timestamp,
  };
}

// --- News (OpenNews HTTP API or fallback) ---
async function fetchNews() {
  try {
    // Try OpenNews API
    const apiKey = process.env.OPENNEWS_API_KEY;
    const baseUrl = 'https://opennews.newstool.ai';

    // Fetch latest high-score news
    const newsRes = await fetch(`${baseUrl}/api/news/latest?limit=20`, {
      headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}
    });

    if (newsRes.ok) {
      const newsData = await newsRes.json();
      const articles = (newsData.data || newsData || []).slice(0, 15);
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
    console.warn('OpenNews fetch failed, using fallback:', e.message);
  }

  // Fallback: return empty array (frontend will show "No live news")
  return [];
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

// --- Main ---
async function main() {
  console.log('Fetching market data...');
  await fs.mkdir(DATA_DIR, { recursive: true });

  const results = await Promise.allSettled([
    fetchMarketData(),
    fetchCryptoData(),
    fetchFearGreed(),
    fetchNews(),
  ]);

  const [marketResult, cryptoResult, fgResult, newsResult] = results;

  // Write market.json
  if (marketResult.status === 'fulfilled') {
    await fs.writeFile(path.join(DATA_DIR, 'market.json'), JSON.stringify(marketResult.value, null, 2));
    console.log('✓ market.json');
  } else {
    console.error('✗ market.json failed:', marketResult.reason?.message);
  }

  // Write crypto.json
  if (cryptoResult.status === 'fulfilled') {
    await fs.writeFile(path.join(DATA_DIR, 'crypto.json'), JSON.stringify(cryptoResult.value, null, 2));
    console.log('✓ crypto.json');
  } else {
    console.error('✗ crypto.json failed:', cryptoResult.reason?.message);
  }

  // Write fear-greed.json
  if (fgResult.status === 'fulfilled') {
    await fs.writeFile(path.join(DATA_DIR, 'fear-greed.json'), JSON.stringify(fgResult.value, null, 2));
    console.log('✓ fear-greed.json');
  } else {
    console.error('✗ fear-greed.json failed:', fgResult.reason?.message);
  }

  // Write news.json
  if (newsResult.status === 'fulfilled') {
    await fs.writeFile(path.join(DATA_DIR, 'news.json'), JSON.stringify(newsResult.value, null, 2));
    console.log('✓ news.json');
  } else {
    console.error('✗ news.json failed:', newsResult.reason?.message);
  }

  // Write meta.json
  const meta = {
    lastUpdated: new Date().toISOString(),
    sources: {
      market: marketResult.status === 'fulfilled' ? 'ok' : 'error',
      crypto: cryptoResult.status === 'fulfilled' ? 'ok' : 'error',
      fearGreed: fgResult.status === 'fulfilled' ? 'ok' : 'error',
      news: newsResult.status === 'fulfilled' ? 'ok' : 'error',
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
