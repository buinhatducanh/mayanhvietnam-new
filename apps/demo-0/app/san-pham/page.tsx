"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { 
  products, 
  categories, 
  getByCategory,
  getBySlug,
  getProductUrl, 
  formatVND, 
  discountOf,
  Product
} from "@/lib/products";

export default function ProductDetailPage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  // Sync state with hash change
  useEffect(() => {
    const handleHash = () => {
      const h = decodeURIComponent((window.location.hash || "").replace("#", ""));
      if (h === "canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang") {
        router.replace("/may-anh-canon-r50");
        return;
      }
      if (h === "flycam-dji-mavic-air-2-chinh-hang") {
        router.replace("/flycam-dji");
        return;
      }
      if (h === "insta360-one-rs-1-inch-360-edition") {
        router.replace("/action-camera-insta360");
        return;
      }

      setSlug(h);
      setImageIndex(0);
      window.scrollTo({ top: 0 });
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [router]);

  // Fallback to Canon R50 if no slug is provided or found
  const activeSlug = slug || "canon-eos-r6-mark-ii-body-only";
  const p = getBySlug(activeSlug) || products[0];

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

          {/* Actions */}
          <div className="mt-8 flex items-center gap-3.5 flex-wrap">
            <button type="button" className="flex-1 min-w-[200px] h-[52px] rounded-2xl bg-[#ff6a00] text-white border-none text-[15px] font-bold cursor-pointer transition-all hover:bg-[#ea6100] hover:-translate-y-[2px] hover:shadow-[0_16px_32px_-12px_rgba(255,106,0,0.55)] active:scale-[0.98]">
              Thêm vào giỏ hàng
            </button>
            <button type="button" className="h-[52px] px-6 rounded-2xl border border-[#dcd8d2] bg-white text-[#16130f] text-[15px] font-bold cursor-pointer transition-all hover:border-[#ff6a00] hover:text-[#ff6a00] hover:-translate-y-[1px] active:scale-[0.98]">
              Mua trả góp 0%
            </button>
          </div>
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
              <Link 
                key={pr.id}
                href={`/${getProductUrl(pr.slug)}`}
                className="relative flex flex-col border border-[#e9e6e1] bg-white rounded-[18px] overflow-hidden no-underline transition-all hover:border-[rgba(255,106,0,0.45)] hover:-translate-y-[4px] hover:shadow-[0_24px_48px_-22px_rgba(255,106,0,0.42)]"
              >
                <span className="block aspect-square bg-white overflow-hidden">
                  <img src={pr.thumbnail} alt={pr.name} className="w-full h-full object-contain p-4 transition-transform duration-400 hover:scale-[1.06]" />
                </span>
                <span className="flex flex-col flex-1 p-3.5 pt-2.5 border-t border-[#f1eee9]">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a39d94]">{pr.brand}</span>
                  <span className="mt-1 text-[14px] font-medium leading-[1.38] text-[#16130f] line-clamp-2 min-h-[39px]">{pr.name}</span>
                  <span className="mt-2.2 text-[15.5px] font-bold text-[#ff6a00]">{formatVND(pr.price)}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="h-[96px]" />
      <SiteFooter />
    </div>
  );
}
