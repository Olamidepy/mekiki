"use client"

import * as React from "react"
import { Play, Pause } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Verdict } from "@/types"
import { cn } from "@/lib/utils"

export interface LiveSimulationSignal {
  id: string
  timestamp: string
  symbol: string
  name: string
  network: "Base" | "Solana" | "TON" | "Hyperliquid" | "Sui" | "Arbitrum"
  stance: "Long" | "Short" | "Neutral"
  conviction: number
  price: number
  priceChange: number
  signalType: string
  catalyst: string
  bullEvidence: string
  bearFalsification: string
  judgeSynthesis: string
  timeAgo: string
}

const INITIAL_SIGNALS: LiveSimulationSignal[] = [
  {
    id: "sig-1",
    timestamp: new Date().toLocaleTimeString(),
    symbol: "HYPE",
    name: "Hyperliquid",
    network: "Hyperliquid",
    stance: "Long",
    conviction: 88,
    price: 24.62,
    priceChange: 11.4,
    signalType: "Orderbook CVD Absorption",
    catalyst: "Perp volume ATH with massive bid depth stack at $24.40",
    bullEvidence: "Aggressive taker sell orders absorbed by passive institutional bids.",
    bearFalsification: "High open interest expansion increases 1H flush vulnerability.",
    judgeSynthesis: "High-conviction Long. Structural invalidation anchored below $23.20.",
    timeAgo: "Just now",
  },
  {
    id: "sig-2",
    timestamp: new Date(Date.now() - 6000).toLocaleTimeString(),
    symbol: "AERO",
    name: "Aerodrome",
    network: "Base",
    stance: "Long",
    conviction: 82,
    price: 1.19,
    priceChange: 6.8,
    signalType: "Base DEX Velocity Spike",
    catalyst: "veAERO voting incentives exceed $4.2M with record swap volume",
    bullEvidence: "Spot accumulation delta breaks 3-day high with negative funding.",
    bearFalsification: "Weekly emission cliff approaching in 48 hours.",
    judgeSynthesis: "Favorable asymmetric Long. Invalidation set strictly at $1.08.",
    timeAgo: "6s ago",
  },
  {
    id: "sig-3",
    timestamp: new Date(Date.now() - 14000).toLocaleTimeString(),
    symbol: "TON",
    name: "Toncoin",
    network: "TON",
    stance: "Long",
    conviction: 75,
    price: 5.38,
    priceChange: 4.1,
    signalType: "Mini-App Settlement Surge",
    catalyst: "USDT-TON on-chain velocity crosses $1.2B monthly volume run rate",
    bullEvidence: "Daily active custodial wallet addresses reach fresh all-time high.",
    bearFalsification: "Testing upper boundary of multi-week channel at $5.60.",
    judgeSynthesis: "Moderate Long conviction. Asymmetry favors scaling on 15m pullbacks.",
    timeAgo: "14s ago",
  },
  {
    id: "sig-4",
    timestamp: new Date(Date.now() - 25000).toLocaleTimeString(),
    symbol: "SUI",
    name: "Sui Network",
    network: "Sui",
    stance: "Long",
    conviction: 79,
    price: 1.86,
    priceChange: 8.9,
    signalType: "Move TVL Multi-Week Breakout",
    catalyst: "DeFi protocols on Sui cross $1.1B total locked capital",
    bullEvidence: "Clean structural breakout above 4H accumulation range.",
    bearFalsification: "1H RSI at 73 showing short-term momentum extension.",
    judgeSynthesis: "Long stance valid. Re-tests of $1.76 provide 2.4:1 R:R setup.",
    timeAgo: "25s ago",
  },
  {
    id: "sig-5",
    timestamp: new Date(Date.now() - 38000).toLocaleTimeString(),
    symbol: "ARB",
    name: "Arbitrum",
    network: "Arbitrum",
    stance: "Neutral",
    conviction: 62,
    price: 0.645,
    priceChange: 1.4,
    signalType: "Sequencer Fee Compression",
    catalyst: "Nitro execution gas savings maintain stable network margin",
    bullEvidence: "Dominant $13B+ Layer 2 total value locked with zero downtime.",
    bearFalsification: "Supply unlock schedule caps near-term upward breakout velocity.",
    judgeSynthesis: "Consensus neutral. Wait for confirmed daily close above $0.72.",
    timeAgo: "38s ago",
  },
  {
    id: "sig-6",
    timestamp: new Date(Date.now() - 52000).toLocaleTimeString(),
    symbol: "SOL",
    name: "Solana",
    network: "Solana",
    stance: "Long",
    conviction: 84,
    price: 154.80,
    priceChange: 5.6,
    signalType: "Spot DEX Volume Outperformance",
    catalyst: "Aggressive retail swap volume outpaces all other L1 networks",
    bullEvidence: "Funding rates flat with positive spot volume delta divergence.",
    bearFalsification: "Heavy liquidity block positioned directly overhead at $158.50.",
    judgeSynthesis: "High-conviction Long. Structural stop maintained at $146.80.",
    timeAgo: "52s ago",
  },
]

