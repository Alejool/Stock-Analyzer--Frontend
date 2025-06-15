<template>
  <span :class="badgeClasses" class="px-3 py-1 rounded-full text-xs font-medium">
    {{ rating || "-" }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  rating: {
    type: String,
    default: ''
  }
})

const badgeClasses = computed(() => {
  if (!props.rating) return 'bg-gray-100 text-gray-700'
  
  switch (props.rating.toLowerCase()) {
    case 'buy':
      return 'bg-green-100 text-green-700'
    case 'hold':
      return 'bg-amber-100 text-amber-700'
    case 'sell':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
})
</script>