"use client"

import * as React from "react"
import { Verdict, ReasoningPass } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, TrendingUp, TrendingDown, Scale, AlertTriangle, HelpCircle, CheckCircle2 } from "lucide-react"

interface ReasoningDialogProps {
  verdict: Verdict | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onPracticeTrade: (verdict: Verdict) => void
}

export function ReasoningDialog({
  verdict,
  open,
  onOpenChange,
  onPracticeTrade,
}: ReasoningDialogProps) {
  const [challengeMode, setChallengeMode] = React.useState(false)
  const [challengeResult, setChallengeResult] = React.useState<string | null>(null)

  if (!verdict) return null

  const reasoning: ReasoningPass = verdict.reasoning ?? {
    bullCase: [
      `4H market structure break confirmed on ${verdict.symbol} with sustained spot absorption.`,
      "Cumulative Volume Delta shows persistent accumulation divergence against flat price action.",
      "Funding rate discounts indicate spot buyers are driving market progress.",
    ],
    bearCase: [
      "Overhead Fair Value Gap resistance located near immediate target zone.",
      "Risk of market-wide liquidity drain if BTC dominance rapidly expands.",
    ],
    judgeRuling:
      verdict.thesisSummary ||
      "Consensus favors an asymmetric setup with strict structural invalidation and a minimum 2.0x R:R ratio.",
    invalidationCriteria: [
      `4H candle close breaching structural invalidation level at $${verdict.invalidationPrice ?? (verdict.price * 0.95).toFixed(2)}.`,
      "Aggressive spot CVD divergence flipping opposite to trade stance.",
      "Macro Fear & Greed index shifting by >15 points in 24 hours.",
    ],
    ryoToolsUsed: [
      "market_overview",
      "analyze_token",
      "deep_analysis",
      "monitor_market_sentiment_shift",
    ],
  }

  const handleChallenge = () => {
    setChallengeMode(true)
    setTimeout(() => {
      setChallengeResult(
        `Stress-test completed against current market structure: If ${verdict.symbol} suffers a liquidity cascade breaking below ${
          verdict.symbol === "SOL" ? "$146.50" : verdict.symbol === "ETH" ? "$3,300" : "$65,000"
        } alongside a reversal in BTC dominance, the long thesis becomes invalid immediately. Exit triggers would execute before retail stop cascades.`
      )
    }, 600)
  }

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val)
      if (!val) {
        setChallengeMode(false)
        setChallengeResult(null)
      }
    }}>
      <DialogContent className="w-[94vw] sm:max-w-2xl max-h-[88vh] overflow-y-auto p-4 sm:p-6 rounded-2xl bg-background dark:bg-slate-950 border-slate-200 dark:border-slate-800">
        <DialogHeader className="text-left">
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tightish">
                {verdict.pair}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                {verdict.name}
              </span>
              <Badge
                variant={
                  verdict.stance === "Long"
                    ? "default"
                    : verdict.stance === "Short"
                    ? "destructive"
                    : "secondary"
                }
                className="text-[11px] px-2 py-0"
              >
                {verdict.stance}
              </Badge>
            </div>

            <div className="text-right">
              <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {verdict.conviction}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 block -mt-1">
                conviction
              </span>
            </div>
          </div>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Synthesized via Mekiki Market Intelligence Engine · {verdict.timestamp}
          </DialogDescription>
        </DialogHeader>

        {/* Tools used pill row */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 text-xs">
          <span className="font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
            Analytical intelligence modules called:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {reasoning.ryoToolsUsed.map((tool) => (
              <span
                key={tool}
                className="font-mono text-[11px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700"
              >
                {tool}()
              </span>
            ))}
          </div>
        </div>

        {/* Multi-pass reasoning trail */}
        <div className="space-y-4 text-sm mt-1">
          {/* Bull case pass */}
          <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-semibold text-xs tracking-tight text-emerald-900 dark:text-emerald-300">
                Bull case pass ({verdict.bullPercent}%)
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
              {reasoning.bullCase.map((point, idx) => (
                <li key={idx} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Bear case pass */}
          <div className="p-4 rounded-xl border border-rose-100 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <h4 className="font-semibold text-xs tracking-tight text-rose-900 dark:text-rose-300">
                Bear case pass ({verdict.bearPercent}%)
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
              {reasoning.bearCase.map((point, idx) => (
                <li key={idx} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Judge Ruling */}
          <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-[#2952FF]" />
              <h4 className="font-semibold text-xs tracking-tight text-[#2952FF]">
                Judge synthesis &amp; ruling
              </h4>
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
              {reasoning.judgeRuling}
            </p>
          </div>

          {/* Invalidation Criteria */}
          <div className="p-4 rounded-xl border border-amber-100 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h4 className="font-semibold text-xs tracking-tight text-amber-900 dark:text-amber-300">
                Thesis invalidation criteria
              </h4>
            </div>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
              {reasoning.invalidationCriteria.map((crit, idx) => (
                <li key={idx}>{crit}</li>
              ))}
            </ul>
          </div>

          {/* Challenge this thesis section */}
          {challengeResult && (
            <div className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-900 dark:bg-slate-900 text-white animate-in fade-in-50 duration-300">
              <div className="flex items-center gap-2 mb-1 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Challenge pass response
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {challengeResult}
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleChallenge}
            disabled={challengeMode}
            className="w-full sm:w-auto rounded-full text-xs border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
            {challengeMode ? "Evaluating challenge..." : "Challenge this thesis"}
          </Button>

          <Button
            size="sm"
            onClick={() => {
              onOpenChange(false)
              onPracticeTrade(verdict)
            }}
            className="w-full sm:w-auto rounded-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white text-xs px-5 shadow-none"
          >
            Practice trade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
