

export interface RatingData {
  id: number
  ticker: string
  company: string
  brokerage: string
  action: string
  rating_from: string
  rating_to: string
  target_from: string
  target_to: string
  time: string
  created_at: string
  updated_at: string
  score: number
  confidence: number
  total_register: number
  buy_count: number
  total_brokerages: number
  last_update: string
}

export interface BrokerageStats {
  count: number
  totalScore: number
  totalConfidence: number
  avgScore: number
  avgConfidence: number
  avgTargetChange: number
  actions: Record<string, number>
  companies: Set<string>
}

export interface CompanyStats {
  ticker: string
  company: string
  ratings: RatingData[]
  avgScore: number
  avgConfidence: number
  avgTargetChange: number
  totalRatings: number
  latestRating: RatingData
  sentiment: 'bullish' | 'bearish' | 'neutral'
}

export interface MarketSentiment {
  bullish: number
  bearish: number
  neutral: number
  overall: 'bullish' | 'bearish' | 'neutral'
}

export interface AnalyticsFilters {
  brokerage?: string
  action?: string
  scoreRange?: 'high' | 'medium' | 'low'
  dateFrom?: string
  dateTo?: string
  ticker?: string
  confidenceMin?: number
}