'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, RefreshCcw, Send } from 'lucide-react'

const deviceTypes = ['Máy ảnh', 'Ống kính', 'Máy quay phim', 'Flycam', 'Thiết bị studio', 'Khác']
const conditions = [
  { value: 'like-new', label: 'Like New (99%)' },
  { value: 'good', label: 'Đẹp (95-98%)' },
  { value: 'fair', label: 'Trầy xước nhẹ (90%)' },
  { value: 'worn', label: 'Đã dùng nhiều (dưới 90%)' },
]

export function TradeInForm() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    // Simulate request submission
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
    }, 900)
  }

  if (submitted) {
    return (
      <div
        className="animate-rise-in flex flex-col items-center gap-4 rounded-3xl border border-primary/50 bg-primary/10 p-10 text-center"
        aria-live="polite"
      >
        <CheckCircle2 className="size-12 text-primary" aria-hidden="true" />
        <div>
          <h2 className="text-xl font-bold">Đã nhận yêu cầu định giá!</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Chuyên viên của Mayanhvietnam sẽ liên hệ với bạn trong vòng 2 giờ làm việc để xác nhận
            tình trạng thiết bị và báo giá thu mua chính xác nhất.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="flex items-center gap-2 rounded-full border border-primary/50 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <RefreshCcw className="size-3.5" aria-hidden="true" />
          Gửi thiết bị khác
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-rise-in rounded-3xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Loại thiết bị
          <select
            name="deviceType"
            required
            className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
          >
            {deviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Tình trạng
          <select
            name="condition"
            required
            className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
          >
            {conditions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:col-span-2">
          Tên thiết bị / Model
          <input
            type="text"
            name="model"
            required
            placeholder="VD: Canon EOS R6 Mark II, Sony FE 24-70mm GM II..."
            className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:col-span-2">
          Mô tả thêm (tuỳ chọn)
          <textarea
            name="notes"
            rows={3}
            placeholder="Shutter count, phụ kiện đi kèm, hoá đơn, tình trạng bảo hành..."
            className="resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Họ và tên
          <input
            type="text"
            name="name"
            required
            placeholder="Nguyễn Văn A"
            className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Số điện thoại
          <input
            type="tel"
            name="phone"
            required
            inputMode="tel"
            pattern="[0-9. +()-]{8,15}"
            placeholder="09xx xxx xxx"
            className="rounded-xl border border-border bg-secondary px-4 py-3 font-mono text-sm font-normal normal-case tracking-normal text-foreground outline-none placeholder:font-sans placeholder:text-muted-foreground focus:border-primary"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="brand-glow mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
      >
        {sending ? (
          <>
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
            />
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
