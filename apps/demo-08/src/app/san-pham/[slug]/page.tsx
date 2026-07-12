import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';
import { products, getProductBySlug, getProductsByCategory, formatPrice } from '@/data/products';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Không tìm thấy sản phẩm' };

  return {
    title: `${product.name} | ${formatPrice(product.price)} | Máy Ảnh Việt Nam`,
    description: `${product.shortDescription}. Mua ${product.name} chính hãng tại Máy Ảnh Việt Nam. Bảo hành 12-24 tháng, giao hàng toàn quốc.`,
    alternates: { canonical: `https://mayanhvietnam.com/san-pham/${slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.thumbnail, width: 600, height: 600, alt: product.name }],
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const breadcrumbs = [
    { name: 'Trang chủ', item: 'https://mayanhvietnam.com/' },
    { name: product.categoryName, item: `https://mayanhvietnam.com/danh-muc/${product.categorySlug}` },
    { name: product.name, item: `https://mayanhvietnam.com/san-pham/${product.slug}` },
  ];

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: [product.thumbnail, ...(product.images?.map(i => i.url) || [])],
        description: product.shortDescription,
        brand: { '@type': 'Brand', name: product.brand },
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'VND',
          availability: product.availability === 'in_stock'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          seller: { '@type': 'Organization', name: 'Máy Ảnh Việt Nam' },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating.average,
          reviewCount: product.rating.count,
        },
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((bc, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: bc.name,
          item: bc.item,
        })),
      })}} />

      <Header />
      <CartDrawer />

      <main>
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </main>

      <Footer />
      <FloatingCTA />
    </>
  );
}
