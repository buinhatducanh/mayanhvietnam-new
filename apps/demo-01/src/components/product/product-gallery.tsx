'use client';

import { useState } from 'react';
import Image from 'next/image';
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
      <div className="relative aspect-square overflow-hidden rounded-xl bg-card border border-border">
        <Image
          src={images[active].url}
          alt={images[active].alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          quality={80}
          className="object-cover"
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
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="80px"
                loading="lazy"
                quality={75}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
