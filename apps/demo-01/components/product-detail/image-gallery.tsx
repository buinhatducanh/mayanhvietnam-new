'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'

interface Props {
  mainImage: string
  thumbnails?: string[]
  productName: string
}

export function ImageGallery({ mainImage, thumbnails = [], productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const allImages = [mainImage, ...thumbnails]

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div className="group relative aspect-square overflow-hidden rounded-3xl border border-border bg-secondary">
          <Image
            src={allImages[activeIndex]}
            alt={`${productName} - ảnh ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          />
          {/* Zoom hint */}
          <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="size-3.5" aria-hidden="true" />
            Phóng to
          </span>
        </div>

        {/* Thumbnails */}
        {thumbnails.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1" role="list" aria-label="Ảnh sản phẩm">
            {allImages.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Xem ảnh ${i + 1}`}
                aria-pressed={activeIndex === i}
                className={`relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  activeIndex === i
                    ? 'border-primary ring-2 ring-primary/30'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Phóng to ảnh sản phẩm"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Đóng"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <div
            className="relative aspect-square w-full max-w-3xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[activeIndex]}
              alt={`${productName} - ảnh ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Thumbnail strip in lightbox */}
          {thumbnails.length > 0 && (
            <div
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {allImages.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Ảnh ${i + 1}`}
                  className={`relative size-12 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    activeIndex === i ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={src} alt="" fill sizes="48px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
