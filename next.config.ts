import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.chanel.com",
      },
      {
        protocol: "https",
        hostname: "kenperfume.com",
      },
      {
        protocol: 'https',
        hostname: 'product.hstatic.net',
      },
    ],
  },
};

export default nextConfig;
