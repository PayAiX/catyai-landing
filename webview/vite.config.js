import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: './webview',
  plugins: [react()],
  build: {
    outDir: '../webview-dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: { '@': path.resolve('./webview/src') },
  },
});
