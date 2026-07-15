"use client";
import { useState, useEffect, useCallback } from "react";
import { banners } from "@/lib/data";

const INTERVAL = 5500;

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = banners.length;

  const next = useCallback(
    () => setActive((i) => (i + 1) % total),
    [total]
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % total), INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, total]);

  return (
    <section
      className="relative bg-zinc-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        {/* ── MAIN CAROUSEL — panoramic 3:1 giống mayanhvietnam.com ── */}
        <div
          className="relative rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl shadow-black/40 aspect-[3/1] max-h-[350px] sm:max-h-none"
        >
          {/* Slides */}
          {banners.map((banner, idx) => (
            <a
              key={idx}
              href={banner.link}
              aria-hidden={idx !== active}
              tabIndex={idx === active ? 0 : -1}
              className={`absolute inset-0 block transition-opacity duration-700 ${
                idx === active
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={banner.image}
                alt={banner.title ?? ""}
                loading={idx === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Multi-layer gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Text overlay — giống demo-05 */}
              <div className="absolute bottom-5 left-6 sm:bottom-7 sm:left-8 right-8">
                {banner.badge && (
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5 text-orange-500">
                    {banner.badge}
                  </p>
                )}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-1">
                  {banner.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-snug max-w-xl line-clamp-2">
                  {banner.subtitle}
                </p>
              </div>
            </a>
          ))}

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                aria-label="Slide trước"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                aria-label="Slide tiếp"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
