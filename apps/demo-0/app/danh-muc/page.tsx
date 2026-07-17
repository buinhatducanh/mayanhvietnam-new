"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  products,
  categories,
  categoryBanners,
  getProductUrl,
  formatVND,
  discountOf,
  Product,
} from "@/lib/products";
import { useCart } from "@/lib/cart-context";

/* ─── Constants ─────────────────────────────────────────────────────────── */

const PRICE_RANGES = [
  { id: "all", label: "Tất cả", min: 0, max: Infinity },
  { id: "p1", label: "Dưới 15 triệu", min: 0, max: 15000000 },
  { id: "p2", label: "15 – 40 triệu", min: 15000000, max: 40000000 },
  { id: "p3", label: "40 – 70 triệu", min: 40000000, max: 70000000 },
  { id: "p4", label: "Trên 70 triệu", min: 70000000, max: Infinity },
];

const SORT_OPTIONS = [
  { id: "featured", label: "Nổi bật" },
  { id: "best-seller", label: "Bán chạy" },
  { id: "newest", label: "Mới nhất" },
  { id: "rating", label: "Đánh giá cao" },
  { id: "asc", label: "Giá thấp → cao" },
  { id: "desc", label: "Giá cao → thấp" },
];

const ALL_CATS = [{ slug: "tat-ca", name: "Tất cả", icon: "🛍️" }, ...categories];

/* ─── Helpers ───────────────────────────────────────────────────────────── */

const badgeBg = (t: string) =>
  t === "hot" ? "#e2483d" : t === "sale" ? "#ff6a00" : "#1a9e5c";

function sortProducts(items: Product[], sortId: string): Product[] {
  const arr = [...items];
  switch (sortId) {
    case "asc":
      return arr.sort((a, b) => a.price - b.price);
    case "desc":
      return arr.sort((a, b) => b.price - a.price);
    case "best-seller":
      return arr.sort((a, b) => b.soldPercent - a.soldPercent);
    case "newest":
      // newer products tend to have higher IDs
      return arr.sort((a, b) => b.id.localeCompare(a.id));
    case "rating":
      return arr.sort(
        (a, b) =>
          (b.rating?.average ?? 0) -
          (a.rating?.average ?? 0)
      );
    default:
      return arr;
  }
}

/* ─── Main Component ────────────────────────────────────────────────────── */

