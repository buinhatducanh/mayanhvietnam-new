"use client";
import { useState } from "react";
import Link from "next/link";
import { graphicNav, HOTLINE_FULL } from "@/data/store";

const TOP_NAV = [
  { label: "Xem tất cả", href: "/san-pham" },
  { label: "Sản phẩm mới", href: "/san-pham?filter=new" },
  { label: "Sản phẩm cũ", href: "/san-pham?filter=used" },
];

export default function StoreHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* ── Top bar: hotline + freeship + nav ── */}
        <div className="hidden border-b border-gray-100 md:block">
          <div className="flex items-center justify-between py-1.5 text-[11px] text-gray-500">
            <div className="flex items-center gap-4">
              <a
                href={`tel:${HOTLINE_FULL.replace(/-/g, "")}`}
                className="flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{HOTLINE_FULL}</span>
              </a>
              <span className="text-gray-300">|</span>
              <span>Freeship đơn từ 5.000.000₫</span>
            </div>
            <div className="flex items-center gap-4">
              {TOP_NAV.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  className="hover:text-foreground transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main header: logo + search + actions ── */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 -ml-2 text-gray-600"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo on primary bg */}
          <Link href="/" className="flex-shrink-0">
            <div className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-3 py-1.5 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png"
                alt="Máy Ảnh Việt Nam"
                className="h-8 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Search */}
          <div className={`flex-1 max-w-xl transition-all duration-300 ${searchOpen ? "opacity-100" : "opacity-80"}`}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm máy ảnh, ống kính, flycam…"
                className="w-full h-10 pl-10 pr-12 rounded-full bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white transition-all"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            <Link href="/account/login" className="hidden lg:flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span className="hidden lg:inline">Tài khoản</span>
            </Link>
            <Link href="/setup-studio" className="hidden lg:flex items-center gap-2 rounded-lg bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/15 px-3 py-2.5 text-xs font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors">
              <span>★</span>
              <span className="hidden lg:inline">Setup phòng Studio</span>
            </Link>
            <button className="relative flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-foreground transition-colors" aria-label="Giỏ hàng">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <span className="hidden lg:inline">Giỏ hàng</span>
            </button>
          </div>

          <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 text-gray-600" aria-label="Tìm kiếm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>

        {/* ── Category nav ── */}
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

        {/* Mobile drawer */}
        {mobileMenu && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setMobileMenu(false)}
            />
            <div className="fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto border-r border-gray-200 bg-white shadow-2xl md:hidden">
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <span className="text-sm font-semibold">Menu</span>
                <button onClick={() => setMobileMenu(false)} aria-label="Đóng">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <a
                  href={`tel:${HOTLINE_FULL.replace(/-/g, "")}`}
                  className="mb-4 flex items-center gap-2 rounded-lg bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/15 p-3 text-sm font-semibold text-[var(--color-primary)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Gọi ngay: {HOTLINE_FULL}
                </a>
                {graphicNav.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/danh-muc/${cat.slug}`}
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-foreground transition-colors"
                  >
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
