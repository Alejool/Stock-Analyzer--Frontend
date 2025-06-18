import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],

  server: {
    host: true,
    allowedHosts: [
      "localhost",
      // 'b43c-2a09-bac5-26fc-aa-00-11-1be.ngrok-free.app',
      // '*.ngrok-free.app',
    ],
  },
  resolve: {
    alias: {
      "@": "./src"
    },
  },
});
