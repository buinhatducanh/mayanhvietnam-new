import type { ProductSummary } from '../../../lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';

export function ProductGrid({ products }: { products: ProductSummary[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-base font-semibold text-foreground mb-2">Không tìm thấy sản phẩm</p>
        <p className="text-xs text-muted-foreground">Thử bộ lọc hoặc từ khóa khác.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}