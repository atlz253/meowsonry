import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  root: "tests/e2e/vite",
  server: {
    port: 3000,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "../../../dist/meowsonry-layout.iife.js",
          dest: ".",
        },
      ],
    }),
  ],
});
