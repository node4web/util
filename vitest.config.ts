import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
// https://vitest.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "#lib/getMainArgs.js": "./src/lib/getMainArgs-default.ts",
    },
  },
});
