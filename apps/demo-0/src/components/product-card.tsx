'use client';

import Link from 'next/link';
import { ImageWithFallback } from './ui/image-with-fallback';
import { formatVND, type ProductSummary } from '@/lib/adapter';

type ProductCardProps = {
  product: ProductSummary;
};

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.originalPrice != null && product.price < product.originalPrice;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) * 100,
      )
    : 0;

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-all hover:border-primary/30 hover:shadow-[0_0_24px_-6px] hover:shadow-primary/20"
    >
      {/* Badges */}
      {product.badges.length > 0 && (
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {product.badges.slice(0, 2).map((badge) => (
            <span
              key={badge.label}
              className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                badge.type === 'hot'
                  ? 'bg-red-600/90 text-white'
                  : badge.type === 'sale'
                    ? 'bg-primary/90 text-primary-foreground'
                    : 'bg-green-600/90 text-white'
              }`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      )}

      {/* Discount badge */}
      {hasDiscount && (
        <span className="absolute right-2 top-2 z-10 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
          -{discountPercent}%
        </span>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-card">
        <ImageWithFallback
          src={product.thumbnail}
          alt={product.name}
          productName={product.name}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3">
        {/* Brand */}
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </span>

        {/* Name */}
        <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-tight text-foreground">
          {product.name}
        </h3>

        {/* Short specs */}
        {product.shortSpecs && product.shortSpecs.length > 0 && (
          <p className="mt-1.5 line-clamp-1 text-[11px] text-muted-foreground">
            {product.shortSpecs.slice(0, 3).join(' · ')}
          </p>
        )}

        {/* Price */}
        <div className="mt-auto pt-2">
          {product.callForPrice ? (
            <span className="text-sm font-semibold text-primary">Vui lòng gọi</span>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-primary">
                {formatVND(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatVND(product.originalPrice!)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <span className="text-primary">★</span>
            <span>{product.rating.average}</span>
            <span>({product.rating.count})</span>
          </div>
        )}
      </div>
    </Link>
  );
}
