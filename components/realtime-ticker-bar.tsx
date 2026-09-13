"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TokenPrice {
  symbol: string
  name: string
  network: string
  price: number
  change24h: number
  high24h?: number
  low24h?: number
}

const DEFAULT_TICKERS: TokenPrice[] = [
  { symbol: "SOL", name: "Solana", network: "Solana", price: 100.15, change24h: -1.68 },
  { symbol: "HYPE", name: "Hyperliquid", network: "Hyperliquid", price: 77.92, change24h: -1.85 },
  { symbol: "AERO", name: "Aerodrome", network: "Base", price: 0.56, change24h: -2.95 },
  { symbol: "TON", name: "Toncoin", network: "TON", price: 1.35, change24h: -1.74 },
  { symbol: "SUI", name: "Sui", network: "Sui", price: 0.71, change24h: -2.31 },
  { symbol: "ARB", name: "Arbitrum", network: "Arbitrum", price: 0.1365, change24h: -4.91 },
  { symbol: "BTC", name: "Bitcoin", network: "Bitcoin", price: 76842, change24h: -0.66 },
  { symbol: "ETH", name: "Ethereum", network: "Ethereum", price: 2495.76, change24h: -1.48 },
]

export function RealtimeTickerBar() {
  const [tickers, setTickers] = React.useState<TokenPrice[]>(DEFAULT_TICKERS)
  const [source, setSource] = React.useState<string>("coingecko")
  const [lastUpdated, setLastUpdated] = React.useState<string>("Just now")

  const fetchPrices = React.useCallback(async () => {
    try {
      const res = await fetch("/api/prices", { cache: "no-store" })
      if (!res.ok) return
      const data = await res.json()
      if (data.ok && data.prices) {
        setSource(data.source || "coingecko")
        setTickers((prev) =>
          prev.map((t) => {
            const live = data.prices[t.symbol]
            if (live && typeof live.price === "number") {
              return {
                ...t,
                price: live.price,
                change24h: live.change24h,
                high24h: live.high24h,
                low24h: live.low24h,
              }
            }
            return t
          })
        )
        setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }))
      }
    } catch (err) {
      console.warn("Price ticker update warning:", err)
    }
  }, [])

  React.useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 15000)
    return () => clearInterval(interval)
  }, [fetchPrices])

  return (
    <div className="w-full border-b border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4 overflow-hidden">
        {/* Source Badge */}
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-slate-200 dark:border-slate-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
            CoinGecko Live
          </span>
        </div>

        {/* Scrolling Tickers */}
        <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth py-0.5 w-full">
          {tickers.map((t) => {
            const isPositive = t.change24h >= 0
            const formattedPrice =
              t.price < 1
                ? `$${t.price.toFixed(4)}`
                : `$${t.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

            return (
              <div
                key={t.symbol}
                className="flex items-center gap-1.5 sm:gap-2 shrink-0 text-xs font-mono select-none"
              >
                <span className="font-bold text-slate-900 dark:text-white">
                  {t.symbol}
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">
                  {formattedPrice}
                </span>
                <span
                  className={cn(
                    "text-[10px] sm:text-[11px] font-semibold px-1 rounded",
                    isPositive
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50"
                      : "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50"
                  )}
                >
                  {isPositive ? `+${t.change24h}%` : `${t.change24h}%`}
                </span>
              </div>
            )
          })}
        </div>

        {/* Last synced timestamp */}
        <div className="hidden lg:flex items-center gap-1 shrink-0 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          <span>Synced:</span>
          <span>{lastUpdated}</span>
        </div>
      </div>
    </div>
  )
}
