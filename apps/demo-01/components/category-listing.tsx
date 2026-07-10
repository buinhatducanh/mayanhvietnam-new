'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/products'

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Phổ biến nhất' },
  { value: 'price-asc', label: 'Giá thấp đến cao' },
  { value: 'price-desc', label: 'Giá cao đến thấp' },
  { value: 'newest', label: 'Mới nhất' },
]

const priceRanges = [
  { label: 'Dưới 10 triệu', min: 0, max: 10_000_000 },
  { label: '10 - 30 triệu', min: 10_000_000, max: 30_000_000 },
  { label: '30 - 50 triệu', min: 30_000_000, max: 50_000_000 },
  { label: 'Trên 50 triệu', min: 50_000_000, max: Infinity },
]

export function CategoryListing({ allProducts }: { allProducts: Product[] }) {
  const [sort, setSort] = useState<SortOption>('popular')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRange, setSelectedRange] = useState<number | null>(null)
  const [conditionFilter, setConditionFilter] = useState<'ALL' | 'NEW' | 'USED'>('ALL')

  const brands = useMemo(
    () => Array.from(new Set(allProducts.map((p) => p.brand))).sort(),
    [allProducts],
  )

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      const price = p.discountPrice ?? p.price
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false
      if (selectedRange !== null) {
        const range = priceRanges[selectedRange]
        if (price < range.min || price >= range.max) return false
      }
      if (conditionFilter !== 'ALL' && p.condition !== conditionFilter) return false
      return true
    })
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price))
        break
      case 'price-desc':
        list = [...list].sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price))
        break
      case 'newest':
        list = [...list].sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false))
        break
      default:
        list = [...list].sort((a, b) => b.reviewCount - a.reviewCount)
    }
    return list
  }, [allProducts, sort, selectedBrands, selectedRange, conditionFilter])

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {/* Filters sidebar */}
      <aside aria-label="Bộ lọc sản phẩm" className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
          <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
          Bộ lọc
        </div>

        <fieldset>
          <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Thương hiệu
          </legend>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                type="button"
                aria-pressed={selectedBrands.includes(brand)}
                onClick={() => toggleBrand(brand)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                  selectedBrands.includes(brand)
                    ? 'brand-glow border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Khoảng giá
          </legend>
          <div className="flex flex-col gap-2">
            {priceRanges.map((range, i) => (
              <button
                key={range.label}
                type="button"
                aria-pressed={selectedRange === i}
                onClick={() => setSelectedRange(selectedRange === i ? null : i)}
                className={`rounded-lg border px-3.5 py-2 text-left text-xs font-medium transition-all ${
                  selectedRange === i
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Tình trạng
          </legend>
          <div className="flex gap-2">
            {(
              [
                { value: 'ALL', label: 'Tất cả' },
                { value: 'NEW', label: 'Mới' },
                { value: 'USED', label: 'Đã qua SD' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={conditionFilter === opt.value}
                onClick={() => setConditionFilter(opt.value)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                  conditionFilter === opt.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>
      </aside>

      {/* Product grid */}
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-mono font-semibold text-foreground">{filtered.length}</span> sản
            phẩm
          </p>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            Sắp xếp:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
