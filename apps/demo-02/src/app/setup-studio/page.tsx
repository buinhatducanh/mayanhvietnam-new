import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StudioWizard } from '@/components/studio-wizard'

export const metadata: Metadata = {
  title: 'Setup phòng Studio theo yêu cầu | Mayanhvietnam',
  description:
    'Trả lời 3 câu hỏi ngắn để nhận gợi ý cấu hình studio chụp ảnh, quay phim hoặc livestream phù hợp với không gian và ngân sách của bạn.',
}

export default function SetupStudioPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-12 lg:px-8">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Tư vấn chuyên sâu
          </p>
          <h1 className="mt-2 text-3xl font-bold text-balance sm:text-4xl">
            Setup phòng Studio theo yêu cầu
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Trả lời 3 câu hỏi ngắn để nhận ngay gợi ý cấu hình thiết bị phù hợp với mục đích, không
            gian và ngân sách của bạn.
          </p>
        </header>
        <StudioWizard />
      </main>
      <SiteFooter />
    </>
  )
}
