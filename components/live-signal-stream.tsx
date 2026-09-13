"use client"

import * as React from "react"
import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Radio,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldAlert,
  Play,
  Pause,
  Maximize2,
  RefreshCw,
  Clock,
  Layers,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
    catalyst: "Perp volume ATH ($2.9B) with massive bid depth stack at $24.40",
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
            <stop offset="0%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity="0.35" />
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
  const [pulseCount, setPulseCount] = React.useState(1842)
  const [sparklines, setSparklines] = React.useState<Record<string, number[]>>({
    HYPE: [22.4, 22.8, 23.1, 23.9, 24.2, 24.62],
    AERO: [1.11, 1.13, 1.15, 1.14, 1.17, 1.19],
    TON: [5.21, 5.25, 5.30, 5.28, 5.34, 5.38],
    SUI: [1.71, 1.74, 1.78, 1.81, 1.83, 1.86],
    ARB: [0.63, 0.638, 0.642, 0.639, 0.644, 0.645],
    SOL: [147.2, 149.0, 151.2, 150.8, 153.4, 154.8],
  })

  // Simulated live event generation
  React.useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setPulseCount((prev) => prev + 1)

      // Random token selector for simulated tick
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

      const newSig: LiveSimulationSignal = {
        id: `sig-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        symbol: selected.symbol!,
        name: selected.name!,
        network: selected.network as any,
        stance: selected.stance as any,
        conviction: selected.conviction!,
        price: selected.symbol === "ARB" ? 0.648 : selected.symbol === "AERO" ? 1.19 : selected.symbol === "TON" ? 5.39 : selected.symbol === "SUI" ? 1.86 : selected.symbol === "HYPE" ? 24.68 : 154.9,
        priceChange: Number(((Math.random() * 6) + 2).toFixed(1)),
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
  }, [isLive])

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
    <section id="signals" className="my-20 sm:my-28 md:my-36">
      {/* Section Header with Generous Whitespace */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff3ff] border border-[#2952FF]/20 text-[#2952FF] text-xs font-semibold mb-3">
            <span className="relative flex h-2 w-2">
              <span className={cn(
                "absolute inline-flex h-full w-full rounded-full bg-[#2952FF] opacity-75",
                isLive && "animate-ping"
              )} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2952FF]" />
            </span>
            <span>Live Dialectic Signal Engine</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono text-[11px] text-slate-600 font-medium">
              Tick #{pulseCount.toLocaleString()}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Real-time simulation stream
          </h2>
          <div className="w-12 sm:w-14 h-1 bg-[#2952FF] rounded-full mt-2 mb-2" />
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal">
            Adversarial multi-agent telemetry streaming in motion. Watch Bull &amp; Bear agents evaluate micro-orderflow, CVD absorption, and structural catalysts across ecosystems live.
          </p>
        </div>

        {/* Stream Controls */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-mono text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>42ms latency</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className="rounded-full text-xs font-medium border-slate-200 h-8 px-3.5 flex items-center gap-1.5 hover:bg-slate-50"
          >
            {isLive ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                <span>Pause stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>Resume stream</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Ecosystem Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" />
          Filter:
        </span>
        {networks.map((net) => (
          <button
            key={net}
            onClick={() => setActiveNetwork(net)}
            className={cn(
              "shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all",
              activeNetwork === net
                ? "bg-[#2952FF] text-white border-[#2952FF] shadow-sm font-semibold"
                : "bg-white text-slate-600 border-slate-200/80 hover:border-slate-300 hover:text-slate-900"
            )}
          >
            {net === "all" ? "All Ecosystems" : net}
          </button>
        ))}
      </div>

      {/* Live Token Sparkline Grid (In Motion) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
        {[
          { symbol: "HYPE", name: "Hyperliquid", net: "Hyperliquid", price: 24.62, change: "+11.4%", isUp: true },
          { symbol: "AERO", name: "Aerodrome", net: "Base", price: 1.19, change: "+6.8%", isUp: true },
          { symbol: "TON", name: "Toncoin", net: "TON", price: 5.38, change: "+4.1%", isUp: true },
          { symbol: "SUI", name: "Sui Network", net: "Sui", price: 1.86, change: "+8.9%", isUp: true },
          { symbol: "ARB", name: "Arbitrum", net: "Arbitrum", price: 0.645, change: "+1.4%", isUp: true },
          { symbol: "SOL", name: "Solana", net: "Solana", price: 154.8, change: "+5.6%", isUp: true },
        ].map((tk) => {
          const points = sparklines[tk.symbol] || [10, 11, 10.5, 11.2, 11.8]
          const isLatestLong = (points[points.length - 1] ?? 0) >= (points[points.length - 2] ?? 0)

          return (
            <Card
              key={tk.symbol}
              className="p-3.5 bg-white border border-slate-200/90 rounded-2xl transition-all duration-300 hover:border-[#2952FF]/50 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-slate-900 tracking-tight">
                    {tk.symbol}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {tk.net}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-bold text-slate-900 font-mono">
                    ${tk.price < 1 ? tk.price.toFixed(3) : tk.price.toFixed(2)}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 font-mono">
                    {tk.change}
                  </span>
                </div>
              </div>

              {/* In-motion real-time SVG waveform */}
              <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                <LiveSparkline points={points} isPositive={isLatestLong} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Main Signal Feed Table / Cards (Shadcn Container) */}
      <Card className="border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm bg-white">
        <CardHeader className="bg-slate-50/70 px-4 sm:px-6 py-4 border-b border-slate-100 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className={cn("w-4 h-4 text-[#2952FF]", isLive && "animate-pulse")} />
            <CardTitle className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Live Synthesis Feed
            </CardTitle>
            <Badge variant="secondary" className="text-[10px] font-medium bg-slate-200/70 text-slate-700">
              {filteredSignals.length} Active Events
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="hidden sm:inline">Hegelian Consensus Rate:</span>
            <span className="text-[#2952FF] font-semibold">99.4% Falsification Pass</span>
          </div>
        </CardHeader>

        <CardContent className="p-0 divide-y divide-slate-100">
          {filteredSignals.map((sig, idx) => (
            <div
              key={sig.id}
              className={cn(
                "p-4 sm:p-5 transition-all duration-500 hover:bg-slate-50/80 flex flex-col md:flex-row md:items-center justify-between gap-4",
                idx === 0 && "bg-[#eff3ff]/30"
              )}
            >
              {/* Left Column: Asset, Network, Stance, and Type */}
              <div className="space-y-1.5 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-slate-900 tracking-tight">
                    {sig.symbol}
                  </span>
                  <span className="text-xs text-slate-400">{sig.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {sig.network}
                  </span>
                  <Badge
                    variant={sig.stance === "Long" ? "default" : sig.stance === "Short" ? "destructive" : "secondary"}
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5",
                      sig.stance === "Long" && "bg-emerald-600 text-white hover:bg-emerald-600"
                    )}
                  >
                    {sig.stance} {sig.conviction}%
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-[#2952FF]">
                  <Zap className="w-3 h-3 text-[#2952FF] shrink-0" />
                  <span>{sig.signalType}</span>
                </div>
              </div>

              {/* Middle Column: Dialectic Synthesis in Motion */}
              <div className="flex-1 space-y-1 text-xs text-slate-600 max-w-2xl">
                <p className="font-medium text-slate-800 leading-snug">
                  {sig.catalyst}
                </p>
                <div className="grid sm:grid-cols-2 gap-2 pt-1 text-[11px] text-slate-500">
                  <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100/60 flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold shrink-0">Bull Pass:</span>
                    <span className="text-slate-700 leading-relaxed">{sig.bullEvidence}</span>
                  </div>
                  <div className="bg-rose-50/60 p-2 rounded-lg border border-rose-100/60 flex items-start gap-1.5">
                    <span className="text-rose-700 font-bold shrink-0">Bear Pass:</span>
                    <span className="text-slate-700 leading-relaxed">{sig.bearFalsification}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Execution Action & Time */}
              <div className="flex items-center md:flex-col md:items-end justify-between gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-mono block">
                    {sig.timeAgo}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {sig.timestamp}
                  </span>
                </div>

                <Button
                  size="sm"
                  onClick={() => handleExecuteSignal(sig)}
                  className="rounded-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white text-xs font-semibold px-4 h-8 transition-all active:scale-[0.98] shadow-sm flex items-center gap-1"
                >
                  <span>Simulate Trade</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
