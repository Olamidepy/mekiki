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
    network: "Solana",
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
    id: "verdict-aero",
    symbol: "AERO",
    name: "Aerodrome Finance",
    network: "Base",
    pair: "AERO / USDT",
    stance: "Long",
    conviction: 76,
    bullPercent: 74,
    bearPercent: 26,
    price: 1.18,
    change24h: 6.4,
    volume24h: "$185M",
    evidence: [
      { id: "ea1", label: "Base TVL leader", tone: "positive", category: "onchain" },
      { id: "ea2", label: "veAERO lockup ATH", tone: "positive", category: "onchain" },
      { id: "ea3", label: "Negative funding", tone: "positive", category: "momentum" },
      { id: "ea4", label: "Token emission cliff", tone: "warning", category: "volatility" },
    ],
    reasoning: {
      ryoToolsUsed: ["analyze_token", "deep_analysis", "market_overview"],
      bullCase: [
        "Aerodrome captures over 55% of all Base DEX swaps, generating record veAERO organic fee yields.",
        "Cumulative Volume Delta (CVD) confirms institutional accumulator addresses absorbing post-emission dips.",
        "Base active address growth accelerates via Coinbase smart wallet onboarding."
      ],
      bearCase: [
        "Weekly emission dilution requires steady TVL expansion to maintain bribe equilibrium.",
        "Short-term resistance cluster located at $1.26-$1.30 supply zone."
      ],
      judgeRuling: "Conviction stands at 76/100 for Long. Asymmetric beta to Base ecosystem expansion. Entry sweet spot located between $1.12–$1.16 with tight invalidation.",
      invalidationCriteria: [
        "Loss of structural 4H anchor at $1.08",
        "Significant drop in weekly trading volume on Base liquidity pools"
      ]
    },
    timestamp: "24 mins ago"
  },
  {
    id: "verdict-hype",
    symbol: "HYPE",
    name: "Hyperliquid",
    network: "Hyperliquid",
    pair: "HYPE / USDT",
    stance: "Long",
    conviction: 83,
    bullPercent: 81,
    bearPercent: 19,
    price: 24.50,
    change24h: 11.2,
    volume24h: "$620M",
    evidence: [
      { id: "eh1", label: "Perp volume ATH", tone: "positive", category: "momentum" },
      { id: "eh2", label: "HyperEVM catalyst", tone: "positive", category: "sentiment" },
      { id: "eh3", label: "Orderbook bid depth ↑", tone: "positive", category: "onchain" },
      { id: "eh4", label: "Elevated OI", tone: "warning", category: "volatility" },
    ],
    reasoning: {
      ryoToolsUsed: ["analyze_token", "deep_analysis", "monitor_market_sentiment_shift"],
      bullCase: [
        "Hyperliquid has captured unmatched on-chain perpetual volume with genuine zero-gas orderbook liquidity.",
        "HyperEVM deployment triggers massive builder migration and native asset locking.",
        "Perpetual funding rate divergence shows spot bids leading aggressive short liquidations."
      ],
      bearCase: [
        "Open interest has grown 22% over 48 hours, raising flash-deleveraging sensitivity.",
        "Psychological resistance at $26.00 round figure."
      ],
      judgeRuling: "Conviction is 83/100 for Long. The strongest microstructure profile across all tracked perps venues. Favor positioning on 15m dips into the $23.20–$23.80 zone.",
      invalidationCriteria: [
        "Breach below 4H structural demand block at $22.10",
        "Macro liquidation event with BTC dropping > 4%"
      ]
    },
    timestamp: "32 mins ago"
  },
  {
    id: "verdict-ton",
    symbol: "TON",
    name: "Toncoin",
    network: "TON",
    pair: "TON / USDT",
    stance: "Long",
    conviction: 71,
    bullPercent: 67,
    bearPercent: 33,
    price: 5.35,
    change24h: 3.8,
    volume24h: "$490M",
    evidence: [
      { id: "et1", label: "Telegram Mini-Apps ↑", tone: "positive", category: "sentiment" },
      { id: "et2", label: "Custodial wallet MAU ATH", tone: "positive", category: "onchain" },
      { id: "et3", label: "Range resistance test", tone: "warning", category: "momentum" },
    ],
    reasoning: {
      ryoToolsUsed: ["analyze_token", "deep_analysis", "market_overview"],
      bullCase: [
        "Direct integration with 900M+ Telegram users provides unmatched organic funnel for crypto adoption.",
        "USDT-TON on-chain volume surpasses $1B monthly velocity with low slippage.",
        "Daily active wallets holding steady above 4.2M addresses."
      ],
      bearCase: [
        "Testing key multi-month range resistance at $5.60.",
        "Ecosystem token unlocks creating moderate rotation pressure."
      ],
      judgeRuling: "Conviction 71/100 Long. Strong macro catalyst and sticky retail utility. Look for daily close confirmation above $5.45 or accumulation near $5.10.",
      invalidationCriteria: [
        "Daily close below 50-day EMA ($4.95)",
        "Sharp drop in Telegram bot active sessions"
      ]
    },
    timestamp: "40 mins ago"
  },
  {
    id: "verdict-sui",
    symbol: "SUI",
    name: "Sui Network",
    network: "Sui",
    pair: "SUI / USDT",
    stance: "Long",
    conviction: 75,
    bullPercent: 73,
    bearPercent: 27,
    price: 1.84,
    change24h: 8.6,
    volume24h: "$540M",
    evidence: [
      { id: "es1", label: "Move DeFi TVL ATH", tone: "positive", category: "onchain" },
      { id: "es2", label: "Clean 4H Breakout", tone: "positive", category: "momentum" },
      { id: "es3", label: "Positive funding drift", tone: "positive", category: "sentiment" },
      { id: "es4", label: "Overbought 1H RSI", tone: "warning", category: "volatility" },
    ],
    reasoning: {
      ryoToolsUsed: ["analyze_token", "deep_analysis", "monitor_market_sentiment_shift"],
      bullCase: [
        "Total Value Locked on Sui Move protocols crossed $1B with sustained lending market utilization.",
        "Breakout above multi-week accumulation range with expanding volume signature.",
        "CVD spot accumulation divergence showing clean institutional rotation from older L1s."
      ],
      bearCase: [
        "1-hour RSI reaching 74, indicating potential for short-term retest of the breakout level.",
        "Upcoming scheduled ecosystem grant distribution."
      ],
      judgeRuling: "Conviction 75/100 Long. Clear relative strength leader among alternative L1 networks. Asymmetry supports bidding retests of $1.74–$1.78.",
      invalidationCriteria: [
        "Failure to hold retest level at $1.70 on 4-hour close",
        "Aggressive spot selling delta flipping negative"
      ]
    },
    timestamp: "52 mins ago"
  },
  {
    id: "verdict-arb",
    symbol: "ARB",
    name: "Arbitrum",
    network: "Arbitrum",
    pair: "ARB / USDT",
    stance: "Neutral",
    conviction: 58,
    bullPercent: 54,
    bearPercent: 46,
    price: 0.64,
    change24h: 1.2,
    volume24h: "$310M",
    evidence: [
      { id: "ear1", label: "Largest L2 TVL", tone: "positive", category: "onchain" },
      { id: "ear2", label: "Stylus adoption", tone: "positive", category: "sentiment" },
      { id: "ear3", label: "Unlock overhang", tone: "warning", category: "volatility" },
      { id: "ear4", label: "Range compression", tone: "neutral", category: "volatility" },
    ],
    reasoning: {
      ryoToolsUsed: ["market_overview", "deep_analysis", "compare_tokens"],
      bullCase: [
        "Maintains dominant $13B+ Layer 2 ecosystem TVL and high fee capture from on-chain perps venues.",
        "Arbitrum Stylus enabling C/C++/Rust smart contracts drives developer interest.",
        "Negative funding rates on perpetuals suggest crowded retail shorts."
      ],
      bearCase: [
        "Scheduled monthly investor/team token unlocks dampen upside momentum.",
        "Price action trapped in long-duration sideways accumulation band between $0.58 and $0.72."
      ],
      judgeRuling: "Conviction 58/100 Neutral. Strong fundamental ecosystem metrics weighed down by circulating supply inflation. Awaiting clean volume breakout above $0.72 before allocating active capital.",
      invalidationCriteria: [
        "Decisive close above $0.72 resistance",
        "Breakdown below macro floor at $0.56"
      ]
    },
    timestamp: "1 hour ago"
  },
  {
    id: "verdict-eth",
    symbol: "ETH",
    name: "Ethereum",
    network: "Ethereum",
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
    timestamp: "1 hour ago"
  },
  {
    id: "verdict-btc",
    symbol: "BTC",
    name: "Bitcoin",
    network: "Bitcoin",
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
    timestamp: "2 hours ago"
  },
  {
    id: "verdict-render",
    symbol: "RENDER",
    name: "Render",
    network: "Solana",
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
    network: "Solana",
    conviction: 81,
    trend: "up",
    stance: "Long",
    change24h: 5.4,
    price: 154.20
  },
  {
    id: "w2",
    symbol: "HYPE",
    name: "Hyperliquid",
    network: "Hyperliquid",
    conviction: 83,
    trend: "up",
    stance: "Long",
    change24h: 11.2,
    price: 24.50
  },
  {
    id: "w3",
    symbol: "AERO",
    name: "Aerodrome Finance",
    network: "Base",
    conviction: 76,
    trend: "up",
    stance: "Long",
    change24h: 6.4,
    price: 1.18
  },
  {
    id: "w4",
    symbol: "TON",
    name: "Toncoin",
    network: "TON",
    conviction: 71,
    trend: "up",
    stance: "Long",
    change24h: 3.8,
    price: 5.35
  },
  {
    id: "w5",
    symbol: "SUI",
    name: "Sui Network",
    network: "Sui",
    conviction: 75,
    trend: "up",
    stance: "Long",
    change24h: 8.6,
    price: 1.84
  },
  {
    id: "w6",
    symbol: "ARB",
    name: "Arbitrum",
    network: "Arbitrum",
    conviction: 58,
    trend: "neutral",
    stance: "Neutral",
    change24h: 1.2,
    price: 0.64
  }
]

