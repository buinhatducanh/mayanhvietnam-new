"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { graphicNav, HOTLINE_FULL } from "@/data/store";

export default function StoreHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Top strip */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
              alt="Máy Ảnh Việt Nam"
              width={160}
              height={40}
              className="h-9 w-auto brightness-0 invert"
              unoptimized
            />
          </Link>

          {/* Search bar */}
          <div className={`flex-1 max-w-xl mx-8 transition-all duration-300 ${searchOpen ? "opacity-100" : "opacity-70"}`}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm máy ảnh, ống kính, flycam…"
                className="w-full h-10 pl-10 pr-4 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white transition-all"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <a
              href={`tel:${HOTLINE_FULL.replace(/-/g, "")}`}
              className="hidden md:flex items-center gap-1.5 text-xs font-mono text-gray-600 hover:text-[var(--color-primary)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{HOTLINE_FULL}</span>
            </a>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors" aria-label="Giỏ hàng">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 text-gray-600 hover:text-gray-900" aria-label="Tìm kiếm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category nav pills */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 -mx-6 px-6">
          {graphicNav.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/danh-muc/${cat.slug}`}
              className={`flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                i === 0
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
