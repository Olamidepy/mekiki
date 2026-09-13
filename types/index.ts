export type Stance = 'Long' | 'Short' | 'Neutral'

export type Tone = 'positive' | 'negative' | 'warning' | 'neutral'

export interface EvidenceChip {
  id: string
  label: string
  tone: Tone
  category?: 'momentum' | 'sentiment' | 'volatility' | 'breadth' | 'onchain'
}

export interface ReasoningPass {
  bullCase: string[]
  bearCase: string[]
  judgeRuling: string
  invalidationCriteria: string[]
  ryoToolsUsed: string[]
}

export interface Verdict {
  id: string
  symbol: string
  name: string
  network?: string // e.g. 'Base', 'TON', 'Arbitrum', 'Hyperliquid', 'Sui', 'Solana'
  pair: string
  stance: Stance
  conviction: number // 0-100
  bullPercent: number
  bearPercent: number
  price: number
  change24h: number
  volume24h?: string
  evidence: EvidenceChip[]
  reasoning: ReasoningPass
  thesisSummary?: string
  invalidationPrice?: number
  targetPrice?: number
  technicalNotes?: string
  orderflowNotes?: string
  sentimentNotes?: string
  timestamp?: string
}

export interface JournalEntry {
  id: string
  symbol: string
  name: string
  network?: string
  call: Stance
  timestamp: string
  timeAgo: string
  conviction: number
  entryPrice: number
  currentPrice: number
  outcomePercent: number
  outcomeStatus: 'positive' | 'negative' | 'flat'
  notes?: string
}

export interface WatchlistItem {
  id: string
  symbol: string
  name: string
  network?: string
  conviction: number
  trend: 'up' | 'down' | 'neutral'
  stance: Stance
  change24h: number
  price: number
}

export interface MarketRegimeStats {
  regime: string
  sentimentTag: string
  fearAndGreed: number
  fearAndGreedLabel: string
  btcDominance: number
  breadth: 'expanding' | 'contracting' | 'neutral'
  volatility: 'elevated' | 'normal' | 'low'
  scannedTokensCount: number
}

export interface ScanCandidate {
  symbol: string
  name: string
  network?: string
  score: number
  rationale: string
  stance: Stance
  catalyst: string
}
