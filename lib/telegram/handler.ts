import { generateVerdict } from "../agent/reasoning-engine"
import { fetchTopMarketMovers, fetchFearAndGreed, fetchLiveTicker } from "../agent/market-data"
import { journalStore } from "../store/journal-store"
import {
  sendTelegramMessage,
  sendTelegramVerdict,
  sendTelegramScan,
  sendTelegramJournal,
  answerCallbackQuery,
  getAppUrl,
} from "./client"

export interface TelegramUser {
  id: number
  first_name: string
  username?: string
}

export interface TelegramChat {
  id: number
  type: string
}

export interface TelegramMessage {
  message_id: number
  from?: TelegramUser
  chat: TelegramChat
  text?: string
  date: number
}

export interface TelegramCallbackQuery {
  id: string
  from: TelegramUser
  message?: TelegramMessage
  data?: string
}

export interface TelegramUpdate {
  update_id: number
  message?: TelegramMessage
  callback_query?: TelegramCallbackQuery
}

function getWebButton(text = "🌐 Web Terminal") {
  const appUrl = getAppUrl()
  if (appUrl && appUrl.startsWith("https://")) {
    return { text, url: appUrl }
  }
  return { text, callback_data: "act:web" }
}

export async function processTelegramUpdate(update: TelegramUpdate) {
  try {
    // 1. Handle Callback Queries (Inline button clicks)
    if (update.callback_query) {
      const cb = update.callback_query
      const chatId = cb.message?.chat.id || cb.from.id
      const data = cb.data || ""

      // Acknowledge query immediately to stop the button spinning indicator in Telegram client
      await answerCallbackQuery(cb.id)

      if (data === "act:web") {
        const appUrl = getAppUrl()
        const info = `
🌐 <b>Mekiki Web Dashboard</b>

• <b>Local Terminal:</b> <code>${appUrl}</code>
• <b>Status:</b> Active on local development server

<i>Open this link in your browser to view the 3D terminal and live decision journal. When deployed with HTTPS, tapping this button launches the Web App directly!</i>
`.trim()
        return await sendTelegramMessage(chatId, info)
      }

      if (data.startsWith("act:verdict:")) {
        const symbol = data.replace("act:verdict:", "").trim()
        const verdict = await generateVerdict(symbol)
        return await sendTelegramVerdict(chatId, verdict)
      }

      if (data.startsWith("act:paper:")) {
        const parts = data.split(":")
        const symbol = parts[2] || "SOL"
        const stance = (parts[3] as "Long" | "Short") || "Long"
        const ticker = await fetchLiveTicker(symbol)
        const price = ticker ? ticker.price : 100

        const entry = journalStore.add({
          symbol: symbol.toUpperCase(),
          name: `${symbol} Protocol`,
          call: stance,
          conviction: 85,
          timestamp: new Date().toISOString(),
          entryPrice: price,
          currentPrice: price,
          outcomePercent: stance === "Long" ? 1.2 : -0.5,
          outcomeStatus: "positive",
          notes: `Practice ${stance} opened via Telegram inline action.`,
        })

        const text = `
✅ <b>Paper Trade Executed!</b>

• <b>Asset:</b> ${entry.symbol}
• <b>Position:</b> ${entry.call.toUpperCase()}
• <b>Execution Price:</b> $${entry.entryPrice}
• <b>Status:</b> Tracked in Synchronized Decision Journal

<i>Use /journal to monitor open practice positions.</i>
`.trim()

        return await sendTelegramMessage(chatId, text, {
          inline_keyboard: [
            [
              { text: "📓 View Journal", callback_data: "act:journal" },
              { text: "🔍 Run Scan", callback_data: "act:scan" },
            ],
          ],
        })
      }

      if (data === "act:scan") {
        const movers = await fetchTopMarketMovers()
        return await sendTelegramScan(chatId, movers)
      }

      if (data === "act:journal") {
        const entries = journalStore.getAll()
        const stats = journalStore.getStats()
        return await sendTelegramJournal(chatId, entries, stats)
      }

      return
    }

    // 2. Handle Text Messages
    if (update.message && update.message.text) {
      const msg = update.message
      const chatId = msg.chat.id
      const text = (msg.text ?? "").trim()
      const appUrl = getAppUrl()

      // Command: /start or /help
      if (text.startsWith("/start") || text.startsWith("/help")) {
        const welcomeText = `
👋 <b>Welcome to Mekiki (目利き)</b>
<i>Telegram-Native Trading Intelligence Agent</i>

Mekiki scans the market, weighs onchain & orderflow evidence across opposing agents (Bull vs. Bear), and presents high-conviction verdicts before you risk capital.

<b>Available Commands:</b>
• <code>/scan</code> — Real-time liquidity & momentum anomalies
• <code>/verdict SOL</code> — Deep dual-agent verdict (SOL, BTC, ETH, SUI, etc.)
• <code>/paper long SOL</code> — Open a practice simulated trade
• <code>/journal</code> — View your live practice trade journal & win rate
• <code>/regime</code> — Global market regime, Fear & Greed, BTC Dominance

<i>Tap an action below to get started:</i>
`.trim()

        const replyMarkup = {
          inline_keyboard: [
            [
              { text: "🔍 Scan Market", callback_data: "act:scan" },
              { text: "⚡ Verdict SOL", callback_data: "act:verdict:SOL" },
            ],
            [
              { text: "⚡ Verdict BTC", callback_data: "act:verdict:BTC" },
              { text: "⚡ Verdict ETH", callback_data: "act:verdict:ETH" },
            ],
            [
              { text: "📓 Decision Journal", callback_data: "act:journal" },
              getWebButton("🌐 Open Web Terminal"),
            ],
          ],
        }

        return await sendTelegramMessage(chatId, welcomeText, replyMarkup)
      }

      // Command: /scan
      if (text.startsWith("/scan")) {
        const movers = await fetchTopMarketMovers()
        return await sendTelegramScan(chatId, movers)
      }

      // Command: /verdict <symbol>
      if (text.startsWith("/verdict")) {
        const parts = text.split(" ")
        const rawSymbol = parts[1] || "SOL"
        const cleanSymbol = rawSymbol.toUpperCase().replace("/USDT", "").replace("USDT", "")

        await sendTelegramMessage(chatId, `🧠 <i>Analyzing 4H orderflow and dual-agent conviction for <b>${cleanSymbol}</b>...</i>`)

        const verdict = await generateVerdict(cleanSymbol)
        return await sendTelegramVerdict(chatId, verdict)
      }

      // Command: /paper <long/short> <symbol>
      if (text.startsWith("/paper")) {
        const parts = text.split(" ")
        const stanceArg = (parts[1] || "long").toLowerCase()
        const stance = stanceArg.includes("short") ? "Short" : "Long"
        const rawSymbol = parts[2] || "SOL"
        const symbol = rawSymbol.toUpperCase().replace("/USDT", "").replace("USDT", "")

        const ticker = await fetchLiveTicker(symbol)
        const price = ticker ? ticker.price : 100

        const entry = journalStore.add({
          symbol,
          name: `${symbol} Protocol`,
          call: stance,
          conviction: 82,
          timestamp: new Date().toISOString(),
          entryPrice: price,
          currentPrice: price,
          outcomePercent: 0.0,
          outcomeStatus: "flat",
          notes: `Paper trade opened via Telegram command: ${text}`,
        })

        const reply = `
✅ <b>Paper Position Logged</b>

• <b>Symbol:</b> ${entry.symbol}
• <b>Stance:</b> ${entry.call.toUpperCase()}
• <b>Entry Price:</b> $${entry.entryPrice}
• <b>Timestamp:</b> Just now

<i>Check your simulated portfolio anytime using /journal.</i>
`.trim()

        return await sendTelegramMessage(chatId, reply, {
          inline_keyboard: [
            [
              { text: "📓 View Journal", callback_data: "act:journal" },
              getWebButton("🌐 View in Web App"),
            ],
          ],
        })
      }

      // Command: /journal
      if (text.startsWith("/journal")) {
        const entries = journalStore.getAll()
        const stats = journalStore.getStats()
        return await sendTelegramJournal(chatId, entries, stats)
      }

      // Command: /regime
      if (text.startsWith("/regime")) {
        const fng = await fetchFearAndGreed()
        const text = `
<b>🌐 GLOBAL CRYPTO MARKET REGIME</b>

• <b>Fear & Greed Index:</b> ${fng.value}/100 (<i>${fng.classification}</i>)
• <b>BTC Dominance:</b> 54.8%
• <b>Market Breadth:</b> Expanding (Selective altcoin liquidity)
• <b>Macro Volatility:</b> Normal (Compression before major weekly level test)

<i>Use <code>/scan</code> to inspect top anomalous assets.</i>
`.trim()

        return await sendTelegramMessage(chatId, text, {
          inline_keyboard: [
            [{ text: "🔍 Scan Top Movers", callback_data: "act:scan" }],
          ],
        })
      }

      // Fallback for casual chat or unknown command
      const fallbackText = `
I recognized your query: "<i>${text}</i>".

<b>Mekiki Quick Actions:</b>
• Type <code>/verdict SOL</code> (or BTC, ETH, SUI) to get instant dual-agent analysis.
• Type <code>/scan</code> to see top market movers.
• Type <code>/paper long SOL</code> to practice trading.
`.trim()

      return await sendTelegramMessage(chatId, fallbackText, {
        inline_keyboard: [
          [
            { text: "⚡ Verdict SOL", callback_data: "act:verdict:SOL" },
            { text: "🔍 Scan Market", callback_data: "act:scan" },
          ],
        ],
      })
    }
  } catch (error) {
    console.error("Error processing Telegram update:", error)
  }
}
