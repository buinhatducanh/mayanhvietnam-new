'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Banner {
  title: string;
  image: string;
  href: string;
}

/**
 * SmallBannerCarousel — pattern đúng mayanhvietnam.com
 * Hiển thị 1 banner trên 1 row, có prev/next arrows, tự scroll, dots indicator.
 */
export function SmallBannerCarousel({ banners }: { banners: Banner[] }) {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalPages = Math.max(1, banners.length);

  const next = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);
  const prev = useCallback(
    () => setPage((p) => (p - 1 + totalPages) % totalPages),
    [totalPages],
  );

  useEffect(() => {
    if (paused || totalPages <= 1) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next, totalPages]);

  if (banners.length === 0) return null;

  return (
    <div
      className="group/banner relative overflow-hidden rounded-2xl border border-border bg-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides — fade transition — aspect-ratio responsive để banner không quá rộng trên mobile */}
      <div className="relative aspect-[3/1] sm:aspect-[1305/435]">
        {banners.map((banner, i) => (
          <a
            key={banner.title}
            href={banner.href}
            aria-hidden={i !== page}
            tabIndex={i === page ? 0 : -1}
            className={`absolute inset-0 block overflow-hidden bg-black transition-opacity duration-500 ${
              i === page ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              sizes="(max-width: 768px) 100vw, 1305px"
              className="object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-6 pb-4 pt-12">
              <p className="text-balance text-sm font-bold text-white sm:text-base">{banner.title}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Arrows */}
      {totalPages > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); prev(); }}
            aria-label="Banner trước"
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border/30 bg-background/60 p-2 text-foreground opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover/banner:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" stroke="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); next(); }}
            aria-label="Banner tiếp"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border/30 bg-background/60 p-2 text-foreground opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover/banner:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" stroke="currentColor" />
            </svg>
          </button>
        </>
      )}

      {/* Dots — auto-scroll indicator */}
      {totalPages > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Chuyển đến banner ${i + 1}`}
              className={`rounded-full transition-all ${
                i === page
                  ? 'h-1.5 w-5 bg-primary'
                  : 'size-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
