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

  const filteredVerdicts = React.useMemo(() => {
    if (filter === "all") return verdicts
    return verdicts.filter((v) => v.stance === filter)
  }, [verdicts, filter])

  return (
    <div id="verdicts" className="mb-24 md:mb-36">
      {/* Section Header with generous white space */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-[#2952FF] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2952FF]" />
            <span>Agent Conviction Radar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Today's verdicts
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl font-normal">
            Conviction synthesized from multi-pass bull/bear LLM reasoning and real-time orderflow.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200/80 text-xs">
            {(["all", "Long", "Neutral"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 font-medium transition-all capitalize ${
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
            onClick={() => setFilter("all")}
            className="text-xs text-[#2952FF] font-semibold hover:underline px-2"
          >
            See all ({verdicts.length})
          </button>
        </div>
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
