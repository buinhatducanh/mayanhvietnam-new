import Link from 'next/link'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HeroSection } from '@/components/home/hero-section'
import { FlashSaleSection } from '@/components/home/flash-sale-section'
import { PromotionalBannersSection } from '@/components/home/promotional-banners-section'
import { TabbedProductSection } from '@/components/home/tabbed-product-section'
import { ReviewsSection } from '@/components/home/reviews-section'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { CategoryBannerCarousel } from '@/components/home/category-banner-carousel'
import BrandSection from '@/components/brand-section'
import { categories } from '@/lib/products'
import { categoryBanners } from '@mayanhvietnam/mock-data'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col gap-12 pb-16 lg:gap-16">
        <HeroSection />

        {/* Brand banners — "Mua theo hãng" (vị trí 2, ngay sau Hero) */}
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <BrandSection />
        </div>

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

        {/* TOP MÁY ẢNH — banner carousel + product grid */}
        <section className="mx-auto w-full max-w-7xl px-4 lg:px-8 space-y-5">
          {categoryBanners['may-anh'] && categoryBanners['may-anh'].length > 0 && (
            <CategoryBannerCarousel banners={categoryBanners['may-anh']} />
          )}
          <TabbedProductSection heading="TOP MÁY ẢNH" categorySlug="may-anh" variant="cameras" />
        </section>

        {/* TOP ỐNG KÍNH — banner carousel + product grid */}
        <section className="mx-auto w-full max-w-7xl px-4 lg:px-8 space-y-5">
          {categoryBanners['ong-kinh'] && categoryBanners['ong-kinh'].length > 0 && (
            <CategoryBannerCarousel banners={categoryBanners['ong-kinh']} />
          )}
          <TabbedProductSection heading="TOP ỐNG KÍNH" categorySlug="ong-kinh" variant="lenses" />
        </section>

        {/* TOP FLYCAM — banner carousel + product grid */}
        <section className="mx-auto w-full max-w-7xl px-4 lg:px-8 space-y-5">
          {categoryBanners['flycam'] && categoryBanners['flycam'].length > 0 && (
            <CategoryBannerCarousel banners={categoryBanners['flycam']} />
          )}
          <TabbedProductSection heading="TOP FLYCAM" categorySlug="flycam" variant="flycam" />
        </section>

        {/* TOP ACTION CAMERA — banner carousel + product grid */}
        <section className="mx-auto w-full max-w-7xl px-4 lg:px-8 space-y-5">
          {categoryBanners['action-camera'] && categoryBanners['action-camera'].length > 0 && (
            <CategoryBannerCarousel banners={categoryBanners['action-camera']} />
          )}
          <TabbedProductSection heading="TOP ACTION CAMERA" categorySlug="action-camera" variant="action" />
        </section>

        {/* Reviews section */}
        <ReviewsSection />

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  )
}