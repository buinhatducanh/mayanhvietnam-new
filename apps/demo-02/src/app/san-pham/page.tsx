import { useState, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router";
import {
  ShoppingCart, Heart, Star, SlidersHorizontal, Search, X,
  ChevronDown, ChevronRight, Check, Package, Grid3X3, List,
  Camera, Aperture, Wind, Zap, BadgeCheck,
} from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";
import { useCart } from "@/app/context/CartContext";

/* ─── formatters ─────────────────────────────────────── */
const fmtVND = (n: number) => n.toLocaleString("vi-VN") + " ₫";

/* ─── config ──────────────────────────────────────────── */
const CATS = [
  { key: "all",    label: "Tất cả sản phẩm", icon: <Package size={14} /> },
  { key: "camera", label: "Máy ảnh",          icon: <Camera size={14} /> },
  { key: "lens",   label: "Ống kính",          icon: <Aperture size={14} /> },
  { key: "drone",  label: "Flycam / Drone",    icon: <Wind size={14} /> },
  { key: "acc",    label: "Phụ kiện & Studio", icon: <Zap size={14} /> },
];

const BRANDS_LIST = ["Canon", "Sony", "Nikon", "DJI", "Fujifilm", "Sigma", "Godox", "Benro"];

const SORTS = [
  { key: "default",    label: "Nổi bật" },
  { key: "price_asc",  label: "Giá tăng dần" },
  { key: "price_desc", label: "Giá giảm dần" },
  { key: "rating",     label: "Đánh giá cao nhất" },
  { key: "newest",     label: "Mới nhất" },
];

const PRICE_PRESETS = [
  { label: "Dưới 10 triệu",        max: 10_000_000 },
  { label: "10 – 30 triệu",        min: 10_000_000, max: 30_000_000 },
  { label: "30 – 60 triệu",        min: 30_000_000, max: 60_000_000 },
  { label: "60 – 100 triệu",       min: 60_000_000, max: 100_000_000 },
  { label: "Trên 100 triệu",       min: 100_000_000 },
];

const PAGE_SIZE = 12;

/* ─── Stars ───────────────────────────────────────────── */
function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} sao`}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={11}
          className={i <= n ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
      ))}
    </span>
  );
}

/* ─── ProductCard ─────────────────────────────────────── */
function ProductCard({ p, view }: { p: Product; view: "grid" | "list" }) {
  const { add } = useCart();
  const [liked, setLiked] = useState(false);
  const disc = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : null;
  const savings = p.oldPrice ? p.oldPrice - p.price : null;

  if (view === "list") {
    return (
      <article className="group bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-orange-100 transition-all duration-300 flex gap-0 overflow-hidden">
        <Link to={`/san-pham/${p.id}`} title={p.name} className="relative shrink-0 w-44 bg-gray-50">
          <img src={p.img} alt={`${p.name} — ${p.brand}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {p.badge && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md">
              {p.badge}
            </span>
          )}
          {disc && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md">
              -{disc}%
            </span>
          )}
        </Link>
        <div className="flex-1 p-4 flex flex-col min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <p className="text-[9px] text-orange-500 font-extrabold uppercase tracking-widest">{p.brand} · {p.categoryLabel}</p>
              <Link to={`/san-pham/${p.id}`} title={p.name}>
                <h2 className="text-sm font-bold text-gray-900 mt-0.5 hover:text-orange-500 transition-colors leading-snug line-clamp-2">
                  {p.name}
                </h2>
              </Link>
            </div>
            <button onClick={() => setLiked(v => !v)} aria-label="Yêu thích"
              className="shrink-0 w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center hover:border-red-300 transition-colors mt-0.5">
              <Heart size={13} className={liked ? "fill-red-500 text-red-500" : "text-gray-400"} />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Stars n={p.rating} />
            <span className="text-[10px] text-gray-400">{p.rating}.0 ({p.reviews} đánh giá)</span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{p.desc}</p>
          <div className="mt-auto flex items-center justify-between gap-3">
            <div>
              <div className="text-base font-extrabold text-orange-500">{fmtVND(p.price)}</div>
              {savings && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-400 line-through">{fmtVND(p.oldPrice!)}</span>
                  <span className="text-[10px] text-green-600 font-bold">Tiết kiệm {fmtVND(savings)}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => add({ id: p.id, name: p.name, price: p.price, img: p.img })}
              aria-label={`Thêm ${p.name} vào giỏ hàng`}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-[11px] font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap">
              <ShoppingCart size={12} /> Thêm vào giỏ
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/70 hover:border-orange-100 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <Link to={`/san-pham/${p.id}`} title={p.name} className="relative overflow-hidden bg-gray-50 block"
        style={{ aspectRatio: "1/1" }}>
        <img src={p.img} alt={`${p.name} — ${p.brand}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {p.badge && (
          <span className="absolute top-2.5 left-2.5 bg-orange-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow">
            {p.badge}
          </span>
        )}
        {disc && (
          <span className="absolute top-2.5 right-8 bg-red-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md">
            -{disc}%
          </span>
        )}
        <button onClick={e => { e.preventDefault(); setLiked(v => !v); }}
          aria-label="Yêu thích"
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-red-50 transition-colors">
          <Heart size={12} className={liked ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>
      </Link>
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-[9px] text-orange-500 font-extrabold uppercase tracking-wider mb-1">{p.brand}</p>
        <Link to={`/san-pham/${p.id}`} title={p.name}>
          <h2 className="text-[11px] font-bold text-gray-900 mb-1.5 line-clamp-2 hover:text-orange-500 transition-colors leading-snug">
            {p.name}
          </h2>
        </Link>
        <div className="flex items-center gap-1.5 mb-1">
          <Stars n={p.rating} />
          <span className="text-[9px] text-gray-400">({p.reviews})</span>
        </div>
        {p.inStock ? (
          <span className="text-[9px] text-green-600 font-bold flex items-center gap-0.5 mb-2">
            <Check size={9} /> Còn hàng
          </span>
        ) : (
          <span className="text-[9px] text-red-400 font-bold mb-2">Hết hàng</span>
        )}
        <div className="mt-auto pt-2 border-t border-gray-50">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-sm font-extrabold text-orange-500">{fmtVND(p.price)}</span>
            {p.oldPrice && <span className="text-[10px] text-gray-400 line-through">{fmtVND(p.oldPrice)}</span>}
          </div>
          <button
            onClick={() => add({ id: p.id, name: p.name, price: p.price, img: p.img })}
            aria-label={`Thêm ${p.name} vào giỏ hàng`}
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-[10px] font-extrabold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all">
            <ShoppingCart size={11} /> Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─── FilterChips ─────────────────────────────────────── */
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-bold px-3 py-1 rounded-full">
      {label}
      <button onClick={onRemove} aria-label={`Xóa lọc: ${label}`}
        className="hover:text-orange-900 transition-colors">
        <X size={10} />
      </button>
    </span>
  );
}

/* ─── SidebarSection ──────────────────────────────────── */
function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-extrabold text-gray-900 hover:bg-gray-50 transition-colors">
        {title}
        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-4 border-t border-gray-50">{children}</div>}
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────── */
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ── URL-driven filter state ── */
  const cat      = searchParams.get("cat")    || "all";
  const brand    = searchParams.get("brand")  || "";
  const sort     = searchParams.get("sort")   || "default";
  const q        = searchParams.get("q")      || "";
  const priceMax = Number(searchParams.get("priceMax")) || 0;
  const page     = Number(searchParams.get("page")) || 1;

  const [view,      setView]      = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { add } = useCart();

  const set = useCallback((key: string, val: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (val) next.set(key, val); else next.delete(key);
      next.delete("page"); // reset to page 1 on any filter change
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const setPage = useCallback((p: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (p > 1) next.set("page", String(p)); else next.delete("page");
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const clearAll = () => {
    setSearchParams({}, { replace: true });
  };

  /* ── filtering & sorting ── */
  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (cat !== "all") list = list.filter(p => p.category === cat);
    if (brand)         list = list.filter(p => p.brand === brand);
    if (q)             list = list.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.brand.toLowerCase().includes(q.toLowerCase()) ||
      p.desc.toLowerCase().includes(q.toLowerCase())
    );
    if (priceMax > 0)  list = list.filter(p => p.price <= priceMax);
    if (sort === "price_asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating")     list.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")     list.sort((a, b) => b.id - a.id);
    return list;
  }, [cat, brand, sort, q, priceMax]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ── derived labels for SEO h1 ── */
  const catLabel = CATS.find(c => c.key === cat)?.label ?? "Tất cả sản phẩm";
  const h1 = [brand, catLabel !== "Tất cả sản phẩm" ? catLabel : ""].filter(Boolean).join(" ") || "Tất cả sản phẩm";
  const pageDesc = `${filtered.length} sản phẩm chính hãng${brand ? ` ${brand}` : ""}${cat !== "all" ? ` — ${catLabel}` : ""} tại MayAnhVietnam`;

  /* ── active chips ── */
  const chips: { label: string; clear: () => void }[] = [];
  if (cat !== "all")  chips.push({ label: catLabel, clear: () => set("cat", "") });
  if (brand)          chips.push({ label: brand,    clear: () => set("brand", "") });
  if (priceMax > 0)   chips.push({ label: `Dưới ${fmtVND(priceMax)}`, clear: () => set("priceMax", "") });
  if (q)              chips.push({ label: `"${q}"`,  clear: () => set("q", "") });

  /* ── category counts ── */
  const catCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PRODUCTS.length };
    PRODUCTS.forEach(p => { counts[p.category] = (counts[p.category] ?? 0) + 1; });
    return counts;
  }, []);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PRODUCTS.forEach(p => { counts[p.brand] = (counts[p.brand] ?? 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Page header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-5 pb-6">
          {/* Breadcrumb – semantic nav for SEO */}
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap list-none p-0">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link></li>
              <li aria-hidden><ChevronRight size={10} className="text-gray-300" /></li>
              <li><Link to="/san-pham" className="hover:text-orange-500 transition-colors">Sản phẩm</Link></li>
              {cat !== "all" && (
                <>
                  <li aria-hidden><ChevronRight size={10} className="text-gray-300" /></li>
                  <li className="text-gray-700 font-medium">{catLabel}</li>
                </>
              )}
              {brand && (
                <>
                  <li aria-hidden><ChevronRight size={10} className="text-gray-300" /></li>
                  <li className="text-gray-700 font-medium">{brand}</li>
                </>
              )}
            </ol>
          </nav>

          {/* H1 — SEO heading reflects active filter context */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1"
            style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
            {h1}
          </h1>

          {/* Meta description-style subtext */}
          <p className="text-sm text-gray-500">{pageDesc}</p>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              "✓ 100% hàng chính hãng",
              "✓ Bảo hành 12–24 tháng",
              "✓ Giao miễn phí toàn quốc",
              "✓ Trả góp 0%",
            ].map(t => (
              <span key={t} className="text-[11px] text-green-700 font-bold bg-green-50 border border-green-100 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category tab bar ── */}
      <nav aria-label="Danh mục sản phẩm"
        className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-none">
            {CATS.map(c => (
              <button
                key={c.key}
                onClick={() => set("cat", c.key === "all" ? "" : c.key)}
                aria-current={cat === c.key ? "page" : undefined}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-bold whitespace-nowrap border-b-2 transition-all shrink-0 ${
                  cat === c.key
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200"
                }`}>
                <span className={cat === c.key ? "text-orange-500" : "text-gray-400"}>{c.icon}</span>
                {c.label}
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  cat === c.key ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500"
                }`}>
                  {catCounts[c.key] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Main content ── */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-6">

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-5">

          {/* Search */}
          <label className="flex-1 min-w-[200px] flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2.5 gap-2 hover:border-orange-300 transition-colors focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
            <Search size={13} className="text-gray-400 shrink-0" aria-hidden />
            <input
              value={q}
              onChange={e => set("q", e.target.value)}
              placeholder="Tìm tên sản phẩm, thương hiệu..."
              aria-label="Tìm kiếm sản phẩm"
              className="bg-transparent text-sm flex-1 outline-none text-gray-700 placeholder:text-gray-400"
            />
            {q && (
              <button onClick={() => set("q", "")} aria-label="Xóa tìm kiếm">
                <X size={13} className="text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            )}
          </label>

          {/* Sort */}
          <div className="relative">
            <label className="sr-only" htmlFor="sort-select">Sắp xếp</label>
            <select
              id="sort-select"
              value={sort}
              onChange={e => set("sort", e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-gray-700 outline-none cursor-pointer hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors">
              {SORTS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* View toggle */}
          <div className="flex items-center border border-gray-200 bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => setView("grid")}
              aria-label="Hiển thị lưới"
              aria-pressed={view === "grid"}
              className={`p-2.5 transition-colors ${view === "grid" ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              <Grid3X3 size={14} />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="Hiển thị danh sách"
              aria-pressed={view === "list"}
              className={`p-2.5 transition-colors ${view === "list" ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              <List size={14} />
            </button>
          </div>

          {/* Mobile filter */}
          <button onClick={() => setMobileFilterOpen(v => !v)}
            aria-expanded={mobileFilterOpen}
            aria-label="Mở bộ lọc"
            className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-orange-300 transition-colors">
            <SlidersHorizontal size={14} />
            Bộ lọc {chips.length > 0 && <span className="w-4 h-4 bg-orange-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">{chips.length}</span>}
          </button>
        </div>

        {/* Active filter chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5 py-3 px-4 bg-orange-50 rounded-2xl border border-orange-100">
            <span className="text-[11px] text-orange-700 font-extrabold uppercase tracking-wide">Đang lọc:</span>
            {chips.map(c => (
              <FilterChip key={c.label} label={c.label} onRemove={c.clear} />
            ))}
            <button onClick={clearAll}
              className="ml-auto text-[11px] text-orange-600 hover:text-orange-800 font-bold underline underline-offset-2 transition-colors">
              Xóa tất cả
            </button>
          </div>
        )}

        <div className="flex gap-6 items-start">

          {/* ── Sidebar ── */}
          <aside
            aria-label="Bộ lọc sản phẩm"
            className={`${mobileFilterOpen ? "block" : "hidden"} lg:block w-60 shrink-0 space-y-3`}
          >
            {/* Thương hiệu */}
            <SidebarSection title="Thương hiệu">
              <div className="mt-3 space-y-0.5">
                <button
                  onClick={() => set("brand", "")}
                  className={`w-full flex items-center justify-between px-2 py-2 rounded-xl text-sm transition-colors ${
                    !brand ? "text-orange-500 font-extrabold bg-orange-50" : "text-gray-600 hover:bg-gray-50 font-medium"
                  }`}>
                  <span>Tất cả thương hiệu</span>
                  <span className="text-[10px] text-gray-400">{PRODUCTS.length}</span>
                </button>
                {BRANDS_LIST.map(b => (
                  <button key={b} onClick={() => set("brand", brand === b ? "" : b)}
                    className={`w-full flex items-center justify-between px-2 py-2 rounded-xl text-sm transition-colors ${
                      brand === b ? "text-orange-500 font-extrabold bg-orange-50" : "text-gray-600 hover:bg-gray-50 font-medium"
                    }`}>
                    <span className="flex items-center gap-2">
                      {brand === b && <Check size={11} className="text-orange-500 shrink-0" />}
                      {b}
                    </span>
                    <span className="text-[10px] text-gray-400">{brandCounts[b] ?? 0}</span>
                  </button>
                ))}
              </div>
            </SidebarSection>

            {/* Giá */}
            <SidebarSection title="Mức giá">
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => set("priceMax", "")}
                  className={`w-full text-left px-2 py-2 rounded-xl text-sm transition-colors ${
                    !priceMax ? "text-orange-500 font-extrabold bg-orange-50" : "text-gray-600 hover:bg-gray-50 font-medium"
                  }`}>
                  Tất cả mức giá
                </button>
                {PRICE_PRESETS.map(p => (
                  <button key={p.label}
                    onClick={() => set("priceMax", String(p.max ?? ""))}
                    className={`w-full text-left px-2 py-2 rounded-xl text-sm transition-colors ${
                      priceMax === (p.max ?? 0) ? "text-orange-500 font-extrabold bg-orange-50" : "text-gray-600 hover:bg-gray-50 font-medium"
                    }`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </SidebarSection>

            {/* Đánh giá */}
            <SidebarSection title="Đánh giá">
              <div className="mt-3 space-y-1">
                {[5, 4, 3].map(n => (
                  <button key={n}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors font-medium">
                    <Stars n={n} />
                    <span className="text-[11px] text-gray-500">{n}★ trở lên</span>
                  </button>
                ))}
              </div>
            </SidebarSection>

            {/* Tình trạng */}
            <SidebarSection title="Tình trạng">
              <div className="mt-3 space-y-1">
                {["Còn hàng", "Hàng mới", "Đang khuyến mãi"].map(s => (
                  <label key={s} className="flex items-center gap-2.5 px-2 py-2 cursor-pointer rounded-xl hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="accent-orange-500 w-3.5 h-3.5" />
                    <span className="text-sm text-gray-600 font-medium">{s}</span>
                  </label>
                ))}
              </div>
            </SidebarSection>

            {/* Trust block */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white">
              <BadgeCheck size={20} className="mb-2 opacity-80" />
              <p className="text-sm font-extrabold mb-1">Hàng chính hãng 100%</p>
              <p className="text-[10px] opacity-80 leading-relaxed">
                Toàn bộ sản phẩm được phân phối trực tiếp từ hãng. Bảo hành chính hãng đầy đủ.
              </p>
            </div>
          </aside>

          {/* ── Product grid / list ── */}
          <div className="flex-1 min-w-0">

            {/* Result count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Hiển thị{" "}
                <span className="font-bold text-gray-900">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span>
                {" "}trong{" "}
                <span className="font-bold text-gray-900">{filtered.length}</span> sản phẩm
              </p>
              {chips.length > 0 && (
                <button onClick={clearAll}
                  className="text-xs text-orange-500 hover:text-orange-700 font-bold underline underline-offset-2 transition-colors">
                  Xóa bộ lọc
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Search size={28} className="text-gray-300" />
                </div>
                <h2 className="text-base font-extrabold text-gray-700 mb-1">Không tìm thấy sản phẩm</h2>
                <p className="text-sm text-gray-400 mb-5 max-w-xs">
                  Hãy thử thay đổi từ khóa hoặc điều chỉnh bộ lọc để xem thêm kết quả.
                </p>
                <button onClick={clearAll}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-extrabold px-6 py-2.5 rounded-xl transition-colors">
                  Xóa bộ lọc và xem tất cả
                </button>
              </div>
            ) : (
              <>
                {/* Product list — semantic ul/li */}
                <ul
                  role="list"
                  aria-label={`Danh sách sản phẩm — ${h1}`}
                  className={
                    view === "grid"
                      ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                      : "flex flex-col gap-4"
                  }
                >
                  {paged.map(p => (
                    <li key={p.id}>
                      <ProductCard p={p} view={view} />
                    </li>
                  ))}
                </ul>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav aria-label="Phân trang" className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                      aria-label="Trang trước"
                      className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                      <ChevronRight size={14} className="rotate-180" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => {
                      const isActive = n === page;
                      const isEdge = n === 1 || n === totalPages;
                      const isNear = Math.abs(n - page) <= 1;
                      if (!isEdge && !isNear) {
                        if (n === 2 || n === totalPages - 1) return <span key={n} className="text-gray-400 text-sm">…</span>;
                        return null;
                      }
                      return (
                        <button key={n}
                          onClick={() => setPage(n)}
                          aria-label={`Trang ${n}`}
                          aria-current={isActive ? "page" : undefined}
                          className={`w-9 h-9 rounded-xl border text-sm font-bold transition-all ${
                            isActive
                              ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200"
                              : "border-gray-200 bg-white text-gray-600 hover:border-orange-400 hover:text-orange-500"
                          }`}>
                          {n}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page >= totalPages}
                      aria-label="Trang sau"
                      className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                      <ChevronRight size={14} />
                    </button>
                  </nav>
                )}

                {/* Page summary text for SEO */}
                {totalPages > 1 && (
                  <p className="text-center text-xs text-gray-400 mt-3">
                    Trang {page}/{totalPages} — {filtered.length} sản phẩm
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
