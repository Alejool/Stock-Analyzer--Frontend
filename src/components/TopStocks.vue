<template>
  <div class="bg-white rounded-xl shadow-sm p-8">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-light text-gray-900 mb-2">Top Oportunidades</h2>
      <p class="text-gray-600">Las mejores inversiones según nuestro algoritmo</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <StockCard 
        v-for="(stock, index) in stocks" 
        :key="stock.ticker"
        :stock="stock"
        :index="index"
      />
    </div>
    
    <div class="text-center mt-8">
      <router-link
        to="/stocks" 
        class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
      >
        Ver todas las recomendaciones
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import StockCard from './StockCard.vue'

defineProps({
  stocks: {
    type: Array,
    default: () => []
  }
})
</script>