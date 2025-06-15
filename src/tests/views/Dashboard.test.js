import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import Dashboard from '../../views/Dashboard.vue'
import { useStockStore } from '../../stores/stockStore'
import HeroSection from '../../components/HeroSection.vue'
import TopStocks from '../../components/TopStocks.vue'
import AnalyticsSection from '../../components/AnalyticsSection.vue'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard }
  ]
})

// Mock store
vi.mock('../../stores/stockStore', () => ({
  useStockStore: vi.fn()
}))

describe('Dashboard', () => {
  let wrapper
  let mockStockStore
  let pinia

  const mockStocks = [
    {
      ticker: 'AAPL',
      company: 'Apple Inc.',
      current_rating: 'BUY',
      score: 92,
      target_price: '$185'
    },
    {
      ticker: 'GOOGL',
      company: 'Alphabet Inc.',
      current_rating: 'HOLD',
      score: 85,
      target_price: '$150'
    },
    {
      ticker: 'MSFT',
      company: 'Microsoft Corp.',
      current_rating: 'BUY',
      score: 88,
      target_price: '$420'
    }
  ]

  const mockRecommendations = [
    {
      ticker: 'AAPL',
      company: 'Apple Inc.',
      score: 92,
      target_price: '$185',
      current_rating: 'BUY',
      confidence: 87
    }
  ]

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    mockStockStore = {
      fetchStocks: vi.fn().mockResolvedValue(undefined),
      fetchRecommendations: vi.fn().mockResolvedValue(undefined),
      stocks: { value: mockStocks },
      recommendations: { value: mockRecommendations }
    }

    useStockStore.mockReturnValue(mockStockStore)

    wrapper = mount(Dashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          HeroSection: true,
          TopStocks: true,
          AnalyticsSection: true
        }
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('has proper main container styling', () => {
    const mainContainer = wrapper.find('.min-h-screen')
    expect(mainContainer.exists()).toBe(true)
    expect(mainContainer.classes()).toContain('bg-gradient-to-br')
    expect(mainContainer.classes()).toContain('from-slate-900')
    expect(mainContainer.classes()).toContain('via-blue-900')
    expect(mainContainer.classes()).toContain('to-indigo-900')
  })

  it('renders HeroSection component', () => {
    const heroSection = wrapper.findComponent({ name: 'HeroSection' })
    expect(heroSection.exists()).toBe(true)
  })

  it('renders TopStocks component', () => {
    const topStocks = wrapper.findComponent({ name: 'TopStocks' })
    expect(topStocks.exists()).toBe(true)
  })

  it('renders AnalyticsSection component', () => {
    const analyticsSection = wrapper.findComponent({ name: 'AnalyticsSection' })
    expect(analyticsSection.exists()).toBe(true)
  })

  it('calls store methods on mount', async () => {
    expect(mockStockStore.fetchStocks).toHaveBeenCalled()
    expect(mockStockStore.fetchRecommendations).toHaveBeenCalled()
  })

  it('passes correct props to HeroSection', async () => {
    await wrapper.vm.$nextTick()
    
    const heroSection = wrapper.findComponent({ name: 'HeroSection' })
    const recommendation = heroSection.props('recommendation')
    
    expect(recommendation).toBeDefined()
    expect(recommendation.ticker).toBe('AAPL')
    expect(recommendation.company).toBe('Apple Inc.')
  })

  it('passes correct props to TopStocks', async () => {
    await wrapper.vm.$nextTick()
    
    const topStocks = wrapper.findComponent({ name: 'TopStocks' })
    const stocks = topStocks.props('stocks')
    
    expect(stocks).toBeDefined()
    expect(stocks.length).toBe(3)
    expect(stocks[0].ticker).toBe('AAPL')
  })

  it('handles store fetch errors gracefully', async () => {
    const errorStore = {
      fetchStocks: vi.fn().mockRejectedValue(new Error('Fetch failed')),
      fetchRecommendations: vi.fn().mockRejectedValue(new Error('Fetch failed')),
      stocks: { value: [] },
      recommendations: { value: [] }
    }

    useStockStore.mockReturnValue(errorStore)

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const errorWrapper = mount(Dashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          HeroSection: true,
          TopStocks: true,
          AnalyticsSection: true
        }
      }
    })

    await errorWrapper.vm.$nextTick()

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching stocks:', expect.any(Error))
    expect(errorWrapper.exists()).toBe(true)

    consoleErrorSpy.mockRestore()
  })

  it('uses fallback data when store is empty', async () => {
    const emptyStore = {
      fetchStocks: vi.fn().mockResolvedValue(undefined),
      fetchRecommendations: vi.fn().mockResolvedValue(undefined),
      stocks: { value: [] },
      recommendations: { value: [] }
    }

    useStockStore.mockReturnValue(emptyStore)

    const fallbackWrapper = mount(Dashboard, {
      global: {
        plugins: [router, pinia],
        stubs: {
          HeroSection: true,
          TopStocks: true,
          AnalyticsSection: true
        }
      }
    })

    await fallbackWrapper.vm.$nextTick()

    const heroSection = fallbackWrapper.findComponent({ name: 'HeroSection' })
    const recommendation = heroSection.props('recommendation')
    
    expect(recommendation.ticker).toBe('AAPL')
    expect(recommendation.company).toBe('Apple Inc.')
    expect(recommendation.score).toBe(92)
  })

  it('has proper section spacing and layout', () => {
    const sections = wrapper.findAll('.max-w-7xl')
    expect(sections.length).toBe(3) // Hero, TopStocks, Analytics
    
    sections.forEach(section => {
      expect(section.classes()).toContain('mx-auto')
      expect(section.classes()).toContain('px-4')
      expect(section.classes()).toContain('sm:px-6')
      expect(section.classes()).toContain('lg:px-8')
    })
  })

  it('has proper hero section styling', () => {
    const heroContainer = wrapper.find('.relative.overflow-hidden')
    expect(heroContainer.exists()).toBe(true)
    
    const overlay = heroContainer.find('.absolute.inset-0')
    expect(overlay.exists()).toBe(true)
    expect(overlay.classes()).toContain('bg-gradient-to-r')
  })

  it('slices stocks array to top 3', async () => {
    await wrapper.vm.$nextTick()
    
    const topStocks = wrapper.findComponent({ name: 'TopStocks' })
    const stocks = topStocks.props('stocks')
    
    expect(stocks.length).toBe(3)
  })
})