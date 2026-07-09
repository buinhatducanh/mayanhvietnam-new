"use client";
import { useState } from "react";
import { graphicNav } from "@/lib/data";

export default function StoreHeader() {
  const [searchQuery, setSearchQuery] = useState("");

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
            <a href="#" className="hover:text-white transition-colors">Đăng nhập</a>
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
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="leading-none">
              <div className="font-bold text-base tracking-tight text-white">Máy Ảnh Việt Nam</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">since 2010</div>
            </div>
          </a>

          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm Canon, Nikon, Sony, DJI..."
                className="w-full h-10 pl-11 pr-4 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all placeholder:text-zinc-500"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors" aria-label="Yêu thích">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="hidden lg:inline">Yêu thích</span>
            </button>

            <button className="relative flex items-center gap-1.5 px-3 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors font-medium" aria-label="Giỏ hàng">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden lg:inline">Giỏ hàng</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-orange-500 text-[11px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-3 -mx-6 px-6">
          {graphicNav.slice(0, 13).map((cat, i) => (
            <a
              key={i}
              href={`/${cat.slug}`}
              className={`flex-shrink-0 px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                i === 0 ? "bg-orange-500 text-white" : "text-zinc-300 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {cat.emoji && <span>{cat.emoji}</span>}
              <span>{cat.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
