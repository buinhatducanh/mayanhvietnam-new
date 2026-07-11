'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categoryBanners, categories, getProductsByCategory } from '@mayanhvietnam/mock-data';
import type { CategoryBanner, ProductSummary } from '@mayanhvietnam/mock-data';
import ProductCard from '@/app/components/product/ProductCard';

interface CategorySectionProps {
  catSlug: string;
  icon?: string;
}

/**
 * Mỗi section danh mục trên homepage: header + carousel banner + grid sản phẩm.
 * Pattern theo demo-05 — banner quảng cáo riêng cho từng section.
 */
export default function CategorySection({ catSlug, icon }: CategorySectionProps) {
  const cat = categories.find((c) => c.slug === catSlug);
  const banners = categoryBanners[catSlug] ?? [];
  const products = getProductsByCategory(catSlug);
  if (!cat || products.length === 0) return null;

  const hasCarousel = banners.length > 0;

  return (
    <section className="relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* ── Section header ── */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="w-1 h-6 bg-[#ff6b00] rounded-full" />
            {icon && <span className="text-xl">{icon}</span>}
            <h2 className="text-xl font-bold text-zinc-900">{cat.name}</h2>
          </div>
          <Link href={`/danh-muc/${catSlug}`} className="text-sm text-[#ff6b00] hover:underline flex items-center gap-1">
            Xem tất cả <ChevronRight size={14} />
          </Link>
        </div>

        {/* ── Banner Carousel ── */}
        {hasCarousel && <CategoryCarousel banners={banners} />}

        {/* ── Product Grid ── */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ${hasCarousel ? 'mt-4' : ''}`}>
          {products.slice(0, 4).map((p: ProductSummary) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
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
      className="relative rounded-2xl overflow-hidden bg-black border border-zinc-100 shadow-sm"
      style={{ aspectRatio: '3/1' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {banners.map((banner, i) => (
        <div
          key={banner.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <Link href={banner.href} className="block w-full h-full relative">
            <img
              src={banner.image}
              alt={banner.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-5 sm:bottom-5 sm:left-6 right-4">
              <p className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight drop-shadow-lg">
                {banner.title}
              </p>
            </div>
          </Link>
        </div>
      ))}

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {banners.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => { e.preventDefault(); setActive(i); }}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}