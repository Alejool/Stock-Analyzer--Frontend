<!-- StockInfoCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-4">
    <!-- Header Card -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"
        >
          <span class="text-orange-600 font-bold text-lg">{{
            item.ticker.charAt(0)
          }}</span>
        </div>
        <div>
          <h3 class="font-bold text-lg text-gray-800">{{ item.ticker }}</h3>
          <p class="text-sm text-gray-600">{{ item.company }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <span
          class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
        >
          {{ item.score }}%
        </span>
        <button
          @click="toggleDetails"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {{ showDetails ? "Ocultar" : "Mostrar más" }}
        </button>
      </div>
    </div>

    <!-- Action Info -->
    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-gray-600">{{ item.action }}</span>
        <span class="text-sm font-medium text-gray-800">{{
          item.brokerage
        }}</span>
      </div>

      <!-- Confidence Bar -->
      <div class="flex items-center mb-3">
        <span class="text-sm text-gray-600 mr-2">Confianza</span>
        <div class="flex-1 bg-gray-200 rounded-full h-2">
          <div
            class="bg-green-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${item.confidence * 100}%` }"
          ></div>
        </div>
        <span class="text-sm font-medium text-gray-800 ml-2"
          >{{ Math.round(item.confidence * 100) }}%</span
        >
      </div>

      <!-- Rating Change -->
      <div class="flex items-center justify-between">
        <div class="text-center">
          <p class="text-xs text-gray-500 uppercase tracking-wide">ANTERIOR</p>
          <p class="font-semibold text-gray-700">{{ item.rating_from }}</p>
        </div>
        <div class="flex-1 flex items-center justify-center">
          <div class="w-8 h-0.5 bg-gray-300"></div>
          <svg
            class="w-4 h-4 text-gray-400 mx-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-500 uppercase tracking-wide">NUEVO</p>
          <p class="font-semibold text-green-600">{{ item.rating_to }}</p>
        </div>
      </div>
    </div>

    <!-- Price Targets -->
    <div class="flex items-center justify-center space-x-4 mb-4">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <span class="text-sm text-gray-600">Cambio Precio</span>
      </div>
      <span class="font-semibold text-lg"
        >{{ item.target_from }} → {{ item.target_to }}</span
      >
    </div>

    <!-- Timestamp -->
    <div class="text-center">
      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
        📅 {{ formatDate(item.time) }}
      </span>
    </div>

    <!-- Detailed Info (Expandable) -->
    <transition name="slide-fade">
      <div v-if="showDetails" class="mt-6 border-t pt-4">
        <h4 class="font-semibold text-gray-800 mb-4">Información Detallada</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Statistics -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h5 class="font-medium text-gray-700 mb-3">Estadísticas</h5>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Total Registros:</span>
                <span class="text-sm font-medium">{{
                  item.total_register.toLocaleString()
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Recomendaciones Buy:</span>
                <span class="text-sm font-medium text-green-600">{{
                  item.buy_count
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Total Brokerages:</span>
                <span class="text-sm font-medium">{{
                  item.total_brokerages
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Score:</span>
                <span class="text-sm font-medium">{{ item.score }}%</span>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h5 class="font-medium text-gray-700 mb-3">Timeline</h5>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Creado:</span>
                <span class="text-sm font-medium">{{
                  formatDate(item.created_at)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Actualizado:</span>
                <span class="text-sm font-medium">{{
                  formatDate(item.updated_at)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Última Actualización:</span>
                <span class="text-sm font-medium">{{
                  formatDate(item.last_update)
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Buy Recommendation Percentage -->
        <div class="mt-4 bg-green-50 rounded-lg p-4">
          <h5 class="font-medium text-green-800 mb-2">
            Porcentaje de Recomendaciones Buy
          </h5>
          <div class="flex items-center">
            <div class="flex-1 bg-green-200 rounded-full h-3">
              <div
                class="bg-green-500 h-3 rounded-full transition-all duration-500"
                :style="{ width: `${buyPercentage}%` }"
              ></div>
            </div>
            <span class="ml-3 text-sm font-semibold text-green-700"
              >{{ buyPercentage.toFixed(1) }}%</span
            >
          </div>
          <p class="text-xs text-green-600 mt-1">
            {{ item.buy_count }} de {{ item.total_register }} recomendaciones
            son "Buy"
          </p>
        </div>

        <!-- ID Info -->
        <div class="mt-4 text-center">
          <span
            class="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded"
          >
            ID: {{ item.id }}
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface StockItem {
  id: number;
  ticker: string;
  company: string;
  brokerage: string;
  action: string;
  rating_from: string;
  rating_to: string;
  target_from: string;
  target_to: string;
  time: string;
  created_at: string;
  updated_at: string;
  score: number;
  confidence: number;
  total_register: number;
  buy_count: number;
  total_brokerages: number;
  last_update: string;
}

interface Props {
  item: StockItem;
}

const props = defineProps<Props>();
const showDetails = ref(false);

const buyPercentage = computed(() => {
  return (props.item.buy_count / props.item.total_register) * 100;
});

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
