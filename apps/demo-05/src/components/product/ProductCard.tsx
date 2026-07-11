'use client';

import Link from 'next/link';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import type { ProductSummary } from '@mayanhvietnam/mock-data';
import { formatVND, cn, calcDiscountPercent } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

interface Props {
  product: ProductSummary;
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const discount = calcDiscountPercent(product.price, product.originalPrice);

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
      <Link href={`/san-pham/${product.slug}`} className="block relative aspect-square overflow-hidden bg-elevated">
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          style={{ imageRendering: 'auto' }}
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold text-white" style={{ background: '#2563eb' }}>
            -{discount}%
          </span>
        )}
        {product.badges.length > 0 && (
          <span className="absolute right-2 top-2 rounded-md bg-primary/90 px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            {product.badges[0].label}
          </span>
        )}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); }}
          className="absolute right-2 bottom-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-error transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Yêu thích"
        >
          <Heart className="w-4 h-4" />
        </button>
      </Link>

      <div className="flex flex-col flex-1 p-3">
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">
          {product.brand}
        </p>
        <Link href={`/san-pham/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {product.rating && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={cn('w-3 h-3', i <= Math.floor(product.rating!.average) ? 'fill-primary text-primary' : 'text-border')} />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">{product.rating.average}</span>
            <span className="text-[10px] text-muted-foreground/60">({product.rating.count})</span>
          </div>
        )}

        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="price-mono text-base font-black">{formatVND(product.price)}</span>
          {discount > 0 && product.originalPrice && (
            <span className="price-strike text-[11px]">{formatVND(product.originalPrice)}</span>
          )}
        </div>

        {product.shortSpecs && product.shortSpecs.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {product.shortSpecs.slice(0, 3).map((s) => (
              <span key={s} className="rounded border border-border bg-elevated px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
                {s}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: '#2563eb' }}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="aspect-square bg-elevated animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-2.5 bg-elevated rounded w-1/3" />
        <div className="h-3 bg-elevated rounded" />
        <div className="h-3 bg-elevated rounded w-2/3" />
        <div className="h-5 bg-elevated rounded w-1/2" />
      </div>
    </div>
  );
}