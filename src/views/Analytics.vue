<template>
  <div class="min-h-screen p-6">
    <!-- Header Section -->
    <sectionSubHeader />

    <div class="mb-8">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CardMetric
          title="Total Ratings"
          :value="analytics.totalRatings"
          backgroundColor="from-blue-50 to-blue-100"
          textColor="text-blue-600"
          labelColor="text-blue-700"
          borderColor="border-blue-200"
          iconBackground="bg-blue-500"
          icon="📈"
        />

        <CardMetric
          title="Brokerages Activos"
          :value="analytics?.totalBrokerages"
          backgroundColor="from-purple-50 to-purple-100"
          textColor="text-purple-600"
          labelColor="text-purple-700"
          borderColor="border-purple-200"
          iconBackground="bg-purple-500"
          icon="🏢"
        />

        <CardMetric
          title="Score Promedio"
          :value="analytics?.avgScore.toFixed(1)"
          backgroundColor="from-green-50 to-green-100"
          textColor="text-green-600"
          labelColor="text-green-700"
          borderColor="border-green-200"
          iconBackground="bg-green-500"
          icon="💹"
        />

        <CardMetric
          title="Cambio Target Prom."
          :value="`${
            analytics.avgTargetChange > 0 ? '+' : ''
          }${analytics.avgTargetChange.toFixed(1)}%`"
          backgroundColor="from-amber-50 to-amber-100"
          textColor="text-amber-600"
          labelColor="text-amber-700"
          borderColor="border-amber-200"
          iconBackground="bg-amber-500"
          icon="🎯"
        />
      </div>
    </div>

    <div class="flex justify-end items-center space-x-4 w-full my-5">
      <div
        class="bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-bold"
      >
        🟢  En vivo
      </div>
      <div class="text-gray-900/80 text-sm font-bold">
        {{ currentTime }}
      </div>
    </div>

    <!-- Filters Section  -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 rounded-lg shadow-2xl border border-slate-200/60 p-6 mb-8 backdrop-blur-sm"
    >
      <!-- Decorative elements -->
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-2xl"
      ></div>

      <div class="relative z-10">
        <div class="flex items-center gap-4 mb-4">
          <div class="flex items-center justify-center w-14 h-14">
            <span class="text-2xl">🔍</span>
          </div>
          <div>
            <h3
              class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            >
              Filtros de Análisis
            </h3>
            <p class="text-sm text-gray-600 mt-1">
              Refina tu búsqueda para obtener insights precisos
            </p>
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          <!-- Brokerage Select -->
          <div class="group">
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Brokerage</label
            >
            <div class="relative">
              <select
                v-model="filters.brokerage"
                @change="applyFilters"
                class="w-full appearance-none bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 hover:shadow-md"
              >
                <option value="">Todos los Brokerages</option>
                <option
                  v-for="brokerage in uniqueBrokerages"
                  :key="brokerage"
                  :value="brokerage"
                >
                  {{ brokerage }}
                </option>
              </select>
              <div
                class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Action Select -->
          <div class="group">
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Acción</label
            >
            <div class="relative">
              <select
                v-model="filters.action"
                @change="applyFilters"
                class="w-full appearance-none bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 hover:shadow-md"
              >
                <option value="">Todas las Acciones</option>
                <option value="target raised by">Target Raised</option>
                <option value="target lowered by">Target Lowered</option>
                <option value="rating upgraded">Rating Upgraded</option>
                <option value="rating downgraded">Rating Downgraded</option>
              </select>
              <div
                class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Score Range Select -->
          <div class="group">
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Score Range</label
            >
            <div class="relative">
              <select
                v-model="filters.scoreRange"
                @change="applyFilters"
                class="w-full appearance-none bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 hover:shadow-md"
              >
                <option value="">Todos los Scores</option>
                <option value="high">Alto (70-100)</option>
                <option value="medium">Medio (50-69)</option>
                <option value="low">Bajo (0-49)</option>
              </select>
              <div
                class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Date From Input -->
          <div class="group">
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Fecha Desde</label
            >
            <input
              v-model="filters.dateFrom"
              @change="applyFilters"
              type="date"
              class="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 hover:shadow-md"
            />
          </div>

          <!-- Clear Filters Button -->
          <div class="flex items-end">
            <button
              @click="clearFilters"
              class="w-full group relative px-6 py-3 bg-gray-300/90 rounded-xl font-semibold text-sm shadow-lg hover:shadow-2xl"
            >
              <span class="flex items-center justify-center gap-2">
                <span class="text-lg">🗑️</span>
                <span>Limpiar</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="text-end text-sm mt-6 mb-4">
        Mostrando
        <span class="text-cyan-900 font-bold">
          {{ filteredData.length }}
        </span>
        de
        <span class="">
          {{ stocks.length }}
        </span>
        resultados
      </div>
    </div>
    <!-- Analysis Section  -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
      <!-- Top Performers -->
      <div
        class="group relative overflow-hidden bg-gradient-to-br from-white to-amber-50/50 rounded-lg shadow-2xl border border-slate-200/60 p-6"
      >
        <div
          class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-yellow-400/10 rounded-full blur-2xl"
        ></div>

        <div class="relative z-10">
          <div class="flex items-center gap-1 mb-6">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center">
              <span class="text-xl">🏆</span>
            </div>
            <h3
              class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            >
              Mejores Performadores
            </h3>
          </div>

          <div class="space-y-3 h-[300px] overflow-y-auto">
            <div
              v-for="(company, index) in topPerformers"
              :key="company.ticker"
              class="group/item flex items-center justify-between p-4 bg-white/60 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-slate-100"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div
                    :class="getRankingBadgeColor(index)"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg group-hover/item:scale-110 transition-transform duration-300"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
                <div>
                  <div class="font-bold text-gray-900 text-base">
                    {{ company.ticker }}
                  </div>
                  <div class="text-xs text-gray-600 truncate max-w-32">
                    {{ company.company }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div
                  :class="getScoreColorClass(company.score)"
                  class="text-lg font-bold"
                >
                  {{ company.score }}
                </div>
                <div
                  :class="
                    company.targetChange >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                  class="text-sm font-semibold"
                >
                  {{ company.targetChange > 0 ? "+" : ""
                  }}{{ company.targetChange.toFixed(1) }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Brokerages Analysis -->
      <div
        class="group relative overflow-hidden bg-gradient-to-br from-white to-purple-50/50 rounded-lg s hadow-2xl border border-slate-200/60 p-4"
      >
        <div
          class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-2xl"
        ></div>

        <div class="relative z-10">
          <div class="flex items-center gap-1 mb-6">
            <div class="w-12 h-12 flex items-center justify-center">
              <span class="text-xl">🏢</span>
            </div>
            <h3
              class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            >
              Análisis de Brokerages
            </h3>
          </div>

          <div class="space-y-2 h-[300px] overflow-y-auto">
            <div
              v-for="brokerage in brokerageAnalysis"
              :key="brokerage.name"
              class="group/item border-2 border-slate-200 rounded-2xl p-4 hover:border-purple-300 hover:shadow-lg transition-all duration-300 bg-white/60"
            >
              <div class="flex justify-between items-start mb-2">
                <h2 class="font-bold text-gray-900 text-xs">
                  {{ brokerage.name }}
                </h2>
                <span
                  class="text-xs bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-3 py-1 rounded-full font-semibold border border-purple-200"
                >
                  {{ brokerage.count }} acciones
                </span>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="bg-slate-50 rounded-lg p-2">
                  <span class="text-gray-600">Score:</span>
                  <span class="font-bold ml-1 text-gray-900">{{
                    brokerage.avgScore.toFixed(1)
                  }}</span>
                </div>
                <div class="bg-slate-50 rounded-lg p-2">
                  <span class="text-gray-600">Target:</span>
                  <span
                    :class="
                      brokerage.avgTargetChange >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    "
                    class="font-bold ml-1"
                  >
                    {{ brokerage.avgTargetChange > 0 ? "+" : ""
                    }}{{ brokerage.avgTargetChange.toFixed(1) }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Market Sentiment -->
      <div
        class="group relative overflow-hidden bg-gradient-to-br from-white to-cyan-50/50 rounded-lg shadow-2xl border border-slate-200/60 p-6"
      >
        <div
          class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl"
        ></div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 flex items-center justify-center">
              <span class="text-xl">📈</span>
            </div>
            <h3
              class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            >
              Sentimiento del Mercado
            </h3>
          </div>

          <div class="space-y-6">
            <div class="space-y-3">
              <div class="flex justify-between text-sm font-semibold">
                <span class="text-gray-700">Alcista</span>
                <span class="text-green-600"
                  >{{ feelingData.bullish.toFixed(1) }}%</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                  :style="{ width: feelingData.bullish + '%' }"
                ></div>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between text-sm font-semibold">
                <span class="text-gray-700">Bajista</span>
                <span class="text-red-600"
                  >{{ feelingData.bearish.toFixed(1) }}%</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-red-500 to-rose-500 h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                  :style="{ width: feelingData.bearish + '%' }"
                ></div>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between text-sm font-semibold">
                <span class="text-gray-700">Neutral</span>
                <span class="text-gray-600"
                  >{{ feelingData.neutral.toFixed(1) }}%</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-gray-500 to-slate-500 h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                  :style="{ width: feelingData.neutral + '%' }"
                ></div>
              </div>
            </div>

            <div
              class="mt-10 p-6 h-full bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-blue-200/50"
            >
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900 mb-1">
                  {{ overallSentiment.label }}
                </div>
                <div class="text-sm font-semibold text-gray-600 mb-2">
                  Sentimiento General
                </div>
                <div
                  :class="overallSentiment.color"
                  class="text-xs font-medium"
                >
                  {{ overallSentiment.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section  -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <!-- Actions Distribution -->
      <div
        class="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50/50 rounded-lg shadow-sm border border-slate-200/60 p-6 hover:shadow-lg"
      >
        <div
          class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"
        ></div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 flex items-center justify-center">
              <span class="text-xl">📊</span>
            </div>
            <h3
              class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            >
              Distribución de Acciones
            </h3>
          </div>

          <div class="">
            <div
              v-for="(action, index) in actionsDistribution"
              :key="action.name"
              class="group/item flex items-center justify-between p-4 rounded-2xl hover:bg-white transition-all duration-300"
            >
              <div class="flex items-center space-x-2">
                <div
                  :class="getActionColor(action.name)"
                  class="w-4 h-4 rounded-full shadow-sm group-hover/item:scale-110 transition-transform duration-300"
                ></div>
                <span class="text-sm font-semibold text-gray-700">{{
                  action.name
                }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  class="text-sm font-bold text-gray-600 min-w-[2rem] text-right"
                  >{{ action.count }}</span
                >
                <div
                  class="w-24 bg-gray-200 rounded-full h-2.5 overflow-hidden"
                >
                  <div
                    :class="getActionColor(action.name)"
                    :style="{
                      width: (action.count / filteredData.length) * 100 + '%',
                    }"
                    class="h-full rounded-full transition-all duration-700 ease-out"
                  ></div>
                </div>
                <span
                  class="text-sm font-medium text-gray-500 min-w-[3rem] text-right"
                  >{{
                    ((action.count / filteredData.length) * 100).toFixed(1)
                  }}%</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Target Price Changes -->
      <div
        class="group relative overflow-hidden bg-gradient-to-br from-white to-green-50/50 rounded-lg shadow-2xl border border-slate-200/60 p-6"
      >
        <div
          class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-2xl"
        ></div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 flex items-center justify-center">
              <span class="text-xl">💰</span>
            </div>
            <h3
              class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            >
              Cambios en Precios Objetivo
            </h3>
          </div>

          <div class="space-y-4">
            <div
              class="group/item p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/50 hover:shadow-lg transition-all duration-300"
            >
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-green-800"
                  >Incrementos de Target</span
                >
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                  ></div>
                  <span class="text-2xl font-bold text-green-600">{{
                    targetChangesStats.increases
                  }}</span>
                </div>
              </div>
            </div>

            <div
              class="group/item p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-200/50 hover:shadow-lg transition-all duration-300"
            >
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-red-800"
                  >Decrementos de Target</span
                >
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                  ></div>
                  <span class="text-2xl font-bold text-red-600">{{
                    targetChangesStats.decreases
                  }}</span>
                </div>
              </div>
            </div>

            <div
              class="group/item p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 hover:shadow-lg transition-all duration-300"
            >
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-blue-800"
                  >Promedio de Cambio</span
                >
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  ></div>
                  <span class="text-2xl font-bold text-blue-600">
                    {{ targetChangesStats.average > 0 ? "+" : ""
                    }}{{ targetChangesStats.average.toFixed(2) }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Timeline -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-6">
        ⏰ Actividad Reciente
      </h3>
      <div class="space-y-4 max-h-96 overflow-y-auto">
        <div
          v-for="item in recentActivity"
          :key="item.id"
          class="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div class="flex-shrink-0 text-xs text-gray-500 w-16">
            {{ formatDate(item.time) }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2 mb-2">
              <span class="font-semibold text-gray-900">{{ item.ticker }}</span>
              <span
                :class="getActionBadgeClass(item.action)"
                class="px-2 py-1 text-xs rounded-full"
              >
                {{ item.action }}
              </span>
              <span class="text-xs text-gray-500">{{ item.brokerage }}</span>
            </div>
            <div class="text-sm text-gray-600 mb-1">{{ item.company }}</div>
            <div class="flex items-center space-x-2 text-xs">
              <span class="text-gray-500">{{ item.target_from }}</span>
              <span class="text-gray-400">→</span>
              <span
                class="font-medium"
                :class="
                  calculateTargetChange(item) >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                "
              >
                {{ item.target_to }}
              </span>
              <span class="text-gray-400">
                ({{ calculateTargetChange(item) > 0 ? "+" : ""
                }}{{ calculateTargetChange(item).toFixed(1) }}%)
              </span>
            </div>
          </div>
          <div class="flex-shrink-0">
            <div
              :class="getScoreColorClass(item.score)"
              class="text-sm font-bold"
            >
              {{ item.score }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStockStore } from "../stores/stockStore";
import { useAnalyticsStore } from "../stores/analytics";

// Components
import sectionSubHeader from "../components/sectionsCommon/sectionSubHeader.vue";
import CardMetric from "../components/card/CardMetric.vue";
const stockStore = useStockStore();
const analyticsStore = useAnalyticsStore();

// Stores
const { stocks, filters: filtersStore } = storeToRefs(stockStore);
const { data } = storeToRefs(analyticsStore);

// Reactive filters
const filters = reactive({
  brokerage: "",
  action: "",
  scoreRange: "",
  dateFrom: "",
  dateTo: "",
});

// Add this to the existing script setup section:
const currentTime = ref(new Date().toLocaleString("es-ES"));

// Update time every second

const timer = setInterval(() => {
  currentTime.value = new Date().toLocaleString("es-ES");
}, 1000);

// Computed properties
const filteredData = computed(() => {
  let data = [...analyticsStore.data];

  if (filters.brokerage) {
    data = data.filter((item) => item.brokerage === filters.brokerage);
  }

  if (filters.action) {
    data = data.filter((item) => item.action === filters.action);
  }

  if (filters.scoreRange) {
    data = data.filter((item) => {
      switch (filters.scoreRange) {
        case "high":
          return item.score >= 70;
        case "medium":
          return item.score >= 50 && item.score < 70;
        case "low":
          return item.score < 50;
        default:
          return true;
      }
    });
  }

  if (filters.dateFrom) {
    data = data.filter(
      (item) => new Date(item.time) >= new Date(filters.dateFrom)
    );
  }

  return data;
});

const analytics = computed(() => {
  const data = filteredData.value;
  if (!data || data.length === 0) {
    return {
      totalRatings: 0,
      totalBrokerages: 0,
      avgScore: 0,
      avgTargetChange: 0,
    };
  }

  const totalRatings = data.length;
  const uniqueBrokerages = new Set(data.map((item) => item.brokerage)).size;
  const avgScore =
    data.reduce((sum, item) => sum + item.score, 0) / totalRatings;

  const targetChanges = data.map((item) => calculateTargetChange(item));
  const avgTargetChange =
    targetChanges.reduce((sum, change) => sum + change, 0) /
    targetChanges.length;

  return {
    totalRatings,
    totalBrokerages: uniqueBrokerages,
    avgScore,
    avgTargetChange,
  };
});

const uniqueBrokerages = computed(() => {
  return [...new Set(analyticsStore.data.map((item) => item.brokerage))].sort();
});

const actionsDistribution = computed(() => {
  const actions = {};
  filteredData.value.forEach((item) => {
    actions[item.action] = (actions[item.action] || 0) + 1;
  });

  return Object.entries(actions)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
});

const targetChangesStats = computed(() => {
  const changes = filteredData.value.map((item) => calculateTargetChange(item));
  const increases = changes.filter((change) => change > 0).length;
  const decreases = changes.filter((change) => change < 0).length;
  const average =
    changes.reduce((sum, change) => sum + change, 0) / changes.length;

  return { increases, decreases, average };
});

const topPerformers = computed(() => {
  return filteredData.value
    .map((item) => ({
      ...item,
      targetChange: calculateTargetChange(item),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
});

const brokerageAnalysis = computed(() => {
  const brokerageMap = new Map();

  filteredData.value.forEach((item) => {
    if (!brokerageMap.has(item.brokerage)) {
      brokerageMap.set(item.brokerage, []);
    }
    brokerageMap.get(item.brokerage).push(item);
  });

  return Array.from(brokerageMap.entries())
    .map(([name, items]) => ({
      name,
      count: items.length,
      avgScore: items.reduce((sum, item) => sum + item.score, 0) / items.length,
      avgTargetChange:
        items.reduce((sum, item) => sum + calculateTargetChange(item), 0) /
        items.length,
      avgConfidence:
        items.reduce((sum, item) => sum + item.confidence, 0) / items.length,
    }))
    .sort((a, b) => b.count - a.count);
});

const feelingData = computed(() => {
  const total = filteredData.value.length;
  if (total === 0) return { bullish: 0, bearish: 0, neutral: 0 };

  let bullish = 0,
    bearish = 0,
    neutral = 0;

  filteredData.value.forEach((item) => {
    const targetChange = calculateTargetChange(item);
    if (targetChange > 2) bullish++;
    else if (targetChange < -2) bearish++;
    else neutral++;
  });

  return {
    bullish: (bullish / total) * 100,
    bearish: (bearish / total) * 100,
    neutral: (neutral / total) * 100,
  };
});

const overallSentiment = computed(() => {
  const { bullish, bearish, neutral } = feelingData.value;

  if (bullish > bearish && bullish > neutral) {
    return {
      label: "🚀 ALCISTA",
      color: "text-green-600",
      description: "El mercado muestra optimismo",
    };
  } else if (bearish > bullish && bearish > neutral) {
    return {
      label: "📉 BAJISTA",
      color: "text-red-600",
      description: "Predominan las expectativas negativas",
    };
  } else {
    return {
      label: "⚖️ NEUTRAL",
      color: "text-gray-600",
      description: "Mercado en equilibrio",
    };
  }
});

const recentActivity = computed(() => {
  return [...filteredData.value]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 15);
});

// Methods
const calculateTargetChange = (item) => {
  const from = parseFloat(item.target_from.replace("$", ""));
  const to = parseFloat(item.target_to.replace("$", ""));
  return ((to - from) / from) * 100;
};

const getScoreColorClass = (score) => {
  if (score >= 70) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
};

const getActionColor = (action) => {
  if (action.includes("raised")) return "bg-green-500";
  if (action.includes("lowered")) return "bg-red-500";
  if (action.includes("upgraded")) return "bg-blue-500";
  if (action.includes("downgraded")) return "bg-orange-500";
  return "bg-gray-500";
};

const getActionBadgeClass = (action) => {
  if (action.includes("raised")) return "bg-green-100 text-green-800";
  if (action.includes("lowered")) return "bg-red-100 text-red-800";
  if (action.includes("upgraded")) return "bg-blue-100 text-blue-800";
  if (action.includes("downgraded")) return "bg-orange-100 text-orange-800";
  return "bg-gray-100 text-gray-800";
};

const getRankingBadgeColor = (index) => {
  switch (index) {
    case 0:
      return "bg-yellow-500";
    case 1:
      return "bg-gray-400";
    case 2:
      return "bg-yellow-600";
    default:
      return "bg-blue-500";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const applyFilters = () => {
  console.log("Filtros aplicados:", filters);
};

const clearFilters = () => {
  Object.keys(filters).forEach((key) => {
    filters[key] = "";
  });
};

onMounted(async () => {
  try {
    filtersStore.value.limit = -1;
    await stockStore.fetchStocks();

    console.log(stocks.value);
    console.log(data);
    setTimeout(() => {
      console.log(currentTime.value);
    }, 1000);

    data.value = stocks.value ?? { items: [] };
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
});

watch(
  () => data.value,
  () => {
    console.log("Data updated in analytics");
  },
  { deep: true }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
