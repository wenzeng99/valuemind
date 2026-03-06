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

def fetch_details(symbol):
    t = yf.Ticker(symbol)
    info = t.info
    if not info or 'regularMarketPrice' not in info and 'currentPrice' not in info:
        return None

    mktcap = info.get('marketCap', 0) or 0
    fcf = info.get('freeCashflow', 0) or 0
    price = info.get('currentPrice') or info.get('regularMarketPrice', 0)

    return {
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
        'cashPosition': info.get('totalCash'),
        'totalDebt': info.get('totalDebt'),
        'debtToEquity': round(info.get('debtToEquity', 0) / 100, 4) if info.get('debtToEquity') else None,
        'currentRatio': info.get('currentRatio'),
        'fiftyTwoWeekHigh': info.get('fiftyTwoWeekHigh'),
        'fiftyTwoWeekLow': info.get('fiftyTwoWeekLow'),
        'beta': info.get('beta'),
    }

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

    # Output JSON to stdout
    json.dump(details, sys.stdout, indent=2)
    print(f"\n✓ {len(details)} stocks fetched", file=sys.stderr)

if __name__ == '__main__':
    main()
