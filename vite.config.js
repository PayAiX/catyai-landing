import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// SEO pre-rendering enabled
export default defineConfig({
  plugins: [react()],
  // Enable SPA fallback for preview server (serves index.html for all routes)
  appType: 'spa',
  build: {
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Heavy components in separate chunks
          'vendor-utils': ['react-helmet-async'],
        },
      },
    },
    // Increase chunk size warning limit (we're optimizing)
    chunkSizeWarningLimit: 600,
  },
})
