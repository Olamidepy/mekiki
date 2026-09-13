import * as React from "react"
import { WatchlistItem } from "@/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface WatchlistPanelProps {
  items: WatchlistItem[]
  onAddItem?: (item: WatchlistItem) => void
}

export function WatchlistPanel({ items, onAddItem }: WatchlistPanelProps) {
  const [addOpen, setAddOpen] = React.useState(false)
  const [newSymbol, setNewSymbol] = React.useState("")
  const [newName, setNewName] = React.useState("")

  const getTrendBadge = (item: WatchlistItem) => {
    return (
      <div className="flex flex-col items-end gap-0.5">
        {typeof item.price === "number" && (
          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
            ${item.price < 1 ? item.price.toFixed(4) : item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        )}
        <div className="flex items-center gap-1.5">
          {item.change24h !== undefined && (
            <span
              className={cn(
                "text-[10px] font-mono font-semibold",
                item.change24h >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              )}
            >
              {item.change24h >= 0 ? `+${item.change24h}%` : `${item.change24h}%`}
            </span>
          )}
          <span
            className={cn(
              "text-[10px] rounded-full px-1.5 py-0.5 font-semibold leading-none",
              item.trend === "up" && "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
              item.trend === "down" && "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
              item.trend !== "up" && item.trend !== "down" && "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            )}
          >
            {item.conviction} {item.trend === "up" ? "↑" : item.trend === "down" ? "↓" : "→"}
          </span>
        </div>
      </div>
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
    <Card id="watchlist">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">
          Watchlist
        </CardTitle>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-primary font-medium">
              + Add token
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[92vw] sm:max-w-sm p-4 sm:p-6 rounded-2xl max-h-[90vh] overflow-y-auto bg-background dark:bg-slate-950 border-slate-200 dark:border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-slate-900 dark:text-white">
                Add token to watchlist
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                Mekiki will track conviction score shifts and notify on threshold crossings.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddToken} className="space-y-3.5 pt-2">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Token symbol (e.g. INJ, NEAR, SUI)
                </label>
                <input
                  type="text"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  placeholder="INJ"
                  className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 bg-background dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl text-sm font-semibold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#2952FF]"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Injective"
                  className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 bg-background dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2952FF]"
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
                  className="w-full rounded-full text-xs border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <div className="space-y-3.5">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white block">
                    {item.symbol}
                  </span>
                  {item.network && (
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700">
                      {item.network}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground font-normal">
                  {item.name}
                </span>
              </div>
              {getTrendBadge(item)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
