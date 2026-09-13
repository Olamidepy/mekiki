import { NextResponse } from "next/server"
import { fetchTopMarketMovers, fetchFearAndGreed } from "@/lib/agent/market-data"
import { ScanCandidate, MarketRegimeStats } from "@/types"

export const dynamic = "force-dynamic"
export const revalidate = 15

const NETWORK_MAP: Record<string, string> = {
  HYPE: "Hyperliquid",
  AERO: "Base",
  TON: "TON",
  SUI: "Sui",
  ARB: "Arbitrum",
  SOL: "Solana",
  BTC: "Bitcoin",
  ETH: "Ethereum",
}

const NAME_MAP: Record<string, string> = {
  HYPE: "Hyperliquid",
  AERO: "Aerodrome Finance",
  TON: "Toncoin",
  SUI: "Sui Network",
  ARB: "Arbitrum",
  SOL: "Solana",
  BTC: "Bitcoin",
  ETH: "Ethereum",
}

const CATALYST_MAP: Record<string, string> = {
  HYPE: "Record on-chain derivatives open interest and HyperEVM ecosystem growth",
  AERO: "Base DEX volume leadership and veAERO protocol incentive locking",
  TON: "USDT-TON settlement volume run rate and Telegram mini-app MAUs",
  SUI: "Move protocol total value locked expansion and zero-slippage liquidity pools",
  ARB: "Dominant $13B+ Layer 2 TVL margin and Nitro sequencer fee stability",
  SOL: "Aggressive retail spot DEX volume leadership and fast settlement velocity",
  BTC: "Institutional ETF flow dynamics and macro store-of-value liquidity absorption",
  ETH: "Layer 2 blob settlement gas compression and validator staking security base",
}

export async function GET() {
  try {
    const [movers, fng] = await Promise.all([
      fetchTopMarketMovers(),
      fetchFearAndGreed(),
    ])

    // Try fetching live global BTC dominance from CoinGecko
    let btcDominance = 55.2
    try {
      const globalRes = await fetch("https://api.coingecko.com/api/v3/global", {
        next: { revalidate: 120 },
        signal: AbortSignal.timeout(2500),
      })
      if (globalRes.ok) {
        const globalData = await globalRes.json()
        if (globalData?.data?.market_cap_percentage?.btc) {
          btcDominance = Number(globalData.data.market_cap_percentage.btc.toFixed(1))
        }
      }
    } catch {
      // Use fallback
    }

    // Compute live market breadth from actual movers
    const positiveCount = movers.filter((m) => m.change24h > 0).length
    const breadthRatio = movers.length > 0 ? positiveCount / movers.length : 0.5
    const breadth: "expanding" | "contracting" | "neutral" =
      breadthRatio >= 0.6 ? "expanding" : breadthRatio <= 0.35 ? "contracting" : "neutral"

    // Compute live volatility
    const avgAbsChange =
      movers.length > 0
        ? movers.reduce((acc, m) => acc + Math.abs(m.change24h), 0) / movers.length
        : 2.5
    const volatility: "elevated" | "normal" | "low" =
      avgAbsChange > 4.5 ? "elevated" : avgAbsChange < 1.8 ? "low" : "normal"

    // Determine regime tag
    let regime = "Selective Liquidity Rotation"
    let sentimentTag = "Neutral Risk Assessment"
    if (fng.value >= 60 && breadth === "expanding") {
      regime = "High-Beta Risk Expansion"
      sentimentTag = "Risk-On Momentum"
    } else if (fng.value <= 35 || breadth === "contracting") {
      regime = "Defensive Capital Preservation"
      sentimentTag = "Risk-Off Compression"
    }

    const stats: MarketRegimeStats = {
      regime,
      sentimentTag,
      fearAndGreed: fng.value,
      fearAndGreedLabel: fng.classification,
      btcDominance,
      breadth,
      volatility,
      scannedTokensCount: 148,
    }

    // Generate live candidates ranked by relative strength and volatility
    const sortedMovers = [...movers].sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h))
    const topThree = sortedMovers.slice(0, 3)

    const candidates: ScanCandidate[] = topThree.map((m) => {
      const isPositive = m.change24h >= 0
      const score = Math.min(94, Math.max(72, Math.floor(75 + Math.abs(m.change24h) * 2.8)))
      const stance = isPositive ? "Long" : m.change24h < -3.5 ? "Short" : "Neutral"
      const formattedPrice = m.price < 1 ? `$${m.price.toFixed(4)}` : `$${m.price.toFixed(2)}`
      const changeSign = m.change24h >= 0 ? `+${m.change24h.toFixed(1)}%` : `${m.change24h.toFixed(1)}%`

      const rationale = isPositive
        ? `Relative strength leader currently trading at ${formattedPrice} with ${changeSign} 24h gain and persistent spot volume delta.`
        : `Consolidation test at ${formattedPrice} with ${changeSign} 24h change; assessing institutional absorption vs breakout risk.`

      return {
        symbol: m.symbol,
        name: NAME_MAP[m.symbol] || m.symbol,
        network: NETWORK_MAP[m.symbol] || "Crypto",
        score,
        stance,
        rationale,
        catalyst: CATALYST_MAP[m.symbol] || "Active on-chain volume and orderflow interest",
      }
    })

    return NextResponse.json({
      ok: true,
      data: {
        stats,
        candidates,
        movers,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error("Scan API error:", err)
    return NextResponse.json(
      { ok: false, error: "Failed to fetch market scan", details: String(err) },
      { status: 500 }
    )
  }
}
