import { Verdict, JournalEntry, WatchlistItem, MarketRegimeStats, ScanCandidate } from "@/types"

export const mockMarketStats: MarketRegimeStats = {
  regime: "Market regime",
  sentimentTag: "Risk-on",
  fearAndGreed: 64,
  fearAndGreedLabel: "Greed",
  btcDominance: 52.1,
  breadth: "expanding",
  volatility: "elevated",
  scannedTokensCount: 148,
}

export const mockVerdicts: Verdict[] = [
  {
    id: "verdict-sol",
    symbol: "SOL",
    name: "Solana",
    pair: "SOL / USDT",
    stance: "Long",
    conviction: 78,
    bullPercent: 72,
    bearPercent: 28,
    price: 154.20,
    change24h: 5.4,
    volume24h: "$3.4B",
    evidence: [
      { id: "e1", label: "Momentum ↑", tone: "positive", category: "momentum" },
      { id: "e2", label: "Sentiment ↑", tone: "positive", category: "sentiment" },
      { id: "e3", label: "Volatility ⚠", tone: "warning", category: "volatility" },
      { id: "e4", label: "DEX volume ATH", tone: "positive", category: "onchain" },
    ],
    reasoning: {
      ryoToolsUsed: ["analyze_token", "deep_analysis", "monitor_market_sentiment_shift"],
      bullCase: [
        "Spot DEX volume has outpaced peer L1 chains for 5 consecutive daily closes, showing aggressive organic flow.",
        "Sentiment shift monitor flags net positive social velocity divergence without corresponding retail leverage build-up.",
        "Funding rates remain healthy (+0.008%) indicating spot-led bid rather than speculative over-extension."
      ],
      bearCase: [
        "1-hour realized volatility remains elevated above the 30-day 90th percentile, increasing whip potential.",
        "Dense liquidity cluster located directly at $158.50 could present stiff resistance for short-term longs."
      ],
      judgeRuling: "Conviction stands at 78/100 for Long. The spot flow and on-chain velocity strongly outweigh resistance overhead. Asymmetry favors buying pullbacks into $148–$151 with a tight invalidation threshold.",
      invalidationCriteria: [
        "Daily close below 4-hour EMA-50 ($146.80)",
        "Sudden spike in aggregate Open Interest > 15% with flat price",
        "Overall market regime reversion to Risk-off triggered by BTC weakness"
      ]
    },
    timestamp: "18 mins ago"
  },
  {
    id: "verdict-eth",
    symbol: "ETH",
    name: "Ethereum",
    pair: "ETH / USDT",
    stance: "Long",
    conviction: 64,
    bullPercent: 61,
    bearPercent: 39,
    price: 3420.50,
    change24h: 2.1,
    volume24h: "$12.8B",
    evidence: [
      { id: "e5", label: "Breadth ↑", tone: "positive", category: "breadth" },
      { id: "e6", label: "RSI overbought", tone: "negative", category: "momentum" },
      { id: "e7", label: "L2 fee surge", tone: "positive", category: "onchain" },
    ],
    reasoning: {
      ryoToolsUsed: ["analyze_token", "deep_analysis", "market_overview"],
      bullCase: [
        "Sector breadth expansion indicates capital rotation into large-cap smart contract platforms.",
        "Staking inflows show steady non-liquid lockups, tightening available float on centralized venues."
      ],
      bearCase: [
        "4-hour RSI is printing 72.4 (overbought zone), suggesting near-term consolidation.",
        "ETH/BTC ratio testing multi-week channel midpoint without decisive breakout confirmation."
      ],
      judgeRuling: "Conviction is 64/100 for Long. Favorable macro trend tempered by short-term momentum exhaustion. Better suited for systematic DCA or trailing stops rather than aggressive breakout chasing.",
      invalidationCriteria: [
        "Rejection at $3,500 resistance with heavy volume spike on down-candles",
        "Breakdown below $3,310 support anchor"
      ]
    },
    timestamp: "45 mins ago"
  },
  {
    id: "verdict-btc",
    symbol: "BTC",
    name: "Bitcoin",
    pair: "BTC / USDT",
    stance: "Neutral",
    conviction: 51,
    bullPercent: 53,
    bearPercent: 47,
    price: 67450.00,
    change24h: -0.4,
    volume24h: "$28.1B",
    evidence: [
      { id: "e8", label: "Range-bound", tone: "neutral", category: "volatility" },
      { id: "e9", label: "Low volatility", tone: "neutral", category: "volatility" },
      { id: "e10", label: "ETF flows neutral", tone: "neutral", category: "sentiment" },
    ],
    reasoning: {
      ryoToolsUsed: ["market_overview", "deep_analysis", "compare_tokens"],
      bullCase: [
        "Institutional custody reserves continue to grind lower, maintaining macro supply squeeze.",
        "Derivatives funding is completely flat, showing no leveraged bias or liquidation cluster vulnerability."
      ],
      bearCase: [
        "Compressing ATR and shrinking volume signature suggest lack of directional participant conviction.",
        "Resistance at $68,800 has repelled two consecutive attempts over the past 72 hours."
      ],
      judgeRuling: "Conviction rests at 51/100 (Neutral). The risk/reward profile does not provide actionable edge at the current channel median ($67.4k). Maintain stance and await breakout above $68.8k or flush to $65.2k.",
      invalidationCriteria: [
        "Decisive 4-hour candle close outside $65,200 – $68,800 boundaries",
        "Aggregate ETF net inflow/outflow delta exceeding $350M in a single session"
      ]
    },
    timestamp: "1 hour ago"
  },
  {
    id: "verdict-render",
    symbol: "RENDER",
    name: "Render",
    pair: "RENDER / USDT",
    stance: "Long",
    conviction: 70,
    bullPercent: 68,
    bearPercent: 32,
    price: 6.84,
    change24h: 7.8,
    volume24h: "$420M",
    evidence: [
      { id: "e11", label: "AI narrative ↑", tone: "positive", category: "sentiment" },
      { id: "e12", label: "Volume surge", tone: "positive", category: "momentum" },
      { id: "e13", label: "Supply overhang ⚠", tone: "warning", category: "onchain" },
    ],
    reasoning: {
      ryoToolsUsed: ["analyze_token", "monitor_market_sentiment_shift"],
      bullCase: [
        "Sub-sector correlation metrics show AI/compute assets leading the current market regime.",
        "Social sentiment shift detector crossed 82nd percentile bullish threshold."
      ],
      bearCase: [
        "Moderate unlock vesting cliff scheduled in 18 days.",
        "High correlation with US tech equity indices."
      ],
      judgeRuling: "Conviction 70/100 Long. Clear momentum leader in the decentralized compute vertical. Suitable for tactical positioning with trailing stops.",
      invalidationCriteria: [
        "Loss of $6.20 structural support",
        "Broad tech equity risk-off liquidation"
      ]
    },
    timestamp: "2 hours ago"
  }
]

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "j1",
    symbol: "SOL",
    name: "Solana",
    call: "Long",
    timestamp: "2026-09-07T18:30:00Z",
    timeAgo: "Long, 6h ago",
    conviction: 78,
    entryPrice: 147.10,
    currentPrice: 154.20,
    outcomePercent: 4.8,
    outcomeStatus: "positive",
    notes: "Entered after Mekiki bull-case conviction pass crossed 75."
  },
  {
    id: "j2",
    symbol: "ETH",
    name: "Ethereum",
    call: "Long",
    timestamp: "2026-09-06T23:00:00Z",
    timeAgo: "Long, 1d ago",
    conviction: 58,
    entryPrice: 3462.00,
    currentPrice: 3420.50,
    outcomePercent: -1.2,
    outcomeStatus: "negative",
    notes: "Consolidating near resistance with high 4h RSI."
  },
  {
    id: "j3",
    symbol: "BTC",
    name: "Bitcoin",
    call: "Neutral",
    timestamp: "2026-09-05T20:00:00Z",
    timeAgo: "Neutral, 2d ago",
    conviction: 49,
    entryPrice: 67500.00,
    currentPrice: 67450.00,
    outcomePercent: 0.0,
    outcomeStatus: "flat",
    notes: "Range bound oscillation between $66.8k and $68.2k."
  },
  {
    id: "j4",
    symbol: "AVAX",
    name: "Avalanche",
    call: "Long",
    timestamp: "2026-09-04T12:00:00Z",
    timeAgo: "Long, 3d ago",
    conviction: 72,
    entryPrice: 28.40,
    currentPrice: 31.10,
    outcomePercent: 9.5,
    outcomeStatus: "positive",
    notes: "Catalyst confirmation through Mekiki token scan."
  },
  {
    id: "j5",
    symbol: "SUI",
    name: "Sui",
    call: "Long",
    timestamp: "2026-09-03T16:00:00Z",
    timeAgo: "Long, 4d ago",
    conviction: 69,
    entryPrice: 1.82,
    currentPrice: 1.94,
    outcomePercent: 6.6,
    outcomeStatus: "positive",
    notes: "DeFi TVL momentum and low volatility breakout."
  }
]

