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
            <div class="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold mb-4">
              ⭐ OPORTUNIDAD DESTACADA
            </div>
            <h2 class="text-5xl font-bold mb-2 text-white/70">{{ topRecommendation.ticker ? topRecommendation.ticker : '-' }}</h2>
            <p class="text-2xl text-white/90">{{ topRecommendation.company ? topRecommendation.company : '-' }}</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div class="bg-white/10 rounded-xl p-4">
              <div class="text-3xl font-bold text-green-300 mb-1">{{ topRecommendation.score ? `${topRecommendation.score}/100` : '-' }}</div>
              <div class="text-white/80">Puntuación Algoritmo</div>
            </div>
            <div class="bg-white/10 rounded-xl p-4">
              <div class="text-3xl font-bold text-orange-300 mb-1">{{ topRecommendation.target_to ? topRecommendation.target_to : '-' }}</div>
              <div class="text-white/80">Precio Objetivo</div>
            </div>
            <div class="bg-white/10 rounded-xl p-4">
              <div class="text-2xl font-bold text-purple-300 mb-1">{{ topRecommendation.rating_to ? topRecommendation.rating_to : '-' }}</div>
              <div class="text-white/80">Recomendación</div>
            </div>
          </div>

          <div class="text-center mt-6 mb-4 text-white/70">
            <p> 
              <span class="font-bold text-4xl">{{ topRecommendation.confidence ? topRecommendation.confidence * 100 : 0 }}
              %</span>
               de confianza en la recomendación
            </p>
          </div>
          
    
        </div>

        


    <!-- Main Content -->
    <div class="container mx-auto px-6 py-12 space-y-12">

      <!-- Top 5 Acciones Recomendadas -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">🏆 Top 3 Oportunidades</h2>
          <p class="text-gray-600">Las mejores inversiones según nuestro algoritmo </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 

            v-for="(stock, index) in topStocks" 
            :key="stock.ticker"
            class="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
          >
          <CardStock 
            :stock="stock"
            :index="index"
            v-bind="stock"
          />
          </div>
        </div>
            
        
        <!-- Ver Más Button -->
        <div class="text-center mt-8">
          <!-- <button class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-bold transition-all duration-200">
            Ver Todas las Recomendaciones →
          </button> -->

          <router-link
              to="/stocks" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-bold transition-all duration-200">         
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
        
        <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       
          <div class="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center border border-orange-200 hover:shadow-lg transition-all duration-300">
            <div class="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="text-white text-2xl">📊</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">{{ metrics?.totalStocks }}</div>
            <div class="text-sm font-medium text-gray-600">Acciones Analizadas</div>
            <div class="text-xs text-orange-600 mt-1">+ {{ metrics?.totalStocks }} esta semana</div>
          </div>
          
          
          <div class="relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border border-green-200 hover:shadow-lg transition-all duration-300">
            <div class="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="text-white text-2xl">📈</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">{{ metrics?.buyRecommendations }}</div>
            <div class="text-sm font-medium text-gray-600">Recomendaciones BUY</div>
          </div>
          
 
          <div class="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200 hover:shadow-lg transition-all duration-300">
            <div class="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="text-white text-2xl">🏢</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">{{ metrics?.totalBrokerages }}</div>
            <div class="text-sm font-medium text-gray-600">Brokerages Activos</div>
            <div class="text-xs text-blue-600 mt-1">Cobertura global</div>
          </div>
          
          
          <div class="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center border border-purple-200 hover:shadow-lg transition-all duration-300">
            <div class="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="text-white text-2xl">🕒</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">
              {{ new Date(metrics?.lastUpdate).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) }}
            </div>
            <div class="text-sm font-medium text-gray-600">Última Actualización</div>
            <div class="text-xs text-purple-600 mt-1">Datos en vivo</div>
          </div>
      </div> -->

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <template v-if="metrics && Object.keys(metrics).length > 0">
        <CardMetric 
          v-for="(metric, index) in metrics"
          :key="index"
          :title="metric.title"
          :value="metric.value"
          :icon="metric.icon"
          :backgroundColor="metric.backgroundColor"
          :iconBackground="metric.iconBackground"
          :extraInfo="metric.extraInfo"
          :borderColor="metric.borderColor"
          :extraInfoColor="metric.extraInfoColor"
          :pulseColor="metric.pulseColor"
        />
      </template>
      </div>
        
        <!-- Call to Action Final -->
        <!-- <div class="mt-8 text-center bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl p-5 text-white">
          <h3 class="text-xl font-bold mb-4">¿Listo para invertir inteligentemente?</h3>
          <p class="text-white/90 mb-6">Únete a miles de inversores que ya confían en nuestro algoritmo de IA</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-200">
              🚀 Comenzar Ahora
            </button>
            <button class="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-purple-600 transition-all duration-200">
              📞 Hablar con Experto
            </button>
          </div>      
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Stock, } from '../types/dashboard'
import { Metrics } from '../types'
import { useStockStore,  } from '../stores/stockStore'
import CardStock from '../components/actions/CardStock.vue'
import SectionSubHeader from '../components/sectionsCommon/SectionSubHeader.vue'
import CardMetric from '../components/card/CardMetric.vue'


const stockStore = useStockStore()
const { stocks, recommendations, filters } = storeToRefs(stockStore)

const topStocks = ref([])
const topRecommendation = ref({})
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
     
    await stockStore.fetchStocks()
    await stockStore.fetchRecommendations()

  
    topStocks.value = stocks.value

    console.log(topStocks.value)
    topRecommendation.value = recommendations.value?.[0] || {}
    
    metrics.value = [
      {
        title: "Acciones Analizadas",
        value: stocks.value[0]?.total_register || 0,
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
        value: stocks.value[0]?.buy_count || 0,
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
        value: stocks.value[0]?.total_brokerages || 0,
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
        value: stocks.value[0]?.last_update || 'No se ha actualizado',
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