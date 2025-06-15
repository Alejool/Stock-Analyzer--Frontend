<template>
  <div class="bg-gray-50">
    <!-- Hero Section -->
      <SectionSubHeader />

        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              🏆 Todas las oportunidades
            </h2>
            <p class="text-gray-600">
              Las mejores inversiones según nuestro algoritmo 
            </p>
          </div>

          <!-- Filtros -->
          <div class="mb-8 bg-gray-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">🔍 Filtros de Búsqueda</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <!-- Filtro por Rating -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                Rating
                </label>
                <select 
                  v-model="filters.rating" 
                  @change="applyFilters"
                  class="w-full px-3 py-2 border  
                   text-gray-700 border-gray-300 font-bold
                    rounded-lg focus:ring-2 focus:ring-orange-500
                     focus:border-orange-500"
                >
                  <option  value="">Todos los ratings</option>
                  <option value="Buy">Buy</option>
                  <option value="Hold">Hold</option>
                  <option value="Sell">Sell</option>
                </select>
              </div>

              <!-- Filtro por Brokerage -->
              <div>
                <label class="block text-sm font-medium text-gray-700 
                mb-2">Brokerage</label>
                <select 
                  v-model="filters.brokerage" 
                  @change="applyFilters"
                  class="w-full px-3 py-2 border 
                  text-gray-700 border-gray-300 font-bold
                   rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Todos los brokerages</option>
                  <option v-for="broker in uniqueBrokerages" :key="broker" :value="broker">
                    {{ broker }}
                  </option>
                </select>
              </div>

              <!-- Filtro por Score -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Score Mínimo</label>
                <input 
                  v-model="filters.minScore" 
                  @input="applyFilters"
                  type="range" 
                  min="0" 
                  max="100" 
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                >
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span class="font-semibold">{{ filters.minScore }}</span>
                  <span>100</span>
                </div>
              </div>

              <!-- Búsqueda por texto -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                <input 
                  v-model="filters.search" 
                  @input="applyFilters"
                  type="text" 
                  placeholder="Ticker o empresa..."
                  class="w-full px-3 py-2 border 
                  text-gray-700 border-gray-300 font-bold
                   rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
              </div>
            </div>

            <!-- Filtros adicionales en una fila -->
            <div class="flex flex-wrap gap-4 items-center justify-between mt-8">
              <div class="flex items-center">
                <input 
                  v-model="filters.onlyHighConfidence" 
                  @change="applyFilters"
                  type="checkbox" 
                  id="highConfidence"
                  class="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                >
                <label for="highConfidence" class="text-sm font-medium text-gray-700">
                  Solo alta confianza (>80%)
                </label>
              </div>
              <div class="flex items-center">
                <select
                  v-model="filters.quantity"
                  @change="applyFilters"
                  class="px-3 py-2 border text-gray-700
                   border-gray-300 font-bold rounded-lg 
                   focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">Ver todos</option>
                  <option value="10">10 elementos</option>
                  <option value="20">20 elementos</option>
                  <option value="50">50 elementos</option>
                  <option value="100">100 elementos</option>
                  <option value="200">200 elementos</option>
                  <option value="500">500 elementos</option>
                  <option value="2000">2000 elementos</option>
                </select>
              </div>

              <button 
                @click="clearFilters"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                🗑️ Limpiar filtros
              </button>

            </div>
              <div class="text-sm text-gray-600 flex justify-end w-full">
                Mostrando {{ filteredStocks.length }} de {{ stocks.length }} resultados
              </div>
          </div>

          <!-- Carrusel de Stocks -->
          <div class="relative ">
            <div class="overflow-hidden rounded-xl">
              <div 
                class="flex transition-transform duration-500 ease-in-out "
                :style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }"
                ref="carousel"
              >
                <div v-if="filteredStocks.length === 0" class=" w-full p-3">
                  <div class="flex align-center justify-center h-full">
                    <div class="text-gray-800 text-2xl text-center ">
                      No hay resultados para esta búsqueda
                    </div>
                  </div>
                </div>
                <div 
                  v-for="(stock, index) in filteredStocks" 
                  :key="stock.id || stock.ticker + index"
                  class="flex-shrink-0  mx-auto p-3"
                  :style="{ width: `${cardWidth}px` }"
                >
                  <div class="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group h-full">
                    <CardStock :stock="stock" :index="index" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Controles del carrusel -->
            <button 
              @click="prevSlide" 
              :disabled="currentSlide === 0"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              @click="nextSlide" 
              :disabled="currentSlide >= maxSlides"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Indicadores del carrusel -->
            <div class="flex justify-center mt-6 space-x-2 overflow-x-auto pb-2">
              <!-- Pagination dots - limited to 5 visible dots -->
              <div class="flex space-x-2">
                <button
                  v-for="index in Math.min(5, Math.ceil(filteredStocks.length / visibleCards))"
                  :key="index"
                  @click="goToSlide(index - 1)"
                  :class="[
                    'w-3 h-3 rounded-full transition-all duration-200 flex-shrink-0',
                    {
                      'bg-orange-500 scale-125': currentSlide === (index - 1),
                      'bg-gray-300 hover:bg-gray-400': currentSlide !== (index - 1)
                    }
                  ]"
                  :aria-label="`Go to slide ${index}`"
                  :aria-current="currentSlide === (index - 1) ? 'true' : 'false'"
                >
                  <span class="sr-only">Slide {{ index }}</span>
                </button>
              </div>

              <!-- Scrollable indicator for remaining slides -->
              <div v-if="Math.ceil(filteredStocks.length / visibleCards) > 5" 
                class="h-3 w-20 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-orange-500 transition-all duration-200"
                  :style="{
                    width: `${(currentSlide + 1) / Math.ceil(filteredStocks.length / visibleCards) * 100}%`
                  }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Estadísticas rápidas -->
          <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <CardMetric 
              title="Recomendaciones Buy"
              :value="buyCount"
              backgroundColor="from-green-50 to-green-100"
              textColor="text-green-600"
              labelColor="text-green-700"
              borderColor="border-green-200"
              iconBackground="bg-green-500"
              icon="🏆"
            />
            <CardMetric
              title="Recomendaciones Hold" 
              :value="holdCount"
              backgroundColor="from-amber-50 to-amber-100"
              textColor="text-amber-600"
              labelColor="text-amber-700"
              borderColor="border-amber-200"
              iconBackground="bg-amber-500"
              icon="🏆"
            />
            <CardMetric
              title="Score Promedio"
              :value="avgScore.toFixed(2)"
              backgroundColor="from-blue-50 to-blue-100"
              textColor="text-blue-600"
              labelColor="text-blue-700"
              borderColor="border-blue-200"
              iconBackground="bg-blue-500"
              icon="🏆"
            />
            <CardMetric
              title="Alta Confianza (>80%)"
              :value="highConfidenceCount"
              backgroundColor="from-purple-50 to-purple-100"
              textColor="text-purple-600"
              labelColor="text-purple-700"
              borderColor="border-purple-200"
              iconBackground="bg-purple-500"
              icon="🏆"
            />
          </div>
        </div>
      </div>


