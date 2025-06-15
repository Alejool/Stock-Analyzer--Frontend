import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RatingBadge from '../../components/RatingBadge.vue'

describe('RatingBadge', () => {
  it('renders correctly with BUY rating', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: 'BUY'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe('BUY')
    expect(wrapper.classes()).toContain('bg-green-100')
    expect(wrapper.classes()).toContain('text-green-700')
  })

  it('renders correctly with HOLD rating', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: 'HOLD'
      }
    })

    expect(wrapper.text()).toBe('HOLD')
    expect(wrapper.classes()).toContain('bg-amber-100')
    expect(wrapper.classes()).toContain('text-amber-700')
  })

  it('renders correctly with SELL rating', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: 'SELL'
      }
    })

    expect(wrapper.text()).toBe('SELL')
    expect(wrapper.classes()).toContain('bg-red-100')
    expect(wrapper.classes()).toContain('text-red-700')
  })

  it('handles case insensitive ratings', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: 'buy'
      }
    })

    expect(wrapper.text()).toBe('buy')
    expect(wrapper.classes()).toContain('bg-green-100')
    expect(wrapper.classes()).toContain('text-green-700')
  })

  it('handles mixed case ratings', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: 'Hold'
      }
    })

    expect(wrapper.text()).toBe('Hold')
    expect(wrapper.classes()).toContain('bg-amber-100')
    expect(wrapper.classes()).toContain('text-amber-700')
  })

  it('handles unknown rating with default styling', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: 'UNKNOWN'
      }
    })

    expect(wrapper.text()).toBe('UNKNOWN')
    expect(wrapper.classes()).toContain('bg-gray-100')
    expect(wrapper.classes()).toContain('text-gray-700')
  })

  it('handles empty rating', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: ''
      }
    })

    expect(wrapper.text()).toBe('-')
    expect(wrapper.classes()).toContain('bg-gray-100')
    expect(wrapper.classes()).toContain('text-gray-700')
  })

  it('handles undefined rating', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: undefined
      }
    })

    expect(wrapper.text()).toBe('-')
    expect(wrapper.classes()).toContain('bg-gray-100')
    expect(wrapper.classes()).toContain('text-gray-700')
  })

  it('handles null rating', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: null
      }
    })

    expect(wrapper.text()).toBe('-')
    expect(wrapper.classes()).toContain('bg-gray-100')
    expect(wrapper.classes()).toContain('text-gray-700')
  })

  it('has proper base styling classes', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: 'BUY'
      }
    })

    expect(wrapper.classes()).toContain('px-3')
    expect(wrapper.classes()).toContain('py-1')
    expect(wrapper.classes()).toContain('rounded-full')
    expect(wrapper.classes()).toContain('text-xs')
    expect(wrapper.classes()).toContain('font-medium')
  })

  it('renders as span element', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: 'BUY'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('handles ratings with extra whitespace', () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: '  BUY  '
      }
    })

    expect(wrapper.text()).toBe('  BUY  ')
    // Should still match because toLowerCase() is applied
    expect(wrapper.classes()).toContain('bg-green-100')
    expect(wrapper.classes()).toContain('text-green-700')
  })
})