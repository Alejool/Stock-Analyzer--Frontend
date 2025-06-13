<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-orange-500 via-purple-600 to-indigo-700 text-white">
      <div class="container mx-auto px-6 py-12">
        <div class="text-center mb-8">
          <h1 class="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
            Dashboard de Inversiones
          </h1>
          <p class="text-xl text-white/90 mb-8">Análisis inteligente • Decisiones rentables • Tiempo real</p>
          
          <!-- CTA Principal -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button class="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transform hover:scale-105 transition-all duration-200 shadow-xl">
              🚀 Ver Todas las Recomendaciones
            </button>
            <button class="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200">
              📊 Análisis Detallado
            </button>
          </div>
        </div>

        <!-- Recomendación Destacada -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div class="text-center mb-6">
            <div class="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold mb-4">
              ⭐ OPORTUNIDAD DESTACADA
            </div>
            <h2 class="text-3xl font-bold mb-2">{{ topRecommendation.ticker }}</h2>
            <p class="text-xl text-white/90">{{ topRecommendation.company }}</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div class="bg-white/10 rounded-xl p-4">
              <div class="text-3xl font-bold text-green-300 mb-1">{{ topRecommendation.score }}/100</div>
              <div class="text-white/80">Puntuación IA</div>
            </div>
            <div class="bg-white/10 rounded-xl p-4">
              <div class="text-3xl font-bold text-orange-300 mb-1">${{ topRecommendation.targetPrice }}</div>
              <div class="text-white/80">Precio Objetivo</div>
            </div>
            <div class="bg-white/10 rounded-xl p-4">
              <div class="text-2xl font-bold text-purple-300 mb-1">{{ topRecommendation.rating }}</div>
              <div class="text-white/80">Recomendación</div>
            </div>
          </div>
          
          <div class="text-center mt-6">
            <button class="bg-gradient-to-r from-green-400 to-green-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-xl">
              💰 INVERTIR AHORA
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-12 space-y-12">

      <!-- Top 5 Acciones Recomendadas -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">🏆 Top 5 Oportunidades</h2>
          <p class="text-gray-600">Las mejores inversiones según nuestro algoritmo de IA</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            v-for="(stock, index) in topStocks" 
            :key="stock.ticker"
            class="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
          >
            <!-- Ranking Badge -->
            <div class="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {{ index + 1 }}
            </div>
            
            <!-- Stock Info -->
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-800">{{ stock.ticker }}</h3>
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-bold',
                  stock.rating === 'BUY' ? 'bg-green-100 text-green-700 border border-green-200' : 
                  stock.rating === 'HOLD' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 
                  'bg-red-100 text-red-700 border border-red-200'
                ]">
                  {{ stock.rating }}
                </span>
              </div>
              <p class="text-gray-600 font-medium mb-1">{{ stock.company }}</p>
              <p class="text-sm text-gray-500">{{ stock.sector }}</p>
            </div>
            
            <!-- Metrics -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Puntuación IA:</span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-gradient-to-r from-orange-500 to-purple-600 rounded-full transition-all duration-500"
                      :style="{ width: stock.score + '%' }"
                    ></div>
                  </div>
                  <span class="font-bold text-orange-600">{{ stock.score }}/100</span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Precio objetivo:</span>
                <span class="font-bold text-green-600 text-lg">${{ stock.targetPrice }}</span>
              </div>
            </div>
            
            <!-- Action Button -->
            <button class="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-orange-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md group-hover:shadow-lg">
              📈 Analizar
            </button>
          </div>
        </div>
        
        <!-- Ver Más Button -->
        <div class="text-center mt-8">
          <button class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-bold transition-all duration-200">
            Ver Todas las Recomendaciones →
          </button>
        </div>
      </div>

      <!-- Métricas y Estadísticas -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">📊 Análisis en Tiempo Real</h2>
          <p class="text-gray-600">Insights y tendencias del mercado actualizados constantemente</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Métrica 1 -->
          <div class="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center border border-orange-200 hover:shadow-lg transition-all duration-300">
            <div class="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="text-white text-2xl">📊</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">{{ metrics.totalStocks.toLocaleString() }}</div>
            <div class="text-sm font-medium text-gray-600">Acciones Analizadas</div>
            <div class="text-xs text-orange-600 mt-1">+127 esta semana</div>
          </div>
          
          <!-- Métrica 2 -->
          <div class="relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border border-green-200 hover:shadow-lg transition-all duration-300">
            <div class="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="text-white text-2xl">📈</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">{{ metrics.buyRecommendations }}</div>
            <div class="text-sm font-medium text-gray-600">Recomendaciones BUY</div>
            <div class="text-xs text-green-600 mt-1">↗️ +15% vs mes anterior</div>
          </div>
          
          <!-- Métrica 3 -->
          <div class="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200 hover:shadow-lg transition-all duration-300">
            <div class="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="text-white text-2xl">🏢</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">{{ metrics.totalBrokerages }}</div>
            <div class="text-sm font-medium text-gray-600">Brokerages Activos</div>
            <div class="text-xs text-blue-600 mt-1">Cobertura global</div>
          </div>
          
          <!-- Métrica 4 -->
          <div class="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center border border-purple-200 hover:shadow-lg transition-all duration-300">
            <div class="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="text-white text-2xl">🕒</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">{{ metrics.lastUpdate }}</div>
            <div class="text-sm font-medium text-gray-600">Última Actualización</div>
            <div class="text-xs text-purple-600 mt-1">Datos en vivo</div>
          </div>
        </div>
        
        <!-- Call to Action Final -->
        <div class="mt-12 text-center bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">¿Listo para invertir inteligentemente?</h3>
          <p class="text-white/90 mb-6">Únete a miles de inversores que ya confían en nuestro algoritmo de IA</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-200">
              🚀 Comenzar Ahora
            </button>
            <button class="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-purple-600 transition-all duration-200">
              📞 Hablar con Experto
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Stock, Metrics } from '../types/dashboard'


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