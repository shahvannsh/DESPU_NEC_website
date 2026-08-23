import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // split vendor libraries into their own chunk so browsers cache
        // React/Framer Motion/Router separately from app code — app code
        // changes far more often, so this avoids re-downloading unrelated
        // dependencies on every deploy, and speeds up repeat visits
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('react-router-dom')) return 'router'
            if (id.includes('react-dom') || id.includes('/react/')) return 'vendor'
          }
        },
      },
    },
  },
})
