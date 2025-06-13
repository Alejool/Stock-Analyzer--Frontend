<template>
  <div class="space-y-6">

    <div class="bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl p-6 text-white">
      <h1 class="text-2xl sm:text-3xl font-bold mb-2">Análisis y Estadísticas</h1>
      <p class="text-white/80">Insights y tendencias del mercado</p>
    </div>

    <!-- Distribución de Ratings -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Distribution of Ratings</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 bg-green-500 rounded"></div>
              <span class="font-medium text-gray-700">BUY</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-32 bg-gray-200 rounded-full h-3">
                <div 
                  class="bg-green-500 h-3 rounded-full transition-all duration-1000"
                  :style="{ width: `${(ratingsDistribution.buy / ratingsDistribution.total) * 100}%` }"
                ></div>
              </div>
              <span class="font-bold text-gray-800 w-12 text-right">{{ ratingsDistribution.buy }}</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 bg-yellow-500 rounded"></div>                     
              <span class="font-medium text-gray-700">HOLD</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-32 bg-gray-200 rounded-full h-3">
                <div
                  class="bg-yellow-500 h-3 rounded-full transition-all duration-1000"
                  :style="{ width: `${(ratingsDistribution.hold / ratingsDistribution.total) * 100}%` }"
                  ></div>
              </div>
              <span class="font-bold text-gray-800 w-12 text-right">{{ ratingsDistribution.hold }}</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 bg-red-500 rounded"></div>
              <span class="font-medium text-gray-700">SELL</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-32 bg-gray-200 rounded-full h-3">
                <div 
                  class="bg-red-500 h-3 rounded-full transition-all duration-1000"
                  :style="{ width: `${(ratingsDistribution.sell / ratingsDistribution.total) * 100}%` }"
                ></div>
              </div>
              <span class="font-bold text-gray-800 w-12 text-right">{{ ratingsDistribution.sell }}</span>
            </div>
          </div>
        </div>
        
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-800">{{ ratingsDistribution.total }}</div>
            <div class="text-sm text-gray-600">Total of recommendations</div>
          </div>
        </div>
      </div>

    </div>
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
  console.log('Analytics cargado')


})
</script>