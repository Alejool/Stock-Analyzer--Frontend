import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import HeroSection from '../../components/HeroSection.vue'
import FeaturedRecommendation from '../../components/FeaturedRecommendation.vue'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/stocks', component: { template: '<div>Stocks</div>' } },
    { path: '/analytics', component: { template: '<div>Analytics</div>' } }
  ]
})

describe('HeroSection', () => {
  let wrapper
  const mockRecommendation = {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    score: 92,
    target_price: '$185',
    current_rating: 'BUY',
    confidence: 87
  }

  beforeEach(() => {
    wrapper = mount(HeroSection, {
      props: {
        recommendation: mockRecommendation
      },
      global: {
        plugins: [router],
        stubs: {
          FeaturedRecommendation: true
        }
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the main title', () => {
    const title = wrapper.find('h1')
    expect(title.exists()).toBe(true)
    expect(title.text()).toContain('Inversiones')
    expect(title.text()).toContain('Inteligentes')
  })

  it('displays the subtitle', () => {
    const subtitle = wrapper.find('p')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toContain('Descubre las mejores oportunidades')
  })

  it('renders call-to-action buttons', () => {
    const buttons = wrapper.findAll('router-link, button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('passes recommendation prop to FeaturedRecommendation component', () => {
    const featuredComponent = wrapper.findComponent({ name: 'FeaturedRecommendation' })
    expect(featuredComponent.exists()).toBe(true)
    expect(featuredComponent.props('recommendation')).toEqual(mockRecommendation)
  })

  it('has proper CSS classes for styling', () => {
    expect(wrapper.classes()).toContain('text-center')
    const title = wrapper.find('h1')
    expect(title.classes()).toContain('text-5xl')
  })
})

describe('HeroSection with empty recommendation', () => {
  it('handles empty recommendation gracefully', () => {
    const wrapper = mount(HeroSection, {
      props: {
        recommendation: {}
      },
      global: {
        plugins: [router],
        stubs: {
          FeaturedRecommendation: true
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
    const featuredComponent = wrapper.findComponent({ name: 'FeaturedRecommendation' })
    expect(featuredComponent.props('recommendation')).toEqual({})
  })
})