'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ChevronRight as ChevR2, Star } from 'lucide-react';
import { cn, formatVND, calcDiscountPercent } from '@/lib/utils';
import { REAL_CATEGORIES, CATEGORY_BANNERS, productsByCategory, type CategoryBanner, type RealProduct } from '@/lib/real-products';
import { SmallBannerCarousel } from './SmallBannerCarousel';

interface CategorySectionProps {
  catSlug: string;
  showBanner?: boolean;
}

export function CategorySection({ catSlug, showBanner = true }: CategorySectionProps) {
  const cat = REAL_CATEGORIES.find((c) => c.slug === catSlug);
  const banners = CATEGORY_BANNERS[catSlug] ?? [];
  const products = productsByCategory(catSlug);
  if (!cat) return null;

  const hasCarousel = showBanner && banners.length > 0;

  return (
    <section className="relative border-b border-border/30 bg-background">
      {/* Thin accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* ── Section header ── */}
        <div className="flex items-center justify-between pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">{cat.name}</h2>
          </div>
          <Link
            href={`/danh-muc/${catSlug}`}
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            Xem tất cả <ChevR2 className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── Banner Carousel ── */}
        {hasCarousel && <CategoryCarousel banners={banners} />}

        {/* ── Product Grid ── */}
        {products.length > 0 && (
          <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3', hasCarousel && 'mt-4')}>
            {products.slice(0, 4).map((p) => (
              <ProductMiniCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* ── Small Banner Carousel (bannerSileSmall-2) — ngay sau products ── */}
        {hasCarousel && (
          <div className="mt-5">
            <SmallBannerCarousel banners={banners} />
          </div>
        )}

        {products.length === 0 && !hasCarousel && (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">Sắp có hàng</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Mini banner carousel per category ──
function CategoryCarousel({ banners }: { banners: CategoryBanner[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % banners.length), [banners.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + banners.length) % banners.length), [banners.length]);

  useEffect(() => {
    if (paused || banners.length <= 1) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next, banners.length]);

  if (banners.length === 0) return null;

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-black border border-border/40 shadow-lg shadow-black/20"
      style={{ aspectRatio: '3/1' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {banners.map((banner, i) => (
        <div
          key={banner.title}
          className={cn(
            'absolute inset-0 transition-opacity duration-600',
            i === active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          )}
        >
          <Link href={banner.href} className="block w-full h-full relative">
            <img
              src={banner.image}
              alt={banner.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ imageRendering: 'auto' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-5 sm:bottom-5 sm:left-6 right-4">
              <p className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight">{banner.title}</p>
              <p className="text-[11px] sm:text-xs text-white/70 mt-1 line-clamp-1">{banner.subtitle}</p>
            </div>
          </Link>
        </div>
      ))}

      {/* Arrows */}
      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}

// ── Product mini card ──
function ProductMiniCard({ product }: { product: RealProduct }) {
  const discount = calcDiscountPercent(product.price, product.originalPrice ?? product.price);
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex flex-col rounded-xl border border-border/50 bg-card overflow-hidden hover:border-primary/25 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-elevated">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          style={{ imageRendering: 'auto' }}
        />
        {discount > 0 && (
          <span
            className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold text-white"
            style={{ background: '#2563eb' }}
          >
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">
          {product.brand}
        </p>
        <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug min-h-[2rem] group-hover:text-primary transition-colors">
          {product.name}
        </p>
        <div className="mt-auto pt-2 flex items-baseline gap-1.5">
          <span className="price-mono text-sm font-black text-primary">{formatVND(product.price)}</span>
          {discount > 0 && product.originalPrice && (
            <span className="price-strike text-[10px]">{formatVND(product.originalPrice)}</span>
          )}
        </div>
        {product.shortSpecs && product.shortSpecs.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {product.shortSpecs.slice(0, 2).map((s) => (
              <span key={s} className="rounded border border-border/50 px-1.5 py-0.5 text-[9px] text-muted-foreground font-mono">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}