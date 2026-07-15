'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Gift, Lightbulb, Newspaper } from 'lucide-react'

const perks = [
  { icon: Gift, title: 'Ưu đãi độc quyền', desc: 'Dành riêng cho bạn' },
  { icon: Newspaper, title: 'Thông tin sản phẩm mới', desc: 'Cập nhật sớm nhất' },
  { icon: Lightbulb, title: 'Mẹo & hướng dẫn', desc: 'Từ chuyên gia' },
]

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-primary/10 blur-[100px]"
        />
        <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-8 lg:grid-cols-2 lg:p-12">
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl sm:min-h-[320px]">
            <img
              src="/images/about-photographer.png"
              alt="Nhiếp ảnh gia với máy ảnh trên chân máy lúc hoàng hôn"
              className="absolute inset-0 size-full object-cover opacity-50"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-card via-card/70 to-transparent"
            />
            <div className="relative p-5 sm:p-6 lg:p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Về Mayanhvietnam
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight">
              Đồng hành cùng đam mê
              <br />
              Nâng tầm sáng tạo
            </h2>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Chúng tôi không chỉ cung cấp thiết bị, chúng tôi mang đến giải pháp toàn diện cho
              những người đam mê nhiếp ảnh và sáng tạo nội dung.
            </p>
            <Link
              href="/danh-muc/may-anh"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              Tìm hiểu thêm
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/50 p-6 lg:p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Đăng ký nhận tin
            </span>
            <h3 className="mt-2 text-xl font-bold">{'Nhận thông tin & ưu đãi mới nhất'}</h3>
            {submitted ? (
              <p className="mt-5 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-medium text-primary">
                <Check className="size-4" aria-hidden="true" />
                Cảm ơn bạn đã đăng ký nhận tin!
              </p>
            ) : (
              <form
                className="mt-5 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.trim()) setSubmitted(true)
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  aria-label="Địa chỉ email"
                  className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
                <button
                  type="submit"
                  className="brand-glow rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                >
                  Đăng ký
                </button>
              </form>
            )}
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {perks.map((perk) => (
                <li key={perk.title} className="flex items-start gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                    <perk.icon className="size-4 text-primary" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs font-medium leading-snug">{perk.title}</span>
                    <span className="text-[11px] text-muted-foreground">{perk.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
