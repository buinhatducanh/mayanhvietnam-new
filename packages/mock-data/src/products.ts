import type { ProductSummary, FlashSale } from './types';

// ============================================================
// PLACEHOLDER IMAGE (data URI SVG — không cần fetch từ CDN)
// ============================================================

const productThumb = (bg: string, label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <rect fill="${bg}" width="500" height="500"/>
      <rect x="175" y="120" width="150" height="120" rx="12" fill="#00000033" stroke="#ffffff22" stroke-width="2"/>
      <circle cx="250" cy="180" r="40" fill="#00000044" stroke="#ffffff22" stroke-width="2"/>
      <circle cx="250" cy="180" r="25" fill="#00000055"/>
      <circle cx="250" cy="180" r="12" fill="#ffffff22"/>
      <rect x="220" y="240" width="60" height="20" rx="4" fill="#00000022"/>
      <text x="250" y="300" font-family="system-ui" font-size="18" fill="#ffffff88" text-anchor="middle">${label}</text>
    </svg>`
  )}`;

const PHOTOS = [
  productThumb('#1a2332', 'Canon EOS'),
  productThumb('#1f1a28', 'Sony Alpha'),
  productThumb('#1a2822', 'Nikon Z'),
  productThumb('#281a1a', 'Fujifilm'),
  productThumb('#1a2030', 'DJI Drone'),
  productThumb('#1a2a28', 'GoPro'),
  productThumb('#2a281a', 'Lens RF'),
  productThumb('#1a1a2a', 'Lens FE'),
];

export const allProducts: ProductSummary[] = [
  {
    id: 'p1', slug: 'canon-eos-r50-kit-18-45mm',
    name: 'Canon EOS R50 Kit 18-45mm', thumbnail: PHOTOS[0], images: [{ url: PHOTOS[0], alt: 'Canon EOS R50', isPrimary: true }],
    price: 12990000, originalPrice: 14990000,
    badges: [{ type: 'sale', label: '-13%' }, { type: 'hot', label: 'Bán chạy' }],
    rating: { average: 4.8, count: 128 }, isUsed: false, brand: 'Canon', mount: 'Canon RF',
    availability: 'in_stock', category: 'may-anh', shortSpecs: ['APS-C 24.2MP', 'Dual Pixel AF', '4K 30fps'],
  },
  {
    id: 'p2', slug: 'sony-a7-iv-body',
    name: 'Sony A7 IV Body', thumbnail: PHOTOS[1], images: [{ url: PHOTOS[1], alt: 'Sony A7 IV', isPrimary: true }],
    price: 42990000, originalPrice: 46990000,
    badges: [{ type: 'new', label: 'Mới' }],
    rating: { average: 4.9, count: 96 }, isUsed: false, brand: 'Sony', mount: 'Sony E',
    availability: 'in_stock', category: 'may-anh', shortSpecs: ['Full-frame 33MP', 'Real-time AF', '4K 60fps'],
  },
  {
    id: 'p3', slug: 'nikon-z6-iii-body',
    name: 'Nikon Z6 III Body', thumbnail: PHOTOS[2], images: [{ url: PHOTOS[2], alt: 'Nikon Z6 III', isPrimary: true }],
    price: 52990000,
    badges: [{ type: 'new', label: 'Sắp về' }],
    rating: { average: 4.7, count: 42 }, isUsed: false, brand: 'Nikon', mount: 'Nikon Z',
    availability: 'pre_order', category: 'may-anh', shortSpecs: ['Full-frame 24.5MP', 'Expeed 7', '4K 120fps'],
  },
  {
    id: 'p4', slug: 'fujifilm-x-t5-body',
    name: 'Fujifilm X-T5 Body', thumbnail: PHOTOS[3], images: [{ url: PHOTOS[3], alt: 'Fujifilm X-T5', isPrimary: true }],
    price: 32990000, originalPrice: 35990000,
    badges: [{ type: 'sale', label: '-8%' }],
    rating: { average: 4.6, count: 71 }, isUsed: false, brand: 'Fujifilm', mount: 'Fujifilm X',
    availability: 'in_stock', category: 'may-anh', shortSpecs: ['APS-C 40MP', 'Film Simulation', 'IBIS 7-stop'],
  },
  {
    id: 'p5', slug: 'dji-mini-4-pro',
    name: 'DJI Mini 4 Pro Fly More Combo', thumbnail: PHOTOS[4], images: [{ url: PHOTOS[4], alt: 'DJI Mini 4 Pro', isPrimary: true }],
    price: 15990000, originalPrice: 18990000,
    badges: [{ type: 'sale', label: '-16%' }, { type: 'hot', label: 'Bán chạy' }],
    rating: { average: 4.8, count: 203 }, isUsed: false, brand: 'DJI',
    availability: 'in_stock', category: 'flycam', shortSpecs: ['249g', 'O4 Transmission', '4K HDR'],
  },
  {
    id: 'p6', slug: 'gopro-hero-13-black',
    name: 'GoPro HERO13 Black', thumbnail: PHOTOS[5], images: [{ url: PHOTOS[5], alt: 'GoPro HERO13', isPrimary: true }],
    price: 10490000,
    badges: [{ type: 'new', label: 'Mới' }],
    rating: { average: 4.5, count: 58 }, isUsed: false, brand: 'GoPro',
    availability: 'in_stock', category: 'action-camera', shortSpecs: ['5.3K', 'HyperSmooth 7', 'Waterproof 10m'],
  },
  {
    id: 'p7', slug: 'canon-rf-50mm-f18-stm',
    name: 'Canon RF 50mm f/1.8 STM', thumbnail: PHOTOS[6], images: [{ url: PHOTOS[6], alt: 'Canon RF 50mm f1.8', isPrimary: true }],
    price: 5990000,
    badges: [{ type: 'hot', label: 'Best seller' }],
    rating: { average: 4.7, count: 185 }, isUsed: false, brand: 'Canon', mount: 'Canon RF',
    availability: 'in_stock', category: 'ong-kinh', shortSpecs: ['f/1.8', 'STM Motor', '50mm'],
  },
  {
    id: 'p8', slug: 'sony-fe-28-70mm-f35-56-oss',
    name: 'Sony FE 28-70mm f/3.5-5.6 OSS Kit', thumbnail: PHOTOS[7], images: [{ url: PHOTOS[7], alt: 'Sony FE 28-70mm', isPrimary: true }],
    price: 3490000,
    badges: [{ type: 'sale', label: 'Giá tốt' }],
    rating: { average: 4.3, count: 112 }, isUsed: false, brand: 'Sony', mount: 'Sony E',
    availability: 'in_stock', category: 'ong-kinh', shortSpecs: ['28-70mm', 'OSS', 'Kit Lens'],
  },
];

export const flashSaleData: FlashSale = {
  id: 'fs1',
  title: '⚡ Flash Sale — Ưu đãi cực sốc',
  startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  endTime: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
  products: allProducts.slice(0, 6).map((p, i) => ({
    ...p,
    soldPercent: [60, 45, 30, 75, 85, 20][i],
  })),
};

// ============================================================
// HELPERS
// ============================================================

export const getProductsByCategory = (categorySlug: string, onlyNew = true) =>
  allProducts.filter(
    (p) => p.category === categorySlug && onlyNew !== p.isUsed
  );

export const getProductBySlug = (slug: string) =>
  allProducts.find((p) => p.slug === slug) ?? null;

export const getRelatedProducts = (product: ProductSummary, limit = 4) =>
  allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
