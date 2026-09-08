"use client"

import * as React from "react"
import { Verdict, JournalEntry } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, DollarSign, Target, ShieldAlert } from "lucide-react"

interface PracticeTradeModalProps {
  verdict: Verdict | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onTradeLogged: (newEntry: JournalEntry) => void
}

export function PracticeTradeModal({
  verdict,
  open,
  onOpenChange,
  onTradeLogged,
}: PracticeTradeModalProps) {
  const [size, setSize] = React.useState("1000")
  const [success, setSuccess] = React.useState(false)

  if (!verdict) return null

  const entryPrice = verdict.price
  const isLong = verdict.stance === "Long"
  const takeProfit = isLong ? (entryPrice * 1.08).toFixed(2) : (entryPrice * 0.92).toFixed(2)
  const stopLoss = isLong ? (entryPrice * 0.96).toFixed(2) : (entryPrice * 1.04).toFixed(2)

  const handleExecute = () => {
    setSuccess(true)
    const newEntry: JournalEntry = {
      id: `j-live-${Date.now()}`,
      symbol: verdict.symbol,
      name: verdict.name,
      call: verdict.stance,
      timestamp: new Date().toISOString(),
      timeAgo: `${verdict.stance}, just now`,
      conviction: verdict.conviction,
      entryPrice: entryPrice,
      currentPrice: entryPrice,
      outcomePercent: 0.0,
      outcomeStatus: "flat",
      notes: `Practice trade logged with size $${size} USDT. TP: $${takeProfit}, SL: $${stopLoss}`,
    }

    setTimeout(() => {
      onTradeLogged(newEntry)
      setSuccess(false)
      onOpenChange(false)
    }, 900)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="text-left">
          <div className="flex items-center justify-between pr-4">
            <DialogTitle className="text-base font-bold text-slate-900">
              Practice trade simulation
            </DialogTitle>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
              Simulated paper trade
            </span>
          </div>
          <DialogDescription className="text-xs text-slate-500">
            Trades are logged to your internal decision journal without using real funds.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Pair info banner */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="text-xs text-slate-500">Token &amp; Entry</p>
              <p className="text-sm font-bold text-slate-900">{verdict.pair}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Market price</p>
              <p className="text-sm font-bold text-slate-900">${entryPrice.toLocaleString()}</p>
            </div>
          </div>

          {/* Position size input */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1.5">
              Simulated size (USDT)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2952FF]"
                placeholder="1000"
              />
            </div>
          </div>

          {/* TP and SL Targets */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-1">
                <Target className="w-3.5 h-3.5" />
                Target TP (+8%)
              </div>
              <p className="text-sm font-bold text-slate-900">${takeProfit}</p>
            </div>

            <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
              <div className="flex items-center gap-1.5 text-rose-700 font-semibold mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Stop loss (-4%)
              </div>
              <p className="text-sm font-bold text-slate-900">${stopLoss}</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
            Conviction of <b className="text-slate-800">{verdict.conviction}/100</b> suggests favorable asymmetric positioning based on multi-pass evidence.
          </div>
        </div>

        {/* Action button */}
        <div className="flex flex-col gap-2 mt-2">
          <Button
            onClick={handleExecute}
            disabled={success}
            className="w-full rounded-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white font-medium shadow-none py-2.5"
          >
            {success ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                Practice trade recorded in journal!
              </span>
            ) : (
              `Log practice trade for ${verdict.symbol}`
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-full border-slate-300 text-xs"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
