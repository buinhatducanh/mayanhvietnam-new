'use client';

import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn, formatVND, calcDiscountPercent } from '@/lib/utils';
import { useTheme } from '@/components/layout/theme-provider';

interface ShowcaseCardProps {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviews: number;
  badge?: 'HOT' | 'NEW' | 'SALE' | null;
  image: string;
  href: string;
}

const BADGE_CLASS: Record<string, string> = {
  HOT: 'badge-hot',
  NEW: 'badge-new',
  SALE: 'badge-sale',
};

export function ShowcaseCard({
  name,
  brand,
  category,
  price,
  originalPrice,
  rating,
  reviews,
  badge,
  image,
  href,
}: ShowcaseCardProps) {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const discount = originalPrice
    ? calcDiscountPercent(price, originalPrice)
    : 0;

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300',
        hovered && 'border-primary/45'
      )}
      style={
        hovered
          ? {
              borderColor: 'rgba(255,107,53,0.45)',
              boxShadow: isDark
                ? '0 0 24px rgba(255,107,53,0.12)'
                : '0 8px 32px rgba(255,107,53,0.1)',
            }
          : undefined
      }
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-muted"
        style={{ aspectRatio: '1 / 1' }}
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
        />

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          {badge && (
            <span
              className={cn(
                'rounded-sm px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-white',
                BADGE_CLASS[badge]
              )}
            >
              {badge}
            </span>
          )}
          {discount > 0 && (
            <span className="badge-discount rounded-sm px-2 py-0.5 font-mono text-[9px] font-bold text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Thêm vào yêu thích"
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur-sm opacity-0 transition-opacity hover:border-primary group-hover:opacity-100"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-3 w-3" />
        </button>

        {/* Hover gradient overlay */}
        {hovered && (
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3"
            style={{
              background: 'linear-gradient(to top, rgba(255,107,53,0.12), transparent)',
            }}
          />
        )}
      </div>

      {/* Info */}
      <div className="space-y-2 p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {brand} · {category}
        </p>
        <h3
          className="line-clamp-2 text-sm font-semibold leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {name}
        </h3>
        <StarRow rating={rating} reviews={reviews} />
        <div className="pt-1">
          <span className="price-mono text-base">{formatVND(price)}</span>
          {originalPrice && originalPrice > price && (
            <span className="price-strike ml-2 text-xs">
              {formatVND(originalPrice)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Xem chi tiết
        </button>
      </div>
    </a>
  );
}

function StarRow({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= Math.floor(rating)} />
      ))}
      <span className="ml-1 font-mono text-[11px] text-muted-foreground">
        ({reviews})
      </span>
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill={filled ? '#FF6B35' : 'none'}
      stroke="#FF6B35"
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}