'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { REAL_BANNERS } from '@/lib/real-products';
import { cn } from '@/lib/utils';

const INTERVAL = 5500; // 5.5s rotation like mayanhvietnam.com

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % REAL_BANNERS.length), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + REAL_BANNERS.length) % REAL_BANNERS.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="relative border-b border-border bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-4">
        {/* ── MAIN CAROUSEL ── */}
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border" style={{ aspectRatio: '16/7' }}>
          {/* Slides */}
          {REAL_BANNERS.map((banner, i) => (
            <div
              key={banner.title}
              className={cn(
                'absolute inset-0 transition-opacity duration-700',
                i === active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              )}
            >
              <Link href={banner.href} className="block w-full h-full relative">
                {/* Native img — avoids Next.js CDN proxy timeout */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 right-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5" style={{ color: '#FF6B35' }}>
                    mayanhvietnam.com
                  </p>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-1">
                    {banner.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70 leading-snug max-w-lg">
                    {banner.subtitle}
                  </p>
                </div>
              </Link>
            </div>
          ))}

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {REAL_BANNERS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === active ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                )}
              />
            ))}
          </div>
        </div>

        {/* ── THUMBNAILS — desktop only ── */}
        <div className="hidden lg:grid grid-cols-4 gap-2 mt-3">
          {REAL_BANNERS.slice(0, 4).map((banner, i) => (
            <button
              key={banner.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'flex items-center gap-3 rounded-lg border p-2.5 transition-all text-left',
                i === active
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/30 hover:bg-card-hover'
              )}
            >
              <div
                className="relative w-16 h-16 shrink-0 overflow-hidden rounded-md bg-elevated"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] font-medium text-foreground line-clamp-2 leading-tight">
                {banner.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}