import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// chemins de base
const root = path.resolve(process.cwd(), "client");
const outDir = path.resolve(process.cwd(), "dist");

// entrée principale
const inputs: Record<string, string> = {
  main: path.join(root, "index.html"),
};

// ajoute page-builder SEULEMENT si le fichier existe
const pageBuilder = path.join(root, "page-builder.html");
if (fs.existsSync(pageBuilder)) {
  inputs.pageBuilder = pageBuilder;
}

// on n’active les plugins Replit qu’en dev sur Replit
const isReplit = !!process.env.REPL_ID;
const devPlugins = [];
if (isReplit) {
  // ces imports restent optionnels; s'ils ne sont pas installés en prod, on n'essaie même pas de les charger
  const runtimeErrorOverlay = (await import("@replit/vite-plugin-runtime-error-modal")).default;
  const { cartographer } = await import("@replit/vite-plugin-cartographer");
  devPlugins.push(runtimeErrorOverlay(), cartographer());
}

export default defineConfig({
  root, // << on garde ton répertoire "client" comme racine
  plugins: [react(), ...devPlugins],
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),
    },
  },
  server: {
    port: 5000,
    host: true, // Permet l'accès depuis l'extérieur
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  build: {
    outDir,            // <<< génère dans /dist (à la racine du repo) -> Vercel le détecte
    emptyOutDir: true,
    rollupOptions: {
      input: inputs,   // <<< plus d'erreur si page-builder.html n'existe pas
    },
  },

