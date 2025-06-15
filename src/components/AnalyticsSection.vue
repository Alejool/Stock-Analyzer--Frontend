<template>
  <div class="bg-white rounded-xl shadow-sm p-8">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-light text-gray-900 mb-2">Análisis del Mercado</h2>
      <p class="text-gray-600">Métricas clave y estadísticas en tiempo real</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard 
        value="1,247"
        label="Acciones Analizadas"
        color="blue"
      />
      <MetricCard 
        value="89.3%"
        label="Precisión del Modelo"
        color="green"
      />
      <MetricCard 
        value="+12.4%"
        label="Rendimiento Promedio"
        color="purple"
      />
      <MetricCard 
        value="24/7"
        label="Monitoreo Activo"
        color="amber"
      />
    </div>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <router-link
        to="/analytics"
        class="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
      >
        Ver Análisis Completo
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      </router-link>
      
      <router-link
        to="/reports"
        class="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
      >
        Descargar Reporte
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import MetricCard from './MetricCard.vue'
</script>