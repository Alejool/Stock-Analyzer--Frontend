
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 1, name: 'Pinia' }),

  // getters
  getters: {
    doubledCount: (state) => state.count * 2,
  },
  // actions
  actions: {
    increment() {
      this.count++
    },
    decrement()
    {
      this.count--
    },
    double()
    {
      this.count*=2
    }
    
  },
})