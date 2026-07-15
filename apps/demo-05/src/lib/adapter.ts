import type { ProductSummary } from '../../lib/mock-data';
import type { RealProduct } from '@/lib/real-products';

/**
 * Adapter: RealProduct (crawled từ mayanhvietnam.com) → ProductSummary (schema monorepo)
 */
export function toProductSummary(p: RealProduct): ProductSummary {
  const discount = p.originalPrice
    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
    : 0;
  const badges: { type: string; label: string }[] = [];
  if (discount > 0) badges.push({ type: 'sale', label: `-${discount}%` });
  if (p.id.charCodeAt(0) % 3 === 0) badges.push({ type: 'new', label: 'Mới' });
  if (p.id.charCodeAt(1) % 4 === 0) badges.push({ type: 'hot', label: 'Hot' });

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    thumbnail: p.image,
    images: [{ url: p.image, alt: p.name, isPrimary: true }],
    price: p.price,
    originalPrice: p.originalPrice,
    badges,
    rating: { average: 4.5 + (parseInt(p.id) % 5) * 0.1, count: 80 + (parseInt(p.id) * 13) },
    isUsed: false,
    brand: p.brand,
    mount: undefined,
    availability: 'in_stock',
    category: p.category,
    shortSpecs: p.shortSpecs,
  };
}
