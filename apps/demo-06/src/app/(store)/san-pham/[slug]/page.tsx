import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Không tìm thấy sản phẩm — Máy Ảnh Việt Nam" };
  return {
    title: `${product.name} — Máy Ảnh Việt Nam`,
    description: `${product.name} chính hãng tại Máy Ảnh Việt Nam. ${product.callForPrice ? "Liên hệ để có giá tốt nhất." : `Giá từ ${new Intl.NumberFormat("vi-VN").format(product.price)}đ.`}`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
