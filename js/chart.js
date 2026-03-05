// ========== ValueMind Chart — SVG Candlestick ==========

// Generate demo candlestick data (in production, this would come from API)
export function generateCandleData(basePrice = 150, days = 30) {
  const data = [];
  let price = basePrice * 0.85;
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.45) * price * 0.03;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * price * 0.01;
    const low = Math.min(open, close) - Math.random() * price * 0.01;
    const volume = 200 + Math.random() * 300;
    data.push({ open, close, high, low, volume, up: close >= open });
    price = close;
  }
  return data;
}

export function renderCandlestickChart(svgEl, data, options = {}) {
  const width = options.width || 960;
  const chartHeight = options.chartHeight || 240;
  const volumeHeight = options.volumeHeight || 50;
  const totalHeight = chartHeight + volumeHeight + 30;
  const padding = { left: 5, right: 50, top: 10, bottom: 20 };

  svgEl.setAttribute('viewBox', `0 0 ${width} ${totalHeight}`);
  svgEl.style.maxHeight = `${totalHeight}px`;
  svgEl.innerHTML = '';

  if (!data || data.length === 0) return;

  const allHigh = Math.max(...data.map(d => d.high));
  const allLow = Math.min(...data.map(d => d.low));
  const maxVol = Math.max(...data.map(d => d.volume));
  const priceRange = allHigh - allLow || 1;

  const chartW = width - padding.left - padding.right;
  const barWidth = Math.max(4, Math.floor(chartW / data.length * 0.6));
  const gap = chartW / data.length;

  const yScale = (price) => padding.top + (1 - (price - allLow) / priceRange) * (chartHeight - padding.top);
  const vScale = (vol) => volumeHeight * (vol / maxVol);

  // Grid lines
  const gridLevels = 5;
  for (let i = 0; i <= gridLevels; i++) {
    const y = padding.top + (chartHeight - padding.top) * i / gridLevels;
    const price = allHigh - priceRange * i / gridLevels;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0);
    line.setAttribute('y1', y);
    line.setAttribute('x2', width);
    line.setAttribute('y2', y);
    line.setAttribute('class', 'chart-grid-line');
    svgEl.appendChild(line);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', width - 5);
    text.setAttribute('y', y + 4);
    text.setAttribute('text-anchor', 'end');
    text.setAttribute('font-size', '9');
    text.setAttribute('fill', '#999');
    text.setAttribute('font-family', 'Helvetica Neue, sans-serif');
    text.textContent = `$${price.toFixed(0)}`;
    svgEl.appendChild(text);
  }

  // SMA lines
  const sma20 = calcSMA(data.map(d => d.close), 20);
  const sma50 = calcSMA(data.map(d => d.close), Math.min(50, data.length));
  drawSMALine(svgEl, sma20, data, gap, padding, yScale, '#00B074', 0.5);
  drawSMALine(svgEl, sma50, data, gap, padding, yScale, '#FF9500', 0.5);

  // Candles
  data.forEach((d, i) => {
    const x = padding.left + i * gap + gap / 2;
    const yOpen = yScale(d.open);
    const yClose = yScale(d.close);
    const yHigh = yScale(d.high);
    const yLow = yScale(d.low);
    const cls = d.up ? 'candle-up' : 'candle-down';

    // Wick
    const wick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    wick.setAttribute('x1', x);
    wick.setAttribute('y1', yHigh);
    wick.setAttribute('x2', x);
    wick.setAttribute('y2', yLow);
    wick.setAttribute('class', `candle-wick ${cls}`);
    svgEl.appendChild(wick);

    // Body
    const body = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    body.setAttribute('x', x - barWidth / 2);
    body.setAttribute('y', Math.min(yOpen, yClose));
    body.setAttribute('width', barWidth);
    body.setAttribute('height', Math.max(1, Math.abs(yClose - yOpen)));
    body.setAttribute('class', cls);
    body.setAttribute('rx', '1');
    svgEl.appendChild(body);

    // Volume bar
    const vBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const vH = vScale(d.volume);
    vBar.setAttribute('x', x - barWidth / 2);
    vBar.setAttribute('y', chartHeight + 10 + (volumeHeight - vH));
    vBar.setAttribute('width', barWidth);
    vBar.setAttribute('height', vH);
    vBar.setAttribute('class', d.up ? 'volume-bar-up' : 'volume-bar-down');
    vBar.setAttribute('rx', '1');
    svgEl.appendChild(vBar);
  });

  // Date labels
  const labelInterval = Math.max(1, Math.floor(data.length / 6));
  for (let i = 0; i < data.length; i += labelInterval) {
    const x = padding.left + i * gap + gap / 2;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', totalHeight - 2);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '9');
    text.setAttribute('fill', '#999');
    text.setAttribute('font-family', 'Helvetica Neue, sans-serif');
    const date = new Date();
    date.setDate(date.getDate() - (data.length - i));
    text.textContent = `${date.getMonth() + 1}/${date.getDate()}`;
    svgEl.appendChild(text);
  }
}

function calcSMA(prices, period) {
  const sma = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) { sma.push(null); continue; }
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) sum += prices[j];
    sma.push(sum / period);
  }
  return sma;
}

function drawSMALine(svg, sma, data, gap, padding, yScale, color, opacity) {
  const points = [];
  sma.forEach((v, i) => {
    if (v !== null) {
      const x = padding.left + i * gap + gap / 2;
      points.push(`${x},${yScale(v)}`);
    }
  });
  if (points.length < 2) return;
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  line.setAttribute('points', points.join(' '));
  line.setAttribute('class', 'sparkline');
  line.setAttribute('stroke', color);
  line.setAttribute('opacity', opacity);
  svg.appendChild(line);
}
