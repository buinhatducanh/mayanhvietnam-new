'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CategoryBanner } from '@/lib/real-products';

interface SmallBannerCarouselProps {
  banners: CategoryBanner[];
}

/**
 * Carousel banner nhỏ — giống hệt bannerSileSmall-2 trên mayanhvietnam.com
 * Hiển thị 3-4 banner ngang, tự động scroll, có dots + arrows.
 */
export function SmallBannerCarousel({ banners }: SmallBannerCarouselProps) {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  // Số banner hiển thị mỗi trang (responsive)
  const perPage = typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 3;
  const totalPages = Math.ceil(banners.length / perPage);

  const next = useCallback(() => {
    setPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Auto-scroll
  useEffect(() => {
    if (paused || totalPages <= 1) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next, totalPages]);

  if (banners.length === 0) return null;

  // Tính offset translateX
  const getTranslateX = () => {
    // Mỗi banner chiếm ~33.333% container → offset = page * 33.333%
    return `-${page * (100 / 3)}%`;
  };

  return (
    <div
      className="relative group/banner overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track — slide ngang bằng translateX */}
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${getTranslateX()})`, willChange: 'transform' }}
      >
        {banners.map((banner) => (
          <div key={banner.title} className="shrink-0 w-full sm:w-1/3 px-1.5">
            <Link href={banner.href} className="block overflow-hidden rounded-xl bg-black">
              <img
                src={banner.image}
                alt={banner.title}
                loading="lazy"
                className="w-full h-auto object-contain hover:opacity-90 transition-opacity"
                style={{ aspectRatio: '1305 / 435' }}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {banners.length > 3 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover/banner:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover/banner:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots — giống bannerSileSmall-2 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              className={cn(
                'rounded-full transition-all duration-300',
                i === page ? 'w-5 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
