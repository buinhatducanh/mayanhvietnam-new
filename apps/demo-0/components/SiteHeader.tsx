"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, searchProducts, getProductUrl, Product } from "@/lib/products";

interface SiteHeaderProps {
  active?: string;
}

export default function SiteHeader({ active = "home" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const blurTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  // Row heights and styles
  const row1Style = scrolled
    ? { height: "0px", paddingTop: "0px", paddingBottom: "0px", borderBottomWidth: "0px", overflow: "hidden", transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }
    : { height: "auto", paddingTop: "7px", paddingBottom: "7px", background: "#16130f", overflow: "hidden", transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)" };

  const row3Style = scrolled
    ? { height: "0px", paddingTop: "0px", paddingBottom: "0px", overflow: "hidden", transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }
    : { height: "auto", paddingTop: "6px", paddingBottom: "6px", maxWidth: "1280px", margin: "0 auto", overflow: "hidden", transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)" };

  const filteredCats = categories.filter((c) => !["san-pham-cu", "lap-phong-studio"].includes(c.slug));

  return (
    <div className="font-sans bg-[rgba(255,255,255,0.88)] backdrop-blur-[16px] border-b border-[#e9e6e1] sticky top-0 z-50">
      {/* Row 1: utility strip */}
      <div style={row1Style}>
        <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-[14px]">
            <a href="tel:0937148222" className="flex items-center gap-[7px] text-[#cfc9c2] hover:text-white no-underline text-[12px] tracking-[0.02em] font-semibold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>0937.148.222</span>
            </a>
            <span className="text-[#3d3831]">|</span>
            <span className="text-[#7a746c] text-[12px]">Freeship đơn từ 5.000.000đ · Hỗ trợ 9:00 – 19:00</span>
          </div>
          <div className="flex items-center gap-[22px]">
            <Link href="/danh-muc" className="text-[#cfc9c2] hover:text-[#ff8a3d] no-underline text-[12px] transition-colors">Xem tất cả sản phẩm</Link>
            <Link href="/#flash-sale" className="text-[#cfc9c2] hover:text-[#ff8a3d] no-underline text-[12px] transition-colors">⚡ Flash Sale</Link>
            <Link href="/danh-muc" className="text-[#cfc9c2] hover:text-[#ff8a3d] no-underline text-[12px] transition-colors">🎁 Khuyến mãi</Link>
            <Link href="/danh-muc#san-pham-cu" className="text-[#cfc9c2] hover:text-[#ff8a3d] no-underline text-[12px] transition-colors">♻️ Sản phẩm cũ</Link>
          </div>
        </div>
      </div>

      {/* Row 2: logo · search · actions */}
      <div className="border-b border-[#f1eee9]">
        <div className="max-w-[1280px] mx-auto px-8 py-[11px] flex items-center gap-[22px]">
          <Link href="/" title="Máy Ảnh Việt Nam" className="shrink-0 flex items-center bg-[#16130f] rounded-[10px] px-3 py-[7px] no-underline transition-all hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-10px_rgba(22,19,15,0.45)]">
            <img src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png" alt="Máy Ảnh Việt Nam" className="h-[26px] w-auto object-contain block" />
          </Link>

          {/* Search */}
          <div className="relative flex-1 max-w-[560px] mx-auto">
            <div className="relative flex items-center">
              <svg className="absolute left-[13px] pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a39d94" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              <input
                type="text"
                value={searchVal}
                onChange={onSearch}
                onFocus={onSearchFocus}
                onBlur={onSearchBlur}
                placeholder="Tìm máy ảnh, ống kính, flycam..."
                className="w-full h-10 pl-9 pr-11 rounded-xl border border-[#e9e6e1] bg-[#f7f5f1] text-[13.5px] text-[#16130f] outline-none transition-all focus:border-[#ff6a00] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,106,0,0.12)]"
              />
              <span className="absolute right-[5px] w-[30px] h-[30px] rounded-[9px] bg-[#ff6a00] flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(255,106,0,0.55)]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              </span>
            </div>
            
            {searchOpen && (
              <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-[#e9e6e1] rounded-[14px] shadow-[0_24px_60px_-20px_rgba(22,19,15,0.25)] overflow-hidden z-[60]">
                <div className="px-3 py-[7px] bg-[#f7f5f1] font-mono text-[9.5px] font-semibold text-[#a39d94] uppercase tracking-[0.12em]">Gợi ý sản phẩm</div>
                {searchResults.length > 0 ? (
                  searchResults.map((r) => (
                    <Link
                      key={r.id}
                      href={`/${getProductUrl(r.slug)}`}
                      className="flex items-center gap-2.5 px-3 py-[9px] no-underline border-t border-[#f1eee9] transition-colors bg-white hover:bg-[#f9f7f3]"
                    >
                      <span className="w-9 h-9 rounded-[9px] border border-[#f1eee9] bg-white shrink-0 overflow-hidden flex items-center justify-center">
                        <img src={r.thumbnail} alt={r.name} className="w-full h-full object-contain p-[2px]" />
                      </span>
                      <span className="min-w-0 flex-1 flex flex-col">
                        <span className="text-[10px] font-bold text-[#ff6a00] uppercase tracking-[0.08em]">{r.brand}</span>
                        <span className="text-[12.5px] font-medium text-[#16130f] truncate">{r.name}</span>
                      </span>
                      <span className="text-[12px] font-bold text-[#ff6a00] shrink-0">{r.price ? `${r.price.toLocaleString("vi-VN")}đ` : "Liên hệ"}</span>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-[12.5px] text-[#a39d94]">Không tìm thấy kết quả nào</div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" aria-label="Tài khoản" title="Tài khoản" className="flex items-center gap-2 h-10 px-[13px] rounded-xl border border-[#e9e6e1] bg-white text-[#5f5a53] text-[13px] font-semibold cursor-pointer transition-all hover:border-[rgba(255,106,0,0.45)] hover:text-[#ff6a00] hover:-translate-y-[1px] active:scale-[0.96]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Tài khoản
            </button>
            <button type="button" aria-label="Giỏ hàng" title="Giỏ hàng" className="relative flex items-center gap-2 h-10 px-[13px] rounded-xl border border-[#e9e6e1] bg-white text-[#5f5a53] text-[13px] font-semibold cursor-pointer transition-all hover:border-[rgba(255,106,0,0.45)] hover:text-[#ff6a00] hover:-translate-y-[1px] active:scale-[0.96]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
              Giỏ hàng
              <span className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] rounded-full bg-[#ff6a00] text-white text-[9.5px] font-extrabold flex items-center justify-center shadow-[0_4px_10px_-2px_rgba(255,106,0,0.6)]">0</span>
            </button>
            <a href="tel:0937148222" className="flex items-center gap-2 h-10 px-[17px] rounded-xl bg-[#ff6a00] text-white no-underline text-[13px] font-bold tracking-[0.01em] shadow-[0_8px_20px_-8px_rgba(255,106,0,0.55)] transition-all hover:bg-[#ea6100] hover:-translate-y-[1px] hover:shadow-[0_14px_28px_-10px_rgba(255,106,0,0.65)] active:scale-[0.97]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
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
                className="shrink-0 px-[13px] py-2 rounded-[9px] text-[13px] font-medium no-underline whitespace-nowrap transition-colors hover:bg-[#f5f2ed] hover:text-[#16130f]"
              >
                {c.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
