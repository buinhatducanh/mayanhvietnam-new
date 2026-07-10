import Link from 'next/link'
import { ArrowRight, Crown, Percent, RefreshCcw } from 'lucide-react'

const promos = [
  {
    icon: Crown,
    label: 'Ưu đãi thành viên',
    title: 'Giảm đến 10%',
    desc: 'Dành riêng cho thành viên',
    cta: 'Đăng ký ngay',
    href: '/',
  },
  {
    icon: Percent,
    label: 'Trả góp 0%',
    title: 'Lãi suất 0%',
    desc: 'Dễ dàng trả góp qua thẻ tín dụng',
    cta: 'Xem chi tiết',
    href: '/',
  },
  {
    icon: RefreshCcw,
    label: 'Thu cũ đổi mới',
    title: 'Lên đời thiết bị',
    desc: 'Tiết kiệm chi phí, định giá minh bạch',
    cta: 'Xem chi tiết',
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
