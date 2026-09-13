// Live crypto market data fetcher (Public APIs: Binance & Alternative.me)

export interface LiveTicker {
  symbol: string
  pair: string
  price: number
  change24h: number
  high24h: number
  low24h: number
  volume24h: number
}

export interface LiveFearAndGreed {
  value: number
  classification: string
}

// Map common symbols to Binance USDT pairs
const SYMBOL_MAP: Record<string, string> = {
  BTC: "BTCUSDT",
  ETH: "ETHUSDT",
  SOL: "SOLUSDT",
  SUI: "SUIUSDT",
  AERO: "AEROUSDT",
  BRETT: "BRETTUSDT",
  TON: "TONUSDT",
  ARB: "ARBUSDT",
  HYPE: "HYPEUSDT",
  INJ: "INJUSDT",
  AVAX: "AVAXUSDT",
  NEAR: "NEARUSDT",
  DOGE: "DOGEUSDT",
  PEPE: "PEPEUSDT",
  RENDER: "RENDERUSDT",
}

export async function fetchLiveTicker(symbol: string): Promise<LiveTicker | null> {
  const cleanSymbol = symbol.toUpperCase().replace("/USDT", "").replace("USDT", "").trim()
  const pair = SYMBOL_MAP[cleanSymbol] || `${cleanSymbol}USDT`

  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`, {
      next: { revalidate: 15 },
      signal: AbortSignal.timeout(1500),
    })

    if (!res.ok) {
      throw new Error(`Binance API returned ${res.status}`)
    }

    const data = await res.json()
    return {
      symbol: cleanSymbol,
      pair: `${cleanSymbol} / USDT`,
      price: parseFloat(data.lastPrice),
      change24h: parseFloat(data.priceChangePercent),
      high24h: parseFloat(data.highPrice),
      low24h: parseFloat(data.lowPrice),
      volume24h: parseFloat(data.quoteVolume),
    }
  } catch (error) {
    console.warn(`Fallback for ${symbol}:`, error)
    // Safe mock fallback if external exchange API is unreachable
    const defaultPrices: Record<string, number> = {
      BTC: 64250,
      ETH: 3450,
      SOL: 188.5,
      SUI: 1.84,
      AERO: 1.18,
      BRETT: 0.088,
      TON: 5.35,
      ARB: 0.64,
      HYPE: 24.50,
      INJ: 24.5,
      AVAX: 28.6,
      RENDER: 6.84,
    }
    const basePrice = defaultPrices[cleanSymbol] || 10.0
    return {
      symbol: cleanSymbol,
      pair: `${cleanSymbol} / USDT`,
      price: basePrice,
      change24h: 3.4,
      high24h: Number((basePrice * 1.05).toFixed(basePrice < 1 ? 4 : 2)),
      low24h: Number((basePrice * 0.96).toFixed(basePrice < 1 ? 4 : 2)),
      volume24h: 125000000,
    }
  }
}

export async function fetchFearAndGreed(): Promise<LiveFearAndGreed> {
  try {
    const res = await fetch("https://api.alternative.me/fng/?limit=1", {
      next: { revalidate: 300 },
    })
    const data = await res.json()
    if (data?.data?.[0]) {
      return {
        value: parseInt(data.data[0].value, 10),
        classification: data.data[0].value_classification,
      }
    }
  } catch (err) {
    console.warn("Failed to fetch Fear & Greed, using fallback:", err)
  }

  return {
    value: 64,
    classification: "Greed",
  }
}

export async function fetchTopMarketMovers(): Promise<LiveTicker[]> {
  const tracked = ["SOL", "AERO", "TON", "ARB", "HYPE", "SUI", "BTC", "ETH"]
  const results = await Promise.all(tracked.map((s) => fetchLiveTicker(s)))
  return results.filter((t): t is LiveTicker => t !== null)
}
