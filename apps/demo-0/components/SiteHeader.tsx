"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, searchProducts, getProductUrl, Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

const HOTLINE = '0937.148.222';

interface SiteHeaderProps {
  active?: string;
}

export default function SiteHeader({ active = "home" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [searchVal, setSearchVal] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const blurTimer = useRef<NodeJS.Timeout | null>(null);
  const { itemCount, toggleDrawer } = useCart();

  useEffect(() => {
    return () => {
      if (blurTimer.current) clearTimeout(blurTimer.current);
    };
  }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSearchVal(v);
    const res = searchProducts(v).filter((p) => p.thumbnail).slice(0, 5);
    setSearchResults(res);
    setSearchOpen(v.trim().length > 0);
  };

  const onSearchFocus = () => {
    if (blurTimer.current) clearTimeout(blurTimer.current);
    setSearchOpen(searchVal.trim().length > 0);
  };

  const onSearchBlur = () => {
    blurTimer.current = setTimeout(() => {
      setSearchOpen(false);
    }, 180);
  };

  // Row 1 (utility strip) nằm ngoài phần sticky — cuộn đi tự nhiên, không animate chiều cao
  // để tránh CLS (layout shift) khi cuộn trang.
  const row1Style = { paddingTop: "8px", paddingBottom: "8px", background: "#c85200" };

  const row3Style = { paddingTop: "6px", paddingBottom: "6px", maxWidth: "1280px", margin: "0 auto" };

  const filteredCats = categories.filter((c) => !["san-pham-cu", "lap-phong-studio"].includes(c.slug));
  const HOTLINE = "0937.148.222";

  return (
    <>
      {/* Row 1: utility strip — ngoài sticky, chiều cao cố định */}
      <div className="font-sans" style={row1Style}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-[12px]">
            <a href="tel:0937148222" className="flex items-center gap-[6px] text-white hover:text-white no-underline text-[12px] font-bold tracking-[0.01em]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>{HOTLINE}</span>
            </a>
            <span className="hidden xl:block w-px h-[12px] bg-white/25"></span>
            <span className="hidden xl:inline text-white/95 text-[11.5px] font-medium">Hỗ trợ 9:00 – 19:00</span>
          </div>

          {/* Center: thông điệp vận chuyển */}
          <p className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 m-0 text-[11.5px] font-semibold text-white tracking-[0.02em] whitespace-nowrap">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
            Freeship toàn quốc — đơn từ 5.000.000đ
          </p>
          <div className="hidden lg:flex items-center gap-[16px]">
            <Link href="/#flash-sale" className="flex items-center gap-1.5 bg-white text-[#c85200] no-underline rounded-full px-3 py-[4px] text-[11px] font-extrabold uppercase tracking-[0.06em] shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-[1px]">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
              Flash Sale
            </Link>
            <Link href="/danh-muc" className="text-white no-underline text-[11.5px] font-medium tracking-[0.01em] py-[3px] hover:underline decoration-white/60 underline-offset-4 transition-colors duration-200">Khuyến mãi</Link>
            <span aria-hidden="true" className="text-white/35 text-[10px]">·</span>
            <Link href="/danh-muc#san-pham-cu" className="text-white no-underline text-[11.5px] font-medium tracking-[0.01em] py-[3px] hover:underline decoration-white/60 underline-offset-4 transition-colors duration-200">Sản phẩm cũ</Link>
          </div>
        </div>
      </div>

      {/* Rows 2+3: sticky, chiều cao cố định — không gây layout shift */}
      <div className="font-sans bg-[rgba(255,255,255,0.88)] backdrop-blur-[16px] border-b border-[#e9e6e1] sticky top-0 z-50">
      {/* Row 2: logo · search · actions */}
      <div className="bg-[#ff6a00] border-b border-[#e86100]">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-8 py-2 sm:py-[11px] flex items-center gap-2 sm:gap-[22px]">
          <Link href="/" title="Máy Ảnh Việt Nam" className="shrink-0 flex items-center no-underline transition-all hover:-translate-y-[1px]">
            <div className="bg-[#ff6a00] rounded-[10px] sm:rounded-[12px] px-[9px] py-[4px] sm:px-[14px] sm:py-[7px] shadow-[0_4px_14px_rgba(255,106,0,0.35)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(255,106,0,0.5)]">
              <img src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png" alt="Máy Ảnh Việt Nam" width={180} height={36} className="h-[24px] w-auto sm:h-[36px] sm:w-[180px] object-contain object-left block" />
            </div>
          </Link>

          {/* Search */}
          <div className="relative flex-1 max-w-[520px] mx-auto">
            <div className="relative flex items-center">
              <div className="absolute left-0 flex items-center justify-center w-[36px] sm:w-[40px] h-full pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9e9590" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={onSearch}
                onFocus={onSearchFocus}
                onBlur={onSearchBlur}
                placeholder="Tìm sản phẩm..."
                className="w-full h-[38px] sm:h-[42px] pl-[36px] sm:pl-[40px] pr-[44px] sm:pr-[48px] rounded-full border border-[#e2ddd6] bg-[#faf9f7] text-[12.5px] sm:text-[13.5px] text-[#1a1815] placeholder:text-[#b0a99f] outline-none transition-all duration-200 hover:border-[#d4cec5] focus:border-[#ff6a00] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,106,0,0.1)]"
              />
              <button type="submit" className="absolute right-[4px] sm:right-[5px] w-[30px] sm:w-[32px] h-[30px] sm:h-[32px] rounded-full bg-[#ff6a00] flex items-center justify-center border-0 cursor-pointer shadow-[0_2px_8px_rgba(255,106,0,0.3)] transition-all duration-200 hover:bg-[#ea5e00] hover:shadow-[0_4px_14px_rgba(255,106,0,0.45)] hover:scale-105 active:scale-95">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              </button>
            </div>

            {searchOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-[#e9e6e1] rounded-2xl shadow-[0_20px_50px_-15px_rgba(22,19,15,0.18)] overflow-hidden z-[60]">
                <div className="px-4 py-2 border-b border-[#f1eee9]">
                  <span className="text-[11px] font-semibold text-[#b0a99f] uppercase tracking-[0.1em]">Gợi ý sản phẩm</span>
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((r) => (
                    <Link
                      key={r.id}
                      href={`/${getProductUrl(r.slug)}`}
                      className="flex items-center gap-3 px-4 py-[10px] no-underline border-b border-[#f5f3f0] last:border-b-0 transition-colors bg-white hover:bg-[#fffbf7]"
                    >
                      <span className="w-10 h-10 rounded-xl border border-[#f1eee9] bg-[#faf9f7] shrink-0 overflow-hidden flex items-center justify-center">
                        <img src={r.thumbnail} alt={r.name} className="w-full h-full object-contain p-[3px]" />
                      </span>
                      <span className="min-w-0 flex-1 flex flex-col gap-[2px]">
                        <span className="text-[10px] font-bold text-[#ff6a00] uppercase tracking-[0.06em]">{r.brand}</span>
                        <span className="text-[12.5px] font-medium text-[#1a1815] truncate leading-tight">{r.name}</span>
                      </span>
                      <span className="text-[12.5px] font-bold text-[#ff6a00] shrink-0 whitespace-nowrap">{r.price ? `${r.price.toLocaleString("vi-VN")}đ` : "Liên hệ"}</span>
                    </Link>
                  ))
                ) : (
                  <div className="py-6 text-center text-[12.5px] text-[#b0a99f]">Không tìm thấy kết quả nào</div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-[5px] sm:gap-[6px] shrink-0">
            <button type="button" aria-label="Tài khoản" title="Tài khoản" className="group hidden sm:flex items-center justify-center w-[40px] h-[40px] rounded-full border border-[#e2ddd6] bg-white text-[#5f5a53] cursor-pointer transition-all duration-200 hover:border-[#ff6a00] hover:text-[#ff6a00] hover:bg-[#fff8f0] hover:shadow-[0_2px_10px_rgba(255,106,0,0.15)] active:scale-95">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </button>
            <button
              type="button"
              aria-label="Giỏ hàng"
              title="Giỏ hàng"
              onClick={() => toggleDrawer()}
              className="group relative flex items-center justify-center w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full border border-[#e2ddd6] bg-white text-[#5f5a53] cursor-pointer transition-all duration-200 hover:border-[#ff6a00] hover:text-[#ff6a00] hover:bg-[#fff8f0] hover:shadow-[0_2px_10px_rgba(255,106,0,0.15)] active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-[#ff6a00] text-white text-[10px] font-bold flex items-center justify-center px-1 shadow-[0_2px_6px_rgba(255,106,0,0.5)] ring-2 ring-white">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
            <a href="tel:0937148222" className="hidden sm:flex items-center gap-2 h-[40px] px-[18px] rounded-full bg-[#ff6a00] text-white no-underline text-[13px] font-semibold tracking-[0.01em] shadow-[0_4px_14px_rgba(255,106,0,0.35)] transition-all duration-200 hover:bg-[#ea5e00] hover:shadow-[0_6px_20px_rgba(255,106,0,0.5)] hover:-translate-y-[1px] active:scale-[0.97]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Đặt hàng
            </a>
          </div>
        </div>
      </div>

      {/* Row 3: category nav strip */}
      <nav aria-label="Danh mục sản phẩm" style={row3Style}>
        <div className="flex items-center gap-[3px] overflow-x-auto scrollbar-none py-1">
          {filteredCats.map((c) => {
            const on = active === c.slug;
            return (
              <Link
                key={c.id}
                href={`/danh-muc#${c.slug}`}
                style={{
                  color: on ? "#c85200" : "#5f5a53",
                  background: on ? "rgba(255,106,0,0.09)" : "transparent"
                }}
                className="shrink-0 px-[10px] sm:px-[13px] py-[5px] sm:py-2 rounded-[7px] sm:rounded-[9px] text-[11.5px] sm:text-[13px] font-medium no-underline whitespace-nowrap transition-colors hover:bg-[#f5f2ed] hover:text-[#16130f]"
              >
                {c.name}
              </Link>
            );
          })}
        </div>
      </nav>
      </div>
    </>
  );
}
