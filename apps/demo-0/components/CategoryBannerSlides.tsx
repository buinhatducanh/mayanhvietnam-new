"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CDN = "https://mayanhvietnam.com";

export interface CategoryBanner {
  title: string;
  image: string;
  href: string;
}

interface CategoryBannerSlidesProps {
  banners: CategoryBanner[];
  /** Compact = smaller carousel (3:1 banner-style); large = 16:7 hero-style */
  variant?: "compact" | "large";
}

export default function CategoryBannerSlides({
  banners,
  variant = "compact",
}: CategoryBannerSlidesProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((i) => (i + 1) % banners.length),
    [banners.length]
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + banners.length) % banners.length),
    [banners.length]
  );

  useEffect(() => {
    if (paused || banners.length <= 1) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next, banners.length]);

  if (!banners.length) return null;

  const aspectClass = variant === "large" ? "16/7" : "3/1";

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-black border border-[#e9e6e1] shadow-[0_18px_40px_-22px_rgba(22,19,15,0.25)]"
      style={{ aspectRatio: aspectClass }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {banners.map((banner, i) => (
        <div
          key={banner.title + i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
        >
          <Link href={banner.href} className="block w-full h-full relative group">
            <img
              src={banner.image}
              alt={banner.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Text overlay */}
            <div className="absolute bottom-4 left-5 sm:bottom-5 sm:left-6 right-4">
              <p className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight group-hover:text-[#ff6a00] transition-colors">
                {banner.title}
              </p>
            </div>
          </Link>
        </div>
      ))}

      {/* Arrows */}
      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              prev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              next();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${i === active ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}