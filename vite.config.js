import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin: injectează <link rel="llms-manifest"> în <head>
// Permite AI crawlerelor care ignoră redirect-ul 302 să găsească manifestul
function injectLlmsManifest() {
  return {
    name: 'inject-llms-manifest',
    transformIndexHtml(html) {
      const manifestLink = `<link rel="llms-manifest" type="application/json" href="https://api.catyai.io/geo/v1/manifest.json?widget_id=7e750a95-4d72-4c82-8eae-bb37a89194c8">`;
      return html.replace('</head>', `  ${manifestLink}\n</head>`);
    }
  };
}

// https://vite.dev/config/
// SEO pre-rendering enabled
export default defineConfig({
  plugins: [react(), injectLlmsManifest()],
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
