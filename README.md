# Mekiki — Agentic SocialFi Trading Intelligence Terminal

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Telegram Bot API](https://img.shields.io/badge/Telegram_Bot-Native_Engine-2CA5E0?style=flat-square&logo=telegram)](https://core.telegram.org/bots/api)
[![Architecture](https://img.shields.io/badge/Multi--Agent-Adversarial_Consensus-8A2BE2?style=flat-square)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**The dialectic multi-agent trading consensus terminal for crypto markets.**  
*Pitting opposing autonomous agents (Bull vs. Bear) against live orderflow microstructure, calculating mathematical conviction, and enforcing structural invalidation before you risk capital.*

[Explore Features](#core-platform-features) • [System Architecture](#system-architecture) • [Methodology](#analytical-methodology--conviction-calibration) • [Telegram Protocol](#telegram-bot--mini-app-protocol) • [Quickstart](#quickstart-guide) • [API Reference](#api-specification)

</div>

---

## Executive Summary & Philosophy

**Mekiki** is an autonomous crypto trading appraisal terminal that evaluates whether a trade setup is actually worth taking.
Modern crypto markets are drowned in synthetic noise:
- **Black-Box Indicators**: Moving averages, RSI, and Bollinger Bands generate endless lagging, contradictory signals without multi-timeframe context.
- **Single-Model Hallucinations**: Prompting a single AI agent for token advice invariably causes confirmation bias and sycophantic hallucinations.
- **Emotional Execution Trap**: Retail traders enter breakout traps at the top of ranges, trade without pre-defined structural invalidation, and emotionally bag-hold losing positions.

**Mekiki solves this by replacing black-box signals with a transparent, adversarial multi-agent debate pipeline.**

Instead of guessing or predicting price blindly, Mekiki operates a structured **Hegelian dialectic**:
1. **The Bull Specialist Agent (Thesis)**: Formulates the strongest evidence-backed argument for price expansion, interrogating Market Structure Breaks (BOS), Fair Value Gap (FVG) reclamations, spot Cumulative Volume Delta (CVD) accumulation, and negative funding discounts.
2. **The Bear Specialist Agent (Antithesis)**: Aggressively attempts to falsify the setup, interrogating overhead supply blocks, liquidity sweeps, open interest divergence, leverage traps, and macro regime headwinds.
3. **The Lead Judge Agent (Synthesis)**: Arbitrates the conflicting evidence, calibrates an objective **Conviction Score (0–100)** with a granular Bull/Bear split percentage, and dictates an immutable **structural invalidation stop price** and target before any trade can be qualified.

All trade actions operate in a **safe-by-design simulated paper-trading engine** synchronized seamlessly in real time between the high-performance Next.js Web Terminal and the lightning-fast Telegram bot (`@mekiki_agent_bot`).

---

## Key Value Propositions

| Dimension | Conventional Signal Bots & Trading Groups | Mekiki Autonomous Intelligence Terminal |
| :--- | :--- | :--- |
| **Reasoning Model** | Single prompt / black-box indicator trigger | **Adversarial Dual-Agent Debate** (Bull vs. Bear vs. Judge) |
| **Orderflow Microstructure** | Ignored; relies purely on basic candle closes | **Cumulative Volume Delta (CVD)**, orderbook depth & aggressive delta tracking |
| **Structural Invalidation** | Arbitrary percentages (e.g. static -2% or -5%) | **Structural Failure Points** (FVG violations, 4H swing breaks, liquidity sweeps) |
| **Risk-to-Reward Gating** | Unenforced; high win-rate signals with catastrophic tails | **Strict Minimum 2.0x R:R Rule** required for active trade qualification |
| **Market Noise Filtering** | Fires constantly to maintain engagement (churn) | **85%+ Noise Elimination**; defaults to "Neutral" when edge is absent |
| **Cross-Platform State** | Disconnected channels, delayed spreadsheets | **Unified State Engine** synced instantaneously across Web & Telegram |
| **Capital Safety** | Demands custodial API keys with execution risks | **Read-Only / Zero-Custody Architecture**; risk-free practice execution |

---

## System Architecture

Mekiki connects high-throughput market data ingestion, algorithmic microstructure extraction, an adversarial multi-agent LLM consensus pipeline, and a synchronized dual-surface interface.

```
                                  ┌─────────────────────────────────────────┐
                                  │       Live Market Ingestion Layer       │
                                  │   (Spot & Perp Tickers, Orderbooks,     │
                                  │    CVD, Funding Rates, Fear & Greed)    │
                                  └────────────────────┬────────────────────┘
                                                       │
                                                       ▼
                                  ┌─────────────────────────────────────────┐
                                  │      Market Microstructure Radar        │
                                  │  - Multi-Timeframe Structure (15m,1h,4h)│
                                  │  - Fair Value Gaps (FVG) & Order Blocks │
                                  │  - Volume Delta & Aggressive Absorption │
                                  └────────────────────┬────────────────────┘
                                                       │
                                                       ▼
                                  ┌─────────────────────────────────────────┐
                                  │    Adversarial Multi-Agent Pipeline     │
                                  │                                         │
                                  │   ┌───────────────┐   ┌───────────────┐ │
                                  │   │  Bull Agent   │   │  Bear Agent   │ │
                                  │   │ (Thesis Pass) │   │ (Falsify Pass)│ │
                                  │   └───────┬───────┘   └───────┬───────┘ │
                                  │           └─────────┬─────────┘         │
                                  │                     ▼                   │
                                  │         ┌───────────────────────┐       │
                                  │         │    Lead Judge Agent   │       │
                                  │         │ (Synthesis & Verdict) │       │
                                  │         └───────────┬───────────┘       │
                                  └─────────────────────┼───────────────────┘
                                                        │
                                                        ▼
                                  ┌─────────────────────────────────────────┐
                                  │    Risk Gate & Invalidation Engine      │
                                  │  - Minimum 2.0x Risk-to-Reward Filter   │
                                  │  - Non-negotiable Structural Stop Loss  │
                                  │  - Conviction Calibration (0-100)       │
                                  └─────────────────────┬───────────────────┘
                                                        │
                                                        ▼
                                  ┌─────────────────────────────────────────┐
                                  │       Synchronous State Engine          │
                                  │   Thread-Safe In-Memory Journal Ledger  │
                                  │       (lib/store/journal-store.ts)      │
                                  └──────────────┬──────────────────┬───────┘
                                                 │                  │
                         ┌───────────────────────┘                  └───────────────────────┐
                         ▼                                                                  ▼
        ┌───────────────────────────────────┐                              ┌───────────────────────────────────┐
        │       Next.js Web Terminal        │                              │       Telegram Native Engine      │
        │ - 3D Interactive Coil Visualizer  │ <==== Real-Time Sync ====>   │ - Sub-500ms Reactive Bot Engine   │
        │ - Dynamic Verdict Cards           │                              │ - In-Place Message UI Updates     │
        │ - Market Regime Telemetry         │                              │ - 1-Tap Practice Trade Execution  │
        │ - Interactive Decision Journal    │                              │ - Rich Inline Keyboard Callbacks  │
        └───────────────────────────────────┘                              └───────────────────────────────────┘
```

---

## Analytical Methodology & Conviction Calibration

Mekiki's intelligence engine evaluates market conviction through a deterministic 4-phase pipeline:

### Phase 01: Multi-Venue Microstructure & CVD Ingestion
Rather than relying solely on simple historical moving averages, the engine monitors orderflow and volume delta:
- **Cumulative Volume Delta (CVD)**: Measures net market orders (aggressive buyers vs. aggressive sellers). When market buying surges while price stalls against limit orders, the pipeline flags passive limit absorption.
- **Liquidity Cluster Detection**: Maps stop-loss concentrations, open interest expansions, and liquidation pockets across both spot and perpetual futures orderbooks.

### Phase 02: Multi-Timeframe Structural Mapping & FVGs
The pipeline aligns market structure across 15-minute, 1-hour, and 4-hour timeframes:
- **Fair Value Gaps (FVG)**: Algorithmic identification of market imbalances created by aggressive impulse candles that left unfulfilled liquidity.
- **Breaks of Structure (BOS)**: Detection of higher-high or lower-low swing violations indicating trend continuation or regime exhaustion.
- **Volume Profile Point of Control (PoC)**: Validates high-volume nodes where price accepted value versus rejection wicks.

### Phase 03: The Adversarial Dual-Agent Debate
Mekiki instantiates two independent agent processes with conflicting mandates:
- **Bull Specialist Pass**: Evaluates trend strength, support shelf confirmations, positive funding skew, and upside liquidity targets.
- **Bear Specialist Pass**: Actively stress-tests the trade hypothesis by hunting for liquidity grab traps, overhead supply confluence, negative divergence, and macro headwinds.

### Phase 04: Judge Synthesis & Deterministic Risk Invalidation
The Lead Judge synthesizes both arguments and outputs a structured verdict:
- **Conviction Score (0–100)**: Quantitative confidence based on the confluence of evidence chips.
  - **75–100 (High Conviction)**: High-probability setup with confirmed orderflow and structural alignment.
  - **50–74 (Moderate Conviction)**: Favorable bias, but with identifiable friction or range resistance.
  - **0–49 (Low Conviction / Neutral)**: Choppy, conflicting signals — capital preservation prioritized.
- **Immutable Invalidation Stop**: A mathematically defined price level (e.g. FVG breach or swing break) where the thesis is definitively proven false.
- **Minimum 2.0x Risk-to-Reward**: Setups failing this mathematical threshold are rejected regardless of conviction.

---

## Core Platform Features

### 1. Real-Time Market Verdict Terminal
- **Visual Verdict Cards**: Displays the primary trade stance (`Long`, `Short`, or `Neutral`), 0–100 conviction gauge, and Bull/Bear consensus split.
- **Evidence Chips**: Tagged contextual catalysts classified by tone:
  - **Positive**: Spot CVD accumulation, structure break, negative funding discount.
  - **Negative**: Overhead supply block, aggressive distribution, open interest trap.
  - **Warning**: Macro volatility spike, BTC dominance expansion risk.
  - **Neutral**: Range-bound chop, balanced orderbook.
- **Transparent Reasoning Drawer**: Click "View Reasoning" on any asset card to inspect the raw Bull Pass arguments, Bear Pass counter-arguments, Judge synthesis, and specific analytical modules called.

### 2. Market Discovery Radar (`/scan`)
- Scans 80+ active crypto pairs in real time for momentum surges, volume anomalies, and sentiment divergence.
- Immediately identifies the top candidate setups with 1-click interrogation links to initiate an immediate dual-agent evaluation.

### 3. Macro Regime Telemetry
- Evaluates aggregate market breadth, BTC dominance, and the Fear & Greed Index.
- Classifies the market into one of four macro regimes:
  1. **Risk-On Expansion**: Broad liquidity inflow, high signal win rates, extended targets.
  2. **Selective Range**: Dispersion across tokens; strict adherence to boundary retests.
  3. **High-Volatility Choppy**: Frequent whipsaws; conviction thresholds automatically tighten to preserve capital.
  4. **Capitulation / Flush**: Asymmetric mean-reversion setups following extreme liquidation spikes.

### 4. Zero-Custody Decision Journal & Paper Trading
- Execute simulated practice trades directly from the Web Terminal or Telegram with 1 tap.
- Automatic tracking of entry prices, take-profit targets, and structural invalidation stops.
- Rolling portfolio analytics: Win Rate, Average Realized R:R, Profit Factor, Average Duration, and Max Drawdown.
- Zero private key or custodial exposure — 100% safe by design.

---

## Telegram Bot & Mini App Protocol

Mekiki features a first-class Telegram integration powered by an optimized, sub-500ms reactive bot (`@mekiki_agent_bot`).

### Interactive Commands

| Command | Arguments | Description | Example |
| :--- | :--- | :--- | :--- |
| `/start` | None | Launches the interactive terminal menu and quick-access buttons | `/start` |
| `/scan` | None | Scans active pairs for top volume surges and orderflow anomalies | `/scan` |
| `/verdict` | `<symbol>` | Runs the dual-agent debate and outputs an interactive verdict card | `/verdict SOL` |
| `/paper` | `<action> <symbol> [size]` | Executes a simulated paper trade into the shared decision journal | `/paper long SOL 1000` |
| `/journal` | None | Displays your paper trading history, win rate, and rolling PnL | `/journal` |
| `/regime` | None | Returns real-time Fear & Greed index, BTC dominance, and macro regime | `/regime` |

### High-Speed In-Place UI Experience
- **Zero Chat Spam**: Callback queries edit messages in-place rather than printing redundant messages into chat history.
- **Inline Action Keyboards**: Instant 1-tap buttons to practice Long/Short, refresh live tickers, or inspect deep evidence directly within Telegram.
- **Dual Connection Modes**: Run locally via efficient long-polling (`npm run bot`) or deploy to edge serverless webhooks via `/api/telegram`.

---

## Tech Stack & Engineering

Mekiki is engineered for high performance, strict type safety, and zero-latency execution:

- **Frontend & Framework**: Next.js 14 App Router, React 18, TypeScript 5.0
- **Styling & Design System**: Tailwind CSS, Radix UI primitives, shadcn/ui components
- **Visuals & Motion**: Lucide Icons, Canvas 3D Motion Coil visualizer, dynamic SVG conviction gauges
- **Backend & API**: Next.js Route Handlers (`/api/verdict`, `/api/scan`, `/api/journal`, `/api/telegram`)
- **Agent Intelligence**: Adversarial multi-agent reasoning engine with heuristic fallbacks and LLM consensus synthesis
- **State Management**: Thread-safe in-memory paper trade store synchronized bidirectionally between Web and Telegram
- **Telegram Runtime**: Native Bot API client supporting both long-polling runner (`scripts/poll-bot.mjs`) and edge webhook handlers

---

## Quickstart Guide

### Prerequisites
- Node.js 18.17.0 or higher
- npm or pnpm
- A Telegram account (optional, for bot integration)

### 1. Clone the Repository
```bash
git clone https://github.com/Olamidepy/mekiki.git
cd mekiki
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create your local environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Telegram Bot Token (Obtain from @BotFather in 60 seconds)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# Bot Username (e.g. mekiki_agent_bot)
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=mekiki_agent_bot

# Application Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note**: Mekiki's web terminal functions with rich market intelligence out of the box even without a Telegram token. Supplying a token unlocks the live Telegram bot and synchronized paper journal.

### 4. Start the Web Terminal
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) in your browser to access the live terminal.

### 5. Start the Telegram Bot Poller (Optional)
In a second terminal window:
```bash
npm run bot
```
Your Telegram bot will immediately start listening for commands and button clicks with zero need for tunneling tools like ngrok.

---

## API Specification

Mekiki provides a lightweight REST API for programmatic consumption:

### `GET /api/verdict`
Fetches the latest multi-agent consensus verdict for a specific token or the default tracked asset.

**Query Parameters:**
- `symbol` *(string, optional)*: The ticker symbol to evaluate (e.g. `SOL`, `BTC`, `ETH`, `SUI`).

**Sample Response:**
```json
{
  "id": "v-sol",
  "symbol": "SOL",
  "name": "Solana",
  "pair": "SOL/USDT",
  "stance": "Long",
  "conviction": 82,
  "bullPercent": 74,
  "bearPercent": 26,
  "price": 154.20,
  "change24h": 4.8,
  "targetPrice": 168.50,
  "invalidationPrice": 147.80,
  "evidence": [
    { "id": "ev-1", "label": "Spot CVD Accumulation", "tone": "positive" },
    { "id": "ev-2", "label": "4H Market Structure Break", "tone": "positive" },
    { "id": "ev-3", "label": "Overhead FVG Resistance", "tone": "negative" }
  ],
  "reasoning": {
    "bullCase": [
      "4H market structure break confirmed with sustained spot absorption.",
      "Spot Cumulative Volume Delta shows persistent accumulation divergence."
    ],
    "bearCase": [
      "Overhead 4H Fair Value Gap resistance located near $168.50.",
      "Risk of market liquidity drain if BTC dominance surges."
    ],
    "judgeRuling": "Consensus favors an asymmetric Long setup targeting $168.50. Structural risk is capped at $147.80 with a 2.3:1 R:R ratio."
  }
}
```

### `GET /api/scan`
Returns real-time candidate tokens exhibiting high volume, unusual delta divergence, or momentum setups.

### `GET /api/journal` & `POST /api/journal`
- **`GET`**: Returns all recorded paper trading entries, win rates, and cumulative PnL metrics.
- **`POST`**: Logs a new paper trade with entry price, stop-loss, and target bounds.

### `POST /api/telegram`
The production webhook handler for incoming Telegram Bot updates.

---

## Risk Management & Safety Philosophy

Mekiki is engineered around strict safety and capital preservation principles:

1. **Zero Asset Custody**: Mekiki never asks for private keys, seed phrases, or exchange withdrawal permissions. 
2. **Safe-by-Design Paper Trading**: Traders can practice executing strategies, stress-testing hypotheses, and building discipline without risking real capital.
3. **Non-Arbitrary Stops**: Every active trade hypothesis mandates an objective invalidation price pegged to structural market failure (e.g. candle close through a Fair Value Gap or swing level), eliminating catastrophic emotional bag-holding.
4. **Mandatory 2.0x Risk-to-Reward**: No setup qualifies as an active trade unless the projected reward is at least twice the distance to the structural invalidation point.

---

## Frequently Asked Questions (FAQ)

<details>
<summary><b>Why does Mekiki output "Neutral" on so many assets?</b></summary>
<br>
Overtrading is the primary reason retail participants lose money. The majority of crypto market time is spent in choppy, mean-reverting consolidations with negative expected value. Mekiki filters out over 85% of market noise, only outputting active Long or Short stances when high-conviction orderflow confluence and asymmetric risk-to-reward are confirmed.
</details>

<details>
<summary><b>How are the Bull and Bear agents prevented from agreeing prematurely?</b></summary>
<br>
The Bull and Bear agents run in independent evaluation contexts with opposing system directives. The Bull agent is explicitly instructed to build the strongest possible accumulation thesis, while the Bear agent is instructed to find every possible reason why the trade will fail. Only the independent Lead Judge arbitrates their arguments.
</details>

<details>
<summary><b>Can I deploy the Telegram bot on serverless infrastructure?</b></summary>
<br>
Yes. While <code>npm run bot</code> uses long-polling for effortless local development, the repository includes a fully-featured edge-compatible webhook endpoint at <code>/api/telegram</code>. Pointing your Telegram webhook to <code>https://your-domain.com/api/telegram</code> enables 100% serverless bot execution on Vercel or AWS Lambda.
</details>

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<div align="center">

Built for the future of on-chain trading intelligence.  
**Mekiki — Discerning Intelligence for Modern Markets.**

</div>