// Animated micro-sparkline component
function LiveSparkline({ points, isPositive }: { points: number[]; isPositive: boolean }) {
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const width = 120
  const height = 36

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width
    const y = height - ((p - min) / range) * (height - 8) - 4
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const pathStr = `M ${coords.join(" L ")}`
  const fillPath = `${pathStr} L ${width},${height} L 0comma${height} Z`.replace("0comma", "0,")

  return (
    <div className="relative w-[120px] h-[36px] shrink-0 overflow-hidden select-none">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={isPositive ? "greenGrad" : "roseGrad"} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity="0.25" />
            <stop offset="100%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill={`url(#${isPositive ? "greenGrad" : "roseGrad"})`} />
        <path
          d={pathStr}
          fill="none"
          stroke={isPositive ? "#059669" : "#e11d48"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
    </div>
  )
}

interface LiveSignalStreamProps {
  onPracticeTrade: (verdict: Verdict) => void
}

export function LiveSignalStream({ onPracticeTrade }: LiveSignalStreamProps) {
  const [signals, setSignals] = React.useState<LiveSimulationSignal[]>(INITIAL_SIGNALS)
  const [isLive, setIsLive] = React.useState(true)
  const [activeNetwork, setActiveNetwork] = React.useState<string>("all")

  const [tokenPrices, setTokenPrices] = React.useState<Record<string, { price: number; change24h: number }>>({
    HYPE: { price: 77.92, change24h: -1.85 },
    AERO: { price: 0.56, change24h: -2.95 },
    TON: { price: 1.35, change24h: -1.74 },
    SUI: { price: 0.71, change24h: -2.31 },
    ARB: { price: 0.1365, change24h: -4.91 },
    SOL: { price: 100.15, change24h: -1.68 },
  })

  const [sparklines, setSparklines] = React.useState<Record<string, number[]>>({
    HYPE: [76.5, 77.1, 76.8, 77.4, 77.92],
    AERO: [0.58, 0.57, 0.565, 0.56, 0.56],
    TON: [1.38, 1.37, 1.36, 1.355, 1.35],
    SUI: [0.73, 0.725, 0.72, 0.715, 0.71],
    ARB: [0.144, 0.141, 0.139, 0.137, 0.1365],
    SOL: [102.4, 101.8, 100.9, 100.5, 100.15],
  })

  // Fetch live CoinGecko prices
  React.useEffect(() => {
    const loadPrices = async () => {
      try {
        const res = await fetch("/api/prices", { cache: "no-store" })
        if (!res.ok) return
        const data = await res.json()
        if (data.ok && data.prices) {
          const updated: Record<string, { price: number; change24h: number }> = {}
          const newSpark: Record<string, number[]> = {}

          for (const sym of ["HYPE", "AERO", "TON", "SUI", "ARB", "SOL"]) {
            const pData = data.prices[sym]
            if (pData && typeof pData.price === "number") {
              updated[sym] = { price: pData.price, change24h: pData.change24h }
              const p = pData.price
              newSpark[sym] = [
                Number((p * 0.988).toFixed(p < 1 ? 4 : 2)),
                Number((p * 0.992).toFixed(p < 1 ? 4 : 2)),
                Number((p * 0.989).toFixed(p < 1 ? 4 : 2)),
                Number((p * 0.996).toFixed(p < 1 ? 4 : 2)),
                p,
              ]
            }
          }

          if (Object.keys(updated).length > 0) {
            setTokenPrices((prev) => ({ ...prev, ...updated }))
            setSparklines((prev) => ({ ...prev, ...newSpark }))
          }
        }
      } catch (err) {
        console.warn("Live signal stream prices warning:", err)
      }
    }

    loadPrices()
    const pInterval = setInterval(loadPrices, 15000)
    return () => clearInterval(pInterval)
  }, [])

  // Simulated live event generation
  React.useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const tokens: Array<LiveSimulationSignal["network"]> = [
        "Base",
        "Hyperliquid",
        "TON",
        "Sui",
        "Arbitrum",
        "Solana",
      ]
      const chosenNet = tokens[Math.floor(Math.random() * tokens.length)]

      const pool: Record<string, Partial<LiveSimulationSignal>> = {
        Base: {
          symbol: "AERO",
          name: "Aerodrome",
          network: "Base",
          stance: "Long",
          conviction: Math.floor(Math.random() * 10) + 75,
          signalType: "veAERO Bribe Flow Surge",
          catalyst: "Spot buyer absorption detected at 15m orderbook resistance shelf",
          bullEvidence: "Cumulative Volume Delta (CVD) divergence crosses +1.8σ threshold.",
          bearFalsification: "Token emission velocity requires steady TVL inflow.",
          judgeSynthesis: "78% Long bias. Strict structural stop maintained at $1.11.",
        },
        Hyperliquid: {
          symbol: "HYPE",
          name: "Hyperliquid",
          network: "Hyperliquid",
          stance: "Long",
          conviction: Math.floor(Math.random() * 8) + 82,
          signalType: "HyperEVM Liquidity Fill",
          catalyst: "High-frequency limit orderbook absorbs 85k contracts with zero slippage",
          bullEvidence: "Perps funding rate reset to negative while spot accumulation surges.",
          bearFalsification: "Rapid open interest expansion increases liquidation tail risk.",
          judgeSynthesis: "86% Long consensus. Asymmetric trade parameter qualified.",
        },
        TON: {
          symbol: "TON",
          name: "Toncoin",
          network: "TON",
          stance: "Long",
          conviction: Math.floor(Math.random() * 10) + 70,
          signalType: "Telegram Bot Session Spike",
          catalyst: "Micro-payment settlement rate accelerates 28% over 1-hour window",
          bullEvidence: "Sustained non-custodial wallet balance grinds higher across holders.",
          bearFalsification: "Channel boundary rejection at $5.55 resistance block.",
          judgeSynthesis: "Long stance favored. Look for confirmation above $5.42.",
        },
        Sui: {
          symbol: "SUI",
          name: "Sui Network",
          network: "Sui",
          stance: "Long",
          conviction: Math.floor(Math.random() * 12) + 72,
          signalType: "Move Protocol TVL Inflow",
          catalyst: "Lending pool utilization crosses 78% with zero bad debt liquidate events",
          bullEvidence: "Higher-high market structure print on 1-hour candle close.",
          bearFalsification: "1H momentum oscillators approaching temporary overbought band.",
          judgeSynthesis: "77% Long conviction. Scalp entries valid into $1.82 pullback.",
        },
        Arbitrum: {
          symbol: "ARB",
          name: "Arbitrum",
          network: "Arbitrum",
          stance: "Neutral",
          conviction: Math.floor(Math.random() * 10) + 58,
          signalType: "Sequencer Batch Gas Stability",
          catalyst: "Arbitrum Nitro batch post rate holds stable against Ethereum L1 fees",
          bullEvidence: "Deep decentralized derivatives open interest holding $1.8B.",
          bearFalsification: "Circulating supply float overhang creates overhead chop.",
          judgeSynthesis: "Consensus remains neutral. Capital preservation priority.",
        },
        Solana: {
          symbol: "SOL",
          name: "Solana",
          network: "Solana",
          stance: "Long",
          conviction: Math.floor(Math.random() * 10) + 78,
          signalType: "Spot DEX Taker Inflow",
          catalyst: "Aggressive taker buy volume spikes +$34M across decentralized AMMs",
          bullEvidence: "Spot bid depth outweighs asks by 1.6x on key centralized venues.",
          bearFalsification: "Overhead 4H fair value gap resistance at $158.20.",
          judgeSynthesis: "High-conviction Long. Tight invalidation stop anchored at $148.40.",
        },
      }

      const selected = pool[chosenNet]
      if (!selected) return

      // Update sparkline with smooth random walk
      setSparklines((prev) => {
        const current = prev[selected.symbol!] || [10, 10.2, 10.1, 10.4, 10.3]
        const last = current[current.length - 1]
        const delta = (Math.random() - 0.45) * (last * 0.012)
        const nextVal = Number((last + delta).toFixed(last < 1 ? 4 : 2))
        const newArr = [...current.slice(1), nextVal]
        return { ...prev, [selected.symbol!]: newArr }
      })

      const currentPrice =
        tokenPrices[selected.symbol!]?.price ??
        (selected.symbol === "ARB" ? 0.1365 : selected.symbol === "AERO" ? 0.56 : selected.symbol === "TON" ? 1.35 : selected.symbol === "SUI" ? 0.71 : selected.symbol === "HYPE" ? 77.92 : 100.15)
      const currentChange = tokenPrices[selected.symbol!]?.change24h ?? Number(((Math.random() * 4) - 2).toFixed(1))

      const newSig: LiveSimulationSignal = {
        id: `sig-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        symbol: selected.symbol!,
        name: selected.name!,
        network: selected.network as any,
        stance: selected.stance as any,
        conviction: selected.conviction!,
        price: currentPrice,
        priceChange: currentChange,
        signalType: selected.signalType!,
        catalyst: selected.catalyst!,
        bullEvidence: selected.bullEvidence!,
        bearFalsification: selected.bearFalsification!,
        judgeSynthesis: selected.judgeSynthesis!,
        timeAgo: "Just now",
      }

      setSignals((prev) => [newSig, ...prev.slice(0, 11)])
    }, 3800)

    return () => clearInterval(interval)
  }, [isLive, tokenPrices])

  const filteredSignals = React.useMemo(() => {
    if (activeNetwork === "all") return signals
    return signals.filter((s) => s.network.toLowerCase() === activeNetwork.toLowerCase())
  }, [signals, activeNetwork])

  const networks = ["all", "Base", "Solana", "TON", "Hyperliquid", "Sui", "Arbitrum"]

  const handleExecuteSignal = (sig: LiveSimulationSignal) => {
    const syntheticVerdict: Verdict = {
      id: `v-${sig.symbol.toLowerCase()}-${Date.now()}`,
      symbol: sig.symbol,
      name: sig.name,
      network: sig.network,
      pair: `${sig.symbol} / USDT`,
      stance: sig.stance,
      conviction: sig.conviction,
      bullPercent: sig.stance === "Long" ? sig.conviction : 35,
      bearPercent: sig.stance === "Long" ? 100 - sig.conviction : 65,
      price: sig.price,
      change24h: sig.priceChange,
      volume24h: "$350M",
      evidence: [
        { id: "e-live-1", label: sig.signalType, tone: "positive", category: "momentum" },
        { id: "e-live-2", label: "Live Dialectic Pass", tone: "positive", category: "onchain" },
        { id: "e-live-3", label: "Real-time Telemetry", tone: "neutral", category: "volatility" },
      ],
      reasoning: {
        bullCase: [sig.bullEvidence, "Spot Cumulative Volume Delta confirms persistent accumulator interest."],
        bearCase: [sig.bearFalsification, "Macro liquidity sensitivity requires strict structural invalidation compliance."],
        judgeRuling: sig.judgeSynthesis,
        invalidationCriteria: [
          `Structural failure breach below $${(sig.price * 0.958).toFixed(sig.price < 1 ? 4 : 2)}`,
          "Persistent aggressive sell delta flipping negative for 2 consecutive 15m bars",
        ],
        ryoToolsUsed: ["analyze_token", "deep_analysis", "monitor_market_sentiment_shift"],
      },
    }

    onPracticeTrade(syntheticVerdict)
  }

  return (
    <section id="signals" className="mb-24 md:mb-36">
      {/* Section Header matching standard verdict-grid styling */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-6 md:mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Real-time simulation stream
            </h2>
            <Badge variant="outline" className="hidden sm:inline-flex text-[11px] font-semibold border-emerald-500/40 text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40 items-center gap-1.5 py-0.5 px-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              CoinGecko Live
            </Badge>
          </div>
          <div className="w-12 sm:w-14 h-1 bg-[#2952FF] rounded-full mt-2 mb-2" />
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl font-normal">
            Adversarial multi-agent telemetry streaming in motion. Live micro-orderflow, CVD absorption, and structural catalysts across ecosystems.
          </p>
        </div>

        {/* Standard shadcn button for pause/resume stream with no style overrides */}
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? (
              <>
                <Pause className="w-3.5 h-3.5 mr-2 text-amber-600 dark:text-amber-400" />
                <span>Pause stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 mr-2 text-emerald-600 dark:text-emerald-400" />
                <span>Resume stream</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Ecosystem Filter Pills matching verdict-grid exact standard */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
        <div className="inline-flex rounded-full bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200/80 dark:border-slate-800 text-xs">
          {networks.map((f) => (
            <button
              key={f}
              onClick={() => setActiveNetwork(f)}
              className={`rounded-full px-3 sm:px-4 py-1 sm:py-1.5 font-medium transition-all text-xs ${
                activeNetwork === f
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {f === "all" ? "All Ecosystems" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Live Token Sparkline Grid (In Motion with Real CoinGecko Prices) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
        {[
          { symbol: "HYPE", name: "Hyperliquid", net: "Hyperliquid" },
          { symbol: "AERO", name: "Aerodrome", net: "Base" },
          { symbol: "TON", name: "Toncoin", net: "TON" },
          { symbol: "SUI", name: "Sui Network", net: "Sui" },
          { symbol: "ARB", name: "Arbitrum", net: "Arbitrum" },
          { symbol: "SOL", name: "Solana", net: "Solana" },
        ].map((tk) => {
          const priceObj = tokenPrices[tk.symbol]
          const price = priceObj?.price ?? (tk.symbol === "HYPE" ? 77.92 : tk.symbol === "SOL" ? 100.15 : 1.0)
          const change = priceObj?.change24h ?? 0
          const isUp = change >= 0
          const points = sparklines[tk.symbol] || [price * 0.985, price * 0.99, price * 0.995, price]
          const isLatestLong = (points[points.length - 1] ?? 0) >= (points[points.length - 2] ?? 0)

          return (
            <Card
              key={tk.symbol}
              className="p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
                    {tk.symbol}
                  </span>
                  <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0">
                    {tk.net}
                  </Badge>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                    ${price < 1 ? price.toFixed(4) : price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-semibold font-mono",
                      isUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                    )}
                  >
                    {isUp ? `+${change}%` : `${change}%`}
                  </span>
                </div>
              </div>

              {/* In-motion real-time SVG waveform */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <LiveSparkline points={points} isPositive={isLatestLong} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Main Signal Feed Card (Pure Standard Shadcn Card) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold">
              Live Synthesis Feed
            </CardTitle>
            <Badge variant="secondary" className="text-xs font-normal">
              {filteredSignals.length} Active Events
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Consensus Rate: 99.4%
          </span>
        </CardHeader>

        <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
          {filteredSignals.map((sig, idx) => (
            <div
              key={sig.id}
              className={cn(
                "p-4 sm:p-5 transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4",
                idx === 0 && "bg-slate-50/40 dark:bg-slate-900/40"
              )}
            >
              {/* Left Column: Asset, Network, Stance, and Type (No Flash/Zap Icon) */}
              <div className="space-y-1 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
                    {sig.symbol}
                  </span>
                  <span className="text-xs text-muted-foreground">{sig.name}</span>
                  <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0">
                    {sig.network}
                  </Badge>
                  <Badge
                    variant={sig.stance === "Long" ? "default" : sig.stance === "Short" ? "destructive" : "secondary"}
                    className="text-[10px] px-2 py-0.5"
                  >
                    {sig.stance} {sig.conviction}%
                  </Badge>
                </div>

                <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {sig.signalType}
                </div>
              </div>

              {/* Middle Column: Synthesis in Motion */}
              <div className="flex-1 space-y-1 text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
                <p className="font-medium text-slate-800 dark:text-slate-200 leading-snug">
                  {sig.catalyst}
                </p>
                <div className="grid sm:grid-cols-2 gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded border border-slate-100 dark:border-slate-800 flex items-start gap-1.5">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold shrink-0">Bull Pass:</span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{sig.bullEvidence}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded border border-slate-100 dark:border-slate-800 flex items-start gap-1.5">
                    <span className="text-rose-700 dark:text-rose-400 font-bold shrink-0">Bear Pass:</span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{sig.bearFalsification}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Standard Shadcn Button & Time (No button overrides) */}
              <div className="flex items-center md:flex-col md:items-end justify-between gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                <div className="text-right">
                  <span className="text-xs text-muted-foreground font-mono block">
                    {sig.timeAgo}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {sig.timestamp}
                  </span>
                </div>

                {/* Standard Shadcn Button with no custom override classes */}
                <Button
                  size="sm"
                  onClick={() => handleExecuteSignal(sig)}
                >
                  Simulate Trade
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
