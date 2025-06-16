<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header Section -->
    <div class="mb-8">
      <h2 class="text-4xl font-bold text-gray-900 text-center mb-6">
        📊 Análisis de Mercado y Ratings
      </h2>
      
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center">
            <div class="text-3xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">📈</div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-gray-900">{{ analytics.totalRatings }}</h3>
              <p class="text-sm text-gray-600">Total Ratings</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center">
            <div class="text-3xl">🏢</div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-gray-900">{{ analytics.totalBrokerages }}</h3>
              <p class="text-sm text-gray-600">Brokerages Activos</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center">
            <div class="text-3xl">💹</div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-gray-900">{{ analytics.avgScore.toFixed(1) }}</h3>
              <p class="text-sm text-gray-600">Score Promedio</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center">
            <div class="text-3xl">🎯</div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-gray-900">
                {{ analytics.avgTargetChange > 0 ? '+' : '' }}{{ analytics.avgTargetChange.toFixed(1) }}%
              </h3>
              <p class="text-sm text-gray-600">Cambio Target Prom.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 class="text-xl font-bold text-gray-900 mb-4">🔍 Filtros de Análisis</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <select v-model="filters.brokerage" @change="applyFilters" 
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">Todos los Brokerages</option>
          <option v-for="brokerage in uniqueBrokerages" :key="brokerage" :value="brokerage">
            {{ brokerage }}
          </option>
        </select>
        
        <select v-model="filters.action" @change="applyFilters"
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">Todas las Acciones</option>
          <option value="target raised by">Target Raised</option>
          <option value="target lowered by">Target Lowered</option>
          <option value="rating upgraded">Rating Upgraded</option>
          <option value="rating downgraded">Rating Downgraded</option>
        </select>
        
        <select v-model="filters.scoreRange" @change="applyFilters"
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">Todos los Scores</option>
          <option value="high">Alto (70-100)</option>
          <option value="medium">Medio (50-69)</option>
          <option value="low">Bajo (0-49)</option>
        </select>
        
        <input v-model="filters.dateFrom" @change="applyFilters" type="date" 
               class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        
        <button @click="clearFilters" 
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
          Limpiar Filtros
        </button>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Actions Distribution -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">📊 Distribución de Acciones</h3>
        <div class="space-y-4">
          <div v-for="(action, index) in actionsDistribution" :key="action.name" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div :class="getActionColor(action.name)" class="w-4 h-4 rounded-full"></div>
              <span class="text-sm font-medium text-gray-700">{{ action.name }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">{{ action.count }}</span>
              <div class="w-20 bg-gray-200 rounded-full h-2">
                <div :class="getActionColor(action.name)" 
                     :style="{ width: (action.count / filteredData.length * 100) + '%' }"
                     class="h-2 rounded-full transition-all duration-500"></div>
              </div>
              <span class="text-xs text-gray-500">{{ ((action.count / filteredData.length) * 100).toFixed(1) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Target Price Changes -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">💰 Cambios en Precios Objetivo</h3>
        <div class="space-y-4">
          <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span class="text-sm font-medium text-green-800">Incrementos de Target</span>
            <span class="text-lg font-bold text-green-600">{{ targetChangesStats.increases }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
            <span class="text-sm font-medium text-red-800">Decrementos de Target</span>
            <span class="text-lg font-bold text-red-600">{{ targetChangesStats.decreases }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span class="text-sm font-medium text-blue-800">Promedio de Cambio</span>
            <span class="text-lg font-bold text-blue-600">
              {{ targetChangesStats.average > 0 ? '+' : '' }}{{ targetChangesStats.average.toFixed(2) }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Analysis Section -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
      <!-- Top Performers -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">🏆 Mejores Performadores</h3>
        <div class="space-y-3">
          <div v-for="(company, index) in topPerformers" :key="company.ticker" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div :class="getRankingBadgeColor(index)" class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {{ index + 1 }}
                </div>
              </div>
              <div>
                <div class="font-semibold text-gray-900">{{ company.ticker }}</div>
                <div class="text-xs text-gray-600 truncate">{{ company.company }}</div>
              </div>
            </div>
            <div class="text-right">
              <div :class="getScoreColorClass(company.score)" class="text-sm font-bold">
                {{ company.score }}
              </div>
              <div :class="company.targetChange >= 0 ? 'text-green-600' : 'text-red-600'" class="text-xs">
                {{ company.targetChange > 0 ? '+' : '' }}{{ company.targetChange.toFixed(1) }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Brokerages Analysis -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">🏢 Análisis de Brokerages</h3>
        <div class="space-y-4">
          <div v-for="brokerage in brokerageAnalysis.slice(0, 5)" :key="brokerage.name" 
               class="border border-gray-200 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-semibold text-gray-900 text-sm">{{ brokerage.name }}</h4>
              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {{ brokerage.count }} acciones
              </span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span class="text-gray-600">Score:</span>
                <span class="font-medium ml-1">{{ brokerage.avgScore.toFixed(1) }}</span>
              </div>
              <div>
                <span class="text-gray-600">Target:</span>
                <span :class="brokerage.avgTargetChange >= 0 ? 'text-green-600' : 'text-red-600'" class="font-medium ml-1">
                  {{ brokerage.avgTargetChange > 0 ? '+' : '' }}{{ brokerage.avgTargetChange.toFixed(1) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Market Sentiment -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">📈 Sentimiento del Mercado</h3>
        <div class="space-y-4">
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Alcista</span>
              <span class="font-medium text-green-600">{{ sentimentData.bullish.toFixed(1) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full transition-all duration-700" 
                   :style="{ width: sentimentData.bullish + '%' }"></div>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Bajista</span>
              <span class="font-medium text-red-600">{{ sentimentData.bearish.toFixed(1) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-red-500 h-2 rounded-full transition-all duration-700" 
                   :style="{ width: sentimentData.bearish + '%' }"></div>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Neutral</span>
              <span class="font-medium text-gray-600">{{ sentimentData.neutral.toFixed(1) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gray-500 h-2 rounded-full transition-all duration-700" 
                   :style="{ width: sentimentData.neutral + '%' }"></div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">{{ overallSentiment.label }}</div>
              <div class="text-sm text-gray-600">Sentimiento General</div>
              <div :class="overallSentiment.color" class="text-xs mt-1">
                {{ overallSentiment.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Timeline -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-6">⏰ Actividad Reciente</h3>
      <div class="space-y-4 max-h-96 overflow-y-auto">
        <div v-for="item in recentActivity" :key="item.id" 
             class="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="flex-shrink-0 text-xs text-gray-500 w-16">
            {{ formatDate(item.time) }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2 mb-2">
              <span class="font-semibold text-gray-900">{{ item.ticker }}</span>
              <span :class="getActionBadgeClass(item.action)" 
                    class="px-2 py-1 text-xs rounded-full">
                {{ item.action }}
              </span>
              <span class="text-xs text-gray-500">{{ item.brokerage }}</span>
            </div>
            <div class="text-sm text-gray-600 mb-1">{{ item.company }}</div>
            <div class="flex items-center space-x-2 text-xs">
              <span class="text-gray-500">{{ item.target_from }}</span>
              <span class="text-gray-400">→</span>
              <span class="font-medium" :class="calculateTargetChange(item) >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ item.target_to }}
              </span>
              <span class="text-gray-400">
                ({{ calculateTargetChange(item) > 0 ? '+' : '' }}{{ calculateTargetChange(item).toFixed(1) }}%)
              </span>
            </div>
          </div>
          <div class="flex-shrink-0">
            <div :class="getScoreColorClass(item.score)" class="text-sm font-bold">
              {{ item.score }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch, onMounted } from 'vue'
import {storeToRefs} from 'pinia'
import { useAnalyticsStore } from '../stores/analytics'
import { useStockStore } from '../stores/stockStore'
const stockStore = useStockStore();
const analyticsStore = useAnalyticsStore()
const { stocks,  filters: filtersStore } = storeToRefs(stockStore);
const { data } = storeToRefs(analyticsStore);

// Store

// Reactive filters
const filters = reactive({
  brokerage: '',
  action: '',
  scoreRange: '',
  dateFrom: '',
  dateTo: ''
})

// Computed properties
const filteredData = computed(() => {
  let data = [...analyticsStore.data]
  
  if (filters.brokerage) {
    data = data.filter(item => item.brokerage === filters.brokerage)
  }
  
  if (filters.action) {
    data = data.filter(item => item.action === filters.action)
  }
  
  if (filters.scoreRange) {
    data = data.filter(item => {
      switch (filters.scoreRange) {
        case 'high': return item.score >= 70
        case 'medium': return item.score >= 50 && item.score < 70
        case 'low': return item.score < 50
        default: return true
      }
    })
  }
  
  if (filters.dateFrom) {
    data = data.filter(item => new Date(item.time) >= new Date(filters.dateFrom))
  }
  
  return data
})

const analytics = computed(() => {
  const data = filteredData.value
  if (!data || data.length === 0) {
    return {
      totalRatings: 0,
      totalBrokerages: 0,
      avgScore: 0,
      avgTargetChange: 0
    }
  }

  const totalRatings = data.length
  const uniqueBrokerages = new Set(data.map(item => item.brokerage)).size
  const avgScore = data.reduce((sum, item) => sum + item.score, 0) / totalRatings
  
  const targetChanges = data.map(item => calculateTargetChange(item))
  const avgTargetChange = targetChanges.reduce((sum, change) => sum + change, 0) / targetChanges.length

  return {
    totalRatings,
    totalBrokerages: uniqueBrokerages,
    avgScore,
    avgTargetChange
  }
})

const uniqueBrokerages = computed(() => {
  return [...new Set(analyticsStore.data.map(item => item.brokerage))].sort()
})

const actionsDistribution = computed(() => {
  const actions = {}
  filteredData.value.forEach(item => {
    actions[item.action] = (actions[item.action] || 0) + 1
  })
  
  return Object.entries(actions)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const targetChangesStats = computed(() => {
  const changes = filteredData.value.map(item => calculateTargetChange(item))
  const increases = changes.filter(change => change > 0).length
  const decreases = changes.filter(change => change < 0).length
  const average = changes.reduce((sum, change) => sum + change, 0) / changes.length

  return { increases, decreases, average }
})

const topPerformers = computed(() => {
  return filteredData.value
    .map(item => ({
      ...item,
      targetChange: calculateTargetChange(item)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
})

const brokerageAnalysis = computed(() => {
  const brokerageMap = new Map()
  
  filteredData.value.forEach(item => {
    if (!brokerageMap.has(item.brokerage)) {
      brokerageMap.set(item.brokerage, [])
    }
    brokerageMap.get(item.brokerage).push(item)
  })
  
  return Array.from(brokerageMap.entries()).map(([name, items]) => ({
    name,
    count: items.length,
    avgScore: items.reduce((sum, item) => sum + item.score, 0) / items.length,
    avgTargetChange: items.reduce((sum, item) => sum + calculateTargetChange(item), 0) / items.length,
    avgConfidence: items.reduce((sum, item) => sum + item.confidence, 0) / items.length
  })).sort((a, b) => b.count - a.count)
})

const sentimentData = computed(() => {
  const total = filteredData.value.length
  if (total === 0) return { bullish: 0, bearish: 0, neutral: 0 }
  
  let bullish = 0, bearish = 0, neutral = 0
  
  filteredData.value.forEach(item => {
    const targetChange = calculateTargetChange(item)
    if (targetChange > 2) bullish++
    else if (targetChange < -2) bearish++
    else neutral++
  })
  
  return {
    bullish: (bullish / total) * 100,
    bearish: (bearish / total) * 100,
    neutral: (neutral / total) * 100
  }
})

const overallSentiment = computed(() => {
  const { bullish, bearish, neutral } = sentimentData.value
  
  if (bullish > bearish && bullish > neutral) {
    return {
      label: '🚀 ALCISTA',
      color: 'text-green-600',
      description: 'El mercado muestra optimismo'
    }
  } else if (bearish > bullish && bearish > neutral) {
    return {
      label: '📉 BAJISTA',
      color: 'text-red-600',
      description: 'Predominan las expectativas negativas'
    }
  } else {
    return {
      label: '⚖️ NEUTRAL',
      color: 'text-gray-600',
      description: 'Mercado en equilibrio'
    }
  }
})

const recentActivity = computed(() => {
  return [...filteredData.value]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 15)
})

// Methods
const calculateTargetChange = (item) => {
  const from = parseFloat(item.target_from.replace('$', ''))
  const to = parseFloat(item.target_to.replace('$', ''))
  return ((to - from) / from) * 100
}

const getScoreColorClass = (score) => {
  if (score >= 70) return 'text-green-600'
  if (score >= 50) return 'text-yellow-600'
  return 'text-red-600'
}

const getActionColor = (action) => {
  if (action.includes('raised')) return 'bg-green-500'
  if (action.includes('lowered')) return 'bg-red-500'
  if (action.includes('upgraded')) return 'bg-blue-500'
  if (action.includes('downgraded')) return 'bg-orange-500'
  return 'bg-gray-500'
}

const getActionBadgeClass = (action) => {
  if (action.includes('raised')) return 'bg-green-100 text-green-800'
  if (action.includes('lowered')) return 'bg-red-100 text-red-800'
  if (action.includes('upgraded')) return 'bg-blue-100 text-blue-800'
  if (action.includes('downgraded')) return 'bg-orange-100 text-orange-800'
  return 'bg-gray-100 text-gray-800'
}

const getRankingBadgeColor = (index) => {
  switch (index) {
    case 0: return 'bg-yellow-500'
    case 1: return 'bg-gray-400'
    case 2: return 'bg-yellow-600'
    default: return 'bg-blue-500'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const applyFilters = () => {
  // Los filtros se aplican automáticamente a través de computed properties
  console.log('Filtros aplicados:', filters)
}

const clearFilters = () => {
  Object.keys(filters).forEach(key => {
    filters[key] = ''
  })
}

onMounted(async () => {
  try {
    filtersStore.value.limit = -1
    await stockStore.fetchStocks();


    console.log(stocks.value)
   
    data.value = (stocks.value ?? { items: [] })

  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
});

// Watch for data changes
watch(() => analyticsStore.data, () => {
  console.log('Data updated in analytics')
}, { deep: true })
</script>

<style scoped>
/* Animaciones personalizadas */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Scrollbar personalizado */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>