import type { ProductSummary } from '@/lib/mock-data';

interface ProductJsonLdProps {
  product: ProductSummary;
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.thumbnail,
    description: `${product.name} chính hãng từ ${product.brand}`,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: `https://mayanhvietnam.com/san-pham/${product.slug}`,
      priceCurrency: 'VND',
      price: product.price,
      availability:
        product.availability === 'in_stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Máy Ảnh Việt Nam',
      },
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.average,
        reviewCount: product.rating.count,
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
