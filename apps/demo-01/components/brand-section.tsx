'use client'

import Link from 'next/link'
import {
  getBrandBanners,
  formatBrandPrice,
  type BrandBanner,
} from '@mayanhvietnam/mock-data'

/**
 * Brand section — renders a grid of brand banner cards.
 * Each card is a clean brand tile: gradient bg, centered logo, product count.
 * No product thumbnails inside — the card is a brand gateway, not a product list.
 *
 * Data sourced entirely from `@mayanhvietnam/mock-data` brand-banners.ts
 */

function BrandCard({ banner }: { banner: BrandBanner }) {
  const { meta, productCount, startingPrice, ctaHref } = banner

  return (
    <Link
      href={ctaHref}
      aria-label={`Khám phá sản phẩm ${meta.name}`}
      className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-white/[0.06] p-5 sm:p-6 transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
      style={{ background: meta.gradient }}
    >
      {/* Accent glow, revealed on hover */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
        style={{ backgroundColor: meta.accent }}
      />

      {/* Logo — the hero of the card, centered in the free space */}
      <div className="relative z-10 flex flex-1 items-center">
        <div
          className="h-11 sm:h-12 w-full max-w-[170px] sm:max-w-[200px] text-white/85 transition-colors duration-300 group-hover:text-white"
          dangerouslySetInnerHTML={{ __html: meta.logo }}
        />
      </div>

      {/* Footer row: count/price left, CTA arrow right */}
      <div className="relative z-10 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] sm:text-xs font-medium text-white/70">
            {productCount} sản phẩm
          </p>
          <p className="text-[10px] sm:text-[11px] text-white/40">
            Từ {formatBrandPrice(startingPrice)}
          </p>
        </div>

        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/60 transition-all duration-300 group-hover:bg-white/[0.16] group-hover:text-white"
          aria-hidden="true"
        >
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function BrandSection() {
  const banners = getBrandBanners()

  if (banners.length === 0) return null

  return (
    <section className="py-10 sm:py-14">
      {/* Section header */}
      <div className="mb-6 sm:mb-8 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Mua theo hãng
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Chọn hãng bạn tin dùng — sản phẩm chính hãng, bảo hành đầy đủ
        </p>
      </div>

      {/* Brand grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 px-4 sm:px-6">
        {banners.map((banner) => (
          <BrandCard key={banner.meta.slug} banner={banner} />
        ))}
      </div>
    </section>
  )
}
