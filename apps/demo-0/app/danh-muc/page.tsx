"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { 
  products, 
  categories, 
  categoryBanners, 
  getProductUrl, 
  formatVND, 
  discountOf,
  Product
} from "@/lib/products";

const PRICE_RANGES = [
  { id: "all", label: "Tất cả mức giá", min: 0, max: Infinity },
  { id: "p1", label: "Dưới 15 triệu", min: 0, max: 15000000 },
  { id: "p2", label: "15 – 40 triệu", min: 15000000, max: 40000000 },
  { id: "p3", label: "40 – 70 triệu", min: 40000000, max: 70000000 },
  { id: "p4", label: "Trên 70 triệu", min: 70000000, max: Infinity },
];

export default function CategoryPage() {
  const [cat, setCat] = useState("tat-ca");
  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");
  const [bnPage, setBnPage] = useState(0);

  const bnPaused = useRef(false);
  const autoBnTimer = useRef<NodeJS.Timeout | null>(null);

  // Sync with window hash change for categories
  useEffect(() => {
    const handleHash = () => {
      const h = decodeURIComponent((window.location.hash || "").replace("#", ""));
      const valid = ["tat-ca", ...categories.map((c) => c.slug)];
      const activeCat = valid.includes(h) ? h : "tat-ca";
      setCat(activeCat);
      setBrands([]);
      setPrice("all");
      setBnPage(0);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const getBanners = (slug: string) => {
    if (slug === "tat-ca") {
      return ["may-anh", "flycam", "action-camera", "ong-kinh"].flatMap((k) => (categoryBanners[k] || []).slice(0, 2));
    }
    return categoryBanners[slug] || [];
  };

  const banners = getBanners(cat);
  const bnCount = banners.length;
  const bnMax = Math.max(0, bnCount - 3);
  const hasBanners = bnCount > 0;
  const hasBnNav = bnCount > 3;

  // Auto scroll banners
  useEffect(() => {
    if (autoBnTimer.current) clearInterval(autoBnTimer.current);

    autoBnTimer.current = setInterval(() => {
      if (bnPaused.current || bnMax <= 0) return;
      setBnPage((p) => (p >= bnMax ? 0 : p + 1));
    }, 3800);

    return () => {
      if (autoBnTimer.current) clearInterval(autoBnTimer.current);
    };
  }, [bnMax]);

  const catObj = categories.find((c) => c.slug === cat);
  const catName = catObj ? catObj.name : "Tất cả sản phẩm";
  const catDesc = catObj ? catObj.description : "Toàn bộ máy ảnh, ống kính, flycam và action camera chính hãng đang có mặt tại Máy Ảnh Việt Nam.";

  // Filter products
  const pool = (cat === "tat-ca" ? products : products.filter((p) => p.category === cat)).filter((p) => p.thumbnail);

  // Get brand count based on the current category pool
  const brandCounts: Record<string, number> = {};
  pool.forEach((p) => {
    brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
  });
  const allBrands = Object.keys(brandCounts).sort();

  const range = PRICE_RANGES.find((r) => r.id === price) || PRICE_RANGES[0];
  let filteredItems = pool.filter((p) =>
    (brands.length === 0 || brands.includes(p.brand)) &&
    p.price >= range.min && p.price < range.max
  );

  // Sort products
  if (sort === "asc") {
    filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);
  }

  const resultCount = String(filteredItems.length).padStart(2, "0");

  const clearFilters = () => {
    setBrands([]);
    setPrice("all");
  };

  const hasFilters = brands.length > 0 || price !== "all";
  const empty = filteredItems.length === 0;

  // Nav categories mapping
  const navMap: Record<string, string> = { "may-anh": "may-anh", "ong-kinh": "ong-kinh", "flycam": "flycam", "action-camera": "action-camera" };
  const activeNav = navMap[cat] || "home";

  const badgeBg = (t: string) => (t === "hot" ? "#e2483d" : t === "sale" ? "#ff6a00" : "#1a9e5c");

  const actualPage = Math.min(bnPage, bnMax);
  const bnOffset = `${-(actualPage * (100 / 3)).toFixed(4)}%`;

  return (
    <div className="font-sans bg-[#fafaf8] text-[#16130f] min-h-screen">
      <SiteHeader active={activeNav} />

      {/* Page head */}
      <section data-screen-label="Đầu trang danh mục" className="bg-white border-b border-[#e9e6e1]">
        <div className="max-w-[1280px] mx-auto px-8 py-9 pb-[30px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12.5px] text-[#a39d94]">
            <Link href="/" className="text-[#a39d94] no-underline hover:text-[#ff6a00]">Trang chủ</Link>
            <span>/</span>
            <span className="text-[#16130f] font-semibold">{catName}</span>
          </nav>
          
          <div className="flex items-end justify-between gap-6 mt-[18px] flex-wrap">
            <div>
              <h1 className="m-0 text-[42px] font-extralight tracking-[-0.02em]">{catName}</h1>
              <p className="mt-2 mb-0 max-w-[560px] text-[14.5px] font-light leading-[1.6] text-[#7a746c]">{catDesc}</p>
            </div>
            <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#a39d94]">{resultCount} sản phẩm</p>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[{ slug: "tat-ca", name: "Tất cả" }, ...categories].map((c) => {
              const on = cat === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => {
                    window.location.hash = c.slug;
                    setCat(c.slug);
                    setBrands([]);
                    setPrice("all");
                  }}
                  style={{
                    borderColor: on ? "#ff6a00" : "#e9e6e1",
                    background: on ? "#ff6a00" : "#ffffff",
                    color: on ? "#ffffff" : "#5f5a53",
                  }}
                  className="h-9 px-4 rounded-full border text-[13px] font-semibold cursor-pointer transition-all hover:border-[rgba(255,106,0,0.55)] hover:-translate-y-[1px]"
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category banner slider */}
      {hasBanners && (
        <section data-screen-label="Banner danh mục" className="max-w-[1280px] mx-auto px-8 pt-[26px]">
          <div 
            onMouseEnter={() => { bnPaused.current = true; }} 
            onMouseLeave={() => { bnPaused.current = false; }} 
            className="relative"
          >
            <div className="overflow-hidden mx-[-5px]">
              <div 
                style={{ transform: `translateX(${bnOffset})` }}
                className="flex transition-transform duration-550 cubic-bezier(0.22,1,0.36,1) will-change-transform"
              >
                {banners.map((bn, idx) => (
                  <Link 
                    key={idx}
                    href={bn.href} 
                    title={bn.title} 
                    className="flex-[0_0_33.3333%] min-w-[33.3333%] px-[5px] no-underline block"
                  >
                    <span className="block overflow-hidden rounded-[14px] border border-[#e9e6e1] bg-[#0b0a09] transition-all hover:border-[rgba(255,106,0,0.5)] hover:shadow-[0_20px_40px_-20px_rgba(255,106,0,0.45)] hover:-translate-y-[3px]">
                      <img src={bn.image} alt={bn.title} className="w-full aspect-[1305/435] object-cover block" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {hasBnNav && (
              <>
                <button 
                  type="button" 
                  aria-label="Banner trước" 
                  onClick={() => setBnPage((p) => (p === 0 ? bnMax : p - 1))}
                  className="absolute left-[-2px] top-[50%] -translate-y-[50%] z-10 w-9 h-9 rounded-full border border-[#e9e6e1] bg-[rgba(255,255,255,0.92)] backdrop-blur-[6px] text-[#5f5a53] cursor-pointer flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(22,19,15,0.35)] transition-all hover:bg-[#ff6a00] hover:border-[#ff6a00] hover:text-white hover:-translate-y-[50%] hover:scale-[1.1]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
                </button>
                <button 
                  type="button" 
                  aria-label="Banner sau" 
                  onClick={() => setBnPage((p) => (p >= bnMax ? 0 : p + 1))}
                  className="absolute right-[-2px] top-[50%] -translate-y-[50%] z-10 w-9 h-9 rounded-full border border-[#e9e6e1] bg-[rgba(255,255,255,0.92)] backdrop-blur-[6px] text-[#5f5a53] cursor-pointer flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(22,19,15,0.35)] transition-all hover:bg-[#ff6a00] hover:border-[#ff6a00] hover:text-white hover:-translate-y-[50%] hover:scale-[1.1]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
                </button>
                <div className="flex justify-center gap-1.5 mt-3">
                  {Array.from({ length: bnMax + 1 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Trang banner ${i + 1}`}
                      onClick={() => setBnPage(i)}
                      style={{
                        width: i === actualPage ? "22px" : "6px",
                        background: i === actualPage ? "#ff6a00" : "#dcd8d2",
                      }}
                      className="h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Body grids */}
      <section data-screen-label="Lưới sản phẩm" className="max-w-[1280px] mx-auto px-8 pt-9 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-7 items-start">
        {/* Sidebar filters */}
        <aside className="sticky top-[132px] flex flex-col gap-[22px]">
          <div className="border border-[#e9e6e1] bg-white rounded-2xl p-[18px_20px]">
            <h3 className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#ff6a00]">Thương hiệu</h3>
            <div className="flex flex-col gap-1 mt-3">
              {allBrands.map((b) => {
                const on = brands.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setBrands((prev) => on ? prev.filter((x) => x !== b) : [...prev, b]);
                    }}
                    style={{ background: on ? "rgba(255,106,0,0.06)" : "transparent" }}
                    className="flex items-center gap-2.5 p-2 rounded-lg border-none cursor-pointer text-left transition-colors hover:bg-[#f5f2ed]"
                  >
                    <span 
                      style={{
                        borderColor: on ? "#ff6a00" : "#dcd8d2",
                        background: on ? "#ff6a00" : "#ffffff",
                      }}
                      className="w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all"
                    >
                      {on && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                      )}
                    </span>
                    <span className="text-[13.5px] font-medium text-[#16130f] flex-1">{b}</span>
                    <span className="font-mono text-[10px] text-[#a39d94]">{String(brandCounts[b]).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border border-[#e9e6e1] bg-white rounded-2xl p-[18px_20px]">
            <h3 className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#ff6a00]">Khoảng giá</h3>
            <div className="flex flex-col gap-1 mt-3">
              {PRICE_RANGES.map((r) => {
                const on = price === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setPrice(r.id)}
                    style={{ background: on ? "rgba(255,106,0,0.06)" : "transparent" }}
                    className="flex items-center gap-2.5 p-2 rounded-lg border-none cursor-pointer text-left transition-colors hover:bg-[#f5f2ed]"
                  >
                    <span 
                      style={{ borderColor: on ? "#ff6a00" : "#dcd8d2" }}
                      className="w-[15px] h-[15px] rounded-full border flex items-center justify-center shrink-0"
                    >
                      {on && (
                        <span className="w-[7px] h-[7px] rounded-full bg-[#ff6a00]" />
                      )}
                    </span>
                    <span className="text-[13.5px] font-medium text-[#16130f]">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border border-[rgba(255,106,0,0.3)] bg-[rgba(255,106,0,0.05)] rounded-2xl p-[18px_20px]">
            <p className="m-0 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c85200]">Cần tư vấn?</p>
            <p className="mt-2 mb-0 text-[13px] leading-[1.55] text-[#7a746c]">Đội ngũ kỹ thuật viên sẵn sàng hỗ trợ chọn máy phù hợp.</p>
            <a href="tel:0937148222" className="inline-flex items-center gap-2 mt-3 text-[15px] font-extrabold text-[#ff6a00] no-underline">✆ 0937.148.222</a>
          </div>
        </aside>

        {/* Product grid list */}
        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              {[
                { id: "featured", label: "Nổi bật" },
                { id: "asc", label: "Giá tăng dần" },
                { id: "desc", label: "Giá giảm dần" },
              ].map((s) => {
                const on = sort === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSort(s.id)}
                    style={{
                      borderColor: on ? "#ff6a00" : "#e9e6e1",
                      background: on ? "rgba(255,106,0,0.08)" : "#ffffff",
                      color: on ? "#c85200" : "#5f5a53",
                    }}
                    className="h-[34px] px-3.5 rounded-[10px] border text-[12.5px] font-semibold cursor-pointer transition-all hover:border-[rgba(255,106,0,0.55)]"
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
            {hasFilters && (
              <button 
                type="button" 
                onClick={clearFilters}
                className="h-[34px] px-3.5 rounded-[10px] border-none bg-transparent text-[#a39d94] text-[12.5px] font-semibold cursor-pointer underline transition-colors hover:text-[#e2483d]"
              >
                Xoá bộ lọc ✕
              </button>
            )}
          </div>

          {/* Grid items */}
          <div 
            key={`${cat}-${sort}-${brands.join(",")}-${price}`}
            className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 animate-rise-in"
          >
            {filteredItems.map((p) => {
              const discount = discountOf(p);
              const pUrl = getProductUrl(p.slug);
              return (
                <Link 
                  key={p.id}
                  href={`/${pUrl}`}
                  className="relative flex flex-col border border-[#e9e6e1] bg-white rounded-[18px] overflow-hidden no-underline transition-all hover:border-[rgba(255,106,0,0.45)] hover:-translate-y-[4px] hover:shadow-[0_24px_48px_-22px_rgba(255,106,0,0.42)]"
                >
                  <span className="absolute left-2.5 top-2.5 z-[2] flex flex-col gap-1 items-start">
                    {p.badges.slice(0, 1).map((b, idx) => (
                      <span key={idx} style={{ background: badgeBg(b.type) }} className="text-[9px] font-extrabold uppercase tracking-[0.04em] text-white rounded-full px-2.2 py-[3.5px]">
                        {b.label}
                      </span>
                    ))}
                  </span>
                  {discount > 0 && (
                    <span className="absolute right-2.5 top-2.5 z-[2] text-[10px] font-extrabold text-white bg-[#ff6a00] rounded-full px-2 py-[3.5px] shadow-[0_6px_14px_-6px_rgba(255,106,0,0.7)]">-{discount}%</span>
                  )}
                  <span className="block aspect-square bg-white overflow-hidden">
                    <img src={p.thumbnail} alt={p.name} className="w-full h-full object-contain p-4 transition-transform duration-400 hover:scale-[1.06]" />
                  </span>
                  <span className="flex flex-col flex-1 p-[14px_16px_16px] border-t border-[#f1eee9]">
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a39d94]">{p.brand}</span>
                    <span className="mt-1 text-[14.5px] font-medium leading-[1.38] text-[#16130f] line-clamp-2 min-h-[40px]">{p.name}</span>
                    <span className="mt-1.5 text-[11.5px] text-[#a39d94] truncate">{(p.shortSpecs || []).slice(0, 3).join(" · ")}</span>
                    <span className="mt-2.5 flex items-baseline gap-2">
                      <span className="text-[16px] font-extrabold text-[#ff6a00]">{formatVND(p.price)}</span>
                      {p.originalPrice && p.originalPrice > p.price && (
                        <span className="text-[12px] text-[#a39d94] line-through">{formatVND(p.originalPrice)}</span>
                      )}
                    </span>
                    {p.rating && (
                      <span className="mt-2 flex items-center gap-1 text-[12px] text-[#7a746c]"><span className="text-[#ff6a00]">★</span> {p.rating.average} ({p.rating.count} đánh giá)</span>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>

          {empty && (
            <div className="mt-5 border border-dashed border-[#dcd8d2] rounded-[18px] bg-white py-16 px-6 text-center">
              <p className="m-0 text-[16px] font-semibold text-[#16130f]">Không có sản phẩm phù hợp bộ lọc</p>
              <p className="mt-2 mb-0 text-[13.5px] text-[#a39d94]">Thử bỏ bớt bộ lọc thương hiệu hoặc khoảng giá.</p>
              <button 
                type="button" 
                onClick={clearFilters}
                className="mt-4 h-10 px-[22px] rounded-xl border border-[#dcd8d2] bg-white text-[#16130f] text-[13.5px] font-semibold cursor-pointer transition-all hover:border-[rgba(255,106,0,0.5)] hover:text-[#ff6a00]"
              >
                Xoá tất cả bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="h-[96px]" />
      <SiteFooter />
    </div>
  );
}
