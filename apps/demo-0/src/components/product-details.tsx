'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { products, formatVND, type Product } from '@/lib/products';
import { SpecTable } from './spec-table';

type ProductDetailsProps = {
  product: Product;
  colorIndex: number;
  onSelectProduct: (index: number) => void;
  onSelectColor: (index: number) => void;
};

export const ProductDetails = forwardRef<HTMLDivElement, ProductDetailsProps>(
  function ProductDetails({ product, colorIndex, onSelectProduct, onSelectColor }, buyRef) {
    const selectedIndex = products.findIndex((p) => p.id === product.id);

    return (
      <section id="san-pham" className="relative z-10 border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Cửa hàng</p>
          <h2 className="mt-2 text-balance text-3xl font-extralight text-foreground md:text-5xl">
            Chọn chiếc máy của bạn
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {products.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProduct(i)}
                aria-pressed={i === selectedIndex}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
                  i === selectedIndex
                    ? 'border-primary/60 bg-card shadow-[0_0_24px_-6px] shadow-primary/30'
                    : 'border-border bg-card/50 hover:border-primary/30 hover:shadow-[0_0_18px_-8px] hover:shadow-primary/20'
                }`}
              >
                {i === selectedIndex && (
                  <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary">
                    <Check className="size-3 text-primary-foreground" aria-hidden />
                  </span>
                )}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={p.image || '/placeholder.svg'}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-3 font-medium text-foreground">{p.name}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-medium text-primary">{formatVND(p.price)}</span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatVND(p.originalPrice)}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2"
          >
            {/* Left: photo */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
              <div className="relative aspect-square">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={`Ảnh sản phẩm ${product.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                -{product.discountPercent}%
              </span>
            </div>

            {/* Right: info */}
            <div>
              <h3 className="text-balance text-3xl font-light text-foreground md:text-4xl">
                {product.name}
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{product.tagline}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="size-4 fill-primary text-primary" aria-hidden />
                  <span className="font-medium text-foreground">{product.rating}/5</span>
                </span>
                <span className="text-muted-foreground">{product.reviewCount} đánh giá</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{product.soldCount} đã bán</span>
              </div>

              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                <span className="text-4xl font-light text-foreground">{formatVND(product.price)}</span>
                <span className="text-xl text-muted-foreground line-through">
                  {formatVND(product.originalPrice)}
                </span>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Tiết kiệm {formatVND(product.originalPrice - product.price)}
                </span>
              </div>

              {/* Color picker */}
              <div className="mt-8">
                <p className="text-sm font-medium text-foreground">
                  Màu sắc:{' '}
                  <span className="text-muted-foreground">{product.colors[colorIndex]?.name}</span>
                </p>
                <div className="mt-3 flex gap-3">
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
                <p className="mt-2 text-xs text-muted-foreground">
                  Mô hình 3D phía trên sẽ đổi màu ngay lập tức khi bạn chọn.
                </p>
              </div>

              {/* Buy actions */}
              <div ref={buyRef} className="mt-8 flex flex-col gap-3 sm:flex-row">
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
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: 'Bảo hành chính hãng 24 tháng' },
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
            </div>
          </motion.div>

          <SpecTable product={product} />
        </div>
      </section>
    );
  },
);
