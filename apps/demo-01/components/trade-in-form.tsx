'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { HOTLINE } from '@/lib/products'

const gearTypes = ['Máy ảnh', 'Ống kính', 'Flycam', 'Action camera', 'Máy quay phim', 'Thiết bị studio', 'Khác']
const conditions = [
  { value: 'like-new', label: 'Như mới (99%)' },
  { value: 'good', label: 'Đẹp (95-98%)' },
  { value: 'fair', label: 'Trầy xước nhẹ (90-95%)' },
  { value: 'worn', label: 'Đã dùng nhiều (dưới 90%)' },
]

export function TradeInForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  if (submitted) {
    return (
      <div className="animate-rise-in flex flex-col items-center gap-4 rounded-3xl border border-emerald-400/40 bg-emerald-400/10 p-10 text-center">
        <CheckCircle2 className="size-12 text-emerald-400" aria-hidden="true" />
        <h2 className="text-xl font-bold">Đã nhận yêu cầu thu cũ!</h2>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          {`Cảm ơn bạn đã gửi thông tin. Chuyên viên định giá của Mayanhvietnam sẽ liên hệ trong vòng 2 giờ làm việc. Cần hỗ trợ gấp? Gọi ngay hotline ${HOTLINE}.`}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 rounded-full border border-border px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Họ và tên
          <input
            type="text"
            name="name"
            required
            placeholder="Nguyễn Văn A"
            className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Số điện thoại
          <input
            type="tel"
            name="phone"
            required
            placeholder="09xx xxx xxx"
            className="rounded-xl border border-border bg-secondary px-4 py-3 font-mono text-sm font-normal normal-case tracking-normal text-foreground outline-none placeholder:font-sans placeholder:text-muted-foreground focus:border-primary"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Loại thiết bị
          <select
            name="gearType"
            required
            defaultValue=""
            className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
          >
            <option value="" disabled>
              Chọn loại thiết bị
            </option>
            {gearTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Tình trạng
          <select
            name="condition"
            required
            defaultValue=""
            className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
          >
            <option value="" disabled>
              Chọn tình trạng
            </option>
            {conditions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Tên thiết bị / Model
        <input
          type="text"
          name="model"
          required
          placeholder="VD: Sony A7 III, Canon RF 50mm f/1.8..."
          className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />
      </label>

      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Mô tả thêm (tùy chọn)
        <textarea
          name="notes"
          rows={4}
          placeholder="Shutter count, phụ kiện kèm theo, hóa đơn, thời gian bảo hành còn lại..."
          className="resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-normal normal-case leading-relaxed tracking-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="brand-glow-strong mt-2 flex items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Đang gửi...
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Gửi yêu cầu định giá
          </>
        )}
      </button>
    </form>
  )
}
