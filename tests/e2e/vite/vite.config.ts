import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  root: "tests/e2e/vite",
});
