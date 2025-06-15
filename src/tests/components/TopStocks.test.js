import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import TopStocks from '../../components/TopStocks.vue'
import StockCard from '../../components/StockCard.vue'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/stocks', component: { template: '<div>Stocks</div>' } }
  ]
})

describe('TopStocks', () => {
  let wrapper
  const mockStocks = [
    {
      ticker: 'AAPL',
      company: 'Apple Inc.',
      current_rating: 'BUY',
      score: 92,
      target_price: '$185',
      brokerage: 'Goldman Sachs'
    },
    {
      ticker: 'GOOGL',
      company: 'Alphabet Inc.',
      current_rating: 'HOLD',
      score: 85,
      target_price: '$150',
      brokerage: 'Morgan Stanley'
    },
    {
      ticker: 'MSFT',
      company: 'Microsoft Corp.',
      current_rating: 'BUY',
      score: 88,
      target_price: '$420',
      brokerage: 'JP Morgan'
    }
  ]

  beforeEach(() => {
    wrapper = mount(TopStocks, {
      props: {
        stocks: mockStocks
      },
      global: {
        plugins: [router],
        stubs: {
          StockCard: true
        }
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the section title', () => {
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toContain('Top Oportunidades')
  })

  it('displays the section description', () => {
    const description = wrapper.find('p')
    expect(description.exists()).toBe(true)
    expect(description.text()).toContain('Las mejores inversiones según nuestro algoritmo')
  })

  it('renders correct number of StockCard components', () => {
    const stockCards = wrapper.findAllComponents({ name: 'StockCard' })
    expect(stockCards.length).toBe(3)
  })

  it('passes correct props to StockCard components', () => {
    const stockCards = wrapper.findAllComponents({ name: 'StockCard' })
    
    // First stock card
    expect(stockCards[0].props('stock')).toEqual(mockStocks[0])
    expect(stockCards[0].props('index')).toBe(0)
    
    // Second stock card
    expect(stockCards[1].props('stock')).toEqual(mockStocks[1])
    expect(stockCards[1].props('index')).toBe(1)
    
    // Third stock card
    expect(stockCards[2].props('stock')).toEqual(mockStocks[2])
    expect(stockCards[2].props('index')).toBe(2)
  })

  it('renders "Ver todas" link', () => {
    const link = wrapper.find('router-link')
    expect(link.exists()).toBe(true)
    expect(link.attributes('to')).toBe('/stocks')
    expect(link.text()).toContain('Ver todas las recomendaciones')
  })

  it('has proper grid layout classes', () => {
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('lg:grid-cols-2')
    expect(grid.classes()).toContain('xl:grid-cols-3')
  })

  it('handles empty stocks array', () => {
    const emptyWrapper = mount(TopStocks, {
      props: {
        stocks: []
      },
      global: {
        plugins: [router],
        stubs: {
          StockCard: true
        }
      }
    })

    const stockCards = emptyWrapper.findAllComponents({ name: 'StockCard' })
    expect(stockCards.length).toBe(0)
    expect(emptyWrapper.exists()).toBe(true)
  })

  it('has proper styling classes', () => {
    expect(wrapper.classes()).toContain('bg-white')
    expect(wrapper.classes()).toContain('rounded-xl')
    expect(wrapper.classes()).toContain('shadow-sm')
    expect(wrapper.classes()).toContain('p-8')
  })

  it('renders arrow icon in the link', () => {
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.find('path').exists()).toBe(true)
  })

  it('has proper hover effects on link', () => {
    const link = wrapper.find('router-link')
    expect(link.classes()).toContain('hover:text-gray-900')
    expect(link.classes()).toContain('transition-colors')
  })
})