'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Truck, ShieldCheck } from 'lucide-react'
import { products, formatVND } from '@/lib/products'

const FEATURED_INDEX = 1 // Sony A7 IV — flagship full-frame

export function HeroBanners() {
  const featured = products[FEATURED_INDEX]
  const canonR50 = products[4]  // Canon R50
  const djiMavic = products[6]  // DJI Mavic 4 Pro

  return (
    <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-4 px-4 py-6 lg:grid-cols-2 lg:py-10">
      {/* Left column: headline + small promo banners */}
      <div className="flex flex-col justify-center gap-4">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Bộ sưu tập 2026 — Đẳng cấp nhiếp ảnh
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
            Nghệ thuật bắt đầu từ <span className="shine-text">chiếc máy ảnh</span> của bạn
          </h1>
          <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            Trải nghiệm 3D tương tác — cuộn xuống để khám phá từng chi tiết, thông số và khả năng
            chụp ảnh 4K chuyên nghiệp.
          </p>
        </div>

        {/* Two small promo banners with real product images */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/store"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
          >
            {canonR50.image && (
              <img
                src={canonR50.image}
                alt={canonR50.name}
                className="absolute -right-4 -top-4 h-20 w-20 object-contain opacity-30 transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            )}
            <p className="relative text-xs font-semibold uppercase tracking-wider text-primary">
              Giảm {canonR50.discountPercent}%
            </p>
            <p className="relative mt-1 text-sm font-bold">{canonR50.name}</p>
            <p className="relative mt-0.5 text-xs text-muted-foreground">Chỉ từ {formatVND(canonR50.price)}</p>
            <ArrowRight className="relative mt-3 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
          <Link
            href="/store"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
          >
            {djiMavic.image && (
              <img
                src={djiMavic.image}
                alt={djiMavic.name}
                className="absolute -right-4 -top-4 h-20 w-20 object-contain opacity-30 transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            )}
            <p className="relative text-xs font-semibold uppercase tracking-wider text-primary">Flycam Flagship</p>
            <p className="relative mt-1 text-sm font-bold">{djiMavic.name}</p>
            <p className="relative mt-0.5 text-xs text-muted-foreground">Hasselblad 100MP · 6K HDR</p>
            <ArrowRight className="relative mt-3 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-primary" /> Giao hàng toàn quốc
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Bảo hành chính hãng 24 tháng
          </span>
        </div>
      </div>

      {/* Right column: THE special banner (50% of screen) — the 3D model floats above it */}
      <div className="relative flex min-h-[320px] items-end lg:min-h-0">
        <div className="spotlight-banner relative h-full w-full overflow-hidden rounded-3xl border border-primary/25">
          {/* Real product image as background */}
          {featured.image && (
            <img
              src={featured.image}
              alt={featured.name}
              className="absolute inset-0 h-full w-full object-contain p-8 opacity-40"
              loading="lazy"
            />
          )}
          {/* Decorative ring behind the model */}
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 lg:h-96 lg:w-96" />
          <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 lg:h-72 lg:w-72" />

          {/* Banner copy */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Flagship</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">{featured.name}</p>
              <p className="text-xs text-muted-foreground">{featured.specs.find(s => s.label === 'Cảm biến')?.value} · {featured.specs.find(s => s.label === 'Quay video')?.value}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-bold text-primary">{formatVND(featured.price)}</p>
                <p className="text-xs text-muted-foreground line-through">
                  {formatVND(featured.originalPrice)}
                </p>
              </div>
              <Link
                href="/store"
                className="glow-amber inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Mua ngay <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
