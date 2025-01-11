/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config options ...
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve("crypto-browserify"),
      };
    }
    return config;
  },
  images: {
    domains: ["83eeq32jm8.ufs.sh"],
  },
};

module.exports = nextConfig;
