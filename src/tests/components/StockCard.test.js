import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import StockCard from '../../components/StockCard.vue'
import RatingBadge from '../../components/RatingBadge.vue'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/stocks', component: { template: '<div>Stocks</div>' } }
  ]
})

describe('StockCard', () => {
  let wrapper
  const mockStock = {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    current_rating: 'BUY',
    score: 92,
    target_price: '$185',
    brokerage: 'Goldman Sachs'
  }

  beforeEach(() => {
    wrapper = mount(StockCard, {
      props: {
        stock: mockStock,
        index: 0
      },
      global: {
        plugins: [router],
        stubs: {
          RatingBadge: true
        }
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays stock ticker', () => {
    const ticker = wrapper.find('h3')
    expect(ticker.exists()).toBe(true)
    expect(ticker.text()).toBe('AAPL')
  })

  it('displays company name', () => {
    expect(wrapper.text()).toContain('Apple Inc.')
  })

  it('displays brokerage name', () => {
    expect(wrapper.text()).toContain('Goldman Sachs')
  })

  it('renders RatingBadge component with correct props', () => {
    const ratingBadge = wrapper.findComponent({ name: 'RatingBadge' })
    expect(ratingBadge.exists()).toBe(true)
    expect(ratingBadge.props('rating')).toBe('BUY')
  })

  it('displays score correctly', () => {
    expect(wrapper.text()).toContain('92/100')
  })

  it('displays target price', () => {
    expect(wrapper.text()).toContain('$185')
  })

  it('renders progress bar with correct width', () => {
    const progressBar = wrapper.find('.bg-gradient-to-r')
    expect(progressBar.exists()).toBe(true)
    expect(progressBar.attributes('style')).toContain('width: 92%')
  })

  it('renders action button with correct link', () => {
    const button = wrapper.find('router-link')
    expect(button.exists()).toBe(true)
    expect(button.attributes('to')).toBe('/stocks')
    expect(button.text()).toBe('Ver detalles')
  })

  it('handles missing stock data gracefully', () => {
    const emptyWrapper = mount(StockCard, {
      props: {
        stock: {},
        index: 0
      },
      global: {
        plugins: [router],
        stubs: {
          RatingBadge: true
        }
      }
    })

    expect(emptyWrapper.text()).toContain('-')
    expect(emptyWrapper.exists()).toBe(true)
  })

  it('handles alternative field names', () => {
    const altStock = {
      ticker: 'GOOGL',
      company: 'Alphabet Inc.',
      rating_to: 'HOLD',
      score: 85,
      target_to: '$150',
      brokerage: 'Morgan Stanley'
    }

    const altWrapper = mount(StockCard, {
      props: {
        stock: altStock,
        index: 1
      },
      global: {
        plugins: [router],
        stubs: {
          RatingBadge: true
        }
      }
    })

    const ratingBadge = altWrapper.findComponent({ name: 'RatingBadge' })
    expect(ratingBadge.props('rating')).toBe('HOLD')
    expect(altWrapper.text()).toContain('$150')
  })

  it('has proper styling classes', () => {
    expect(wrapper.classes()).toContain('bg-white')
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('border-gray-200')
    expect(wrapper.classes()).toContain('rounded-lg')
    expect(wrapper.classes()).toContain('p-6')
  })

  it('has hover effects', () => {
    expect(wrapper.classes()).toContain('hover:shadow-md')
    expect(wrapper.classes()).toContain('transition-shadow')
  })

  it('handles zero score correctly', () => {
    const zeroScoreStock = { ...mockStock, score: 0 }
    const zeroWrapper = mount(StockCard, {
      props: {
        stock: zeroScoreStock,
        index: 0
      },
      global: {
        plugins: [router],
        stubs: {
          RatingBadge: true
        }
      }
    })

    expect(zeroWrapper.text()).toContain('0/100')
    const progressBar = zeroWrapper.find('.bg-gradient-to-r')
    expect(progressBar.attributes('style')).toContain('width: 0%')
  })

  it('button has proper styling and hover effects', () => {
    const button = wrapper.find('router-link')
    expect(button.classes()).toContain('bg-gray-900')
    expect(button.classes()).toContain('text-white')
    expect(button.classes()).toContain('hover:bg-gray-800')
    expect(button.classes()).toContain('transition-colors')
  })
})