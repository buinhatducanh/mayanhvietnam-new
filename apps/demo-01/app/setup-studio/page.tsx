import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StudioWizard } from '@/components/studio-wizard'

export const metadata: Metadata = {
  title: 'Setup phòng Studio theo yêu cầu — Mayanhvietnam',
  description:
    'Trả lời 3 câu hỏi để nhận gợi ý cấu hình studio phù hợp với mục đích, diện tích phòng và ngân sách của bạn. Tư vấn miễn phí bởi Mayanhvietnam.',
}

export default function SetupStudioPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 lg:px-8">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Tư vấn chuyên sâu
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
            Setup phòng Studio theo yêu cầu
          </h1>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
            Trả lời 3 câu hỏi ngắn — hệ thống sẽ gợi ý cấu hình thiết bị studio tối ưu theo mục
            đích sử dụng, diện tích phòng và ngân sách của bạn.
          </p>
        </header>

        <StudioWizard />
      </main>
      <SiteFooter />
    </>
  )
}
