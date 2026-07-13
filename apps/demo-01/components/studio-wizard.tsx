'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Lightbulb,
  Mic,
  MonitorPlay,
  Package,
  Phone,
  RotateCcw,
  Sparkles,
  Video,
} from 'lucide-react'
import { HOTLINE, formatVND } from '@/lib/products'

type Purpose = 'photo' | 'video' | 'livestream'
type RoomSize = 'small' | 'medium' | 'large'
type Budget = 'entry' | 'mid' | 'pro'

interface SetupItem {
  name: string
  role: string
  price: number
  icon: typeof Camera
}

const purposeOptions: { value: Purpose; label: string; description: string; icon: typeof Camera }[] = [
  { value: 'photo', label: 'Chụp ảnh sản phẩm / chân dung', description: 'Studio ảnh tĩnh với ánh sáng flash và phông nền', icon: Camera },
  { value: 'video', label: 'Quay video / phim ngắn', description: 'Setup quay với đèn LED liên tục và thu âm', icon: Video },
  { value: 'livestream', label: 'Livestream / bán hàng online', description: 'Góc live ổn định, ánh sáng đẹp, âm thanh rõ', icon: MonitorPlay },
]

const roomOptions: { value: RoomSize; label: string; description: string }[] = [
  { value: 'small', label: 'Nhỏ (dưới 10m²)', description: 'Góc phòng, phòng ngủ tận dụng' },
  { value: 'medium', label: 'Vừa (10 - 25m²)', description: 'Phòng riêng chuyên dụng' },
  { value: 'large', label: 'Lớn (trên 25m²)', description: 'Studio chuyên nghiệp, trần cao' },
]

const budgetOptions: { value: Budget; label: string; description: string }[] = [
  { value: 'entry', label: 'Dưới 20 triệu', description: 'Bắt đầu tiết kiệm, nâng cấp dần' },
  { value: 'mid', label: '20 - 60 triệu', description: 'Cân bằng chất lượng và chi phí' },
  { value: 'pro', label: 'Trên 60 triệu', description: 'Chuyên nghiệp, đầu tư dài hạn' },
]

function buildRecommendation(purpose: Purpose, room: RoomSize, budget: Budget): SetupItem[] {
  const items: SetupItem[] = []

  // Camera
  if (budget === 'entry') {
    items.push({ name: 'Canon EOS R50 + Kit RF-S 18-45mm', role: 'Máy ảnh chính', price: 17990000, icon: Camera })
  } else if (budget === 'mid') {
    items.push({ name: 'Fujifilm X-T5 + XF 16-80mm f/4', role: 'Máy ảnh chính', price: 48990000, icon: Camera })
  } else {
    items.push(
      purpose === 'photo'
        ? { name: 'Canon EOS R6 Mark II + RF 24-105mm f/4L', role: 'Máy ảnh chính', price: 75900000, icon: Camera }
        : { name: 'Sony FX30 Cinema Line + XLR Handle', role: 'Máy quay chính', price: 43990000, icon: Video },
    )
  }

  // Lighting
  if (purpose === 'photo') {
    items.push({
      name: budget === 'entry' ? 'Godox SK400II (bộ 2 đèn flash studio)' : 'Godox AD600Pro + Softbox 120cm',
      role: 'Ánh sáng',
      price: budget === 'entry' ? 5990000 : 21990000,
      icon: Lightbulb,
    })
  } else {
    items.push({
      name: budget === 'pro' ? 'Godox SL150W III x2 + Softbox Parabolic' : 'Godox SL60W + Softbox Grid',
      role: 'Ánh sáng liên tục',
      price: budget === 'pro' ? 12980000 : 3490000,
      icon: Lightbulb,
    })
  }

  // Audio for video/livestream
  if (purpose === 'video') {
    items.push({
      name: budget === 'entry' ? 'Rode VideoMicro II' : 'Rode Wireless GO II (2 người)',
      role: 'Thu âm',
      price: budget === 'entry' ? 1990000 : 7490000,
      icon: Mic,
    })
  }
  if (purpose === 'livestream') {
    items.push({ name: 'Rode NT-USB Mini + Arm treo bàn', role: 'Thu âm', price: 3290000, icon: Mic })
    items.push({ name: 'Elgato Cam Link 4K (capture card)', role: 'Kết nối máy tính', price: 3190000, icon: MonitorPlay })
  }

  // Room-based accessories
  if (room === 'small') {
    items.push({ name: 'Phông nền giấy 1.36m + khung treo tường', role: 'Phông nền', price: 1590000, icon: Package })
  } else if (room === 'medium') {
    items.push({ name: 'Phông nền giấy 2.72m + khung chữ T', role: 'Phông nền', price: 2890000, icon: Package })
  } else {
    items.push({ name: 'Hệ phông 3 cuộn điều khiển điện + C-Stand x2', role: 'Phông nền & giá đỡ', price: 8990000, icon: Package })
  }

  return items
}

