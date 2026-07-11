'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Truck, Shield, Tag, RotateCcw, Star, Quote } from "lucide-react";
import {
  allProducts, categories, flashSaleData, heroSlides, dealBanners, reviews,
  getProductsByCategory,
} from "@mayanhvietnam/mock-data";
import { formatVND, calcDiscountPercent } from "@mayanhvietnam/shared-utils";
import ProductCard from "@/app/components/product/ProductCard";
import CountdownTimer from "@/app/components/home/CountdownTimer";

// ═══════════════════════════════════════════════════════════════
// HERO SLIDER
// ═══════════════════════════════════════════════════════════════

function HeroSlider() {
  const [idx, setIdx] = useState(0);

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {heroSlides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full rounded-3xl p-8 sm:p-12 min-h-[280px] sm:min-h-[380px] flex items-center relative overflow-hidden"
            style={{ background: slide.gradient }}
          >
            {slide.image && (
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] w-auto object-contain opacity-50 sm:opacity-60 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              </div>
            )}
            <div className="relative z-10 max-w-md">
              <span className="inline-block text-xs font-bold tracking-wider text-white/60 uppercase mb-3">
                {slide.product}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-base text-white/80 mb-6 whitespace-pre-line leading-relaxed">
                {slide.subtitle}
              </p>
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 bg-[#ff6b00] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#e85f00] transition-colors shadow-lg shadow-orange-500/30"
              >
                {slide.ctaLabel} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>
      <button
        onClick={() => setIdx((i) => Math.max(0, i - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors"
      >
        <ChevronRight size={18} className="rotate-180" />
      </button>
      <button
        onClick={() => setIdx((i) => Math.min(heroSlides.length - 1, i + 1))}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CATEGORY GRID
// ═══════════════════════════════════════════════════════════════

function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/danh-muc/${cat.slug}`}
          className="group flex flex-col items-center gap-2.5 bg-white rounded-2xl border border-black/[0.06] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/40 transition-all p-3 overflow-hidden"
        >
          {cat.image ? (
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full aspect-square object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <span className="text-2xl">{cat.icon}</span>
          )}
          <span className="text-[11px] sm:text-xs font-medium text-zinc-700 text-center leading-tight">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FLASH SALE
// ═══════════════════════════════════════════════════════════════

function FlashSaleSection() {
  const sale = flashSaleData;

  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden">
      <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚡</span>
          <h2 className="text-lg font-black text-red-600">Flash Sale</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">Kết thúc trong</span>
          <CountdownTimer endTime={sale.endTime} size="sm" />
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {sale.products.map((p) => (
          <Link
            key={p.id}
            href={`/san-pham/${p.slug}`}
            className="group border border-red-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-red-200 transition-all"
          >
            <div className="aspect-square bg-zinc-50 overflow-hidden relative">
              <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
              <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md animate-pulse">
                -{calcDiscountPercent(p.price, p.originalPrice)}%
              </span>
            </div>
            <div className="p-3">
              <p className="text-xs text-zinc-700 font-medium line-clamp-1 mb-1">{p.name}</p>
              <p className="text-sm font-bold text-red-600">{formatVND(p.price)}</p>
              {p.originalPrice && (
                <p className="text-[11px] text-zinc-400 line-through">{formatVND(p.originalPrice)}</p>
              )}
              <div className="mt-2 h-1.5 bg-red-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${p.soldPercent}%` }} />
              </div>
              <p className="text-[10px] text-zinc-400 mt-0.5">Đã bán {p.soldPercent}%</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PRODUCT SECTION
// ═══════════════════════════════════════════════════════════════

function ProductSection({ title, icon, categorySlug }: { title: string; icon: string; categorySlug: string }) {
  const products = getProductsByCategory(categorySlug);
  if (products.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-1 h-6 bg-[#ff6b00] rounded-full" />
          <span className="text-xl">{icon}</span>
          <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
        </div>
        <Link href={`/danh-muc/${categorySlug}`} className="text-sm text-[#ff6b00] hover:underline flex items-center gap-1">
          Xem tất cả <ChevronRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DEAL BANNERS
// ═══════════════════════════════════════════════════════════════

function DealBanners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {dealBanners.map((b) => (
        <Link
          key={b.id}
          href={b.ctaHref}
          className="group rounded-2xl p-6 sm:p-8 flex flex-col justify-center min-h-[160px] relative overflow-hidden"
          style={{ background: b.gradient }}
        >
          {b.image && (
            <div className="absolute inset-0">
              <img
                src={b.image}
                alt={b.title}
                className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] w-auto object-contain opacity-50 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            </div>
          )}
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-1">{b.title}</h3>
            <p className="text-sm text-white/80 mb-4">{b.subtitle}</p>
            <span className="inline-flex items-center gap-2 bg-[#ff6b00] hover:bg-[#e85f00] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              {b.ctaLabel} <ArrowRight size={14} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SOCIAL PROOF
// ═══════════════════════════════════════════════════════════════

function SocialProof() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="w-1 h-6 bg-[#ff6b00] rounded-full" />
        <span className="text-xl">💬</span>
        <h2 className="text-xl font-bold text-zinc-900">Từ cộng đồng</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Sản phẩm", value: "500+", icon: "📷" },
          { label: "Đánh giá", value: "2.400+", icon: "⭐" },
          { label: "Khách hàng", value: "15.000+", icon: "👥" },
          { label: "Cửa hàng", value: "4", icon: "🏪" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-black/[0.06] p-4 text-center">
            <span className="text-xl">{s.icon}</span>
            <p className="text-lg font-black text-zinc-900 mt-1">{s.value}</p>
            <p className="text-[11px] text-zinc-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-black/[0.06] p-5">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={13} className={i <= r.rating ? "fill-amber-400 text-amber-400" : "text-zinc-200"} />
              ))}
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed mb-3">
              <Quote size={14} className="inline text-[#ff6b00] mr-1" />
              {r.comment}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-800">{r.authorName}</p>
                <p className="text-[10px] text-zinc-400">{r.productPurchased}</p>
              </div>
              {r.verified && (
                <span className="text-[10px] text-emerald-600 font-medium">✓ Đã mua</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN HOME PAGE
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <div className="bg-[#f8f8f8] pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 sm:pt-6 space-y-8 sm:space-y-10">

        <HeroSlider />
        <CategoryGrid />

        {/* Trust strip */}
        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-zinc-100">
          {[
            { icon: <Truck size={18} className="text-[#ff6b00]" />, title: "Giao hàng miễn phí", sub: "Đơn từ 500.000đ" },
            { icon: <Shield size={18} className="text-emerald-500" />, title: "BH chính hãng 24 tháng", sub: "Canon / Sony / Nikon..." },
            { icon: <Tag size={18} className="text-blue-500" />, title: "Giá tốt nhất", sub: "Cam kết hoàn tiền" },
            { icon: <RotateCcw size={18} className="text-amber-500" />, title: "Đổi trả 30 ngày", sub: "Không cần lý do" },
          ].map(p => (
            <div key={p.title} className="flex items-center gap-3 px-5 py-4">
              <div className="w-9 h-9 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0">{p.icon}</div>
              <div>
                <p className="text-sm font-semibold text-zinc-800 leading-tight">{p.title}</p>
                <p className="text-xs text-zinc-400">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <FlashSaleSection />
        <DealBanners />

        <ProductSection title="Máy ảnh Mirrorless" icon="📷" categorySlug="may-anh" />
        <ProductSection title="Ống kính Lens" icon="🔭" categorySlug="ong-kinh" />
        <ProductSection title="Flycam / Drone" icon="🚁" categorySlug="flycam" />
        <ProductSection title="Camera hành động" icon="🏃" categorySlug="action-camera" />

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-1 h-6 bg-[#ff6b00] rounded-full" />
              <h2 className="text-xl font-bold text-zinc-900">Tất cả sản phẩm</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <SocialProof />
      </div>
    </div>
  );
}