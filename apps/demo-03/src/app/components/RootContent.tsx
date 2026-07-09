'use client';

import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
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
    <div className="min-h-screen flex flex-col bg-[#f8f8f8]">

      {/* ── TOP UTILITY BAR ─────────────────────────────────── */}
      <div className="bg-white border-b border-black/[0.06] sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center gap-4 sm:gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center">
              <Camera size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-[18px] tracking-tight text-[#0a0a0a] hidden sm:block">
              LENS<span className="text-[#ff6b00]">PRO</span>
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-[520px] mx-auto">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm Canon, Sony, DJI…"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#f4f4f5] rounded-xl border border-transparent focus:border-[#ff6b00] focus:bg-white focus:outline-none transition-all placeholder:text-zinc-400"
              />
            </div>
          </form>

          {/* Utilities (desktop) */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-zinc-500">
            <Link href="tel:0937148222" className="flex items-center gap-1.5 hover:text-[#ff6b00] px-2 py-1.5 rounded-lg hover:bg-orange-50 transition-colors">
              <Phone size={14} className="text-[#ff6b00]" />
              <span className="font-medium text-zinc-700">0937 148 222</span>
            </Link>
            <div className="w-px h-4 bg-zinc-200" />
            <Link href="#" className="flex items-center gap-1.5 hover:text-[#ff6b00] px-2 py-1.5 rounded-lg hover:bg-orange-50 transition-colors">
              <CreditCard size={14} className="text-[#ff6b00]" />
              <span>Trả góp 0%</span>
            </Link>
            <div className="w-px h-4 bg-zinc-200" />
            <Link href="/chinh-sach-bao-hanh" className="flex items-center gap-1.5 hover:text-[#ff6b00] px-2 py-1.5 rounded-lg hover:bg-orange-50 transition-colors">
              <Shield size={14} className="text-[#ff6b00]" />
              <span>Bảo hành</span>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Link href="/tim-kiem" className="relative p-2.5 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-[#ff6b00] sm:hidden">
              <Search size={20} strokeWidth={1.75} />
            </Link>
            <Link href="/" className="relative p-2.5 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-[#ff6b00] hidden sm:block">
              <Heart size={20} strokeWidth={1.75} />
            </Link>
            <Link href="/" className="relative p-2.5 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-zinc-900 hidden sm:block">
              <User size={20} strokeWidth={1.75} />
            </Link>
            <Link href="/cart" className="relative p-2.5 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-zinc-900">
              <ShoppingCart size={20} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#ff6b00] text-white rounded-full text-[10px] font-bold flex items-center justify-center leading-none">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative p-2.5 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-zinc-900 sm:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── ORANGE CATEGORY NAV (desktop) ──────────────────── */}
      <div className="bg-[#ff6b00] sticky top-14 sm:top-16 z-40 hidden sm:block">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center overflow-x-auto">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/danh-muc/${cat.slug}`}
                className="flex items-center gap-2 px-4 py-3 text-white/80 hover:text-white text-sm font-medium whitespace-nowrap hover:bg-white/10 transition-colors border-b-2 border-transparent hover:border-white/60"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE DRAWER ──────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-xl overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center">
                  <Camera size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="font-black text-[18px] tracking-tight">LENS<span className="text-[#ff6b00]">PRO</span></span>
              </div>
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
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#ff6b00] rounded-md flex items-center justify-center">
                <Camera size={15} className="text-white" />
              </div>
              <span className="font-black text-white tracking-tight">LENS<span className="text-[#ff6b00]">PRO</span></span>
            </div>
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