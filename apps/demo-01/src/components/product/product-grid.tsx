import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';
import type { ProductSummary } from '@/lib/mock-data';

interface ProductGridProps {
  products: ProductSummary[];
  columns?: 'auto' | 3 | 4;
  className?: string;
  skeleton?: number;
}

export function ProductGrid({ products, columns = 'auto', className, skeleton }: ProductGridProps) {
  if (skeleton) {
    return (
      <div
        className={cn(
          'grid gap-4',
          'grid-cols-2 sm:grid-cols-3',
          className
        )}
      >
        {Array.from({ length: skeleton }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="aspect-square animate-shimmer" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-3/4 animate-shimmer rounded" />
              <div className="h-3 w-1/2 animate-shimmer rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const cols = {
    auto: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <div className={cn('grid gap-4', cols, className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
