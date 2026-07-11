'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { products, formatVND, type Product } from '@/lib/products'

interface Props {
  heading: string
  categorySlug: string
  variant: 'cameras' | 'lenses' | 'flycam' | 'action'
}

/**
 * Tabbed product section — matches site pattern with sub-tabs "Sản phẩm mới / Sản phẩm cũ".
 * Mirrors homepage `topNavTabs: ["Xem tất cả", "Sản phẩm mới", "Sản phẩm cũ"]`.
 */
export function TabbedProductSection({ heading, categorySlug, variant }: Props) {
  const [tab, setTab] = useState<'all' | 'new' | 'used'>('all')

  const items = useMemo<Product[]>(() => {
    let list = products.filter((p) => p.categorySlug === categorySlug)
    if (tab === 'new') list = list.filter((p) => p.condition === 'NEW')
    if (tab === 'used') list = list.filter((p) => p.condition === 'USED')
    return list.slice(0, 5)
  }, [categorySlug, tab])

  return (
    <section aria-labelledby={`section-${categorySlug}`} className="mx-auto w-full max-w-7xl px-4 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2
          id={`section-${categorySlug}`}
          className="text-2xl font-bold sm:text-3xl"
        >
          {heading}
        </h2>
        <Link
          href={`/danh-muc/${categorySlug}`}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          Xem tất cả
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Sub-tabs: Xem tất cả / Sản phẩm mới / Sản phẩm cũ */}
      <div className="mb-5 flex items-center gap-1 border-b border-border">
        {(
          [
            { value: 'all', label: 'Xem tất cả' },
            { value: 'new', label: 'Sản phẩm mới' },
            { value: 'used', label: 'Sản phẩm cũ' },
          ] as const
        ).map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            aria-pressed={tab === t.value}
            className={`relative -mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t.value
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Chưa có sản phẩm trong mục này.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {items.map((product) => (
            <ProductMiniCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

function ProductMiniCard({ product }: { product: Product }) {
  const finalPrice = product.discountPrice ?? product.price
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:brand-glow"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="line-clamp-2 text-sm font-medium leading-snug">{product.name}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3 fill-primary text-primary" aria-hidden="true" />
          <span className="font-mono">{product.rating}</span>
        </div>
        <p className="font-mono text-sm font-semibold text-primary">{formatVND(finalPrice)}</p>
      </div>
    </Link>
  )
}