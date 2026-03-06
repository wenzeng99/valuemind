// Merge real stock-details data into existing stock-analysis.json
import fs from 'fs';

const sd = JSON.parse(fs.readFileSync('/Users/wenzeng/valuemind/data/stock-details.json', 'utf-8'));
const analysis = JSON.parse(fs.readFileSync('/Users/wenzeng/valuemind/data/stock-analysis.json', 'utf-8'));

function fmtPct(v) { return v != null ? (v > 0 ? '+' : '') + (v * 100).toFixed(1) + '%' : '—'; }
function fmtRatio(v, s = 'x') { return v != null ? v.toFixed(1) + s : '—'; }
function fmtNum(v) {
  if (v == null) return '—';
  const abs = Math.abs(v);
  if (abs >= 1e12) return '$' + (v / 1e12).toFixed(2) + 'T';
  if (abs >= 1e9) return '$' + (v / 1e9).toFixed(1) + 'B';
  if (abs >= 1e6) return '$' + (v / 1e6).toFixed(0) + 'M';
  return '$' + v.toLocaleString('en-US', {maximumFractionDigits: 0});
}

for (const [sym, s] of Object.entries(sd)) {
  if (!analysis[sym]) continue;
  const a = analysis[sym];

  // Update mechanical fields from real data
  a.revGrowth = fmtPct(s.revenueGrowth);
  a.epsEst = s.eps != null ? '$' + s.eps.toFixed(2) + (s.epsForward ? ' → fwd $' + s.epsForward.toFixed(2) : '') : '—';
  a.grossMargin = s.grossMargin != null ? (s.grossMargin * 100).toFixed(1) + '%' : '—';
  a.peFwd = s.forwardPE != null ? s.forwardPE.toFixed(1) + 'x' : '—';
  a.peg = s.peg != null ? s.peg.toFixed(2) : '—';
  a.evEbitda = s.evEbitda != null ? s.evEbitda.toFixed(1) + 'x' : '—';
  a.ps = s.ps != null ? s.ps.toFixed(1) + 'x' : '—';
  a.netMargin = s.netMargin != null ? (s.netMargin * 100).toFixed(1) + '%' : '—';
  a.roe = s.roe != null ? (s.roe * 100).toFixed(0) + '%' : '—';
  a.fcfYield = s.fcfYield != null ? (s.fcfYield * 100).toFixed(1) + '%' : '—';
  a.divYield = s.divYield != null ? (s.divYield * 100).toFixed(2) + '%' : '—';
  a.exchange = s.sector === 'Technology' || s.sector === 'Communication Services' ? 'NASDAQ' : 'NYSE';

  // Update financialHealth with real data
  if (a.financialHealth) {
    const cash = fmtNum(s.cashPosition);
    const debt = fmtNum(s.totalDebt);
    const netCash = s.cashPosition && s.totalDebt ? fmtNum(s.cashPosition - s.totalDebt) : '—';
    const de = s.debtToEquity != null ? s.debtToEquity.toFixed(2) + 'x' : '—';
    const cr = s.currentRatio != null ? s.currentRatio.toFixed(2) + 'x' : '—';

    a.financialHealth.zh.cashPosition = `${cash}现金 vs ${debt}债务 = 净现金${netCash}`;
    a.financialHealth.en.cashPosition = `${cash} cash vs ${debt} debt = ${netCash} net`;
    a.financialHealth.zh.debtToEquity = `${de} — ${s.debtToEquity < 0.3 ? '低杠杆' : s.debtToEquity < 0.7 ? '适度杠杆' : '高杠杆'}`;
    a.financialHealth.en.debtToEquity = `${de} — ${s.debtToEquity < 0.3 ? 'Low leverage' : s.debtToEquity < 0.7 ? 'Moderate leverage' : 'High leverage'}`;
    a.financialHealth.zh.currentRatio = `${cr} — ${s.currentRatio > 2 ? '流动性极强' : s.currentRatio > 1.2 ? '流动性良好' : s.currentRatio > 0.8 ? '流动性一般' : '流动性紧张'}`;
    a.financialHealth.en.currentRatio = `${cr} — ${s.currentRatio > 2 ? 'Very liquid' : s.currentRatio > 1.2 ? 'Adequate liquidity' : s.currentRatio > 0.8 ? 'Moderate liquidity' : 'Tight liquidity'}`;
  }

  // Update earnings with real quarterly data
  if (s.earningsData && a.earnings) {
    const e = s.earningsData;
    a.earnings.quarter = e.quarter || a.earnings.quarter;
    a.earnings.reportDate = e.quarter || a.earnings.reportDate;

    if (e.revenueFmt && e.revenueFmt !== '$nan') {
      // Update zh earnings
      if (a.earnings.zh) {
        a.earnings.zh.revenue.val = e.revenueFmt;
        if (e.revenueYoY != null) a.earnings.zh.revenue.yoy = (e.revenueYoY > 0 ? '+' : '') + e.revenueYoY + '%';
        if (e.grossMarginQ != null) a.earnings.zh.grossMargin.val = e.grossMarginQ.toFixed(1) + '%';
        if (e.fcfFmt) a.earnings.zh.fcf.val = e.fcfFmt;
        if (e.fcfMarginQ != null) a.earnings.zh.fcf.margin = e.fcfMarginQ.toFixed(1) + '%';
      }
      // Update en earnings
      if (a.earnings.en) {
        a.earnings.en.revenue.val = e.revenueFmt;
        if (e.revenueYoY != null) a.earnings.en.revenue.yoy = (e.revenueYoY > 0 ? '+' : '') + e.revenueYoY + '%';
        if (e.grossMarginQ != null) a.earnings.en.grossMargin.val = e.grossMarginQ.toFixed(1) + '%';
        if (e.fcfFmt) a.earnings.en.fcf.val = e.fcfFmt;
        if (e.fcfMarginQ != null) a.earnings.en.fcf.margin = e.fcfMarginQ.toFixed(1) + '%';
      }
    }

    // Update EPS if we have net income and shares
    if (e.netIncome != null && s.marketCapRaw && s.price) {
      const shares = s.marketCapRaw / s.price;
      const qEps = (e.netIncome / shares).toFixed(2);
      if (a.earnings.zh?.eps) a.earnings.zh.eps.val = '$' + qEps;
      if (a.earnings.en?.eps) a.earnings.en.eps.val = '$' + qEps;
      if (e.netIncomeYoY != null) {
        const yoy = (e.netIncomeYoY > 0 ? '+' : '') + e.netIncomeYoY.toFixed(0) + '%';
        if (a.earnings.zh?.eps) a.earnings.zh.eps.yoy = yoy;
        if (a.earnings.en?.eps) a.earnings.en.eps.yoy = yoy;
      }
    }
  }

  // Update valuation percentile based on PE vs sector
  if (s.pe != null) {
    // Simple heuristic: PE-based percentile
    if (s.pe > 50) a.valuationPctl = 85;
    else if (s.pe > 35) a.valuationPctl = 72;
    else if (s.pe > 25) a.valuationPctl = 58;
    else if (s.pe > 18) a.valuationPctl = 42;
    else if (s.pe > 12) a.valuationPctl = 28;
    else a.valuationPctl = 15;
  }

  // Add metadata
  a._updatedAt = new Date().toISOString();
  a._price = s.price;
}

fs.writeFileSync('/Users/wenzeng/valuemind/data/stock-analysis.json', JSON.stringify(analysis, null, 2));
console.log('✓ Updated', Object.keys(sd).length, 'stocks with real data');
