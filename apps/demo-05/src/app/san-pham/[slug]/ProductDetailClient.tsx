'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  CreditCard,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  Check,
  Star,
} from 'lucide-react';
import type { ProductSummary } from '@mayanhvietnam/mock-data';
import { reviews } from '@/lib/mock-data';
import { useCart } from '@/lib/cart-context';
import { formatVND, calcDiscountPercent, cn } from '@/lib/utils';
import { ProductGrid } from '@/components/product/ProductGrid';

type TabKey = 'overview' | 'specs' | 'reviews';

export function ProductDetailClient({
  product,
  related,
}: {
  product: ProductSummary;
  related: ProductSummary[];
}) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const discount = calcDiscountPercent(product.price, product.originalPrice);
  const productReviews = reviews.filter((r) => r.productPurchased.toLowerCase().includes(product.brand.toLowerCase()) || r.productPurchased.toLowerCase().includes(product.name.split(' ').slice(0, 2).join(' ').toLowerCase())).slice(0, 5);

  const handleAddToCart = () => addItem(product, null, quantity);
  const handleBuyNow = () => {
    addItem(product, null, quantity);
    window.location.href = '/thanh-toan';
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
        <span>/</span>
        <Link href={`/danh-muc/${product.category}`} className="hover:text-foreground transition-colors capitalize">{product.category.replace(/-/g, ' ')}</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Gallery */}
        <div>
          <div className="aspect-square rounded-2xl bg-card border border-border overflow-hidden relative">
            <Image
              src={product.images[activeImage]?.url ?? product.thumbnail}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-contain p-8"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 rounded-md px-3 py-1 text-xs font-mono font-bold text-white" style={{ background: '#FF6B35' }}>
                -{discount}%
              </span>
            )}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-error transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors bg-card',
                    activeImage === i ? 'border-primary' : 'border-border hover:border-muted-foreground'
                  )}
                >
                  <Image src={img.url} alt="" fill sizes="80px" className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">{product.brand}</span>
            {product.mount && (
              <>
                <span className="text-xs text-muted-foreground">|</span>
                <span className="text-xs font-mono text-muted-foreground">{product.mount}</span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            {product.rating && (
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={cn('w-4 h-4', i <= Math.floor(product.rating!.average) ? 'fill-primary text-primary' : 'text-border')} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-mono">{product.rating.average} ({product.rating.count} đánh giá)</span>
              </div>
            )}
          </div>

          {/* Price block */}
          <div className="rounded-xl border border-border bg-card p-5 mb-5">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="price-mono text-3xl font-black">{formatVND(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="price-strike text-base">{formatVND(product.originalPrice)}</span>
                  <span className="rounded-md bg-error/15 px-2 py-0.5 text-xs font-mono font-bold text-error">-{discount}%</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Hoặc trả góp 0% · ~<span className="font-mono text-foreground">{formatVND(Math.round(product.price / 12))}</span>/tháng × 12 tháng
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 mb-4">
            <span className={cn('inline-flex h-6 items-center rounded-md px-2 text-[11px] font-bold', product.availability === 'in_stock' && 'bg-success/15 text-success', product.availability === 'pre_order' && 'bg-warning/15 text-warning', product.availability === 'out_of_stock' && 'bg-error/15 text-error')}>
              {product.availability === 'in_stock' && '✓ Còn hàng'}
              {product.availability === 'pre_order' && '⏳ Sắp về'}
              {product.availability === 'out_of_stock' && '✗ Hết hàng'}
            </span>
          </div>

          {/* Quantity + Buy */}
          <div className="flex items-stretch gap-2 mb-5">
            <div className="flex items-center border border-border rounded-lg bg-card">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-foreground border-x border-border">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button onClick={handleBuyNow} className="flex-1 h-12 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ background: '#FF6B35' }}>
              <Zap className="w-4 h-4" />
              Mua ngay
            </button>
            <button onClick={handleAddToCart} className="flex-1 h-12 rounded-lg bg-card border border-border text-foreground font-bold text-sm flex items-center justify-center gap-2 hover:border-primary/40 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Thêm vào giỏ
            </button>
          </div>

          {/* Trust services */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Shield, label: 'Bảo hành 24 tháng' },
              { icon: Truck, label: 'Freeship toàn quốc' },
              { icon: CreditCard, label: 'Trả góp 0% lãi' },
              { icon: RotateCcw, label: 'Đổi trả 7 ngày' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 px-3 py-2 rounded-md bg-card border border-border text-xs text-muted-foreground">
                <s.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <section className="mb-12">
        <div className="border-b border-border mb-6 flex gap-1 overflow-x-auto">
          {[
            { key: 'overview', label: 'Tổng quan' },
            { key: 'specs', label: 'Thông số' },
            { key: 'reviews', label: `Đánh giá (${productReviews.length})` },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as TabKey)} className={cn('px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors whitespace-nowrap', activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground')}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {product.shortSpecs && product.shortSpecs.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.shortSpecs.map((s) => (
                    <span key={s} className="rounded-md border border-border bg-elevated px-2.5 py-1 text-xs text-foreground font-mono">{s}</span>
                  ))}
                </div>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sản phẩm {product.name} chính hãng từ {product.brand}, bảo hành 24 tháng tại mayanhvietnam.com. Freeship đơn từ 5 triệu, trả góp 0% lãi suất qua thẻ tín dụng. Hỗ trợ thu cũ đổi mới trợ giá 30%.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground font-semibold w-1/3">Thương hiệu</td>
                    <td className="py-3 px-4 text-foreground">{product.brand}</td>
                  </tr>
                  {product.mount && (
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 text-muted-foreground font-semibold">Ngàm</td>
                      <td className="py-3 px-4 text-foreground">{product.mount}</td>
                    </tr>
                  )}
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground font-semibold">Danh mục</td>
                    <td className="py-3 px-4 text-foreground capitalize">{product.category.replace(/-/g, ' ')}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground font-semibold">Tình trạng</td>
                    <td className="py-3 px-4 text-foreground">{product.isUsed ? 'Đã qua sử dụng' : 'Mới'}</td>
                  </tr>
                  {product.shortSpecs && product.shortSpecs.map((s, i) => (
                    <tr key={i} className="border-b border-border">
                      <td className="py-3 px-4 text-muted-foreground font-semibold">Thông số {i + 1}</td>
                      <td className="py-3 px-4 text-foreground font-mono">{s}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {productReviews.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">Chưa có đánh giá cho sản phẩm này.</p>
              ) : (
                productReviews.map((r) => (
                  <div key={r.id} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-foreground">{r.authorName}</p>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className={cn('w-3 h-3', i <= r.rating ? 'fill-primary text-primary' : 'text-border')} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1.5">{r.comment}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Sản phẩm liên quan</h2>
            <Link href={`/danh-muc/${product.category}`} className="text-xs font-semibold text-primary hover:underline">Xem tất cả →</Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}