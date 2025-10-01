// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: "/", // 👈 change to "/" for custom domain
    define: {
      "process.env.API_KEY": JSON.stringify(env.VITE_API_KEY || ""),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      outDir: "docs",
      assetsDir: "assets",
      sourcemap: true,
    },
  };
});
