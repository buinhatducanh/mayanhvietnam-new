import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Aperture,
  Camera,
  CircleDot,
  Drone,
  Smile,
  Store,
  Users,
  Video,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HeroSection } from '@/components/home/hero-section'
import { PromoCards } from '@/components/home/promo-cards'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { ProductLineSection } from '@/components/home/product-line-section'
import { ProductCard } from '@/components/product-card'
import { YouTubeReviews } from '@/components/home/youtube-reviews'
import { YouTubeShorts } from '@/components/home/youtube-shorts'
import { BrandStrip } from '@/components/home/brand-strip'
import { categories, products } from '@/lib/products'

const stats = [
  { icon: Award, value: '10+ năm', label: 'Kinh nghiệm phân phối máy ảnh' },
  { icon: Users, value: '100.000+', label: 'Khách hàng tin tưởng' },
  { icon: Store, value: '4 cửa hàng', label: 'TP.HCM · Cần Thơ · An Giang · Đồng Tháp' },
  { icon: Smile, value: '98%', label: 'Khách hàng hài lòng' },
]

const productLines = [
  {
    categorySlug: 'may-anh',
    eyebrow: 'Top máy ảnh bán chạy',
    title: 'Máy ảnh Mirrorless & DSLR chính hãng',
    icon: Camera,
    adSlides: [
      {
        eyebrow: 'Best seller',
        title: 'Canon EOS R50 — Giá từ 17.500.000đ',
        subtitle: 'APS-C 24.2MP, DIGIC X, 4.503 điểm AF, quay 4K 30p. Trả góp 0% — Tặng thẻ nhớ 32GB.',
        image: '/images/p-canon-r50-1.jpg',
        imageAlt: 'Máy ảnh Canon EOS R50 Black kèm Lens RF-S 18-45mm',
        primaryCta: { label: 'Mua ngay', href: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845' },
      },
      {
        eyebrow: 'Sony Alpha',
        title: 'Sony A7 IV + Kit FE 24-70 GM II',
        subtitle: 'Body 47.5tr — Kit 86.5tr. Full-frame 33MP, 759 điểm AF, quay 4K UHD.',
        image: '/images/p-sony-a7iv-1.jpg',
        imageAlt: 'Sony Alpha A7 Mark IV Body Only',
        primaryCta: { label: 'Xem chi tiết', href: '/san-pham/may-anh-sony-alpha-a7-mark-iv-body-only' },
      },
    ],
    miniBanners: [
      { title: 'Canon EOS R6 Mark III', image: '/images/banner-camera.png', href: '/danh-muc/may-anh' },
      { title: 'Nikon Z6 Mark III', image: '/images/banner-z6iii.jpg', href: '/danh-muc/may-anh' },
    ],
  },
  {
    categorySlug: 'ong-kinh',
    eyebrow: 'Ống kính chính hãng',
    title: 'Ống kính cho mọi hệ ngàm',
    icon: Aperture,
    adSlides: [
      {
        eyebrow: 'L-Series & G Master',
        title: 'Canon RF 70-200mm f/2.8L IS — 50.600.000đ',
        subtitle: 'Tele zoom L-series nhỏ gọn, chống rung 5 stops, lý tưởng chân dung và sự kiện.',
        image: '/images/p-canon-rf70200.jpg',
        imageAlt: 'Ống kính Canon RF 70-200mm f/2.8L IS USM',
        primaryCta: { label: 'Xem ống kính', href: '/danh-muc/ong-kinh' },
        secondaryCta: { label: 'Kiểm tra ngàm', href: '/kiem-tra-ong-kinh' },
      },
    ],
    miniBanners: [
      { title: 'Khuyến mãi ống kính Sony', image: '/images/banner-lens.png', href: '/danh-muc/ong-kinh' },
    ],
  },
  {
    categorySlug: 'may-quay-phim',
    eyebrow: 'Cinema Line',
    title: 'Máy quay phim chuyên nghiệp',
    icon: Video,
    adSlides: [
      {
        eyebrow: 'Cinema',
        title: 'Sony FX30 Cinema Line',
        subtitle: 'APS-C 26MP, quay 4K 120p 10-bit 4:2:2, S-Log3/S-Cinetone, kèm XLR Handle.',
        image: '/images/p-sony-a7iv-1.jpg',
        imageAlt: 'Sony FX30 Cinema Line',
        primaryCta: { label: 'Xem máy quay', href: '/danh-muc/may-quay-phim' },
      },
    ],
    miniBanners: [
      { title: 'Setup phòng Studio', image: '/images/banner-video.png', href: '/setup-studio' },
    ],
  },
  {
    categorySlug: 'flycam',
    eyebrow: 'DJI chính hãng',
    title: 'Flycam — Quay phim trên không',
    icon: Drone,
    adSlides: [
      {
        eyebrow: 'Dưới 249g',
        title: 'DJI Mini 4 Pro Fly More Combo',
        subtitle: 'Cảm biến tránh vật cản đa hướng, 4K/60fps HDR, bay 34 phút. Không cần đăng ký bay.',
        image: '/images/p-dji-mini4pro.jpg',
        imageAlt: 'DJI Mini 4 Pro Fly More Combo Plus DJI RC 2',
        primaryCta: { label: 'Xem flycam', href: '/danh-muc/flycam' },
      },
    ],
    miniBanners: [
      { title: 'DJI Mavic Series', image: '/images/banner-flycam-large.jpg', href: '/danh-muc/flycam' },
      { title: 'DJI Neo 135g', image: '/images/p-dji-neo.jpg', href: '/danh-muc/flycam' },
    ],
  },
] as const

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col gap-16 pb-20 lg:gap-20">
        <HeroSection />

        {/* Brand strip */}
        <BrandStrip />

        {/* Category tiles */}
        <section aria-label="Danh mục nổi bật" className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.slug}
                href={`/danh-muc/${cat.slug}`}
                className="shine group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary/50 hover:brand-glow"
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

        {/* Per product-line sections, each with its own ad banner slide + mini banner carousel */}
        {productLines.map((line) => (
          <ProductLineSection
            key={line.categorySlug}
            categorySlug={line.categorySlug}
            eyebrow={line.eyebrow}
            title={line.title}
            icon={line.icon}
            adSlides={[...line.adSlides]}
            miniBanners={[...line.miniBanners]}
          />
        ))}

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

        {/* YouTube reviews — giống mẫu mayanhvietnam.com */}
        <YouTubeReviews />

        {/* Short video — TikTok @mayanhvietnam */}
        <YouTubeShorts />

        {/* Tại sao chọn chúng tôi */}
        <section aria-label="Tại sao chọn mayanhvietnam" className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card/80 to-card p-8 sm:p-10">
            <div className="mb-8 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-primary" />
              <h2 className="text-xl font-bold sm:text-2xl">Tại sao chọn mayanhvietnam.com?</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {[
                { icon: '🛡️', title: '100% Chính hãng', desc: 'Cam kết chính hãng, có hóa đơn VAT và bảo hành toàn quốc.' },
                { icon: '🎯', title: 'Tư vấn chuyên sâu', desc: 'Đội ngũ nhiếp ảnh gia kinh nghiệm tư vấn free.' },
                { icon: '🚚', title: 'Giao hàng nhanh', desc: 'Freeship đơn từ 5 triệu, đổi trả 7 ngày.' },
                { icon: '💳', title: 'Trả góp linh hoạt', desc: '0% lãi suất qua thẻ tín dụng, thủ tục nhanh gọn.' },
              ].map((f) => (
                <div key={f.title} className="flex flex-col items-center text-center">
                  <span className="mb-3 text-3xl">{f.icon}</span>
                  <h3 className="mb-1.5 text-sm font-bold">{f.title}</h3>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bộ Công Thương */}
        <section aria-label="Bộ Công Thương" className="mx-auto w-full max-w-7xl px-4 pb-10 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:p-8">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src="https://mayanhvietnam.com/asset/imgs/icon/logoBCT.png"
                  alt="Bộ Công Thương"
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="text-sm font-bold">Đã đăng ký Bộ Công Thương</p>
                <p className="text-[11px] text-muted-foreground">Website TMĐT chính thức · Giao dịch an toàn</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['VISA', 'MASTERCARD', 'JCB', 'NAPAS', 'MOMO', 'Home PayLater'].map((p) => (
                <div
                  key={p}
                  className="flex h-9 w-14 items-center justify-center rounded-lg border border-border bg-background text-[10px] font-bold text-muted-foreground"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  )
}
