import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Stock, StockFilters, Recommendation } from '../types'
import { stockAPI } from '../services/api'

export const useStockStore = defineStore('stock', () => {
  // State
  const stocks = ref<Stock[]>([])
  const recommendations = ref<Recommendation[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<StockFilters>({
    page: 1,
    limit: 20,
    sort_by: 'time',
    order: 'asc'
  })

  // Getters
  const filteredStocks = computed(() => {
    return stocks.value.filter(stock => {
      if (filters.value.ticker && !stock.ticker.toLowerCase().includes(filters.value.ticker.toLowerCase())) {
        return false
      }
      if (filters.value.company && !stock.company.toLowerCase().includes(filters.value.company.toLowerCase())) {
        return false
      }
      if (filters.value.brokerage && !stock.brokerage.toLowerCase().includes(filters.value.brokerage.toLowerCase())) {
        return false
      }
      return true
    })
  })

  const topRatedStocks = computed(() => {
    return stocks.value
      .filter(stock => ['Buy', 'Strong Buy', 'Outperform'].includes(stock.rating_to))
      .slice(0, 5)
  })

  // Actions
  async function fetchStocks(newFilters?: Partial<StockFilters>) {

    try {
      loading.value = true
      error.value = null
      
      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      const response = await stockAPI.getStocks(filters.value)
      stocks.value = response.items
    } catch (err) {
      console.log('error: ', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

  async function fetchRecommendations() {
    try {
      loading.value = true
      const response = await stockAPI.getRecommendations()
      recommendations.value = response.recommendations
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error cargando recomendaciones'
    } finally {
      loading.value = false
    }
  }

  function updateFilters(newFilters: Partial<StockFilters>) {
    filters.value = { ...filters.value, ...newFilters }
    fetchStocks()
  }

  function clearFilters() {
    filters.value = {
      page: 1,
      limit: 50,
      sort_by: 'time',
      order: 'desc'
    }
    fetchStocks()
  }

  return {
    // State
    stocks,
    recommendations,
    loading,
    error,
    filters,
    // Getters
    filteredStocks,
    topRatedStocks,
    // Actions
    fetchStocks,
    fetchRecommendations,
    updateFilters,
    clearFilters
  }
})