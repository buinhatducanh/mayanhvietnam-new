import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Headset, ShieldCheck, Truck } from 'lucide-react'

const trustItems = [
  { icon: BadgeCheck, title: 'Hàng chính hãng', desc: '100%' },
  { icon: ShieldCheck, title: 'Bảo hành toàn quốc', desc: '12 - 24 tháng' },
  { icon: Truck, title: 'Giao hàng nhanh', desc: 'Toàn quốc' },
  { icon: Headset, title: 'Hỗ trợ kỹ thuật', desc: '24/7' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="animate-pulse-ring pointer-events-none absolute -right-40 top-0 size-[600px] rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-20">
        <div className="animate-rise-in order-2 lg:order-1">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Khám phá công nghệ
          </span>
          <h1 className="mt-6 text-balance text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Bắt trọn khoảnh khắc
            <span className="text-glow block text-primary">Dẫn đầu công nghệ</span>
          </h1>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Cung cấp thiết bị máy ảnh, ống kính và phụ kiện chính hãng với chất lượng và dịch vụ
            tốt nhất tại Việt Nam.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/danh-muc/may-anh"
              className="brand-glow-strong group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 sm:px-7 sm:py-3.5"
            >
              Khám phá ngay
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/danh-muc/ong-kinh"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary sm:px-7 sm:py-3.5"
            >
              Xem sản phẩm
            </Link>
          </div>
        </div>

        <div className="animate-rise-in delay-200 relative order-1 lg:order-2">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 bottom-4 h-8 rounded-[50%] bg-primary/30 blur-2xl"
          />
          <div className="animate-float-slow relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl sm:max-w-lg lg:aspect-square">
            <Image
              src="https://mayanhvietnam.com/asset/imgs/img/tet/banner_tet_01.png"
              alt="Máy ảnh mirrorless full-frame trên bục trưng bày phát sáng"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Trust bar spanning hero bottom */}
      <div className="mx-auto max-w-7xl px-4 pb-10 lg:px-8">
        <ul className="animate-rise-in delay-300 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-surface p-4 backdrop-blur-sm sm:gap-4 sm:p-5 lg:grid-cols-4">
          {trustItems.map((item) => (
            <li key={item.title} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                <item.icon className="size-4 text-primary" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-semibold">{item.title}</span>
                <span className="text-[11px] text-muted-foreground">{item.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
