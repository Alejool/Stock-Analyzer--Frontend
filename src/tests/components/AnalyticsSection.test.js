import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import AnalyticsSection from '../../components/AnalyticsSection.vue'
import MetricCard from '../../components/MetricCard.vue'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/analytics', component: { template: '<div>Analytics</div>' } },
    { path: '/reports', component: { template: '<div>Reports</div>' } }
  ]
})

describe('AnalyticsSection', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AnalyticsSection, {
      global: {
        plugins: [router],
        stubs: {
          MetricCard: true
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
    expect(title.text()).toContain('Análisis del Mercado')
  })

  it('displays the section description', () => {
    const description = wrapper.find('p')
    expect(description.exists()).toBe(true)
    expect(description.text()).toContain('Métricas clave y estadísticas en tiempo real')
  })

  it('renders four MetricCard components', () => {
    const metricCards = wrapper.findAllComponents({ name: 'MetricCard' })
    expect(metricCards.length).toBe(4)
  })

  it('passes correct props to MetricCard components', () => {
    const metricCards = wrapper.findAllComponents({ name: 'MetricCard' })
    
    // First metric card - Acciones Analizadas
    expect(metricCards[0].props('value')).toBe('1,247')
    expect(metricCards[0].props('label')).toBe('Acciones Analizadas')
    expect(metricCards[0].props('color')).toBe('blue')
    
    // Second metric card - Precisión del Modelo
    expect(metricCards[1].props('value')).toBe('89.3%')
    expect(metricCards[1].props('label')).toBe('Precisión del Modelo')
    expect(metricCards[1].props('color')).toBe('green')
    
    // Third metric card - Rendimiento Promedio
    expect(metricCards[2].props('value')).toBe('+12.4%')
    expect(metricCards[2].props('label')).toBe('Rendimiento Promedio')
    expect(metricCards[2].props('color')).toBe('purple')
    
    // Fourth metric card - Monitoreo Activo
    expect(metricCards[3].props('value')).toBe('24/7')
    expect(metricCards[3].props('label')).toBe('Monitoreo Activo')
    expect(metricCards[3].props('color')).toBe('amber')
  })

  it('renders two action buttons', () => {
    const buttons = wrapper.findAll('router-link')
    expect(buttons.length).toBe(2)
  })

  it('renders "Ver Análisis Completo" button with correct link', () => {
    const buttons = wrapper.findAll('router-link')
    const analysisButton = buttons[0]
    
    expect(analysisButton.attributes('to')).toBe('/analytics')
    expect(analysisButton.text()).toContain('Ver Análisis Completo')
  })

  it('renders "Descargar Reporte" button with correct link', () => {
    const buttons = wrapper.findAll('router-link')
    const reportButton = buttons[1]
    
    expect(reportButton.attributes('to')).toBe('/reports')
    expect(reportButton.text()).toContain('Descargar Reporte')
  })

  it('has proper grid layout for metrics', () => {
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-2')
    expect(grid.classes()).toContain('lg:grid-cols-4')
  })

  it('has proper styling classes for the main container', () => {
    expect(wrapper.classes()).toContain('bg-white')
    expect(wrapper.classes()).toContain('rounded-xl')
    expect(wrapper.classes()).toContain('shadow-sm')
    expect(wrapper.classes()).toContain('p-8')
  })

  it('renders SVG icons in buttons', () => {
    const svgs = wrapper.findAll('svg')
    expect(svgs.length).toBe(2)
    
    // Check that each SVG has a path element
    svgs.forEach(svg => {
      expect(svg.find('path').exists()).toBe(true)
    })
  })

  it('has proper button styling', () => {
    const buttons = wrapper.findAll('router-link')
    
    // Primary button (Ver Análisis Completo)
    const primaryButton = buttons[0]
    expect(primaryButton.classes()).toContain('bg-gray-900')
    expect(primaryButton.classes()).toContain('text-white')
    expect(primaryButton.classes()).toContain('hover:bg-gray-800')
    
    // Secondary button (Descargar Reporte)
    const secondaryButton = buttons[1]
    expect(secondaryButton.classes()).toContain('border')
    expect(secondaryButton.classes()).toContain('border-gray-300')
    expect(secondaryButton.classes()).toContain('text-gray-700')
    expect(secondaryButton.classes()).toContain('hover:bg-gray-50')
  })

  it('has responsive button layout', () => {
    const buttonContainer = wrapper.find('.flex')
    expect(buttonContainer.classes()).toContain('flex-col')
    expect(buttonContainer.classes()).toContain('sm:flex-row')
  })

  it('has proper spacing and transitions', () => {
    const buttons = wrapper.findAll('router-link')
    
    buttons.forEach(button => {
      expect(button.classes()).toContain('transition-colors')
      expect(button.classes()).toContain('duration-200')
      expect(button.classes()).toContain('px-6')
      expect(button.classes()).toContain('py-3')
      expect(button.classes()).toContain('rounded-lg')
    })
  })
})