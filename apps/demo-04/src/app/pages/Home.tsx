/**
 * demo-04 Home page
 * ─────────────────────────────────────────────────────────────
 * Real data từ homepage.json (scraped 2026-07-10)
 * Source: /docs/scraped/homepage.json
 *
 * Sections:
 * 1. Hero carousel — 5 real banners (tet campaign)
 * 2. Featured product — Nikon Z6 II
 * 3. Categories grid — 9 real categories with CDN thumbnails
 * 4. Top Cameras — 10 real products
 * 5. Top Lenses — 10 real products
 * 6. Top Flycam — 10 real products
 * 7. Top Action Camera — 10 real products
 * 8. Reviews (YouTube)
 * 9. Newsletter
 * 10. News (placeholder editorial images)
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  ChevronRight, ChevronLeft, ArrowRight, Timer,
  Package, Headphones, Aperture, Camera, Zap, Quote,
  ShoppingBag, Video, Settings, Film, Headphones as HeadphonesIcon,
  Star, ExternalLink, Youtube,
} from "lucide-react";
import {
  ACCENT, vnd,
  HOMEPAGE_BANNERS,
  TOP_CAMERAS, TOP_LENSES, TOP_FLYCAM, TOP_ACTION_CAMERA,
  FEATURED_PRODUCT,
  REVIEWS_SECTION,
  NEWS,
  categories,
  CAT_ICON_MAP,
} from "../data";
import { SectionHeader, Chip } from "../components/ui";

/* ── Hero carousel ──────────────────────────────────────────── */
function HeroCarousel() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((v) => (v + 1) % HOMEPAGE_BANNERS.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ height: "clamp(380px,52vh,540px)" }}>
      {HOMEPAGE_BANNERS.map((b, i) => (
        <a key={b.id} href={b.link} className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === slide ? 1 : 0, pointerEvents: i === slide ? "auto" : "none" }}>
          <img src={b.imageUrl} alt={`Banner ${i + 1}`}
            className="w-full h-full object-cover object-center" />
        </a>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {HOMEPAGE_BANNERS.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === slide ? 28 : 8, height: 8, background: i === slide ? ACCENT : "rgba(255,255,255,0.35)" }} />
        ))}
      </div>
      {/* Arrows */}
      <button onClick={() => setSlide((slide - 1 + HOMEPAGE_BANNERS.length) % HOMEPAGE_BANNERS.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10">
        <ChevronLeft size={16} />
      </button>
      <button onClick={() => setSlide((slide + 1) % HOMEPAGE_BANNERS.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10">
        <ChevronRight size={16} />
      </button>
    </section>
  );
}

/* ── Countdown timer ───────────────────────────────────────── */
function useCountdown(end: Date) {
  const calc = () => {
    const d = end.getTime() - Date.now();
    return d > 0
      ? { h: Math.floor(d / 3600000), m: Math.floor((d % 3600000) / 60000), s: Math.floor((d % 60000) / 1000) }
      : { h: 0, m: 0, s: 0 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* ── HomepageProduct card (scraped products) ─────────────────── */
function ProductCard2({ p }: { p: { name: string; priceDisplay: string; img: string; link: string } }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(p.link)}
      className="group rounded-2xl overflow-hidden border border-border bg-card cursor-pointer transition-all duration-300 hover:border-[rgba(255,107,53,0.45)] hover:-translate-y-1">
      <div className="relative overflow-hidden bg-muted" style={{ paddingBottom: "72%" }}>
        {p.img
          ? <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]" />
          : <div className="absolute inset-0 flex items-center justify-center">
              <Camera size={32} className="text-muted-foreground/30" />
            </div>
        }
      </div>
      <div className="p-3.5">
        <h3 className="text-xs font-semibold leading-snug line-clamp-2 mb-2 min-h-[2.5rem]">{p.name}</h3>
        <p className="font-mono font-bold text-sm" style={{ color: ACCENT }}>{p.priceDisplay}</p>
      </div>
    </div>
  );
}

/* ── Featured product section ───────────────────────────────── */
function FeaturedSection() {
  const { dark } = useTheme();
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="rounded-3xl overflow-hidden border border-border flex flex-col lg:flex-row"
          style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.75)" }}>
          {/* Left: info */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            <p className="text-[10px] font-mono tracking-[0.22em] mb-3" style={{ color: ACCENT }}>SẢN PHẨM NỔI BẬT</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 leading-tight">{FEATURED_PRODUCT.name}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">{FEATURED_PRODUCT.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {FEATURED_PRODUCT.badges.map((b) => (
                <span key={b} className="text-[10px] font-mono px-2.5 py-1 rounded-full border" style={{ borderColor: ACCENT, color: ACCENT }}>{b}</span>
              ))}
            </div>
            <a href={FEATURED_PRODUCT.detailUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold w-fit hover:opacity-90 active:scale-95 transition-all"
              style={{ background: ACCENT, boxShadow: `0 4px 20px ${ACCENT}45` }}>
              Xem chi tiết <ExternalLink size={14} />
            </a>
          </div>
          {/* Right: image */}
          <div className="lg:w-[420px] h-56 lg:h-auto overflow-hidden">
            <img
              src="https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-18/230418180440520/avatar/nikon-z6-ii-500x500_may-anh-nikon-z6-ii-body-only-chinh-hang.jpg"
              alt={FEATURED_PRODUCT.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Category grid ─────────────────────────────────────────── */
const CAT_LINKS: Record<string, string> = {
  "may-anh": "/danh-muc/may-anh",
  "ong-kinh": "/danh-muc/ong-kinh",
  "san-pham-cu": "/danh-muc-2nd/tat-ca-san-pham",
  "lap-phong-studio": "/dich-vu-lap-phong",
  "action-camera": "/danh-muc/action-camera",
  "flycam": "/danh-muc/flycam",
  "thiet-bi-studio": "/danh-muc/thiet-bi-studio",
  "phu-kien": "/danh-muc/phu-kien",
  "may-quay-phim": "/danh-muc/may-quay-phim",
};

function CategoryGrid() {
  const navigate = useNavigate();
  const { dark } = useTheme();

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionHeader eyebrow="Danh mục" title="Khám phá sản phẩm" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.slice(0, 9).map((c) => {
            const Icon = CAT_ICON_MAP[c.slug] || Package;
            const href = CAT_LINKS[c.slug] || `/danh-muc/${c.slug}`;
            return (
              <div key={c.id} onClick={() => navigate(href)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-[rgba(255,107,53,0.45)] transition-all duration-300 hover:-translate-y-1"
                style={{ aspectRatio: "4/3" }}>
                <img src={c.image || ""} alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.25) 55%,transparent 100%)" }} />
                <div className="absolute inset-0 flex flex-col justify-end p-3.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5"
                    style={{ background: "rgba(255,107,53,0.18)", border: "1px solid rgba(255,107,53,0.38)" }}>
                    <Icon size={14} style={{ color: ACCENT }} />
                  </div>
                  <p className="text-xs font-bold text-white leading-tight">{c.name}</p>
                  <p className="text-[10px] font-mono text-white/55 mt-0.5">{c.productCount} sản phẩm</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Scrollable product section ─────────────────────────────── */
function ProductRow({ title, eyebrow, products, seeAllHref }: {
  title: string; eyebrow: string; products: { name: string; priceDisplay: string; img: string; link: string }[];
  seeAllHref?: string;
}) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { dark } = useTheme();

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] font-mono tracking-[0.22em] mb-1" style={{ color: ACCENT }}>{eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
          </div>
          {seeAllHref && (
            <button onClick={() => navigate(seeAllHref)}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>
              Xem tất cả <ChevronRight size={14} />
            </button>
          )}
          {/* Scroll buttons */}
          <div className="flex gap-2">
            <button onClick={() => scrollRef.current?.scrollBy({ left: -280, behavior: "smooth" })}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-[rgba(255,107,53,0.5)] transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => scrollRef.current?.scrollBy({ left: 280, behavior: "smooth" })}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-[rgba(255,107,53,0.5)] transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-x-auto pb-2">
          {products.map((p) => (
            <ProductCard2 key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reviews section ──────────────────────────────────────── */
function ReviewsSection() {
  const { dark } = useTheme();
  return (
    <section className="py-12 sm:py-16 border-t border-border"
      style={{ background: dark ? "rgba(255,255,255,0.016)" : "rgba(255,248,240,0.7)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-[10px] font-mono tracking-[0.22em] mb-1.5" style={{ color: ACCENT }}>REVIEWS</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Videos từ Máy Ảnh Việt Nam</h2>
          </div>
          <a href={REVIEWS_SECTION.youtubeUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
            style={{ background: "#FF0000", boxShadow: "0 4px 16px rgba(255,0,0,0.35)" }}>
            <Youtube size={16} /> Xem trên YouTube
          </a>
        </div>
        <div className="rounded-3xl overflow-hidden border border-border aspect-video max-w-2xl">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed?listType=user_uploads&list=mayanhvietnam"
            title="Reviews Máy Ảnh Việt Nam"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

/* ── Newsletter ─────────────────────────────────────────────── */
function NewsletterSection() {
  const { dark } = useTheme();
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-border p-8 sm:p-14 text-center"
          style={{ background: dark ? "rgba(255,107,53,0.06)" : "rgba(255,107,53,0.05)" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: dark ? "radial-gradient(ellipse 70% 80% at 50% 50%,rgba(255,107,53,0.11) 0%,transparent 70%)" : "radial-gradient(ellipse 70% 80% at 50% 50%,rgba(255,107,53,0.07) 0%,transparent 70%)" }} />
          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
              Nhận ưu đãi độc quyền<br className="hidden sm:block" /> từ Máy Ảnh Việt Nam
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
              Cập nhật sản phẩm mới, khuyến mãi đặc biệt và mẹo chụp ảnh từ chuyên gia mỗi tuần.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Nhập email của bạn..."
                className="w-full sm:flex-1 h-11 px-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,53,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "")}
              />
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl text-white text-sm font-semibold flex items-center gap-2 justify-center hover:opacity-90 active:scale-95 transition-all"
                style={{ background: ACCENT, boxShadow: dark ? "0 0 24px rgba(255,107,53,0.4)" : "0 4px 16px rgba(255,107,53,0.3)" }}>
                Đăng ký <ArrowRight size={14} />
              </button>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground mt-4">Không spam · Hủy đăng ký bất kỳ lúc nào</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── News section ──────────────────────────────────────────── */
function NewsSection() {
  const navigate = useNavigate();
  return (
    <section className="pb-12 sm:pb-16">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionHeader eyebrow="Blog & Hướng dẫn" title="Tin tức mới nhất" link="Xem tất cả" onLink={() => navigate("/san-pham")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NEWS.slice(0, 3).map((n) => (
            <div key={n.id} onClick={() => navigate("/san-pham")}
              className="group rounded-2xl overflow-hidden border border-border bg-card cursor-pointer hover:border-[rgba(255,107,53,0.4)] transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden bg-muted" style={{ height: 180 }}>
                <img src={n.img} alt={n.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
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
  );
}

/* ── Import useTheme for FeaturedSection ────────────────────── */
import { useTheme } from "../context";

/* ── Main Home export ──────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <HeroCarousel />
      <FeaturedSection />
      <CategoryGrid />
      <ProductRow title="Máy ảnh nổi bật" eyebrow="TOP CAMERAS" products={TOP_CAMERAS} seeAllHref="/danh-muc/may-anh" />
      <ProductRow title="Ống kính nổi bật" eyebrow="TOP LENSES" products={TOP_LENSES} seeAllHref="/danh-muc/ong-kinh" />
      <ProductRow title="Flycam nổi bật" eyebrow="TOP FLYCAM" products={TOP_FLYCAM} seeAllHref="/danh-muc/flycam" />
      <ProductRow title="Camera hành động nổi bật" eyebrow="TOP ACTION CAMERA" products={TOP_ACTION_CAMERA} seeAllHref="/danh-muc/action-camera" />
      <ReviewsSection />
      <NewsletterSection />
      <NewsSection />
    </>
  );
}
