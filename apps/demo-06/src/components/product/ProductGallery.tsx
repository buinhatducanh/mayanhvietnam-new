"use client";
import { useEffect, useState, useCallback } from "react";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  /** Số thumbnail tối đa hiển thị ở cột dọc; cuộn xuống nếu nhiều hơn */
  maxThumbsBeforeScroll?: number;
}

/**
 * Gallery catalog chuẩn e-commerce:
 * - Cột thumbnail dọc (desktop) / thanh ngang (mobile)
 * - Ảnh chính lớn, có nút prev/next, counter {1/N}
 * - Click hoặc phím Z để mở lightbox fullscreen (có zoom, navigation bằng phím)
 * - Khoá scroll nền khi lightbox mở
 */
export default function ProductGallery({
  images,
  alt,
  maxThumbsBeforeScroll = 6,
}: ProductGalleryProps) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const safeImages = images.length > 0 ? images : [];
  const total = safeImages.length;

  const next = useCallback(
    () => setIdx((i) => (i + 1) % Math.max(total, 1)),
    [total]
  );
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + Math.max(total, 1)) % Math.max(total, 1)),
    [total]
  );

  // Khoá scroll khi mở lightbox
  useEffect(() => {
    if (lightbox) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [lightbox]);

  // Phím tắt trong lightbox
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(false);
        setZoomed(false);
      } else if (e.key === "ArrowRight") {
        next();
      } else if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key.toLowerCase() === "z") {
        setZoomed((z) => !z);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, next, prev]);

  if (total === 0) {
    return (
      <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-700 text-7xl">
        📷
      </div>
    );
  }

  const needsScroll = total > maxThumbsBeforeScroll;
  const current = safeImages[idx];

  return (
    <div className="space-y-4">
      {/* ─── Main + Thumbnails (desktop) ─── */}
      <div className="flex gap-3">
        {/* Thumbnail dọc - desktop only */}
        <div
          className={`hidden md:flex flex-col gap-2 ${needsScroll ? "overflow-y-auto no-scrollbar" : ""}`}
          style={{ maxHeight: 560 }}
        >
          {safeImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Ảnh ${i + 1}/${total}`}
              className={`relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                i === idx
                  ? "border-orange-500 ring-2 ring-orange-500/20"
                  : "border-zinc-800 hover:border-zinc-600"
              }`}
            >
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {total > 8 && i === 7 && total - 8 > 0 && (
                <span className="absolute inset-0 bg-black/70 text-white text-xs font-bold flex items-center justify-center">
                  +{total - 8}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Ảnh chính */}
        <div className="flex-1 min-w-0">
          <div
            onClick={() => setLightbox(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setLightbox(true);
            }}
            className="group relative block w-full aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 cursor-zoom-in"
            aria-label="Mở lightbox"
          >
            <img
              src={current}
              alt={`${alt} ${idx + 1}`}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />

            {/* Counter */}
            <span className="absolute top-3 right-3 bg-black/70 backdrop-blur text-white text-[11px] font-bold px-3 py-1.5 rounded-full pointer-events-none">
              {idx + 1} / {total}
            </span>

            {/* Hint */}
            <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 pointer-events-none">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              Click để phóng to
            </span>

            {/* Prev/Next arrows — dùng div role=button để không lồng button */}
            {total > 1 && (
              <>
                <div
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); prev(); } }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer"
                  aria-label="Ảnh trước"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); next(); } }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer"
                  aria-label="Ảnh tiếp"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail ngang - mobile only */}
      <div className="flex md:hidden gap-2 overflow-x-auto no-scrollbar">
        {safeImages.map((src, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              i === idx ? "border-orange-500" : "border-zinc-800"
            }`}
            aria-label={`Ảnh ${i + 1}/${total}`}
          >
            <img src={src} alt={`${alt} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* ─── Lightbox Fullscreen ─── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          onClick={() => { setLightbox(false); setZoomed(false); }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 text-white">
            <span className="text-sm font-medium">
              {idx + 1} / {total} — {alt}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs font-medium"
                title="Phóng to (Z)"
              >
                {zoomed ? "↩ Thu nhỏ" : "🔍 Zoom"}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(false); setZoomed(false); }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center transition-colors"
                aria-label="Đóng"
                title="Đóng (Esc)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Ảnh lớn */}
          <div className="flex-1 flex items-center justify-center px-6 pb-4 min-h-0">
            <div
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current}
                alt={`${alt} ${idx + 1}`}
                className={`max-w-full max-h-[calc(100vh-160px)] object-contain select-none transition-transform ${
                  zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setZoomed((z) => !z)}
                draggable={false}
              />
            </div>
          </div>

          {/* Footer: thumbnails dọc */}
          <div className="px-6 pb-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar justify-center">
              {safeImages.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIdx(i); setZoomed(false); }}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                    i === idx ? "border-orange-500" : "border-white/20 hover:border-white/50"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <p className="text-center text-white/40 text-[11px] mt-3">
              ← → để chuyển ảnh &nbsp;·&nbsp; Z để zoom &nbsp;·&nbsp; Esc để đóng
            </p>
          </div>

          {/* Prev/Next lightbox */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center transition-colors"
                aria-label="Ảnh trước"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center transition-colors"
                aria-label="Ảnh tiếp"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
