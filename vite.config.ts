import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), 
    tailwindcss()
  ],
  server: {
    host: true, // Allow connections from all hosts
    allowedHosts: [
      'localhost',
      '43aa-167-0-100-7.ngrok-free.app',
      '*.ngrok-free.app',
    ],
  }
  
})
