<template>
  <div class="min-h-screen text-gray-600 ">
    <!-- Hero Section -->
    <SectionSubHeader />

    <!-- Recomendación Destacada -->
    <div class="bg-gray-900
            backdrop-blur-sm 
           rounded-2xl p-8 shadow-2xl overflow-hidden
           hover:scale-[1.04] transition-transform duration-300 ease-in-out
          ">


      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-2 text-xl bg-yellow-400 text-yellow-900 
              px-4 py-2 rounded-full font-bold mb-4">
          ⭐ OPORTUNIDAD DEL DÍA
        </div>
        <h2 class="text-5xl font-bold mb-2 text-white/70">{{ topRecommendation?.ticker || '-' }}
        </h2>
        <p class="text-2xl text-white/90">{{ topRecommendation?.company || '-' }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div class="bg-white/10 rounded-xl p-4">
          <div class="text-3xl font-bold text-green-300 mb-1">{{ topRecommendation?.score ? `${topRecommendation.score}/100` : '-' }}</div>
          <div class="text-white/80">Puntuación Algoritmo</div>
        </div>
        <div class="bg-white/10 rounded-xl p-4">
          <div class="text-3xl font-bold text-orange-300 mb-1">{{ topRecommendation?.target_to || '-' }}</div>
          <div class="text-white/80">Precio Objetivo</div>
        </div>
        <div class="bg-white/10 rounded-xl p-4">
          <div class="text-2xl font-bold text-purple-300 mb-1">{{ topRecommendation?.rating_to || '-' }}</div>
          <div class="text-white/80">Recomendación</div>
        </div>
      </div>

      <div class="text-center mt-6 mb-4 text-white/70">
        <p>
          <span class="font-bold text-4xl">
            {{ topRecommendation?.confidence ? 
              (topRecommendation.confidence * 100).toFixed(2) : '0.00'
            }}
            %</span>
          de confianza en la recomendación
        </p>
      </div>
    </div>




    <!-- Main Content -->
    <div class="container mx-auto px-6 py-12 space-y-12">

      <!-- Top 5 Acciones Recomendadas -->
      <div class=" rounded-2xl -xl p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">🏆 Top 3 mejores</h2>
          <p class="text-gray-600">Las mejores inversiones según nuestro algoritmo </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="(stock, index) in topStocks" :key="stock.ticker"
            class="relative bg-gradient-to-br from-white to-gray-50 
            shadow-lg
            rounded-xl p-6 border-2 border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group">
            <CardStock :stock="stock" :index="index" v-bind="stock" />
          </div>
        </div>

        <div class="text-center mt-8">
          <!-- <button class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-bold transition-all duration-200">
            Ver Todas las Recomendaciones →
          </button> -->

          <router-link to="/stocks" class="bg-gray-100 hover:bg-gray-200
                border-2 border-gray-400
               text-gray-800 px-8 py-3 rounded-full font-bold transition-all duration-200">
            Ver Todas →
          </router-link>
        </div>
      </div>

      <!-- Métricas y Estadísticas -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">📊 Análisis en Tiempo Real</h2>
          <p class="text-gray-600">Insights y tendencias del mercado actualizados constantemente</p>
        </div>



        <div v-if="metrics && Object.keys(metrics).length > 0 && Number(metrics[0].value) > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardMetric v-for="(metric, index) in metrics" :key="index" :title="metric.title" :value="metric.value"
            :icon="metric.icon" :backgroundColor="metric.backgroundColor" :iconBackground="metric.iconBackground"
            :extraInfo="metric.extraInfo" :borderColor="metric.borderColor" :extraInfoColor="metric.extraInfoColor"
            :pulseColor="metric.pulseColor" />
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { Metrics, Stock, Recommendation } from '../types'
import { useStockStore } from '../stores/stockStore'
import CardStock from '../components/actions/CardStock.vue'
import SectionSubHeader from '../components/sectionsCommon/SectionSubHeader.vue'
import CardMetric from '../components/card/CardMetric.vue'


const stockStore = useStockStore()
const { stocks, recommendations, filters } = storeToRefs(stockStore)

console.log('stocks', stocks.value);

const topStocks = ref<Stock[]>([])
const lowStocks = ref<Stock[]>([])
const topRecommendation = ref<Recommendation>()
// const metrics = ref<Metrics>({
//   totalStocks: 0,
//   buyRecommendations: 0,
//   totalBrokerages: 0,
//   lastUpdate: 'No se ha actualizado'
// })
const metrics = ref<Metrics[]>([{
  title: '',
  value: '',
  icon: '',
  backgroundColor: '',
  iconBackground: '',
  extraInfo: '',
  extraInfoColor: '',
  pulseColor: '',
  borderColor: ''
}])


onMounted(async () => {
  try {


    filters.value.limit = 3
    filters.value.confidence = 'DESC'
    filters.value.order = 'DESC'
    filters.value.today = 'true'
    await stockStore.fetchStocks()
    topStocks.value = stocks.value


    filters.value.confidence = 'ASC'
    filters.value.order = 'ASC'
    await stockStore.fetchStocks()
    lowStocks.value = stocks.value


    await stockStore.fetchRecommendations()
    topRecommendation.value = recommendations.value?.[0]


    metrics.value = [
      {
        title: "Acciones Analizadas",
        value: String(stocks.value[0]?.total_register || 0),
        icon: "📊",
        backgroundColor: "from-orange-50 to-orange-100",
        iconBackground: "from-orange-500 to-orange-600",
        extraInfo: `+ ${stocks.value[0]?.total_register || 0} esta semana`,
        extraInfoColor: "text-orange-600",
        pulseColor: "green-400",
        borderColor: "border-orange-200"
      },
      {
        title: "Recomendaciones BUY",
        value: String(stocks.value[0]?.buy_count || 0),
        icon: "📈",
        backgroundColor: "from-green-50 to-green-100",
        iconBackground: "from-green-500 to-green-600",
        extraInfo: "",
        extraInfoColor: "text-green-600",
        pulseColor: "green-400",
        borderColor: "border-green-200"
      },
      {
        title: "Brokerages Activos",
        value: String(stocks.value[0]?.total_brokerages || 0),
        icon: "🏢",
        backgroundColor: "from-blue-50 to-blue-100",
        iconBackground: "from-blue-500 to-blue-600",
        extraInfo: "Cobertura global",
        extraInfoColor: "text-blue-600",
        pulseColor: "green-400",
        borderColor: "border-blue-200"
      },
      {
        title: "Última Actualización",
        value: String(stocks.value[0]?.last_update || 'No se ha actualizado'),
        icon: "🕒",
        backgroundColor: "from-purple-50 to-purple-100",
        iconBackground: "from-purple-500 to-purple-600",
        extraInfo: "Datos en vivo",
        extraInfoColor: "text-purple-600",
        pulseColor: "green-400",
        borderColor: "border-purple-200"
      }
    ]
  } catch (error) {
    console.error('Error fetching stocks:', error)
  }
})



</script>