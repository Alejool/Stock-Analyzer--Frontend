
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Stock } from '../types'

export interface StockItem {
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



export const useStockStoreDetail = defineStore('stock', () => {
  // State
  const stockData = ref<Stock[]>([])


  // Getters
  const sortedByScore = computed(() =>
    [...stockData.value].sort((a, b) => (b.score || 0) - (a.score || 0))
  )

  const averageScore = computed(() => {
    if (stockData.value.length === 0) return 0
    const sum = stockData.value.reduce((acc, item) => acc + (item.score || 0), 0)
    return Math.round(sum / stockData.value.length)
  })

  const totalBuyRecommendations = computed(() =>
    stockData.value.filter(item => item.rating_to === 'Buy').length
  )

  // Actions

  const getItemById = (id: number) => {
    return stockData.value.find(item => item.id === id)
  }

  const updateItem = (id: number, updates: Partial<StockItem>) => {
    const index = stockData.value.findIndex(item => item.id === id)
    if (index !== -1) {
      stockData.value[index] = { ...stockData.value[index], ...updates }
    }
  }

  const addItem = (item: StockItem) => {
    stockData.value.push(item)
  }

  const removeItem = (id: number) => {
    const index = stockData.value.findIndex(item => item.id === id)
    if (index !== -1) {
      stockData.value.splice(index, 1)
    }
  }

  const filterByTicker = (ticker: string) => {
    return stockData.value.filter(item =>
      item.ticker.toLowerCase().includes(ticker.toLowerCase())
    )
  }

  const filterByBrokerage = (brokerage: string) => {
    return stockData.value.filter(item =>
      item.brokerage.toLowerCase().includes(brokerage.toLowerCase())
    )
  }

  return {
    // State
    stockData,

    // Getters
    sortedByScore,
    averageScore,
    totalBuyRecommendations,

    // Actions
    getItemById,
    updateItem,
    addItem,
    removeItem,
    filterByTicker,
    filterByBrokerage
  }
})