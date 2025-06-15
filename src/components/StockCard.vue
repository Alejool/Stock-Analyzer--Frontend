<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-semibold text-gray-900">
        {{ stock?.ticker || "-" }}
      </h3>
      <RatingBadge :rating="stock?.current_rating || stock?.rating_to" />
    </div>

    <!-- Company Info -->
    <div class="mb-4">
      <p class="text-gray-700 font-medium mb-1">
        {{ stock?.company || "-" }}
      </p>
      <p class="text-sm text-gray-500">
        {{ stock?.brokerage || "-" }}
      </p>
    </div>

    <!-- Score -->
    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-gray-600">Puntuación</span>
        <span class="text-sm font-semibold text-gray-900">
          {{ stock?.score || 0 }}/100
        </span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
          :style="{ width: `${stock?.score || 0}%` }"
        ></div>
      </div>
    </div>

    <!-- Target Price -->
    <div class="mb-6">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600">Precio objetivo</span>
        <span class="font-semibold text-gray-900">
          {{ stock?.target_to || stock?.target_price || "-" }}
        </span>
      </div>
    </div>

    <!-- Action Button -->
    <router-link
      to="/stocks"
      class="block w-full bg-gray-900 text-white text-center py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
    >
      Ver detalles
    </router-link>
  </div>
</template>

<script setup>
import RatingBadge from './RatingBadge.vue'

defineProps({
  stock: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>