</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { Stock, Metrics } from "../../types/dashboard";
import { useStockStore } from "../../stores/stockStore";
import CardStock from "../../components/actions/CardStock.vue";
import SectionSubHeader from '../../components/sectionsCommon/SectionSubHeader.vue'
import CardMetric from '../../components/card/CardMetric.vue'

const stockStore = useStockStore();
const { stocks, carouselFilteredStocks, filters: filtersStore } = storeToRefs(stockStore);

// Referencias del carrusel
const carousel = ref(null);
const currentSlide = ref(0);
const cardWidth = ref(400);
const visibleCards = ref(1);
const slideWidth = ref(100);

// Filtros
const filters = ref({
  rating: '',
  brokerage: '',
  minScore: 0,
  search: '',
  onlyHighConfidence: false,
  initial:false,
  quantity:'50'
});



// Computed properties
const uniqueBrokerages = computed(() => {
  return [...new Set(stocks.value.map(stock => stock.brokerage))].filter(Boolean);
});

const filteredStocks = computed(() => {
  let filtered = stocks.value;
  let filteredInitial = stocks.value;
  

  // (filterPage) ? filtered= filteredInitial : filtered = filtered.slice(0,20)
  
  if (filters.value.rating) {
    filtered = filtered.filter(stock => 
      (stock.current_rating || stock.rating_to) === filters.value.rating
    );
  }

  if (filters.value.brokerage) {
    filtered = filtered.filter(stock => stock.brokerage === filters.value.brokerage);
  }

  if (filters.value.minScore > 0) {
    filtered = filtered.filter(stock => (stock.score || 0) >= filters.value.minScore);
  }

  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    filtered = filtered.filter(stock => 
      stock.ticker?.toLowerCase().includes(searchTerm) ||
      stock.company?.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.value.onlyHighConfidence) {
    filtered = filtered.filter(stock => (stock.confidence || 0) > 0.8);
  }

   if (filters.value.quantity!='all'){
    filtered= filtered.slice(0,filters.value.quantity)
    // filters.value.initial = filtered.length <= 20;
  }

  return filtered;
});

