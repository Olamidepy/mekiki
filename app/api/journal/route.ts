import { NextRequest, NextResponse } from "next/server"
import { journalStore } from "@/lib/store/journal-store"

export async function GET() {
  const entries = journalStore.getAll()
  const stats = journalStore.getStats()
  return NextResponse.json({ ok: true, entries, stats })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { symbol, name, call, conviction, entryPrice, notes } = body

    const newEntry = journalStore.add({
      symbol: (symbol || "SOL").toUpperCase(),
      name: name || `${symbol} Token`,
      call: call || "Long",
      conviction: conviction || 80,
      timestamp: new Date().toISOString(),
      entryPrice: Number(entryPrice) || 100,
      currentPrice: Number(entryPrice) || 100,
      outcomePercent: 0,
      outcomeStatus: "flat",
      notes: notes || "Practice trade logged via Mekiki Web Dashboard",
    })

    return NextResponse.json({ ok: true, entry: newEntry })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Failed to record journal entry", details: String(err) },
      { status: 400 }
    )
  }
}
