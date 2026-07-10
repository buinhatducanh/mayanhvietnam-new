'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Lightbulb,
  Mic,
  Phone,
  RotateCcw,
  Video,
  Wallet,
} from 'lucide-react'
import { HOTLINE } from '@/lib/products'

type Purpose = 'photo' | 'video' | 'livestream'
type Space = 'small' | 'medium' | 'large'
type Budget = 'entry' | 'mid' | 'pro'

const purposeOptions: { value: Purpose; label: string; description: string; icon: typeof Camera }[] = [
  { value: 'photo', label: 'Chụp ảnh sản phẩm / chân dung', description: 'Lookbook, ảnh sản phẩm, profile', icon: Camera },
  { value: 'video', label: 'Quay video / phim ngắn', description: 'TVC, video ca nhạc, phim ngắn', icon: Video },
  { value: 'livestream', label: 'Livestream / Podcast', description: 'Bán hàng live, talkshow, podcast', icon: Mic },
]

const spaceOptions: { value: Space; label: string; description: string }[] = [
  { value: 'small', label: 'Dưới 15m²', description: 'Phòng nhỏ, góc làm việc tại nhà' },
  { value: 'medium', label: '15 - 40m²', description: 'Phòng studio tiêu chuẩn' },
  { value: 'large', label: 'Trên 40m²', description: 'Studio chuyên nghiệp, không gian lớn' },
]

const budgetOptions: { value: Budget; label: string; description: string }[] = [
  { value: 'entry', label: 'Dưới 30 triệu', description: 'Bắt đầu tinh gọn, nâng cấp dần' },
  { value: 'mid', label: '30 - 100 triệu', description: 'Cân bằng chất lượng và chi phí' },
  { value: 'pro', label: 'Trên 100 triệu', description: 'Chuyên nghiệp, đầu tư dài hạn' },
]

interface Recommendation {
  title: string
  items: string[]
}

function buildRecommendation(purpose: Purpose, space: Space, budget: Budget): Recommendation {
  const lighting =
    purpose === 'livestream'
      ? budget === 'entry'
        ? '2x đèn LED Godox SL60W + softbox lưới tổ ong'
        : '2x Godox SL150W III + softbox parabolic 90cm, 1 đèn hair light'
      : budget === 'pro'
        ? '3x Godox SL150W III / Aputure 300X + hệ softbox và grid chuyên dụng'
        : '2x Godox SL150W III + softbox 90cm + hắt sáng'

  const camera =
    purpose === 'video'
      ? budget === 'entry'
        ? 'Sony A6700 + ống kính Sony E 16-55mm f/2.8 G'
        : 'Sony FX30 Cinema Line kèm XLR Handle + FE 24-70mm f/2.8 GM II'
      : budget === 'pro'
        ? 'Canon EOS R6 Mark II + RF 24-105mm f/4L + RF 70-200mm f/2.8L'
        : 'Fujifilm X-T5 kit XF 16-80mm f/4'

  const extras: string[] = []
  if (purpose === 'livestream') extras.push('Micro thu âm cardioid + arm treo', 'Capture card / switcher HDMI')
  if (space !== 'small') extras.push('Phông nền giấy 2.7m (3 màu) + khung treo phông')
  if (space === 'small') extras.push('Phông nền vải gấp gọn + khung mini')
  if (budget !== 'entry') extras.push('Chân đèn C-stand + tay boom chắc chắn')
  if (purpose === 'video') extras.push('Gimbal chống rung + monitor rời 5.5"')

  const titles: Record<Purpose, string> = {
    photo: 'Studio chụp ảnh',
    video: 'Studio quay video',
    livestream: 'Phòng Livestream / Podcast',
  }

  return {
    title: `${titles[purpose]} — ${spaceOptions.find((s) => s.value === space)?.label}`,
    items: [camera, lighting, ...extras],
  }
}

