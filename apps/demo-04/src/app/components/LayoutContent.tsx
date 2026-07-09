'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from "react";
import {
  Sun, Moon, Search, ShoppingCart, User, Camera, Menu, X,
  Phone, Mail, MapPin, Aperture, Video, Zap, Navigation2,
  Lightbulb, Package, RotateCcw, Clapperboard, ChevronDown,
  Gift, Truck, Shield, CreditCard, ChevronRight,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/app/context";
import { ACCENT } from "@/app/data";

/* ── Data ─────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { icon: Camera,       label: "Máy ảnh",           path: "/san-pham", hasDropdown: true },
  { icon: Aperture,     label: "Ống kính",           path: "/san-pham", hasDropdown: true },
  { icon: Video,        label: "Máy quay phim",      path: "/san-pham", hasDropdown: true },
  { icon: Zap,          label: "Action Camera",      path: "/san-pham", hasDropdown: false },
  { icon: Navigation2,  label: "Flycam",             path: "/san-pham", hasDropdown: false },
  { icon: Lightbulb,    label: "Thiết bị Studio",   path: "/san-pham", hasDropdown: true },
  { icon: Package,      label: "Phụ kiện",           path: "/san-pham", hasDropdown: true },
  { icon: RotateCcw,    label: "Sản phẩm cũ",       path: "/san-pham", hasDropdown: false },
  { icon: Clapperboard, label: "Setup Phòng Studio", path: "/san-pham", hasDropdown: false, highlight: true },
];

const MAIN_NAV = [
  { label: "Trang chủ",   path: "/" },
  { label: "Sản phẩm",    path: "/san-pham" },
  { label: "Thương hiệu", path: "/thuong-hieu" },
  { label: "Liên hệ",     path: "/lien-he" },
];

const ANNOUNCE = [
  { icon: Truck,      text: "Miễn phí vận chuyển đơn từ 500K" },
  { icon: Shield,     text: "Bảo hành chính hãng 24 tháng" },
  { icon: CreditCard, text: "Trả góp 0% lãi suất" },
  { icon: Gift,       text: "Quà tặng hấp dẫn cho đơn từ 2 triệu" },
];

/* ── Announcement ticker ──────────────────────────────────────────────── */
function AnnounceTicker({ dark }: { dark: boolean }) {
  return (
    <div
      className="hidden sm:flex items-center justify-between px-6 h-8 text-[11px] font-medium overflow-hidden"
      style={{
        background: dark
          ? "linear-gradient(90deg,#1a0c04 0%,#120808 100%)"
          : "linear-gradient(90deg,#b83d0e 0%,#9e2f08 100%)",
      }}
    >
      <div className="flex items-center gap-6">
        {ANNOUNCE.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5 text-white/85 whitespace-nowrap">
            <Icon size={11} className="text-white/60 flex-shrink-0" />
            {text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 text-white/70 flex-shrink-0">
        <span className="font-mono tracking-wide text-white/90">HOTLINE: 0903.148-222</span>
        <span>|</span>
        <button className="hover:text-white transition-colors">Đăng nhập</button>
        <span>/</span>
        <button className="hover:text-white transition-colors">Đăng ký</button>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */
export default function Layout({ children }: { children?: React.ReactNode }) {
  const { dark, toggle } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [cartCount] = useState(3);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  /* gradient strings reused throughout */
  const topGrad = dark
    ? "linear-gradient(135deg,#1e0f07 0%,#2c1508 100%)"
    : "linear-gradient(135deg,#e04f18 0%,#FF6B35 55%,#ff8549 100%)";

  const catBg = dark ? "#0e0d18" : "#1c120a";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300 overflow-x-hidden">

      {/* ══ HEADER ═══════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 shadow-[0_2px_24px_rgba(0,0,0,0.28)]">

        {/* ① Announcement ticker */}
        <AnnounceTicker dark={dark} />

        {/* ② Row 1 — Logo / Search / Icons */}
        <div style={{ background: topGrad }}>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-[68px] flex items-center gap-4">

            {/* Logo */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-3 flex-shrink-0 group"
              aria-label="Trang chủ"
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.16)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22), 0 2px 8px rgba(0,0,0,0.22)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                }}
              >
                <Camera size={20} className="text-white drop-shadow" />
              </div>
              <div className="hidden sm:block leading-none select-none">
                <div className="text-[15px] font-black tracking-[0.08em] text-white drop-shadow-sm">
                  CAMERA STORE VN
                </div>
                <div className="text-[10px] font-medium tracking-[0.18em] text-white/65 mt-0.5">
                  Vì lợi ích khách hàng
                </div>
              </div>
            </button>

            {/* Search */}
            <div className="flex-1 max-w-[560px] mx-auto hidden sm:block">
              <div
                className="relative flex items-center rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  boxShadow: searchFocused
                    ? "0 0 0 3px rgba(255,255,255,0.35), 0 4px 20px rgba(0,0,0,0.25)"
                    : "0 2px 10px rgba(0,0,0,0.18)",
                }}
              >
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Tìm kiếm sản phẩm, thương hiệu, model..."
                  className="w-full h-11 pl-4 pr-[52px] text-[13px] text-foreground bg-white placeholder:text-gray-400 focus:outline-none"
                  style={{ caretColor: ACCENT }}
                />
                <button
                  className="absolute right-0 h-11 w-[52px] flex items-center justify-center text-white flex-shrink-0 transition-opacity hover:opacity-85"
                  style={{ background: dark ? "#c03a12" : "#cc3f10" }}
                  aria-label="Tìm kiếm"
                >
                  <Search size={17} strokeWidth={2.2} />
                </button>
              </div>
            </div>

            {/* Right action cluster */}
            <div className="flex items-center gap-2 ml-auto flex-shrink-0">

              {/* Hotline (lg+) */}
              <div className="hidden xl:flex flex-col items-end gap-0.5 mr-3 select-none">
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="text-white/70" />
                  <span className="text-[12px] font-black tracking-wide text-white">0903.148-222</span>
                </div>
                <span className="text-[9px] tracking-[0.16em] text-white/55 uppercase">
                  Mua hàng · Trả góp · Bảo hành
                </span>
              </div>

              {/* Divider */}
              <div className="hidden xl:block w-px h-8 bg-white/20 mr-1" />

              {/* Theme toggle */}
              <NavIconBtn onClick={toggle} title={dark ? "Chế độ sáng" : "Chế độ tối"}>
                {dark ? <Sun size={16} className="text-amber-300" /> : <Moon size={16} className="text-white" />}
              </NavIconBtn>

              {/* User */}
              <NavIconBtn title="Tài khoản" className="hidden sm:flex">
                <User size={16} className="text-white" />
              </NavIconBtn>

              {/* Cart */}
              <button
                className="relative flex items-center gap-2 pl-3 pr-4 h-10 rounded-xl text-white font-bold text-[13px] transition-all duration-150 hover:scale-105 active:scale-100 flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.18)",
                  border: "1.5px solid rgba(255,255,255,0.28)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
                title="Giỏ hàng"
              >
                <ShoppingCart size={16} strokeWidth={2} />
                <span className="hidden sm:inline text-[12px]">Giỏ hàng</span>
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shadow-md"
                    style={{ background: "#fbbf24", color: "#1c0a00" }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <NavIconBtn
                onClick={() => setMobileOpen(!mobileOpen)}
                className="sm:hidden"
                title="Menu"
              >
                {mobileOpen
                  ? <X size={18} className="text-white" />
                  : <Menu size={18} className="text-white" />
                }
              </NavIconBtn>
            </div>
          </div>
        </div>

        {/* ③ Row 2 — Category navigation */}
        <nav
          className="hidden sm:block border-b"
          style={{
            background: catBg,
            borderColor: dark ? "rgba(255,107,53,0.12)" : "rgba(0,0,0,0.35)",
          }}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-stretch overflow-x-auto">
              {CATEGORIES.map(({ icon: Icon, label, path, hasDropdown, highlight }) =>
                highlight ? (
                  /* Highlighted CTA pill */
                  <button
                    key={label}
                    onClick={() => router.push(path)}
                    className="flex items-center gap-1.5 px-4 my-1.5 rounded-lg text-[11.5px] font-black tracking-wide whitespace-nowrap flex-shrink-0 transition-all duration-150 hover:scale-105 active:scale-100"
                    style={{ background: "#fbbf24", color: "#1c0800" }}
                  >
                    <Icon size={13} style={{ color: "#1c0800" }} />
                    {label.toUpperCase()}
                  </button>
                ) : (
                  /* Standard category tab */
                  <button
                    key={label}
                    onClick={() => router.push(path)}
                    className="group relative flex items-center gap-1.5 px-3.5 py-2.5 text-[12px] font-semibold whitespace-nowrap flex-shrink-0 transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    {/* Hover + active underline */}
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-full transition-all duration-200 scale-x-0 group-hover:scale-x-100 origin-left"
                      style={{ background: ACCENT }}
                    />
                    <Icon
                      size={13}
                      className="flex-shrink-0 transition-colors duration-150 group-hover:text-orange-400"
                      style={{ color: "rgba(255,255,255,0.42)" }}
                    />
                    <span className="group-hover:text-white transition-colors duration-150">{label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        size={10}
                        className="opacity-40 group-hover:opacity-80 transition-opacity"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      />
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </nav>

        {/* ④ Mobile drawer */}
        {mobileOpen && (
          <div
            className="sm:hidden border-t border-border overflow-y-auto max-h-[80vh]"
            style={{ background: dark ? "#0d0c18" : "#ffffff" }}
          >
            {/* Mobile search */}
            <div className="p-4 border-b border-border">
              <div className="relative flex items-center">
                <Search size={14} className="absolute left-3.5 text-muted-foreground" />
                <input
                  placeholder="Tìm kiếm..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl text-sm border border-border bg-card focus:outline-none focus:ring-2"
                  style={{ caretColor: ACCENT, "--tw-ring-color": `${ACCENT}40` } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Nav pages */}
            <div className="p-3 border-b border-border">
              {MAIN_NAV.map(({ label, path }) => (
                <button
                  key={path}
                  onClick={() => { router.push(path); setMobileOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-colors hover:bg-muted"
                  style={isActive(path) ? { color: ACCENT } : {}}
                >
                  {label}
                  <ChevronRight size={14} className="text-muted-foreground" />
                </button>
              ))}
            </div>

            {/* Categories */}
            <div className="p-3 border-b border-border">
              <p className="px-4 pb-2 text-[9px] font-mono font-bold tracking-[0.24em] text-muted-foreground uppercase">
                Danh mục sản phẩm
              </p>
              <div className="grid grid-cols-2 gap-1">
                {CATEGORIES.map(({ icon: Icon, label, path, highlight }) => (
                  <button
                    key={label}
                    onClick={() => { router.push(path); setMobileOpen(false); }}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-[12px] font-medium rounded-xl transition-colors hover:bg-muted text-left"
                    style={highlight ? { color: "#d97706", fontWeight: 700 } : { color: dark ? "#a09ab0" : "#5a4530" }}
                  >
                    <Icon size={13} style={{ color: highlight ? "#d97706" : ACCENT }} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hotline + auth */}
            <div className="p-4 flex flex-col gap-2">
              <Link href="tel:0903148222"
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm"
                style={{ background: `${ACCENT}18`, color: ACCENT }}
              >
                <Phone size={15} />
                Gọi ngay: 0903.148-222
              </Link>
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors"
                >
                  Đăng nhập
                </button>
                <button
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      {children}

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer
        className="border-t border-border pt-14 pb-6"
        style={{ background: dark ? "#0a0a12" : "#f5f0e8" }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">

          {/* Trust badges */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-12 rounded-2xl overflow-hidden border border-border"
            style={{ background: dark ? "rgba(255,107,53,0.05)" : "rgba(255,107,53,0.06)" }}
          >
            {[
              { icon: Truck,      title: "Giao hàng toàn quốc",    sub: "Miễn phí đơn từ 500K, 24h" },
              { icon: Shield,     title: "Sản phẩm chính hãng",    sub: "100% tem bảo hành NSX" },
              { icon: RotateCcw,  title: "Đổi trả 30 ngày",        sub: "Không cần lý do" },
              { icon: CreditCard, title: "Trả góp 0% lãi",         sub: "MoMo, ZaloPay, thẻ tín dụng" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3 px-5 py-4 bg-card">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${ACCENT}15` }}
                >
                  <Icon size={18} style={{ color: ACCENT }} />
                </div>
                <div>
                  <p className="text-[12px] font-bold leading-tight">{title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ACCENT }}>
                  <Camera size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-[12px] font-black tracking-[0.14em]">CAMERA STORE VN</div>
                  <div className="text-[9px] tracking-[0.24em] text-muted-foreground mt-0.5">Vì lợi ích khách hàng</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                Hệ thống cửa hàng thiết bị máy ảnh chuyên nghiệp hàng đầu Việt Nam. Chính hãng · Bảo hành uy tín · Giá tốt nhất thị trường.
              </p>
              <div className="flex gap-2">
                {["FB", "IG", "YT", "TK"].map(s => (
                  <button
                    key={s}
                    className="w-8 h-8 rounded-lg border border-border text-[9px] font-mono font-bold text-muted-foreground hover:border-[rgba(255,107,53,0.5)] hover:text-foreground transition-colors"
                  >{s}</button>
                ))}
              </div>
            </div>

            {[
              {
                heading: "Sản phẩm",
                links: ["Máy ảnh Mirrorless", "Máy ảnh DSLR", "Ống kính", "Drone / Flycam", "Phụ kiện", "Âm thanh"],
              },
              {
                heading: "Hỗ trợ",
                links: ["Chính sách bảo hành", "Hướng dẫn mua hàng", "Tra cứu đơn hàng", "Trả góp 0% lãi", "Trade-in thu cũ", "Tư vấn chọn máy"],
              },
              {
                heading: "Liên hệ",
                links: null,
              },
            ].map(col => (
              <div key={col.heading}>
                <p className="text-[9px] font-mono font-bold tracking-[0.22em] text-muted-foreground uppercase mb-4">{col.heading}</p>
                {col.links ? (
                  <div className="flex flex-col gap-2.5">
                    {col.links.map(l => (
                      <button key={l} className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left">{l}</button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: Phone,  t: "1800 6789 (miễn phí)" },
                      { icon: Mail,   t: "support@camerastore.vn" },
                      { icon: MapPin, t: "HCM · Hà Nội · Đà Nẵng · Cần Thơ" },
                    ].map(({ icon: Icon, t }) => (
                      <div key={t} className="flex items-start gap-2.5">
                        <Icon size={12} style={{ color: ACCENT }} className="flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">{t}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] font-mono text-muted-foreground">
              © 2025 Camera Store VN · Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-4">
              {["Bảo mật", "Điều khoản", "Sitemap"].map(l => (
                <button key={l} className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors">{l}</button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              {["VISA", "MC", "JCB", "MoMo", "ZaloPay"].map(p => (
                <div key={p} className="px-2 py-0.5 rounded border border-border text-[8px] font-mono font-bold text-muted-foreground">{p}</div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        *::-webkit-scrollbar { display: none }
        * { scrollbar-width: none }
      `}</style>
    </div>
  );
}

/* ── Shared icon button ───────────────────────────────────────────────── */
function NavIconBtn({
  onClick, title, children, className = "",
}: {
  onClick?: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150 hover:scale-105 active:scale-100 flex-shrink-0 ${className}`}
      style={{
        background: "rgba(255,255,255,0.14)",
        border: "1.5px solid rgba(255,255,255,0.22)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
      }}
    >
      {children}
    </button>
  );
}
