import Link from 'next/link'
import { ArrowRight, Sparkles, Tag } from 'lucide-react'
import { promotionalBanners } from '@/lib/products'

/**
 * Promotional banner row — mirrors `homepage.json` promotional_banners:
 * FLASH SALE, SẢN PHẨM NỔI BẬT, SẢN PHẨM KHUYẾN MÃI, SẢN PHẨM CŨ KHUYẾN MÃI.
 */
export function PromotionalBannersSection() {
  return (
    <section aria-label="Banner khuyến mãi" className="mx-auto w-full max-w-7xl px-4 lg:px-8">
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {promotionalBanners.map((banner) => (
          <Link
            key={banner.label}
            href={banner.link}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:brand-glow"
          >
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -right-10 size-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                {banner.label === 'FLASH SALE' ? (
                  <Sparkles className="size-3" aria-hidden="true" />
                ) : (
                  <Tag className="size-3" aria-hidden="true" />
                )}
                {banner.label}
              </span>
              <h3 className="mt-3 text-lg font-bold leading-tight">{banner.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">{banner.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary">
                Xem ngay
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}