"use client"

import * as React from "react"
import { Verdict } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface VerdictCardProps {
  verdict: Verdict
  onViewReasoning: (verdict: Verdict) => void
  onPracticeTrade: (verdict: Verdict) => void
}

export function VerdictCard({
  verdict,
  onViewReasoning,
  onPracticeTrade,
}: VerdictCardProps) {
  const getStanceBadge = () => {
    switch (verdict.stance) {
      case "Long":
        return (
          <span className="rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1">
            Long
          </span>
        )
      case "Short":
        return (
          <span className="rounded-full bg-rose-50 text-rose-700 text-xs font-semibold px-3 py-1">
            Short
          </span>
        )
      case "Neutral":
      default:
        return (
          <span className="rounded-full bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1">
            Neutral
          </span>
        )
    }
  }

  const getEvidenceChipStyle = (tone: string) => {
    switch (tone) {
      case "positive":
        return "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
      case "negative":
        return "bg-rose-50 text-rose-700 hover:bg-rose-100"
      case "warning":
        return "bg-amber-50 text-amber-700 hover:bg-amber-100"
      default:
        return "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
    }
  }

  return (
    <Card className="rounded-2xl border border-slate-200 p-5 bg-white shadow-none transition-all duration-200 hover:border-slate-300">
      {/* Top row: Token info & Stance */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-bold text-[15px] tracking-tightish text-slate-900">
            {verdict.pair}
          </p>
          <p className="text-xs text-slate-400 font-medium">
            {verdict.name}
          </p>
        </div>
        {getStanceBadge()}
      </div>

      {/* Large conviction number */}
      <div className="flex items-end gap-2 mb-4">
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tightish text-slate-900 leading-none">
          {verdict.conviction}
        </span>
        <span className="text-slate-400 text-sm font-medium mb-0.5">
          / 100 conviction
        </span>
      </div>

      {/* Bull / Bear Split Bar */}
      <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-slate-100 mb-2">
        <div
          className="bg-emerald-500 transition-all duration-500"
          style={{ width: `${verdict.bullPercent}%` }}
        />
        <div
          className="bg-red-400 transition-all duration-500"
          style={{ width: `${verdict.bearPercent}%` }}
        />
      </div>

      {/* Percentages row */}
      <div className="flex justify-between text-xs text-slate-500 font-medium mb-4">
        <span>Bull {verdict.bullPercent}%</span>
        <span>Bear {verdict.bearPercent}%</span>
      </div>

      {/* Evidence Chips */}
      <div className="flex flex-wrap gap-1.5 mb-6 min-h-[32px]">
        {verdict.evidence.map((chip) => (
          <span
            key={chip.id}
            className={`text-xs rounded-full px-2.5 py-1 font-medium transition-colors ${getEvidenceChipStyle(
              chip.tone
            )}`}
          >
            {chip.label}
          </span>
        ))}
      </div>

      {/* Card Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 rounded-full border-slate-300 text-slate-800 text-xs font-medium py-2 h-9 hover:border-slate-400"
          onClick={() => onViewReasoning(verdict)}
        >
          View reasoning
        </Button>
        <Button
          size="sm"
          className="flex-1 rounded-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white text-xs font-medium py-2 h-9 shadow-none"
          onClick={() => onPracticeTrade(verdict)}
        >
          Practice trade
        </Button>
      </div>
    </Card>
  )
}
