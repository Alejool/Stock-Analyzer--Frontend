<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl p-6 text-white">
      <h1 class="text-2xl sm:text-3xl font-bold mb-2">Lista de Acciones</h1>
      <p class="text-white/80">Explora todas las acciones analizadas</p>
    </div>

    <!-- Filtros y Búsqueda -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <!-- Búsqueda -->
        <div class="lg:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <div class="relative">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Buscar por ticker o empresa..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        <!-- Filtro por Rating -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <select
            v-model="selectedRating"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="BUY">BUY</option>
            <option value="HOLD">HOLD</option>
            <option value="SELL">SELL</option>
          </select>
        </div>

        <!-- Filtro por Brokerage -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Brokerage</label>
          <select
            v-model="selectedBrokerage"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option v-for="brokerage in brokerages" :key="brokerage" :value="brokerage">
              {{ brokerage }}
            </option>
          </select>
        </div>
      </div>

      <!-- Ordenamiento -->
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="sortOption in sortOptions"
          :key="sortOption.key"
          @click="setSortBy(sortOption.key)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
            sortBy === sortOption.key
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ sortOption.label }}
          <span v-if="sortBy === sortOption.key" class="ml-1">
            {{ sortOrder === 'asc' ? '↑' : '↓' }}
          </span>
        </button>
      </div>

      <!-- Resultados -->
      <div class="text-sm text-gray-600 mb-4">
        Mostrando {{ filteredStocks.length }} de {{ stocks.length }} acciones
      </div>
    </div>

    <!-- Tabla de Acciones -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acción
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio Objetivo
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brokerage
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="stock in paginatedStocks" 
              :key="`${stock.ticker}-${stock.brokerage}`"
              class="hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-bold text-gray-900">{{ stock.ticker }}</span>
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      stock.rating === 'BUY' ? 'bg-green-100 text-green-800' : 
                      stock.rating === 'HOLD' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    ]">
                      {{ stock.rating }}
                    </span>
                  </div>
                  <div class="text-sm text-gray-600">{{ stock.company }}</div>
                  <div class="text-xs text-gray-500">{{ stock.sector }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  stock.rating === 'BUY' ? 'bg-green-100 text-green-800' : 
                  stock.rating === 'HOLD' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                ]">
                  {{ stock.rating }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      :class="[
                        'h-2 rounded-full',
                        stock.score >= 80 ? 'bg-green-500' :
                        stock.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      ]"
                      :style="{ width: `${stock.score}%` }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ stock.score }}/100</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ stock.targetPrice.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ stock.brokerage }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ stock.date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  @click="viewDetails(stock.ticker)"
                  class="text-orange-600 hover:text-orange-900 transition-colors duration-200"
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <p class="text-sm text-gray-700">
              Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a 
              {{ Math.min(currentPage * itemsPerPage, filteredStocks.length) }} de 
              {{ filteredStocks.length }} resultados
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span class="px-3 py-2 text-sm text-gray-700">
              Página {{ currentPage }} de {{ totalPages }}
            </span>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface StockItem {
  ticker: string
  company: string
  sector: string
  rating: 'BUY' | 'HOLD' | 'SELL'
  score: number
  targetPrice: number
  brokerage: string
  date: string
}

// Estado reactivo
const searchTerm = ref('')
const selectedRating = ref('')
const selectedBrokerage = ref('')
const sortBy = ref('score')
const sortOrder = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Opciones de ordenamiento
const sortOptions = [
  { key: 'score', label: 'Score' },
  { key: 'targetPrice', label: 'Precio Objetivo' },
  { key: 'date', label: 'Fecha' },
  { key: 'ticker', label: 'Ticker' }
]

// Datos de ejemplo
const stocks = ref<StockItem[]>([
  {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    sector: 'Technology',
    rating: 'BUY',
    score: 95,
    targetPrice: 175.50,
    brokerage: 'Goldman Sachs',
    date: '2025-06-12'
  },
  {
    ticker: 'MSFT',
    company: 'Microsoft Corp.',
    sector: 'Technology',
    rating: 'BUY',
    score: 92,
    targetPrice: 420.00,
    brokerage: 'Morgan Stanley',
    date: '2025-06-11'
  },
  {
    ticker: 'GOOGL',
    company: 'Alphabet Inc.',
    sector: 'Technology',
    rating: 'HOLD',
    score: 78,
    targetPrice: 145.25,
    brokerage: 'JP Morgan',
    date: '2025-06-10'
  },
  // Más datos de ejemplo...
])

const brokerages = computed(() => {
  return [...new Set(stocks.value.map(stock => stock.brokerage))].sort()
})

const filteredStocks = computed(() => {
  let filtered = stocks.value

  // Filtrar por búsqueda
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(stock => 
      stock.ticker.toLowerCase().includes(term) ||
      stock.company.toLowerCase().includes(term)
    )
  }

  // Filtrar por rating
  if (selectedRating.value) {
    filtered = filtered.filter(stock => stock.rating === selectedRating.value)
  }

  // Filtrar por brokerage
  if (selectedBrokerage.value) {
    filtered = filtered.filter(stock => stock.brokerage === selectedBrokerage.value)
  }

  // Ordenar
  filtered.sort((a, b) => {
    const aValue = a[sortBy.value as keyof StockItem]
    const bValue = b[sortBy.value as keyof StockItem]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder.value === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    } else {
      return sortOrder.value === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    }
  })

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredStocks.value.length / itemsPerPage.value)
})

const paginatedStocks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredStocks.value.slice(start, end)
})

const setSortBy = (key: string) => {
  if (sortBy.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = key
    sortOrder.value = 'desc'
  }
  currentPage.value = 1
}

const viewDetails = (ticker: string) => {
  // Navegar a la página de detalles
  console.log(`Ver detalles de ${ticker}`)
}

onMounted(() => {
  // Cargar datos reales desde la API
  console.log('Lista de acciones cargada')
})
</script>