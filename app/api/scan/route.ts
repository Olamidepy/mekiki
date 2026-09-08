import { NextResponse } from "next/server"
import { fetchTopMarketMovers, fetchFearAndGreed } from "@/lib/agent/market-data"

export async function GET() {
  try {
    const [movers, fng] = await Promise.all([
      fetchTopMarketMovers(),
      fetchFearAndGreed(),
    ])

    return NextResponse.json({
      ok: true,
      data: {
        movers,
        fearAndGreed: fng,
        btcDominance: 54.8,
        breadth: "expanding",
        volatility: "normal",
        regime: "Selective Alt Liquidity Rotation",
        sentimentTag: "Mild Risk-On Divergence",
      },
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Failed to fetch market scan", details: String(err) },
      { status: 500 }
    )
  }
}
