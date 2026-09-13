"use client"

import * as React from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { MarketHero } from "@/components/market-hero"
import { VerdictGrid } from "@/components/verdict-grid"
import { JournalTable } from "@/components/journal-table"
import { WatchlistPanel } from "@/components/watchlist-panel"
import { LiveSignalStream } from "@/components/live-signal-stream"
import { ReasoningDialog } from "@/components/reasoning-dialog"
import { PracticeTradeModal } from "@/components/practice-trade-modal"
import { ScanDialog } from "@/components/scan-dialog"
import { IntelDocumentation } from "@/components/intel-documentation"
import {
  mockMarketStats,
  mockVerdicts,
  mockJournalEntries,
  mockWatchlist,
  mockScanCandidates,
} from "@/lib/mock-data"
import { Verdict, JournalEntry, WatchlistItem } from "@/types"

export default function Home() {
  const [activeTab, setActiveTab] = React.useState("overview")
  const [selectedVerdict, setSelectedVerdict] = React.useState<Verdict | null>(null)
  const [reasoningOpen, setReasoningOpen] = React.useState(false)

  const [tradeVerdict, setTradeVerdict] = React.useState<Verdict | null>(null)
  const [tradeModalOpen, setTradeModalOpen] = React.useState(false)

  const [scanModalOpen, setScanModalOpen] = React.useState(false)

  const [marketStats, setMarketStats] = React.useState<MarketRegimeStats>(mockMarketStats)
  const [verdicts, setVerdicts] = React.useState<Verdict[]>(mockVerdicts)
  const [journalEntries, setJournalEntries] = React.useState<JournalEntry[]>(mockJournalEntries)
  const [watchlistItems, setWatchlistItems] = React.useState<WatchlistItem[]>(mockWatchlist)

  // Fetch live market macro regime stats (Fear & Greed, BTC Dominance, Breadth)
  React.useEffect(() => {
    fetch("/api/scan")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.data?.stats) {
          setMarketStats(data.data.stats)
        }
      })
      .catch((err) => console.warn("Live market stats fetch error:", err))
  }, [])

  // Fetch real-time token prices from CoinGecko API
  React.useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const res = await fetch("/api/prices", { cache: "no-store" })
        if (!res.ok) return
        const data = await res.json()
        if (data.ok && data.prices) {
          // Update verdicts with real-time CoinGecko prices
          setVerdicts((prev) =>
            prev.map((v) => {
              const live = data.prices[v.symbol]
              if (live && typeof live.price === "number") {
                return {
                  ...v,
                  price: live.price,
                  change24h: live.change24h,
                }
              }
              return v
            })
          )

          // Update watchlist items with real-time CoinGecko prices
          setWatchlistItems((prev) =>
            prev.map((item) => {
              const live = data.prices[item.symbol]
              if (live && typeof live.price === "number") {
                return {
                  ...item,
                  price: live.price,
                  change24h: live.change24h,
                  trend: live.change24h >= 0 ? "up" : "down",
                }
              }
              return item
            })
          )
        }
      } catch (err) {
        console.warn("Could not sync live token prices:", err)
      }
    }

    fetchLivePrices()
    const interval = setInterval(fetchLivePrices, 15000)
    return () => clearInterval(interval)
  }, [])

  // Fetch synchronized journal entries from backend API
  React.useEffect(() => {
    fetch("/api/journal")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.entries) && data.entries.length > 0) {
          setJournalEntries(data.entries)
        }
      })
      .catch((err) => console.log("Using initial journal entries:", err))
  }, [])

  const handleViewReasoning = (verdict: Verdict) => {
    setSelectedVerdict(verdict)
    setReasoningOpen(true)
  }

  const handlePracticeTrade = (verdict: Verdict) => {
    setTradeVerdict(verdict)
    setTradeModalOpen(true)
  }

  const handleTradeLogged = (newEntry: JournalEntry) => {
    setJournalEntries((prev) => [newEntry, ...prev])
    // Synchronize to backend store shared with Telegram bot
    fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    }).catch((err) => console.warn("Failed to persist journal entry:", err))
  }

  const handleAddWatchlistItem = (newItem: WatchlistItem) => {
    setWatchlistItems((prev) => [newItem, ...prev])
  }

  const handleOpenJournal = () => {
    const el = document.getElementById("journal")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSelectCandidate = async (symbol: string) => {
    const match = verdicts.find((v) => v.symbol === symbol)
    if (match) {
      handleViewReasoning(match)
      return
    }
    // Dynamically fetch live agent verdict from backend API
    try {
      const res = await fetch(`/api/verdict?symbol=${encodeURIComponent(symbol)}`)
      if (res.ok) {
        const data = await res.json()
        if (data.ok && data.verdict) {
          setVerdicts((prev) => [data.verdict, ...prev])
          handleViewReasoning(data.verdict)
        }
      }
    } catch (err) {
      console.warn("Failed to generate live verdict for candidate:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#07080c] flex flex-col selection:bg-[#2952FF] selection:text-white transition-colors duration-200">
      {/* Navigation */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Hero section with market regime and 3D coil flourish */}
      <MarketHero
        stats={marketStats}
        onRunScan={() => setScanModalOpen(true)}
        onOpenJournal={handleOpenJournal}
      />

      {/* Main Content Area with generous whitespace dropping verdicts section down */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-32 md:pt-44 pb-16 md:pb-28 flex-1 w-full">
        {/* Verdict Cards Grid */}
        <VerdictGrid
          verdicts={verdicts}
          onViewReasoning={handleViewReasoning}
          onPracticeTrade={handlePracticeTrade}
        />

        {/* Decision Journal & Watchlist Grid */}
        <div className="grid md:grid-cols-3 gap-6" id="watchlist">
          <div className="md:col-span-2" id="journal">
            <JournalTable entries={journalEntries} />
          </div>
          <div>
            <WatchlistPanel
              items={watchlistItems}
              onAddItem={handleAddWatchlistItem}
            />
          </div>
        </div>

        {/* Live Simulation Signal Stream in Motion */}
        <LiveSignalStream onPracticeTrade={handlePracticeTrade} />

        {/* Deep Long-Read Sections: Methodology, Performance, Protocol, FAQ */}
        <IntelDocumentation />
      </main>

      {/* Footer with generous spacing */}
      <footer className="border-t border-slate-100 dark:border-slate-800/80 py-10 sm:py-14 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 relative">
              <Image
                src="/images/mekiki-icon.png"
                alt="Mekiki Logo"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center">Mekiki</span>
            <span>·</span>
            <span>Telegram-native trading intelligence agent</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span>Powered by Mekiki Market Intelligence Engine</span>
            <a
              href="#hero"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Back to top
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <ReasoningDialog
        verdict={selectedVerdict}
        open={reasoningOpen}
        onOpenChange={setReasoningOpen}
        onPracticeTrade={handlePracticeTrade}
      />

      <PracticeTradeModal
        verdict={tradeVerdict}
        open={tradeModalOpen}
        onOpenChange={setTradeModalOpen}
        onTradeLogged={handleTradeLogged}
      />

      <ScanDialog
        open={scanModalOpen}
        onOpenChange={setScanModalOpen}
        candidates={mockScanCandidates}
        onSelectCandidate={handleSelectCandidate}
      />
    </div>
  )
}
