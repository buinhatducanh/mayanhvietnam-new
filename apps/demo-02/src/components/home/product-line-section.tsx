import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BannerSlider, type BannerSlide } from '@/components/banner-slider'
import { SmallBannerCarousel } from '@/components/home/small-banner-carousel'
import { ProductCard } from '@/components/product-card'
import { getProductsByCategory } from '@/lib/products'

interface ProductLineSectionProps {
  categorySlug: string
  eyebrow: string
  title: string
  icon: LucideIcon
  adSlides: BannerSlide[]
  /** Mini banners hiển thị sau products — pattern đúng mayanhvietnam.com */
  miniBanners?: { title: string; image: string; href: string }[]
}

export function ProductLineSection({
  categorySlug,
  eyebrow,
  title,
  icon: Icon,
  adSlides,
  miniBanners,
}: ProductLineSectionProps) {
  const items = getProductsByCategory(categorySlug).slice(0, 4)
  if (items.length === 0) return null

  return (
    <section
      aria-label={title}
      className="mx-auto w-full max-w-7xl px-4 lg:px-8"
    >
      {/* Ad banner slide for this product line — giống demo-05 */}
      <BannerSlider slides={adSlides} variant="ad" interval={5000} />

      {/* Heading */}
      <div className="mb-6 mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <Icon className="size-4" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        </div>
        <Link
          href={`/danh-muc/${categorySlug}`}
          className="group flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all hover:border-primary hover:text-primary"
        >
          Xem tất cả
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((product, i) => (
          <div
            key={product.slug}
            className={`animate-rise-in delay-${Math.min((i + 1) * 100, 400)}`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Small Banner Carousel — giống bannerSileSmall-2 trên mayanhvietnam.com */}
      {miniBanners && miniBanners.length > 0 && (
        <div className="mt-6">
          <SmallBannerCarousel banners={miniBanners} />
        </div>
      )}
    </section>
  )
}