const steps = ['Mục đích', 'Diện tích phòng', 'Ngân sách', 'Kết quả']

export function StudioWizard() {
  const [step, setStep] = useState(0)
  const [purpose, setPurpose] = useState<Purpose | null>(null)
  const [room, setRoom] = useState<RoomSize | null>(null)
  const [budget, setBudget] = useState<Budget | null>(null)

  const canContinue =
    (step === 0 && purpose !== null) || (step === 1 && room !== null) || (step === 2 && budget !== null)

  const recommendation =
    purpose && room && budget && step === 3 ? buildRecommendation(purpose, room, budget) : []
  const total = recommendation.reduce((sum, item) => sum + item.price, 0)

  const restart = () => {
    setStep(0)
    setPurpose(null)
    setRoom(null)
    setBudget(null)
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <ol className="mb-10 flex items-center gap-2" aria-label="Tiến trình">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col gap-2">
            <span
              className={`h-1 rounded-full transition-colors duration-500 ${
                i <= step ? 'bg-primary' : 'bg-secondary'
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest ${
                i <= step ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className="animate-rise-in">
          <legend className="mb-5 text-xl font-bold">Bạn setup studio để làm gì?</legend>
          <div className="flex flex-col gap-3">
            {purposeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={purpose === opt.value}
                onClick={() => setPurpose(opt.value)}
                className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
                  purpose === opt.value
                    ? 'brand-glow border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <opt.icon className="size-5 text-primary" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{opt.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {opt.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="animate-rise-in">
          <legend className="mb-5 text-xl font-bold">Diện tích phòng của bạn?</legend>
          <div className="flex flex-col gap-3">
            {roomOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={room === opt.value}
                onClick={() => setRoom(opt.value)}
                className={`flex items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-all ${
                  room === opt.value
                    ? 'brand-glow border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold">{opt.label}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{opt.description}</span>
                </span>
                {room === opt.value && <Check className="size-5 shrink-0 text-primary" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="animate-rise-in">
          <legend className="mb-5 text-xl font-bold">Ngân sách dự kiến?</legend>
          <div className="flex flex-col gap-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={budget === opt.value}
                onClick={() => setBudget(opt.value)}
                className={`flex items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-all ${
                  budget === opt.value
                    ? 'brand-glow border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <span>
                  <span className="block font-mono text-sm font-semibold">{opt.label}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{opt.description}</span>
                </span>
                {budget === opt.value && <Check className="size-5 shrink-0 text-primary" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <section aria-labelledby="result-heading" className="animate-rise-in">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
            Gợi ý cấu hình dành cho bạn
          </p>
          <h2 id="result-heading" className="mt-2 text-xl font-bold">
            {purposeOptions.find((p) => p.value === purpose)?.label}
          </h2>

          <ul className="mt-6 flex flex-col gap-3">
            {recommendation.map((item, i) => (
              <li
                key={item.name}
                style={{ animationDelay: `${i * 100}ms` }}
                className="animate-rise-in flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <item.icon className="size-5 text-primary" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold leading-snug">{item.name}</span>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {item.role}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-sm font-semibold text-primary">
                  {formatVND(item.price)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-primary/25 bg-primary/5 p-5">
            <span className="text-sm font-semibold uppercase tracking-widest">Tổng dự kiến</span>
            <span className="font-mono text-2xl font-bold text-primary text-glow">
              {formatVND(total)}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${HOTLINE.replace(/\./g, '')}`}
              className="brand-glow-strong flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110"
            >
              <Phone className="size-4" aria-hidden="true" />
              {'Tư vấn ngay '}{HOTLINE}
            </a>
            <Link
              href="/danh-muc/thiet-bi-studio"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Xem thiết bị studio
            </Link>
          </div>

          <button
            type="button"
            onClick={restart}
            className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Làm lại từ đầu
          </button>
        </section>
      )}

      {/* Navigation */}
      {step < 3 && (
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Quay lại
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canContinue}
            className="brand-glow flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
          >
            {step === 2 ? 'Xem kết quả' : 'Tiếp tục'}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
