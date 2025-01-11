const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // Other configuration options...
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      // Add other Node.js core modules as needed
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    // Other plugins...
  ],
};
