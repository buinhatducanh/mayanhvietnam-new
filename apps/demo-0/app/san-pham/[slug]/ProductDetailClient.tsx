"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  categories,
  getByCategory,
  getProductUrl,
  formatVND,
  Product,
} from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function ProductDetailClient({ product: p }: { product: Product }) {
  const router = useRouter();
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const { addItem } = useCart();

  const catObj = categories.find((c) => c.slug === p.category);
  const catName = catObj ? catObj.name : "Sản phẩm";
  const catHref = catObj ? `/danh-muc#${catObj.slug}` : "/danh-muc";

  const gallery = (p.gallery && p.gallery.length ? p.gallery : [p.thumbnail]).filter(Boolean);
  const currentImage = gallery[Math.min(imageIndex, gallery.length - 1)] || p.thumbnail;

  const hasDiscount = !!p.originalPrice && p.originalPrice > p.price && !p.callForPrice;
  const discountLabel = p.originalPrice ? `-${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%` : "";
  const priceLabel = p.callForPrice ? "Liên hệ" : formatVND(p.price);
  const origLabel = p.originalPrice ? formatVND(p.originalPrice) : "";
  const savedLabel = p.originalPrice ? formatVND(p.originalPrice - p.price) : "";

  const hasPromos = p.promotions && p.promotions.length > 0;
  const hasHighlights = p.highlights && p.highlights.length > 0;
  const hasIncluded = p.packageIncludes && p.packageIncludes.length > 0;
  const hasSpecs = p.specs && p.specs.length > 0;
  const hasOnlyShortSpecs = !hasSpecs && p.shortSpecs && p.shortSpecs.length > 0;

  // Badge styles
  const badgeBg = (t: string) => (t === "hot" ? "#e2483d" : t === "sale" ? "#ff6a00" : "#1a9e5c");

  // Related products
  const relatedPool = getByCategory(p.category).filter((x) => x.id !== p.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(p, quantity);
    setToastMsg("Đã thêm vào giỏ hàng!");
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleBuyNow = () => {
    addItem(p, quantity);
    router.push("/thanh-toan");
  };

  return (
    <div className="font-sans bg-[#fafaf8] text-[#16130f] min-h-screen">
      <SiteHeader active={p.category} />

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12.5px] text-[#a39d94]">
          <Link href="/" className="text-[#a39d94] no-underline hover:text-[#ff6a00]">Trang chủ</Link>
          <span>/</span>
          <Link href={catHref} className="text-[#a39d94] no-underline hover:text-[#ff6a00]">{catName}</Link>
          <span>/</span>
          <span className="text-[#16130f] font-semibold truncate max-w-[420px]">{p.name}</span>
        </nav>
      </div>

      {/* Top details: gallery + main info */}
      <section data-screen-label="Chi tiết sản phẩm" className="max-w-[1280px] mx-auto px-8 pt-6 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
        {/* Gallery */}
        <div className="sticky top-[132px]">
          <div className="relative border border-[#e9e6e1] bg-white rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
            <img key={currentImage} src={currentImage} alt={p.name} className="w-full h-full object-contain p-7 animate-rise-in" />
            {hasDiscount && (
              <span className="absolute left-4 top-4 text-[11.5px] font-extrabold text-white bg-[#ff6a00] rounded-full px-3 py-1.2 shadow-[0_8px_18px_-6px_rgba(255,106,0,0.6)]">
                {discountLabel}
              </span>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-2.5 mt-3 flex-wrap">
              {gallery.map((g, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageIndex(idx)}
                  aria-label="Xem ảnh"
                  style={{ borderColor: imageIndex === idx ? "#ff6a00" : "#e9e6e1" }}
                  className="w-[72px] h-[72px] rounded-[13px] border-1.5 bg-white cursor-pointer overflow-hidden p-0 transition-all hover:border-[rgba(255,106,0,0.6)] hover:-translate-y-[2px]"
                >
                  <img src={g} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info detail */}
        <div>
          <div className="flex flex-wrap gap-1.5">
            {p.badges.map((b, idx) => (
              <span
                key={idx}
                style={{ background: badgeBg(b.type) }}
                className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-white rounded-full px-3 py-1.2"
              >
                {b.label}
              </span>
            ))}
          </div>
          <h1 className="mt-3.5 mb-0 text-[32px] font-bold leading-[1.2] tracking-[-0.015em] text-[#16130f]">{p.name}</h1>

          <div className="flex items-center gap-3.5 mt-2.5 text-[13.5px] text-[#7a746c]">
            <span className="flex items-center gap-1.2"><span className="text-[#ff6a00]">★★★★★</span> {p.rating ? `${p.rating.average} (${p.rating.count} đánh giá)` : "Chưa có đánh giá"}</span>
            <span className="w-1 h-1 rounded-full bg-[#dcd8d2]" />
            <span className="text-[#1a9e5c] font-semibold">✓ Còn hàng</span>
            <span className="w-1 h-1 rounded-full bg-[#dcd8d2]" />
            <span className="font-mono text-[11px] text-[#a39d94]">SKU: MNV-{p.id.toUpperCase()}</span>
          </div>

          {/* Price card */}
          <div className="mt-5 border border-[#e9e6e1] bg-white rounded-[18px] p-[20px_24px]">
            <div className="flex items-baseline gap-3.5">
              <span className="text-[34px] font-bold tracking-[-0.01em] text-[#ff6a00]">{priceLabel}</span>
              {hasDiscount && (
                <>
                  <span className="text-[17px] text-[#a39d94] line-through">{origLabel}</span>
                  <span className="text-[12.5px] font-semibold text-[#1a9e5c]">Tiết kiệm {savedLabel}</span>
                </>
              )}
            </div>
            <p className="mt-2.5 mb-0 text-[12.5px] text-[#a39d94]">Giá đã bao gồm VAT · Bảo hành chính hãng {p.warrantyMonths || 12} tháng</p>
          </div>

          {/* Promotions */}
          {hasPromos && (
            <div className="mt-3.5 border border-[rgba(255,106,0,0.3)] bg-[rgba(255,106,0,0.05)] rounded-[18px] p-[18px_24px]">
              <p className="m-0 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c85200]">Khuyến mãi kèm theo</p>
              <div className="flex flex-col gap-2 mt-2.5">
                {p.promotions?.map((pm, idx) => (
                  <p key={idx} className="m-0 text-[14px] text-[#16130f]">{pm}</p>
                ))}
              </div>
            </div>
          )}

          {/* highlights */}
          {hasHighlights && (
            <div className="mt-8">
              <h3 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6a00]">Đặc điểm nổi bật</h3>
              <ul className="list-none mt-3.5 m-0 p-0 flex flex-col gap-2.5">
                {p.highlights?.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[14.5px] leading-[1.5] text-[#5f5a53]">
                    <span className="text-[#ff6a00] font-bold shrink-0">✓</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity picker */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-[12px] font-semibold text-[#7a746c]">Số lượng:</span>
            <div className="flex items-center border border-[#e2ddd6] rounded-xl bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 border-none bg-transparent text-[#7a746c] cursor-pointer flex items-center justify-center transition-colors hover:text-[#ff6a00] hover:bg-[#fff8f0]"
                aria-label="Giảm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <path d="M5 12h14" />
                </svg>
              </button>
              <span className="w-12 text-center text-[15px] font-bold text-[#16130f] border-l border-r border-[#e9e6e1]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 border-none bg-transparent text-[#7a746c] cursor-pointer flex items-center justify-center transition-colors hover:text-[#ff6a00] hover:bg-[#fff8f0]"
                aria-label="Tăng"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-3.5 flex-wrap">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 min-w-[200px] h-[52px] rounded-2xl bg-[#ff6a00] text-white border-none text-[15px] font-bold cursor-pointer transition-all hover:bg-[#ea6100] hover:-translate-y-[2px] hover:shadow-[0_16px_32px_-12px_rgba(255,106,0,0.55)] active:scale-[0.98]"
            >
              Thêm vào giỏ hàng
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="h-[52px] px-6 rounded-2xl bg-[#16130f] text-white border-none text-[15px] font-bold cursor-pointer transition-all hover:bg-[#0e0c0a] hover:-translate-y-[1px] active:scale-[0.98]"
            >
              Mua ngay
            </button>
          </div>

          {/* Trust services */}
          <div className="grid grid-cols-2 gap-2 mt-6">
            {[
              { label: "Bảo hành chính hãng 24 tháng", icon: "🛡" },
              { label: "Freeship đơn từ 5 triệu", icon: "🚚" },
              { label: "Trả góp 0% lãi suất", icon: "💳" },
              { label: "Đổi trả trong 7 ngày", icon: "↩" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-[#e9e6e1] text-[12.5px] text-[#5f5a53]">
                <span className="text-[15px] shrink-0">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>

          {/* Toast */}
          {toastMsg && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#16130f] text-white text-[13.5px] font-semibold shadow-[0_12px_40px_-12px_rgba(22,19,15,0.45)] animate-[fadeIn_0.2s_ease-out]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a9e5c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {toastMsg}
            </div>
          )}
        </div>
      </section>

      {/* Middle: specifications + package included */}
      {(hasIncluded || hasSpecs) && (
        <section className="max-w-[1280px] mx-auto px-8 pt-20 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          {/* Detailed specs */}
          {hasSpecs && (
            <div>
              <h2 className="m-0 text-[26px] font-bold tracking-[-0.015em]">Thông số kỹ thuật chi tiết</h2>
              <div className="mt-6 flex flex-col gap-7">
                {p.specs?.map((group, gIdx) => (
                  <div key={gIdx} className="border border-[#e9e6e1] bg-white rounded-2xl overflow-hidden">
                    <div className="bg-[#f7f5f1] border-b border-[#e9e6e1] px-5 py-3 font-semibold text-[13.5px] uppercase tracking-[0.08em] text-[#7a746c]">
                      {group.group}
                    </div>
                    <div className="flex flex-col">
                      {group.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="grid grid-cols-[180px_1fr] gap-4 px-5 py-3 border-t border-[#f1eee9] first:border-none text-[13.5px]"
                        >
                          <span className="font-semibold text-[#7a746c]">{item.label}</span>
                          <span className="text-[#16130f]">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Included package */}
          {hasIncluded && (
            <div className="border border-[#e9e6e1] bg-white rounded-2xl p-6">
              <h3 className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#ff6a00]">Trong hộp gồm có</h3>
              <div className="flex flex-col gap-3 mt-4">
                {p.packageIncludes?.map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-3 border-t border-[#f1eee9] first:border-none pt-3 first:pt-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] shrink-0" />
                    <span className="text-[13.5px] text-[#5f5a53]">{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Specs fallback */}
      {hasOnlyShortSpecs && (
        <section className="max-w-[1280px] mx-auto px-8 pt-[72px]">
          <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6a00]">Thông số chính</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {p.shortSpecs.map((s, idx) => (
              <span key={idx} className="font-mono text-[12px] text-[#5f5a53] border border-[#e9e6e1] bg-white rounded-full px-4 py-2">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Description */}
      {p.description && (
        <section className="max-w-[1280px] mx-auto px-8 pt-[72px]">
          <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6a00]">Giới thiệu sản phẩm</p>
          <p className="mt-4 mb-0 max-w-[860px] text-[15px] leading-[1.7] text-[#5f5a53]">{p.description}</p>
        </section>
      )}

      {/* Related Products */}
      {relatedPool.length > 0 && (
        <section data-screen-label="Sản phẩm liên quan" className="max-w-[1280px] mx-auto px-8 pt-[88px]">
          <div className="flex items-end justify-between gap-5 flex-wrap">
            <div>
              <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6a00]">Có thể bạn quan tâm</p>
              <h2 className="mt-2.5 mb-0 text-[30px] font-light tracking-[-0.02em] text-[#16130f]">Sản phẩm liên quan</h2>
            </div>
            <Link href={catHref} className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#7a746c] no-underline transition-all hover:text-[#ff6a00] hover:gap-3">
              Xem tất cả <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="mt-[26px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {relatedPool.map((pr) => (
              <div
                key={pr.id}
                className="group relative flex flex-col border border-[#e9e6e1] bg-white rounded-[18px] overflow-hidden transition-all hover:border-[rgba(255,106,0,0.45)] hover:-translate-y-[4px] hover:shadow-[0_24px_48px_-22px_rgba(255,106,0,0.42)]"
              >
                <Link href={`/${getProductUrl(pr.slug)}`} className="block aspect-square bg-white overflow-hidden">
                  <img src={pr.thumbnail} alt={pr.name} className="w-full h-full object-contain p-4 transition-transform duration-400 group-hover:scale-[1.06]" />
                </Link>
                <div className="flex flex-col flex-1 p-3.5 pt-2.5 border-t border-[#f1eee9]">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a39d94]">{pr.brand}</span>
                  <Link href={`/${getProductUrl(pr.slug)}`} className="mt-1 text-[14px] font-medium leading-[1.38] text-[#16130f] line-clamp-2 min-h-[39px] no-underline hover:text-[#ff6a00]">
                    {pr.name}
                  </Link>
                  <span className="mt-2 text-[15.5px] font-bold text-[#ff6a00]">{pr.callForPrice ? "Liên hệ" : formatVND(pr.price)}</span>
                  <button
                    type="button"
                    onClick={() => addItem(pr, 1)}
                    className="mt-2.5 w-full h-9 rounded-xl bg-[rgba(255,106,0,0.08)] border border-[rgba(255,106,0,0.25)] text-[#c85200] text-[12.5px] font-bold cursor-pointer flex items-center justify-center gap-1.5 transition-all hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00]"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="h-[96px]" />
      <SiteFooter />
    </div>
  );
}
