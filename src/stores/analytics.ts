// stores/analytics.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Interfaces
interface RatingData {
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

interface BrokerageStats {
  count: number
  totalScore: number
  totalConfidence: number
  avgScore: number
  avgConfidence: number
  avgTargetChange: number
  actions: Record<string, number>
  companies: Set<string>
}

interface CompanyStats {
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

interface MarketSentiment {
  bullish: number
  bearish: number
  neutral: number
  overall: 'bullish' | 'bearish' | 'neutral'
}

interface AnalyticsFilters {
  brokerage?: string
  action?: string
  scoreRange?: 'high' | 'medium' | 'low'
  dateFrom?: string
  dateTo?: string
  ticker?: string
  confidenceMin?: number
}

export const useAnalyticsStore = defineStore('analytics', () => {
  // State
  const data = ref<RatingData[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const lastUpdated = ref<Date | null>(null)
  const filters = ref<AnalyticsFilters>({})

  // Computed Properties
  const filteredData = computed(() => {
    let filtered = [...data.value]

    if (filters.value.brokerage) {
      filtered = filtered.filter(item => item.brokerage === filters.value.brokerage)
    }

    if (filters.value.action) {
      filtered = filtered.filter(item => item.action === filters.value.action)
    }

    if (filters.value.scoreRange) {
      filtered = filtered.filter(item => {
        switch (filters.value.scoreRange) {
          case 'high': return item.score >= 70
          case 'medium': return item.score >= 50 && item.score < 70
          case 'low': return item.score < 50
          default: return true
        }
      })
    }

    if (filters.value.dateFrom) {
      filtered = filtered.filter(item => new Date(item.time) >= new Date(filters.value.dateFrom!))
    }

    if (filters.value.dateTo) {
      filtered = filtered.filter(item => new Date(item.time) <= new Date(filters.value.dateTo!))
    }

    if (filters.value.ticker) {
      filtered = filtered.filter(item => item.ticker.toLowerCase().includes(filters.value.ticker!.toLowerCase()))
    }

    if (filters.value.confidenceMin) {
      filtered = filtered.filter(item => item.confidence >= filters.value.confidenceMin!)
    }

    return filtered
  })

  const totalRatings = computed(() => filteredData.value.length)

  const uniqueBrokerages = computed(() => {
    return [...new Set(filteredData.value.map(item => item.brokerage))].sort()
  })

  const uniqueCompanies = computed(() => {
    const companies = new Map()
    filteredData.value.forEach(item => {
      companies.set(item.ticker, { ticker: item.ticker, company: item.company })
    })
    return Array.from(companies.values()).sort((a, b) => a.ticker.localeCompare(b.ticker))
  })

  const uniqueActions = computed(() => {
    return [...new Set(filteredData.value.map(item => item.action))].sort()
  })

  const averageScore = computed(() => {
    if (filteredData.value.length === 0) return 0
    return filteredData.value.reduce((sum, item) => sum + item.score, 0) / filteredData.value.length
  })

  const averageConfidence = computed(() => {
    if (filteredData.value.length === 0) return 0
    return filteredData.value.reduce((sum, item) => sum + item.confidence, 0) / filteredData.value.length
  })

  const averageTargetChange = computed(() => {
    if (filteredData.value.length === 0) return 0
    const changes = filteredData.value.map(item => calculateTargetChange(item))
    return changes.reduce((sum, change) => sum + change, 0) / changes.length
  })

  const actionsSummary = computed(() => {
    const actions: Record<string, number> = {}
    filteredData.value.forEach(item => {
      actions[item.action] = (actions[item.action] || 0) + 1
    })
    return Object.entries(actions)
      .map(([name, count]) => ({ name, count, percentage: (count / filteredData.value.length) * 100 }))
      .sort((a, b) => b.count - a.count)
  })

  const brokerageStats = computed((): Record<string, BrokerageStats> => {
    const stats: Record<string, BrokerageStats> = {}

    filteredData.value.forEach(item => {
      if (!stats[item.brokerage]) {
        stats[item.brokerage] = {
          count: 0,
          totalScore: 0,
          totalConfidence: 0,
          avgScore: 0,
          avgConfidence: 0,
          avgTargetChange: 0,
          actions: {},
          companies: new Set()
        }
      }

      const stat = stats[item.brokerage]
      stat.count++
      stat.totalScore += item.score
      stat.totalConfidence += item.confidence
      stat.actions[item.action] = (stat.actions[item.action] || 0) + 1
      stat.companies.add(item.ticker)
    })

    // Calculate averages
    Object.keys(stats).forEach(brokerage => {
      const stat = stats[brokerage]
      stat.avgScore = stat.totalScore / stat.count
      stat.avgConfidence = stat.totalConfidence / stat.count

      const brokerageData = filteredData.value.filter(item => item.brokerage === brokerage)
      const targetChanges = brokerageData.map(item => calculateTargetChange(item))
      stat.avgTargetChange = targetChanges.reduce((sum, change) => sum + change, 0) / targetChanges.length
    })

    return stats
  })

  const topBrokerages = computed(() => {
    return Object.entries(brokerageStats.value)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  })

  const companyStats = computed((): Record<string, CompanyStats> => {
    const stats: Record<string, CompanyStats> = {}

    filteredData.value.forEach(item => {
      if (!stats[item.ticker]) {
        stats[item.ticker] = {
          ticker: item.ticker,
          company: item.company,
          ratings: [],
          avgScore: 0,
          avgConfidence: 0,
          avgTargetChange: 0,
          totalRatings: 0,
          latestRating: item,
          sentiment: 'neutral'
        }
      }
      stats[item.ticker].ratings.push(item)
      stats[item.ticker].totalRatings++

      // Update latest rating if this one is more recent
      if (new Date(item.time) > new Date(stats[item.ticker].latestRating.time)) {
        stats[item.ticker].latestRating = item
      }
    })

    // Calculate averages and sentiment for each company
    Object.keys(stats).forEach(ticker => {
      const company = stats[ticker]
      company.avgScore = company.ratings.reduce((sum, rating) => sum + rating.score, 0) / company.ratings.length
      company.avgConfidence = company.ratings.reduce((sum, rating) => sum + rating.confidence, 0) / company.ratings.length

      const targetChanges = company.ratings.map(rating => calculateTargetChange(rating))
      company.avgTargetChange = targetChanges.reduce((sum, change) => sum + change, 0) / targetChanges.length

      // Determine sentiment
      if (company.avgTargetChange > 2) company.sentiment = 'bullish'
      else if (company.avgTargetChange < -2) company.sentiment = 'bearish'
      else company.sentiment = 'neutral'
    })

    return stats
  })

  const topPerformingCompanies = computed(() => {
    return Object.values(companyStats.value)
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10)
  })

  const marketSentiment = computed((): MarketSentiment => {
    const total = filteredData.value.length
    if (total === 0) return { bullish: 0, bearish: 0, neutral: 0, overall: 'neutral' }

    let bullish = 0, bearish = 0, neutral = 0

    filteredData.value.forEach(item => {
      const targetChange = calculateTargetChange(item)
      if (targetChange > 2) bullish++
      else if (targetChange < -2) bearish++
      else neutral++
    })

    const bullishPercent = (bullish / total) * 100
    const bearishPercent = (bearish / total) * 100
    const neutralPercent = (neutral / total) * 100

    let overall: 'bullish' | 'bearish' | 'neutral' = 'neutral'
    if (bullishPercent > bearishPercent && bullishPercent > neutralPercent) overall = 'bullish'
    else if (bearishPercent > bullishPercent && bearishPercent > neutralPercent) overall = 'bearish'

    return {
      bullish: bullishPercent,
      bearish: bearishPercent,
      neutral: neutralPercent,
      overall
    }
  })

  const recentActivity = computed(() => {
    return [...filteredData.value]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 20)
  })

  const targetPriceAnalysis = computed(() => {
    const changes = filteredData.value.map(item => calculateTargetChange(item))
    const increases = changes.filter(change => change > 0)
    const decreases = changes.filter(change => change < 0)
    const noChange = changes.filter(change => change === 0)

    return {
      totalChanges: changes.length,
      increases: increases.length,
      decreases: decreases.length,
      noChange: noChange.length,
      avgIncrease: increases.length > 0 ? increases.reduce((sum, val) => sum + val, 0) / increases.length : 0,
      avgDecrease: decreases.length > 0 ? decreases.reduce((sum, val) => sum + val, 0) / decreases.length : 0,
      maxIncrease: increases.length > 0 ? Math.max(...increases) : 0,
      maxDecrease: decreases.length > 0 ? Math.min(...decreases) : 0
    }
  })

  const scoreDistribution = computed(() => {
    const distribution = { high: 0, medium: 0, low: 0 }
    filteredData.value.forEach(item => {
      if (item.score >= 70) distribution.high++
      else if (item.score >= 50) distribution.medium++
      else distribution.low++
    })

    const total = filteredData.value.length
    return {
      high: { count: distribution.high, percentage: total > 0 ? (distribution.high / total) * 100 : 0 },
      medium: { count: distribution.medium, percentage: total > 0 ? (distribution.medium / total) * 100 : 0 },
      low: { count: distribution.low, percentage: total > 0 ? (distribution.low / total) * 100 : 0 }
    }
  })

  const timeSeriesData = computed(() => {
    const timeMap = new Map()

    filteredData.value.forEach(item => {
      const date = new Date(item.time).toISOString().split('T')[0] // YYYY-MM-DD
      if (!timeMap.has(date)) {
        timeMap.set(date, {
          date,
          count: 0,
          avgScore: 0,
          totalScore: 0,
          actions: {},
          ratings: []
        })
      }

      const dayData = timeMap.get(date)
      dayData.count++
      dayData.totalScore += item.score
      dayData.avgScore = dayData.totalScore / dayData.count
      dayData.actions[item.action] = (dayData.actions[item.action] || 0) + 1
      dayData.ratings.push(item)
    })

    return Array.from(timeMap.values()).sort((a, b) => a.date.localeCompare(b.date))
  })

  // Helper Functions
  const calculateTargetChange = (item: RatingData): number => {
    const from = parseFloat(item.target_from.replace('$', ''))
    const to = parseFloat(item.target_to.replace('$', ''))
    if (from === 0) return 0
    return ((to - from) / from) * 100
  }

  // Actions
  const setData = (newData: RatingData[]) => {
    data.value = newData
    lastUpdated.value = new Date()
    error.value = null
  }

  const addRating = (rating: RatingData) => {
    data.value.push(rating)
    lastUpdated.value = new Date()
  }

  const updateRating = (id: number, updatedRating: Partial<RatingData>) => {
    const index = data.value.findIndex(item => item.id === id)
    if (index !== -1) {
      data.value[index] = { ...data.value[index], ...updatedRating }
      lastUpdated.value = new Date()
    }
  }

  const removeRating = (id: number) => {
    const index = data.value.findIndex(item => item.id === id)
    if (index !== -1) {
      data.value.splice(index, 1)
      lastUpdated.value = new Date()
    }
  }

  const setFilters = (newFilters: AnalyticsFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {}
  }

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  // Advanced Analytics Functions
  const getCompanyTrend = (ticker: string, days: number = 30) => {
    const company = companyStats.value[ticker]
    if (!company) return null

    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const recentRatings = company.ratings
      .filter(rating => new Date(rating.time) >= cutoffDate)
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

    if (recentRatings.length < 2) return null

    const firstRating = recentRatings[0]
    const lastRating = recentRatings[recentRatings.length - 1]

    return {
      ticker,
      period: days,
      scoreChange: lastRating.score - firstRating.score,
      targetChange: calculateTargetChange(lastRating) - calculateTargetChange(firstRating),
      ratingsCount: recentRatings.length,
      trend: lastRating.score > firstRating.score ? 'improving' :
        lastRating.score < firstRating.score ? 'declining' : 'stable'
    }
  }

  const getBrokerageTrend = (brokerage: string, days: number = 30) => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const recentRatings = filteredData.value
      .filter(rating => rating.brokerage === brokerage && new Date(rating.time) >= cutoffDate)
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

    if (recentRatings.length === 0) return null

    const avgScore = recentRatings.reduce((sum, rating) => sum + rating.score, 0) / recentRatings.length
    const avgTargetChange = recentRatings.reduce((sum, rating) => sum + calculateTargetChange(rating), 0) / recentRatings.length

    return {
      brokerage,
      period: days,
      ratingsCount: recentRatings.length,
      avgScore,
      avgTargetChange,
      companies: [...new Set(recentRatings.map(r => r.ticker))].length
    }
  }

