'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  Shield,
  RotateCcw,
  CreditCard,
} from 'lucide-react';
import { cn, formatVND } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { allProducts } from '@/lib/mock-data';
import type { ProductSummary } from '@mayanhvietnam/mock-data';

// Hero carousel — luân phiên 3 sản phẩm flagship mỗi 6s
const HERO_SLUGS = ['canon-eos-r6-mark-ii-body-only', 'may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang', 'ong-kinh-canon-rf-2470-f28-l-is-usm-chinh-hang'];
const heroProducts: ProductSummary[] = HERO_SLUGS
  .map((slug) => allProducts.find((p) => p.slug === slug))
  .filter((p): p is ProductSummary => Boolean(p));

const TRUST_BADGES = [
  { icon: Truck, label: 'Freeship đơn từ 5 triệu' },
  { icon: Shield, label: 'Bảo hành chính hãng 24 tháng' },
  { icon: RotateCcw, label: 'Thu cũ trợ giá 30%' },
  { icon: CreditCard, label: 'Trả góp 0% lãi suất' },
];

const ROTATE_MS = 6000;

export function HeroPedestal() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (paused || heroProducts.length <= 1) return;
    const t = setInterval(
      () => setActive((i) => (i + 1) % heroProducts.length),
      ROTATE_MS
    );
    return () => clearInterval(t);
  }, [paused]);

  if (heroProducts.length === 0) return null;
  const current = heroProducts[active];
  const discount =
    current.originalPrice && current.originalPrice > current.price
      ? Math.round(((current.originalPrice - current.price) / current.originalPrice) * 100)
      : 0;

  return (
    <section
      className="relative overflow-hidden border-b border-border bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Sản phẩm nổi bật"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* LEFT: Carousel image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card border border-border">
              {heroProducts.map((p, i) => (
                <div
                  key={p.id}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-700',
                    i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  )}
                  aria-hidden={i !== active}
                >
                  <Image
                    src={p.thumbnail}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={i === 0}
                    className="object-contain p-6 sm:p-10"
                  />
                  {discount > 0 && (
                    <span className="absolute left-3 top-3 rounded-md bg-primary px-2.5 py-1 font-mono text-xs font-bold text-white">
                      -{discount}%
                    </span>
                  )}
                </div>
              ))}

              {/* Slide arrows */}
              <button
                type="button"
                aria-label="Sản phẩm trước"
                onClick={() =>
                  setActive((i) => (i - 1 + heroProducts.length) % heroProducts.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 border border-border text-foreground hover:border-primary hover:text-primary transition-colors backdrop-blur-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Sản phẩm tiếp theo"
                onClick={() => setActive((i) => (i + 1) % heroProducts.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 border border-border text-foreground hover:border-primary hover:text-primary transition-colors backdrop-blur-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Slide indicators */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {heroProducts.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Xem ${p.name}`}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === active
                      ? 'w-10 bg-primary'
                      : 'w-1.5 bg-border hover:bg-muted-foreground/40'
                  )}
                />
              ))}
            </div>

            {/* Thumbnails (desktop) */}
            <div className="mt-4 hidden lg:grid grid-cols-3 gap-2">
              {heroProducts.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border p-2 transition-colors text-left',
                    i === active
                      ? 'border-primary bg-primary/[0.06]'
                      : 'border-border hover:border-primary/40'
                  )}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-card">
                    <Image
                      src={p.thumbnail}
                      alt={p.name}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground truncate">
                      {p.brand}
                    </p>
                    <p className="text-xs font-medium text-foreground truncate">
                      {p.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Copy + price + CTA */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
              Sản phẩm nổi bật
            </span>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {current.brand}
            </p>
            <h1
              className="mt-2 text-3xl sm:text-4xl font-bold leading-tight text-foreground"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
            >
              {current.name}
            </h1>

            {/* Rating */}
            {current.rating && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i <= Math.floor(current.rating!.average)
                          ? 'fill-primary text-primary'
                          : 'text-border'
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {current.rating.average.toFixed(1)} · {current.rating.count} đánh giá
                </span>
              </div>
            )}

            {/* Short specs */}
            {current.shortSpecs && current.shortSpecs.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {current.shortSpecs.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-card px-2 py-1 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* Price block */}
            <div className="mt-6 rounded-xl border border-border bg-card p-4">
              <div className="flex items-baseline gap-3">
                <p className="price-mono text-3xl font-black">
                  {formatVND(current.price)}
                </p>
                {current.originalPrice && current.originalPrice > current.price && (
                  <>
                    <p className="price-strike text-sm">
                      {formatVND(current.originalPrice)}
                    </p>
                    <span className="rounded-md bg-error/15 px-1.5 py-0.5 text-[10px] font-mono font-bold text-error">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Hoặc trả góp 0% · ~{' '}
                <span className="font-mono text-foreground">
                  {formatVND(Math.round(current.price / 12))}
                </span>
                /tháng × 12 tháng
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <Link
                href={`/san-pham/${current.slug}`}
                className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: '#FF6B35' }}
              >
                Xem chi tiết
              </Link>
              <button
                type="button"
                onClick={() => addItem(current)}
                className="rounded-xl border-2 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/5 active:scale-[0.98]"
                style={{ borderColor: '#FF6B35' }}
              >
                Thêm vào giỏ
              </button>
            </div>

            {/* Trust mini row */}
            <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] text-muted-foreground">
              {TRUST_BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-1.5">
                  <b.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}