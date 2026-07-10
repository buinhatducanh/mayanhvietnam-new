import type { Metadata } from 'next'
import { BadgeCheck, Banknote, ClipboardCheck, RefreshCcw } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TradeInForm } from '@/components/trade-in-form'

export const metadata: Metadata = {
  title: 'Thu cũ đổi mới — Mayanhvietnam',
  description:
    'Bán lại máy ảnh, ống kính, flycam cũ với giá tốt nhất thị trường. Định giá miễn phí trong 2 giờ, thanh toán ngay khi giao dịch tại Mayanhvietnam.',
}

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Gửi thông tin thiết bị',
    description: 'Điền form với model, tình trạng và mô tả thiết bị bạn muốn bán lại.',
  },
  {
    icon: BadgeCheck,
    title: 'Nhận định giá trong 2 giờ',
    description: 'Chuyên viên của chúng tôi liên hệ báo giá sơ bộ dựa trên thị trường thực tế.',
  },
  {
    icon: RefreshCcw,
    title: 'Kiểm tra tại cửa hàng',
    description: 'Mang thiết bị đến chi nhánh gần nhất để kiểm tra và chốt giá cuối cùng.',
  },
  {
    icon: Banknote,
    title: 'Nhận tiền ngay',
    description: 'Thanh toán chuyển khoản hoặc tiền mặt ngay khi hoàn tất, hoặc trừ vào máy mới.',
  },
]

export default function TradeInPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 lg:px-8">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Thu cũ đổi mới
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
            Bán lại thiết bị cũ, lên đời máy mới
          </h1>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
            Mayanhvietnam thu mua máy ảnh, ống kính, flycam và thiết bị studio đã qua sử dụng với
            giá cạnh tranh nhất thị trường. Trừ thẳng giá trị vào máy mới nếu bạn muốn lên đời.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {/* Steps */}
          <ol className="flex flex-col gap-4" aria-label="Quy trình thu cũ">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <step.icon className="size-5 text-primary" aria-hidden="true" />
                </span>
                <span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">0{i + 1}</span>
                    <span className="text-sm font-semibold">{step.title}</span>
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          {/* Form */}
          <TradeInForm />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
