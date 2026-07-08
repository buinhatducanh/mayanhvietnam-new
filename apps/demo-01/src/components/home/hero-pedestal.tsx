'use client';

import { useState } from 'react';
import { Camera, Zap, Eye, Wifi, ShoppingCart, Heart, RotateCcw, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { cn, formatVND } from '@/lib/utils';
import { useTheme } from '@/components/layout/theme-provider';

interface HeroSpec {
  icon: typeof Camera;
  label: string;
  sub: string;
}

interface HeroData {
  badge: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  specs: HeroSpec[];
  features: string[];
  thumbs: string[];
  mainImage: string;
}

const HERO_DATA: HeroData = {
  badge: 'NEW ARRIVAL',
  name: 'Canon EOS R6 Mark II',
  tagline: 'Hiệu suất đỉnh cao. Sáng tạo không giới hạn.',
  price: 49990000,
  originalPrice: 54900000,
  specs: [
    { icon: Camera, label: '24.2MP', sub: 'Full Frame' },
    { icon: Zap, label: '8K', sub: 'Video' },
    { icon: Eye, label: 'AI FOCUS', sub: 'Dual Pixel' },
    { icon: Wifi, label: 'Wi-Fi 6', sub: 'Bluetooth' },
  ],
  features: ['360° View', '4K Video', 'IBIS 8-stop', '30fps Burst'],
  thumbs: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=120&h=120&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1606986628253-d3bd1d2d0e9c?w=120&h=120&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1573868396651-ca8a5fca84f6?w=120&h=120&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=120&h=120&fit=crop&auto=format',
  ],
  mainImage:
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&h=900&fit=crop&auto=format',
};

export function HeroPedestal() {
  const [activeThumb, setActiveThumb] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background glow */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          isDark ? 'hero-glow-dark' : 'hero-glow-light'
        )}
      />
      {isDark && (
        <div className="scan-texture pointer-events-none absolute inset-0 opacity-[0.025]" />
      )}

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid min-h-[520px] grid-cols-1 items-center gap-0 sm:min-h-[580px] lg:grid-cols-[auto_1fr_auto]">
          {/* Left: Thumbnails (desktop only) */}
          <div className="hidden w-[72px] flex-col gap-2 py-10 pr-5 lg:flex">
            {HERO_DATA.thumbs.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveThumb(i)}
                aria-label={`Xem góc ${i + 1}`}
                className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200"
                style={
                  i === activeThumb
                    ? {
                        borderColor: '#FF6B35',
                        boxShadow: isDark
                          ? '0 0 10px rgba(255,107,53,0.5)'
                          : '0 0 8px rgba(255,107,53,0.3)',
                        opacity: 1,
                      }
                    : { borderColor: 'transparent', opacity: 0.45 }
                }
              >
                <img src={src} alt="" className="h-full w-full bg-muted object-cover" />
              </button>
            ))}
          </div>

          {/* Center: Product on pedestal */}
          <div className="relative order-first flex items-center justify-center py-8 sm:py-12 lg:order-none">
            {/* Pedestal glow */}
            <div
              className={cn(
                'pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2',
                isDark ? 'pedestal-glow-dark' : 'pedestal-glow-light'
              )}
              style={{ width: '340px', height: '80px' }}
            />
            {/* Orange glow ring (dark only) */}
            {isDark && (
              <div
                className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2"
                style={{
                  width: '280px',
                  height: '20px',
                  background:
                    'radial-gradient(ellipse, rgba(255,107,53,0.9) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
            )}
            {/* Platform disc (light only) */}
            {!isDark && (
              <div
                className="pedestal-disc-light pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2"
                style={{ width: '300px', height: '32px' }}
              />
            )}

            {/* Product image */}
            <img
              key={activeThumb}
              src={HERO_DATA.thumbs[activeThumb].replace('w=120&h=120', 'w=700&h=700')}
              alt={HERO_DATA.name}
              className="relative z-10 w-full max-w-[360px] object-contain transition-all duration-500 sm:max-w-[440px]"
              style={{
                filter: isDark
                  ? 'drop-shadow(0 20px 60px rgba(255,107,53,0.3)) drop-shadow(0 0 80px rgba(255,107,53,0.1))'
                  : 'drop-shadow(0 20px 50px rgba(0,0,0,0.15))',
              }}
            />
          </div>

          {/* Right: Copy + specs */}
          <div className="max-w-sm py-10 lg:max-w-[360px] lg:pl-8 xl:pl-12">
            <span className="badge-new-arrival mb-4 inline-block rounded-sm px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em]">
              {HERO_DATA.badge}
            </span>

            <h1
              className="mb-2 text-3xl font-black leading-tight sm:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {HERO_DATA.name}
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {HERO_DATA.tagline}
            </p>

            {/* Spec grid */}
            <div className="mb-6 grid grid-cols-4 gap-2">
              {HERO_DATA.specs.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card py-2.5 text-center"
                  style={isDark ? { background: 'rgba(255,255,255,0.04)' } : undefined}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: '#FF6B35' }} />
                  <span className="font-mono text-xs font-bold text-foreground">
                    {label}
                  </span>
                  <span className="font-mono text-[9px] leading-tight text-muted-foreground">
                    {sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mb-5">
              <p className="price-mono text-2xl font-black sm:text-3xl">
                {formatVND(HERO_DATA.price)}
              </p>
              {HERO_DATA.originalPrice && (
                <p className="price-strike mt-0.5 font-mono text-sm">
                  {formatVND(HERO_DATA.originalPrice)}
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="flex gap-2.5">
              <button
                type="button"
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95',
                  isDark && 'glow-primary'
                )}
                style={{
                  background: '#FF6B35',
                  boxShadow: isDark
                    ? '0 0 24px rgba(255,107,53,0.4)'
                    : '0 4px 16px rgba(255,107,53,0.3)',
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                Mua ngay
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all hover:border-primary"
                style={{
                  borderColor: 'rgba(255,107,53,0.4)',
                  color: '#FF6B35',
                }}
              >
                <Heart className="h-4 w-4" />
                Thêm vào giỏ
              </button>
            </div>

            {/* Feature tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {HERO_DATA.features.map((f) => (
                <span
                  key={f}
                  className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right-edge feature icons — desktop only */}
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {[
          { icon: RotateCcw, label: '360°' },
          { icon: Zap, label: '8K' },
          { icon: Eye, label: 'AI AF' },
          { icon: SlidersHorizontal, label: 'IBIS' },
          { icon: Wifi, label: 'Wi-Fi' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex w-10 cursor-pointer flex-col items-center gap-1 opacity-60 transition-opacity hover:opacity-100"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card"
              style={isDark ? { background: 'rgba(255,255,255,0.05)' } : undefined}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: '#FF6B35' }} />
            </div>
            <span className="font-mono text-[8px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}