import Link from 'next/link';
'use client';

import { useState, useRef, useEffect } from "react";
import {
  Camera, Search, ShoppingCart, User, Menu, X,
  Facebook, Instagram, Youtube, Twitter,
  MapPin, Phone, Mail,
  Aperture, Video, Zap, Wind, Lightbulb, Package, Archive, Home,
  ChevronDown, Tag,
} from "lucide-react";
import { useCart } import { useCart } from "@/app/context/CartContext";

const CAT_NAV = [
  { label: "MÁY ẢNH",           to: "/san-pham?cat=camera",  Icon: Camera,    sub: ["Mirrorless", "DSLR", "Compact", "Medium Format"] },
  { label: "ỐNG KÍNH",           to: "/san-pham?cat=lens",    Icon: Aperture,  sub: ["Canon RF/EF", "Sony FE", "Nikon Z", "Sigma Art"] },
  { label: "MÁY QUAY PHIM",      to: "/san-pham?cat=camera",  Icon: Video,     sub: ["Cinema Line", "EOS Cinema", "BMPCC", "Z-Series"] },
  { label: "ACTION CAMERA",      to: "/san-pham?cat=acc",     Icon: Zap,       sub: ["GoPro Hero", "DJI Osmo", "Insta360", "Sony Action"] },
  { label: "FLYCAM",             to: "/san-pham?cat=drone",   Icon: Wind,      sub: ["DJI Mavic", "DJI Mini", "DJI Air", "Autel"] },
  { label: "THIẾT BỊ STUDIO",    to: "/san-pham?cat=acc",     Icon: Lightbulb, sub: ["Flash Godox", "Profoto", "Softbox", "Backdrop"] },
  { label: "PHỤ KIỆN",           to: "/san-pham?cat=acc",     Icon: Package,   sub: ["Chân máy", "Túi máy", "Pin & Sạc", "Thẻ nhớ"] },
  { label: "SẢN PHẨM CŨ",       to: "/san-pham",             Icon: Archive,   sub: [] },
  { label: "SETUP PHÒNG STUDIO", to: "/san-pham?cat=acc",     Icon: Home,      highlight: true, sub: [] },
];

