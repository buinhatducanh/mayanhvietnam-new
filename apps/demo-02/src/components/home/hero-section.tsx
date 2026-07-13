import { BadgeCheck, CreditCard, ShieldCheck, Truck } from 'lucide-react'
import { BannerSlider, type BannerSlide } from '@/components/banner-slider'

const CDN = 'https://mayanhvietnam.com'

// Trust badges from mayanhvietnam.com homepage
const trustItems = [
  { icon: Truck, title: 'Giao hàng Toàn quốc', desc: 'Miễn phí ship đơn từ 2tr' },
  { icon: BadgeCheck, title: 'Sản phẩm Chính hãng', desc: '100% chính hãng' },
  { icon: ShieldCheck, title: 'Bảo hành Lâu dài', desc: '12 - 24 tháng' },
  { icon: CreditCard, title: 'Thanh toán Đa dạng', desc: 'VISA / MC / MoMo / Trả góp' },
]

// CDN banner images — đúng mayanhvietnam.com homepage carousel
const heroSlides: BannerSlide[] = [
  {
    eyebrow: 'Mới ra mắt',
    title: 'Canon EOS R6 Mark III',
    subtitle: 'Full-frame 24.2MP · IBIS 5 trục · 4K 60p 10-bit — đỉnh cao mirrorless phổ thông.',
    image: `${CDN}/asset/imgs/img/banner/canon-r6-mark-III.webp`,
    imageAlt: 'Canon EOS R6 Mark III Chính hãng',
    primaryCta: { label: 'Xem chi tiết', href: '/san-pham/may-anh-canon-eos-r6-mark-iii-body_may-anh-mirrorless-250315190440715' },
    secondaryCta: { label: 'Xem tất cả máy ảnh', href: '/danh-muc/may-anh' },
  },
  {
    eyebrow: 'Flagship 2026',
    title: 'Sony Alpha A7R VI',
    subtitle: '61MP BSI CMOS · AI Processing Unit · 8K Video · IBIS 8-stop — flagship cho nhiếp ảnh gia.',
    image: `${CDN}/asset/imgs/img/banner/sony-a7r-vi-1.webp`,
    imageAlt: 'Sony Alpha A7R VI Chính hãng',
    primaryCta: { label: 'Đặt hàng', href: '/san-pham/may-anh-sony-alpha-a7r-vi_may-anh-mirrorless-260328143107303' },
    secondaryCta: { label: 'Xem tất cả Sony', href: '/danh-muc/may-anh' },
  },
  {
    eyebrow: 'Ưu đãi đặc biệt',
    title: 'Sony Alpha A7 Mark V (A7M5)',
    subtitle: '33MP Full-frame · AI AF thế hệ mới · 4K 120p · 2 khe CFexpress Type A.',
    image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`,
    imageAlt: 'Sony Alpha A7 Mark V Chính hãng',
    primaryCta: { label: 'Mua ngay', href: '/san-pham/may-anh-sony-a7-mark-v-a7m5-chinh-hang_may-anh-mirrorless-251126090035598' },
    secondaryCta: { label: 'Ưu đãi Sony', href: '/danh-muc/may-anh-khuyen-mai-brd-sony' },
  },
  {
    eyebrow: 'Bán chạy nhất',
    title: 'Canon EOS R50 Black kèm Lens RF-S 18-45mm',
    subtitle: 'APS-C 24.2MP · Dual Pixel AF II 4.503 điểm · 4K 30p không crop · Chỉ 375g.',
    image: `${CDN}/asset/imgs/img/banner/canon_r50_trang_den.webp`,
    imageAlt: 'Canon EOS R50 Black kèm Lens RF-S 18-45mm Chính hãng',
    primaryCta: { label: 'Mua ngay', href: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843' },
    secondaryCta: { label: 'Xem tất cả Canon', href: '/danh-muc/may-anh' },
  },
  {
    eyebrow: 'Khuyến mãi hot',
    title: 'Ưu đãi Sony tháng này',
    subtitle: 'Trả góp 0% qua thẻ tín dụng · Tặng thẻ nhớ 64GB · Dán màn hình miễn phí.',
    image: `${CDN}/asset/imgs/img/banner/sony-uu-dai-thang-1.webp`,
    imageAlt: 'Ưu đãi Sony tháng này',
    primaryCta: { label: 'Xem ngay', href: '/danh-muc/may-anh-khuyen-mai-brd-sony' },
  },
]

export function HeroSection() {
  return (
    <section aria-label="Banner chính" className="mx-auto w-full max-w-7xl px-4 pt-6 lg:px-8">
      <BannerSlider slides={heroSlides} variant="hero" />

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {trustItems.map((item) => (
          <li
            key={item.title}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5"
          >
            <span className="flex size-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
              <item.icon className="size-5 text-primary" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">{item.title}</span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
