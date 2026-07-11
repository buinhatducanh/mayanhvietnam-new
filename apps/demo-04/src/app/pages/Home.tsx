/**
 * demo-04 Home page
 * Real scraped data từ mayanhvietnam.com (2026-07-10)
 * Sections: Hero · Featured · Categories · Top Cameras · Top Lenses · YouTube · Newsletter
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  ChevronRight, ChevronLeft, ArrowRight,
  Camera, Package, ExternalLink, Youtube,
} from "lucide-react";
import {
  ACCENT, vnd,
  HOMEPAGE_BANNERS,
  TOP_CAMERAS, TOP_LENSES,
  FEATURED_PRODUCT,
  REVIEWS_SECTION,
  categories,
  PRODUCT_BY_SLUG,
} from "../data";
import { CAT_ICON_MAP } from "../components/BrandLogos";
import { SectionHeader, ProductCard } from "../components/ui";

/* ── Hero carousel ───────────────────────────────────── */
function HeroCarousel() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((v) => (v + 1) % HOMEPAGE_BANNERS.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full">
      {HOMEPAGE_BANNERS.map((b, i) => (
        <a
          key={b.id}
          href={b.link}
          className="block transition-opacity duration-700"
          style={{
            opacity: i === slide ? 1 : 0,
            position: i === slide ? "relative" : "absolute",
            inset: 0,
            pointerEvents: i === slide ? "auto" : "none",
          }}
        >
          <img
            src={b.imageUrl}
            alt={`Banner ${i + 1}`}
            className="w-full object-contain"
            style={{ maxHeight: 560, display: "block" }}
          />
        </a>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
        {HOMEPAGE_BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === slide ? 28 : 8, height: 8, background: i === slide ? ACCENT : "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>

      {/* Prev */}
      <button
        onClick={() => setSlide((slide - 1 + HOMEPAGE_BANNERS.length) % HOMEPAGE_BANNERS.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-all z-10"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Next */}
      <button
        onClick={() => setSlide((slide + 1) % HOMEPAGE_BANNERS.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-all z-10"
      >
        <ChevronRight size={16} />
      </button>
    </section>
  );
}

/* ── Featured product ──────────────────────────────────── */
function FeaturedSection() {
  const { dark } = useTheme();
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div
          className="rounded-3xl overflow-hidden border border-border flex flex-col lg:flex-row"
          style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.75)" }}
        >
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            <p className="text-[10px] font-mono tracking-[0.22em] mb-3" style={{ color: ACCENT }}>
              SẢN PHẨM NỔI BẬT
            </p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 leading-tight">
              {FEATURED_PRODUCT.name}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
              {FEATURED_PRODUCT.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {FEATURED_PRODUCT.badges.map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-full border"
                  style={{ borderColor: ACCENT, color: ACCENT }}
                >
                  {b}
                </span>
              ))}
            </div>
            <a
              href={FEATURED_PRODUCT.detailUrl}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold w-fit hover:opacity-90 active:scale-95 transition-all"
              style={{ background: ACCENT, boxShadow: `0 4px 20px ${ACCENT}45` }}
            >
              Xem chi tiết <ExternalLink size={14} />
            </a>
          </div>
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

import { useTheme } from "../context";

/* ── Category grid ────────────────────────────────────── */
function CategoryGrid() {
  const navigate = useNavigate();
  const CAT_LINKS: Record<string, string> = {
    "may-anh": "/san-pham?cat=may-anh",
    "ong-kinh": "/san-pham?cat=ong-kinh",
    "san-pham-cu": "/san-pham?cat=san-pham-cu",
    "lap-phong-studio": "/san-pham?cat=lap-phong-studio",
    "action-camera": "/san-pham?cat=action-camera",
    flycam: "/san-pham?cat=flycam",
    "thiet-bi-studio": "/san-pham?cat=thiet-bi-studio",
    "phu-kien": "/san-pham?cat=phu-kien",
    "may-quay-phim": "/san-pham?cat=may-quay-phim",
  };

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionHeader eyebrow="Danh mục" title="Khám phá sản phẩm" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.slice(0, 9).map((c) => {
            const Icon = CAT_ICON_MAP[c.slug] || Package;
            const href = CAT_LINKS[c.slug] || `/danh-muc/${c.slug}`;
            return (
              <div
                key={c.id}
                onClick={() => navigate(href)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-[rgba(255,107,53,0.45)] transition-all duration-300 hover:-translate-y-1"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={c.image || ""}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.25) 55%,transparent 100%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-3.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5"
                    style={{
                      background: "rgba(255,107,53,0.18)",
                      border: "1px solid rgba(255,107,53,0.38)",
                    }}
                  >
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

/* ── Product row — dùng ProductCard từ components/ui ───────── */
function ProductRow({
  title,
  eyebrow,
  products,
  seeAllHref,
}: {
  title: string;
  eyebrow: string;
  products: { id: string; name: string; priceDisplay: string; img: string; link: string }[];
  seeAllHref?: string;
}) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            link="Xem tất cả"
            onLink={seeAllHref ? () => navigate(seeAllHref) : undefined}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -280, behavior: "smooth" })}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-[rgba(255,107,53,0.5)] transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 280, behavior: "smooth" })}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-[rgba(255,107,53,0.5)] transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-x-auto pb-2">
          {products.map((p) => {
            // Adapt HomepageProduct → Product (dùng ProductCard)
            const priceNum = p.priceDisplay.includes("Vui lòng gọi")
              ? 0
              : parseInt(p.priceDisplay.replace(/[^\d]/g, "")) || 0;
            // Lookup rating/reviews thật từ mock-data theo slug
            const slug = p.link.split('/san-pham/')[1]?.split('_')[0] ?? '';
            const matched = PRODUCT_BY_SLUG[slug];
            const product = {
              id: parseInt(p.id.replace(/\D/g, "") || "0", 10),
              slug,
              brand: p.name.split(" ")[0],
              name: p.name,
              category: p.id.startsWith("cam") ? "Máy ảnh" : p.id.startsWith("len") ? "Ống kính" : "Phụ kiện",
              price: priceNum,
              originalPrice: null,
              badge: null,
              rating: matched?.rating ?? 4.8,
              reviews: matched?.reviews ?? 0,
              img: p.img,
              thumbs: p.img ? [p.img] : [],
              specs: [],
              desc: "",
              features: [],
              inBox: [],
            };
            return (
              <div
                key={p.id}
                onClick={() => navigate(p.link)}
                style={{ cursor: "pointer" }}
              >
                <ProductCard p={product} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Reviews — video carousel chuẩn mayanhvietnam.com ─────── */
const YOUTUBE_VIDEOS = [
  { id: "z9hJFwVLS4A", title: "Review Fujifilm X-H2S" },
  { id: "BIUttXDonuo",  title: "Chị khách ghé shop Tiền Giang chốt Canon R50" },
  { id: "jz42ostc6K8", title: "Cầm 200 triệu đi mua máy ảnh là cảm" },
  { id: "i5wmKTdzJHo", title: "Chốt Lumix S5 II & Đập hộp tại chỗ" },
  { id: "xdoZXGbUQJE", title: "Kase 85mm f/1.4 RF" },
  { id: "v2oxxlfzsBM", title: "Canon EOS R50" },
];

function ReviewsSection() {
  const { dark } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section
      className="py-12 sm:py-16 border-t border-border"
      style={{ background: dark ? "rgba(255,255,255,0.016)" : "rgba(255,248,240,0.7)" }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,0,0,0.08)", border: "1px solid rgba(255,0,0,0.18)" }}>
              <svg fill="none" viewBox="0 0 87 115" width="18" height="24">
                <path clipRule="evenodd" d="M83.99 10.81C90.08 21.24 86.62 34.66 76.26 40.79L69.05 45.06L74.17 47.38C81.58 50.74 86.52 57.99 86.96 66.17C87.40 74.34 83.27 82.09 76.26 86.24L32.76 111.97C22.41 118.10 9.08 114.61 3.00 104.18C-3.08 93.75 .37 80.33 10.73 74.20L17.94 69.93L12.82 67.61C5.41 64.25 .47 57.00 .03 48.82C-0.40 40.65 3.72 32.90 10.73 28.75L54.23 3.02C64.58 -3.10 77.91 .38 83.99 10.81Z" fill="#CE1312" fillRule="evenodd"/>
                <path clipRule="evenodd" d="M33 74L33 41L61 57.5L33 74Z" fill="white" fillRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">REVIEWS SẢN PHẨM</h2>
          </div>

          <a
            href={REVIEWS_SECTION.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: "#FF6A00" }}
          >
            Xem youtube
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#FF6A00"/>
            </svg>
          </a>
        </div>

        {/* Video carousel */}
        <div className="relative">
          <button onClick={() => scroll(-1)} aria-label="Trước"
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md border border-border flex items-center justify-center hover:bg-white transition z-10 hidden sm:flex">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} aria-label="Tiếp"
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md border border-border flex items-center justify-center hover:bg-white transition z-10 hidden sm:flex">
            <ChevronRight size={18} />
          </button>

          <div ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {YOUTUBE_VIDEOS.map((v) => (
              <div key={v.id}
                className="flex-shrink-0 w-[80vw] sm:w-[420px] lg:w-[460px]"
                style={{ scrollSnapAlign: "start" }}>
                <div className="relative w-full rounded-[20px] overflow-hidden bg-muted" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    style={{ border: 0, borderRadius: 20 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Newsletter ──────────────────────────────────────── */
function NewsletterSection() {
  const { dark } = useTheme();
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div
          className="relative rounded-3xl overflow-hidden border border-border p-8 sm:p-14 text-center"
          style={{ background: dark ? "rgba(255,107,53,0.06)" : "rgba(255,107,53,0.05)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: dark
                ? "radial-gradient(ellipse 70% 80% at 50% 50%,rgba(255,107,53,0.11) 0%,transparent 70%)"
                : "radial-gradient(ellipse 70% 80% at 50% 50%,rgba(255,107,53,0.07) 0%,transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
              Nhận ưu đãi độc quyền<br className="hidden sm:block" /> từ Máy Ảnh Việt Nam
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
              Cập nhật sản phẩm mới, khuyến mãi đặc biệt và mẹo chụp ảnh từ chuyên gia mỗi tuần.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="w-full sm:flex-1 h-11 px-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,53,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "")}
              />
              <button
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-white text-sm font-semibold flex items-center gap-2 justify-center hover:opacity-90 active:scale-95 transition-all"
                style={{
                  background: ACCENT,
                  boxShadow: dark ? "0 0 24px rgba(255,107,53,0.4)" : "0 4px 16px rgba(255,107,53,0.3)",
                }}
              >
                Đăng ký <ArrowRight size={14} />
              </button>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground mt-4">
              Không spam · Hủy đăng ký bất kỳ lúc nào
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main export ─────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <HeroCarousel />
      <FeaturedSection />
      <CategoryGrid />
      <ProductRow
        title="Máy ảnh nổi bật"
        eyebrow="TOP CAMERAS"
        products={TOP_CAMERAS}
        seeAllHref="/san-pham"
      />
      <ProductRow
        title="Ống kính nổi bật"
        eyebrow="TOP LENSES"
        products={TOP_LENSES}
        seeAllHref="/san-pham"
      />
      <ReviewsSection />
      <NewsletterSection />
    </>
  );
}
