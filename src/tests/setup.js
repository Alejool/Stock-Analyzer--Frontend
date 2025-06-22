import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import { ref } from 'vue'

// Mock global objects
global.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Mock global de Pinia que funciona correctamente
export const createMockStore = (initialState = {}) => {
  const state = {}
  const getters = {}
  const actions = {}

  // Convertir el estado inicial a refs reactivos
  Object.keys(initialState).forEach((key) => {
    if (typeof initialState[key] === 'function') {
      actions[key] = vi.fn(initialState[key])
    } else {
      state[key] = ref(initialState[key])
    }
  })

  return {
    ...state,
    ...getters,
    ...actions,
    // Propiedades internas de Pinia
    $id: 'mock-store',
    $state: state,
    $patch: vi.fn(),
    $reset: vi.fn(),
    $subscribe: vi.fn(() => vi.fn()),
    $onAction: vi.fn(() => vi.fn()),
    $dispose: vi.fn(),
  }
}

// Mock global de storeToRefs que funciona correctamente
export const mockStoreToRefs = (store) => {
  if (!store) return {}

  const refs = {}
  Object.keys(store).forEach((key) => {
    // Ignorar métodos y propiedades internas de Pinia
    if (key.startsWith('$') || typeof store[key] === 'function') {
      return
    }

    // Si ya es un ref, usarlo directamente
    if (store[key] && typeof store[key] === 'object' && 'value' in store[key]) {
      refs[key] = store[key]
    } else {
      // Si no es un ref, crear uno
      refs[key] = ref(store[key])
    }
  })

  return refs
}

// Configuración global de mocks
vi.mock('pinia', async () => {
  const actual = await vi.importActual('pinia')
  return {
    ...actual,
    storeToRefs: vi.fn(mockStoreToRefs),
  }
})

// Global test configuration
const config = {
  global: {
    stubs: {
      transition: false,
      'router-link': true,
      'router-view': true
    }
  }
}

export { config }
config.global.stubs = {
  transition: false,
  'router-link': true,
  'router-view': true
}
