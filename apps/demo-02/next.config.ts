import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Remote <img> from public CDN — kept simple for the demo
    remotePatterns: [
      { protocol: 'https', hostname: 'mayanhvietnam.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
