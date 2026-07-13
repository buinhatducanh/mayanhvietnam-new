'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ChevronRight, ShoppingCart, Star, ShieldCheck, Truck,
  RotateCcw, Package, Tag, Info, BadgeCheck, Sparkles, Box,
} from 'lucide-react';
import {
  getProductBySlug,
  getRelatedProducts,
  formatVND,
  type Product,
} from '@/lib/adapter';
import { ProductGallery } from '@/components/product-gallery';
import { ProductCard } from '@/components/product-card';

const CameraCanvas = dynamic(() => import('@/components/camera-canvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center bg-card/30 text-muted-foreground">
      Đang tải mô hình 3D...
    </div>
  ),
});

const BADGE_COLORS: Record<string, string> = {
  hot: 'bg-red-600/90 text-white',
  sale: 'bg-primary/90 text-primary-foreground',
  new: 'bg-green-600/90 text-white',
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const [colorIndex, setColorIndex] = useState(0);
  const [show3D, setShow3D] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-light text-foreground">Sản phẩm không tồn tại</h1>
          <Link
            href="/"
            className="mt-4 inline-flex rounded-xl bg-primary px-6 py-2 text-sm font-medium text-primary-foreground"
          >
            Về trang chủ
          </Link>
        </div>
      </main>
    );
  }

  const related = getRelatedProducts(product, 4);
  const bodyColor = product.colors[colorIndex]?.hex ?? '#1c1c1c';
  const hasDiscount = product.originalPrice != null && product.price < (product.originalPrice ?? product.price);

  return (
    <main className="bg-background">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-12">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight className="size-3" />
          <Link href={`/danh-muc/${product.category}`} className="hover:text-primary">
            {product.category}
          </Link>
          <ChevronRight className="size-3" />
          <span className="line-clamp-1 text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: Gallery + 3D */}
          <div>
            {/* 3D Toggle */}
            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={() => setShow3D(false)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  !show3D ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                📷 Ảnh
              </button>
              <button
                type="button"
                onClick={() => setShow3D(true)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  show3D ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <Box className="size-4" /> Xem 3D
              </button>
            </div>

            {show3D ? (
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card/30">
                <CameraCanvas bodyColor={bodyColor} />
                <div className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                  Kéo để xoay · Scroll để phóng to
                </div>
              </div>
            ) : (
              <ProductGallery
                images={product.galleryImages}
                productName={product.name}
                fallbackImage={product.image}
              />
            )}

            {/* Color picker (only in 3D mode) */}
            {show3D && product.colors.length > 1 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground">
                  Màu sắc: <span className="text-muted-foreground">{product.colors[colorIndex]?.name}</span>
                </p>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((color, i) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setColorIndex(i)}
                      aria-label={`Chọn màu ${color.name}`}
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
                  <Sparkles className="size-3 text-primary" />
                  Mô hình 3D đổi màu real-time khi bạn chọn.
                </p>
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                product.availability === 'in_stock' ? 'bg-green-600/80 text-white' : 'bg-red-600/80 text-white'
              }`}>
                <span className="size-1.5 rounded-full bg-white" />
                {product.stockStatus}
              </span>
              {product.badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                    BADGE_COLORS[badge.type] ?? 'bg-muted text-muted-foreground'
                  }`}
                >
                  <BadgeCheck className="size-3" />
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Title */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {product.brand}
              </p>
              <h1 className="mt-1 text-balance text-3xl font-light text-foreground md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {product.tagline}
              </p>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="size-4 fill-primary text-primary" />
                  <span className="font-medium text-foreground">{product.rating.average}/5</span>
                </span>
                <span className="text-muted-foreground">{product.rating.count} đánh giá</span>
              </div>
            )}

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-3">
              {product.callForPrice ? (
                <span className="text-3xl font-light text-primary">Vui lòng gọi</span>
              ) : (
                <>
                  <span className="text-4xl font-light text-foreground">{formatVND(product.price)}</span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        {formatVND(product.originalPrice!)}
                      </span>
                      <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        -{product.discountPercent}%
                      </span>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="rounded-xl border border-border bg-card/50 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Tag className="size-4 text-primary" /> Điểm nổi bật
                </h3>
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

            {/* Short specs */}
            {product.shortSpecs && product.shortSpecs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.shortSpecs.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* Buy actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-primary-foreground transition-all hover:shadow-[0_0_28px_-4px] hover:shadow-primary/60"
              >
                <ShoppingCart className="size-5" />
                {product.callForPrice
                  ? 'Gọi ngay — 0937.148.222'
                  : `Mua ngay — ${formatVND(product.price)}`}
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-4 font-medium text-foreground transition-all hover:border-primary/40"
              >
                Thêm vào giỏ
              </button>
            </div>

            {/* Trust badges */}
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: `Bảo hành ${product.warrantyMonths} tháng` },
                { icon: Truck, label: 'Giao hàng nhanh toàn quốc' },
                { icon: RotateCcw, label: 'Đổi trả trong 7 ngày' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-3 py-2.5">
                  <Icon className="size-4 shrink-0 text-primary" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </li>
              ))}
            </ul>

            {/* Included items */}
            {product.includedItems.length > 0 && (
              <div className="rounded-xl border border-border p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Package className="size-4 text-primary" /> Phụ kiện đi kèm
                </h3>
                <ul className="space-y-1.5">
                  {product.includedItems.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="rounded-xl border border-border p-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Info className="size-4 text-primary" /> Mô tả sản phẩm
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Grouped Specs */}
        {product.specs && product.specs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-foreground">Thông số kỹ thuật chi tiết</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {product.specs.map((group) => (
                <div key={group.group} className="rounded-xl border border-border overflow-hidden">
                  <div className="bg-card/60 px-4 py-2.5">
                    <h3 className="text-sm font-semibold text-foreground">{group.group}</h3>
                  </div>
                  <table className="w-full text-sm">
                    <tbody>
                      {group.items.map((item, i) => (
                        <tr key={item.label} className={i % 2 === 0 ? 'bg-background' : 'bg-card/30'}>
                          <td className="w-2/5 border-b border-border px-4 py-2.5 text-muted-foreground">
                            {item.label}
                          </td>
                          <td className="border-b border-border px-4 py-2.5 font-medium text-foreground">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-foreground">Sản phẩm liên quan</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
