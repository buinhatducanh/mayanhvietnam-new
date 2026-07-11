/**
 * Brand banner data — derived from products, with logo + tagline + featured products.
 *
 * Auto-derived from `allProducts` at runtime via `getBrandBanners()` helper.
 * Static metadata (logo SVG, tagline, gradient, accent color) is hand-curated.
 *
 * Use case: Home page "Mua theo hãng" section — each brand rendered as a card
 * with logo, name, product count, gradient background, and CTA link.
 */

import type { ProductSummary } from './types';
import { allProducts } from './products';

// ─── Brand metadata ──────────────────────────────────────────────────────────

export interface BrandMeta {
  /** Display name (Vietnamese / English) */
  name: string;
  /** URL slug for filtering / linking */
  slug: string;
  /** Short tagline (1-line marketing copy) */
  tagline: string;
  /** 2-3 line description */
  description: string;
  /** Brand primary color (hex) */
  accent: string;
  /** Background gradient (CSS gradient string) */
  gradient: string;
  /** Inline SVG logo (lightweight, no external deps) */
  logo: string;
  /** Optional font weight for logo */
  logoStyle?: 'serif' | 'sans' | 'mono';
}

export const BRAND_META: Record<string, BrandMeta> = {
  Canon: {
    name: 'Canon',
    slug: 'canon',
    tagline: 'Delighting You Always',
    description:
      'Máy ảnh mirrorless, DSLR và ống kính RF chính hãng từ Canon — từ R50 entry đến R5 Mark II flagship.',
    accent: '#cc0000',
    gradient: 'linear-gradient(135deg, #1a0606 0%, #2d0a0a 50%, #1a0606 100%)',
    logoStyle: 'serif',
    logo: `<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><text x="0" y="44" font-family="Georgia, serif" font-size="44" font-weight="700" letter-spacing="-1">Canon</text></svg>`,
  },
  Sony: {
    name: 'Sony',
    slug: 'sony',
    tagline: 'BE MOVED',
    description:
      'Alpha mirrorless full-frame — A7R V, A7 IV, ZV-E10 II cho cả ảnh tĩnh và quay phim chuyên nghiệp.',
    accent: '#000000',
    gradient: 'linear-gradient(135deg, #0a0a14 0%, #141428 50%, #0a0a14 100%)',
    logoStyle: 'sans',
    logo: `<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><text x="0" y="44" font-family="Arial, sans-serif" font-size="44" font-weight="700" letter-spacing="3">SONY</text></svg>`,
  },
  Nikon: {
    name: 'Nikon',
    slug: 'nikon',
    tagline: 'I AM Nikon',
    description:
      'Z-mount mirrorless thế hệ mới — Z6 III, Z50 II với EXPEED 7 và công nghệ Partially Stacked CMOS.',
    accent: '#ffcc00',
    gradient: 'linear-gradient(135deg, #0a0a00 0%, #14140a 50%, #0a0a00 100%)',
    logoStyle: 'serif',
    logo: `<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><text x="0" y="44" font-family="Georgia, serif" font-size="44" font-weight="700" letter-spacing="-1">Nikon</text></svg>`,
  },
  Fujifilm: {
    name: 'Fujifilm',
    slug: 'fujifilm',
    tagline: 'Value from Innovation',
    description:
      'X-series mirrorless APS-C với 19 Film Simulation đặc trưng — X-T5, X-H2S cho phong cách retro.',
    accent: '#009639',
    gradient: 'linear-gradient(135deg, #061a0a 0%, #0a2d14 50%, #061a0a 100%)',
    logoStyle: 'sans',
    logo: `<svg viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><text x="0" y="44" font-family="Arial, sans-serif" font-size="36" font-weight="700">FUJIFILM</text></svg>`,
  },
  DJI: {
    name: 'DJI',
    slug: 'dji',
    tagline: 'Future of Possible',
    description:
      'Drone, action camera và gimbal từ DJI — Mavic 4 Pro, Mini 5 Pro, Osmo Pocket 4 cho filmmaker và vlogger.',
    accent: '#0066ff',
    gradient: 'linear-gradient(135deg, #00061a 0%, #0a1428 50%, #00061a 100%)',
    logoStyle: 'sans',
    logo: `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><text x="0" y="44" font-family="Arial, sans-serif" font-size="48" font-weight="900" letter-spacing="2">DJI</text></svg>`,
  },
  GoPro: {
    name: 'GoPro',
    slug: 'gopro',
    tagline: 'Be a Hero',
    description:
      'Action camera flagship — GoPro Hero 13 Black với 5.3K 60fps, HyperSmooth 6.0, chống nước 10m.',
    accent: '#5b9bd5',
    gradient: 'linear-gradient(135deg, #00101a 0%, #06141e 50%, #00101a 100%)',
    logoStyle: 'sans',
    logo: `<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><text x="0" y="44" font-family="Arial, sans-serif" font-size="44" font-weight="800" letter-spacing="-2">GoPro</text></svg>`,
  },
  Godox: {
    name: 'Godox',
    slug: 'godox',
    tagline: 'Lighting Your Vision',
    description:
      'Đèn LED studio và flash — SL150W III, AD200 Pro cho photographer và videographer chuyên nghiệp.',
    accent: '#ff6600',
    gradient: 'linear-gradient(135deg, #1a0a06 0%, #281410 50%, #1a0a06 100%)',
    logoStyle: 'sans',
    logo: `<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><text x="0" y="44" font-family="Arial, sans-serif" font-size="40" font-weight="700" letter-spacing="1">Godox</text></svg>`,
  },
  Aputure: {
    name: 'Aputure',
    slug: 'aputure',
    tagline: 'Lights. Camera. Action.',
    description:
      'Đèn LED cinema chuyên nghiệp — LS 600d Pro IP54, Amaran series cho film production.',
    accent: '#9900ff',
    gradient: 'linear-gradient(135deg, #14001a 0%, #1f0a28 50%, #14001a 100%)',
    logoStyle: 'sans',
    logo: `<svg viewBox="0 0 260 60" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><text x="0" y="44" font-family="Arial, sans-serif" font-size="38" font-weight="700">Aputure</text></svg>`,
  },
  Nanlite: {
    name: 'Nanlite',
    slug: 'nanlite',
    tagline: 'Brighter, Smarter',
    description:
      'RGBWW LED nhỏ gọn — Forza 60C, PavoTube II cho studio và location shooting.',
    accent: '#00cc99',
    gradient: 'linear-gradient(135deg, #001a14 0%, #0a2820 50%, #001a14 100%)',
    logoStyle: 'sans',
    logo: `<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><text x="0" y="44" font-family="Arial, sans-serif" font-size="38" font-weight="700">Nanlite</text></svg>`,
  },
  Blackmagic: {
    name: 'Blackmagic',
    slug: 'blackmagic',
    tagline: 'Cinematic Freedom',
    description:
      'Cinema camera chuyên nghiệp — Pocket 6K G2 với Blackmagic RAW, dynamic range 13 stops.',
    accent: '#ffaa00',
    gradient: 'linear-gradient(135deg, #1a1400 0%, #281f0a 50%, #1a1400 100%)',
    logoStyle: 'sans',
    logo: `<svg viewBox="0 0 360 60" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><text x="0" y="44" font-family="Arial, sans-serif" font-size="28" font-weight="800" letter-spacing="-1">Blackmagic Design</text></svg>`,
  },
};

