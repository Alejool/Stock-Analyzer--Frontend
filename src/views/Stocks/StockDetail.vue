<!-- App.vue -->
<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Stock Ratings Dashboard</h1>
            <p class="text-sm text-gray-600">Análisis de recomendaciones de analistas</p>
          </div>

          <!-- Summary Stats -->
          <div class="flex space-x-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ stockData.length }}</div>
              <div class="text-xs text-gray-500">Total Items</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ totalBuyRecommendations }}</div>
              <div class="text-xs text-gray-500">Buy Ratings</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">{{ averageScore }}%</div>
              <div class="text-xs text-gray-500">Avg Score</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex-1 min-w-64">
            <label class="block text-sm font-medium text-gray-700 mb-1">Buscar por Ticker</label>
            <input v-model="searchTicker" type="text" placeholder="Ej: CSCO, URGN..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>

          <div class="flex-1 min-w-64">
            <label class="block text-sm font-medium text-gray-700 mb-1">Buscar por Brokerage</label>
            <input v-model="searchBrokerage" type="text" placeholder="Ej: Deutsche Bank..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>

          <div class="flex items-end">
            <button @click="clearFilters"
              class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors">
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>




      <!-- Stock Cards -->
      <div class="space-y-4">
        <!-- <div v-if="filteredItems?.length === 0" class="text-center py-12"> -->
        <div class="text-gray-400 text-lg mb-2">No se encontraron resultados</div>
        <p class="text-gray-500">Intenta modificar los filtros de búsqueda</p>
      </div>

      <!-- <TransitionGroup name="list" tag="div" class="space-y-4">
          <StockInfoCard 
            v-for="item in filteredItems" 
            :key="item.id" 
            :item="item"
            class="transform transition-all duration-300 hover:scale-[1.02]"
          />
        </TransitionGroup>
      </div> -->

      <!-- Refresh Button -->
      <!-- <div class="flex justify-center mt-8">
        <button
          @click="refreshData"
          :disabled="loading"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>{{ loading ? 'Actualizando...' : 'Actualizar Datos' }}</span>
        </button>
      </div> -->
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-sm text-gray-500">
          <!-- <p>Stock Ratings Dashboard • Última actualización: {{ lastUpdateFormatted }}</p> -->
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup >
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useStockStoreDetail } from '../../stores/stockStoreDetail'
import { useStockStore } from '../../stores/stockStore'
import StockInfoCard from '../../components/StockInfoCard.vue'

const route = useRoute();

const stockStoreDetail = useStockStoreDetail()
const stockStore = useStockStore()
const { stocks } = stockStore;
const { stockData, averageScore, totalBuyRecommendations } = stockStoreDetail;


// Reactive references
const searchTicker = ref('')
const searchBrokerage = ref('')

// Computed properties
const filteredItems = computed(() => {
  let filtered = stockData.value

  //   if (searchTicker.value) {
  //     filtered = stockStoreDetail.filterByTicker(searchTicker.value)
  //   }

  //   if (searchBrokerage.value) {
  //     filtered = filtered.filter(item => 
  //       item.brokerage.toLowerCase().includes(searchBrokerage.value.toLowerCase())
  //     )
  //   }

  return filtered
})

// const lastUpdateFormatted = computed(() => {
//   if (items?.value?.length === 0) return 'N/A'

//   const lastUpdate = items.value[0].last_update
//   return new Intl.DateTimeFormat('es-ES', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   }).format(new Date(lastUpdate))
// })

// Methods
const clearFilters = () => {
  searchTicker.value = ''
  searchBrokerage.value = ''
}

// const refreshData = async () => {
//   await stockStoreDetail.fetchStockData()
//   await nextTick();
// }

// Lifecycle
onMounted(async () => {
  // Get route params

  const stockId = route.params.id;

  // Fetch stocks data
  console.log(stocks);
  console.log('stockId', stockId);

  // Filter stocks by ID and store in stockData
  // if (stockId && stocks.value) {
  //   stockData.value = stocks.value.filter(stock => stock.id === stockId);
  // } else {
  //   stockData.value = stocks.value;
  // }
})

// Watchers
watch([searchTicker, searchBrokerage], () => {

})
</script>

<style scoped>
/* List transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>