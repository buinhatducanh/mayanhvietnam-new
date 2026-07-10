'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  BadgeCheck,
  Check,
  CircleDot,
  Heart,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatVND, type Product } from '@/lib/products'

const availabilityLabel: Record<Product['availability'], { label: string; className: string }> = {
  IN_STOCK: { label: 'Còn hàng', className: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10' },
  OUT_OF_STOCK: { label: 'Hết hàng', className: 'text-destructive border-destructive/40 bg-destructive/10' },
  PRE_ORDER: { label: 'Đặt trước', className: 'text-primary border-primary/40 bg-primary/10' },
}

const perks = [
  { icon: ShieldCheck, label: 'Bảo hành chính hãng 12-24 tháng' },
  { icon: Truck, label: 'Giao hàng nhanh toàn quốc' },
  { icon: RefreshCcw, label: 'Đổi trả trong 7 ngày' },
  { icon: BadgeCheck, label: 'Sản phẩm chính hãng 100%' },
]

export function ProductDetail({ product }: { product: Product }) {
  const { addItem, openCart } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [added, setAdded] = useState(false)

  const finalPrice = selectedVariant?.discountPrice ?? selectedVariant?.price ?? product.price
  const basePrice = selectedVariant?.price ?? product.price
  const hasDiscount = finalPrice < basePrice
  const discountPercent = hasDiscount ? Math.round(((basePrice - finalPrice) / basePrice) * 100) : 0
  const availability = availabilityLabel[product.availability]

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      variantName: selectedVariant?.name ?? 'Tiêu chuẩn',
      price: finalPrice,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
    openCart()
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      {/* Image */}
      <div className="flex flex-col gap-4">
        <div className="group relative aspect-square overflow-hidden rounded-3xl border border-border bg-secondary">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                Mới
              </span>
            )}
            {hasDiscount && (
              <span className="rounded-md bg-destructive px-2.5 py-1 font-mono text-[11px] font-bold text-white">
                -{discountPercent}%
              </span>
            )}
            {product.condition === 'USED' && (
              <span className="rounded-md bg-secondary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground">
                Đã qua sử dụng
              </span>
            )}
          </div>
        </div>

        {/* Perks */}
        <ul className="grid grid-cols-2 gap-3">
          {perks.map((perk) => (
            <li
              key={perk.label}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3 text-xs text-muted-foreground"
            >
              <perk.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {perk.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {product.brand}
          </span>
          <span
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${availability.className}`}
          >
            <CircleDot className="size-3" aria-hidden="true" />
            {availability.label}
          </span>
        </div>

        <h1 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-2">
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${i < Math.round(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
              />
            ))}
          </span>
          <span className="font-mono text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount} đánh giá)
          </span>
        </div>

        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-6 flex items-end gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-5">
          <span className="font-mono text-3xl font-bold text-primary text-glow">
            {formatVND(finalPrice)}
          </span>
          {hasDiscount && (
            <span className="pb-1 font-mono text-base text-muted-foreground line-through">
              {formatVND(basePrice)}
            </span>
          )}
        </div>

        {/* Variants */}
        {product.variants.length > 0 && (
          <fieldset className="mt-6">
            <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Phiên bản
            </legend>
            <div className="flex flex-col gap-2.5">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant?.id === variant.id
                return (
                  <button
                    key={variant.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                      isSelected
                        ? 'brand-glow border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium">
                      <span
                        aria-hidden="true"
                        className={`flex size-4.5 items-center justify-center rounded-full border ${
                          isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`}
                      >
                        {isSelected && <Check className="size-3 text-primary-foreground" />}
                      </span>
                      {variant.name}
                    </span>
                    <span className="font-mono text-sm font-semibold text-primary">
                      {formatVND(variant.discountPrice ?? variant.price)}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        )}

        {/* Actions */}
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={handleAdd}
            disabled={product.availability === 'OUT_OF_STOCK'}
            className="brand-glow-strong flex flex-1 items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
          >
            {added ? (
              <>
                <Check className="size-4" aria-hidden="true" />
                Đã thêm vào giỏ
              </>
            ) : (
              <>
                <ShoppingCart className="size-4" aria-hidden="true" />
                {product.availability === 'PRE_ORDER' ? 'Đặt trước ngay' : 'Thêm vào giỏ hàng'}
              </>
            )}
          </button>
          <button
            type="button"
            aria-label={`Thêm ${product.name} vào yêu thích`}
            className="rounded-full border border-border p-4 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Heart className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Specs */}
        <section aria-labelledby="specs-heading" className="mt-10">
          <h2 id="specs-heading" className="mb-4 text-lg font-bold">
            Thông số kỹ thuật
          </h2>
          <dl className="overflow-hidden rounded-2xl border border-border">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div
                key={key}
                className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3.5 ${
                  i % 2 === 0 ? 'bg-card' : 'bg-secondary/50'
                }`}
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {key}
                </dt>
                <dd className="font-mono text-sm">{value}</dd>
              </div>
            ))}
            {product.mountType && (
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-primary/25 bg-primary/5 px-5 py-3.5">
                <dt className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Ngàm (Mount)
                </dt>
                <dd className="font-mono text-sm font-semibold text-primary">{product.mountType}</dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </div>
  )
}
