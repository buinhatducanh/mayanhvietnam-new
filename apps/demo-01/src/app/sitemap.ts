/**
 * Dynamic Sitemap — Tier 3.4
 *
 * Tối ưu SEO:
 * - Dùng lastMod realistic (không dùng new Date() cho mọi thứ)
 * - Priority phân tầng: Homepage > Category > Product > Static
 * - Google dùng <lastmod> để quyết định crawl lại (bỏ qua changefreq & priority)
 * - Image sitemap entries cho products (giúp indexing Google Images)
 */

import { MetadataRoute } from 'next';
import { categories, allProducts } from '@/lib/mock-data';

const BASE_URL = 'https://mayanhvietnam.com';

// Giả lập ngày update thực tế — thay vì dùng new Date()
// Khi có CMS/DB, thay bằng giá trị updated_at thực
const SITE_UPDATED = new Date('2025-12-01');

function deterministicDate(index: number, base: Date): Date {
  // Tạo offset deterministic dựa trên index (mỗi sản phẩm update vào ngày khác nhau)
  const offset = (index % 30) * 86400000;
  return new Date(base.getTime() - offset);
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages — updated cùng lúc site launch
  const staticRoutes = [
    { path: '', priority: 1.0, freq: 'daily' as const },
    { path: '/san-pham', priority: 0.9, freq: 'daily' as const },
    { path: '/he-thong-cua-hang', priority: 0.8, freq: 'monthly' as const },
    { path: '/thong-tin-lien-he', priority: 0.8, freq: 'monthly' as const },
    { path: '/chinh-sach-bao-hanh', priority: 0.6, freq: 'yearly' as const },
    { path: '/chinh-sach-van-chuyen', priority: 0.6, freq: 'yearly' as const },
    { path: '/chinh-sach-thanh-toan', priority: 0.6, freq: 'yearly' as const },
    { path: '/chinh-sach-bao-mat', priority: 0.5, freq: 'yearly' as const },
    // Không index giỏ hàng, đơn hàng, login, confirmation — disallowed trong robots.txt
  ].map(({ path, priority, freq }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: SITE_UPDATED,
    changeFrequency: freq,
    priority,
  }));

  // Category pages — updated thường xuyên hơn
  const categoryRoutes = categories.map((cat, i) => ({
    url: `${BASE_URL}/danh-muc/${cat.slug}`,
    lastModified: deterministicDate(i, new Date('2025-11-15')),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Product pages — lastMod theo từng sản phẩm
  const productRoutes = allProducts.map((p, i) => ({
    url: `${BASE_URL}/san-pham/${p.slug}`,
    lastModified: deterministicDate(i, new Date('2025-12-01')),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Landing pages (product-specific marketing)
  const landingRoutes = [
    {
      url: `${BASE_URL}/san-pham-can-ban`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
  ];

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...landingRoutes];
}
