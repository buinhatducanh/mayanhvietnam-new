'use client'

import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ShoppingCart, Zap, Minus, Plus, ShieldCheck, Truck, RefreshCw, ChevronRight, Sparkles } from 'lucide-react'
import { formatVND, type Product } from '@/lib/products'
import { SpecTable } from './spec-table'

type ProductDetailsProps = {
  product: Product
  selectedColorIndex: number
  onColorChange: (index: number) => void
  quantity: number
  onQuantityChange: (qty: number) => void
}

const fadeSlide = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.3, ease: 'easeOut' as const },
}

export const ProductDetails = forwardRef<HTMLDivElement, ProductDetailsProps>(function ProductDetails(
  { product, selectedColorIndex, onColorChange, quantity, onQuantityChange },
  buyButtonsRef,
) {
  const selectedColor = product.colors[selectedColorIndex] ?? product.colors[0]

  return (
    <AnimatePresence mode="wait">
      <motion.div key={product.id} {...fadeSlide} className="flex flex-col gap-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <a href="#" className="transition-colors hover:text-primary">Trang chủ</a>
          <ChevronRight className="h-3 w-3" />
          <a href="#" className="transition-colors hover:text-primary">Máy ảnh</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.brand}</span>
        </nav>

        {/* Rating & sales */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1" aria-label={`Đánh giá ${product.rating} trên 5 sao`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]' : 'text-zinc-700'}`}
              />
            ))}
            <span className="ml-1 font-semibold text-primary">{product.rating}</span>
          </div>
          <span className="text-muted-foreground">{product.reviewCount} đánh giá</span>
          <span className="h-3 w-px bg-border" aria-hidden="true" />
          <span className="text-muted-foreground">{product.soldCount} đã bán</span>
        </div>

        {/* Title & SKU */}
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl">{product.name}</h1>
          <p className="mt-1.5 font-mono text-xs text-muted-foreground">SKU: {product.sku}</p>
        </div>

        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-3 rounded-xl border border-border bg-card p-4">
          <span className="text-3xl font-bold text-primary drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]">
            {formatVND(product.price)}
          </span>
          <span className="text-lg text-muted-foreground line-through">{formatVND(product.originalPrice)}</span>
          <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
            {'-'}{product.discountPercent}%
          </span>
        </div>

        {/* Color picker */}
        <div>
          <p className="mb-2 text-sm font-medium">
            Màu sắc: <span className="text-primary">{selectedColor.name}</span>
          </p>
          <div className="flex gap-3">
            {product.colors.map((color, i) => (
              <button
                key={color.name}
                type="button"
                onClick={() => onColorChange(i)}
                aria-label={`Chọn màu ${color.name}`}
                aria-pressed={i === selectedColorIndex}
                className={`h-10 w-10 rounded-full border-2 transition-all ${
                  i === selectedColorIndex
                    ? 'scale-110 border-primary glow-amber'
                    : 'border-border hover:border-primary/50'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* Quantity + Buy buttons */}
        <div ref={buyButtonsRef} className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Số lượng</span>
            <div className="flex items-center rounded-lg border border-border">
              <button
                type="button"
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                aria-label="Giảm số lượng"
                className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold" aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => onQuantityChange(quantity + 1)}
                aria-label="Tăng số lượng"
                className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-primary/60 px-4 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:glow-amber"
            >
              <ShoppingCart className="h-4 w-4" />
              Thêm vào giỏ hàng
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3.5 text-sm font-bold text-zinc-950 transition-transform hover:scale-[1.02] glow-amber"
            >
              <Zap className="h-4 w-4" />
              Mua ngay
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { icon: <ShieldCheck className="h-4 w-4" />, label: 'Bảo hành chính hãng' },
            { icon: <Truck className="h-4 w-4" />, label: 'Giao hàng toàn quốc' },
            { icon: <RefreshCw className="h-4 w-4" />, label: 'Đổi trả 7 ngày' },
          ].map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-3">
              <span className="text-primary">{badge.icon}</span>
              <span className="text-xs text-muted-foreground">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Spec table */}
        <SpecTable product={product} />

        {/* DNA Highlights */}
        <section aria-labelledby="highlights-heading">
          <h2 id="highlights-heading" className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Điểm nổi bật
          </h2>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
            {product.highlights.map((highlight, i) => (
              <div key={highlight.label}>
                <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                  <span className="text-pretty">{highlight.label}</span>
                  <span className="shrink-0 font-mono text-xs font-semibold text-primary">{highlight.score}/100</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${highlight.score}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  )
})
