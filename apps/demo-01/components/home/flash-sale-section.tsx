import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

/**
 * Flash Sale banner — matches site mayanhvietnam.com /danh-muc/san-pham-flash-sale
 * Simple banner linking to flash sale page (dynamic content loaded via JS on real site)
 */
export function FlashSaleSection() {
  return (
    <section aria-label="Flash Sale" className="mx-auto w-full max-w-7xl px-4 lg:px-8">
      <Link
        href="/danh-muc/san-pham-flash-sale"
        className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/5 p-5 transition-all hover:border-destructive/60 sm:p-6"
      >
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 size-48 rounded-full bg-destructive/10 blur-3xl transition-all group-hover:bg-destructive/20"
        />
        <div className="relative flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-destructive/15">
            <Zap className="size-6 fill-destructive text-destructive" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-destructive">
              Flash Sale
            </p>
            <h2 className="mt-1 text-xl font-bold sm:text-2xl">Ưu đãi số lượng có hạn</h2>
          </div>
        </div>
        <span className="relative hidden items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-destructive sm:inline-flex">
          Mua ngay
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </Link>
    </section>
  )
}
