 
 <template >
 <div class=" text-gray-800 ">
      <div class="container mx-auto px-6 py-12">

        <div 
          class="text-center mb-8"
           
         >
          <h1   class="text-4xl md:text-6xl  mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-purple-800 font-bold ">
             {{ $route.path.includes('stocks') ?  'Stock': 'Dashboard '  }}
          </h1>
          <p class="text-xl  mb-8">
            Análisis inteligente *   Decisiones rentables *  Tiempo real
          </p>
          
          <!-- CTA Principal -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link
             to="/stocks"
             v-if="!$route.path.includes('stocks')" 
            class="bg-white text-purple-600 py-4
            border-2 border-purple-600
              shadow-4xl *:p-8 px-4 rounded-full font-bold text-lg hover:bg-orange-50 transform hover:scale-105 transition-all duration-200 ">
              🚀 Ver Todas las Recomendaciones
            </router-link>
            <router-link
            to="/analytics"
            v-if="!$route.path.includes('analytics')" 
            class="bg-purple-600 text-white py-4 px-4
            shadow-4xl
            border-2 border-gray-300
            rounded-full font-bold text-lg 
             hover:bg-purple-800  transition-all duration-200 ">
              📊 Análisis Detallado
            </router-link>
          </div>
        </div>
    </div>
</div>
</template>

<script setup>

</script>