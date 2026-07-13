import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { LensChecker } from '@/components/lens-checker'

export const metadata: Metadata = {
  title: 'Kiểm tra tương thích ống kính — Mayanhvietnam',
  description:
    'Công cụ miễn phí kiểm tra ống kính có tương thích với thân máy ảnh của bạn theo loại ngàm (mount) — Canon RF, Sony E, Fujifilm X, Nikon Z.',
}

export default function LensCheckerPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 lg:px-8">
        <header className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Công cụ miễn phí
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
            Kiểm tra tương thích ống kính
          </h1>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
            Chọn thân máy và ống kính bạn muốn kết hợp — hệ thống sẽ kiểm tra loại ngàm (mount) và
            cho biết ngay có tương thích hay không, kèm lưu ý về hệ số crop nếu có.
          </p>
        </header>

        <LensChecker />
      </main>
      <SiteFooter />
    </>
  )
}
