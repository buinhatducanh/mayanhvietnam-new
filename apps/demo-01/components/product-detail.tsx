'use client'

import { useState } from 'react'
import {
  BadgeCheck,
  Check,
  CircleDot,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatVND, storeLocations, type Product } from '@/lib/products'
import { ImageGallery } from './product-detail/image-gallery'
import { ProductTabs } from './product-detail/product-tabs'
import { ProductReviewsSection } from './product-detail/reviews-section'
import { ArticleSection } from './product-detail/article-section'
import { StickyChatBar } from './product-detail/sticky-chat-bar'
import { ProductInfoBar } from './product-detail/product-info-bar'

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
    <>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-4">
          <ImageGallery
            mainImage={product.image}
            thumbnails={product.thumbnails}
            productName={product.name}
          />

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

          {/* Store locations */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="mb-3 text-sm font-semibold">Hệ thống cửa hàng</p>
            <ul className="flex flex-col gap-2">
              {storeLocations.map((loc) => (
                <li key={loc.city} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    <strong className="text-foreground">{loc.city}:</strong> {loc.address}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <a
                href="https://zalo.me/2875467351509223987"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition-brightness hover:brightness-110"
              >
                <MessageCircle className="size-3.5" aria-hidden="true" />
                Zalo
              </a>
              <a
                href="tel:0907215252"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                Gọi điện
              </a>
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
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
            <span aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`mr-0.5 inline-block size-4 ${i < Math.round(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                />
              ))}
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} đánh giá)
            </span>
          </div>

          {/* Condition + BCT badge */}
          <div className="mt-4">
            <ProductInfoBar isNew={product.isNew} condition={product.condition} />
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
            {hasDiscount && (
              <span className="rounded-md bg-destructive px-2 py-0.5 font-mono text-xs font-bold text-white">
                -{discountPercent}%
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
                  const varDiscount = variant.discountPrice && variant.discountPrice < variant.price
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
                      <div className="flex items-center gap-2">
                        {varDiscount && (
                          <span className="font-mono text-xs text-muted-foreground line-through">
                            {formatVND(variant.price)}
                          </span>
                        )}
                        <span className="font-mono text-sm font-semibold text-primary">
                          {formatVND(variant.discountPrice ?? variant.price)}
                        </span>
                      </div>
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
              aria-label={`Yêu thích ${product.name}`}
              className="rounded-full border border-border p-4 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Heart className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Tabs: Tổng quan / Tính năng / Bao gồm / Thông số */}
          <ProductTabs
            highlights={product.highlights}
            overviewSections={product.overviewSections}
            includedItems={product.includedItems}
            specs={product.specs}
          />

          {/* Long-form review article */}
          {product.article && <ArticleSection article={product.article} />}

          {/* Reviews */}
          <ProductReviewsSection
            productName={product.name}
            rating={product.rating}
            reviewCount={product.reviewCount}
            ratingBreakdown={product.ratingBreakdown}
          />
        </div>
      </div>

      {/* Sticky chat bar (mobile only) */}
      <StickyChatBar price={finalPrice} formattedPrice={formatVND(finalPrice)} />
    </>
  )
}
