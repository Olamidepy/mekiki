"use client"

import * as React from "react"
import { Verdict } from "@/types"
import { VerdictCard } from "@/components/verdict-card"

interface VerdictGridProps {
  verdicts: Verdict[]
  onViewReasoning: (verdict: Verdict) => void
  onPracticeTrade: (verdict: Verdict) => void
}

export function VerdictGrid({
  verdicts,
  onViewReasoning,
  onPracticeTrade,
}: VerdictGridProps) {
  const [filter, setFilter] = React.useState<"all" | "Long" | "Neutral" | "Short">("all")
  const [networkFilter, setNetworkFilter] = React.useState<string>("all")

  const networks = ["all", "Base", "Solana", "TON", "Arbitrum", "Hyperliquid", "Sui"]

  const filteredVerdicts = React.useMemo(() => {
    return verdicts.filter((v) => {
      const matchStance = filter === "all" ? true : v.stance === filter
      const matchNetwork =
        networkFilter === "all"
          ? true
          : v.network?.toLowerCase() === networkFilter.toLowerCase()
      return matchStance && matchNetwork
    })
  }, [verdicts, filter, networkFilter])

  return (
    <div id="verdicts" className="mb-24 md:mb-36">
      {/* Section Header with generous white space */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-6 md:mb-8 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Today's verdicts
          </h2>
          <div className="w-12 sm:w-14 h-1 bg-[#2952FF] rounded-full mt-2 mb-2" />
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-normal">
            Conviction synthesized from multi-pass bull/bear LLM reasoning and real-time orderflow.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start sm:self-auto">
          <div className="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200/80 text-xs">
            {(["all", "Long", "Neutral"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 sm:px-4 py-1 sm:py-1.5 font-medium transition-all capitalize text-xs ${
                  filter === f
                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setFilter("all")
              setNetworkFilter("all")
            }}
            className="text-xs text-[#2952FF] font-semibold hover:underline px-1 sm:px-2"
          >
            Reset ({filteredVerdicts.length}/{verdicts.length})
          </button>
        </div>
      </div>

      {/* Network Ecosystem Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Ecosystem:
        </span>
        {networks.map((net) => (
          <button
            key={net}
            onClick={() => setNetworkFilter(net)}
            className={`shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${
              networkFilter === net
                ? "bg-[#2952FF] text-white border-[#2952FF] shadow-sm font-semibold"
                : "bg-white text-slate-600 border-slate-200/80 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            {net === "all" ? "All Ecosystems" : net}
          </button>
        ))}
      </div>

      {/* Grid of Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVerdicts.map((verdict) => (
          <VerdictCard
            key={verdict.id}
            verdict={verdict}
            onViewReasoning={onViewReasoning}
            onPracticeTrade={onPracticeTrade}
          />
        ))}
      </div>
    </div>
  )
}
