<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl p-6 text-white">
      <h1 class="text-2xl sm:text-3xl font-bold mb-2">Análisis y Estadísticas</h1>
      <p class="text-white/80">Insights y tendencias del mercado</p>
    </div>

    <!-- Rest of template code remains unchanged -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface RatingsDistribution {
  buy: number
  hold: number
  sell: number
  total: number
}

interface SectorData {
  name: string
  count: number
  percentage: number
  color: string
}

interface TrendingStock {
  ticker: string
  company: string
  change: number
  timeframe: string
}

interface BrokeragePerformance {
  name: string
  category: string
  accuracy: number
  totalRecommendations: number
  correct: number
  trend: 'up' | 'down' | 'stable'
}

interface GeneralStats {
  avgScore: number
  avgTargetPrice: number
  dailyUpdates: number
  accuracy: number
}

// Reactive data
const ratingsDistribution = ref<RatingsDistribution>({
  buy: 573,
  hold: 421,
  sell: 253,
  total: 1247
})

const sectorDistribution = ref<SectorData[]>([
  { name: 'Technology', count: 423, percentage: 34, color: '#3B82F6' },
  { name: 'Healthcare', count: 287, percentage: 23, color: '#10B981' },
  { name: 'Financial', count: 231, percentage: 18.5, color: '#6366F1' },
  { name: 'Consumer', count: 156, percentage: 12.5, color: '#F59E0B' },
  { name: 'Industrial', count: 150, percentage: 12, color: '#EC4899' }
])

const trendingUp = ref<TrendingStock[]>([
  { ticker: 'AAPL', company: 'Apple Inc.', change: 2.5, timeframe: '7 días' },
  { ticker: 'MSFT', company: 'Microsoft Corp.', change: 1.8, timeframe: '7 días' },
  { ticker: 'GOOGL', company: 'Alphabet Inc.', change: 1.5, timeframe: '7 días' }
])

const trendingDown = ref<TrendingStock[]>([
  { ticker: 'META', company: 'Meta Platforms', change: -2.1, timeframe: '7 días' },
  { ticker: 'NFLX', company: 'Netflix Inc.', change: -1.9, timeframe: '7 días' },
  { ticker: 'TSLA', company: 'Tesla Inc.', change: -1.7, timeframe: '7 días' }
])

const brokeragePerformance = ref<BrokeragePerformance[]>([
  { name: 'Morgan Stanley', category: 'Investment Bank', accuracy: 85, totalRecommendations: 324, correct: 275, trend: 'up' },
  { name: 'Goldman Sachs', category: 'Investment Bank', accuracy: 82, totalRecommendations: 298, correct: 244, trend: 'up' },
  { name: 'JP Morgan', category: 'Investment Bank', accuracy: 78, totalRecommendations: 276, correct: 215, trend: 'stable' }
])

const generalStats = ref<GeneralStats>({
  avgScore: 7.8,
  avgTargetPrice: 157.32,
  dailyUpdates: 45,
  accuracy: 82
})

onMounted(() => {
  // Add any initialization logic here
})
</script>
