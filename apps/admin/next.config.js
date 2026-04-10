/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@dataweave/ui", "@dataweave/core"],
};

module.exports = nextConfig;
