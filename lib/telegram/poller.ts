import { processTelegramUpdate } from "./handler"
import { getBotToken } from "./client"

class TelegramPoller {
  private isRunning = false
  private offset = 0

  public start() {
    if (this.isRunning) {
      return
    }

    const token = getBotToken()
    if (!token || token.length < 10) {
      console.log("[TelegramPoller] No TELEGRAM_BOT_TOKEN found in environment.")
      return
    }

    this.isRunning = true
    console.log(`[TelegramPoller] 🚀 Auto-polling started for token ${token.slice(0, 8)}...`)

    // Clear any previous webhook to ensure getUpdates receives all messages
    fetch(`https://api.telegram.org/bot${token}/deleteWebhook`)
      .then((r) => r.json())
      .then((res) => {
        console.log("[TelegramPoller] Webhook reset status:", res.ok ? "Cleared" : res.description)
      })
      .catch((err) => {
        console.warn("[TelegramPoller] Webhook delete warning:", err.message)
      })
      .finally(() => {
        this.runLoop(token)
      })
  }

  private async runLoop(token: string) {
    while (this.isRunning) {
      try {
        const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${this.offset}&timeout=15`
        const res = await fetch(url)
        
        if (!res.ok) {
          await new Promise((r) => setTimeout(r, 4000))
          continue
        }

        const data = await res.json()
        if (data.ok && Array.isArray(data.result)) {
          for (const update of data.result) {
            this.offset = update.update_id + 1
            const sender = update.message?.from?.username || update.callback_query?.from?.username || "user"
            const text = update.message?.text || update.callback_query?.data || "action"
            console.log(`[TelegramPoller] 📨 Processing [${text}] from @${sender}`)
            
            try {
              await processTelegramUpdate(update)
            } catch (procErr) {
              console.error("[TelegramPoller] Error in processTelegramUpdate:", procErr)
            }
          }
        } else if (!data.ok) {
          console.warn("[TelegramPoller] Telegram API response not ok:", data.description)
          await new Promise((r) => setTimeout(r, 5000))
        }
      } catch (err: any) {
        console.warn("[TelegramPoller] Polling connection hiccup, reconnecting in 3s...", err?.message)
        await new Promise((r) => setTimeout(r, 3000))
      }
    }
  }

  public stop() {
    this.isRunning = false
  }

  public getStatus() {
    return {
      isRunning: this.isRunning,
      offset: this.offset,
    }
  }
}

// Preserve poller across Next.js fast refresh
const globalForPoller = globalThis as unknown as { __mekiki_telegram_poller?: TelegramPoller }
export const telegramPoller = globalForPoller.__mekiki_telegram_poller ?? new TelegramPoller()
if (process.env.NODE_ENV !== "production") {
  globalForPoller.__mekiki_telegram_poller = telegramPoller
}
