#!/usr/bin/env python3
"""Fetch detailed financial data for all tracked tickers via yfinance."""
import json
import sys
import os

try:
    import yfinance as yf
except ImportError:
    print("Installing yfinance...", file=sys.stderr)
    os.system(f"{sys.executable} -m pip install yfinance -q")
    import yfinance as yf

ALL_TICKERS = [
    'NVDA', 'AAPL', 'MSFT', 'COST', 'GOOGL', 'AMZN', 'META', 'TSM',
    'BRK-B', 'BABA', 'AMD', 'CVX', 'COIN', 'CRM', 'UNH', 'XOM',
]

def fmt_mktcap(val):
    if not val: return '—'
    if val >= 1e12: return f"{val/1e12:.2f}T"
    if val >= 1e9: return f"{val/1e9:.1f}B"
    if val >= 1e6: return f"{val/1e6:.0f}M"
    return str(val)

def fmt_num(val):
    """Format large numbers for display."""
    if val is None: return None
    if abs(val) >= 1e12: return f"${val/1e12:.2f}T"
    if abs(val) >= 1e9: return f"${val/1e9:.1f}B"
    if abs(val) >= 1e6: return f"${val/1e6:.0f}M"
    return f"${val:,.0f}"

def fetch_earnings(t, symbol):
    """Fetch latest quarterly earnings data from yfinance."""
    earnings = {}
    try:
        qis = t.quarterly_income_stmt
        if qis is not None and not qis.empty:
            latest = qis.iloc[:, 0]
            prev_yr = qis.iloc[:, min(4, qis.shape[1] - 1)] if qis.shape[1] > 4 else None
            q_date = str(qis.columns[0].date()) if hasattr(qis.columns[0], 'date') else str(qis.columns[0])

            rev = latest.get('Total Revenue', None)
            gp = latest.get('Gross Profit', None)
            ni = latest.get('Net Income', None)
            ebitda = latest.get('EBITDA') or latest.get('Normalized EBITDA', None)
            op_income = latest.get('Operating Income', None)

            # YoY growth
            prev_rev = prev_yr.get('Total Revenue', None) if prev_yr is not None else None
            rev_yoy = round((rev - prev_rev) / abs(prev_rev) * 100, 1) if rev and prev_rev and prev_rev != 0 else None

            prev_ni = prev_yr.get('Net Income', None) if prev_yr is not None else None
            ni_yoy = round((ni - prev_ni) / abs(prev_ni) * 100, 1) if ni and prev_ni and prev_ni != 0 else None

            gm = round(gp / rev * 100, 1) if gp and rev and rev != 0 else None
            nm = round(ni / rev * 100, 1) if ni and rev and rev != 0 else None

            earnings['quarter'] = q_date
            earnings['revenue'] = rev
            earnings['revenueFmt'] = fmt_num(rev)
            earnings['revenueYoY'] = rev_yoy
            earnings['grossProfit'] = gp
            earnings['grossMarginQ'] = gm
            earnings['netIncome'] = ni
            earnings['netIncomeYoY'] = ni_yoy
            earnings['netMarginQ'] = nm
            earnings['ebitda'] = ebitda
            earnings['operatingIncome'] = op_income
    except Exception as e:
        print(f"    ⚠ {symbol} income_stmt: {e}", file=sys.stderr)

    # Quarterly cash flow
    try:
        qcf = t.quarterly_cashflow
        if qcf is not None and not qcf.empty:
            latest_cf = qcf.iloc[:, 0]
            op_cf = latest_cf.get('Operating Cash Flow') or latest_cf.get('Cash Flow From Continuing Operating Activities', None)
            capex = latest_cf.get('Capital Expenditure', None)
            fcf = (op_cf + capex) if op_cf is not None and capex is not None else None  # capex is negative
            earnings['operatingCashFlow'] = op_cf
            earnings['capex'] = capex
            earnings['freeCashFlow'] = fcf
            earnings['fcfFmt'] = fmt_num(fcf)
            if earnings.get('revenue') and fcf:
                earnings['fcfMarginQ'] = round(fcf / earnings['revenue'] * 100, 1)
    except Exception as e:
        print(f"    ⚠ {symbol} cashflow: {e}", file=sys.stderr)

    # EPS from info (more reliable)
    return earnings if earnings else None

def fetch_details(symbol):
    t = yf.Ticker(symbol)
    info = t.info
    if not info or 'regularMarketPrice' not in info and 'currentPrice' not in info:
        return None

    mktcap = info.get('marketCap', 0) or 0
    fcf = info.get('freeCashflow', 0) or 0
    price = info.get('currentPrice') or info.get('regularMarketPrice', 0)

    # Fetch quarterly earnings
    earnings_data = fetch_earnings(t, symbol)

    result = {
        'price': price,
        'change': round(info.get('regularMarketChangePercent', 0) or 0, 2),
        'pe': info.get('trailingPE'),
        'forwardPE': info.get('forwardPE'),
        'peg': info.get('pegRatio'),
        'evEbitda': info.get('enterpriseToEbitda'),
        'ps': info.get('priceToSalesTrailing12Months'),
        'grossMargin': info.get('grossMargins'),
        'netMargin': info.get('profitMargins'),
        'roe': info.get('returnOnEquity'),
        'fcfYield': round(fcf / mktcap, 4) if mktcap > 0 and fcf else None,
        'divYield': info.get('dividendYield', 0) or 0,
        'marketCap': fmt_mktcap(mktcap),
        'marketCapRaw': mktcap,
        'revenue': info.get('totalRevenue'),
        'revenueGrowth': info.get('revenueGrowth'),
        'eps': info.get('trailingEps'),
        'epsForward': info.get('forwardEps'),
        'cashPosition': info.get('totalCash'),
        'totalDebt': info.get('totalDebt'),
        'debtToEquity': round(info.get('debtToEquity', 0) / 100, 4) if info.get('debtToEquity') else None,
        'currentRatio': info.get('currentRatio'),
        'fiftyTwoWeekHigh': info.get('fiftyTwoWeekHigh'),
        'fiftyTwoWeekLow': info.get('fiftyTwoWeekLow'),
        'beta': info.get('beta'),
        'sector': info.get('sector'),
        'industry': info.get('industry'),
        'shortName': info.get('shortName'),
        'longName': info.get('longName'),
    }

    if earnings_data:
        result['earningsData'] = earnings_data

    return result

def main():
    details = {}
    for symbol in ALL_TICKERS:
        try:
            d = fetch_details(symbol)
            if d:
                details[symbol] = d
                print(f"  ✓ {symbol}: ${d['price']} PE={d['pe']} GM={d['grossMargin']}", file=sys.stderr)
            else:
                print(f"  ⚠ {symbol}: no data", file=sys.stderr)
        except Exception as e:
            print(f"  ⚠ {symbol}: {e}", file=sys.stderr)

    # Sanitize NaN/Inf before JSON output
    import math
    def sanitize(obj):
        if isinstance(obj, dict):
            return {k: sanitize(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [sanitize(v) for v in obj]
        if isinstance(obj, float) and (math.isnan(obj) or math.isinf(obj)):
            return None
        return obj

    # Output JSON to stdout
    json.dump(sanitize(details), sys.stdout, indent=2)
    print(f"\n✓ {len(details)} stocks fetched", file=sys.stderr)

if __name__ == '__main__':
    main()
