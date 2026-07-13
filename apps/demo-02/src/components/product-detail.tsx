'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  BadgeCheck,
  Box,
  Check,
  Heart,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatVND, getProductGallery, type Product } from '@/lib/products'

const availabilityLabels: Record<Product['availability'], { label: string; className: string }> = {
  IN_STOCK: { label: 'Còn hàng', className: 'bg-primary/10 text-primary border-primary/40' },
  OUT_OF_STOCK: {
    label: 'Hết hàng',
    className: 'bg-destructive/10 text-destructive border-destructive/40',
  },
  PRE_ORDER: { label: 'Đặt trước', className: 'bg-accent/10 text-accent border-accent/40' },
}

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [added, setAdded] = useState(false)
  const gallery = getProductGallery(product)
  const [activeImage, setActiveImage] = useState(0)

  const finalPrice = selectedVariant?.discountPrice ?? selectedVariant?.price ?? product.price
  const basePrice = selectedVariant?.price ?? product.price
  const hasDiscount = finalPrice < basePrice
  const discountPercent = hasDiscount ? Math.round(((basePrice - finalPrice) / basePrice) * 100) : 0
  const availability = availabilityLabels[product.availability]

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
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Image gallery */}
      <div className="animate-rise-in flex flex-col gap-4">
        <div className="shine relative aspect-square overflow-hidden rounded-3xl border border-border bg-card">
          <Image
            key={activeImage}
            src={gallery[activeImage] || '/placeholder.svg'}
            alt={`${product.name} - ảnh ${activeImage + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="animate-fade-slide object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 left-1/2 size-64 -translate-x-1/2 rounded-full bg-primary/15 blur-[90px]"
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

        {gallery.length > 1 && (
          <ul className="grid grid-cols-4 gap-3" aria-label="Ảnh sản phẩm">
            {gallery.map((img, i) => {
              const active = i === activeImage
              return (
                <li key={img + i}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Xem ảnh ${i + 1}`}
                    aria-pressed={active}
                    className={`relative aspect-square w-full overflow-hidden rounded-xl border bg-secondary transition-all ${
                      active
                        ? 'brand-glow border-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={img || '/placeholder.svg'}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Info */}
      <div className="animate-rise-in delay-100 flex flex-col gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {product.brand}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${availability.className}`}
            >
              {availability.label}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-balance sm:text-4xl">{product.name}</h1>
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
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        {/* Variants */}
        {product.variants.length > 1 && (
          <fieldset>
            <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Chọn phiên bản
            </legend>
            <div className="flex flex-col gap-2">
              {product.variants.map((variant) => {
                const vPrice = variant.discountPrice ?? variant.price
                const active = selectedVariant?.id === variant.id
                return (
                  <button
                    key={variant.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                      active
                        ? 'brand-glow border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium">
                      <span
                        className={`flex size-4 items-center justify-center rounded-full border ${
                          active ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`}
                        aria-hidden="true"
                      >
                        {active && <Check className="size-3 text-primary-foreground" />}
                      </span>
                      {variant.name}
                    </span>
                    <span className="font-mono text-sm font-semibold text-primary">
                      {formatVND(vPrice)}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        )}

        {/* Price + CTA */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-end gap-3">
            <span className="font-mono text-3xl font-bold text-primary">
              {formatVND(finalPrice)}
            </span>
            {hasDiscount && (
              <span className="font-mono text-base text-muted-foreground line-through">
                {formatVND(basePrice)}
              </span>
            )}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleAdd}
              disabled={product.availability === 'OUT_OF_STOCK'}
              className="brand-glow flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
            >
              {added ? (
                <>
                  <Check className="size-4" aria-hidden="true" />
                  Đã thêm
                </>
              ) : (
                <>
                  <ShoppingCart className="size-4" aria-hidden="true" />
                  {product.availability === 'PRE_ORDER' ? 'Đặt trước ngay' : 'Thêm vào giỏ'}
                </>
              )}
            </button>
            <button
              type="button"
              aria-label="Thêm vào yêu thích"
              className="rounded-full border border-border p-3.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Heart className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[
            { icon: BadgeCheck, label: 'Hàng chính hãng 100%' },
            { icon: ShieldCheck, label: 'Bảo hành 12-24 tháng' },
            { icon: Truck, label: 'Giao nhanh toàn quốc' },
          ].map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3 text-xs text-muted-foreground"
            >
              <item.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>

        {/* Specs */}
        <section aria-labelledby="specs-heading">
          <h2
            id="specs-heading"
            className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            <Box className="size-4 text-primary" aria-hidden="true" />
            Thông số kỹ thuật
          </h2>
          <dl className="overflow-hidden rounded-2xl border border-border">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div
                key={key}
                className={`flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${
                  i % 2 === 0 ? 'bg-card' : 'bg-secondary/50'
                }`}
              >
                <dt className="shrink-0 text-xs font-medium text-muted-foreground sm:w-40">
                  {key}
                </dt>
                <dd className="text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  )
}