const TOP_LINKS = [
  { label: "Tin tức",  to: "/tin-tuc" },
  { label: "Liên hệ", to: "/lien-he" },
  { label: "Thương hiệu", to: "/thuong-hieu" },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoverCat, setHoverCat] = useState<string | null>(null);
  const { count } = useCart();
  const navigate = { push: (href: string) => { /* router.push(href) */ } };
  const location = useLocation();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) /* navigate */ console.log("navigate"); //`/san-pham?q=${encodeURIComponent(query.trim())}`);
  };

  const onCatEnter = (label: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHoverCat(label);
  };
  const onCatLeave = () => {
    hoverTimer.current = setTimeout(() => setHoverCat(null), 120);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ fontFamily: "'Nunito Sans',sans-serif" }}>

      {/* ══════════ HEADER ══════════════════════════════════ */}
      <header className="sticky top-0 z-50">

        {/* ── Tier 1: Utility bar ── */}
        <div className="bg-gray-950 hidden lg:block">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex items-center justify-between h-8">
              {/* Left: promo */}
              <div className="flex items-center gap-4 text-[10px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Tag size={9} className="text-orange-400" />
                  <span>Miễn phí vận chuyển đơn từ <strong className="text-white">500.000₫</strong></span>
                </span>
                <span className="text-gray-700">·</span>
                <span className="flex items-center gap-1.5">
                  <Phone size={9} className="text-orange-400" />
                  <strong className="text-orange-300">0903.148-222</strong>
                  <span className="text-gray-600">• 8:00–20:00 mỗi ngày</span>
                </span>
              </div>
              {/* Right: nav links + social */}
              <div className="flex items-center gap-1">
                {TOP_LINKS.map(l => (
                  <Link key={l.label} to={l.to}
                    className="text-[10px] text-gray-400 hover:text-white px-2.5 py-1 rounded hover:bg-white/6 transition-colors">
                    {l.label}
                  </Link>
                ))}
                <span className="w-px h-3 bg-gray-700 mx-1" />
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/8 text-gray-500 hover:text-white transition-colors">
                    <Icon size={11} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tier 2: Main header ── */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-4 lg:gap-6 h-[68px]">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 shrink-0 group">
                <div className="relative w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200 transition-transform group-hover:scale-105">
                  <Camera size={20} className="text-white" />
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-white" />
                </div>
                <div className="hidden sm:block leading-none">
                  <div className="font-black text-[18px] tracking-tight text-gray-900 leading-none"
                    style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                    MAYANH<span className="text-orange-500">VIETNAM</span>
                  </div>
                  <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">
                    Vì lợi ích khách hàng
                  </div>
                </div>
              </Link>

              {/* Search */}
              <form onSubmit={handleSearch}
                className={`flex-1 max-w-2xl hidden md:flex items-center rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  searchFocused ? "border-orange-500 shadow-md shadow-orange-100" : "border-gray-200 hover:border-gray-300"
                } bg-gray-50`}>
                <div className="pl-4 pr-2 flex items-center gap-1 text-gray-400">
                  <Search size={15} />
                </div>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Tìm kiếm máy ảnh, ống kính, flycam..."
                  className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none py-3"
                />
                <button type="submit"
                  className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-5 py-3 flex items-center gap-2 font-bold text-sm transition-colors shrink-0">
                  <Search size={14} />
                  <span className="hidden lg:inline">Tìm</span>
                </button>
              </form>

              {/* Right actions */}
              <div className="flex items-center gap-1 ml-auto lg:ml-0">
                {/* Hotline — desktop only */}
                <div className="hidden xl:flex flex-col text-right mr-2">
                  <span className="text-[11px] font-black text-gray-800 leading-none">0903.148-222</span>
                  <span className="text-[9px] text-gray-400 mt-0.5">Hỗ trợ mua hàng</span>
                </div>
                <div className="hidden xl:block w-px h-8 bg-gray-100 mr-1" />

                {/* Account */}
                <button className="flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                  <div className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-orange-50 flex items-center justify-center transition-colors">
                    <User size={15} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <span className="hidden sm:block text-[9px] text-gray-500 font-semibold leading-none">Tài khoản</span>
                </button>

                {/* Cart */}
                <Link href="/gio-hang"
                  className="flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all relative group">
                  <div className="relative w-7 h-7 rounded-full bg-gray-100 group-hover:bg-orange-50 flex items-center justify-center transition-colors">
                    <ShoppingCart size={15} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                    {count > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-orange-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center px-1 shadow-sm">
                        {count}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block text-[9px] text-gray-500 font-semibold leading-none">Giỏ hàng</span>
                </Link>

                {/* Mobile hamburger */}
                <button
                  className="lg:hidden flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-xl hover:bg-gray-50 transition-all"
                  onClick={() => setMobileOpen(v => !v)}>
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                    {mobileOpen ? <X size={15} className="text-gray-700" /> : <Menu size={15} className="text-gray-700" />}
                  </div>
                  <span className="text-[9px] text-gray-500 font-semibold">Menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tier 3: Category nav ── */}
        <nav className="bg-[#1a1a2e] hidden lg:block relative" onMouseLeave={onCatLeave}>
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex items-stretch">
              {CAT_NAV.map(c => {
                const isHovered = hoverCat === c.label;
                return (
                  <div key={c.label} className="relative"
                    onMouseEnter={() => onCatEnter(c.label)}>
                    <Link to={c.to}
                      className={`flex items-center gap-2 px-3.5 py-3 text-[11px] font-extrabold tracking-wide whitespace-nowrap transition-all relative group
                        ${c.highlight
                          ? "bg-orange-500 text-white hover:bg-orange-400"
                          : isHovered
                            ? "text-white bg-white/8"
                            : "text-gray-300 hover:text-white hover:bg-white/6"
                        }`}>
                      <c.Icon size={12} className={c.highlight ? "text-white" : "text-orange-400"} />
                      {c.label}
                      {c.sub && c.sub.length > 0 && (
                        <ChevronDown size={10} className={`ml-0.5 transition-transform ${isHovered ? "rotate-180" : ""}`} />
                      )}
                      {/* Active underline */}
                      {!c.highlight && (
                        <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 transition-transform origin-left ${isHovered ? "scale-x-100" : "scale-x-0"}`} />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {c.sub && c.sub.length > 0 && isHovered && (
                      <div
                        className="absolute top-full left-0 min-w-[180px] bg-white rounded-b-xl shadow-xl border border-gray-100 py-1.5 z-50"
                        onMouseEnter={() => onCatEnter(c.label)}
                      >
                        {c.sub.map(s => (
                          <Link key={s} to={c.to}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium">
                            <span className="w-1 h-1 rounded-full bg-orange-400 shrink-0" />
                            {s}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            {/* Mobile search */}
            <div className="px-4 py-3 border-b border-gray-100">
              <form onSubmit={handleSearch}
                className="flex items-center border-2 border-gray-200 focus-within:border-orange-500 rounded-xl overflow-hidden transition-colors bg-gray-50">
                <input
                  value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none px-4 py-2.5" />
                <button type="submit" className="bg-orange-500 text-white px-4 py-2.5">
                  <Search size={15} />
                </button>
              </form>
            </div>
            {/* Links */}
            <div className="px-3 py-2">
              {CAT_NAV.map(c => (
                <Link key={c.label} to={c.to} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors mb-0.5 ${
                    c.highlight
                      ? "bg-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                  }`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${c.highlight ? "bg-white/20" : "bg-orange-50"}`}>
                    <c.Icon size={14} className={c.highlight ? "text-white" : "text-orange-500"} />
                  </div>
                  {c.label}
                </Link>
              ))}
            </div>
            {/* Hotline */}
            <div className="mx-3 mb-3 p-4 bg-gray-950 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
                <Phone size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white font-black text-sm">0903.148-222</div>
                <div className="text-gray-400 text-[10px]">Hỗ trợ 8:00 – 20:00 mỗi ngày</div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Page content ── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ══════════ FOOTER ══════════════════════════════════ */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-12 pb-6">
          <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 mb-10">

            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Camera size={19} className="text-white" />
                </div>
                <div className="leading-none">
                  <div className="text-white font-extrabold text-sm tracking-tight"
                    style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>MAYANHVIETNAM</div>
                  <div className="text-orange-400 text-[9px] tracking-wide">Vì lợi ích khách hàng</div>
                </div>
              </Link>
              <p className="text-xs leading-relaxed text-gray-500 mb-5">
                Hệ thống bán lẻ máy ảnh, ống kính, flycam và thiết bị studio chính hãng hàng đầu Việt Nam.
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2"><MapPin size={12} className="text-orange-500 mt-0.5 shrink-0" /><span>123 Nguyễn Huệ, Quận 1, TP.HCM</span></div>
                <div className="flex items-center gap-2"><Phone size={12} className="text-orange-500 shrink-0" /><span>0903.148-222</span></div>
                <div className="flex items-center gap-2"><Mail size={12} className="text-orange-500 shrink-0" /><span>support@mayanhvietnam.com</span></div>
              </div>
              <div className="flex gap-2 mt-5">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-7 h-7 rounded-lg bg-white/8 hover:bg-orange-500 flex items-center justify-center transition-colors group">
                    <Icon size={13} className="text-gray-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Sản Phẩm", links: [{ l:"Máy ảnh", to:"/san-pham?cat=camera" }, { l:"Ống kính", to:"/san-pham?cat=lens" }, { l:"Flycam/Drone", to:"/san-pham?cat=drone" }, { l:"Thiết bị studio", to:"/san-pham?cat=acc" }, { l:"Sản phẩm cũ", to:"/san-pham" }] },
              { title: "Thương Hiệu", links: [{ l:"Canon", to:"/thuong-hieu" }, { l:"Sony", to:"/thuong-hieu" }, { l:"Nikon", to:"/thuong-hieu" }, { l:"DJI", to:"/thuong-hieu" }, { l:"Godox", to:"/thuong-hieu" }] },
              { title: "Hỗ Trợ", links: [{ l:"Chính sách bảo hành", to:"/lien-he" }, { l:"Hướng dẫn mua hàng", to:"/lien-he" }, { l:"Đổi trả hàng", to:"/lien-he" }, { l:"Trả góp 0%", to:"/lien-he" }, { l:"Blog nhiếp ảnh", to:"/tin-tuc" }] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white font-bold text-[11px] mb-4 uppercase tracking-wider"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(item => (
                    <li key={item.l}><Link to={item.to} className="text-[12px] hover:text-orange-400 transition-colors">{item.l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8 pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-gray-600">© 2026 MayAnhVietnam. All rights reserved.</p>
            <div className="flex gap-2">
              {["VISA","MASTERCARD","MOMO","VNPAY","ZaloPay"].map(p => (
                <span key={p} className="bg-white/8 rounded px-2 py-1 text-[9px] font-bold text-gray-500">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
