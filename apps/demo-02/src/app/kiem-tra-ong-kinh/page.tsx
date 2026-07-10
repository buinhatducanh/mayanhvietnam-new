import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { LensChecker } from '@/components/lens-checker'

export const metadata: Metadata = {
  title: 'Kiểm tra tương thích ống kính | Mayanhvietnam',
  description:
    'Công cụ miễn phí kiểm tra ống kính có tương thích với thân máy ảnh của bạn hay không, dựa trên loại ngàm và cảm biến.',
}

export default function LensCheckerPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-12 lg:px-8">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Công cụ miễn phí
          </p>
          <h1 className="mt-2 text-3xl font-bold text-balance sm:text-4xl">
            Kiểm tra tương thích ống kính
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Chọn thân máy và ống kính để kiểm tra ngay ngàm có khớp nhau hay không trước khi quyết
            định mua — tránh mua nhầm, tiết kiệm thời gian.
          </p>
        </header>
        <LensChecker />
      </main>
      <SiteFooter />
    </>
  )
}
