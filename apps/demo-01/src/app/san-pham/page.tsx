import { Metadata } from 'next';
import Link from 'next/link';
import { ProductGrid } from '@/components/product/product-grid';
import { FadeIn } from '@/components/animations/fade-in';
import { allProducts } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Tất cả sản phẩm',
  description: 'Tất cả sản phẩm máy ảnh, ống kính, flycam chính hãng tại Máy Ảnh Việt Nam.',
};

export default function AllProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <FadeIn>
        <h1 className="text-2xl font-bold text-foreground mb-2">Tất cả sản phẩm</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Hơn 1.000+ sản phẩm máy ảnh, ống kính, flycam, phụ kiện chính hãng
        </p>
      </FadeIn>
      <ProductGrid products={allProducts} />
      <div className="text-center py-12 mt-8">
        <Link href="/" className="text-sm text-primary hover:text-primary font-medium">
          ← Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
