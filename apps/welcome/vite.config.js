import { defineConfig } from "vite";
import { resolve } from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      // plugins: [nodeResolve({})],
      input: {
         main: resolve(__dirname, 'index.html'),
         evolution: resolve(__dirname, 'evolution.html'),
      },
   }

  }
})
