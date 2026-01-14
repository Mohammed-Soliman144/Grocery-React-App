import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    })
  ],
  base: '/Grocery-React-App/',
  resolve: {
    alias: {'@': path.resolve(__dirname, 'src')},
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: [path.resolve(__dirname,"./src/assets/styles")],
        additionalData: `@use "abstracts/components/index" as *;`
      }
    }
  }
})
