'use client';

import { useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star, ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  Zap, ShoppingCart, Phone, Heart, Shield, Truck, RotateCcw,
  CreditCard, Check, ZoomIn, Maximize2, Eye,
  Package, Camera, Minus, Plus, ArrowRight,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "../../../../lib/mock-data";
import { formatVND, calcDiscountPercent, calcInstallment } from "../../../../lib/shared-utils";
import { useCart } from "@/app/context/CartContext";
import NotFound from "@/app/not-found";

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= full ? "fill-amber-400 text-amber-400" : "text-zinc-200"} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GALLERY
// ═══════════════════════════════════════════════════════════════

function Gallery({ images, name }: { images: { url: string; alt: string }[]; name: string }) {
  const [active, setActive] = useState(0);
  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(images.length - 1, i + 1));

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl shadow-sm border border-black/[0.06] overflow-hidden">
        <div className="flex gap-0">
          {/* Thumbnails */}
          <div className="flex-col gap-2 p-3 border-r border-black/[0.06] shrink-0 hidden sm:flex">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  active === i ? "border-[#ff6b00] shadow-md shadow-orange-100" : "border-transparent hover:border-zinc-200"
                }`}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {/* Main */}
          <div className="relative flex-1 bg-zinc-50 aspect-square group">
            <img src={images[active]?.url} alt={name} className="w-full h-full object-contain p-6" />
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-50">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-50">
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all ${active === i ? "w-4 bg-[#ff6b00]" : "w-1.5 bg-zinc-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile thumbnails */}
      <div className="flex gap-2 sm:hidden overflow-x-auto px-1 pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
              active === i ? "border-[#ff6b00]" : "border-transparent"
            }`}
          >
            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PURCHASE CARD
// ═══════════════════════════════════════════════════════════════

