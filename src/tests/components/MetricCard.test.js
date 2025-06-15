import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MetricCard from '../../components/MetricCard.vue'

describe('MetricCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(MetricCard, {
      props: {
        value: '92/100',
        label: 'Puntuación IA',
        color: 'green'
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the value', () => {
    expect(wrapper.text()).toContain('92/100')
  })

  it('displays the label', () => {
    expect(wrapper.text()).toContain('Puntuación IA')
  })

  it('applies correct color class for green', () => {
    const valueElement = wrapper.find('.text-2xl')
    expect(valueElement.classes()).toContain('text-green-300')
  })

  it('applies correct color class for blue', () => {
    const blueWrapper = mount(MetricCard, {
      props: {
        value: '$185',
        label: 'Precio Objetivo',
        color: 'blue'
      }
    })
    
    const valueElement = blueWrapper.find('.text-2xl')
    expect(valueElement.classes()).toContain('text-blue-300')
  })

  it('applies correct color class for purple', () => {
    const purpleWrapper = mount(MetricCard, {
      props: {
        value: 'BUY',
        label: 'Recomendación',
        color: 'purple'
      }
    })
    
    const valueElement = purpleWrapper.find('.text-2xl')
    expect(valueElement.classes()).toContain('text-purple-300')
  })

  it('applies correct color class for amber', () => {
    const amberWrapper = mount(MetricCard, {
      props: {
        value: '24/7',
        label: 'Monitoreo',
        color: 'amber'
      }
    })
    
    const valueElement = amberWrapper.find('.text-2xl')
    expect(valueElement.classes()).toContain('text-amber-300')
  })

  it('defaults to white color when invalid color provided', () => {
    const defaultWrapper = mount(MetricCard, {
      props: {
        value: 'Test',
        label: 'Test Label',
        color: 'invalid-color'
      }
    })
    
    const valueElement = defaultWrapper.find('.text-2xl')
    expect(valueElement.classes()).toContain('text-white')
  })

  it('defaults to white color when no color provided', () => {
    const noColorWrapper = mount(MetricCard, {
      props: {
        value: 'Test',
        label: 'Test Label'
      }
    })
    
    const valueElement = noColorWrapper.find('.text-2xl')
    expect(valueElement.classes()).toContain('text-white')
  })

  it('accepts numeric values', () => {
    const numericWrapper = mount(MetricCard, {
      props: {
        value: 1247,
        label: 'Acciones Analizadas',
        color: 'blue'
      }
    })
    
    expect(numericWrapper.text()).toContain('1247')
  })

  it('has proper styling classes', () => {
    expect(wrapper.classes()).toContain('bg-white/10')
    expect(wrapper.classes()).toContain('rounded-lg')
    expect(wrapper.classes()).toContain('p-4')
  })

  it('has proper text styling for value and label', () => {
    const valueElement = wrapper.find('.text-2xl')
    const labelElement = wrapper.find('.text-white\/70')
    
    expect(valueElement.classes()).toContain('font-light')
    expect(valueElement.classes()).toContain('mb-1')
    expect(labelElement.classes()).toContain('text-sm')
  })
})