  const getMarketCorrelation = () => {
    const companies = Object.values(companyStats.value)
    if (companies.length < 2) return null

    // Simple correlation between average scores and target changes
    const scores = companies.map(c => c.avgScore)
    const targetChanges = companies.map(c => c.avgTargetChange)

    const n = companies.length
    const sumScores = scores.reduce((sum, val) => sum + val, 0)
    const sumTargets = targetChanges.reduce((sum, val) => sum + val, 0)
    const sumScoresSq = scores.reduce((sum, val) => sum + val * val, 0)
    const sumTargetsSq = targetChanges.reduce((sum, val) => sum + val * val, 0)
    const sumProduct = scores.reduce((sum, score, i) => sum + score * targetChanges[i], 0)

    const numerator = n * sumProduct - sumScores * sumTargets
    const denominator = Math.sqrt((n * sumScoresSq - sumScores * sumScores) * (n * sumTargetsSq - sumTargets * sumTargets))

    const correlation = denominator !== 0 ? numerator / denominator : 0

    return {
      correlation,
      strength: Math.abs(correlation) > 0.7 ? 'strong' :
        Math.abs(correlation) > 0.4 ? 'moderate' : 'weak',
      direction: correlation > 0 ? 'positive' : correlation < 0 ? 'negative' : 'none'
    }
  }

  return {
    // State
    data: data.value,
    loading,
    error,
    lastUpdated,
    filters,

    // Computed
    filteredData,
    totalRatings,
    uniqueBrokerages,
    uniqueCompanies,
    uniqueActions,
    averageScore,
    averageConfidence,
    averageTargetChange,
    actionsSummary,
    brokerageStats,
    topBrokerages,
    companyStats,
    topPerformingCompanies,
    marketSentiment,
    recentActivity,
    targetPriceAnalysis,
    scoreDistribution,
    timeSeriesData,

    // Actions
    setData,
    addRating,
    updateRating,
    removeRating,
    setFilters,
    clearFilters,
    setLoading,
    setError,

    // Advanced Analytics
    getCompanyTrend,
    getBrokerageTrend,
    getMarketCorrelation,

    // Helper
    calculateTargetChange
  }
})