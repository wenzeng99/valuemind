# ValueMind 每日数据更新架构设计

> Version: 1.0 | Date: 2026-03-06
> Status: Draft — 待实施

---

## 目录

1. [每日更新管线架构](#1-每日更新管线架构)
2. [智能缓存策略](#2-智能缓存策略)
3. [AI Agent 分析更新集成](#3-ai-agent-分析更新集成)
4. [质量监督 Agent](#4-质量监督-agent)
5. [标的管理](#5-标的管理)
6. [GitHub Actions 工作流设计](#6-github-actions-工作流设计)
7. [实施清单](#7-实施清单)

---

## 1. 每日更新管线架构

### 整体流程图

```
┌─────────────────────────────────────────────────────────────────────┐
│                    GitHub Actions (Cron Triggers)                    │
│  UTC 01:00 (CST 09:00 盘前)  |  UTC 13:00 (CST 21:00 美股盘中)     │
│  UTC 22:00 (CST 06:00 盘后)  |  workflow_dispatch (手动)            │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     Stage 1: 实时行情数据                             │
│                                                                      │
│  fetch-data.mjs                                                      │
│  ├── Yahoo Finance v8 → indices / watchlist / macro                  │
│  ├── CoinGecko → crypto                                              │
│  ├── Alternative.me → fear-greed                                     │
│  ├── OpenNews API → news                                             │
│  └── yfinance (Python) → stock-details                               │
│                                                                      │
│  Output: data/*.json (market / crypto / fear-greed / news /          │
│          stock-details / meta)                                       │
└──────────────────┬───────────────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     Stage 2: 财报检测 & 分析触发                      │
│                                                                      │
│  check-earnings.mjs (新增)                                           │
│  ├── 读取 data/analysis-meta.json (每个 ticker 的上次分析日期)        │
│  ├── 调用 Yahoo Finance earnings calendar API                        │
│  ├── 对比: 最新财报日 > last_analysis_date ?                          │
│  │   ├── YES → 将 ticker 加入 pending_analysis[] 列表                │
│  │   └── NO  → 跳过                                                  │
│  └── Output: data/pending-analysis.json                              │
└──────────────────┬───────────────────────────────────────────────────┘
                   │
                   ▼ (仅当 pending_analysis 非空时)
┌──────────────────────────────────────────────────────────────────────┐
│                     Stage 3: AI 分析生成                              │
│                                                                      │
│  generate-analysis.mjs (新增)                                        │
│  ├── 对 pending_analysis 中每个 ticker:                               │
│  │   ├── 拉取最新财报数据 (yfinance + earnings transcript)           │
│  │   ├── 调用 Claude API → 生成 stockAnalysis entry                  │
│  │   └── 写入临时文件 data/analysis-draft/{TICKER}.json              │
│  └── Output: data/analysis-draft/*.json                              │
└──────────────────┬───────────────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     Stage 4: 质量审核                                 │
│                                                                      │
│  review-analysis.mjs (新增)                                          │
│  ├── 读取 analysis-draft/*.json                                      │
│  ├── 调用 Claude API (reviewer prompt) → 审核                       │
│  │   ├── PASS → 合并到 js/stock-analysis-data.js                    │
│  │   └── FAIL → 反馈修改意见, 重新触发 Stage 3 (max 2 retries)      │
│  ├── 更新 data/analysis-meta.json (last_analysis_date)               │
│  └── 清理 data/analysis-draft/                                      │
└──────────────────┬───────────────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     Stage 5: 提交 & 部署                              │
│                                                                      │
│  git-auto-commit-action                                              │
│  ├── git add data/*.json js/stock-analysis-data.js                   │
│  ├── git commit -m "data: daily update [YYYY-MM-DD]"                 │
│  └── push → main branch                                              │
│                                                                      │
│  Cloudflare Pages                                                    │
│  └── 检测到 push → 自动构建 & 部署到 valuemind.pages.dev             │
└──────────────────────────────────────────────────────────────────────┘
```

### 数据流总结

| 数据类型 | 更新频率 | 数据源 | 输出文件 | 耗时估算 |
|---------|---------|--------|---------|---------|
| 股票指数/行情 | 每次运行 | Yahoo Finance v8 | `data/market.json` | ~30s |
| 加密货币行情 | 每次运行 | CoinGecko | `data/crypto.json` | ~3s |
| 恐贪指数 | 每次运行 | Alternative.me | `data/fear-greed.json` | ~2s |
| 新闻 | 每次运行 | OpenNews API | `data/news.json` | ~5s |
| 股票详细指标 | 每次运行 | yfinance (Python) | `data/stock-details.json` | ~60s |
| 深度分析 | 仅新财报时 | Claude API + yfinance | `js/stock-analysis-data.js` | ~120s/ticker |

---

## 2. 智能缓存策略

### 核心原则

行情数据 **always update**, 分析数据 **only on earnings event**.

深度分析(stockAnalysis)是计算密集且消耗 API credits 的操作(每个 ticker 约 2 次 Claude API 调用 x $0.05-0.15 = $0.10-0.30)。16 个 ticker 全量更新一次约 $2-5。因此必须按需触发。

### 元数据跟踪文件: `data/analysis-meta.json`

```json
{
  "version": 1,
  "tickers": {
    "NVDA": {
      "last_earnings_date": "2025-02-26",
      "last_analysis_date": "2025-02-27T08:30:00Z",
      "last_analysis_version": "v1.2",
      "analysis_hash": "sha256:abc123...",
      "status": "approved",
      "retry_count": 0
    },
    "AAPL": {
      "last_earnings_date": "2025-01-30",
      "last_analysis_date": "2025-01-31T09:15:00Z",
      "last_analysis_version": "v1.2",
      "analysis_hash": "sha256:def456...",
      "status": "approved",
      "retry_count": 0
    }
  },
  "last_check": "2026-03-06T01:00:00Z"
}
```

### 财报检测逻辑 (`check-earnings.mjs`)

```
for each ticker in ALL_TICKERS:
    1. 查询 Yahoo Finance earnings calendar
       GET https://query2.finance.yahoo.com/v10/finance/quoteSummary/{symbol}
           ?modules=calendarEvents,earningsHistory

    2. 提取 mostRecentEarningsDate

    3. 对比 analysis-meta.json 中的 last_earnings_date
       IF mostRecentEarningsDate > last_earnings_date:
           → 标记为 pending
           → 记录新的 earnings date
       ELSE:
           → 跳过

    4. 额外检查: 如果 last_analysis_date 距今超过 90 天
       → 也标记为 pending (强制刷新, 防止数据过期)
```

### 缓存决策矩阵

| 条件 | 动作 |
|------|------|
| 新财报发布 (earnings_date > last_analysis_date) | 触发全量 AI 分析 |
| 90天未更新 | 触发 AI 分析 (强制刷新) |
| 无新财报, 未过期 | 跳过分析, 仅更新行情 |
| 分析生成失败 | 保留上一版, 标记 status=error, 下次重试 |

---

## 3. AI Agent 分析更新集成

### 架构设计

```
┌─────────────────────────────────────────────┐
│         generate-analysis.mjs               │
│                                             │
│  Input:                                     │
│  ├── ticker symbol (e.g. "NVDA")           │
│  ├── yfinance financial data (JSON)        │
│  ├── 最新财报数据 (earnings data)           │
│  └── 前一版分析 (for context)              │
│                                             │
│  Process:                                   │
│  1. 调用 yfinance 获取最新财务数据          │
│  2. 构建 prompt (含结构化模板)              │
│  3. 调用 Claude API (claude-sonnet-4-20250514)│
│  4. 解析 JSON 响应                          │
│  5. 验证 schema 完整性                      │
│  6. 写入 draft 文件                         │
│                                             │
│  Output:                                    │
│  └── data/analysis-draft/{TICKER}.json     │
└─────────────────────────────────────────────┘
```

### AI 分析 Prompt 模板

```markdown
You are a senior equity research analyst producing a bilingual (Chinese + English)
investment analysis report. Generate a JSON object following the EXACT schema below.

## Context
- Ticker: {{TICKER}}
- Exchange: {{EXCHANGE}}
- Latest Earnings Quarter: {{QUARTER}} (reported {{REPORT_DATE}})

## Financial Data (from yfinance)
{{FINANCIAL_DATA_JSON}}

## Previous Analysis (for reference/continuity)
{{PREVIOUS_ANALYSIS_JSON}}

## Output Schema
Generate a valid JSON object matching the stockAnalysis[TICKER] structure:

{
  "exchange": "string — NASDAQ / NYSE",
  "desc": {
    "zh": "string — 一句话中文描述, 30字以内",
    "en": "string — one-line English description"
  },
  "revGrowth": "string — e.g. '+78%'",
  "epsEst": "string — e.g. '$0.89 vs est $0.84'",
  "grossMargin": "string — e.g. '73.0%'",
  "dataCenterRev": "string — segment highlight if applicable, else top segment",
  "peFwd": "string — forward PE ratio, e.g. '24.8x'",
  "peg": "string — PEG ratio",
  "evEbitda": "string — EV/EBITDA",
  "ps": "string — Price/Sales",
  "netMargin": "string",
  "roe": "string",
  "fcfYield": "string",
  "divYield": "string",
  "valuationPctl": "number 0-100 — percentile rank vs 5yr history",
  "summary": {
    "zh": "string — 3-4句核心投资论点(中文)",
    "en": "string — 3-4 sentence investment thesis (English)"
  },
  "verdict": {
    "zh": "string — 操作建议(中文), e.g. '观望 — 等待$120-130入场'",
    "en": "string — action verdict (English)"
  },
  "verdictColor": "string — text-green / text-yellow / text-red",
  "questions": {
    "zh": [
      { "status": "positive|negative|uncertain", "q": "string", "a": "string" }
    ],
    "en": [
      { "status": "positive|negative|uncertain", "q": "string", "a": "string" }
    ]
  },
  "crossVal": {
    "zh": [
      { "name": "DYP|Buffett|Munger", "color": "green|yellow|red", "verdict": "string", "q": "string" }
    ],
    "en": [
      { "name": "DYP|Buffett|Munger", "color": "green|yellow|red", "verdict": "string", "q": "string" }
    ]
  },
  "earnings": {
    "quarter": "string — e.g. 'FY2025 Q4'",
    "reportDate": "string — YYYY-MM-DD",
    "zh": {
      "revenue": { "val": "string", "yoy": "string", "beat": "string", "note": "string" },
      "eps": { "val": "string", "yoy": "string", "beat": "string", "note": "string" },
      "fcf": { "val": "string", "margin": "string", "trend": "↑|↓|→", "note": "string" },
      "grossMargin": { "val": "string", "trend": "↑|↓|→", "note": "string" },
      "guidance": "string",
      "highlight": "string",
      "risk": "string"
    },
    "en": { "...same structure as zh..." }
  },
  "financialHealth": {
    "zh": {
      "cashPosition": "string",
      "debtToEquity": "string",
      "currentRatio": "string",
      "capex": "string",
      "buyback": "string",
      "summary": "string"
    },
    "en": { "...same structure as zh..." }
  },
  "moat": {
    "duan": {
      "zh": { "score": "string", "analysis": "string", "moatType": "string", "risk": "string" },
      "en": { "...same..." }
    },
    "buffett": {
      "zh": { "score": "string", "analysis": "string", "moatType": "string", "risk": "string" },
      "en": { "...same..." }
    },
    "munger": {
      "zh": { "score": "string", "analysis": "string", "moatType": "string", "risk": "string" },
      "en": { "...same..." }
    }
  },
  "valuation": {
    "zh": {
      "dcf": { "value": "string", "method": "string", "note": "string" },
      "peerComp": { "value": "string", "method": "string", "note": "string" },
      "grahamMargin": "string",
      "verdict": "string"
    },
    "en": { "...same..." }
  }
}

## Rules
1. All financial figures MUST be sourced from the provided financial data. Do NOT hallucinate numbers.
2. The three "masters" in crossVal represent distinct investment philosophies:
   - DYP (段永平): Value investing with deep understanding of business model. Focuses on business quality and long-term certainty. Known for concentrated positions.
   - Buffett: Classic value investing. Circle of competence. Margin of safety. Prefers simple, predictable businesses.
   - Munger: Mental models. Inversion thinking ("What would make this fail?"). Quality over price.
3. verdictColor: green = actionable buy, yellow = watch/hold, red = avoid/sell.
4. valuationPctl: Use forward PE relative to 5-year range. 0 = cheapest, 100 = most expensive.
5. All Chinese text must be natural, professional financial writing — not machine translation.
6. Output ONLY valid JSON. No markdown, no comments, no explanation.
```

### 技术实现要点

**Claude API 调用配置:**
```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    temperature: 0.3,       // 低温度保证事实性
    messages: [{ role: 'user', content: prompt }],
  }),
});
```

**为什么用 claude-sonnet-4-20250514 而不是 Opus:**
- Sonnet 性价比更高 ($3/M input, $15/M output vs Opus $15/$75)
- 分析任务不需要 Opus 级别的推理深度
- 每个 ticker 约 2000 input tokens + 4000 output tokens = ~$0.07/次
- 16 tickers 全量更新 ~$1.12 (vs Opus ~$5.60)

**错误处理:**
```
try:
    1. 调用 Claude API
    2. JSON.parse(response)
    3. validateSchema(parsed)  // 检查所有必需字段
    4. validateNumbers(parsed, financialData)  // 交叉验证数字
    5. 写入 draft 文件
catch:
    → 记录错误到 data/analysis-errors.log
    → 保留前一版分析不变
    → 标记 status=error in analysis-meta.json
    → 下一次运行自动重试
```

### 合并到 stock-analysis-data.js

生成的 JSON 需要转换为 JS export 格式并合并:

```javascript
// merge-analysis.mjs
// 1. 读取现有 js/stock-analysis-data.js
// 2. 对于每个 approved draft, 替换对应 ticker 的 entry
// 3. 重新生成文件头部注释 (日期, ticker 列表)
// 4. 写回 js/stock-analysis-data.js
```

---

## 4. 质量监督 Agent

### 审核流程

```
┌────────────────────┐
│ analysis-draft/    │
│   NVDA.json        │──┐
│   AAPL.json        │  │
└────────────────────┘  │
                        ▼
              ┌─────────────────┐
              │  Reviewer Agent  │
              │  (Claude API)    │
              └────────┬────────┘
                       │
           ┌───────────┼───────────┐
           ▼           ▼           ▼
       APPROVED     REVISION    REJECTED
           │           │           │
           ▼           ▼           ▼
     合并到 JS    反馈修改意见   保留旧版
                  重新生成      记录错误
                (max 2 retries)
```

### Reviewer Prompt 模板

```markdown
You are a financial analysis quality reviewer. Given the generated analysis JSON
and the source financial data, validate the following:

## Input
- Generated Analysis: {{DRAFT_JSON}}
- Source Financial Data: {{FINANCIAL_DATA_JSON}}
- Previous Approved Analysis: {{PREVIOUS_JSON}}

## Validation Checklist
1. **数字准确性 (Financial Accuracy)**
   - revenue, EPS, margins 与 source data 一致?
   - YoY growth 计算正确?
   - PE, PEG, EV/EBITDA 与 source data 一致?
   - 所有 $ 金额格式统一?

2. **内部一致性 (Internal Consistency)**
   - summary 中的论点与 verdict 方向一致?
   - verdictColor 与 verdict 文字一致? (green=buy, yellow=watch, red=avoid)
   - valuationPctl 与 valuation.verdict 一致?
   - moat 三位大师的观点符合各自投资哲学?

3. **跨标的一致性 (Cross-Ticker Consistency)**
   - 如果 NVDA PE=25x verdict=watch, 那 AAPL PE=30x 不应 verdict=buy
   - 同行业标的的 valuationPctl 排序合理?

4. **语言质量 (Language Quality)**
   - 中文是否自然流畅, 非机器翻译?
   - 英文是否专业, 无语法错误?
   - 中英文内容是否语义对齐?

## Output Format
{
  "verdict": "APPROVED" | "REVISION_NEEDED",
  "score": 0-100,
  "issues": [
    {
      "severity": "critical" | "major" | "minor",
      "field": "string — JSON path to the problematic field",
      "description": "string — what's wrong",
      "suggestion": "string — how to fix"
    }
  ],
  "revision_prompt": "string — if REVISION_NEEDED, specific instructions for the generator"
}

## Rules
- APPROVED requires score >= 80 and no critical issues.
- Only flag issues where the generated data contradicts the source data.
- Do NOT inject your own market opinions.
- Output ONLY valid JSON.
```

### 重试逻辑

```
function reviewAndRetry(ticker, maxRetries = 2):
    draft = readDraft(ticker)

    for attempt in [1, 2, 3]:  // initial + 2 retries
        review = callReviewerAgent(draft)

        if review.verdict == "APPROVED":
            mergeToProd(ticker, draft)
            updateMeta(ticker, status="approved")
            return SUCCESS

        if attempt > maxRetries:
            log("Max retries exceeded for {ticker}")
            updateMeta(ticker, status="review_failed")
            return FAILURE

        // 将 review feedback 注入 regeneration prompt
        draft = callGeneratorAgent(ticker, revisionPrompt=review.revision_prompt)

    return FAILURE
```

### 审核日志

每次审核结果记录到 `data/analysis-review-log.json`:

```json
{
  "reviews": [
    {
      "ticker": "NVDA",
      "timestamp": "2026-03-06T01:15:00Z",
      "attempt": 1,
      "verdict": "APPROVED",
      "score": 92,
      "issues": [],
      "duration_ms": 8500
    }
  ]
}
```

---

## 5. 标的管理

### 当前 Ticker 列表

标的定义在两个位置, 必须保持同步:

| 位置 | 用途 | 当前 Tickers |
|------|------|-------------|
| `scripts/fetch-stock-details.py` → `ALL_TICKERS` | yfinance 数据拉取 | 16 只 |
| `scripts/fetch-data.mjs` → `watchlistSymbols` | 行情看板 (仅前 10 只) | 10 只 |
| `js/stock-analysis-data.js` → `stockAnalysis` keys | 深度分析页面 | 16 只 |
| Telegram Bot daily report | 每日简报 | 自定义 |

### 统一 Ticker 配置文件: `config/tickers.json` (新增)

```json
{
  "watchlist": [
    {
      "symbol": "NVDA",
      "exchange": "NASDAQ",
      "sector": "Semiconductors",
      "addedDate": "2025-01-01",
      "enableAnalysis": true,
      "telegramReport": true,
      "notes": "AI chip leader"
    },
    {
      "symbol": "AAPL",
      "exchange": "NASDAQ",
      "sector": "Consumer Electronics",
      "addedDate": "2025-01-01",
      "enableAnalysis": true,
      "telegramReport": true,
      "notes": "iPhone + Services"
    }
  ]
}
```

### 添加/移除标的流程

**添加新 Ticker:**
1. 编辑 `config/tickers.json`, 添加新条目
2. 运行 `npm run sync-tickers` (新增脚本)
   - 自动更新 `fetch-stock-details.py` 的 `ALL_TICKERS`
   - 自动更新 `fetch-data.mjs` 的 `watchlistSymbols`
   - 在 `data/analysis-meta.json` 中初始化条目 (last_earnings_date = null, 强制首次分析)
3. 手动触发 workflow_dispatch 运行一次 → 生成首次分析
4. 提交所有变更

**移除 Ticker:**
1. 在 `config/tickers.json` 中设置 `"enableAnalysis": false`
2. 运行 `npm run sync-tickers`
3. 可选: 从 `js/stock-analysis-data.js` 中手动删除对应 entry (或保留历史)

### Telegram Bot 同步

ccpa-telegram bot (`@shryzes_bot`) 的每日简报 ticker 列表应从同一配置读取:

```
Telegram Bot 读取方式:
  Option A: 直接读取 GitHub raw file
    GET https://raw.githubusercontent.com/{user}/valuemind/main/config/tickers.json
    Filter: telegramReport == true

  Option B: 部署后读取网站 JSON
    GET https://valuemind.pages.dev/config/tickers.json
    (需要确保 Cloudflare Pages 部署 config/ 目录)
```

---

## 6. GitHub Actions 工作流设计

### 完整 Workflow YAML: `.github/workflows/update-data.yml`

```yaml
name: Update Market Data & Analysis

on:
  schedule:
    # 美股盘前 — 更新隔夜行情 + 检查财报
    - cron: '0 1 * * 1-6'      # UTC 01:00 = CST 09:00, Mon-Sat
    # 美股盘中 — 更新实时行情
    - cron: '0 13 * * 1-5'     # UTC 13:00 = CST 21:00, Mon-Fri (trading hours)
    # 美股盘后 — 更新收盘数据 + 触发分析 (财报通常盘后发布)
    - cron: '30 22 * * 1-5'    # UTC 22:30 = CST 06:30 next day, Mon-Fri
  workflow_dispatch:
    inputs:
      force_analysis:
        description: 'Force re-analyze specific tickers (comma-separated, or "all")'
        required: false
        default: ''
      skip_analysis:
        description: 'Skip analysis stage entirely'
        required: false
        type: boolean
        default: false

permissions:
  contents: write

env:
  NODE_VERSION: '20'
  PYTHON_VERSION: '3.12'

jobs:
  fetch-market-data:
    runs-on: ubuntu-latest
    outputs:
      has_pending: ${{ steps.check.outputs.has_pending }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}

      - name: Install dependencies
        run: |
          npm install
          pip install yfinance

      - name: Fetch market data (Stage 1)
        run: node scripts/fetch-data.mjs
        env:
          OPENNEWS_API_KEY: ${{ secrets.OPENNEWS_API_KEY }}

      - name: Check earnings calendar (Stage 2)
        id: check
        run: |
          node scripts/check-earnings.mjs
          if [ -f data/pending-analysis.json ]; then
            PENDING=$(node -e "const d=require('./data/pending-analysis.json'); console.log(d.tickers?.length > 0)")
            echo "has_pending=$PENDING" >> $GITHUB_OUTPUT
          else
            echo "has_pending=false" >> $GITHUB_OUTPUT
          fi
        env:
          FORCE_TICKERS: ${{ github.event.inputs.force_analysis }}

      - name: Upload data artifacts
        uses: actions/upload-artifact@v4
        with:
          name: market-data
          path: data/

  generate-analysis:
    needs: fetch-market-data
    if: |
      needs.fetch-market-data.outputs.has_pending == 'true' &&
      github.event.inputs.skip_analysis != 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}

      - name: Download market data
        uses: actions/download-artifact@v4
        with:
          name: market-data
          path: data/

      - name: Install dependencies
        run: |
          npm install
          pip install yfinance

      - name: Generate AI analysis (Stage 3)
        run: node scripts/generate-analysis.mjs
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        timeout-minutes: 10

      - name: Review analysis quality (Stage 4)
        run: node scripts/review-analysis.mjs
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        timeout-minutes: 10

      - name: Upload analysis artifacts
        uses: actions/upload-artifact@v4
        with:
          name: analysis-data
          path: |
            data/analysis-meta.json
            data/analysis-review-log.json
            js/stock-analysis-data.js

  commit-and-deploy:
    needs: [fetch-market-data, generate-analysis]
    if: always() && needs.fetch-market-data.result == 'success'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Download market data
        uses: actions/download-artifact@v4
        with:
          name: market-data
          path: data/

      - name: Download analysis data
        if: needs.generate-analysis.result == 'success'
        uses: actions/download-artifact@v4
        with:
          name: analysis-data
          path: .

      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'data: daily update [${{ github.run_id }}]'
          file_pattern: 'data/*.json js/stock-analysis-data.js'
```

### Secrets 管理

| Secret Name | 用途 | 来源 |
|------------|------|------|
| `OPENNEWS_API_KEY` | OpenNews 新闻 API | opennews.newstool.ai |
| `ANTHROPIC_API_KEY` | Claude API (分析生成+审核) | console.anthropic.com |

在 GitHub repo Settings > Secrets and variables > Actions 中配置。

### Cron 时间线 (CST)

```
CST 06:30  (UTC 22:30 前日) ── 盘后更新 + 财报分析触发
CST 09:00  (UTC 01:00)     ── 盘前更新, 亚盘行情
CST 21:00  (UTC 13:00)     ── 美股交易中更新
```

### 成本估算

| 项目 | 单价 | 日均用量 | 月成本 |
|------|------|---------|--------|
| GitHub Actions | Free (2000 min/mo) | ~15 min/day | $0 |
| Claude Sonnet API (分析生成) | ~$0.07/ticker | ~1-2 tickers/week | ~$1-2/mo |
| Claude Sonnet API (审核) | ~$0.03/ticker | ~1-2 tickers/week | ~$0.5/mo |
| CoinGecko | Free tier | 3x/day | $0 |
| Yahoo Finance | Free (unofficial) | 3x/day | $0 |
| **Total** | | | **~$2-3/mo** |

---

## 7. 实施清单

| # | 任务 | 优先级 | 复杂度 | 依赖 | 描述 |
|---|------|--------|--------|------|------|
| 1 | 创建 `config/tickers.json` | P0 | S | 无 | 统一 ticker 配置, 替代分散在各脚本中的硬编码列表 |
| 2 | 创建 `data/analysis-meta.json` | P0 | S | 无 | 初始化所有 16 个 ticker 的元数据, 从 stock-analysis-data.js 提取 reportDate |
| 3 | 实现 `scripts/check-earnings.mjs` | P0 | M | #1, #2 | 调用 Yahoo Finance 检查财报日历, 输出 pending-analysis.json |
| 4 | 实现 `scripts/generate-analysis.mjs` | P1 | L | #2, #3 | Claude API 集成, prompt 模板, JSON schema 校验, draft 文件输出 |
| 5 | 实现 `scripts/review-analysis.mjs` | P1 | L | #4 | Reviewer Agent, retry 逻辑, 合并到 stock-analysis-data.js |
| 6 | 实现 `scripts/merge-analysis.mjs` | P1 | M | #4, #5 | 将 approved draft JSON 合并写回 js/stock-analysis-data.js (JS export 格式) |
| 7 | 更新 `.github/workflows/update-data.yml` | P0 | M | #3, #4, #5 | 添加 Stage 2-4, artifact 传递, conditional jobs |
| 8 | 添加 `ANTHROPIC_API_KEY` secret | P0 | S | 无 | 在 GitHub repo settings 中配置 |
| 9 | 实现 `scripts/sync-tickers.mjs` | P2 | M | #1 | 从 tickers.json 同步到 fetch-data.mjs 和 fetch-stock-details.py |
| 10 | Telegram Bot ticker 同步 | P2 | M | #1 | ccpa-telegram 读取 tickers.json, 同步每日简报标的列表 |
| 11 | 本地开发/测试支持 | P2 | S | #3, #4 | `npm run check-earnings`, `npm run generate-analysis -- --ticker NVDA --dry-run` |
| 12 | 错误通知 | P3 | M | #7 | workflow 失败时发送 Telegram 通知到 @shryzes_bot |
| 13 | 分析版本历史 | P3 | M | #5 | 保留每个 ticker 的历史分析版本 (data/analysis-history/{TICKER}/{date}.json) |
| 14 | Dashboard 监控页 | P3 | L | #2 | 网站上添加 /status 页面, 显示每个 ticker 的分析状态/新鲜度 |

### 建议实施顺序

```
Phase 1 (Week 1): 基础设施
  #1 → #2 → #8 → #3 → #7 (部分)

Phase 2 (Week 2-3): AI Agent 核心
  #4 → #5 → #6 → #7 (完整)

Phase 3 (Week 4): 整合优化
  #9 → #10 → #11

Phase 4 (持续): 增强
  #12 → #13 → #14
```

---

## 附录: 关键文件路径索引

```
valuemind/
├── .github/workflows/
│   └── update-data.yml          # GitHub Actions 工作流
├── config/
│   └── tickers.json             # [新增] 统一标的配置
├── data/
│   ├── market.json              # 股票指数行情
│   ├── crypto.json              # 加密货币行情
│   ├── fear-greed.json          # 恐贪指数
│   ├── news.json                # 新闻
│   ├── stock-details.json       # 股票详细指标
│   ├── meta.json                # 数据源状态
│   ├── analysis-meta.json       # [新增] 分析元数据 & 缓存追踪
│   ├── pending-analysis.json    # [新增] 待分析 ticker 列表 (临时)
│   ├── analysis-review-log.json # [新增] 审核日志
│   └── analysis-draft/          # [新增] AI 分析草稿 (临时)
├── js/
│   └── stock-analysis-data.js   # 深度分析数据 (前端消费)
├── scripts/
│   ├── fetch-data.mjs           # 行情数据拉取
│   ├── fetch-stock-details.py   # yfinance 详细指标
│   ├── check-earnings.mjs       # [新增] 财报日历检测
│   ├── generate-analysis.mjs    # [新增] AI 分析生成
│   ├── review-analysis.mjs      # [新增] AI 质量审核
│   ├── merge-analysis.mjs       # [新增] 分析合并
│   └── sync-tickers.mjs         # [新增] Ticker 配置同步
└── docs/
    └── update-architecture.md   # 本文档
```