export default function CategoryPage() {
  /* ── State ── */
  const [cat, setCat] = useState("tat-ca");
  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");
  const [bnPage, setBnPage] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { addItem } = useCart();

  const bnPaused = useRef(false);
  const autoBnTimer = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* ── Sync with hash ── */
  useEffect(() => {
    const handleHash = () => {
      const h = decodeURIComponent((window.location.hash || "").replace("#", ""));
      const valid = ["tat-ca", ...ALL_CATS.map((c) => c.slug)];
      const activeCat = valid.includes(h) ? h : "tat-ca";
      setCat(activeCat);
      setBrands([]);
      setPrice("all");
      setQuery("");
      setBnPage(0);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  /* ── Banner logic ── */
  const getBanners = (slug: string) => {
    if (slug === "tat-ca") {
      return ["may-anh", "flycam", "action-camera", "ong-kinh"].flatMap(
        (k) => (categoryBanners[k] || []).slice(0, 2)
      );
    }
    return categoryBanners[slug] || [];
  };

  const banners = getBanners(cat);
  const bnCount = banners.length;
  const bnMax = Math.max(0, bnCount - 3);
  const hasBanners = bnCount > 0;
  const hasBnNav = bnCount > 3;

  useEffect(() => {
    if (autoBnTimer.current) clearInterval(autoBnTimer.current);
    autoBnTimer.current = setInterval(() => {
      if (bnPaused.current || bnMax <= 0) return;
      setBnPage((p) => (p >= bnMax ? 0 : p + 1));
    }, 3800);
    return () => {
      if (autoBnTimer.current) clearInterval(autoBnTimer.current);
    };
  }, [bnMax]);

  /* ── Derived data ── */
  const catObj = ALL_CATS.find((c) => c.slug === cat);
  const catName = catObj ? catObj.name : "Tất cả sản phẩm";
  const catDesc = catObj
    ? (catObj as any).description ||
      "Điểm đến tin cậy cho nhiếp ảnh gia Việt Nam."
    : "Toàn bộ máy ảnh, ống kính, flycam và action camera chính hãng đang có mặt tại Máy Ảnh Việt Nam.";

  // Base pool (category filter)
  const catPool = useMemo(
    () =>
      (cat === "tat-ca"
        ? products
        : products.filter((p) => p.category === cat)
      ).filter((p) => p.thumbnail),
    [cat]
  );

  // Brand counts for current category
  const brandCounts: Record<string, number> = {};
  catPool.forEach((p) => {
    brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
  });
  const allBrands = Object.keys(brandCounts).sort();

  // Hot brands (top 5 by count) for quick chips
  const hotBrands = useMemo(
    () =>
      allBrands
        .sort((a, b) => brandCounts[b] - brandCounts[a])
        .slice(0, 6),
    [allBrands.join(","), cat]
  );

  // Apply all filters
  const range = PRICE_RANGES.find((r) => r.id === price) || PRICE_RANGES[0];
  const q = query.toLowerCase().trim();

  const filteredItems = useMemo(() => {
    let items = catPool;

    // Brand filter
    if (brands.length > 0) {
      items = items.filter((p) => brands.includes(p.brand));
    }

    // Price filter
    if (price !== "all") {
      items = items.filter((p) => p.price >= range.min && p.price < range.max);
    }

    // Text search
    if (q) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.shortSpecs || []).some((s) => s.toLowerCase().includes(q))
      );
    }

    return sortProducts(items, sort);
  }, [catPool, brands, price, range, q, sort]);

  // Featured products for "Tất cả" view
  const featuredProducts = useMemo(
    () =>
      products
        .filter(
          (p) =>
            p.thumbnail &&
            p.rating &&
            p.rating.count > 50 &&
            p.rating.average >= 4.8
        )
        .sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0))
        .slice(0, 3),
    []
  );

  const resultCount = String(filteredItems.length).padStart(2, "0");

  /* ── Handlers ── */
  const setCategory = useCallback(
    (slug: string) => {
      window.location.hash = slug;
      setCat(slug);
      setBrands([]);
      setPrice("all");
      setQuery("");
      setBnPage(0);
    },
    []
  );

  const toggleBrand = useCallback((b: string) => {
    setBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setBrands([]);
    setPrice("all");
    setQuery("");
  }, []);

  const removeFilter = useCallback((type: string, value?: string) => {
    if (type === "brand" && value) {
      setBrands((prev) => prev.filter((b) => b !== value));
    } else if (type === "price") {
      setPrice("all");
    } else if (type === "search") {
      setQuery("");
    }
  }, []);

  const hasFilters = brands.length > 0 || price !== "all" || query.trim().length > 0;
  const empty = filteredItems.length === 0;

  // Active filter tags
  const activeFilterTags = useMemo(() => {
    const tags: { type: string; label: string; value: string }[] = [];
    brands.forEach((b) =>
      tags.push({ type: "brand", label: b, value: b })
    );
    if (price !== "all") {
      const r = PRICE_RANGES.find((p) => p.id === price);
      if (r) tags.push({ type: "price", label: r.label, value: price });
    }
    if (query.trim()) {
      tags.push({ type: "search", label: `"${query.trim()}"`, value: query });
    }
    return tags;
  }, [brands, price, query]);

  const actualPage = Math.min(bnPage, bnMax);
  const bnOffset = `${-(actualPage * (100 / 3)).toFixed(4)}%`;

  /* ── Nav helpers ── */
  const navMap: Record<string, string> = {
    "may-anh": "may-anh",
    "ong-kinh": "ong-kinh",
    flycam: "flycam",
    "action-camera": "action-camera",
  };
  const activeNav = navMap[cat] || "home";

  /* ── Keyboard shortcut: Cmd/Ctrl+K to focus search ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ────────────────────────────────────────────────────────────────────── */
  /* ── RENDER ──────────────────────────────────────────────────────────── */
  /* ────────────────────────────────────────────────────────────────────── */

  return (
    <div className="font-sans bg-[#fafaf8] text-[#16130f] min-h-screen">
      <SiteHeader active={activeNav} />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — Page Head + Visual Category Grid
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        data-screen-label="Đầu trang danh mục"
        className="bg-white border-b border-[#e9e6e1]"
      >
        <div className="max-w-[1280px] mx-auto px-8 pt-9 pb-0">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[12.5px] text-[#a39d94]"
          >
            <Link
              href="/"
              className="text-[#a39d94] no-underline hover:text-[#ff6a00]"
            >
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-[#16130f] font-semibold">{catName}</span>
          </nav>

          {/* Title + count */}
          <div className="flex items-end justify-between gap-6 mt-[18px] flex-wrap">
            <div>
              <h1 className="m-0 text-[42px] font-extralight tracking-[-0.02em]">
                {catName}
              </h1>
              <p className="mt-2 mb-0 max-w-[560px] text-[14.5px] font-light leading-[1.6] text-[#7a746c]">
                {catDesc}
              </p>
            </div>
            <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#a39d94]">
              {resultCount} sản phẩm
            </p>
          </div>

          {/* ── Visual Category Grid ── */}
          <div className="mt-7 -mx-2 pb-2 overflow-x-auto scrollbar-none cat-tabs-scroll">
            <div className="flex gap-2 px-1 min-w-max">
              {ALL_CATS.map((c) => {
                const on = cat === c.slug;
                const count =
                  c.slug === "tat-ca"
                    ? products.filter((p) => p.thumbnail).length
                    : products.filter(
                        (p) => p.category === c.slug && p.thumbnail
                      ).length;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setCategory(c.slug)}
                    style={{
                      borderColor: on ? "#ff6a00" : "#e9e6e1",
                      background: on
                        ? "linear-gradient(135deg, #ff6a00, #ea5e00)"
                        : "#ffffff",
                      color: on ? "#ffffff" : "#5f5a53",
                      boxShadow: on
                        ? "0 4px 16px rgba(255,106,0,0.35)"
                        : "none",
                    }}
                    className="group flex items-center gap-2.5 h-[52px] px-5 rounded-2xl border text-[13.5px] font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-[2px] hover:border-[rgba(255,106,0,0.55)] whitespace-nowrap"
                  >
                    <span className="text-[18px] leading-none">{c.icon}</span>
                    <span className="flex flex-col items-start leading-none">
                      <span>{c.name}</span>
                      <span
                        style={{
                          color: on
                            ? "rgba(255,255,255,0.75)"
                            : "#a39d94",
                        }}
                        className="text-[10px] font-normal mt-[3px]"
                      >
                        {count} sản phẩm
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — Banner Slider
          ═══════════════════════════════════════════════════════════════════ */}
      {hasBanners && (
        <section
          data-screen-label="Banner danh mục"
          className="max-w-[1280px] mx-auto px-8 pt-[26px]"
        >
          <div
            onMouseEnter={() => {
              bnPaused.current = true;
            }}
            onMouseLeave={() => {
              bnPaused.current = false;
            }}
            className="relative"
          >
            <div className="overflow-hidden mx-[-5px]">
              <div
                style={{ transform: `translateX(${bnOffset})` }}
                className="flex transition-transform duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              >
                {banners.map((bn, idx) => (
                  <Link
                    key={idx}
                    href={bn.href}
                    title={bn.title}
                    className="flex-[0_0_33.3333%] min-w-[33.3333%] px-[5px] no-underline block"
                  >
                    <span className="block overflow-hidden rounded-[14px] border border-[#e9e6e1] bg-[#0b0a09] transition-all hover:border-[rgba(255,106,0,0.5)] hover:shadow-[0_20px_40px_-20px_rgba(255,106,0,0.45)] hover:-translate-y-[3px]">
                      <img
                        src={bn.image}
                        alt={bn.title}
                        loading="lazy"
                        className="w-full aspect-[1305/435] object-cover block"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {hasBnNav && (
              <>
                <button
                  type="button"
                  aria-label="Banner trước"
                  onClick={() =>
                    setBnPage((p) => (p === 0 ? bnMax : p - 1))
                  }
                  className="absolute left-[-2px] top-[50%] -translate-y-[50%] z-10 w-9 h-9 rounded-full border border-[#e9e6e1] bg-[rgba(255,255,255,0.92)] backdrop-blur-[6px] text-[#5f5a53] cursor-pointer flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(22,19,15,0.35)] transition-all hover:bg-[#ff6a00] hover:border-[#ff6a00] hover:text-white hover:-translate-y-[50%] hover:scale-[1.1]"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Banner sau"
                  onClick={() =>
                    setBnPage((p) => (p >= bnMax ? 0 : p + 1))
                  }
                  className="absolute right-[-2px] top-[50%] -translate-y-[50%] z-10 w-9 h-9 rounded-full border border-[#e9e6e1] bg-[rgba(255,255,255,0.92)] backdrop-blur-[6px] text-[#5f5a53] cursor-pointer flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(22,19,15,0.35)] transition-all hover:bg-[#ff6a00] hover:border-[#ff6a00] hover:text-white hover:-translate-y-[50%] hover:scale-[1.1]"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
                <div className="flex justify-center gap-1.5 mt-3">
                  {Array.from({ length: bnMax + 1 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Trang banner ${i + 1}`}
                      onClick={() => setBnPage(i)}
                      style={{
                        width: i === actualPage ? "22px" : "6px",
                        background:
                          i === actualPage ? "#ff6a00" : "#dcd8d2",
                      }}
                      className="h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — Featured Products (only on "Tất cả")
          ═══════════════════════════════════════════════════════════════════ */}
      {cat === "tat-ca" && featuredProducts.length > 0 && !hasFilters && (
        <section
          data-screen-label="Sản phẩm nổi bật"
          className="max-w-[1280px] mx-auto px-8 pt-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff6a00"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <h2 className="m-0 text-[20px] font-semibold tracking-[-0.01em]">
                Sản phẩm nổi bật
              </h2>
            </div>
            <span className="h-px flex-1 bg-[#e9e6e1]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featuredProducts.map((p) => {
              const pUrl = getProductUrl(p.slug);
              return (
                <Link
                  key={p.id}
                  href={`/${pUrl}`}
                  className="group relative flex items-center gap-4 border border-[#e9e6e1] bg-white rounded-2xl p-4 no-underline transition-all hover:border-[rgba(255,106,0,0.45)] hover:-translate-y-[3px] hover:shadow-[0_20px_40px_-18px_rgba(255,106,0,0.35)]"
                >
                  <span className="w-[88px] h-[88px] rounded-xl bg-white border border-[#f1eee9] shrink-0 overflow-hidden flex items-center justify-center">
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-110"
                    />
                  </span>
                  <span className="flex flex-col min-w-0 flex-1">
                    <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#ff6a00]">
                      {p.brand}
                    </span>
                    <span className="mt-0.5 text-[13.5px] font-medium leading-[1.35] text-[#16130f] line-clamp-2">
                      {p.name}
                    </span>
                    <span className="mt-1.5 text-[15px] font-extrabold text-[#ff6a00]">
                      {formatVND(p.price)}
                    </span>
                    {p.rating && (
                      <span className="mt-1 flex items-center gap-1 text-[11.5px] text-[#7a746c]">
                        <span className="text-[#ff6a00]">★</span>{" "}
                        {p.rating.average} ({p.rating.count})
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — Toolbar: Search + Sort + Quick Brand Chips + Filters
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        data-screen-label="Thanh công cụ lọc"
        className="max-w-[1280px] mx-auto px-8 pt-7"
      >
        {/* Row 1: Search bar + Sort + Filter toggle (mobile) */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* In-page search */}
          <div className="relative flex-1 min-w-[200px] max-w-[360px]">
            <div className="absolute left-0 flex items-center justify-center w-[38px] h-full pointer-events-none">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9e9590"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm trong danh mục... (⌘K)"
              className="w-full h-[40px] pl-[38px] pr-4 rounded-xl border border-[#e2ddd6] bg-[#faf9f7] text-[13px] text-[#1a1815] placeholder:text-[#b0a99f] outline-none transition-all duration-200 hover:border-[#d4cec5] focus:border-[#ff6a00] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,106,0,0.08)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#e9e6e1] flex items-center justify-center border-none cursor-pointer text-[#7a746c] text-[11px] hover:bg-[#dcd8d2] transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {SORT_OPTIONS.map((s) => {
              const on = sort === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSort(s.id)}
                  style={{
                    borderColor: on ? "#ff6a00" : "#e9e6e1",
                    background: on
                      ? "rgba(255,106,0,0.08)"
                      : "#ffffff",
                    color: on ? "#c85200" : "#5f5a53",
                  }}
                  className="h-[34px] px-3 rounded-[10px] border text-[12px] font-semibold cursor-pointer transition-all hover:border-[rgba(255,106,0,0.55)] whitespace-nowrap"
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Mobile filter toggle */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 h-[34px] px-3.5 rounded-[10px] border border-[#e9e6e1] bg-white text-[#5f5a53] text-[12px] font-semibold cursor-pointer transition-all hover:border-[rgba(255,106,0,0.55)]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
            </svg>
            Lọc
            {hasFilters && (
              <span className="min-w-[18px] h-[18px] rounded-full bg-[#ff6a00] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterTags.length}
              </span>
            )}
          </button>
        </div>

        {/* Row 2: Quick brand chips */}
        {hotBrands.length > 0 && (
          <div className="flex items-center gap-2 mt-3.5 flex-wrap">
            <span className="text-[11px] font-semibold text-[#a39d94] uppercase tracking-[0.12em] mr-1">
              Thương hiệu:
            </span>
            {hotBrands.map((b) => {
              const on = brands.includes(b);
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleBrand(b)}
                  style={{
                    background: on
                      ? "rgba(255,106,0,0.1)"
                      : "#f5f2ed",
                    color: on ? "#c85200" : "#5f5a53",
                    borderColor: on
                      ? "rgba(255,106,0,0.35)"
                      : "transparent",
                  }}
                  className="flex items-center gap-1.5 h-[30px] px-3 rounded-full border text-[12px] font-medium cursor-pointer transition-all hover:border-[rgba(255,106,0,0.4)] hover:-translate-y-[1px]"
                >
                  {b}
                  <span
                    style={{
                      background: on ? "#ff6a00" : "#dcd8d2",
                      color: on ? "#fff" : "#7a746c",
                    }}
                    className="text-[10px] font-bold rounded-full w-[20px] h-[20px] flex items-center justify-center"
                  >
                    {brandCounts[b]}
                  </span>
                </button>
              );
            })}
            {allBrands.length > 6 && (
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="h-[30px] px-3 rounded-full border border-dashed border-[#dcd8d2] bg-transparent text-[#a39d94] text-[11.5px] font-medium cursor-pointer hover:border-[#ff6a00] hover:text-[#ff6a00] transition-colors"
              >
                +{allBrands.length - 6} nữa
              </button>
            )}
          </div>
        )}

        {/* Row 3: Active filter tags */}
        {activeFilterTags.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-[11px] font-semibold text-[#a39d94] uppercase tracking-[0.12em]">
              Đang lọc:
            </span>
            {activeFilterTags.map((tag) => (
              <button
                key={`${tag.type}-${tag.value}`}
                type="button"
                onClick={() => removeFilter(tag.type, tag.value)}
                className="flex items-center gap-1.5 h-[28px] px-3 rounded-full bg-[rgba(255,106,0,0.08)] border border-[rgba(255,106,0,0.2)] text-[#c85200] text-[12px] font-medium cursor-pointer transition-all hover:bg-[rgba(226,72,61,0.08)] hover:border-[rgba(226,72,61,0.3)] hover:text-[#e2483d]"
              >
                {tag.type === "brand" && (
                  <span className="text-[9px] uppercase tracking-wider text-[#a39d94]">
                    NH
                  </span>
                )}
                {tag.type === "price" && (
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                )}
                {tag.type === "search" && (
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                )}
                {tag.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            ))}
            <button
              type="button"
              onClick={clearFilters}
              className="text-[12px] text-[#a39d94] font-semibold cursor-pointer underline hover:text-[#e2483d] transition-colors ml-1"
            >
              Xoá tất cả
            </button>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5 — Main Content: Sidebar + Product Grid
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        data-screen-label="Lưới sản phẩm"
        className="max-w-[1280px] mx-auto px-8 pt-6 pb-4 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-7 items-start"
      >
        {/* ── Sidebar Filters ── */}
        <aside className="sticky top-[132px] flex flex-col gap-5 max-lg:hidden">
          {/* Brand filter */}
          <div className="border border-[#e9e6e1] bg-white rounded-2xl p-[18px_20px]">
            <h3 className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#ff6a00]">
              Thương hiệu
            </h3>
            <div className="flex flex-col gap-1 mt-3">
              {allBrands.map((b) => {
                const on = brands.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBrand(b)}
                    style={{
                      background: on
                        ? "rgba(255,106,0,0.06)"
                        : "transparent",
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-lg border-none cursor-pointer text-left transition-colors hover:bg-[#f5f2ed]"
                  >
                    <span
                      style={{
                        borderColor: on ? "#ff6a00" : "#dcd8d2",
                        background: on ? "#ff6a00" : "#ffffff",
                      }}
                      className="w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all"
                    >
                      {on && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="3.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                      )}
                    </span>
                    <span className="text-[13.5px] font-medium text-[#16130f] flex-1">
                      {b}
                    </span>
                    <span className="font-mono text-[10px] text-[#a39d94]">
                      {String(brandCounts[b]).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price filter */}
          <div className="border border-[#e9e6e1] bg-white rounded-2xl p-[18px_20px]">
            <h3 className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#ff6a00]">
              Khoảng giá
            </h3>
            <div className="flex flex-col gap-1 mt-3">
              {PRICE_RANGES.map((r) => {
                const on = price === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setPrice(r.id)}
                    style={{
                      background: on
                        ? "rgba(255,106,0,0.06)"
                        : "transparent",
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-lg border-none cursor-pointer text-left transition-colors hover:bg-[#f5f2ed]"
                  >
                    <span
                      style={{
                        borderColor: on ? "#ff6a00" : "#dcd8d2",
                      }}
                      className="w-[15px] h-[15px] rounded-full border flex items-center justify-center shrink-0"
                    >
                      {on && (
                        <span className="w-[7px] h-[7px] rounded-full bg-[#ff6a00]" />
                      )}
                    </span>
                    <span className="text-[13.5px] font-medium text-[#16130f]">
                      {r.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="border border-[rgba(255,106,0,0.3)] bg-[rgba(255,106,0,0.05)] rounded-2xl p-[18px_20px]">
            <p className="m-0 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c85200]">
              Cần tư vấn?
            </p>
            <p className="mt-2 mb-0 text-[13px] leading-[1.55] text-[#7a746c]">
              Đội ngũ kỹ thuật viên sẵn sàng hỗ trợ chọn máy phù hợp.
            </p>
            <a
              href="tel:0937148222"
              className="inline-flex items-center gap-2 mt-3 text-[15px] font-extrabold text-[#ff6a00] no-underline"
            >
              ✆ 0937.148.222
            </a>
          </div>
        </aside>

        {/* ── Product Grid ── */}
        <div>
          {/* Result info */}
          <div className="flex items-center justify-between gap-4 mb-1">
            <p className="m-0 text-[13px] text-[#7a746c]">
              {empty ? (
                "Không tìm thấy sản phẩm"
              ) : (
                <>
                  Hiển thị{" "}
                  <span className="font-semibold text-[#16130f]">
                    {filteredItems.length}
                  </span>{" "}
                  sản phẩm
                  {catName !== "Tất cả sản phẩm" && (
                    <>
                      {" "}
                      trong{" "}
                      <span className="font-semibold text-[#16130f]">
                        {catName}
                      </span>
                    </>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Product cards grid */}
          <div
            key={`${cat}-${sort}-${brands.join(",")}-${price}-${query}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 animate-rise-in"
          >
            {filteredItems.map((p) => {
              const discount = discountOf(p);
              const pUrl = getProductUrl(p.slug);
              return (
                <div
                  key={p.id}
                  className="group relative flex flex-col border border-[#e9e6e1] bg-white rounded-[18px] overflow-hidden transition-all hover:border-[rgba(255,106,0,0.45)] hover:-translate-y-[4px] hover:shadow-[0_24px_48px_-22px_rgba(255,106,0,0.42)]"
                >
                  {/* Badges */}
                  <span className="absolute left-2.5 top-2.5 z-[2] flex flex-col gap-1 items-start">
                    {p.badges.slice(0, 1).map((b, idx) => (
                      <span
                        key={idx}
                        style={{ background: badgeBg(b.type) }}
                        className="text-[9px] font-extrabold uppercase tracking-[0.04em] text-white rounded-full px-2 py-[3.5px]"
                      >
                        {b.label}
                      </span>
                    ))}
                  </span>
                  {discount > 0 && (
                    <span className="absolute right-2.5 top-2.5 z-[2] text-[10px] font-extrabold text-white bg-[#ff6a00] rounded-full px-2 py-[3.5px] shadow-[0_6px_14px_-6px_rgba(255,106,0,0.7)]">
                      -{discount}%
                    </span>
                  )}

                  {/* Thumbnail */}
                  <Link href={`/${pUrl}`} className="block aspect-square bg-white overflow-hidden">
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain p-4 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </Link>

                  {/* Info */}
                  <span className="flex flex-col flex-1 p-[14px_16px_16px] border-t border-[#f1eee9]">
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a39d94]">
                      {p.brand}
                    </span>
                    <Link href={`/${pUrl}`} className="mt-1 text-[14.5px] font-medium leading-[1.38] text-[#16130f] line-clamp-2 min-h-[40px] no-underline hover:text-[#ff6a00]">
                      {p.name}
                    </Link>
                    <span className="mt-1.5 text-[11.5px] text-[#7a746c] truncate">
                      {(p.shortSpecs || []).slice(0, 3).join(" · ")}
                    </span>
                    <span className="mt-2.5 flex items-baseline gap-2">
                      <span className="text-[16px] font-extrabold text-[#ff6a00]">
                        {formatVND(p.price)}
                      </span>
                      {p.originalPrice &&
                        p.originalPrice > p.price && (
                          <span className="text-[12px] text-[#a39d94] line-through">
                            {formatVND(p.originalPrice)}
                          </span>
                        )}
                    </span>
                    {p.rating && (
                      <span className="mt-2 flex items-center gap-1 text-[12px] text-[#7a746c]">
                        <span className="text-[#ff6a00]">★</span>{" "}
                        {p.rating.average} ({p.rating.count} đánh giá)
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => addItem(p, 1)}
                      className="mt-3 w-full h-9 rounded-xl bg-[rgba(255,106,0,0.08)] border border-[rgba(255,106,0,0.25)] text-[#c85200] text-[12.5px] font-bold cursor-pointer flex items-center justify-center gap-1.5 transition-all hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00]"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                      </svg>
                      Thêm vào giỏ
                    </button>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {empty && (
            <div className="border border-dashed border-[#dcd8d2] rounded-[18px] bg-white py-16 px-6 text-center">
              <div className="text-[48px] mb-4 opacity-30">🔍</div>
              <p className="m-0 text-[16px] font-semibold text-[#16130f]">
                Không tìm thấy sản phẩm phù hợp
              </p>
              <p className="mt-2 mb-0 text-[13.5px] text-[#a39d94] max-w-[320px] mx-auto">
                {query
                  ? `Không có kết quả cho "${query}". Thử từ khoá khác hoặc xoá bộ lọc.`
                  : "Thử bỏ bớt bộ lọc thương hiệu, khoảng giá hoặc từ khoá tìm kiếm."}
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 h-10 px-[22px] rounded-xl border border-[#ff6a00] bg-[#ff6a00] text-white text-[13.5px] font-semibold cursor-pointer transition-all hover:bg-[#ea5e00] hover:shadow-[0_4px_14px_rgba(255,106,0,0.35)]"
              >
                Xoá tất cả bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          Mobile Filter Drawer
          ═══════════════════════════════════════════════════════════════════ */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 z-[100] lg:hidden"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[rgba(22,19,15,0.5)] backdrop-blur-[4px]"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[320px] max-w-[85vw] bg-white shadow-[−20px_0_60px_-20px_rgba(22,19,15,0.3)] flex flex-col"
            style={{ animation: "slideInRight 0.3s cubic-bezier(0.22,1,0.36,1)" }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e9e6e1]">
              <h3 className="m-0 text-[16px] font-semibold">Bộ lọc</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full border border-[#e9e6e1] bg-white flex items-center justify-center cursor-pointer text-[#5f5a53] hover:border-[#ff6a00] hover:text-[#ff6a00] transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
              {/* Brand filter */}
              <div>
                <h4 className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#ff6a00] mb-3">
                  Thương hiệu
                </h4>
                <div className="flex flex-col gap-1">
                  {allBrands.map((b) => {
                    const on = brands.includes(b);
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => toggleBrand(b)}
                        style={{
                          background: on
                            ? "rgba(255,106,0,0.06)"
                            : "transparent",
                        }}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border-none cursor-pointer text-left transition-colors hover:bg-[#f5f2ed]"
                      >
                        <span
                          style={{
                            borderColor: on ? "#ff6a00" : "#dcd8d2",
                            background: on ? "#ff6a00" : "#ffffff",
                          }}
                          className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all"
                        >
                          {on && (
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="3.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                          )}
                        </span>
                        <span className="text-[14px] font-medium text-[#16130f] flex-1">
                          {b}
                        </span>
                        <span className="font-mono text-[11px] text-[#a39d94]">
                          {brandCounts[b]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price filter */}
              <div>
                <h4 className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#ff6a00] mb-3">
                  Khoảng giá
                </h4>
                <div className="flex flex-col gap-1">
                  {PRICE_RANGES.map((r) => {
                    const on = price === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setPrice(r.id)}
                        style={{
                          background: on
                            ? "rgba(255,106,0,0.06)"
                            : "transparent",
                        }}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border-none cursor-pointer text-left transition-colors hover:bg-[#f5f2ed]"
                      >
                        <span
                          style={{
                            borderColor: on ? "#ff6a00" : "#dcd8d2",
                          }}
                          className="w-[17px] h-[17px] rounded-full border flex items-center justify-center shrink-0"
                        >
                          {on && (
                            <span className="w-[8px] h-[8px] rounded-full bg-[#ff6a00]" />
                          )}
                        </span>
                        <span className="text-[14px] font-medium text-[#16130f]">
                          {r.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer footer */}
            <div className="p-5 border-t border-[#e9e6e1] flex gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 h-11 rounded-xl border border-[#e9e6e1] bg-white text-[#5f5a53] text-[13.5px] font-semibold cursor-pointer transition-all hover:border-[#ff6a00] hover:text-[#ff6a00]"
              >
                Xoá bộ lọc
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 h-11 rounded-xl border-none bg-[#ff6a00] text-white text-[13.5px] font-semibold cursor-pointer transition-all hover:bg-[#ea5e00] shadow-[0_4px_14px_rgba(255,106,0,0.35)]"
              >
                Xem {filteredItems.length} kết quả
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-[96px]" />
      <SiteFooter />
    </div>
  );
}
