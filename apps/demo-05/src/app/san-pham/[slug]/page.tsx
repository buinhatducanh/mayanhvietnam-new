import { notFound } from 'next/navigation';
import { allProducts, getProductBySlug, getRelatedProducts } from '@/lib/mock-data';
import { ProductDetailClient } from './ProductDetailClient';

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  return <ProductDetailClient product={product} related={related} />;
}