import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CardMetric from '../../../components/card/CardMetric.vue'

describe('CardMetric Component', () => {
  let wrapper
  const defaultProps = {
    title: 'Total Ratings',
    value: '1,247',
    backgroundColor: 'from-blue-50 to-blue-100',
    textColor: 'text-blue-600',
    labelColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    iconBackground: 'bg-blue-500',
    icon: '📈'
  }

  beforeEach(() => {
    wrapper = mount(CardMetric, {
      props: defaultProps
    })
  })

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should display the title', () => {
    expect(wrapper.text()).toContain('Total Ratings')
  })

  it('should display the value', () => {
    expect(wrapper.text()).toContain('1,247')
  })

  it('should display the icon', () => {
    expect(wrapper.text()).toContain('📈')
  })

  it('should apply background classes', () => {
    expect(wrapper.classes()).toContain('from-blue-50')
    expect(wrapper.classes()).toContain('to-blue-100')
  })

  it('should apply border classes', () => {
    expect(wrapper.classes()).toContain('border-blue-200')
  })

  it('should have pulse animation element', () => {
    const pulseElement = wrapper.find('.animate-pulse')
    expect(pulseElement.exists()).toBe(true)
  })

  it('should format date values correctly', () => {
    const dateWrapper = mount(CardMetric, {
      props: {
        ...defaultProps,
        value: '2024-01-15T10:30:00Z'
      }
    })
    
    const formattedDate = new Date('2024-01-15T10:30:00Z').toLocaleDateString()
    expect(dateWrapper.text()).toContain(formattedDate)
  })

  it('should display extra info when provided', () => {
    const wrapperWithExtra = mount(CardMetric, {
      props: {
        ...defaultProps,
        extraInfo: 'Last updated 5 minutes ago',
        extraInfoColor: 'text-green-600'
      }
    })

    expect(wrapperWithExtra.text()).toContain('Last updated 5 minutes ago')
  })

  it('should have hover effects', () => {
    expect(wrapper.classes()).toContain('hover:shadow-lg')
    expect(wrapper.classes()).toContain('transition-all')
  })
})