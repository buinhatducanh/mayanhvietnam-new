"use client";
import { useState, useEffect, useCallback } from "react";
import { banners } from "@/lib/data";

const AUTOPLAY_MS = 6500;

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const total = banners.length;

  const goTo = useCallback(
    (idx: number) => {
      const next = ((idx % total) + total) % total;
      setCurrent(next);
      setIsPlaying(false);
      window.clearTimeout((goTo as any)._tid);
      (goTo as any)._tid = window.setTimeout(() => setIsPlaying(true), 14000);
    },
    [total]
  );

  useEffect(() => {
    if (!isPlaying) return;
    const t = window.setTimeout(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [current, isPlaying, total]);

  return (
    <section
      className="relative w-full overflow-hidden bg-zinc-950 select-none"
      style={{ height: "clamp(420px, 60vw, 720px)" }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* ─── SLIDES ─── */}
      {banners.map((banner, idx) => (
        <a
          key={idx}
          href={banner.link}
          aria-hidden={idx !== current}
          tabIndex={idx === current ? 0 : -1}
          className={`absolute inset-0 block transition-opacity duration-1000 ease-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Hình ảnh — Ken Burns zoom nhẹ khi active */}
          <img
            src={banner.image}
            alt={banner.title ?? ""}
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            style={{
              transform: idx === current ? "scale(1.04)" : "scale(1)",
              transition: "transform 7s ease-out",
            }}
            loading={idx === 0 ? "eager" : "lazy"}
          />

          {/* Multi-layer overlay: 2 lớp để chữ nét trên mọi ảnh */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

          {/* Content — layout thẳng đứng, canh giữa */}
          <div className="absolute inset-0 max-w-[1440px] mx-auto px-6 md:px-10 flex items-center">
            <div className="max-w-2xl text-white">
              {banner.badge && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-[0.15em] rounded-full shadow-lg shadow-orange-500/40">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {banner.badge}
                </span>
              )}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5 [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
                {banner.title}
              </h2>
              <p className="text-base md:text-lg text-zinc-100/95 leading-relaxed mb-8 max-w-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">
                {banner.subtitle}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="group inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all shadow-xl shadow-orange-500/40 hover:shadow-orange-500/60 hover:gap-3">
                  Khám phá ngay
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-white/80">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Chính hãng · Bảo hành toàn quốc
                </span>
              </div>
            </div>
          </div>
        </a>
      ))}

      {/* ─── ARROW CONTROLS (cụm dọc, góc trái) ─── */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        <ArrowBtn
          onClick={() => goTo(current - 1)}
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          }
          label="Slide trước"
        />
        <ArrowBtn
          onClick={() => goTo(current + 1)}
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          }
          label="Slide tiếp"
        />
      </div>

      {/* ─── SLIDE COUNTER (góc phải trên) ─── */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
        <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/15 rounded-full text-sm font-bold text-white tabular-nums">
          <span className="text-orange-400">{String(current + 1).padStart(2, "0")}</span>
          <span className="text-white/40 mx-1.5">/</span>
          <span className="text-white/70">{String(total).padStart(2, "0")}</span>
        </span>
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center transition-colors text-white"
          aria-label={isPlaying ? "Tạm dừng slideshow" : "Phát slideshow"}
          title={isPlaying ? "Tạm dừng" : "Phát"}
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* ─── PROGRESS DOTS (dưới đáy) ─── */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="group relative h-1 rounded-full overflow-hidden transition-all duration-300"
            style={{
              width: idx === current ? 36 : 16,
              background: idx === current ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.30)",
            }}
          >
            {idx === current && (
              <span
                key={`${current}-${isPlaying}`}
                className="absolute inset-y-0 left-0 bg-orange-500 rounded-full"
                style={{
                  width: isPlaying ? "100%" : "0%",
                  transition: isPlaying
                    ? `width ${AUTOPLAY_MS}ms linear`
                    : "none",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

function ArrowBtn({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-11 h-11 bg-white/10 hover:bg-white hover:text-zinc-950 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </button>
  );
}