export const mockScanCandidates: ScanCandidate[] = [
  {
    symbol: "HYPE",
    name: "Hyperliquid",
    network: "Hyperliquid",
    score: 88,
    stance: "Long",
    rationale: "HyperEVM mainnet readiness with record perps market share and aggressive spot accumulation.",
    catalyst: "Record daily on-chain derivatives volume ($2.8B+) and ecosystem fee revenue"
  },
  {
    symbol: "AERO",
    name: "Aerodrome Finance",
    network: "Base",
    score: 82,
    stance: "Long",
    rationale: "Unusual spot accumulation on Base DEX pools with veAERO voting yield expansion.",
    catalyst: "Base on-chain swap volume ATH and Coinbase smart wallet mass onboarding"
  },
  {
    symbol: "SUI",
    name: "Sui Network",
    network: "Sui",
    score: 79,
    stance: "Long",
    rationale: "Compression breakout with clean 4H structural break and heavy spot CVD divergence.",
    catalyst: "Move TVL passing $1B milestone and institutional custodian integration"
  },
  {
    symbol: "TON",
    name: "Toncoin",
    network: "TON",
    score: 75,
    stance: "Long",
    rationale: "Steady wallet accumulation against Telegram mini-app payment volume surge.",
    catalyst: "USDT-TON velocity surpassing $1.2B and 4M+ daily active addresses"
  },
  {
    symbol: "SOL",
    name: "Solana",
    network: "Solana",
    score: 84,
    stance: "Long",
    rationale: "Unusual spot accumulation and breakout from 14-day accumulation range.",
    catalyst: "Record weekly DEX volume and validator staking expansion"
  }
]