// ─── Brand banner (computed) ─────────────────────────────────────────────────

export interface BrandBanner {
  meta: BrandMeta;
  productCount: number;
  categoryList: string[]; // categories this brand is present in
  startingPrice: number; // lowest priced product
  featured: ProductSummary[]; // top 3 rated products
  ctaHref: string;
}

/**
 * Build brand banner from current `allProducts`.
 * One banner per unique brand that has products in the catalog.
 */
export function getBrandBanners(): BrandBanner[] {
  const byBrand: Record<string, ProductSummary[]> = {};
  for (const p of allProducts) {
    if (!byBrand[p.brand]) byBrand[p.brand] = [];
    byBrand[p.brand].push(p);
  }

  const banners: BrandBanner[] = [];
  for (const [brand, products] of Object.entries(byBrand)) {
    const meta = BRAND_META[brand];
    if (!meta) continue; // Skip brands without metadata

    const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
    const sortedByRating = [...products].sort(
      (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0),
    );
    const categories = Array.from(new Set(products.map((p) => p.category)));

    banners.push({
      meta,
      productCount: products.length,
      categoryList: categories,
      startingPrice: sortedByPrice[0]?.price ?? 0,
      featured: sortedByRating.slice(0, 3),
      ctaHref: `/thuong-hieu/${meta.slug}`,
    });
  }

  // Sort by product count descending (most products first)
  return banners.sort((a, b) => b.productCount - a.productCount);
}

/**
 * Get a single brand banner by slug (canonical or display).
 */
export function getBrandBannerBySlug(slug: string): BrandBanner | null {
  const banners = getBrandBanners();
  return (
    banners.find(
      (b) => b.meta.slug === slug.toLowerCase() || b.meta.name.toLowerCase() === slug.toLowerCase(),
    ) ?? null
  );
}

/**
 * Format VND price for display (e.g., 17500000 → "17.500.000đ")
 */
export function formatBrandPrice(price: number): string {
  if (price >= 1_000_000_000) return `${(price / 1_000_000_000).toFixed(1)} tỷ`;
  if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(0)} triệu`;
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}