export function StudioWizard() {
  const [step, setStep] = useState(0)
  const [purpose, setPurpose] = useState<Purpose | null>(null)
  const [space, setSpace] = useState<Space | null>(null)
  const [budget, setBudget] = useState<Budget | null>(null)

  const canNext = (step === 0 && purpose) || (step === 1 && space) || (step === 2 && budget)
  const result = step === 3 && purpose && space && budget ? buildRecommendation(purpose, space, budget) : null

  const reset = () => {
    setStep(0)
    setPurpose(null)
    setSpace(null)
    setBudget(null)
  }

  const steps = ['Mục đích', 'Không gian', 'Ngân sách', 'Kết quả']

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <ol className="mb-8 flex items-center justify-center gap-2" aria-label="Tiến trình">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              aria-current={step === i ? 'step' : undefined}
              className={`flex size-8 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all ${
                step > i
                  ? 'border-primary bg-primary text-primary-foreground'
                  : step === i
                    ? 'brand-glow border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground'
              }`}
            >
              {step > i ? <Check className="size-4" aria-hidden="true" /> : i + 1}
            </span>
            <span
              className={`hidden text-xs sm:block ${step === i ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="h-px w-6 bg-border sm:w-10" />
            )}
          </li>
        ))}
      </ol>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        {step === 0 && (
          <fieldset className="animate-rise-in">
            <legend className="mb-1 text-xl font-bold">Bạn setup studio để làm gì?</legend>
            <p className="mb-5 text-sm text-muted-foreground">
              Chọn mục đích chính để chúng tôi gợi ý thiết bị phù hợp nhất.
            </p>
            <div className="flex flex-col gap-3">
              {purposeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={purpose === opt.value}
                  onClick={() => setPurpose(opt.value)}
                  className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                    purpose === opt.value
                      ? 'brand-glow border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                    <opt.icon className="size-5 text-primary" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{opt.label}</span>
                    <span className="block text-xs text-muted-foreground">{opt.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="animate-rise-in">
            <legend className="mb-1 text-xl font-bold">Không gian của bạn rộng bao nhiêu?</legend>
            <p className="mb-5 text-sm text-muted-foreground">
              Diện tích quyết định loại phông nền và số lượng đèn cần thiết.
            </p>
            <div className="flex flex-col gap-3">
              {spaceOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={space === opt.value}
                  onClick={() => setSpace(opt.value)}
                  className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all ${
                    space === opt.value
                      ? 'brand-glow border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold">{opt.label}</span>
                    <span className="block text-xs text-muted-foreground">{opt.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="animate-rise-in">
            <legend className="mb-1 text-xl font-bold">Ngân sách dự kiến của bạn?</legend>
            <p className="mb-5 text-sm text-muted-foreground">
              Chúng tôi sẽ tối ưu cấu hình theo mức đầu tư này.
            </p>
            <div className="flex flex-col gap-3">
              {budgetOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={budget === opt.value}
                  onClick={() => setBudget(opt.value)}
                  className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                    budget === opt.value
                      ? 'brand-glow border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                    <Wallet className="size-5 text-primary" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-mono text-sm font-semibold">{opt.label}</span>
                    <span className="block text-xs text-muted-foreground">{opt.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && result && (
          <div className="animate-rise-in" aria-live="polite">
            <div className="mb-5 flex items-center gap-3">
              <span className="brand-glow flex size-11 items-center justify-center rounded-xl bg-primary">
                <Lightbulb className="size-5 text-primary-foreground" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Gợi ý cấu hình
                </p>
                <h2 className="text-lg font-bold">{result.title}</h2>
              </div>
            </div>
            <ul className="flex flex-col gap-2.5">
              {result.items.map((item, i) => (
                <li
                  key={item}
                  className="animate-rise-in flex items-start gap-3 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${HOTLINE.replace(/\./g, '')}`}
                className="brand-glow flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110"
              >
                <Phone className="size-4" aria-hidden="true" />
                Nhận báo giá chi tiết
              </a>
              <button
                type="button"
                onClick={reset}
                className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Làm lại
              </button>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        {step < 3 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Quay lại
            </button>
            <button
              type="button"
              onClick={() => canNext && setStep((s) => s + 1)}
              disabled={!canNext}
              className="brand-glow flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 disabled:opacity-40"
            >
              {step === 2 ? 'Xem kết quả' : 'Tiếp tục'}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