const maxSlides = computed(() => {
  return Math.max(0, Math.ceil(filteredStocks.value.length / visibleCards.value) - 1);
});

// Estadísticas
const buyCount = computed(() => {
  return filteredStocks.value.filter(stock => 
    (stock.current_rating || stock.rating_to) === 'Buy'
  ).length;
});

const holdCount = computed(() => {
  return filteredStocks.value.filter(stock => 
    (stock.current_rating || stock.rating_to) === 'Hold'
  ).length;
});

const avgScore = computed(() => {
  const scores = filteredStocks.value.map(stock => stock.score || 0);
  return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
});

const highConfidenceCount = computed(() => {
  return filteredStocks.value.filter(stock => (stock.confidence || 0) > 0.8).length;
});

// Métodos del carrusel
const updateCarouselDimensions = () => {
  // if (window.innerWidth < 462) {
  //   visibleCards.value = 1;
  //   // cardWidth.value = Math.min(200, window.innerWidth - 40);
  // }else if(window.innerWidth < 768)
  // {
  //   visibleCards.value = 1;
  //   // cardWidth.value = Math.min(300, window.innerWidth - 40);

  // } else if (window.innerWidth < 1024) {
  //   // visibleCards.value = 2;
  //   // cardWidth.value = 400;
  // } 
  // else {
  //   // visibleCards.value = 2;
  // }
  slideWidth.value = cardWidth.value
};

const nextSlide = () => {
  if (currentSlide.value < maxSlides.value) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (index: number) => {
  currentSlide.value = Math.min(index, maxSlides.value);

  console.log('currentSlide.value', currentSlide.value)
};


const applyFilters = () => {
  currentSlide.value = 0; 
};

const clearFilters = () => {
  filters.value = {
    rating: '',
    brokerage: '',
    minScore: 0,
    search: '',
    onlyHighConfidence: false, 
    initial:true,
    quantity:'all'
  };
  currentSlide.value = 0;
};


const autoPlay = ref(null);

const startAutoPlay = () => {
  autoPlay.value = setInterval(() => {
    if (currentSlide.value >= maxSlides.value) {
      currentSlide.value = 0;
    } else {
      nextSlide();
    }
  }, 5000);
};

const stopAutoPlay = () => {
  if (autoPlay.value) {
    clearInterval(autoPlay.value);
    autoPlay.value = null;
  }
};

// Lifecycle hooks
onMounted(async () => {
  try {
    filtersStore.value.limit = -1
    await stockStore.fetchStocks();
    await nextTick();

    window.addEventListener('resize', updateCarouselDimensions);
    
    // Iniciar auto-play si hay suficientes elementos
    if (filteredStocks.value.length > visibleCards.value) {
      startAutoPlay();
    }
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateCarouselDimensions);
  stopAutoPlay();
});
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #f97316;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #f97316;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}</style>
