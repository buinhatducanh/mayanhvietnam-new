'use client';

import { useState, useEffect, useCallback } from 'react';
import { ImageWithFallback } from './ui/image-with-fallback';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

type ProductGalleryProps = {
  images: string[];
  productName: string;
  fallbackImage: string;
};

export function ProductGallery({ images, productName, fallbackImage }: ProductGalleryProps) {
  const allImages = images.length > 0 ? images : [fallbackImage];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % allImages.length);
  }, [allImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, prevLightbox, nextLightbox]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  const displayImages = allImages.slice(0, 5);
  const hasMore = allImages.length > 5;

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-card"
          onClick={() => openLightbox(activeIndex)}
        >
          <ImageWithFallback
            src={allImages[activeIndex]}
            alt={`${productName} — ảnh ${activeIndex + 1}`}
            productName={productName}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={activeIndex === 0}
          />
          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
            <ZoomIn className="size-3" aria-hidden />
            <span>Phóng to</span>
          </div>
          {/* Badge count */}
          {allImages.length > 1 && (
            <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {activeIndex + 1} / {allImages.length}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {displayImages.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Xem ảnh ${i + 1}`}
                className={`relative shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  i === activeIndex
                    ? 'border-primary shadow-[0_0_12px_-2px] shadow-primary/60'
                    : 'border-border opacity-70 hover:opacity-100'
                }`}
                style={{ width: 72, height: 72 }}
              >
                <ImageWithFallback
                  src={src}
                  alt={`${productName} thumbnail ${i + 1}`}
                  productName={productName}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            ))}
            {hasMore && (
              <button
                type="button"
                onClick={() => openLightbox(activeIndex)}
                className="flex shrink-0 items-center justify-center rounded-xl border-2 border-border bg-card text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground"
                style={{ width: 72, height: 72 }}
              >
                +{allImages.length - 5}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal
          aria-label="Xem ảnh phóng to"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Đóng"
          >
            <X className="size-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>

          {/* Prev button */}
          {allImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
              className="absolute left-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={allImages[lightboxIndex]}
              alt={`${productName} — ảnh ${lightboxIndex + 1}`}
              productName={productName}
              width={1200}
              height={1200}
              className="max-h-[85vh] w-auto max-w-[90vw] rounded-xl object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next button */}
          {allImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
              className="absolute right-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Ảnh sau"
            >
              <ChevronRight className="size-6" />
            </button>
          )}

          {/* Dot indicators */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`h-2 rounded-full transition-all ${
                    i === lightboxIndex
                      ? 'w-6 bg-white'
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Đến ảnh ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
