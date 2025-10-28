import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'refractor/lib/core': 'refractor/core',
      'refractor/lib/all': 'refractor/all',
    },
  },
  optimizeDeps: {
    include: ['react-markdown'],
  },
})
