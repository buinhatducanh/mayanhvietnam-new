import Link from 'next/link'
import { ArrowRight, Crown, Percent, RefreshCcw } from 'lucide-react'

// Real promotions from mayanhvietnam.com
const promos = [
  {
    icon: Percent,
    label: 'Sản phẩm khuyến mãi',
    title: 'Flash Sale',
    desc: 'Nhiều sản phẩm giảm giá sốc — Camera, ống kính, phụ kiện chính hãng.',
    cta: 'Xem ngay',
    href: '/danh-muc/san-pham-khuyen-mai',
  },
  {
    icon: Crown,
    label: 'Sản phẩm cũ giá tốt',
    title: 'Like New 99%',
    desc: 'Máy ảnh đã qua sử dụng, ngoại hình đẹp, bảo hành 6 tháng tại Mayanhvietnam.',
    cta: 'Khám phá',
    href: '/danh-muc/san-pham-cu',
  },
  {
    icon: RefreshCcw,
    label: 'Thu cũ đổi mới',
    title: 'Lên đời thiết bị',
    desc: 'Định giá minh bạch, thu máy cũ giá tốt — áp dụng cho toàn bộ sản phẩm.',
    cta: 'Định giá ngay',
    href: '/thu-cu-doi-moi',
  },
]

export function PromoCards() {
  return (
    <section aria-label="Chương trình ưu đãi" className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {promos.map((promo, i) => (
          <div
            key={promo.label}
            className={`animate-rise-in delay-${(i + 1) * 100} group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:brand-glow`}
          >
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20"
            />
            <div className="relative">
              <div className="flex items-center gap-2">
                <promo.icon className="size-4 text-primary" aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {promo.label}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-bold">{promo.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{promo.desc}</p>
              <Link
                href={promo.href}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:text-accent"
              >
                {promo.cta}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
