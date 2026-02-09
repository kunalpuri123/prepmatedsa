import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api/leetcode/graphql": {
        target: "https://leetcode.com/graphql",
        changeOrigin: true,
        rewrite: () => "",
      },
      "/api/leetcode/problems": {
        target: "https://leetcode.com",
        changeOrigin: true,
        rewrite: () => "/api/problems/all/",
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
