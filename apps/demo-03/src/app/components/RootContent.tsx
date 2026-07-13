'use client';

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Camera, Search, ShoppingCart, Heart, User, Phone, CreditCard, Shield,
  Menu, X, ChevronRight,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { categories } from "@mayanhvietnam/mock-data";

const UTIL_LINKS = [
  { label: "Bảo hành", href: "/chinh-sach-bao-hanh" },
  { label: "Thanh toán", href: "/chinh-sach-thanh-toan" },
  { label: "Vận chuyển", href: "/chinh-sach-van-chuyen" },
  { label: "Bảo mật", href: "/chinh-sach-bao-mat" },
  { label: "Liên hệ", href: "/thong-tin-lien-he" },
  { label: "Cửa hàng", href: "/he-thong-cua-hang" },
];

export default function Root({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8] overflow-x-hidden">

      {/* ── TOP UTILITY BAR — orange #ff6a00, matches real mayanhvietnam.com ── */}
      <div className="bg-[#ff6a00] sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-6 h-[52px] sm:h-[56px] flex items-center gap-3 sm:gap-4">

          {/* Logo — white PNG */}
          <Link href="/" className="shrink-0">
            <img
              src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
              alt="Máy Ảnh Việt Nam"
              className="h-7 sm:h-9 w-auto"
            />
          </Link>

          {/* Search bar — white bg, centered */}
          <form onSubmit={handleSearch} className="hidden sm:block flex-1 max-w-[520px]">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm…"
                className="w-full pl-4 pr-10 py-[9px] text-sm text-zinc-700 bg-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-3 bg-[#ef4036] hover:bg-[#d93830] text-white rounded-r-lg transition-colors">
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Spacer on mobile */}
          <div className="flex-1 sm:hidden" />

          {/* Hotline + utilities (desktop) */}
          <div className="hidden md:flex items-center gap-2 text-xs shrink-0">
            <a href="tel:0937148222" className="text-white hover:text-orange-100 transition-colors flex items-center gap-1">
              <Phone size={14} className="text-white" />
              <span className="font-semibold">0937.148.222</span>
            </a>
            <div className="w-px h-4 bg-white/30" />
            <span className="text-white/80">Mua hàng – Trả góp – Bảo hành</span>
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-1 shrink-0">
            <Link href="/tim-kiem" className="p-2 text-white hover:text-orange-100 transition-colors sm:hidden">
              <Search size={20} />
            </Link>
            <Link href="/" className="p-2 text-white hover:text-orange-100 transition-colors hidden sm:block" title="Tài khoản">
              <User size={20} strokeWidth={1.75} />
            </Link>
            <Link href="/cart" className="relative p-2 text-white hover:text-orange-100 transition-colors" title="Giỏ hàng">
              <ShoppingCart size={20} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#ef3006] text-white rounded-full text-[10px] font-bold flex items-center justify-center leading-none border-2 border-[#ff6a00]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white hover:text-orange-100 transition-colors sm:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── CATEGORY NAV (desktop) — white bar, real site style ── */}
      <div className="bg-white border-b border-black/[0.06] sticky top-[52px] sm:top-[56px] z-40 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-6">
          <nav className="flex items-center justify-center gap-0">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/danh-muc/${cat.slug}`}
                className="flex items-center gap-1.5 px-3 py-3 text-zinc-700 hover:text-[#ff6a00] text-[13px] font-medium whitespace-nowrap hover:bg-orange-50/40 transition-colors border-b-2 border-transparent hover:border-[#ff6a00] shrink-0"
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ── MOBILE DRAWER ──────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-xl overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-zinc-100 bg-[#ff6a00]">
              <img
                src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
                alt="Máy Ảnh Việt Nam"
                className="h-8 w-auto"
              />
            </div>
            <nav className="p-2">
              <p className="px-3 py-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Danh mục</p>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/danh-muc/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-700 hover:bg-orange-50 hover:text-[#ff6b00] rounded-lg transition-colors"
                >
                  <span className="text-lg">{cat.icon}</span>
                  {cat.name}
                  <span className="ml-auto text-[11px] text-zinc-400">{cat.productCount}</span>
                </Link>
              ))}
              <div className="border-t border-zinc-100 my-2" />
              <p className="px-3 py-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Hỗ trợ</p>
              {UTIL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm text-zinc-600 hover:bg-orange-50 hover:text-[#ff6b00] rounded-lg transition-colors"
                >
                  {link.label}
                  <ChevronRight size={14} className="text-zinc-300" />
                </Link>
              ))}
              <div className="border-t border-zinc-100 my-2" />
              <a
                href="tel:0937148222"
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#ff6b00] font-semibold"
              >
                <Phone size={16} /> Hotline: 0937 148 222
              </a>
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-[#0a0a0a] text-zinc-400 mt-16">
        <div className="border-b border-white/5">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
            <p className="text-xs text-zinc-600 mb-5 font-medium uppercase tracking-wider">Đại lý phân phối chính hãng</p>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              {["Canon", "Sony", "Nikon", "Fujifilm", "DJI", "Blackmagic", "Tamron", "Sigma", "Godox", "SanDisk"].map(brand => (
                <span key={brand} className="text-zinc-500 font-semibold text-sm hover:text-zinc-200 cursor-pointer transition-colors">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-2 sm:grid-cols-5 gap-8">
          <div className="col-span-2 sm:col-span-1">
            {/* Logo — real mayanhvietnam.com logo (dark bg = use orange logo) */}
            <Link href="/" className="inline-block mb-4">
              <img
                src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
                alt="Máy Ảnh Việt Nam"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-xs leading-relaxed text-zinc-500 mb-5">
              Hệ thống cửa hàng máy ảnh chuyên nghiệp. Phân phối chính hãng, bảo hành đầy đủ, hỗ trợ kỹ thuật tận tâm.
            </p>
            <div className="flex gap-2">
              {["Facebook", "YouTube", "TikTok"].map((platform) => (
                <span key={platform} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#ff6b00] flex items-center justify-center transition-colors cursor-pointer text-[10px] font-bold text-zinc-500">
                  {platform[0]}
                </span>
              ))}
            </div>
          </div>

          {[
            {
              title: "Sản phẩm",
              links: [
                { label: "Máy ảnh Canon", href: "/danh-muc/may-anh" },
                { label: "Máy ảnh Sony", href: "/danh-muc/may-anh" },
                { label: "Ống kính", href: "/danh-muc/ong-kinh" },
                { label: "Flycam DJI", href: "/danh-muc/flycam" },
                { label: "Phụ kiện", href: "/danh-muc/phu-kien" },
              ],
            },
            {
              title: "Hỗ trợ",
              links: [
                { label: "Chính sách bảo hành", href: "/chinh-sach-bao-hanh" },
                { label: "Chính sách đổi trả", href: "/chinh-sach-bao-hanh" },
                { label: "Hướng dẫn mua hàng", href: "/chinh-sach-thanh-toan" },
                { label: "Trả góp 0%", href: "/chinh-sach-thanh-toan" },
                { label: "Vận chuyển", href: "/chinh-sach-van-chuyen" },
              ],
            },
            {
              title: "Công ty",
              links: [
                { label: "Hệ thống cửa hàng", href: "/he-thong-cua-hang" },
                { label: "Liên hệ", href: "/thong-tin-lien-he" },
                { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-white font-semibold text-sm mb-4">{col.title}</h5>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs hover:text-zinc-200 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 py-5">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-zinc-600">
            <span>© 2026 LENS PRO Vietnam. Đã đăng ký Bộ Công Thương.</span>
            <div className="flex gap-6">
              <Link href="/chinh-sach-bao-mat" className="hover:text-zinc-400">Bảo mật</Link>
              <Link href="/thong-tin-lien-he" className="hover:text-zinc-400">Liên hệ</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}