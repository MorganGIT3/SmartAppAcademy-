import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(fileURLToPath(new URL('./client/src', import.meta.url))),
      "/src": path.resolve(fileURLToPath(new URL('./client/src', import.meta.url))),
    },
  },
  root: path.resolve(fileURLToPath(new URL('.', import.meta.url))),
  build: {
    outDir: path.resolve(fileURLToPath(new URL('./dist', import.meta.url))), // ✅ dist à la racine du projet
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(fileURLToPath(new URL('./client/index.html', import.meta.url))),
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
  },
  server: {
    port: 5000,
  },
});
