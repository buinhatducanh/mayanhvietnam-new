"use client";
import { useState } from "react";
import { mainNav, brandAssets } from "@/lib/data";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { useUI } from "@/components/store/UIProvider";

export default function StoreHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openCart, openWishlist } = useUI();

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-zinc-800 shadow-lg shadow-black/40">
      {/* ─── ROW 1: Top utility bar ─── */}
      <div className="bg-zinc-950 text-xs text-zinc-400 border-b border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-6 py-1.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="hidden sm:inline">Hệ thống 4 cửa hàng</span>
              <span className="sm:hidden">4 cửa hàng</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Hotline:</span>
              <a href="tel:0907215252" className="text-orange-500 font-semibold hover:text-orange-400 tabular-nums">
                0907.215.252
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href="#"
              className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Tra cứu đơn hàng
            </a>
            <a href="/dang-nhap" className="flex items-center gap-1 hover:text-white transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden sm:inline">Đăng nhập</span>
              <span className="sm:hidden">Login</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── ROW 2: Brand + Search + Cart ─── */}
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo với fallback text */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <img
              src={brandAssets.logo}
              alt="Máy Ảnh Việt Nam"
              className="h-9 w-auto transition-transform group-hover:scale-105"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                const fb = img.nextElementSibling as HTMLElement | null;
                if (fb) fb.classList.remove("hidden");
              }}
            />
            <div className="hidden flex-col leading-none">
              <span className="text-white font-bold text-base">MÁY ẢNH</span>
              <span className="text-orange-500 font-bold text-sm tracking-wider">VIỆT NAM</span>
            </div>
          </a>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <form
              action="/tim-kiem"
              method="GET"
              className="relative"
              onSubmit={(e) => {
                if (!searchQuery.trim()) {
                  e.preventDefault();
                  window.location.href = "/tim-kiem";
                }
              }}
            >
              <input
                type="text"
                name="q"
                value={SearchQueryOrEmpty(searchQuery)}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                placeholder="Tìm Canon, Nikon, Sony, DJI..."
                className={`w-full h-10 pl-11 pr-14 sm:pr-24 bg-zinc-900 border rounded-full text-sm text-white outline-none transition-all placeholder:text-zinc-500 ${
                  searchFocus ? "border-orange-500 ring-2 ring-orange-500/20" : "border-zinc-800"
                }`}
              />
              <button
                type="submit"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-400"
                aria-label="Tìm kiếm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {/* Nút submit nhỏ trong input */}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 h-7 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-full transition-colors"
              >
                Tìm
              </button>
            </form>
          </div>

          {/* Wishlist + Cart */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={openWishlist}
              className="relative hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-zinc-200 hover:text-white transition-colors"
              aria-label="Yêu thích"
            >
              <svg
                className={`w-5 h-5 transition-colors ${
                  wishlistCount > 0 ? "fill-red-500 text-red-500" : ""
                }`}
                fill={wishlistCount > 0 ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="hidden lg:inline">Yêu thích</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors font-medium"
              aria-label="Giỏ hàng"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden lg:inline">Giỏ hàng</span>
              <span className={`min-w-[20px] h-5 px-1.5 ${
                totalItems > 0 ? "bg-white text-orange-600" : "bg-zinc-900 text-white border border-white/40"
              } text-[11px] font-bold rounded-full flex items-center justify-center tabular-nums`}>
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* ─── ROW 3: Main Navigation ─── */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-3 -mx-6 px-6">
          {mainNav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex-shrink-0 px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                i === 0
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                  : "text-zinc-200 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** Helper nhỏ — chỉ để tránh đoạn đẹp hơn (không ảnh hưởng logic) */
function SearchQueryOrEmpty(q: string) { return q; }
