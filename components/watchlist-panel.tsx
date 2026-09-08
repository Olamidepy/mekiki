"use client"

import * as React from "react"
import { WatchlistItem } from "@/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Plus } from "lucide-react"

interface WatchlistPanelProps {
  items: WatchlistItem[]
  onAddItem?: (item: WatchlistItem) => void
}

export function WatchlistPanel({ items, onAddItem }: WatchlistPanelProps) {
  const [addOpen, setAddOpen] = React.useState(false)
  const [newSymbol, setNewSymbol] = React.useState("")
  const [newName, setNewName] = React.useState("")

  const getTrendBadge = (item: WatchlistItem) => {
    if (item.trend === "up") {
      return (
        <span className="text-xs rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 font-semibold">
          {item.conviction} ↑
        </span>
      )
    }
    if (item.trend === "down") {
      return (
        <span className="text-xs rounded-full bg-rose-50 text-rose-700 px-2.5 py-1 font-semibold">
          {item.conviction} ↓
        </span>
      )
    }
    return (
      <span className="text-xs rounded-full bg-slate-100 text-slate-600 px-2.5 py-1 font-medium">
        {item.conviction} →
      </span>
    )
  }

  const handleAddToken = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSymbol.trim()) return

    const newItem: WatchlistItem = {
      id: `w-${Date.now()}`,
      symbol: newSymbol.toUpperCase().trim(),
      name: newName.trim() || newSymbol.toUpperCase().trim(),
      conviction: Math.floor(Math.random() * 25) + 60,
      trend: "up",
      stance: "Long",
      change24h: 3.2,
      price: 24.50,
    }

    onAddItem?.(newItem)
    setNewSymbol("")
    setNewName("")
    setAddOpen(false)
  }

  return (
    <Card id="watchlist" className="rounded-2xl border border-slate-200 p-5 bg-white shadow-none">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-slate-500" />
          <h3 className="font-semibold text-[15px] tracking-tightish text-slate-900">
            Watchlist
          </h3>
        </div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <button className="text-sm text-[#2952FF] font-medium hover:underline flex items-center gap-0.5">
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-slate-900">
                Add token to watchlist
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Mekiki will track conviction score shifts and notify on threshold crossings.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddToken} className="space-y-3.5 pt-2">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Token symbol (e.g. INJ, NEAR, SUI)
                </label>
                <input
                  type="text"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  placeholder="INJ"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-semibold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#2952FF]"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Injective"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2952FF]"
                />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white rounded-full text-xs font-medium py-2.5"
                >
                  Track in watchlist
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddOpen(false)}
                  className="w-full rounded-full text-xs"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-900 block">
                {item.symbol}
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                {item.name}
              </span>
            </div>
            {getTrendBadge(item)}
          </div>
        ))}
      </div>
    </Card>
  )
}
