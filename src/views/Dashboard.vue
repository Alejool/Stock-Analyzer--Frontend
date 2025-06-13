<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl p-6 text-white">
      <h1 class="text-2xl sm:text-3xl font-bold mb-2">Dashboard Principal</h1>
      <p class="text-white/80">Análisis de mercado en tiempo real</p>
    </div>

    <!-- Recomendación del Día -->
    <div class="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
          <span class="text-white text-xl">🏆</span>
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-800">Recomendación del Día</h2>
          <p class="text-gray-600 text-sm">La mejor oportunidad según nuestro algoritmo</p>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg p-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl font-bold text-gray-800">{{ topRecommendation.ticker }}</span>
              <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                {{ topRecommendation.rating }}
              </span>
            </div>
            <p class="text-gray-600 font-medium">{{ topRecommendation.company }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ topRecommendation.sector }}</p>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-orange-600 mb-1">{{ topRecommendation.score }}/100</div>
            <div class="text-sm text-gray-600">Precio objetivo: ${{ topRecommendation.targetPrice }}</div>
            <div class="text-xs text-gray-500 mt-1">Actualizado: {{ topRecommendation.lastUpdate }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top 5 Acciones -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Top 5 Acciones Recomendadas</h2>
      <div class="space-y-3">
        <div 
          v-for="(stock, index) in topStocks" 
          :key="stock.ticker"
          class="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
        >
          <div class="flex items-center gap-4">
            <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ index + 1 }}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-gray-800">{{ stock.ticker }}</span>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  stock.rating === 'BUY' ? 'bg-green-100 text-green-800' : 
                  stock.rating === 'HOLD' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                ]">
                  {{ stock.rating }}
                </span>
              </div>
              <p class="text-sm text-gray-600">{{ stock.company }}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold text-orange-600">{{ stock.score }}/100</div>
            <div class="text-sm text-gray-500">${{ stock.targetPrice }}</div>
          </div>
        </div>
      </div>
    </div>

    <div>
   
      <h1 class="text-2xl sm:text-3xl font-bold mb-2">Análisis y Estadísticas</h1>
      <p class="text-white/80">Insights y tendencias del mercado</p>
    </div>

    <!-- Métricas Generales -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl shadow-lg p-6 text-center">
        <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <span class="text-white text-xl">📊</span>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-1">{{ metrics.totalStocks }}</div>
        <div class="text-sm text-gray-600">Acciones Analizadas</div>
      </div>
      
      <div class="bg-white rounded-xl shadow-lg p-6 text-center">
        <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <span class="text-white text-xl">📈</span>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-1">{{ metrics.buyRecommendations }}</div>
        <div class="text-sm text-gray-600">Recomendaciones BUY</div>
      </div>
      
      <div class="bg-white rounded-xl shadow-lg p-6 text-center">
        <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <span class="text-white text-xl">🏢</span>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-1">{{ metrics.totalBrokerages }}</div>
        <div class="text-sm text-gray-600">Brokerages Activos</div>
      </div>
      
      <div class="bg-white rounded-xl shadow-lg p-6 text-center">
        <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <span class="text-white text-xl">🕒</span>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-1">{{ metrics.lastUpdate }}</div>
        <div class="text-sm text-gray-600">Última Actualización</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCounterStore } from '../stores/counter'
import { storeToRefs } from 'pinia'
import { Stock, Metrics } from '../types/dashboard'

const counterStore = useCounterStore();
const { increment, decrement, double} = counterStore;
const { count, name, doubledCount} = storeToRefs(counterStore);



const topRecommendation = ref<Stock>({
  ticker: 'AAPL',
  company: 'Apple Inc.',
  sector: 'Technology',
  rating: 'BUY',
  score: 95,
  targetPrice: 175.50,
  lastUpdate: 'Hace 2 horas'
})

const topStocks = ref<Stock[]>([
  {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    sector: 'Technology',
    rating: 'BUY',
    score: 95,
    targetPrice: 175.50,
    lastUpdate: 'Hace 2 horas'
  },
  {
    ticker: 'MSFT',
    company: 'Microsoft Corp.',
    sector: 'Technology',
    rating: 'BUY',
    score: 92,
    targetPrice: 420.00,
    lastUpdate: 'Hace 3 horas'
  },
  {
    ticker: 'GOOGL',
    company: 'Alphabet Inc.',
    sector: 'Technology',
    rating: 'BUY',
    score: 89,
    targetPrice: 145.25,
    lastUpdate: 'Hace 1 hora'
  },
  {
    ticker: 'NVDA',
    company: 'NVIDIA Corp.',
    sector: 'Technology',
    rating: 'HOLD',
    score: 85,
    targetPrice: 875.00,
    lastUpdate: 'Hace 4 horas'
  },
  {
    ticker: 'TSLA',
    company: 'Tesla Inc.',
    sector: 'Automotive',
    rating: 'BUY',
    score: 82,
    targetPrice: 285.75,
    lastUpdate: 'Hace 5 horas'
  }
])

const metrics = ref<Metrics>({
  totalStocks: 1247,
  buyRecommendations: 573,
  totalBrokerages: 28,
  lastUpdate: '15:30'
})

onMounted(() => {
  console.log('Dashboard cargado')
})
</script>