import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, CircleDot, Smile, Store, Users } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HeroSection } from '@/components/home/hero-section'
import { PromoCards } from '@/components/home/promo-cards'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { ProductCard } from '@/components/product-card'
import { categories, products } from '@/lib/products'

const stats = [
  { icon: Award, value: '10+ năm', label: 'Kinh nghiệm trong lĩnh vực' },
  { icon: Users, value: '100.000+', label: 'Khách hàng tin tưởng' },
  { icon: Store, value: '500+ thương hiệu', label: 'Chính hãng phân phối' },
  { icon: Smile, value: '98%', label: 'Khách hàng hài lòng' },
]

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col gap-16 pb-20 lg:gap-20">
        <HeroSection />

        {/* Category tiles */}
        <section aria-label="Danh mục nổi bật" className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.slug}
                href={`/danh-muc/${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary/50 hover:brand-glow"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={cat.image || '/placeholder.svg'}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 40vw, 12vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="text-center text-xs font-medium transition-colors group-hover:text-primary">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <PromoCards />

        {/* Featured products */}
        <section aria-labelledby="featured-heading" className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <CircleDot className="size-3.5" aria-hidden="true" />
                Sản phẩm nổi bật
              </p>
              <h2 id="featured-heading" className="mt-2 text-2xl font-bold sm:text-3xl">
                Sản phẩm được yêu thích
              </h2>
            </div>
            <Link
              href="/danh-muc/may-anh"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              Xem tất cả
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        {/* Stats bar */}
        <section aria-label="Thành tựu" className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 bg-card p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <stat.icon className="size-5 text-primary" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-lg font-bold text-primary">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Tools row */}
        <section aria-label="Công cụ hữu ích" className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-2">
            <Link
              href="/kiem-tra-ong-kinh"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:brand-glow"
            >
              <div
                aria-hidden="true"
                className="absolute -bottom-10 -right-10 size-40 rounded-full bg-primary/10 blur-3xl"
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Công cụ miễn phí
              </span>
              <h3 className="mt-2 text-xl font-bold">Kiểm tra tương thích ống kính</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Chọn thân máy và ống kính để kiểm tra ngay ngàm có tương thích hay không trước khi
                mua.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                Thử ngay
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
            <Link
              href="/setup-studio"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:brand-glow"
            >
              <div
                aria-hidden="true"
                className="absolute -bottom-10 -right-10 size-40 rounded-full bg-primary/10 blur-3xl"
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Tư vấn chuyên sâu
              </span>
              <h3 className="mt-2 text-xl font-bold">Setup phòng Studio theo yêu cầu</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Trả lời 3 câu hỏi để nhận gợi ý cấu hình studio phù hợp với nhu cầu và ngân sách
                của bạn.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                Bắt đầu
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  )
}
