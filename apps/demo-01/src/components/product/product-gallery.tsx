'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: { url: string; alt: string }[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-xl bg-card border border-border flex items-center justify-center">
        <span className="text-6xl">📷</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square overflow-hidden rounded-xl bg-card border border-border">
        <img
          src={images[active].url}
          alt={images[active].alt}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'shrink-0 h-20 w-20 rounded-md overflow-hidden border-2 transition-all',
                i === active ? 'border-primary' : 'border-border opacity-60 hover:opacity-100'
              )}
              aria-label={`Xem ảnh ${i + 1}`}
            >
              <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
