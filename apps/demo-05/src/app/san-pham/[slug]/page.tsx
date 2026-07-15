import { notFound } from 'next/navigation';
import type { ProductSummary } from '../../../../lib/mock-data';
import { findProductBySlug, REAL_PRODUCTS, productsByCategory } from '@/lib/real-products';
import { toProductSummary } from '@/lib/adapter';
import { ProductDetailClient } from './ProductDetailClient';

export function generateStaticParams() {
  return REAL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const real = findProductBySlug(slug);
  if (!real) notFound();

  const product = toProductSummary(real);
  const relatedRaw = productsByCategory(real.category).filter((p) => p.slug !== real.slug).slice(0, 4);
  const related: ProductSummary[] = relatedRaw.map(toProductSummary);

  return <ProductDetailClient product={product} related={related} realSlug={real.slug} />;
}