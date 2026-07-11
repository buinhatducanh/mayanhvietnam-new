'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { REAL_BANNERS } from '@/lib/real-products';
import { cn } from '@/lib/utils';

const INTERVAL = 5500;

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
      className="relative bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-4">
        {/* ── MAIN CAROUSEL — panoramic 3:1 to match mayanhvietnam.com ── */}
        <div className="relative rounded-2xl overflow-hidden bg-black border border-border shadow-2xl shadow-black/30"
             style={{ aspectRatio: '3/1' }}>
          {/* Slides */}
          {REAL_BANNERS.map((banner, i) => (
            <div
              key={banner.title}
              className={cn(
                'absolute inset-0 transition-opacity duration-700',
                i === active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              )}
            >
              <Link href={banner.href} className="block w-full h-full relative group">
                <img
                  src={banner.image}
                  alt={banner.title}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="absolute inset-0 w-full h-full object-contain"
                />
                {/* Rich gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Text overlay */}
                <div className="absolute bottom-5 left-6 sm:bottom-7 sm:left-8 right-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5" style={{ color: '#2563eb' }}>
                    mayanhvietnam.com
                  </p>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                    {banner.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/75 leading-snug max-w-xl">
                    {banner.subtitle}
                  </p>
                </div>
              </Link>
            </div>
          ))}

          {/* Arrows */}
          <button type="button" onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>
      </div>
    </section>
  );
}