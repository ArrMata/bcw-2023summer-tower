import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../bcw-2023summer-tower/client',
    sourcemap: false
  },
  base: '',
  server: {
    port: 8080
  }
})
