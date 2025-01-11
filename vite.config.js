import { defineConfig } from "vite";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [
    nodePolyfills(),
    // Other plugins...
  ],
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      // Add other Node.js core modules as needed
    },
  },
});
