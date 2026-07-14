import { notFound, redirect } from "next/navigation";
import { products, getBySlug, getProductUrl } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.filter((p) => p.thumbnail).map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 3 showcase products have their own dedicated 3D pages
  const url = getProductUrl(slug);
  if (!url.startsWith("san-pham")) redirect(`/${url}`);

  const product = getBySlug(slug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
