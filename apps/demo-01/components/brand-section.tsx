'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  getBrandBanners,
  formatBrandPrice,
  type BrandBanner,
} from '@mayanhvietnam/mock-data'

/**
 * Brand section — renders a grid of brand banner cards.
 * Each card shows: gradient bg, logo SVG, product count, starting price, CTA.
 *
 * Data sourced entirely from `@mayanhvietnam/mock-data` brand-banners.ts
 */

function BrandCard({ banner }: { banner: BrandBanner }) {
  const { meta, productCount, startingPrice, featured, ctaHref } = banner

  return (
    <Link
      href={ctaHref}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] p-5 sm:p-6 transition-all duration-300 hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/20"
      style={{ background: meta.gradient }}
    >
      {/* Subtle accent glow top-right */}
      <div
        className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: meta.accent }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Logo SVG */}
        <div
          className="mb-3 h-12 sm:h-14 w-full max-w-[180px] sm:max-w-[220px] text-white/90 group-hover:text-white transition-colors"
          dangerouslySetInnerHTML={{ __html: meta.logo }}
        />

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-white/50 font-light tracking-wide mb-1">
          {meta.tagline}
        </p>

        {/* Product count */}
        <p className="text-[11px] sm:text-xs text-white/30">
          {productCount} sản phẩm · Từ {formatBrandPrice(startingPrice)}
        </p>
      </div>

      {/* Featured product thumbnails — small, bottom right */}
      {featured.length > 0 && (
        <div className="relative z-10 mt-4 flex items-end gap-2">
          {featured.slice(0, 3).map((p, i) => (
            <div
              key={p.id}
              className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04] group-hover:border-white/[0.15] transition-colors"
            >
              <Image
                src={p.thumbnail}
                alt={p.name}
                fill
                className="object-cover object-center"
                sizes="64px"
              />
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="relative z-10 mt-4 flex items-center gap-1 text-xs font-medium text-white/60 group-hover:text-white/90 transition-colors">
        Khám phá {meta.name}
        <svg
          className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
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
