'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

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

export function BannerSlider({
  slides,
  variant = 'hero',
  interval = 6000,
  className = '',
}: BannerSliderProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [leakKey, setLeakKey] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const containerRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = slides.length

  /* Manual transition — triggers light-leak flash */
  const go = useCallback(
    (next: number) => {
      const target = (next + count) % count
      if (target === index) return
      setTransitioning(true)
      setLeakKey((k) => k + 1) /* bumps key → remounts light-leak element */
      setTimeout(() => {
        setIndex(target)
        setTimeout(() => setTransitioning(false), 100)
      }, 60)
    },
    [count, index],
  )

  /* Auto-rotate — smooth cross-fade only, NO flash */
  useEffect(() => {
    if (paused || count <= 1) return
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, interval)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [paused, count, interval])

  /* Mouse-tracked parallax for the flare orb (hero only) */
  useEffect(() => {
    if (variant !== 'hero') return
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    const el = containerRef.current
    el?.addEventListener('mousemove', handleMove)
    return () => el?.removeEventListener('mousemove', handleMove)
  }, [variant])

  const isHero = variant === 'hero'

  /* Parallax offset: ±30px range for the flare orb */
  const orbOffset = isHero
    ? {
        transform: `translate(${(mousePos.x - 0.5) * 30}px, ${(mousePos.y - 0.5) * 30}px)`,
        transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
      }
    : {}

  return (
    <div
      ref={containerRef}
      className={`shine group relative overflow-hidden rounded-3xl border border-border bg-card ${
        isHero ? 'min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]' : 'min-h-[220px] sm:min-h-[260px]'
      } ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner quảng cáo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const active = i === index
        return (
          <div
            key={slide.title + i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              active ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
            }`}
            aria-hidden={!active}
          >
            {/* Background image with ken-burns */}
            <div className="absolute inset-0">
              <Image
                src={slide.image || '/placeholder.svg'}
                alt={slide.imageAlt}
                fill
                priority={i === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                quality={90}
                className={`object-cover ${active ? 'animate-ken-burns' : ''}`}
              />
            </div>
            {/* Readability gradient — theme-aware so it stays readable in both modes */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: isDark
                  ? 'linear-gradient(to right, #060a14, rgba(6,10,20,0.88), rgba(6,10,20,0.1))'
                  : 'linear-gradient(to right, #f8fafd, rgba(248,250,253,0.92), rgba(248,250,253,0.15))',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: isDark
                  ? 'linear-gradient(to top, rgba(6,10,20,0.8), transparent)'
                  : 'linear-gradient(to top, rgba(248,250,253,0.85), transparent)',
              }}
            />

            {/* ── Ambient glow ── */}
            <div
              aria-hidden="true"
              className="animate-pulse-ring pointer-events-none absolute -right-24 top-1/4 size-[420px] rounded-full bg-primary/20 blur-[120px]"
            />

            {/* ── God rays — 3 tia sáng tỏa ra ── */}
            {isHero && (
              <>
                <div
                  aria-hidden="true"
                  className="light-ray"
                  style={{ right: '-6%', '--ray-rot': '14deg', animationDelay: '0s' } as React.CSSProperties}
                />
                <div
                  aria-hidden="true"
                  className="light-ray"
                  style={{ right: '12%', '--ray-rot': '8deg', animationDelay: '3s' } as React.CSSProperties}
                />
                <div
                  aria-hidden="true"
                  className="light-ray"
                  style={{ right: '28%', '--ray-rot': '2deg', animationDelay: '5.5s' } as React.CSSProperties}
                />
              </>
            )}

            {/* ── Aurora ribbon — subtle chromatic drift ── */}
            {isHero && <div aria-hidden="true" className="aurora" />}

            {/* ── Drifting lens-flare orb (parallax-tracked on hero) ── */}
            <div
              aria-hidden="true"
              className="animate-flare-drift pointer-events-none absolute right-[18%] top-[28%] size-40 rounded-full bg-[radial-gradient(circle,rgba(180,220,255,0.9),rgba(43,127,255,0.35)_35%,transparent_70%)] blur-md mix-blend-screen"
              style={orbOffset}
            />

            {/* ── Tech light-flare sweep + scan line (active slide only) ── */}
            {active && <div aria-hidden="true" className="banner-flare mix-blend-screen" />}

            {/* ── Light leak flash on MANUAL slide transition only ── */}
            {active && leakKey > 0 && (
              <div aria-hidden="true" className="light-leak" key={`leak-${leakKey}`} />
            )}

            {/* ── Content ── */}
            <div
              className={`relative flex h-full flex-col justify-center ${
                isHero
                  ? 'max-w-lg gap-5 px-6 py-10 sm:px-12 lg:px-16'
                  : 'max-w-md gap-3.5 px-6 py-8 sm:px-10'
              }`}
            >
              {slide.eyebrow && (
                <span
                  className={`flex w-fit items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary ${
                    active ? 'animate-fade-slide' : ''
                  }`}
                >
                  <span aria-hidden="true" className="h-px w-8 bg-primary/70" />
                  {slide.eyebrow}
                </span>
              )}
              <h2
                className={`text-balance font-bold leading-[1.05] tracking-tight ${
                  isHero ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl'
                } ${active ? 'animate-fade-slide delay-100' : ''}`}
              >
                {slide.title}
                {slide.highlight && (
                  <span className="text-glow mt-1 block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {slide.highlight}
                  </span>
                )}
              </h2>
              {slide.subtitle && (
                <p
                  className={`max-w-md text-pretty leading-relaxed text-muted-foreground ${
                    isHero ? 'text-sm sm:text-base' : 'text-sm'
                  } ${active ? 'animate-fade-slide delay-200' : ''}`}
                >
                  {slide.subtitle}
                </p>
              )}
              {(slide.primaryCta || slide.secondaryCta) && (
                <div
                  className={`mt-1 flex flex-wrap items-center gap-3 ${
                    active ? 'animate-fade-slide delay-300' : ''
                  }`}
                >
                  {slide.primaryCta && (
                    <Link
                      href={slide.primaryCta.href}
                      className={`group/btn relative flex items-center gap-2 overflow-hidden rounded-full bg-primary font-semibold text-primary-foreground shadow-[0_8px_30px_-6px_rgba(43,127,255,0.6)] transition-all hover:brightness-110 ${
                        isHero ? 'px-7 py-3 text-sm' : 'px-5 py-2.5 text-[13px]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                      />
                      {slide.primaryCta.label}
                      <ArrowRight
                        className="size-4 transition-transform group-hover/btn:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                  {slide.secondaryCta && (
                    <Link
                      href={slide.secondaryCta.href}
                      className={`group/sec flex items-center gap-2 rounded-full border border-primary/30 bg-background/30 font-semibold backdrop-blur-md transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary ${
                        isHero ? 'px-7 py-3 text-sm' : 'px-5 py-2.5 text-[13px]'
                      }`}
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
          {/* Arrows */}
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Banner trước"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 text-foreground opacity-0 backdrop-blur-sm transition-all hover:border-primary hover:text-primary group-hover:opacity-100"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Banner kế tiếp"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 text-foreground opacity-0 backdrop-blur-sm transition-all hover:border-primary hover:text-primary group-hover:opacity-100"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-6 z-20 flex gap-2 sm:left-12">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Chuyển đến banner ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-8 bg-primary' : 'w-3 bg-muted-foreground/40 hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
