# ValueMind — AI Value Investing Intelligence

Static web app deployed on GitHub Pages with automated data updates via GitHub Actions.

## Architecture

- **Frontend**: Pure HTML/CSS/JS, Futunn-style design
- **Data**: JSON files updated by GitHub Actions (cron schedule)
- **APIs**: Yahoo Finance, CoinGecko, alternative.me, OpenNews

## Local Development

```bash
npm install
npm run fetch    # Fetch latest data
npm run dev      # Serve locally
```

## Deployment

Deployed automatically to GitHub Pages from the `main` branch.
Data is refreshed twice daily via GitHub Actions.
