<template>
  <div class="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
    <div class="container mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-light mb-6 text-white">
          Dashboard de Inversiones
        </h1>
        <p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Análisis inteligente para decisiones rentables
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link
            to="/stocks" 
            class="bg-white text-slate-900 px-8 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors duration-200"
          >
            Ver Recomendaciones
          </router-link>
          <button class="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-slate-900 transition-colors duration-200">
            Análisis Detallado
          </button>
        </div>
      </div>

      <FeaturedRecommendation :recommendation="recommendation" />
    </div>
  </div>
</template>

<script setup>
import FeaturedRecommendation from './FeaturedRecommendation.vue'

defineProps({
  recommendation: {
    type: Object,
    default: () => ({})
  }
})
</script>