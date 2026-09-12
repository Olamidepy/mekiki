import { NextRequest, NextResponse } from "next/server"
import { processTelegramUpdate, TelegramUpdate } from "@/lib/telegram/handler"
import { getBotToken } from "@/lib/telegram/client"

// GET: Check status, inspect live Telegram webhook, or automatically register webhook with ?setup=1
export async function GET(req: NextRequest) {
  const token = getBotToken()
  const configured = Boolean(token && token.length > 5)
  const { searchParams } = new URL(req.url)
  const setup = searchParams.get("setup") || searchParams.get("set")
  const clear = searchParams.get("clear")

  if (!configured) {
    return NextResponse.json({
      status: "error",
      service: "Mekiki Telegram Bot Webhook",
      configured: false,
      hint: "TELEGRAM_BOT_TOKEN is missing or too short. Configure it in Vercel Environment Variables.",
      timestamp: new Date().toISOString(),
    })
  }

  // Derive base public URL from request origin or environment variable
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "mekikixyz.vercel.app"
  const proto = req.headers.get("x-forwarded-proto") || "https"
  const origin = `${proto}://${host}`
  const targetWebhookUrl = `${origin}/api/telegram`

  // Action: Clear webhook
  if (clear) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/deleteWebhook?drop_pending_updates=true`, {
        method: "POST",
      })
      const result = await res.json()
      return NextResponse.json({
        status: "webhook_cleared",
        telegram_response: result,
        timestamp: new Date().toISOString(),
      })
    } catch (err) {
      return NextResponse.json({ status: "error", error: String(err) }, { status: 500 })
    }
  }

  // Action: Auto-register webhook with Telegram
  if (setup) {
    try {
      const res = await fetch(
        `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(targetWebhookUrl)}&drop_pending_updates=true`,
        { method: "POST" }
      )
      const result = await res.json()
      return NextResponse.json({
        status: result.ok ? "webhook_configured_successfully" : "webhook_configuration_failed",
        target_url: targetWebhookUrl,
        telegram_response: result,
        timestamp: new Date().toISOString(),
      })
    } catch (err) {
      return NextResponse.json({ status: "error", error: String(err) }, { status: 500 })
    }
  }

  // Default: Return current webhook info from Telegram
  let webhookInfo = null
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`)
    if (res.ok) {
      webhookInfo = await res.json()
    }
  } catch {}

  const currentUrl = webhookInfo?.result?.url || ""
  const isTargetMatching = currentUrl.toLowerCase() === targetWebhookUrl.toLowerCase()

  return NextResponse.json({
    status: "ok",
    service: "Mekiki Telegram Bot Webhook",
    configured: true,
    target_webhook_url: targetWebhookUrl,
    current_telegram_webhook: currentUrl,
    is_active_on_telegram: Boolean(currentUrl && isTargetMatching),
    telegram_webhook_info: webhookInfo?.result ?? null,
    setup_help: isTargetMatching
      ? "Webhook is active and properly routing to this Vercel deployment!"
      : `Webhook is not pointing here yet. Visit ${targetWebhookUrl}?setup=1 to auto-register it in 1 click.`,
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
