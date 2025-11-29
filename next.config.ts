/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  experimental: {
    appDir: true,   // <<< THIS IS REQUIRED
  },
};

module.exports = nextConfig;
