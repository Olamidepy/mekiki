import { NextRequest, NextResponse } from "next/server"
import { processTelegramUpdate, TelegramUpdate } from "@/lib/telegram/handler"
import { getBotToken } from "@/lib/telegram/client"
import { telegramPoller } from "@/lib/telegram/poller"

// GET: Check status, webhook health, and ensure poller is active in dev
export async function GET() {
  const token = getBotToken()
  const configured = Boolean(token && token.length > 5)

  if (configured) {
    telegramPoller.start()
  }

  return NextResponse.json({
    status: "ok",
    service: "Mekiki Telegram Bot Webhook",
    configured: configured,
    poller: telegramPoller.getStatus(),
    hint: configured
      ? "Telegram bot token is loaded and poller is active."
      : "Please set TELEGRAM_BOT_TOKEN in .env.local to enable Telegram bot messaging.",
    timestamp: new Date().toISOString(),
  })
}

// POST: Telegram Webhook Receiver
export async function POST(req: NextRequest) {
  try {
    const update = (await req.json()) as TelegramUpdate
    await processTelegramUpdate(update)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error handling Telegram webhook POST:", error)
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
