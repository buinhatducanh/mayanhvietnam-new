'use client';

import { ImageWithFallback } from './ui/image-with-fallback';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Check,
  Package, Tag, Info, BadgeCheck, Sparkles,
} from 'lucide-react';
import { products, formatVND, type Product } from '@/lib/adapter';
import { SpecTable } from './spec-table';
import { ProductGallery } from './product-gallery';

type ProductDetailsProps = {
  product: Product;
  colorIndex: number;
  onSelectProduct: (index: number) => void;
  onSelectColor: (index: number) => void;
};

const BADGE_COLORS: Record<string, string> = {
  'MỚI 100%': 'bg-green-600/90 text-white',
  'CHÍNH HÃNG': 'bg-primary/90 text-primary-foreground',
  'Like new': 'bg-blue-600/90 text-white',
  'Like new (1)': 'bg-blue-600/90 text-white',
  'Like new (2)': 'bg-blue-600/90 text-white',
  'Ngoại hình Đẹp': 'bg-amber-600/90 text-white',
  'Ngoại hình Đẹp (1)': 'bg-amber-600/90 text-white',
};

export const ProductDetails = forwardRef<HTMLDivElement, ProductDetailsProps>(
  function ProductDetails({ product, colorIndex, onSelectProduct, onSelectColor }, buyRef) {
    const selectedIndex = products.findIndex((p) => p.id === product.id);

    return (
      <section id="san-pham" className="relative z-10 border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          {/* Section header */}
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Cửa hàng</p>
          <h2 className="mt-2 text-balance text-3xl font-extralight text-foreground md:text-5xl">
            Chọn chiếc máy của bạn
          </h2>

          {/* Product selector grid */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {products.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProduct(i)}
                aria-pressed={i === selectedIndex}
                className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-all ${
                  i === selectedIndex
                    ? 'border-primary/60 bg-card shadow-[0_0_24px_-6px] shadow-primary/30'
                    : 'border-border bg-card/50 hover:border-primary/30 hover:shadow-[0_0_18px_-8px] hover:shadow-primary/20'
                }`}
              >
                {i === selectedIndex && (
                  <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary">
                    <Check className="size-3 text-primary-foreground" aria-hidden />
                  </span>
                )}
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <ImageWithFallback
                    src={p.image || '/placeholder.svg'}
                    alt={p.name}
                    productName={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
                <p className="mt-2 line-clamp-2 text-xs font-medium leading-tight text-foreground">
                  {p.name}
                </p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-xs font-semibold text-primary">{formatVND(p.price)}</span>
                </div>
                <span className="mt-1 inline-flex text-[10px] text-muted-foreground">
                  -{p.discountPercent}%
                </span>
              </button>
            ))}
          </div>

          {/* Selected product detail */}
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2"
          >
            {/* Left: gallery */}
            <div>
              <ProductGallery
                images={product.galleryImages}
                productName={product.name}
                fallbackImage={product.image}
              />
            </div>

            {/* Right: info */}
            <div className="space-y-6">
              {/* Title + badges */}
              <div>
                <div className="flex flex-wrap gap-2">
                  {/* Stock badge */}
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      product.stockStatus === 'Còn hàng'
                        ? 'bg-green-600/80 text-white'
                        : 'bg-red-600/80 text-white'
                    }`}
                  >
                    <span className="size-1.5 rounded-full bg-white" />
                    {product.stockStatus}
                  </span>
                  {/* Product badges */}
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        BADGE_COLORS[badge] ?? 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <BadgeCheck className="size-3" aria-hidden />
                      {badge}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 text-balance text-3xl font-light text-foreground md:text-4xl">
                  {product.name}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  {product.tagline}
                </p>
              </div>

              {/* Rating + sold */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="size-4 fill-primary text-primary" aria-hidden />
                  <span className="font-medium text-foreground">{product.rating}/5</span>
                </span>
                <span className="text-muted-foreground">{product.reviewCount} đánh giá</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{product.soldCount} đã bán</span>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-4xl font-light text-foreground">{formatVND(product.price)}</span>
                <span className="text-xl text-muted-foreground line-through">
                  {formatVND(product.originalPrice)}
                </span>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  -{product.discountPercent}%
                </span>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Tiết kiệm {formatVND(product.originalPrice - product.price)}
                </span>
              </div>

              {/* Color picker */}
              <div>
                <p className="text-sm font-medium text-foreground">
                  Màu sắc:{' '}
                  <span className="text-muted-foreground">{product.colors[colorIndex]?.name}</span>
                </p>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((color, i) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => onSelectColor(i)}
                      aria-label={`Chọn màu ${color.name}`}
                      aria-pressed={i === colorIndex}
                      className={`size-10 rounded-full border-2 transition-all ${
                        i === colorIndex
                          ? 'border-primary shadow-[0_0_12px_-2px] shadow-primary/60'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Sparkles className="size-3 text-primary" aria-hidden />
                  Mô hình 3D phía trên đổi màu real-time khi bạn chọn.
                </p>
              </div>

              {/* Highlights */}
              {product.highlights.length > 0 && (
                <div className="rounded-xl border border-border bg-card/50 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Tag className="size-4 text-primary" aria-hidden />
                    Điểm nổi bật
                  </h4>
                  <ul className="space-y-1.5">
                    {product.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Promotions */}
              {product.promotions.length > 0 && (
                <div className="space-y-2">
                  {product.promotions.map((promo) => (
                    <div
                      key={promo}
                      className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm text-primary"
                    >
                      <span>{promo}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Buy actions */}
              <div ref={buyRef} className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-primary-foreground transition-all hover:shadow-[0_0_28px_-4px] hover:shadow-primary/60"
                >
                  <ShoppingCart className="size-5" aria-hidden />
                  Mua ngay — {formatVND(product.price)}
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-4 font-medium text-foreground transition-all hover:border-primary/40 hover:shadow-[0_0_20px_-6px] hover:shadow-primary/40"
                >
                  Thêm vào giỏ
                </button>
              </div>

              {/* Trust badges */}
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  {
                    icon: ShieldCheck,
                    label: `Bảo hành chính hãng ${product.warrantyMonths > 0 ? product.warrantyMonths : 0} tháng`,
                  },
                  { icon: Truck, label: 'Giao hàng nhanh toàn quốc' },
                  { icon: RotateCcw, label: 'Đổi trả trong 7 ngày' },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-3 py-2.5"
                  >
                    <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                    <span className="text-xs leading-relaxed text-muted-foreground">{label}</span>
                  </li>
                ))}
              </ul>

              {/* Included items */}
              {product.includedItems.length > 0 && (
                <div className="rounded-xl border border-border p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Package className="size-4 text-primary" aria-hidden />
                    Phụ kiện đi kèm
                  </h4>
                  <ul className="space-y-1.5">
                    {product.includedItems.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="size-3 shrink-0 text-green-500" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div className="rounded-xl border border-border p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Info className="size-4 text-primary" aria-hidden />
                    Mô tả sản phẩm
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                </div>
              )}
            </div>
          </motion.div>

          <SpecTable product={product} />
        </div>
      </section>
    );
  },
);
