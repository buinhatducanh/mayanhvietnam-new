'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, ArrowRight, Timer, Package, Headphones, Aperture, Camera, Zap, Quote } from "lucide-react";
import { useTheme } from "@/app/context";
import { ACCENT, vnd, PRODUCTS, NEWS } from "@/app/data";
import { ProductCard, SectionHeader, Stars, Chip } from "@/app/components/ui";

const BANNERS = [
  { id: 0, eyebrow: "Mới ra mắt 2025", headline: "Canon EOS\nR6 Mark II", sub: "40fps burst · AI Autofocus · 6K RAW — Chiếc máy ảnh full-frame đỉnh cao nhất của Canon.", cta: "Khám phá ngay", price: "49.990.000₫", badge: "NEW ARRIVAL", tag: ACCENT, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&h=700&fit=crop&auto=format", productId: 1 },
  { id: 1, eyebrow: "Flycam chính hãng", headline: "DJI Mini 4\nPro Fly More", sub: "249g · 4K/60fps HDR · Tránh vật cản 4 chiều · Bay 34 phút liên tục.", cta: "Mua ngay", price: "20.890.000₫", badge: "HOT DEAL", tag: "#ef4444", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1400&h=700&fit=crop&auto=format", productId: 5 },
  { id: 2, eyebrow: "Giảm đến 12%", headline: "Sony A7 IV\nBody Only", sub: "33MP BSI CMOS · 4K 60fps 10-bit · 759-point AI AF — Lựa chọn hoàn hảo cho content creator.", cta: "Flash Sale ngay", price: "64.000.000₫", badge: "SALE -12%", tag: "#22c55e", img: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=1400&h=700&fit=crop&auto=format", productId: 2 },
];

const BRANDS = ["Canon", "Sony", "Nikon", "Fujifilm", "DJI", "Sigma", "Tamron", "Godox"];

const CATEGORIES = [
  { icon: Camera,     label: "Mirrorless",  count: 142, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=320&h=220&fit=crop&auto=format" },
  { icon: Aperture,   label: "Ống kính",    count: 218, img: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=320&h=220&fit=crop&auto=format" },
  { icon: Zap,        label: "Drone",       count: 47,  img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=320&h=220&fit=crop&auto=format" },
  { icon: Package,    label: "Phụ kiện",    count: 365, img: "https://images.unsplash.com/photo-1594147216879-97803adfb44d?w=320&h=220&fit=crop&auto=format" },
  { icon: Headphones, label: "Âm thanh",   count: 89,  img: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=320&h=220&fit=crop&auto=format" },
];

const TRUST = [
  { icon: Package, title: "Giao hàng toàn quốc", desc: "Miễn phí đơn từ 500K, giao trong 24h" },
  { icon: Camera,  title: "Sản phẩm chính hãng",  desc: "100% hàng chính hãng có tem bảo hành" },
  { icon: Zap,     title: "Bảo hành 24 tháng",    desc: "Đổi trả 30 ngày không cần lý do" },
  { icon: Headphones, title: "Trả góp 0% lãi",   desc: "Ví điện tử, thẻ, trả góp 0% lãi suất" },
];

const FLASH = [
  { id: 2, name: "Canon EOS R50 Kit 18-45mm",  brand: "Canon", price: 19990000, originalPrice: 23500000, img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=360&h=280&fit=crop&auto=format", badge: "HOT", sold: 521 },
  { id: 2, name: "Sony A7 IV Body Only",        brand: "Sony",  price: 64000000, originalPrice: 72000000, img: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=360&h=280&fit=crop&auto=format", badge: "SALE", sold: 312 },
  { id: 3, name: "Sigma 35mm f/1.4 DG DN Art", brand: "Sigma", price: 18500000, originalPrice: 22000000, img: "https://images.unsplash.com/photo-1546434946-1185c1319364?w=360&h=280&fit=crop&auto=format", badge: "SALE", sold: 97 },
  { id: 5, name: "DJI Mini 4 Pro Fly More",    brand: "DJI",   price: 20890000, originalPrice: 24900000, img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=360&h=280&fit=crop&auto=format", badge: "HOT",  sold: 189 },
];

const REVIEWS = [
  { id: 1, name: "Nguyễn Minh Tuấn", role: "Nhiếp ảnh gia thương mại", avatar: "https://images.unsplash.com/photo-1598367886186-71a4e6afc589?w=80&h=80&fit=crop&auto=format", rating: 5, product: "Canon EOS R6 Mark II", text: "Mua Canon R6 Mark II tại đây, dịch vụ rất chuyên nghiệp. Máy chính hãng, được kiểm tra kỹ trước khi giao. AF nhanh không tưởng, chụp sự kiện rất đã.", date: "12/06/2025" },
  { id: 2, name: "Trần Thị Thu Hà",  role: "Content Creator", avatar: "https://images.unsplash.com/photo-1647265888356-98a396a0000f?w=80&h=80&fit=crop&auto=format", rating: 5, product: "Sony A7 IV + FE 50mm", text: "Shop tư vấn rất tận tình. Giao hàng nhanh, đóng gói cẩn thận. Ảnh chụp ra màu sắc đẹp, mình hài lòng 100%.", date: "28/05/2025" },
  { id: 3, name: "Lê Hoàng Phúc",   role: "Travel Photographer", avatar: "https://images.unsplash.com/photo-1590006447689-3891b1c63f22?w=80&h=80&fit=crop&auto=format", rating: 5, product: "DJI Mini 4 Pro", text: "DJI Mini 4 Pro quá ngon cho travel. Shop hỗ trợ kích hoạt DJI Care Refresh ngay tại chỗ. Giá cạnh tranh nhất thị trường!", date: "03/06/2025" },
];

function useCountdown(end: Date) {
  const calc = () => { const d = end.getTime() - Date.now(); return d > 0 ? { h: Math.floor(d/3600000), m: Math.floor((d%3600000)/60000), s: Math.floor((d%60000)/1000) } : { h:0,m:0,s:0 }; };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

export default function Home() {
  const router = useRouter();
  const { dark } = useTheme();
  const [slide, setSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const saleEnd = useRef(new Date(Date.now() + 1000*(3600*5+60*42+17)));
  const { h, m, s } = useCountdown(saleEnd.current);
  const TABS = ["Tất cả", "Mirrorless", "DSLR", "Ống kính", "Drone"];

  useEffect(() => {
    const id = setInterval(() => setSlide(v => (v+1)%BANNERS.length), 5500);
    return () => clearInterval(id);
  }, []);

  const b = BANNERS[slide];

  return (
    <>
      {/* ── BANNER CAROUSEL ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "clamp(400px,56vh,580px)" }}>
        {BANNERS.map((bn, i) => (
          <div key={bn.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i===slide ? 1:0, pointerEvents: i===slide ? "auto":"none" }}>
            <img src={bn.img} alt={bn.headline} className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(100deg,rgba(10,10,15,0.96) 0%,rgba(10,10,15,0.80) 40%,rgba(10,10,15,0.30) 70%,transparent 100%)" : "linear-gradient(100deg,rgba(255,248,240,0.97) 0%,rgba(255,248,240,0.84) 40%,rgba(255,248,240,0.35) 70%,transparent 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 65% at 12% 58%,${bn.tag}30 0%,transparent 65%)` }} />
          </div>
        ))}

        <div className="relative h-full max-w-[1400px] mx-auto px-5 sm:px-8 flex items-center">
          <div className="max-w-xl">
            <span className="inline-block text-[9px] font-mono font-bold tracking-[0.28em] px-3 py-1 rounded-sm mb-5"
              style={{ background: `${b.tag}20`, color: b.tag, border: `1px solid ${b.tag}40` }}>
              {b.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black tracking-tight leading-[1.04] mb-4" style={{ whiteSpace:"pre-line" }}>
              {b.headline}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed max-w-md">{b.sub}</p>
            <div className="flex items-center gap-5 flex-wrap">
              <button onClick={() => router.push(`/san-pham/${b.productId}`)}
                className="px-7 py-3.5 rounded-xl text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                style={{ background: b.tag, boxShadow: `0 4px 24px ${b.tag}55` }}>
                {b.cta} <ArrowRight size={15} />
              </button>
              <div>
                <span className="text-[10px] font-mono text-muted-foreground block">Chỉ từ</span>
                <span className="font-mono font-black text-xl" style={{ color: b.tag }}>{b.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {BANNERS.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className="rounded-full transition-all duration-300"
              style={{ width: i===slide?28:8, height:8, background: i===slide ? ACCENT:"rgba(255,255,255,0.3)" }} />
          ))}
        </div>
        {/* Arrows */}
        <button onClick={() => setSlide((slide-1+BANNERS.length)%BANNERS.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border bg-background/40 backdrop-blur-sm flex items-center justify-center hover:border-[rgba(255,107,53,0.5)] transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button onClick={() => setSlide((slide+1)%BANNERS.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border bg-background/40 backdrop-blur-sm flex items-center justify-center hover:border-[rgba(255,107,53,0.5)] transition-colors">
          <ChevronRight size={16} />
        </button>
        {/* Tab strip */}
        <div className="hidden lg:flex absolute bottom-0 right-0 w-[300px] border-t border-l border-border overflow-hidden rounded-tl-2xl backdrop-blur-md"
          style={{ background: dark ? "rgba(10,10,15,0.86)" : "rgba(255,248,240,0.92)" }}>
          {BANNERS.map((bn, i) => (
            <button key={bn.id} onClick={() => setSlide(i)} className="flex-1 py-3 px-3 transition-all border-r border-border last:border-0"
              style={{ borderTop: i===slide ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
              <p className="text-[9px] font-mono truncate" style={{ color: i===slide ? ACCENT : dark ? "#6b6478" : "#8a6d50", fontWeight: i===slide ? 700 : 400 }}>
                {bn.headline.split("\n")[0]}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ── BRAND STRIP ─────────────────────────────────────────────────── */}
      <section className="border-y border-border py-4" style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.55)" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 flex items-center gap-6 sm:gap-10 justify-between flex-wrap">
          <p className="text-[9px] font-mono tracking-[0.22em] text-muted-foreground uppercase flex-shrink-0">Thương hiệu</p>
          {BRANDS.map(name => (
            <button key={name} onClick={() => router.push("/thuong-hieu")}
              className="text-sm font-mono font-bold text-muted-foreground hover:text-foreground transition-colors" style={{ letterSpacing:"0.14em" }}>
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <SectionHeader eyebrow="Danh mục" title="Khám phá sản phẩm" link="Tất cả danh mục" onLink={() => router.push("/san-pham")} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORIES.map(({ icon: Icon, label, count, img }) => (
              <div key={label} onClick={() => router.push("/san-pham")}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-[rgba(255,107,53,0.45)] transition-all duration-300 hover:-translate-y-1"
                style={{ aspectRatio:"4/3" }}>
                <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]" />
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.2) 55%,transparent 100%)" }} />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background:"rgba(255,107,53,0.18)", border:"1px solid rgba(255,107,53,0.38)" }}>
                    <Icon size={15} style={{ color: ACCENT }} />
                  </div>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-[10px] font-mono text-white/55 mt-0.5">{count} sản phẩm</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ───────────────────────────────────────────────────────── */}
      <section className="border-y border-border" style={{ background: dark ? "rgba(255,107,53,0.025)" : "rgba(255,255,255,0.65)" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
            {TRUST.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 py-4 px-4 sm:px-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"rgba(255,107,53,0.1)" }}>
                  <Icon size={18} style={{ color: ACCENT }} />
                </div>
                <div>
                  <p className="text-xs font-semibold">{title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLASH SALE ──────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-5 mb-8 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: ACCENT, boxShadow: dark?"0 0 20px rgba(255,107,53,0.5)":"0 4px 16px rgba(255,107,53,0.35)" }}>
                <Timer size={18} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-[0.2em] text-muted-foreground uppercase">Giảm đến 25%</p>
                <h2 className="text-2xl font-bold" style={{ color: ACCENT }}>Flash Sale</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground mr-1">Kết thúc sau</span>
              {[{v:h,l:"GIỜ"},{v:m,l:"PHÚT"},{v:s,l:"GIÂY"}].map(({v,l},i) => (
                <div key={l} className="flex items-center gap-2">
                  {i>0 && <span className="font-mono font-black text-lg mb-4" style={{ color: ACCENT }}>:</span>}
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-black text-lg text-white" style={{ background: ACCENT, boxShadow:"0 4px 14px rgba(255,107,53,0.45)" }}>
                      {String(v).padStart(2,"0")}
                    </div>
                    <span className="text-[8px] font-mono text-muted-foreground mt-1">{l}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => router.push("/san-pham")} className="ml-auto hidden sm:flex items-center gap-1.5 text-xs font-semibold hover:opacity-70" style={{ color: ACCENT }}>
              Xem tất cả <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {FLASH.map((p, idx) => {
              const disc = Math.round((1-p.price/p.originalPrice)*100);
              return (
                <div key={idx} onClick={() => router.push(`/san-pham/${p.id}`)}
                  className="group rounded-2xl overflow-hidden border border-border bg-card cursor-pointer transition-all duration-300 hover:border-[rgba(255,107,53,0.5)] hover:-translate-y-1">
                  <div className="relative overflow-hidden bg-muted" style={{ paddingBottom:"76%" }}>
                    <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                    <div className="absolute top-2.5 left-2.5 flex gap-1">
                      <Chip label={p.badge} /><Chip label={`-${disc}%`} />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 px-3 pb-2.5">
                      <div className="flex justify-between text-[9px] font-mono text-white/80 mb-1">
                        <span>Đã bán {p.sold}</span><span>{Math.min(Math.round(p.sold/6),97)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.2)" }}>
                        <div className="h-full rounded-full" style={{ width:`${Math.min(Math.round(p.sold/6),97)}%`, background: ACCENT }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5">
                    <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">{p.brand}</p>
                    <h3 className="text-xs font-semibold leading-snug line-clamp-2 mt-1 mb-2.5">{p.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-mono font-black text-sm" style={{ color: ACCENT }}>{vnd(p.price)}</span>
                      <span className="text-[10px] font-mono text-muted-foreground line-through">{vnd(p.originalPrice)}</span>
                    </div>
                    <button className="w-full py-2 rounded-lg text-xs font-bold text-white hover:opacity-90 active:scale-95 transition-all" style={{ background: ACCENT }}>Mua ngay</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ───────────────────────────────────────────── */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <SectionHeader eyebrow="Bộ sưu tập" title="Sản phẩm nổi bật" link="Xem tất cả" onLink={() => router.push("/san-pham")} />
          <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
            {TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)}
                className="px-4 py-1.5 rounded-xl text-xs font-medium transition-all flex-shrink-0"
                style={activeTab===i ? { background: ACCENT, color:"#fff", boxShadow:"0 4px 14px rgba(255,107,53,0.35)" } : { background: dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)", color: dark?"#9991a8":"#5a4030" }}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {PRODUCTS.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
          <div className="flex justify-center mt-8">
            <button onClick={() => router.push("/san-pham")}
              className="px-8 py-3 rounded-xl border text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity"
              style={{ color: ACCENT, borderColor:"rgba(255,107,53,0.4)" }}>
              Xem thêm sản phẩm <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── PROMO BANNERS ───────────────────────────────────────────────── */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title:"Đổi máy cũ\nlấy máy mới", sub:"Thu cũ đổi mới, giá hỗ trợ tốt nhất. Áp dụng mọi thương hiệu.", badge:"TRADE-IN", color: ACCENT, img:"https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=700&h=320&fit=crop&auto=format" },
              { title:"Trả góp 0%\nđến 24 tháng", sub:"Duyệt nhanh 5 phút, nhận hàng ngay hôm nay. Không cần thế chấp.", badge:"TRẢ GÓP", color:"#3b82f6", img:"https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=700&h=320&fit=crop&auto=format" },
            ].map(bn => (
              <div key={bn.badge} className="relative rounded-2xl overflow-hidden border border-border cursor-pointer group" style={{ minHeight:200 }}>
                <img src={bn.img} alt={bn.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div className="absolute inset-0" style={{ background:"linear-gradient(105deg,rgba(10,10,15,0.9) 0%,rgba(10,10,15,0.42) 60%,transparent 100%)" }} />
                <div className="relative z-10 p-7 h-full flex flex-col justify-center">
                  <span className="inline-block text-[9px] font-mono font-bold tracking-[0.28em] px-2.5 py-1 rounded-sm mb-4 w-fit"
                    style={{ background:`${bn.color}22`, color:bn.color, border:`1px solid ${bn.color}44` }}>{bn.badge}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2.5" style={{ whiteSpace:"pre-line" }}>{bn.title}</h3>
                  <p className="text-sm text-white/60 mb-6 max-w-xs">{bn.sub}</p>
                  <button className="flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl w-fit text-white hover:opacity-90 transition-all"
                    style={{ background:bn.color, boxShadow:`0 4px 18px ${bn.color}55` }}>
                    Xem ngay <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ────────────────────────────────────────────────── */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between mb-7">
            <div>
              <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-1.5">Vừa về hàng</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Sản phẩm mới nhất</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scrollRef.current?.scrollBy({left:-260,behavior:"smooth"})}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-[rgba(255,107,53,0.5)] transition-colors">
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => scrollRef.current?.scrollBy({left:260,behavior:"smooth"})}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-[rgba(255,107,53,0.5)] transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2">
            {PRODUCTS.slice().reverse().map(p => (
              <div key={p.id} onClick={() => router.push(`/san-pham/${p.id}`)}
                className="group flex-shrink-0 w-56 rounded-2xl overflow-hidden border border-border bg-card cursor-pointer transition-all duration-300 hover:border-[rgba(255,107,53,0.5)] hover:-translate-y-1">
                <div className="relative overflow-hidden bg-muted" style={{ height:152 }}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]" />
                  <div className="absolute top-2.5 left-2.5"><Chip label="NEW" /></div>
                </div>
                <div className="p-3.5">
                  <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">{p.brand}</p>
                  <h3 className="text-xs font-semibold leading-snug line-clamp-2 mt-1 mb-2">{p.name}</h3>
                  <p className="font-mono font-bold text-sm" style={{ color: ACCENT }}>{vnd(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border" style={{ background: dark?"rgba(255,255,255,0.016)":"rgba(255,248,240,0.7)" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-1.5">Đánh giá</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Khách hàng nói gì?</h2>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2"><Stars rating={5} size={14} /><span className="font-mono font-black text-xl">4.9</span></div>
              <p className="text-[10px] font-mono text-muted-foreground">Dựa trên 2,841 đánh giá</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {REVIEWS.map(r => (
              <div key={r.id} className="rounded-2xl border border-border p-6 flex flex-col gap-4 hover:border-[rgba(255,107,53,0.35)] transition-all duration-300"
                style={{ background: dark?"rgba(255,255,255,0.035)":"rgba(255,255,255,0.75)" }}>
                <Quote size={22} style={{ color:"rgba(255,107,53,0.28)" }} />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover bg-muted flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold">{r.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{r.role}</p>
                    <div className="flex items-center gap-1.5 mt-0.5"><Stars rating={r.rating} size={10} /><span className="text-[9px] font-mono text-muted-foreground truncate">{r.product}</span></div>
                  </div>
                  <p className="text-[9px] font-mono text-muted-foreground flex-shrink-0">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIN TỨC NỔI BẬT ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <SectionHeader eyebrow="Blog & Hướng dẫn" title="Tin tức mới nhất" link="Xem tất cả" onLink={() => router.push("/tin-tuc")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NEWS.slice(0,3).map(n => (
              <div key={n.id} onClick={() => router.push("/tin-tuc")}
                className="group rounded-2xl overflow-hidden border border-border bg-card cursor-pointer hover:border-[rgba(255,107,53,0.4)] transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden bg-muted" style={{ height:180 }}>
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm text-white" style={{ background: ACCENT }}>{n.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono text-muted-foreground">{n.date}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{n.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold leading-snug line-clamp-2 mb-2">{n.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{n.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-border p-8 sm:p-14 text-center"
            style={{ background: dark?"rgba(255,107,53,0.06)":"rgba(255,107,53,0.05)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: dark?"radial-gradient(ellipse 70% 80% at 50% 50%,rgba(255,107,53,0.11) 0%,transparent 70%)":"radial-gradient(ellipse 70% 80% at 50% 50%,rgba(255,107,53,0.07) 0%,transparent 70%)" }} />
            <div className="relative">
              <span className="inline-block text-[9px] font-mono font-bold tracking-[0.28em] px-3 py-1 rounded-sm mb-5" style={{ background:"rgba(255,107,53,0.13)", color: ACCENT, border:"1px solid rgba(255,107,53,0.28)" }}>ĐĂNG KÝ NHẬN TIN</span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">Nhận ưu đãi độc quyền<br className="hidden sm:block" /> từ Camera Store</h2>
              <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">Cập nhật sản phẩm mới, khuyến mãi đặc biệt và mẹo chụp ảnh từ chuyên gia mỗi tuần.</p>
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <input type="email" placeholder="Nhập email của bạn..."
                  className="w-full sm:flex-1 px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
                  style={{ caretColor: ACCENT }}
                  onFocus={e => e.currentTarget.style.borderColor="rgba(255,107,53,0.5)"}
                  onBlur={e => e.currentTarget.style.borderColor=""} />
                <button className="w-full sm:w-auto px-6 py-3 rounded-xl text-white text-sm font-semibold flex items-center gap-2 justify-center hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: ACCENT, boxShadow: dark?"0 0 24px rgba(255,107,53,0.4)":"0 4px 16px rgba(255,107,53,0.3)" }}>
                  Đăng ký <ArrowRight size={14} />
                </button>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground mt-4">Không spam · Hủy đăng ký bất kỳ lúc nào</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
