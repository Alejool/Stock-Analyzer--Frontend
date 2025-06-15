<template>
  <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
    <div class="text-center mb-6">
      <div class="inline-flex items-center gap-2 bg-amber-400 text-amber-900 px-4 py-2 rounded-full text-sm font-medium mb-4">
        ⭐ Recomendación Destacada
      </div>
      <h2 class="text-3xl font-light mb-2">{{ recommendation.ticker || '-' }}</h2>
      <p class="text-lg text-white/80">{{ recommendation.company || '-' }}</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <MetricCard 
        :value="recommendation.score ? `${recommendation.score}/100` : '-'"
        label="Puntuación IA"
        color="green"
      />
      <MetricCard 
        :value="recommendation.target_price || '-'"
        label="Precio Objetivo"
        color="blue"
      />
      <MetricCard 
        :value="recommendation.current_rating || '-'"
        label="Recomendación"
        color="purple"
      />
    </div>

    <div v-if="recommendation.confidence" class="text-center mt-6">
      <p class="text-white/90">
        <span class="font-bold text-2xl">{{ Math.round(recommendation.confidence * 100) }}%</span>
        de confianza
      </p>
    </div>
  </div>
</template>

<script setup>
import MetricCard from './MetricCard.vue'

defineProps({
  recommendation: {
    type: Object,
    default: () => ({})
  }
})
</script>