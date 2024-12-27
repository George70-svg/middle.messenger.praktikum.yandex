import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

export default defineConfig({
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
        sourceMap: true,
      },
    },
  },
})
