import fs from "node:fs"
import path from "node:path"
import { Verdict, JournalEntry } from "@/types"
import { LiveTicker } from "../agent/market-data"

export function getBotToken(): string {
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_BOT_TOKEN.length > 5) {
    return process.env.TELEGRAM_BOT_TOKEN.trim()
  }
  try {
    const envPath = path.resolve(process.cwd(), ".env.local")
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8")
      const match = content.match(/TELEGRAM_BOT_TOKEN=([^\r\n]+)/)
      if (match && match[1]) {
        const token = match[1].trim()
        process.env.TELEGRAM_BOT_TOKEN = token
        return token
      }
    }
  } catch {}
  return ""
}

export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "https://mekiki.app"
}

interface InlineKeyboardButton {
  text: string
  callback_data?: string
  url?: string
  web_app?: { url: string }
}

interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][]
}

export async function callTelegramApi(method: string, body: Record<string, unknown>) {
  const token = getBotToken()
  if (!token) {
    return { ok: false, description: "Missing TELEGRAM_BOT_TOKEN" }
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    return await res.json()
  } catch (err) {
    console.error(`Telegram API error (${method}):`, err)
    return { ok: false, description: String(err) }
  }
}

export async function sendTelegramMessage(
  chatId: number | string,
  text: string,
  replyMarkup?: InlineKeyboardMarkup
) {
  const res = await callTelegramApi("sendMessage", {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
    disable_web_page_preview: false,
    reply_markup: replyMarkup,
  })

  // If HTML entity formatting causes a rejection, retry as safe plain text
  if (!res.ok && res.description?.toLowerCase().includes("can't parse entities")) {
    console.warn("Retrying Telegram message without HTML parse mode...")
    const plainText = text.replace(/<[^>]*>/g, "")
    return callTelegramApi("sendMessage", {
      chat_id: chatId,
      text: plainText,
      reply_markup: replyMarkup,
    })
  }

  return res
}

export async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  return callTelegramApi("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text: text,
    show_alert: false,
  })
}

function getWebButton(text: string, appUrl: string): InlineKeyboardButton {
  if (appUrl && appUrl.startsWith("https://")) {
    return { text, url: appUrl }
  }
  return { text, callback_data: "act:web" }
}

export async function sendTelegramVerdict(chatId: number | string, verdict: Verdict) {
  const stanceEmoji = verdict.stance === "Long" ? "🟩" : verdict.stance === "Short" ? "🟥" : "⚪"
  const changeEmoji = verdict.change24h >= 0 ? "+" : ""
  const appUrl = getAppUrl()

  const message = `
<b>${stanceEmoji} MEKIKI VERDICT — ${verdict.pair}</b>
<i>${verdict.name}</i>

• <b>Stance:</b> ${verdict.stance.toUpperCase()} (${verdict.conviction}% Conviction)
• <b>Bull / Bear Split:</b> 🟩 ${verdict.bullPercent}% | ${verdict.bearPercent}% 🟥
• <b>Live Price:</b> $${verdict.price.toLocaleString()} (${changeEmoji}${verdict.change24h}%)

<b>Thesis:</b>
${verdict.thesisSummary || "Market structure alignment supported by orderflow delta."}

<b>Execution Setup:</b>
🎯 <b>Take Profit:</b> $${verdict.targetPrice ?? "N/A"}
🛑 <b>Invalidation (SL):</b> $${verdict.invalidationPrice ?? "N/A"}
${verdict.technicalNotes ? `\n📊 <i>${verdict.technicalNotes}</i>` : ""}
`.trim()

  const replyMarkup: InlineKeyboardMarkup = {
    inline_keyboard: [
      [
        {
          text: `📈 Practice Long`,
          callback_data: `act:paper:${verdict.symbol}:Long`,
        },
        {
          text: `📉 Practice Short`,
          callback_data: `act:paper:${verdict.symbol}:Short`,
        },
      ],
      [
        {
          text: `🔄 Refresh ${verdict.symbol}`,
          callback_data: `act:verdict:${verdict.symbol}`,
        },
        getWebButton("🌐 Web Terminal", appUrl),
      ],
    ],
  }

  return sendTelegramMessage(chatId, message, replyMarkup)
}

export async function sendTelegramScan(chatId: number | string, movers: LiveTicker[]) {
  const appUrl = getAppUrl()
  const rows = movers
    .map((m) => {
      const dir = m.change24h >= 0 ? "🟢 +" : "🔴 "
      return `• <b>${m.symbol}</b>: $${m.price.toLocaleString()} (${dir}${m.change24h}%) | Vol: $${(m.volume24h / 1e6).toFixed(1)}M`
    })
    .join("\n")

  const text = `
<b>🔍 MEKIKI REAL-TIME MARKET SCAN</b>
<i>Top Liquidity & Volatility Anomalies:</i>

${rows}

<i>Tap any asset below to generate an instantaneous dual-agent verdict:</i>
`.trim()

  const assetButtons: InlineKeyboardButton[] = movers.slice(0, 4).map((m) => ({
    text: `⚡ ${m.symbol}`,
    callback_data: `act:verdict:${m.symbol}`,
  }))

  const replyMarkup: InlineKeyboardMarkup = {
    inline_keyboard: [
      assetButtons,
      [
        { text: `📊 View Decision Journal`, callback_data: `act:journal` },
        getWebButton("🌐 Open WebApp", appUrl),
      ],
    ],
  }

  return sendTelegramMessage(chatId, text, replyMarkup)
}

export async function sendTelegramJournal(
  chatId: number | string,
  entries: JournalEntry[],
  stats: { total: number; winRate: string; totalPnl: string }
) {
  const appUrl = getAppUrl()
  const recentRows = entries
    .slice(0, 5)
    .map((e) => {
      const pnlSign = e.outcomePercent >= 0 ? "+" : ""
      const statusEmoji = e.outcomeStatus === "positive" ? "✅" : e.outcomeStatus === "negative" ? "❌" : "⏳"
      return `${statusEmoji} <b>${e.symbol}</b> (${e.call}) Entry: $${e.entryPrice} → PnL: <code>${pnlSign}${e.outcomePercent}%</code>`
    })
    .join("\n")

  const text = `
<b>📓 MEKIKI DECISION JOURNAL</b>

• <b>Tracked Trades:</b> ${stats.total}
• <b>Historical Win Rate:</b> ${stats.winRate}
• <b>Cumulative PnL:</b> ${stats.totalPnl}

<b>Recent Paper Entries:</b>
${recentRows || "No active entries."}

<i>Practice trades allow you to validate the dual-agent conviction without real capital risk.</i>
`.trim()

  const replyMarkup: InlineKeyboardMarkup = {
    inline_keyboard: [
      [
        { text: `🔍 Run Market Scan`, callback_data: `act:scan` },
        getWebButton("🌐 Full Web Terminal", appUrl),
      ],
    ],
  }

  return sendTelegramMessage(chatId, text, replyMarkup)
}
