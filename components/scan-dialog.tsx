"use client"

import * as React from "react"
import { ScanCandidate } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowRight } from "lucide-react"

interface ScanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  candidates: ScanCandidate[]
  onSelectCandidate: (symbol: string) => void
}

export function ScanDialog({
  open,
  onOpenChange,
  candidates,
  onSelectCandidate,
}: ScanDialogProps) {
  const [scanning, setScanning] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setScanning(true)
      const timer = setTimeout(() => {
        setScanning(false)
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92vw] max-w-xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-base sm:text-lg font-semibold tracking-tight">
            Market discovery scan
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Powered by Mekiki <code className="bg-muted px-1 py-0.5 rounded font-mono text-[11px] sm:text-xs">scan_market</code> &amp; sentiment divergence detectors.
          </DialogDescription>
        </DialogHeader>

        {scanning ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#2952FF] animate-spin" />
            <p className="text-sm font-semibold text-slate-800">
              Evaluating 148 pairs across volume, sentiment &amp; breadth...
            </p>
            <p className="text-xs text-slate-400">
              Running bull/bear filter passes via Mekiki Agent Engine
            </p>
          </div>
        ) : (
          <div className="space-y-3 my-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Top 3 candidate setups
            </p>
            {candidates.map((cand) => (
              <div
                key={cand.symbol}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#2952FF]/50 transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-slate-900">
                      {cand.symbol}
                    </span>
                    <span className="text-xs text-slate-400">{cand.name}</span>
                    {cand.network && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                        {cand.network}
                      </span>
                    )}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      {cand.stance}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-slate-400">Score</span>{" "}
                    <span className="text-base font-extrabold text-[#2952FF]">
                      {cand.score}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {cand.rationale}
                </p>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-100">
                  <span>Catalyst: <b className="text-slate-700 font-medium">{cand.catalyst}</b></span>
                  <button
                    onClick={() => {
                      onOpenChange(false)
                      onSelectCandidate(cand.symbol)
                    }}
                    className="text-[#2952FF] font-semibold hover:underline flex items-center gap-1"
                  >
                    View thesis
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="rounded-full text-xs"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
