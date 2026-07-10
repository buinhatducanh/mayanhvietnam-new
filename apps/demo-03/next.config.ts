import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'mayanhvietnam.com', pathname: '/image-data/**' },
      { protocol: 'https', hostname: 'mayanhvietnam.com', pathname: '/asset/**' },
    ],
  },
};

export default nextConfig;
