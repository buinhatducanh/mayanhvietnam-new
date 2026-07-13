import { Star } from 'lucide-react'

interface Props {
  productName: string
  rating: number
  reviewCount: number
  ratingBreakdown?: { stars: number; percentage: number }[]
}

export function ProductReviewsSection({ productName, rating, reviewCount, ratingBreakdown }: Props) {
  return (
    <section aria-label="Đánh giá sản phẩm" className="mt-10">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-xl font-bold">ĐÁNH GIÁ SẢN PHẨM</h2>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-4 ${i < Math.round(rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
              aria-hidden="true"
            />
          ))}
          <span className="ml-1 font-mono text-sm font-semibold">{rating}</span>
          <span className="text-sm text-muted-foreground">({reviewCount} đánh giá)</span>
        </div>
      </div>

      {/* Rating breakdown */}
      {ratingBreakdown && ratingBreakdown.length > 0 && (
        <div className="mb-6 flex flex-col gap-2">
          {ratingBreakdown.map((r) => (
            <div key={r.stars} className="flex items-center gap-3 text-sm">
              <span className="w-8 shrink-0 font-medium">{r.stars} ★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${r.percentage}%` }}
                  role="progressbar"
                  aria-valuenow={r.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${r.stars} sao: ${r.percentage}%`}
                />
              </div>
              <span className="w-10 text-right text-xs text-muted-foreground">{r.percentage}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder review CTA */}
      <div className="rounded-2xl border border-border bg-secondary/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Hãy là người đầu tiên đánh giá <strong className="text-foreground">{productName}</strong>
        </p>
        <button
          type="button"
          className="mt-3 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-brightness hover:brightness-110"
        >
          Viết đánh giá
        </button>
      </div>
    </section>
  )
}
