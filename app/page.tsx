"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { MarketHero } from "@/components/market-hero"
import { VerdictGrid } from "@/components/verdict-grid"
import { JournalTable } from "@/components/journal-table"
import { WatchlistPanel } from "@/components/watchlist-panel"
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

  const [journalEntries, setJournalEntries] = React.useState<JournalEntry[]>(mockJournalEntries)
  const [watchlistItems, setWatchlistItems] = React.useState<WatchlistItem[]>(mockWatchlist)

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

  const handleSelectCandidate = (symbol: string) => {
    const match = mockVerdicts.find((v) => v.symbol === symbol)
    if (match) {
      handleViewReasoning(match)
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#2952FF] selection:text-white">
      {/* Navigation */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Hero section with market regime and 3D coil flourish */}
      <MarketHero
        stats={mockMarketStats}
        onRunScan={() => setScanModalOpen(true)}
        onOpenJournal={handleOpenJournal}
      />

      {/* Main Content Area with generous whitespace dropping verdicts section down */}
      <main className="max-w-7xl mx-auto px-6 pt-24 sm:pt-36 md:pt-44 pb-20 md:pb-28 flex-1 w-full">
        {/* Verdict Cards Grid */}
        <VerdictGrid
          verdicts={mockVerdicts}
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

        {/* Deep Long-Read Sections: Methodology, Performance, Protocol, FAQ */}
        <IntelDocumentation />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#2952FF] flex items-center justify-center text-white text-[10px]">
              目
            </div>
            <span className="font-semibold text-slate-900">Mekiki</span>
            <span>·</span>
            <span>Telegram-native trading intelligence agent</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by RYO market research tools</span>
            <a
              href="#hero"
              className="text-slate-600 hover:text-slate-900 transition-colors"
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
