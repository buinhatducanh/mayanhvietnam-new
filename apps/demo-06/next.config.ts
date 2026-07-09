import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mayanhvietnam.com",
        pathname: "/image-data/**",
      },
      {
        protocol: "https",
        hostname: "mayanhvietnam.com",
        pathname: "/asset/**",
      },
    ],
  },
};

export default nextConfig;