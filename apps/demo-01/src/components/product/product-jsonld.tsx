/**
 * Product JSON-LD — Tier 1.4 (Rich Snippet compliance)
 *
 * Nâng cấp để đạt điều kiện Rich Snippets trên Google Search:
 * - Thêm priceValidUntil, itemCondition, seller.url
 * - Thêm image array, bestRating/worstRating
 * - Xử lý sản phẩm "Liên hệ" (price=0) — bỏ offers object (mục [17] SEO doc)
 * - Xử lý sản phẩm hết hàng — giữ offers, đổi availability
 */

import type { ProductSummary } from '@/lib/mock-data';

interface ProductJsonLdProps {
  product: ProductSummary;
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const SITE_URL = 'https://mayanhvietnam.com';

  // Mục [17] SEO doc: Sản phẩm "Liên hệ" không đẩy price=0 vào Schema
  const hasPrice = product.price > 0;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image:
      product.images && product.images.length > 0
        ? product.images.map((img) => img.url)
        : [product.thumbnail],
    description: `${product.name} chính hãng từ ${product.brand}. ${
      product.shortSpecs ? product.shortSpecs.join('. ') : ''
    }`,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    sku: product.id,
    category: product.category,
    ...(hasPrice && {
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/san-pham/${product.slug}`,
        priceCurrency: 'VND',
        price: product.price,
        itemCondition:
          product.availability === 'pre_order'
            ? 'https://schema.org/PreOrderCondition'
            : 'https://schema.org/NewCondition',
        availability:
          product.availability === 'in_stock'
            ? 'https://schema.org/InStock'
            : product.availability === 'pre_order'
            ? 'https://schema.org/PreOrder'
            : 'https://schema.org/OutOfStock',
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        seller: {
          '@type': 'Organization',
          name: 'Máy Ảnh Việt Nam',
          url: SITE_URL,
        },
      },
    }),
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.average,
        reviewCount: product.rating.count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
