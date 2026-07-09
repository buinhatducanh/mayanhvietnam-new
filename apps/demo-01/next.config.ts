import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Tier 2.2 — Image optimization: WebP/AVIF, responsive srcset
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828],
    qualities: [60, 75, 80, 90, 100],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'mayanhvietnam.com' },
    ],
    // Tier 2.2 — Google Lighthouse yêu cầu unoptimized=false cho remote images
    // Next.js Image Optimization tự xử lý, không cần thêm loader
  },

  // Tier 1.5 — Redirect rules cho SEO (nếu cần)
  // async redirects() {
  //   return [
  //     { source: '/old-url', destination: '/new-url', permanent: true },
  //   ];
  // },
};

export default nextConfig;
