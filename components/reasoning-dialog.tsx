"use client"

import * as React from "react"
import { Verdict } from "@/types"
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
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-6">
        <DialogHeader className="text-left">
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-lg text-slate-900 tracking-tightish">
                {verdict.pair}
              </span>
              <span className="text-xs text-slate-400 font-normal">
                {verdict.name}
              </span>
              <span className={`rounded-full text-xs font-semibold px-2.5 py-0.5 ${
                verdict.stance === "Long"
                  ? "bg-emerald-50 text-emerald-700"
                  : verdict.stance === "Short"
                  ? "bg-rose-50 text-rose-700"
                  : "bg-slate-100 text-slate-700"
              }`}>
                {verdict.stance}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xl font-extrabold text-slate-900">
                {verdict.conviction}
              </span>
              <span className="text-xs text-slate-400 ml-1">/ 100</span>
            </div>
          </div>
          <DialogDescription className="text-xs text-slate-500 mt-1">
            Synthesized via RYO market intelligence tools · {verdict.timestamp}
          </DialogDescription>
        </DialogHeader>

        {/* Tools used pill row */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
          <span className="font-medium text-slate-500 block mb-1.5">
            RYO research tools called:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {verdict.reasoning.ryoToolsUsed.map((tool) => (
              <span
                key={tool}
                className="font-mono text-[11px] bg-white text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200"
              >
                {tool}()
              </span>
            ))}
          </div>
        </div>

        {/* Multi-pass reasoning trail */}
        <div className="space-y-4 text-sm mt-1">
          {/* Bull case pass */}
          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h4 className="font-semibold text-xs tracking-tight text-emerald-900">
                Bull case pass ({verdict.bullPercent}%)
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
              {verdict.reasoning.bullCase.map((point, idx) => (
                <li key={idx} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Bear case pass */}
          <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-rose-600" />
              <h4 className="font-semibold text-xs tracking-tight text-rose-900">
                Bear case pass ({verdict.bearPercent}%)
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
              {verdict.reasoning.bearCase.map((point, idx) => (
                <li key={idx} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Judge Ruling */}
          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-[#2952FF]" />
              <h4 className="font-semibold text-xs tracking-tight text-[#2952FF]">
                Judge synthesis &amp; ruling
              </h4>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed">
              {verdict.reasoning.judgeRuling}
            </p>
          </div>

          {/* Invalidation Criteria */}
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/40">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-xs tracking-tight text-amber-900">
                Thesis invalidation criteria
              </h4>
            </div>
            <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
              {verdict.reasoning.invalidationCriteria.map((crit, idx) => (
                <li key={idx}>{crit}</li>
              ))}
            </ul>
          </div>

          {/* Challenge this thesis section */}
          {challengeResult && (
            <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-900 text-white animate-in fade-in-50 duration-300">
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
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleChallenge}
            disabled={challengeMode}
            className="rounded-full text-xs border-slate-300"
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
            className="rounded-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white text-xs px-5 shadow-none"
          >
            Practice trade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
