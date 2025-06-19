

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
  total_register?: number
  buy_count?: number
  total_brokerages?: number
  last_update?: string
}

export interface StockResponse {
  stocks: Stock[]
  items: Stock[]
  recommendations: Recommendation[]
}

export interface StockFilters {
  ticker?: string
  company?: string
  brokerage?: string
  action?: string
  rating?: string
  sort_by?: string
  order?: 'ASC' | 'DESC'
  page?: number
  limit?: number
  confidence?: string
  today?: string
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


export interface Metrics {
  title: string;
  value: string;
  icon: string;
  backgroundColor: string;
  iconBackground: string;
  extraInfo?: string;
  extraInfoColor?: string;
  pulseColor?: string;
  borderColor?: string;
}
