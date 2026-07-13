'use client';

import Link from 'next/link';
import type { ProductSummary } from '@/lib/adapter';
import { ProductCard } from './product-card';

type ProductSectionProps = {
  title: string;
  subtitle?: string;
  products: ProductSummary[];
  viewAllHref?: string;
};

export function ProductSection({
  title,
  subtitle,
  products,
  viewAllHref,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          {subtitle && (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              {subtitle}
            </p>
          )}
          <h2 className="mt-1 text-xl font-semibold text-foreground md:text-2xl">
            {title}
          </h2>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="shrink-0 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Xem tất cả →
          </Link>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.slice(0, 10).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
