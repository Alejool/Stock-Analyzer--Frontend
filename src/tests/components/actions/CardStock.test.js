import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CardStock from '../../../components/actions/CardStock.vue'

describe('CardStock Component', () => {
  let wrapper
  const mockStock = {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    current_rating: 'BUY',
    rating_to: 'BUY',
    rating_from: 'HOLD',
    score: 92,
    confidence: 0.85,
    target_to: '$185.00',
    target_from: '$175.00',
    brokerage: 'Goldman Sachs',
    action: 'Upgrade',
    time: '2024-01-15T10:30:00Z',
    reason: 'Strong quarterly earnings and positive outlook'
  }

  beforeEach(() => {
    wrapper = mount(CardStock, {
      props: {
        stock: mockStock,
        index: 0
      }
    })
  })

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should display stock ticker prominently', () => {
    const ticker = wrapper.find('h3')
    expect(ticker.exists()).toBe(true)
    expect(ticker.text()).toBe('AAPL')
    expect(ticker.classes()).toContain('text-4xl')
  })

  it('should display company name and action', () => {
    expect(wrapper.text()).toContain('Apple Inc.')
    expect(wrapper.text()).toContain('Upgrade')
    expect(wrapper.text()).toContain('Goldman Sachs')
  })

  it('should display confidence score and bar', () => {
    expect(wrapper.text()).toContain('85%')
    const confidenceBar = wrapper.find('.transition-all')
    expect(confidenceBar.exists()).toBe(true)
  })

  it('should display rating change information', () => {
    expect(wrapper.text()).toContain('HOLD') // rating_from
    expect(wrapper.text()).toContain('BUY')  // rating_to
  })

  it('should display target price change', () => {
    expect(wrapper.text()).toContain('$175.00')
    expect(wrapper.text()).toContain('$185.00')
  })

  it('should display formatted date', () => {
    expect(wrapper.text()).toContain('📅')
  })

  it('should display reason when provided', () => {
    expect(wrapper.text()).toContain('Strong quarterly earnings and positive outlook')
    const reasonSection = wrapper.find('.bg-blue-50')
    expect(reasonSection.exists()).toBe(true)
  })

  it('should handle missing data gracefully', () => {
    const emptyWrapper = mount(CardStock, {
      props: {
        stock: {},
        index: 0
      }
    })

    expect(emptyWrapper.text()).toContain('-')
    expect(emptyWrapper.text()).toContain('0 %')
  })

  it('should display score badge with proper styling', () => {
    const scoreBadge = wrapper.find('.absolute.-top-3.-right-3')
    expect(scoreBadge.exists()).toBe(true)
    expect(scoreBadge.text()).toContain('92 %')
  })
})