function PurchaseCard({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const { addItem } = useCart();

  const discount = calcDiscountPercent(product.price, product.originalPrice);
  const monthly = calcInstallment(product.price, 6);

  const handleAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.thumbnail,
    }, qty);
  };

  const handleBuy = () => {
    handleAdd();
  };

  return (
    <div className="sticky top-[128px] space-y-3 self-start max-h-[calc(100vh-148px)] overflow-y-auto pr-1">
      <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6 space-y-5">
        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">{product.brand}</span>
              {product.mount && (
                <>
                  <span className="text-[10px] text-zinc-300">|</span>
                  <span className="text-[10px] text-zinc-400">{product.mount}</span>
                </>
              )}
            </div>
            <h1 className="text-[17px] font-bold text-zinc-900 leading-snug">{product.name}</h1>
          </div>
          <button
            onClick={() => setWishlist((v) => !v)}
            className={`mt-0.5 w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${wishlist ? "border-red-200 bg-red-50 text-red-500" : "border-zinc-200 text-zinc-400 hover:text-red-400 hover:border-red-200"}`}
          >
            <Heart size={16} fill={wishlist ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-3 flex-wrap">
            <Stars rating={product.rating.average} size={14} />
            <span className="text-sm font-semibold text-amber-500">{product.rating.average}</span>
            <span className="text-xs text-zinc-400">({product.rating.count} đánh giá)</span>
            <div className="w-px h-4 bg-zinc-200" />
            <span className={`text-xs font-semibold flex items-center gap-1 ${
              product.availability === "in_stock" ? "text-emerald-600" :
              product.availability === "pre_order" ? "text-blue-600" :
              "text-red-500"
            }`}>
              <Check size={11} />
              {product.availability === "in_stock" ? "Còn hàng" :
               product.availability === "pre_order" ? "Sắp về hàng" : "Hết hàng"}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-50/20 border border-orange-100 rounded-2xl px-5 py-4">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-[28px] font-black text-[#ff6b00] tracking-tight leading-none">{formatVND(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-zinc-400 line-through">{formatVND(product.originalPrice)}</span>
                <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">-{discount}%</span>
              </>
            )}
          </div>
          <p className="text-xs text-zinc-500">
            hoặc <strong className="text-zinc-700">{formatVND(monthly)}/tháng</strong> × 6 tháng (trả góp 0% lãi suất)
          </p>
        </div>

        {/* Specs summary */}
        {product.shortSpecs && product.shortSpecs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.shortSpecs.map((s) => (
              <span key={s} className="text-[11px] text-zinc-600 bg-zinc-50 px-2.5 py-1 rounded-lg border border-zinc-100">{s}</span>
            ))}
          </div>
        )}

        {/* Qty */}
        {product.availability === "in_stock" && (
          <div className="flex items-center gap-3">
            <div className="flex items-center border-2 border-zinc-200 rounded-xl overflow-hidden">
              <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-600" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-600" onClick={() => setQty((q) => q + 1)}>
                <Plus size={14} />
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="space-y-2.5">
          <button
            onClick={handleBuy}
            disabled={product.availability === "out_of_stock"}
            className="w-full h-12 bg-[#ff6b00] hover:bg-[#e85f00] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap size={16} fill="white" strokeWidth={0} />
            {product.availability === "pre_order" ? "ĐẶT HÀNG TRƯỚC" : "MUA NGAY"}
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleAdd}
              disabled={product.availability === "out_of_stock"}
              className="h-11 border-2 border-[#ff6b00] text-[#ff6b00] hover:bg-orange-50 font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <ShoppingCart size={15} /> Thêm vào giỏ
            </button>
            <button
              onClick={() => window.open("tel:0937148222")}
              className="h-11 border-2 border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone size={14} /> Tư vấn
            </button>
          </div>
        </div>

        {/* Trust */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100">
          {[
            { icon: <Shield size={15} className="text-emerald-600" />, text: "Bảo hành 24 tháng" },
            { icon: <Truck size={15} className="text-blue-500" />, text: "Miễn phí giao hàng" },
            { icon: <CreditCard size={15} className="text-purple-500" />, text: "Trả góp 0% lãi" },
            { icon: <RotateCcw size={15} className="text-amber-500" />, text: "Đổi trả 30 ngày" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2">
              <div className="w-7 h-7 bg-zinc-100 rounded-lg flex items-center justify-center shrink-0">{b.icon}</div>
              <span className="text-[11px] text-zinc-600 font-medium leading-tight">{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery info */}
      <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-4 space-y-3 text-xs">
        {[
          { icon: <Truck size={14} className="text-blue-500 shrink-0" />, text: "Giao trong ngày tại HN & HCM (đặt trước 15h)" },
          { icon: <Package size={14} className="text-zinc-400 shrink-0" />, text: "Tỉnh thành khác 1-3 ngày làm việc" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-start gap-2 text-zinc-600">{icon}{text}</div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BREADCRUMB
// ═══════════════════════════════════════════════════════════════

function Breadcrumb({ name, category }: { name: string; category: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-zinc-400 py-4 flex-wrap">
      <Link href="/" className="hover:text-[#ff6b00] transition-colors">Trang chủ</Link>
      <ChevronRight size={11} className="text-zinc-300" />
      <Link href="/san-pham" className="hover:text-[#ff6b00] transition-colors">Sản phẩm</Link>
      <ChevronRight size={11} className="text-zinc-300" />
      <span className="text-zinc-700 font-medium">{name}</span>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════
// RELATED PRODUCTS
// ═══════════════════════════════════════════════════════════════

function RelatedProducts({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
  const related = getRelatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#ff6b00] mb-1 block">Gợi ý</span>
          <h2 className="text-2xl font-bold text-zinc-900">Sản phẩm liên quan</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {related.map((p) => (
          <Link key={p.id} href={`/san-pham/${p.slug}`} className="group border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-orange-100 transition-all">
            <div className="aspect-square bg-zinc-50 overflow-hidden relative">
              <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
              {p.originalPrice && (
                <span className="absolute top-2.5 right-2.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  -{calcDiscountPercent(p.price, p.originalPrice)}%
                </span>
              )}
            </div>
            <div className="p-3.5">
              <p className="text-xs font-medium text-zinc-800 line-clamp-2 mb-2 min-h-[32px]">{p.name}</p>
              <p className="text-sm font-bold text-[#ff6b00]">{formatVND(p.price)}</p>
              {p.originalPrice && <p className="text-[11px] text-zinc-400 line-through">{formatVND(p.originalPrice)}</p>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAQ SECTION
// ═════════════════════════════════════════��═════════════════════

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "Có hỗ trợ trả góp 0% không?", a: "Có! Hỗ trợ trả góp 0% qua thẻ tín dụng ngân hàng: Techcombank, VPBank, Sacombank, HDBank kỳ hạn 6-24 tháng. Liên hệ hotline 0937 148 222." },
    { q: "Thời gian bảo hành chính hãng là bao lâu?", a: "Bảo hành 24 tháng chính hãng. LensPro bổ sung thêm 6 tháng bảo hành mở rộng, tổng cộng 30 tháng." },
    { q: "Giao hàng trong bao lâu?", a: "Hà Nội & TP.HCM: giao trong ngày (đặt trước 15h). Tỉnh thành khác: 1-3 ngày làm việc. Miễn phí giao hàng toàn quốc đơn từ 500.000đ." },
    { q: "Có thể đổi trả sản phẩm không?", a: "Đổi trả dễ dàng trong 30 ngày, không cần lý do. Hoàn tiền 100% giá trị sản phẩm." },
  ];

  return (
    <section className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
      <span className="text-xs font-semibold tracking-widest uppercase text-[#ff6b00] mb-1 block">Hỏi đáp</span>
      <h2 className="text-2xl font-bold text-zinc-900">Câu hỏi thường gặp</h2>
      <div className="mt-6 space-y-2">
        {faqs.map((f, i) => (
          <div key={i} className={`rounded-2xl border transition-colors ${open === i ? "border-orange-200 bg-orange-50/50" : "border-zinc-100 bg-zinc-50/50"}`}>
            <button className="w-full flex items-start justify-between gap-4 p-5 text-left" onClick={() => setOpen(open === i ? null : i)}>
              <span className="text-sm font-semibold text-zinc-800 leading-snug">{f.q}</span>
              <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${open === i ? "bg-[#ff6b00] text-white" : "bg-zinc-200 text-zinc-500"}`}>
                {open === i ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <p className="text-sm text-zinc-600 leading-relaxed">{f.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PDP
// ═══════════════════════════════════════════════════════════════

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = getProductBySlug(params.slug);

  if (!product) return <NotFound />;

  return (
    <div className="bg-[#f8f8f8] pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <Breadcrumb name={product.name} category={product.category} />
      </div>

      {/* 2-column layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-[55fr_45fr] gap-6 items-start">
          <Gallery images={product.images} name={product.name} />
          <PurchaseCard product={product} />
        </div>
      </div>

      {/* Below-fold sections */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 mt-4 space-y-4">
        {/* Short specs strip */}
        {product.shortSpecs && product.shortSpecs.length > 0 && (
          <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm px-4 py-3 grid grid-cols-3 sm:grid-cols-6 gap-1">
            {product.shortSpecs.map((s) => (
              <div key={s} className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl hover:bg-orange-50 transition-colors cursor-default text-center">
                <span className="text-xs font-bold text-zinc-900">{s}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── DESCRIPTION ─────────────────────────────────── */}
        {product.description && (
          <section className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#ff6b00] mb-1 block">Giới thiệu</span>
            <h2 className="text-2xl font-bold text-zinc-900 leading-tight">{product.name}</h2>
            <p className="mt-4 text-sm text-zinc-600 leading-relaxed">{product.description}</p>
            {product.highlights && product.highlights.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 bg-zinc-50 rounded-xl px-4 py-2.5 border border-zinc-100">
                    <Check size={13} className="text-[#ff6b00] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-zinc-700 leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── FULL SPECS TABLE ────────────────────────────── */}
        {product.specs && product.specs.length > 0 && (
          <section className="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-zinc-100">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#ff6b00] mb-1 block">Kỹ thuật</span>
              <h2 className="text-2xl font-bold text-zinc-900">Thông số kỹ thuật</h2>
            </div>
            <div className="divide-y divide-zinc-100">
              {product.specs.map((group) => (
                <div key={group.group}>
                  <div className="bg-zinc-50 px-8 py-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{group.group}</span>
                  </div>
                  {group.items.map((item, i) => (
                    <div key={item.label} className={`flex px-8 py-3 text-sm gap-4 ${i % 2 === 0 ? "" : "bg-zinc-50/40"}`}>
                      <span className="w-[200px] shrink-0 font-medium text-zinc-600">{item.label}</span>
                      <span className="text-zinc-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── IN THE BOX ──────────────────────────────────── */}
        {product.packageIncludes && product.packageIncludes.length > 0 && (
          <section className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#ff6b00] mb-1 block">Phụ kiện đi kèm</span>
            <h2 className="text-2xl font-bold text-zinc-900">Trong hộp bao gồm</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.packageIncludes.map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm text-zinc-500">
                    <Package size={18} />
                  </div>
                  <p className="text-xs font-medium text-zinc-700 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <RelatedProducts product={product} />
        <FAQSection />

        {/* Guarantees */}
        <section className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,0,0.15),_transparent_60%)]" />
          <div className="relative z-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-1 block">Cam kết</span>
            <h2 className="text-2xl font-bold text-white">Dịch vụ đi kèm từ LENS PRO</h2>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Shield size={24} />, title: "Bảo hành 24 tháng", sub: "Chính hãng\n+6 tháng từ LENS PRO" },
                { icon: <RotateCcw size={24} />, title: "Đổi trả 30 ngày", sub: "Không câu hỏi\nHoàn tiền 100%" },
                { icon: <Truck size={24} />, title: "Ship nhanh trong ngày", sub: "HN & HCM đặt trước 15h\nMiễn phí" },
                { icon: <Phone size={24} />, title: "Hỗ trợ kỹ thuật", sub: "Hotline 0937 148 222\nTrọn đời" },
              ].map((g) => (
                <div key={g.title} className="bg-white/5 hover:bg-white/10 rounded-2xl p-5 transition-colors">
                  <div className="w-10 h-10 bg-[#ff6b00]/20 rounded-xl flex items-center justify-center text-[#ff6b00] mb-4">{g.icon}</div>
                  <p className="font-bold text-sm text-white mb-1.5">{g.title}</p>
                  {g.sub.split("\n").map((line) => (
                    <p key={line} className="text-xs text-zinc-400 leading-relaxed">{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}