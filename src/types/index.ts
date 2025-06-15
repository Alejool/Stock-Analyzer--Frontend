
// src/types/index.ts
export interface Stock {
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
  score?: number
  reason?: string
  target_price?: string
  current_rating?: string
  confidence?: number
  lastUpdate?: string
}

export interface StockResponse {
  stocks: Stock[]
  recommendations: Recommendation[]
}

export interface StockFilters {
  ticker?: string
  company?: string
  brokerage?: string
  action?: string
  rating?: string
  sort_by?: string
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
  confidence?: string
}

export interface Recommendation {
  ticker: string
  company: string
  score: number
  sector?: string
  rating?: string
  reason: string
  target_to: string
  lastUpdate?: string
  rating_to: string
  confidence: number
}