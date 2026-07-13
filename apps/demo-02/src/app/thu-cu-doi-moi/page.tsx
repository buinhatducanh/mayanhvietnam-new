import type { Metadata } from 'next'
import { BadgeCheck, Banknote, ClipboardCheck, Truck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TradeInForm } from '@/components/trade-in-form'

export const metadata: Metadata = {
  title: 'Thu cũ đổi mới - Định giá minh bạch | Mayanhvietnam',
  description:
    'Gửi yêu cầu định giá máy ảnh, ống kính và thiết bị cũ. Thu mua giá tốt, định giá minh bạch, hỗ trợ lên đời thiết bị tiết kiệm chi phí.',
}

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Gửi thông tin thiết bị',
    description: 'Điền form với model và tình trạng thiết bị của bạn.',
  },
  {
    icon: BadgeCheck,
    title: 'Nhận định giá trong 2 giờ',
    description: 'Chuyên viên liên hệ xác nhận và báo giá minh bạch.',
  },
  {
    icon: Truck,
    title: 'Kiểm tra thiết bị',
    description: 'Mang đến cửa hàng hoặc gửi chuyển phát có bảo hiểm.',
  },
  {
    icon: Banknote,
    title: 'Nhận tiền hoặc lên đời',
    description: 'Thanh toán ngay hoặc trừ thẳng vào giá thiết bị mới.',
  },
]

export default function TradeInPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12 lg:px-8">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Thu cũ đổi mới
          </p>
          <h1 className="mt-2 text-3xl font-bold text-balance sm:text-4xl">
            Lên đời thiết bị, tiết kiệm chi phí
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Định giá minh bạch theo thị trường, thanh toán nhanh chóng. Trừ thẳng giá trị thiết bị
            cũ vào hoá đơn khi bạn mua thiết bị mới tại Mayanhvietnam.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          {/* Steps */}
          <ol className="flex flex-col gap-4" aria-label="Quy trình thu cũ đổi mới">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="animate-rise-in flex gap-4 rounded-2xl border border-border bg-card p-5"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <step.icon className="size-5 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <span className="font-mono text-xs text-primary">0{i + 1}</span>
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Form */}
          <div>
            <TradeInForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
