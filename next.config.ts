import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
        },
      };

      config.plugins = [
        ...(config.plugins || []),
        require("webpack").ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ];
    }
    return config;
  },
  images: {
    domains: ["83eeq32jm8.ufs.sh"],
  },
};

export default nextConfig;
