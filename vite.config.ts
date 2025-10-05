import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '/src': '/client/src',
      '@': '/client/src'
    }
  },
  build: {
    outDir: 'dist', // ✅ dossier de sortie du build
    emptyOutDir: true // supprime l'ancien build avant d'en faire un nouveau
  },
  server: {
    port: 3000, // optionnel : port local
  },
})
