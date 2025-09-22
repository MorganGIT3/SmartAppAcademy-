import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(fileURLToPath(new URL('./client/src', import.meta.url))),
    },
  },
  root: path.resolve(fileURLToPath(new URL('./client', import.meta.url))),
  build: {
    outDir: path.resolve(fileURLToPath(new URL('./dist', import.meta.url))),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(fileURLToPath(new URL('./client/index.html', import.meta.url))), // ✅ un seul entry point
    },
  },
  server: {
    port: 5000,
  },
});
