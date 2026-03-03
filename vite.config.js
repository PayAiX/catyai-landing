import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// SEO pre-rendering enabled
export default defineConfig({
  plugins: [react()],
  // Enable SPA fallback for preview server (serves index.html for all routes)
  appType: 'spa',
})
