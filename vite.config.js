import { defineConfig } from 'vite'
import path from 'path'
import sass from 'sass'
import checker from 'vite-plugin-checker'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    checker({
      typescript: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        sourceMap: true,
      },
    },
  },
})
