import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FeaturedRecommendation from '../../components/FeaturedRecommendation.vue'
import MetricCard from '../../components/MetricCard.vue'

describe('FeaturedRecommendation', () => {
  let wrapper
  const mockRecommendation = {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    score: 92,
    target_price: '$185',
    current_rating: 'BUY',
    confidence: 0.87
  }

  beforeEach(() => {
    wrapper = mount(FeaturedRecommendation, {
      props: {
        recommendation: mockRecommendation
      },
      global: {
        stubs: {
          MetricCard: true
        }
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the recommendation badge', () => {
    const badge = wrapper.find('.bg-amber-400')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toContain('Recomendación Destacada')
  })

  it('displays ticker and company name', () => {
    expect(wrapper.text()).toContain('AAPL')
    expect(wrapper.text()).toContain('Apple Inc.')
  })

  it('renders three MetricCard components', () => {
    const metricCards = wrapper.findAllComponents({ name: 'MetricCard' })
    expect(metricCards.length).toBe(3)
  })

  it('passes correct props to MetricCard components', () => {
    const metricCards = wrapper.findAllComponents({ name: 'MetricCard' })
    
    // Score card
    expect(metricCards[0].props('value')).toBe('92/100')
    expect(metricCards[0].props('label')).toBe('Puntuación IA')
    expect(metricCards[0].props('color')).toBe('green')
    
    // Target price card
    expect(metricCards[1].props('value')).toBe('$185')
    expect(metricCards[1].props('label')).toBe('Precio Objetivo')
    expect(metricCards[1].props('color')).toBe('blue')
    
    // Rating card
    expect(metricCards[2].props('value')).toBe('BUY')
    expect(metricCards[2].props('label')).toBe('Recomendación')
    expect(metricCards[2].props('color')).toBe('purple')
  })

  it('displays confidence percentage', () => {
    expect(wrapper.text()).toContain('87%')
    expect(wrapper.text()).toContain('de confianza')
  })

  it('handles missing recommendation data gracefully', () => {
    const emptyWrapper = mount(FeaturedRecommendation, {
      props: {
        recommendation: {}
      },
      global: {
        stubs: {
          MetricCard: true
        }
      }
    })

    expect(emptyWrapper.text()).toContain('-')
    expect(emptyWrapper.exists()).toBe(true)
  })

  it('handles confidence as decimal correctly', () => {
    expect(wrapper.text()).toContain('87%')
  })

  it('has proper styling classes', () => {
    expect(wrapper.classes()).toContain('bg-white/10')
    expect(wrapper.classes()).toContain('backdrop-blur-sm')
    expect(wrapper.classes()).toContain('rounded-xl')
  })
})