export const mockWatchlist: WatchlistItem[] = [
  {
    id: "w1",
    symbol: "SOL",
    name: "Solana",
    conviction: 81,
    trend: "up",
    stance: "Long",
    change24h: 5.4,
    price: 154.20
  },
  {
    id: "w2",
    symbol: "RENDER",
    name: "Render",
    conviction: 70,
    trend: "up",
    stance: "Long",
    change24h: 7.8,
    price: 6.84
  },
  {
    id: "w3",
    symbol: "TAO",
    name: "Bittensor",
    conviction: 55,
    trend: "neutral",
    stance: "Neutral",
    change24h: 1.2,
    price: 340.50
  },
  {
    id: "w4",
    symbol: "SUI",
    name: "Sui Network",
    conviction: 68,
    trend: "up",
    stance: "Long",
    change24h: 3.9,
    price: 1.94
  },
  {
    id: "w5",
    symbol: "AVAX",
    name: "Avalanche",
    conviction: 62,
    trend: "neutral",
    stance: "Long",
    change24h: 0.8,
    price: 31.10
  }
]

export const mockScanCandidates: ScanCandidate[] = [
  {
    symbol: "SOL",
    name: "Solana",
    score: 84,
    stance: "Long",
    rationale: "Unusual spot accumulation and breakout from 14-day accumulation range.",
    catalyst: "Record weekly DEX volume and validator staking expansion"
  },
  {
    symbol: "RENDER",
    name: "Render",
    score: 76,
    stance: "Long",
    rationale: "Leading relative strength in compute sector with social velocity spike.",
    catalyst: "Decentralized GPU demand surge and network utilization ATH"
  },
  {
    symbol: "INJ",
    name: "Injective",
    score: 71,
    stance: "Long",
    rationale: "Compression squeeze resolving upward with positive on-chain funding drift.",
    catalyst: "Derivatives volume breakout and ecosystem liquidity incentives"
  }
]
