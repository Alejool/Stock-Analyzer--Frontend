
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RatingData, AnalyticsFilters } from '../types/analytics'
import type { Stock } from '../types'


export const useAnalyticsStore = defineStore('analytics', () => {
  // State
  const data = ref<Stock[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const lastUpdated = ref<Date | null>(null)
  const filters = ref<AnalyticsFilters>({})
  

  // Actions
  const setData = (newData: Stock[]) => {
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

  // // Advanced Analytics Functions
  // const getCompanyTrend = (ticker: string, days: number = 30) => {
  //   const company = companyStats.value[ticker]
  //   if (!company) return null

  //   const cutoffDate = new Date()
  //   cutoffDate.setDate(cutoffDate.getDate() - days)

  //   const recentRatings = company.ratings
  //     .filter(rating => new Date(rating.time) >= cutoffDate)
  //     .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

  //   if (recentRatings.length < 2) return null

  //   const firstRating = recentRatings[0]
  //   const lastRating = recentRatings[recentRatings.length - 1]

  //   return {
  //     ticker,
  //     period: days,
  //     scoreChange: lastRating.score - firstRating.score,
  //     targetChange: calculateTargetChange(lastRating) - calculateTargetChange(firstRating),
  //     ratingsCount: recentRatings.length,
  //     trend: lastRating.score > firstRating.score ? 'improving' :
  //       lastRating.score < firstRating.score ? 'declining' : 'stable'
  //   }
  // }

  // const getBrokerageTrend = (brokerage: string, days: number = 30) => {
  //   const cutoffDate = new Date()
  //   cutoffDate.setDate(cutoffDate.getDate() - days)

  //   const recentRatings = filteredData.value
  //     .filter(rating => rating.brokerage === brokerage && new Date(rating.time) >= cutoffDate)
  //     .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

  //   if (recentRatings.length === 0) return null

  //   const avgScore = recentRatings.reduce((sum, rating) => sum + rating.score, 0) / recentRatings.length
  //   const avgTargetChange = recentRatings.reduce((sum, rating) => sum + calculateTargetChange(rating), 0) / recentRatings.length

  //   return {
  //     brokerage,
  //     period: days,
  //     ratingsCount: recentRatings.length,
  //     avgScore,
  //     avgTargetChange,
  //     companies: [...new Set(recentRatings.map(r => r.ticker))].length
  //   }
  // }

  // const getMarketCorrelation = () => {
  //   const companies = Object.values(companyStats.value)
  //   if (companies.length < 2) return null

  //   // Simple correlation between average scores and target changes
  //   const scores = companies.map(c => c.avgScore)
  //   const targetChanges = companies.map(c => c.avgTargetChange)

  //   const n = companies.length
  //   const sumScores = scores.reduce((sum, val) => sum + val, 0)
  //   const sumTargets = targetChanges.reduce((sum, val) => sum + val, 0)
  //   const sumScoresSq = scores.reduce((sum, val) => sum + val * val, 0)
  //   const sumTargetsSq = targetChanges.reduce((sum, val) => sum + val * val, 0)
  //   const sumProduct = scores.reduce((sum, score, i) => sum + score * targetChanges[i], 0)

  //   const numerator = n * sumProduct - sumScores * sumTargets
  //   const denominator = Math.sqrt((n * sumScoresSq - sumScores * sumScores) * (n * sumTargetsSq - sumTargets * sumTargets))

  //   const correlation = denominator !== 0 ? numerator / denominator : 0

  //   return {
  //     correlation,
  //     strength: Math.abs(correlation) > 0.7 ? 'strong' :
  //       Math.abs(correlation) > 0.4 ? 'moderate' : 'weak',
  //     direction: correlation > 0 ? 'positive' : correlation < 0 ? 'negative' : 'none'
  //   }
  // }


  


  return {
    // State
    data,
    loading,
    error,
    lastUpdated,

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
    // getCompanyTrend,
    
  }
})