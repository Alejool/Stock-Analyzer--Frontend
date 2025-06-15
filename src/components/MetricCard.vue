<template>
  <div class="bg-white/10 rounded-lg p-4">
    <div :class="valueClasses" class="text-2xl font-light mb-1">
      {{ value }}
    </div>
    <div class="text-white/70 text-sm">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'white'
  }
})

const valueClasses = computed(() => {
  const colorMap = {
    green: 'text-green-300',
    blue: 'text-blue-300',
    purple: 'text-purple-300',
    amber: 'text-amber-300',
    white: 'text-white'
  }
  return colorMap[props.color] || 'text-white'
})
</script>