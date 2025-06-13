
<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
    <!-- Header con gradiente -->
    <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold">{{ recommendation.ticker }}</h3>
          <p class="text-green-100 text-sm">{{ recommendation.company }}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold">{{ Math.round(recommendation.score) }}</div>
          <div class="text-green-100 text-sm">Score</div>
        </div>
      </div>
    </div>

    <!-- Contenido -->
    <div class="p-6">
      <!-- Métricas principales -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="text-center p-3 bg-gray-50 rounded-lg">
          <div class="text-lg font-semibold text-gray-900">{{ recommendation.current_rating }}</div>
          <div class="text-sm text-gray-600">Rating Actual</div>
        </div>
        <div class="text-center p-3 bg-gray-50 rounded-lg">
          <div class="text-lg font-semibold text-gray-900">{{ recommendation.target_price }}</div>
          <div class="text-sm text-gray-600">Precio Objetivo</div>
        </div>
      </div>

      <!-- Barra de confianza -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-700">Confianza</span>
          <span class="text-sm text-gray-600">{{ Math.round(recommendation.confidence * 100) }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${recommendation.confidence * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Razón -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-700 mb-2">¿Por qué recomendamos?</h4>
        <p class="text-sm text-gray-600 leading-relaxed">{{ recommendation.reason }}</p>
      </div>

      <!-- Botón de acción -->
      <button class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium">
        Ver Análisis Completo
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recommendation } from '@/types'

defineProps<{
  recommendation: Recommendation
}>()
</script>




