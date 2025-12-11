import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(), 
    tsconfigPaths(),
    mode === 'analyze' && visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  build: {
    sourcemap: mode !== 'production', // No sourcemaps in production
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'framer-motion'],
          utils: ['date-fns', 'dompurify', 'react-markdown'],
          firebase: ['firebase/app', 'firebase/firestore']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
}))
