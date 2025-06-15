
export interface Stock {
  ticker: string
  company: string
  sector: string
  rating: 'BUY' | 'HOLD' | 'SELL'
  score: number
  targetPrice: number
  lastUpdate: string
}

// export  interface Metrics {
//   totalStocks: number
//   buyRecommendations: number
//   totalBrokerages: number
//   lastUpdate: string
// }



