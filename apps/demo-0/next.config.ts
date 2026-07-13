import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'mayanhvietnam.com', pathname: '/image-data/**' },
      { protocol: 'https', hostname: 'mayanhvietnam.com', pathname: '/asset/**' },
    ],
  },
};

export default nextConfig;
