import { NextRequest, NextResponse } from "next/server"
import { processTelegramUpdate, TelegramUpdate } from "@/lib/telegram/handler"
import { getBotToken } from "@/lib/telegram/client"

// GET: Check status and webhook health
export async function GET() {
  const token = getBotToken()
  const configured = Boolean(token && token.length > 5)

  return NextResponse.json({
    status: "ok",
    service: "Mekiki Telegram Bot Webhook",
    configured: configured,
    hint: configured
      ? "Telegram bot token is loaded and ready for production webhooks."
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
