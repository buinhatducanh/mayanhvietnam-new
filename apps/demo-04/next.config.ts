import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Figma Make images, no CDN yet
  },
};

export default nextConfig;
