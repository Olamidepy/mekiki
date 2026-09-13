import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Verdict } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
  const getBadgeVariant = () => {
    switch (verdict.stance) {
      case "Long":
        return "default"
      case "Short":
        return "destructive"
      case "Neutral":
      default:
        return "secondary"
    }
  }

  const isLong = verdict.stance === "Long"
  const isShort = verdict.stance === "Short"

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
        "bg-white dark:bg-card border border-slate-200/90 dark:border-slate-800",
        // MagicUI Bento signature box-shadow
        "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // Interactive elevation on hover
        "hover:[box-shadow:0_0_0_1px_rgba(41,82,255,0.18),0_8px_20px_rgba(41,82,255,0.08),0_24px_48px_rgba(0,0,0,.08)]",
        "transform-gpu transition-all duration-300 hover:-translate-y-1"
      )}
    >
      {/* Bento Animated Ambient Background */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-[#2952FF]/10 via-[#2952FF]/5 to-transparent blur-2xl transform-gpu group-hover:scale-150 transition-all duration-500 z-0" />
      
      {/* Decorative accent geometry */}
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-36 h-36 rounded-full border border-slate-100 dark:border-slate-800 transform-gpu group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 opacity-60 z-0" />

      {/* Card Content with Bento GPU translation */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between relative z-10">
        <div className="space-y-3.5 sm:space-y-4 transform-gpu transition-all duration-300 lg:group-hover:-translate-y-1.5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#2952FF] transition-colors duration-200">
                  {verdict.pair}
                </h3>
                {verdict.network && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                    {verdict.network}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-medium">{verdict.name}</p>
            </div>
            <Badge
              variant={getBadgeVariant()}
              className={cn(
                "font-semibold text-xs px-2.5 py-0.5 shadow-sm transform-gpu group-hover:scale-105 transition-transform duration-300",
                isLong && "bg-emerald-600 hover:bg-emerald-600 text-white",
                isShort && "bg-rose-600 hover:bg-rose-600 text-white"
              )}
            >
              {verdict.stance}
            </Badge>
          </div>

          {/* Conviction Metric */}
          <div className="flex items-baseline justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-[#2952FF] transition-colors duration-300">
                {verdict.conviction}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                / 100 conviction
              </span>
            </div>
            {verdict.volume24h && (
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700">
                Vol: {verdict.volume24h}
              </span>
            )}
          </div>

          {/* Bull / Bear Split Bar */}
          <div className="space-y-1.5">
            <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <div
                className="bg-emerald-500 transition-all duration-500"
                style={{ width: `${verdict.bullPercent}%` }}
              />
              <div
                className="bg-rose-500 transition-all duration-500"
                style={{ width: `${verdict.bearPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-emerald-600 dark:text-emerald-400">Bull {verdict.bullPercent}%</span>
              <span className="text-rose-600 dark:text-rose-400">Bear {verdict.bearPercent}%</span>
            </div>
          </div>

          {/* Evidence Chips with micro-hover */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {verdict.evidence.map((chip) => (
              <span
                key={chip.id}
                className={cn(
                  "inline-flex items-center text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border transition-all duration-200",
                  chip.tone === "positive"
                    ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                    : chip.tone === "negative"
                    ? "bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300"
                    : "bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                )}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions with Bento smooth lift */}
        <div className="flex gap-2 pt-4 sm:pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 transform-gpu transition-all duration-300 lg:group-hover:translate-y-0">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs font-medium rounded-xl hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-200 transition-all px-2 sm:px-3"
            onClick={() => onViewReasoning(verdict)}
          >
            View reasoning
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs font-semibold rounded-xl bg-[#2952FF] hover:bg-[#1f3fd6] text-white shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-1 sm:gap-1.5 group/btn px-2 sm:px-3"
            onClick={() => onPracticeTrade(verdict)}
          >
            <span>Practice trade</span>
            <ArrowRight className="w-3.5 h-3.5 transform-gpu group-hover/btn:translate-x-1 transition-transform duration-200 shrink-0" />
          </Button>
        </div>
      </div>

      {/* Bento subtle overlay interaction */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-slate-900/[0.015]" />
    </div>
  )
}
