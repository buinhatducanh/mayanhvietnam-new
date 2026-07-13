'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BannerSlide {
  eyebrow?: string
  title: string
  highlight?: string
  subtitle?: string
  image: string
  imageAlt: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

interface BannerSliderProps {
  slides: BannerSlide[]
  /** Height preset: 'hero' for the main hero, 'ad' for compact section banners */
  variant?: 'hero' | 'ad'
  interval?: number
  className?: string
}

/**
 * BannerSlider — chuẩn mayanhvietnam.com
 * Hero variant: aspect ratio 3:1 panoramic (giống mayanhvietnam.com homepage)
 * Ad variant: 3:1 nhưng nhỏ hơn, dùng cho category section banners
 *
 * Effects: Ken Burns zoom nhẹ khi slide active, gradient overlay cho chữ đọc rõ
 * Tự động pause khi hover, prev/next arrows, dots indicator
 */
export function BannerSlider({
  slides,
  variant = 'hero',
  interval = 6000,
  className = '',
}: BannerSliderProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length

  const go = useCallback(
    (next: number) => {
      const target = (next + count) % count
      setIndex(target)
    },
    [count],
  )

  /* Auto-rotate */
  useEffect(() => {
    if (paused || count <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, interval)
    return () => clearInterval(timer)
  }, [paused, count, interval])

  const isHero = variant === 'hero'

  return (
    <div
      className={cn(
        'relative group overflow-hidden rounded-2xl border border-border bg-black shadow-lg shadow-black/20',
        isHero ? 'min-h-[300px] sm:min-h-[360px] lg:min-h-[420px]' : 'min-h-[180px] sm:min-h-[220px]',
        className
      )}
      style={{ aspectRatio: isHero ? '3 / 1' : '16 / 6' }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner quảng cáo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, i) => {
        const active = i === index
        return (
          <div
            key={slide.title + i}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              active ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
            )}
            aria-hidden={!active}
          >
            {/* Background image — Ken Burns effect */}
            <img
              src={slide.image}
              alt={slide.imageAlt}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={cn(
                'absolute inset-0 w-full h-full object-cover transition-transform duration-7000 ease-out',
                active ? 'scale-105' : 'scale-100'
              )}
            />

            {/* Readability gradient — giống mayanhvietnam.com */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.72), rgba(0,0,0,0.28), transparent)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
              }}
            />

            {/* Text overlay — bottom-left, giống mayanhvietnam.com */}
            <div
              className={cn(
                'relative flex h-full flex-col justify-end',
                isHero ? 'max-w-lg gap-4 px-6 pb-8 sm:px-10 lg:px-14' : 'max-w-md gap-3 px-6 pb-6 sm:px-10'
              )}
            >
              {slide.eyebrow && (
                <span className="flex w-fit items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  <span aria-hidden="true" className="h-px w-6 bg-primary/70" />
                  {slide.eyebrow}
                </span>
              )}

              <h2
                className={cn(
                  'text-balance font-bold leading-[1.05] tracking-tight text-white',
                  isHero ? 'text-2xl sm:text-3xl lg:text-[2.5rem]' : 'text-xl sm:text-2xl'
                )}
              >
                {slide.title}
                {slide.highlight && (
                  <span className="mt-1 block text-primary">
                    {slide.highlight}
                  </span>
                )}
              </h2>

              {slide.subtitle && (
                <p
                  className={cn(
                    'max-w-md text-pretty leading-relaxed text-white/80',
                    isHero ? 'text-sm sm:text-[15px]' : 'text-sm'
                  )}
                >
                  {slide.subtitle}
                </p>
              )}

              {(slide.primaryCta || slide.secondaryCta) && (
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  {slide.primaryCta && (
                    <Link
                      href={slide.primaryCta.href}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground shadow-[0_4px_20px_-4px_rgba(255,107,53,0.5)] transition-all hover:brightness-110',
                        isHero ? 'px-6 py-3 text-sm' : 'px-5 py-2.5 text-[13px]'
                      )}
                    >
                      {slide.primaryCta.label}
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </Link>
                  )}
                  {slide.secondaryCta && (
                    <Link
                      href={slide.secondaryCta.href}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/20',
                        isHero ? 'px-6 py-3 text-sm' : 'px-5 py-2.5 text-[13px]'
                      )}
                    >
                      {slide.secondaryCta.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}

      {count > 1 && (
        <>
          {/* Arrows — giống mayanhvietnam.com */}
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Banner trước"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2.5 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 group-hover:opacity-100"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Banner kế tiếp"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2.5 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 group-hover:opacity-100"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>

          {/* Dots — bottom-right, giống mayanhvietnam.com */}
          <div className="absolute bottom-4 right-5 z-20 flex gap-1.5 sm:right-8">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Chuyển đến banner ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-7 bg-primary' : 'w-2.5 bg-white/35 hover:bg-white/60'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
