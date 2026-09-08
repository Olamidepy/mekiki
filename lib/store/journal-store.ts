import { JournalEntry } from "@/types"
import { mockJournalEntries } from "@/lib/mock-data"

// Global in-memory journal store across Next.js API routes & bot handler
class JournalStore {
  private entries: JournalEntry[] = [...mockJournalEntries]

  public getAll(): JournalEntry[] {
    return this.entries
  }

  public add(entry: Omit<JournalEntry, "id" | "timeAgo">): JournalEntry {
    const newEntry: JournalEntry = {
      ...entry,
      id: `j-${Date.now()}`,
      timeAgo: "Just now",
    }
    this.entries.unshift(newEntry)
    return newEntry
  }

  public getStats() {
    const total = this.entries.length
    const positive = this.entries.filter((e) => e.outcomeStatus === "positive").length
    const winRate = total > 0 ? ((positive / total) * 100).toFixed(1) : "0"
    const totalPnl = this.entries.reduce((acc, curr) => acc + curr.outcomePercent, 0)

    return {
      total,
      positive,
      winRate: `${winRate}%`,
      totalPnl: `${totalPnl > 0 ? "+" : ""}${totalPnl.toFixed(1)}%`,
    }
  }
}

// Ensure singleton instance in globalThis to preserve state across hot reloads in Next.js
const globalStore = globalThis as unknown as { __mekiki_journal_store?: JournalStore }
export const journalStore = globalStore.__mekiki_journal_store ?? new JournalStore()
if (process.env.NODE_ENV !== "production") {
  globalStore.__mekiki_journal_store = journalStore
}
