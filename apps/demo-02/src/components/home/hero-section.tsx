import { BadgeCheck, ShieldCheck, Truck } from 'lucide-react'
import { BannerSlider, type BannerSlide } from '@/components/banner-slider'

const trustItems = [
  { icon: BadgeCheck, title: 'Hàng chính hãng', desc: '100%' },
  { icon: ShieldCheck, title: 'Bảo hành toàn quốc', desc: '12 - 24 tháng' },
  { icon: Truck, title: 'Giao hàng nhanh', desc: 'Toàn quốc' },
]

const heroSlides: BannerSlide[] = [
  {
    eyebrow: 'Khám phá công nghệ',
    title: 'Bắt trọn khoảnh khắc',
    highlight: 'Dẫn đầu công nghệ',
    subtitle:
      'Cung cấp thiết bị máy ảnh, ống kính và phụ kiện chính hãng với chất lượng và dịch vụ tốt nhất tại Việt Nam.',
    image: '/images/banner-camera.png',
    imageAlt: 'Máy ảnh mirrorless full-frame trên bục trưng bày phát sáng xanh',
    primaryCta: { label: 'Khám phá ngay', href: '/danh-muc/may-anh' },
    secondaryCta: { label: 'Xem sản phẩm', href: '/danh-muc/ong-kinh' },
  },
  {
    eyebrow: 'Ống kính G Master & L-Series',
    title: 'Đỉnh cao quang học',
    highlight: 'Sắc nét từng chi tiết',
    subtitle:
      'Bộ sưu tập ống kính cao cấp cho mọi hệ ngàm — Canon RF, Sony E, Fujifilm X, Nikon Z chính hãng.',
    image: '/images/banner-lens.png',
    imageAlt: 'Ống kính zoom cao cấp phát sáng viền xanh trên nền tối',
    primaryCta: { label: 'Xem ống kính', href: '/danh-muc/ong-kinh' },
    secondaryCta: { label: 'Kiểm tra tương thích', href: '/kiem-tra-ong-kinh' },
  },
  {
    eyebrow: 'Studio & Cinema',
    title: 'Nâng tầm sản xuất',
    highlight: 'Chuẩn điện ảnh',
    subtitle:
      'Máy quay Cinema Line, đèn LED và giải pháp setup phòng studio trọn gói cho nhà sáng tạo nội dung.',
    image: '/images/hero-slide-studio.png',
    imageAlt: 'Phòng studio với đèn softbox phát sáng xanh',
    primaryCta: { label: 'Setup studio', href: '/setup-studio' },
    secondaryCta: { label: 'Máy quay phim', href: '/danh-muc/may-quay-phim' },
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
