// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    // IMPORTANT: match the GitHub repo name
    base: "/NeuroPilot-AICC/",

    // Safe way to expose public keys only — don’t push secrets
    define: {
      "process.env.API_KEY": JSON.stringify(env.VITE_API_KEY || ""),
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },

    build: {
      // GitHub Pages: normally “dist”, but you can change to “docs” if you want to commit the build
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: true,
    },
  };
});
