"use client";
import { useState, useEffect } from "react";
import { banners } from "@/lib/data";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(t);
  }, [isPlaying]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 12000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-zinc-950" style={{ height: "clamp(420px, 60vw, 720px)" }}>
      {/* Slides */}
      {banners.map((banner, idx) => (
        <a
          key={idx}
          href={banner.link}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className="absolute inset-0"
            style={{ background: banner.bgColor ?? "#1a1a2e" }}
          />
          <img
            src={banner.image}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 max-w-[1440px] mx-auto px-6 flex items-center">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 bg-orange-500/20 backdrop-blur-sm border border-orange-500/40 text-orange-300 text-xs font-semibold rounded-full mb-4">
                {banner.badge ?? "Khuyến mãi hot"}
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                {banner.title}
              </h2>
              <p className="text-lg md:text-xl text-zinc-200 mb-6">
                {banner.subtitle}
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors">
                Mua ngay
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      ))}

      {/* Arrows */}
      <button
        onClick={() => goTo((current - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center transition-colors"
        aria-label="Trước"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center transition-colors"
        aria-label="Sau"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? "bg-orange-500 w-10" : "bg-white/30 w-1.5 hover:bg-white/50"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
