import { fileURLToPath, URL } from 'node:url'


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: "/Vue_Week4/",
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    }
  }
  // server: {
  //   port: 8080,
  //   hot: true
  // }
})
