import { MetadataRoute } from 'next';
import { categories, allProducts } from '@/lib/mock-data';

const BASE_URL = 'https://mayanhvietnam.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    '',
    '/san-pham',
    '/gio-hang',
    '/don-dat-hang',
    '/he-thong-cua-hang',
    '/thong-tin-lien-he',
    '/chinh-sach-bao-hanh',
    '/chinh-sach-van-chuyen',
    '/chinh-sach-thanh-toan',
    '/chinh-sach-bao-mat',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${BASE_URL}/danh-muc/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const productRoutes = allProducts.map((p) => ({
    url: `${BASE_URL}/san-pham/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
