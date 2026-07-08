import Link from 'next/link';
'use client';

import { useState } from "react";
import {
  Camera, Aperture, Film, Radio, Lightbulb, Package, RotateCcw, Monitor,
  Search, ShoppingCart, Heart, User, Phone, CreditCard, Shield,
  ChevronDown, MapPin, Menu, X, Facebook, Youtube, Instagram,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const NAV_CATS = [
  { icon: Camera,    label: "Máy ảnh",        href: "/" },
  { icon: Aperture,  label: "Ống kính",        href: "/" },
  { icon: Film,      label: "Cinema Camera",   href: "/" },
  { icon: Radio,     label: "Flycam / Drone",  href: "/" },
  { icon: Lightbulb, label: "Studio",          href: "/" },
  { icon: Package,   label: "Phụ kiện",        href: "/" },
  { icon: RotateCcw, label: "Hàng cũ",         href: "/" },
  { icon: Monitor,   label: "Studio Setup",    href: "/" },
];

export default function Root() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = { push: (href: string) => { /* router.push(href) */ } };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) /* navigate */ console.log("navigate"); //`/?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8]">

      {/* ── TOP UTILITY BAR ─────────────────────────────────── */}
      <div className="bg-white border-b border-black/[0.06] sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center">
              <Camera size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-[18px] tracking-tight text-[#0a0a0a]">
              LENS<span className="text-[#ff6b00]">PRO</span>
            </span>
          </Link>

          {/* Search — centered */}
          <form onSubmit={handleSearch} className="flex-1 max-w-[520px] mx-auto">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm Canon EOS R50, Sony A7IV, DJI Mini 4 Pro..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#f4f4f5] rounded-xl border border-transparent focus:border-[#ff6b00] focus:bg-white focus:outline-none transition-all placeholder:text-zinc-400"
              />
            </div>
          </form>

          {/* Utilities */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-zinc-500">
            <Link href="tel:18009999" className="flex items-center gap-1.5 hover:text-[#ff6b00] px-2 py-1.5 rounded-lg hover:bg-orange-50 transition-colors">
              <Phone size={14} className="text-[#ff6b00]" />
              <span className="font-medium text-zinc-700">1800 9999</span>
            </a>
            <div className="w-px h-4 bg-zinc-200" />
            <Link href="#" className="flex items-center gap-1.5 hover:text-[#ff6b00] px-2 py-1.5 rounded-lg hover:bg-orange-50 transition-colors">
              <CreditCard size={14} className="text-[#ff6b00]" />
              <span>Trả góp 0%</span>
            </a>
            <div className="w-px h-4 bg-zinc-200" />
            <Link href="#" className="flex items-center gap-1.5 hover:text-[#ff6b00] px-2 py-1.5 rounded-lg hover:bg-orange-50 transition-colors">
              <Shield size={14} className="text-[#ff6b00]" />
              <span>Bảo hành</span>
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Link href="/" className="relative p-2.5 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-[#ff6b00]">
              <Heart size={20} strokeWidth={1.75} />
            </Link>
            <Link href="/" className="relative p-2.5 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-zinc-900">
              <User size={20} strokeWidth={1.75} />
            </Link>
            <Link href="/cart" className="relative p-2.5 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-zinc-900">
              <ShoppingCart size={20} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#ff6b00] text-white rounded-full text-[10px] font-bold flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* ── ORANGE CATEGORY NAV ─────────────────────────────── */}
      <div className="bg-[#ff6b00] sticky top-16 z-40">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center overflow-x-auto">
            {NAV_CATS.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                to={href}
                className="flex items-center gap-2 px-4 py-3 text-white/80 hover:text-white text-sm font-medium whitespace-nowrap hover:bg-white/10 transition-colors border-b-2 border-transparent hover:border-white/60"
              >
                <Icon size={15} strokeWidth={2} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1">
        {children}
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-[#0a0a0a] text-zinc-400 mt-16">
        {/* Brand strip */}
        <div className="border-b border-white/5">
          <div className="max-w-[1440px] mx-auto px-8 py-8">
            <p className="text-xs text-zinc-600 mb-5 font-medium uppercase tracking-wider">Đại lý phân phối chính hãng</p>
            <div className="flex flex-wrap items-center gap-8">
              {["Canon", "Sony", "Nikon", "Fujifilm", "DJI", "Blackmagic", "Tamron", "Sigma", "Godox", "SanDisk"].map(brand => (
                <span key={brand} className="text-zinc-500 font-semibold text-sm hover:text-zinc-200 cursor-pointer transition-colors">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="max-w-[1440px] mx-auto px-8 py-12 grid grid-cols-2 sm:grid-cols-5 gap-8">
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
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#ff6b00] flex items-center justify-center transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Sản phẩm",
              links: ["Máy ảnh Canon", "Máy ảnh Sony", "Ống kính RF", "Flycam DJI", "Studio & Lighting"],
            },
            {
              title: "Hỗ trợ",
              links: ["Chính sách bảo hành", "Đổi trả 30 ngày", "Hướng dẫn mua hàng", "Trả góp 0%", "Dịch vụ sửa chữa"],
            },
            {
              title: "Công ty",
              links: ["Về chúng tôi", "32 cửa hàng toàn quốc", "Tuyển dụng", "Blog & Review", "Liên hệ"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-white font-semibold text-sm mb-4">{col.title}</h5>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}><Link href="#" className="text-xs hover:text-zinc-200 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 py-5">
          <div className="max-w-[1440px] mx-auto px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-zinc-600">
            <span>© 2024 LensPro Vietnam. Đã đăng ký Bộ Công Thương.</span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-zinc-400">Điều khoản</a>
              <Link href="#" className="hover:text-zinc-400">Bảo mật</a>
              <Link href="#" className="hover:text-zinc-400">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
