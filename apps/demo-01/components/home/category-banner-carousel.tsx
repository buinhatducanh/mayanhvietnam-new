'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CategoryBanner } from '@mayanhvietnam/mock-data'

interface Props {
  banners: CategoryBanner[]
  /** Banner aspect ratio. Default '3/1' matches hero banner style. */
  aspectRatio?: string
}

/**
 * Carousel banner lớn theo danh mục — giống demo-05 CategoryCarousel.
 * Auto-play, pause on hover, có arrows + dots.
 * Banner ảnh thật 1305x435 từ mayanhvietnam.com.
 */
export function CategoryBannerCarousel({ banners, aspectRatio = '3/1' }: Props) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(
    () => setActive((i) => (i + 1) % banners.length),
    [banners.length],
  )
  const prev = useCallback(
    () => setActive((i) => (i - 1 + banners.length) % banners.length),
    [banners.length],
  )

  useEffect(() => {
    if (paused || banners.length <= 1) return
    const t = setInterval(next, 4500)
    return () => clearInterval(t)
  }, [paused, next, banners.length])

  if (banners.length === 0) return null

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-black"
      style={{ aspectRatio: aspectRatio }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {banners.map((banner, i) => (
        <Link
          key={banner.title + i}
          href={banner.href}
          aria-label={banner.title}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none',
          )}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px"
            className="object-cover"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          {(banner.title || banner.subtitle) && (
            <div className="absolute bottom-4 left-5 right-4 sm:bottom-6 sm:left-7">
              {banner.title && (
                <p className="text-base font-bold text-white drop-shadow-md sm:text-xl">
                  {banner.title}
                </p>
              )}
              {banner.subtitle && (
                <p className="mt-1 text-xs text-white/80 drop-shadow-md sm:text-sm line-clamp-1">
                  {banner.subtitle}
                </p>
              )}
            </div>
          )}
        </Link>
      ))}

      {/* Arrows */}
      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              prev()
            }}
            aria-label="Banner trước"
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white sm:left-4"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              next()
            }}
            aria-label="Banner tiếp theo"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white sm:right-4"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setActive(i)
              }}
              aria-label={`Chuyển tới banner ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
