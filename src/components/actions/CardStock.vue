<template>
  <div>
    <!-- <div class="absolute -top-3 -left-3 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
      {{ index + 1 }}
    </div> -->

    <!-- Score Badge -->
    <div :class="[
      `absolute -top-3 -right-3 px-3 py-2 ${getConfidenceColor(stock?.confidence)} 
      text-white rounded-full text-xs font-semibold 
      shadow-md shadow-blue-500/40 hover:shadow-blue-500/75`
    ]">
      {{ stock?.score || 0 }} %
    </div>

    <!-- Stock Header -->
    <div class="flex items-center justify-between mb-4 mt-6">
      <h3 class="text-4xl font-bold text-gray-900">
        {{ stock?.ticker || "-" }}
      </h3>
      <span :class="[
        'px-3 py-1.5 rounded-lg text-xs font-medium border',
        getRatingColor(stock?.current_rating || stock?.rating_to)
      ]">
        {{ stock?.current_rating || stock?.rating_to || "-" }}
      </span>
    </div>

    <!-- Company Info -->
    <div class=" h-32">
      <p class="text-2xl font-semibold text-gray-800 mb-2">
        {{ stock?.company || "-" }}
      </p>
      <div class="flex items-center gap-3 h-20 text-md text-gray-600">
        <span class="font-medium">{{ stock?.action || "-" }}</span>
        <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
        <span>{{ stock?.brokerage || "-" }}</span>
      </div>
    </div>

    <!-- Confidence Score -->
    <div class="mb-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">Confianza</span>
        <span :class="[`text-sm font-semibold text-${getConfidenceColor(stock?.confidence)}`]">
          {{ Math.round((stock?.confidence || 0) * 100) }}%
        </span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div class="h-2 rounded-full transition-all duration-300" :class="getConfidenceBarColor(stock?.confidence)"
          :style="{ width: `${(stock?.confidence || 0) * 100}%` }"></div>
      </div>
    </div>

    <!-- Ratings Info -->
    <div class="bg-gray-50 rounded-xl p-4 mb-6">
      <div class="grid grid-cols-2 gap-4 text-center">
        <div>
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Anterior
          </p>
          <p class="text-sm font-semibold text-gray-700">
            {{ stock?.rating_from || "-" }}
          </p>
        </div>
        <div class="border-l border-gray-200 pl-4">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Nuevo
          </p>
          <p class="text-sm font-semibold text-gray-900">
            {{ stock?.rating_to || "-" }}
          </p>
        </div>
      </div>
    </div>

    <!-- Target Price -->
    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6">
      <span class="text-sm font-medium text-gray-700 flex items-center gap-2">
        <span class="text-gray-400">🎯</span>
        Cambio Precio
      </span>
      <div class="flex items-center gap-2 text-sm font-semibold">
        <span class="text-gray-500">{{ stock?.target_from || "-" }}</span>
        <span class="text-gray-400">→</span>
        <span class="text-gray-900">{{ stock?.target_to || "-" }}</span>
      </div>
    </div>

    <div>
      <p class="text-center">📅 {{ formatDate(stock?.time) }}</p>
    </div>

    <!-- Reason -->
    <div v-if="stock?.reason" class="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <p class="text-sm text-blue-800">
        <span class="font-medium">Razón:</span> {{ stock.reason }}
      </p>
    </div>

  
    <!-- Action Button -->
    <!-- <router-link
      to="/stocks"
      class="block mt-8
       bg-gray-900 text-white 
       px-6 py-3 rounded-xl font-medium 
       text-center text-sm hover:bg-gray-800 
       transition-colors duration-200"
    >
      Agregar a waitlist
    </router-link> -->
  </div>
</template>



<script setup>
defineProps({
  stock: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  // Use browser's local timezone instead of fixed timezone
  return date.toLocaleString(navigator.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getRatingColor = (rating) => {
  if (!rating) return 'bg-gray-50 text-gray-700 border-gray-200';

  switch (rating.toLowerCase()) {
    case 'buy':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'hold':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'sell':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getConfidenceColor = (confidence) => {
  if (!confidence) return 'bg-gray-600';
  if (confidence >= 0.8) return 'bg-green-600';
  if (confidence >= 0.6) return 'bg-amber-600';
  return 'bg-red-600';
};

const getConfidenceBarColor = (confidence) => {
  if (!confidence) return 'bg-gray-400';
  if (confidence >= 0.8) return 'bg-green-500';
  if (confidence >= 0.6) return 'bg-amber-500';
  return 'bg-red-500';
};
</script>