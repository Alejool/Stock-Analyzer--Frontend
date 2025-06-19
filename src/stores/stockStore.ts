import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Stock, StockFilters, Recommendation } from '../types'
import { stockAPI } from '../services/api'

export interface CarouselFilters {
  rating: string
  brokerage: string
  minScore: number
  search: string
  onlyHighConfidence: boolean
  initial: boolean
}

export const useStockStore = defineStore('stock', () => {
  // State
  const stocks = ref<Stock[]>([])
  const stockTrazabilidad = ref<{ [key: string]: Stock[] }>({});

  console.log('stockTrazabilidad');
  console.log(stockTrazabilidad.value);
  const recommendations = ref<Recommendation[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  let filters = ref<StockFilters>({
    page: 1,
    limit: -1,
    sort_by: 'confidence',
    order: 'DESC',
    confidence: 'DESC',
    today: 'true'
  })

  // Carousel specific state
  const carouselFilters = ref<CarouselFilters>({
    rating: '',
    brokerage: '',
    minScore: 0,
    search: '',
    onlyHighConfidence: false,
    initial: true
  })

  const currentSlide = ref(0)
  const visibleCards = ref(3)
  const cardWidth = ref(350)
  const slideWidth = ref(350)

  // Getters
  const filteredStocks = computed(() => {
    return stocks.value.filter(stock => {
      if (filters.value.ticker && !stock.ticker.toLowerCase().includes(filters.value.ticker.toLowerCase())) {
        return false
      }
      if (filters.value.company && !stock.company.toLowerCase().includes(filters.value.company.toLowerCase())) {
        return false
      }
      if (filters.value.brokerage && !stock.brokerage.toLowerCase().includes(filters.value.brokerage.toLowerCase())) {
        return false
      }
      return true
    })
  })

  // Carousel specific computed properties
  const carouselFilteredStocks = computed(() => {
    let filtered = stocks.value


    if (carouselFilters.value.rating) {
      filtered = filtered.filter(stock =>
        (stock.current_rating || stock.rating_to) === carouselFilters.value.rating
      )
    }

    if (carouselFilters.value.brokerage) {
      filtered = filtered.filter(stock => stock.brokerage === carouselFilters.value.brokerage)
    }

    if (carouselFilters.value.minScore > 0) {
      filtered = filtered.filter(stock => (stock.score || 0) >= carouselFilters.value.minScore)
    }

    if (carouselFilters.value.search) {
      const searchTerm = carouselFilters.value.search.toLowerCase()
      filtered = filtered.filter(stock =>
        stock.ticker?.toLowerCase().includes(searchTerm) ||
        stock.company?.toLowerCase().includes(searchTerm)
      )
    }

    if (carouselFilters.value.onlyHighConfidence) {
      filtered = filtered.filter(stock => (stock.confidence || 0) > 0.8)
    }

    return filtered
  })

  const uniqueBrokerages = computed(() => {
    return [...new Set(stocks.value.map(stock => stock.brokerage))].filter(Boolean)
  })

  const maxSlides = computed(() => {
    return Math.max(0, Math.ceil(carouselFilteredStocks.value.length / visibleCards.value) - 1)
  })

  // Statistics computed properties
  const buyCount = computed(() => {
    return carouselFilteredStocks.value.filter(stock =>
      (stock.current_rating || stock.rating_to) === 'Buy'
    ).length
  })

  const holdCount = computed(() => {
    return carouselFilteredStocks.value.filter(stock =>
      (stock.current_rating || stock.rating_to) === 'Hold'
    ).length
  })

  const avgScore = computed(() => {
    const scores = carouselFilteredStocks.value.map(stock => stock.score || 0)
    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  })

  const highConfidenceCount = computed(() => {
    return carouselFilteredStocks.value.filter(stock => (stock.confidence || 0) > 0.8).length
  })

  const topRatedStocks = computed(() => {
    return stocks.value
      .filter(stock => ['Buy', 'Strong Buy'].includes(stock.rating_to))
      .slice(0, 3)
  })

  // Actions
  async function fetchStocks(newFilters?: Partial<StockFilters>) {
    try {
      loading.value = true
      error.value = null

      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      const response = await stockAPI.getStocks(filters.value);

      stocks.value = response.items.reduce((acc: Stock[], current: Stock) => {
        const existingIndex = acc.findIndex(item =>
          item.ticker === current.ticker &&
          item.company === current.company
        );

        if (existingIndex >= 0) {
          // Create traceability key using the stock identifier
          const traceKey = `${current.ticker}-${current.company}`;

          if (new Date(current.time) > new Date(acc[existingIndex].time)) {
            // Store the old version in traceability before updating
            if (!stockTrazabilidad.value[traceKey]) {
              stockTrazabilidad.value[traceKey] = [];
            }
            stockTrazabilidad.value[traceKey].push(acc[existingIndex]);

            // Update with new version
            acc[existingIndex] = current;
          } else {
            // Store the newer version in traceability
            if (!stockTrazabilidad.value[traceKey]) {
              stockTrazabilidad.value[traceKey] = [];
            }
            stockTrazabilidad.value[traceKey].push(current);
          }
        } else {
          acc.push(current);
        }

        return acc;
      }, []);

    } catch (err) {
      console.log('error: ', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

  async function fetchRecommendations() {
    try {
      loading.value = true
      const response = await stockAPI.getRecommendations()
      recommendations.value = response.recommendations
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error cargando recomendaciones'
    } finally {
      loading.value = false
    }
  }

  function updateFilters(newFilters: Partial<StockFilters>) {
    filters.value = { ...filters.value, ...newFilters }
    fetchStocks()
  }

  function clearFilters() {
    filters.value = {
      page: 1,
      limit: 50,
      sort_by: 'time',
      order: 'desc'
    }
    fetchStocks()
  }

  // Carousel specific actions
  function updateCarouselFilters(newFilters: Partial<CarouselFilters>) {
    carouselFilters.value = { ...carouselFilters.value, ...newFilters }
    currentSlide.value = 0 // Reset carousel position
  }

  function clearCarouselFilters() {
    carouselFilters.value = {
      rating: '',
      brokerage: '',
      minScore: 0,
      search: '',
      onlyHighConfidence: false,
      initial: true
    }
    currentSlide.value = 0
  }

  function updateCarouselDimensions(containerWidth: number) {
    if (containerWidth >= 1200) {
      visibleCards.value = 4
      cardWidth.value = Math.floor(containerWidth / 4) - 24
    } else if (containerWidth >= 900) {
      visibleCards.value = 3
      cardWidth.value = Math.floor(containerWidth / 3) - 24
    } else if (containerWidth >= 600) {
      visibleCards.value = 2
      cardWidth.value = Math.floor(containerWidth / 2) - 24
    } else {
      visibleCards.value = 1
      cardWidth.value = containerWidth - 48
    }

    slideWidth.value = cardWidth.value + 24 // Incluyendo padding
  }

  function nextSlide() {
    if (currentSlide.value < maxSlides.value) {
      currentSlide.value++
    }
  }

  function prevSlide() {
    if (currentSlide.value > 0) {
      currentSlide.value--
    }
  }

  function goToSlide(index: number) {
    currentSlide.value = Math.min(index, maxSlides.value)
  }

  function resetCarouselPosition() {
    // Ajustar currentSlide si es necesario cuando cambian los filtros
    if (currentSlide.value > maxSlides.value) {
      currentSlide.value = Math.max(0, maxSlides.value)
    }
  }

  return {
    // State
    stocks,
    recommendations,
    loading,
    error,
    filters,
    carouselFilters,
    currentSlide,
    visibleCards,
    cardWidth,
    slideWidth,

    // Getters
    filteredStocks,
    carouselFilteredStocks,
    uniqueBrokerages,
    maxSlides,
    buyCount,
    holdCount,
    avgScore,
    highConfidenceCount,
    topRatedStocks,

    // Actions
    fetchStocks,
    fetchRecommendations,
    updateFilters,
    clearFilters,
    updateCarouselFilters,
    clearCarouselFilters,
    updateCarouselDimensions,
    nextSlide,
    prevSlide,
    goToSlide,
    resetCarouselPosition
  }
})