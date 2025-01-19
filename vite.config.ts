import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ["."], // Allow access to entire project directory
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});
