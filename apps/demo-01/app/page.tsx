import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HeroSection } from '@/components/home/hero-section'
import { FlashSaleSection } from '@/components/home/flash-sale-section'
import { PromotionalBannersSection } from '@/components/home/promotional-banners-section'
import { TabbedProductSection } from '@/components/home/tabbed-product-section'
import { ReviewsSection } from '@/components/home/reviews-section'
import { NewsletterSection } from '@/components/home/newsletter-section'
import BrandSection from '@/components/brand-section'
import { categories } from '@/lib/products'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col gap-12 pb-16 lg:gap-16">
        <HeroSection />

        {/* Category grid — 9 items from homepage.json */}
        <section aria-label="Danh mục nổi bật" className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/danh-muc/${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-all hover:-translate-y-1 hover:border-primary/50 hover:brand-glow"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={cat.image || '/placeholder.svg'}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 33vw, 11vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="text-center text-[11px] font-medium transition-colors group-hover:text-primary sm:text-xs">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash sale banner */}
        <FlashSaleSection />

        {/* Promotional banner row — 4 banners (FLASH SALE / NỔI BẬT / KM / CŨ KM) */}
        <PromotionalBannersSection />

        {/* Brand banners — "Mua theo hãng" */}
        <div className="mx-auto w-full max-w-7xl">
          <BrandSection />
        </div>

        {/* TOP MÁY ẢNH */}
        <TabbedProductSection heading="TOP MÁY ẢNH" categorySlug="may-anh" variant="cameras" />

        {/* TOP ỐNG KÍNH */}
        <TabbedProductSection heading="TOP ỐNG KÍNH" categorySlug="ong-kinh" variant="lenses" />

        {/* TOP FLYCAM */}
        <TabbedProductSection heading="TOP FLYCAM" categorySlug="flycam" variant="flycam" />

        {/* TOP ACTION CAMERA */}
        <TabbedProductSection heading="TOP ACTION CAMERA" categorySlug="action-camera" variant="action" />

        {/* Reviews section */}
        <ReviewsSection />

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  )
}