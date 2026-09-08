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
    <div id="verdicts" className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tightish text-slate-900">
            Today's verdicts
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Conviction synthesized from multi-pass bull/bear LLM reasoning
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200/60 text-xs">
            {(["all", "Long", "Neutral"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1 font-medium transition-colors capitalize ${
                  filter === f
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => setFilter("all")}
            className="text-xs text-[#2952FF] font-medium hover:underline px-2"
          >
            See all ({verdicts.length})
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
