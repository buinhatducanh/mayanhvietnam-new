"use client";
import { useState } from "react";
import { mainNav } from "@/lib/data";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { useUI } from "@/components/store/UIProvider";

export default function StoreHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openCart, openWishlist } = useUI();

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-zinc-800 shadow-lg shadow-black/40">
      <div className="bg-zinc-950 text-xs text-zinc-400 border-b border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-6 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Hệ thống 4 cửa hàng</span>
            </span>
            <span className="hidden md:inline">Hotline: <a href="tel:0907215252" className="text-orange-500 font-semibold hover:text-orange-400">0907.215.252</a></span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Tra cứu đơn hàng</a>
            <a href="/dang-nhap" className="hover:text-white transition-colors">Đăng nhập</a>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
              alt="Máy Ảnh Việt Nam"
              className="h-9 w-auto"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </a>

          <div className="flex-1 max-w-2xl mx-6">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm Canon, Nikon, Sony, DJI..."
                className="w-full h-10 pl-11 pr-4 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all placeholder:text-zinc-500"
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
            </form>
          </div>

          <div className="flex items-center gap-2">
            {/* Wishlist button */}
            <button
              onClick={openWishlist}
              className="relative hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-zinc-200 hover:text-white transition-colors"
              aria-label="Yêu thích"
            >
              <svg
                className={`w-5 h-5 transition-colors ${wishlistCount > 0 ? "fill-red-500 text-red-500" : ""}`}
                fill={wishlistCount > 0 ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="hidden lg:inline">Yêu thích</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 px-3 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors font-medium"
              aria-label="Giỏ hàng"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden lg:inline">Giỏ hàng</span>
              {totalItems > 0 ? (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-white text-orange-500 text-[11px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-orange-500 text-[11px] font-bold rounded-full flex items-center justify-center">0</span>
              )}
            </button>
          </div>
        </div>

        {/* Main Navigation — Theo observation §2.2 */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-3 -mx-6 px-6">
          {mainNav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex-shrink-0 px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                i === 0
                  ? "bg-orange-500 text-white"
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