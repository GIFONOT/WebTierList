import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 5005,
    strictPort: true,
  },
  resolve: {
    // быстрые пути
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/app/assets"),
      "@stores": path.resolve(__dirname, "./src/app/stores"),
      "@entities": path.resolve(__dirname, "./src/app/entities"),
    },
  },
});
