import { BadgeCheck, CreditCard, ShieldCheck, Truck } from 'lucide-react'
import { BannerSlider, type BannerSlide } from '@/components/banner-slider'

// Trust badges from mayanhvietnam.com homepage
const trustItems = [
  { icon: Truck, title: 'Giao hàng Toàn quốc', desc: 'Miễn phí ship đơn từ 2tr' },
  { icon: BadgeCheck, title: 'Sản phẩm Chính hãng', desc: '100% chính hãng' },
  { icon: ShieldCheck, title: 'Bảo hành Lâu dài', desc: '12 - 24 tháng' },
  { icon: CreditCard, title: 'Thanh toán Đa dạng', desc: 'VISA / MC / MoMo / Trả góp' },
]

// Real product images from mayanhvietnam.com (500px product photos)
const heroSlides: BannerSlide[] = [
  {
    eyebrow: 'Máy ảnh Canon chính hãng',
    title: 'Canon EOS R50 Black',
    highlight: '17.500.000đ',
    subtitle:
      'Máy ảnh APS-C 24.2MP, DIGIC X, Dual Pixel AF II 4.503 điểm, quay 4K 30p. Nhỏ gọn 375g — lý tưởng cho người mới bắt đầu.',
    image: '/images/p-canon-r50-1.jpg',
    imageAlt: 'Máy ảnh Canon EOS R50 Black kèm Lens RF-S 18-45mm Chính Hãng',
    primaryCta: { label: 'Mua ngay', href: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845' },
    secondaryCta: { label: 'Xem tất cả máy ảnh', href: '/danh-muc/may-anh' },
  },
  {
    eyebrow: 'Sony Alpha — Chuyên nghiệp',
    title: 'Sony Alpha A7 Mark IV',
    highlight: '47.500.000đ',
    subtitle:
      'Full-frame 33MP, 759 điểm AF pha, quay UHD 4K, dual card slot. Body + Kit FE 24-70mm F2.8 GM II từ 86.500.000đ.',
    image: '/images/p-sony-a7iv-1.jpg',
    imageAlt: 'Máy ảnh Sony Alpha A7 Mark IV Body Only Chính hãng',
    primaryCta: { label: 'Xem chi tiết', href: '/san-pham/may-anh-sony-alpha-a7-mark-iv-body-only' },
    secondaryCta: { label: 'Xem ống kính Sony', href: '/danh-muc/ong-kinh' },
  },
  {
    eyebrow: 'Canon EOS R8 — Full-frame nhẹ',
    title: 'Canon EOS R8 Body Only',
    highlight: '26.900.000đ',
    subtitle:
      'Full-frame 24.2MP, DIGIC X, chụp liên tiếp 40fps, quay 4K 60p. Body nhẹ 461g — lý tưởng cho nhiếp ảnh và video.',
    image: '/images/p-canon-r8.jpg',
    imageAlt: 'Máy ảnh Canon EOS R8 Body Only Chính hãng',
    primaryCta: { label: 'Đặt hàng', href: '/san-pham/may-anh-canon-eos-r8-body-only' },
    secondaryCta: { label: 'Xem tất cả Canon', href: '/danh-muc/may-anh' },
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
