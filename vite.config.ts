// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    // 👇 important — must match your GitHub repo name exactly
    base: "/",

    define: {
      "process.env.API_KEY": JSON.stringify(env.VITE_API_KEY || ""),
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },

    build: {
      // output folder (for GitHub Pages you can choose "docs" or "dist")
      // if you use "docs", set GitHub Pages → Branch: main, Folder: /docs
      // if you keep "dist", use GitHub Actions to deploy automatically
      outDir: "docs", // <-- easiest for Pages, just switch from dist to docs
      assetsDir: "assets",
      sourcemap: true,
    },
  };
});
