/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tokens.1inch.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "tokens-data.1inch.io",
        port: "",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding", "keyv");
    return config;
  },
};

module.exports = nextConfig;
