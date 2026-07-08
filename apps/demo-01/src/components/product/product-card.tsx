'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PriceDisplay } from '@/components/ui/price-display';
import { StarRating } from '@/components/ui/star-rating';
import { cn, calcDiscountPercent } from '@/lib/utils';
import type { ProductSummary } from '@/lib/mock-data';

interface ProductCardProps {
  product: ProductSummary;
  className?: string;
  priority?: boolean; // Eager load — for first row
  layout?: 'grid' | 'compact';
}

export function ProductCard({ product, className, priority, layout = 'grid' }: ProductCardProps) {
  const discountPercent = calcDiscountPercent(product.price, product.originalPrice);
  const isSale = product.originalPrice && product.originalPrice > product.price;

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card',
        'transition-all duration-300 ease-out',
        'hover:border-primary/40 hover:shadow-glow-accent hover:-translate-y-1',
        className
      )}
      aria-label={`${product.name} - giá ${product.price.toLocaleString('vi-VN')}₫`}
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-[#0d0d14]">
        <img
          src={product.thumbnail}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          width={500}
          height={500}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Badges — overlay góc trên trái */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {isSale && (
            <Badge variant="sale" label={`-${discountPercent}%`} className="shadow-md" />
          )}
          {product.badges?.map((b, i) =>
            b.type !== 'sale' ? <Badge key={i} variant={b.type} label={b.label} /> : null
          )}
        </div>

        {/* Wishlist — góc trên phải */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            // wishlist toggle hook
          }}
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-sale hover:bg-black/60 transition-all"
          aria-label="Thêm vào yêu thích"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Mount tag — bottom */}
        {product.mount && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-mono text-primary border border-primary/30">
            {product.mount}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Brand + Name */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            {product.brand}
          </p>
          <h3 className="mt-0.5 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Short specs — chips */}
        {product.shortSpecs && product.shortSpecs.length > 0 && layout === 'grid' && (
          <div className="flex flex-wrap gap-1">
            {product.shortSpecs.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Rating */}
        {product.rating && (
          <StarRating rating={product.rating.average} count={product.rating.count} size="sm" />
        )}

        {/* Price */}
        <PriceDisplay
          price={product.price}
          originalPrice={product.originalPrice}
          size="md"
        />

        {/* Stock indicator */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-border">
          <span
            className={cn(
              'flex items-center gap-1 text-[10px] font-medium',
              product.availability === 'in_stock'
                ? 'text-emerald-400'
                : product.availability === 'pre_order'
                ? 'text-blue-400'
                : 'text-gray-400'
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {product.availability === 'in_stock'
              ? 'Còn hàng'
              : product.availability === 'pre_order'
              ? 'Đặt trước'
              : 'Hết hàng'}
          </span>
          <span className="text-[10px] text-muted-foreground hover:text-primary transition-colors">
            Chi tiết →
          </span>
        </div>
      </div>
    </Link>
  );
}
