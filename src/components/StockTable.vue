// src/components/StockTable.vue
<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
      <h2 class="text-xl font-bold text-white">Análisis de Acciones</h2>
      <p class="text-blue-100">{{ stocks.length }} acciones encontradas</p>
    </div>

    <!-- Filtros -->
    <div class="p-6 bg-gray-50 border-b">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ticker</label>
          <input
            v-model="localFilters.ticker"
            type="text"
            placeholder="Ej: AAPL"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @input="debounceFilter"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
          <input
            v-model="localFilters.company"
            type="text"
            placeholder="Nombre de empresa"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @input="debounceFilter"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Brokerage</label>
          <select
            v-model="localFilters.brokerage"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="applyFilters"
          >
            <option value="">Todos</option>
            <option v-for="brokerage in uniqueBrokerages" :key="brokerage" :value="brokerage">
              {{ brokerage }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
          <select
            v-model="localFilters.sort_by"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="applyFilters"
          >
            <option value="time">Fecha</option>
            <option value="ticker">Ticker</option>
            <option value="company">Empresa</option>
            <option value="rating_to">Rating</option>
          </select>
        </div>
      </div>
      
      <div class="mt-4 flex justify-between items-center">
        <button
          @click="clearAllFilters"
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Limpiar Filtros
        </button>
        
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">Orden:</span>
          <button
            @click="toggleOrder"
            :class="['px-3 py-1 text-sm rounded-md', localFilters.order === 'desc' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800']"
          >
            {{ localFilters.order === 'desc' ? '↓ Desc' : '↑ Asc' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="p-8 text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Cargando acciones...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="p-8 text-center">
      <div class="text-red-600 mb-2">⚠️ Error</div>
      <p class="text-gray-600">{{ error }}</p>
    </div>

    <!-- Tabla -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ticker
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Empresa
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Brokerage
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acción
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio Objetivo
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="stock in stocks"
            :key="stock.id"
            class="hover:bg-gray-50 transition-colors duration-200"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {{ stock.ticker.charAt(0) }}
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">{{ stock.ticker }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900 max-w-xs truncate" :title="stock.company">
                {{ stock.company }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ stock.brokerage }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getActionBadgeClass(stock.action)" class="px-2 py-1 text-xs font-semibold rounded-full">
                {{ stock.action }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-2">
                <span :class="getRatingClass(stock.rating_from)" class="px-2 py-1 text-xs rounded">
                  {{ stock.rating_from }}
                </span>
                <span class="text-gray-400">→</span>
                <span :class="getRatingClass(stock.rating_to)" class="px-2 py-1 text-xs rounded font-semibold">
                  {{ stock.rating_to }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <div v-if="stock.target_from && stock.target_to" class="text-gray-900">
                <span class="text-gray-500">{{ stock.target_from }}</span>
                <span class="mx-1 text-gray-400">→</span>
                <span class="font-semibold">{{ stock.target_to }}</span>
              </div>
              <div v-else class="text-gray-400">-</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(stock.time) }}
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Paginación -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Mostrando {{ stocks.length }} resultados
          </div>
          <div class="flex space-x-2">
            <button
              @click="previousPage"
              :disabled="currentPage <= 1"
              class="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Anterior
            </button>
            <span class="px-3 py-2 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded-md">
              {{ currentPage }}
            </span>
            <button
              @click="nextPage"
              class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
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
import { ref, computed, onMounted, watch } from 'vue'
import { useStockStore } from '@/stores/stockStore'
import type { StockFilters } from '@/types'

const stockStore = useStockStore()

// Props
const { stocks, loading, error, filters } = storeToRefs(stockStore)

// Local state
const localFilters = ref<StockFilters>({ ...filters.value })
const debounceTimer = ref<number>()

// Computed
const currentPage = computed(() => filters.value.page || 1)

const uniqueBrokerages = computed(() => {
  const brokerages = stocks.value.map(stock => stock.brokerage)
  return [...new Set(brokerages)].sort()
})

// Methods
function debounceFilter() {
  clearTimeout(debounceTimer.value)
  debounceTimer.value = setTimeout(() => {
    applyFilters()
  }, 500)
}

function applyFilters() {
  stockStore.updateFilters(localFilters.value)
}

function clearAllFilters() {
  localFilters.value = {
    page: 1,
    limit: 20,
    sort_by: 'time',
    order: 'desc'
  }
  stockStore.clearFilters()
}

function toggleOrder() {
  localFilters.value.order = localFilters.value.order === 'desc' ? 'asc' : 'desc'
  applyFilters()
}

function previousPage() {
  if (currentPage.value > 1) {
    localFilters.value.page = currentPage.value - 1
    applyFilters()
  }
}

function nextPage() {
  localFilters.value.page = currentPage.value + 1
  applyFilters()
}

function getActionBadgeClass(action: string): string {
  if (action.toLowerCase().includes('upgrade')) {
    return 'bg-green-100 text-green-800'
  }
  if (action.toLowerCase().includes('downgrade')) {
    return 'bg-red-100 text-red-800'
  }
  return 'bg-blue-100 text-blue-800'
}

function getRatingClass(rating: string): string {
  const ratingLower = rating?.toLowerCase() || ''
  
  if (ratingLower.includes('buy') || ratingLower.includes('outperform')) {
    return 'bg-green-100 text-green-800'
  }
  if (ratingLower.includes('sell') || ratingLower.includes('underperform')) {
    return 'bg-red-100 text-red-800'
  }
  if (ratingLower.includes('hold') || ratingLower.includes('neutral')) {
    return 'bg-yellow-100 text-yellow-800'
  }
  return 'bg-gray-100 text-gray-800'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Lifecycle
onMounted(() => {
  stockStore.fetchStocks()
})

// Watch for filter changes
watch(filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })
</script>