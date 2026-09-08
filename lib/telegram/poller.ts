// Internal Next.js poller is completely disabled in favor of dedicated `npm run bot`
// to eliminate dual-poller offset conflicts on the Telegram Bot API.

class TelegramPoller {
  public start() {
    // No-op: dedicated runner `scripts/poll-bot.mjs` handles polling
  }

  public stop() {
    // No-op
  }

  public getStatus() {
    return {
      isRunning: false,
      mode: "external (scripts/poll-bot.mjs)",
    }
  }
}

// Stop any previously running poller on globalThis
const globalForPoller = globalThis as unknown as { __mekiki_telegram_poller?: any }
if (globalForPoller.__mekiki_telegram_poller?.stop) {
  try {
    globalForPoller.__mekiki_telegram_poller.stop()
  } catch {}
}

export const telegramPoller = new TelegramPoller()
globalForPoller.__mekiki_telegram_poller = telegramPoller

