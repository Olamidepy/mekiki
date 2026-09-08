# 👁️ Mekiki (目利き) — Agentic SocialFi Trading Intelligence

> **RYO-CHAN Hackathon 2026 Submission**  
> **Target Tracks:** **Track 1 (Autonomous Agents)** & **Track 2 (Dashboards & Interfaces)**  
> **Submitting Team:** `ryochan-hackathon_repository-232`  
> **Submission Deadline:** September 8, 2026 · 23:59 JST

---

## 🎯 Executive Summary & Concept

**Mekiki (目利き — Japanese for *"a connoisseur with a discerning eye"*)** is a Telegram-native agentic intelligence platform built for on-chain crypto markets. 

Instead of dumping raw charts or black-box trading signals, Mekiki operates a **multi-agent dialectic debate**:
1. **The Bull Agent**: Interrogates 4H market structure breaks, Fair Value Gaps (FVG), spot Cumulative Volume Delta (CVD) accumulation, and negative funding rates.
2. **The Bear Agent**: Interrogates overhead liquidity grabs, spot CVD exhaustion, leverage traps, and macro distribution regimes.
3. **The Lead Judge Agent**: Synthesizes the evidence, computes an objective **Conviction Score (0–100)** with a granular Bull/Bear percentage split, and dictates a **strict structural invalidation stop price** and target before any trade is proposed.

All trade actions operate as **safe-by-design practice paper trades** synchronized seamlessly between the web terminal and the Telegram bot (`@mekiki_agent_bot`).

---

## 🏆 Hackathon Track Alignment

### Track 1: Autonomous Agents ($6,000 Award Category)
* **Bull / Bear Debate Execution**: Directly fulfills the RYO Hackathon spotlight agent archetype: *"Opposing agents argue from the same evidence; a third judges."*
* **Visible Reasoning Trail**: Every verdict exposes its thesis, supporting evidence chips, technical notes, orderflow metrics, and invalidation criteria.
* **Safe by Design**: Operates strictly within RYO's read-only philosophy. Practice trades and portfolio states live on the builder side with zero asset movement or custody risk.
* **Failure Resilience**: Built-in tiered fallback architecture that gracefully degrades if an exchange or upstream API experiences rate-limiting.

### Track 2: Dashboards & Interfaces ($3,500 Award Category)
* **The 30-Second Rule**: The header, market regime banner, and verdict cards tell a trader *what changed and why it matters* in under 30 seconds.
* **Strict shadcn/ui Design System**: Built with clean, accessible components (`Card`, `Badge`, `Button`, `Table`, `Tabs`, `Separator`) following high-conviction visual hierarchy without gimmick icons.
* **Zero Fabricated Data**: Powered by live 24h ticker prices, volumes, and Fear & Greed indices.

### SocialFi Dimension
* **Telegram Native**: Traders can summon the agent directly within private chats or public Telegram groups using `/verdict`, `/scan`, and `/paper`.
* **Shareable Decision Receipts**: Generates rich inline verdict cards and decision journal summaries directly in Telegram with 1-tap practice trade execution.

---

## ⚡ Key Architecture & Tech Stack

```
                               ┌───────────────────────────────────┐
                               │  RYO Research Layer / Live Data   │
                               │  (Binance API, Alt.me Fear&Greed) │
                               └─────────────────┬─────────────────┘
                                                 │
                                                 ▼
                               ┌───────────────────────────────────┐
                               │  Mekiki Dual-Agent Debate Engine  │
                               │   Bull Agent  vs.  Bear Agent     │
                               │          LLM Judge Pass           │
                               └─────────┬───────────────┬─────────┘
                                         │               │
                     ┌───────────────────┘               └───────────────────┐
                     ▼                                                       ▼
       ┌───────────────────────────┐                           ┌───────────────────────────┐
       │   Web Terminal (Next.js)  │                           │   Telegram Bot Mini App   │
       │   - 3D Motion Coil Hero   │ <==== Synchronized ====>  │   - @mekiki_agent_bot     │
       │   - Live Verdict Cards    │     Paper Journal Store   │   - Interactive Commands  │
       │   - Decision Journal      │   (lib/store/journal.ts)  │   - 1-Tap Practice Trades │
       └───────────────────────────┘                           └───────────────────────────┘
```

* **Frontend**: Next.js 14 App Router, React 18, Tailwind CSS, shadcn/ui.
* **Backend**: Next.js API Route Handlers (`/api/telegram`, `/api/verdict`, `/api/scan`, `/api/journal`).
* **Telegram Bot**: Native Bot API client (`lib/telegram/client.ts`) with webhook and local long-polling runner (`scripts/poll-bot.mjs`).
* **State Engine**: Thread-safe in-memory paper trade ledger (`lib/store/journal-store.ts`) synchronized across web and Telegram.

---

## 🚀 Quickstart Guide (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the template file:
```bash
cp .env.example .env.local
```
Fill in your credentials in `.env.local`:
```env
# Telegram Bot Token (Get from @BotFather in 60s)
TELEGRAM_BOT_TOKEN=your_token_here

# Bot username (e.g. mekiki_agent_bot)
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=mekiki_agent_bot

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run the Web Terminal
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run the Telegram Bot Poller
In a separate terminal window:
```bash
npm run bot
```
Your bot will immediately listen for messages and commands on Telegram without requiring ngrok or public HTTPS!

---

## 🤖 Telegram Bot Commands

| Command | Description |
| :--- | :--- |
| `/start` | Launches the interactive welcome menu and opens the web terminal |
| `/scan` | Scans market pairs for top volume and momentum anomalies |
| `/verdict <symbol>` | Runs the dual-agent debate for a token (e.g. `/verdict SOL`, `/verdict BTC`) |
| `/paper <long/short> <symbol>` | Executes a practice simulated trade into the decision journal |
| `/journal` | Displays your tracked practice positions, win rate, and cumulative PnL |
| `/regime` | Returns real-time Fear & Greed index and BTC dominance |

---

## 🛡️ Hackathon Rule Compliance

* **Secret Protection**: `.env` and `.env*.local` are strictly `.gitignore`'d. Only `.env.example` is committed.
* **No Fabricated Data**: Live tickers, prices, and volumes are pulled from real-time market orderbooks.
* **Read-Only Safety**: Does not touch user private keys, custodial balances, or exchange withdrawal endpoints.

---

## 📄 License
MIT © 2026 RYO-CHAN Hackathon Team 232. Built with ❤️ for the RYO Agentic SocialFi Challenge.
