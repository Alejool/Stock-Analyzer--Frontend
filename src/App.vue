<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-white to-gray-300">
    <!-- Header -->

    <!-- bg-gradient-to-r   from-orange-500 via-orange-600 to-purple-600  -->
    <!--  sticky-->
    <header class="bg-gray-800 shadow-lg top-0 z-50 text-emerald-800 py-6">
      <nav class="container mx-auto px-4 lg:px-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-28"
        >
          <div class="flex items-center mb-2 sm:mb-0">
            <h1
              class="text-4xl sm:text-2xl font-bold t flex items-center gap-2"
            >
              <router-link
                to="/"
                class="text-white/80 hover:text-white transition-colors duration-200"
              > 
                <span class="text-3xl">📈</span>
                <!-- <span class="hidden sm:inline">%VITE_APP_TITLE%</span> -->
                <span class="hidden sm:inline">Stock Market</span>
                <span class="sm:hidden">Stock </span>
              </router-link>
            </h1>
          </div>

          <div
            class="flex items-center mt-5 md:0 flex-col sm:flex-row gap-2 text-sm sm:gap-4"
          >
            <router-link
              v-for="route in navigation"
              :key="route.name"
              :to="route.path"
              :class="[
                'px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-sm',
                $route.path === route.path
                  ? 'bg-white/20 text-white shadow-lg border border-white/10'
                  : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20',
              ]"
            >
              <span class="md:0 block w-full py-2">
                {{ $route.path !== route.path ? "⭐" : "" }} {{ route.name }}
              </span>
              <!-- <span class="sm:hidden">{{ route.name.charAt(0) }}</span> -->
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main
      class="container mx-auto py-6 sm:py-8 px-4 lg:px-6 min-h-[calc(100vh-200px)]"
    >
      <router-view />
    </main>

    <!-- Footer -->
    <!-- bg-gradient-to-r from-purple-600 via-purple-700 to-orange-500  -->

    <footer class="bg-gray-800 text-white mt-auto">
      <div class="container mx-auto py-6 sm:py-8 px-4 lg:px-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div class="flex items-center gap-2">
              <span class="text-3xl">📈</span>
              <h3 class="text-lg font-bold">Stock Analyzer</h3>
            </div>
            <p class="text-sm text-white/80 text-center sm:text-left">
              Análisis profesional de mercados financieros
            </p>
          </div>

          <div class="flex flex-col items-center sm:items-end gap-2">
            <!-- <div class="flex gap-4 text-sm">
              <a href="#" class="text-white/80 hover:text-white transition-colors duration-200">Términos</a>
              <a href="#" class="text-white/80 hover:text-white transition-colors duration-200">Privacidad</a>
              <a href="#" class="text-white/80 hover:text-white transition-colors duration-200">Soporte</a>
            </div> -->
            <p class="text-xs text-white/60">© 2025 Stock Analyzer</p>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-white/20">
          <div
            class="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/60"
          >
            <p>Desarrollado por Alejandro Olarte</p>
            <p>Versión 1.0.0 - Actualizado {{ new Date().getFullYear() }}</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const navigation = [
  { name: "Dashboard", path: "/" },
  { name: "Acciones", path: "/stocks" },
  { name: "Análisis", path: "/analytics" },
  // { name: "Recomendaciones", path: "/recommendations" },
];
</script>
