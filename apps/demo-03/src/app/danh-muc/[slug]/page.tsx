'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { getCategoryBySlug, getProductsByCategory, categories } from "@mayanhvietnam/mock-data";
import type { ProductSummary } from "@mayanhvietnam/mock-data";
import ProductCard from "@/app/components/product/ProductCard";
import NotFound from "@/app/not-found";

type SortKey = "default" | "price-asc" | "price-desc" | "newest" | "rating";

function sortProducts(products: ProductSummary[], sort: SortKey): ProductSummary[] {
  const arr = [...products];
  switch (sort) {
    case "price-asc": return arr.sort((a, b) => a.price - b.price);
    case "price-desc": return arr.sort((a, b) => b.price - a.price);
    case "rating": return arr.sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0));
    default: return arr;
  }
}

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const category = getCategoryBySlug(params.slug);

  if (!category) return <NotFound />;

  const [sort, setSort] = useState<SortKey>("default");
  const [brand, setBrand] = useState<string | null>(null);
  const [mobileFilter, setMobileFilter] = useState(false);

  const allProducts = getProductsByCategory(category.slug, false);
  const brands = [...new Set(allProducts.map((p) => p.brand))];

  const filtered = useMemo(() => {
    let products = allProducts;
    if (brand) products = products.filter((p) => p.brand === brand);
    return sortProducts(products, sort);
  }, [allProducts, brand, sort]);

  return (
    <div className="bg-[#f8f8f8] pb-16 min-h-[60vh]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 py-4">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Trang chủ</Link>
          <ChevronRight size={11} className="text-zinc-300" />
          <span className="text-zinc-700 font-medium">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">{category.name}</h1>
            <p className="text-sm text-zinc-400">{filtered.length} sản phẩm</p>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filter (desktop) */}
          <aside className="hidden sm:block w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-4 sticky top-40">
              <h3 className="text-sm font-semibold text-zinc-800 mb-3">Thương hiệu</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setBrand(null)}
                  className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${!brand ? "bg-orange-50 text-[#ff6b00] font-medium" : "text-zinc-600 hover:bg-zinc-50"}`}
                >
                  Tất cả ({allProducts.length})
                </button>
                {brands.map((b) => {
                  const count = allProducts.filter((p) => p.brand === b).length;
                  return (
                    <button
                      key={b}
                      onClick={() => setBrand(b)}
                      className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${brand === b ? "bg-orange-50 text-[#ff6b00] font-medium" : "text-zinc-600 hover:bg-zinc-50"}`}
                    >
                      {b} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4 gap-3">
              <button
                onClick={() => setMobileFilter(true)}
                className="sm:hidden flex items-center gap-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-xl px-3 py-2"
              >
                <SlidersHorizontal size={14} /> Bộ lọc
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-zinc-400 hidden sm:block">Sắp xếp:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="text-sm bg-white border border-zinc-200 rounded-xl px-3 py-2 outline-none focus:border-[#ff6b00]"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá thấp → cao</option>
                  <option value="price-desc">Giá cao → thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            {/* Products grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-zinc-400 text-sm">Không có sản phẩm nào trong danh mục này.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Other categories */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">Danh mục khác</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {categories.filter((c) => c.slug !== category.slug).map((cat) => (
              <Link
                key={cat.slug}
                href={`/danh-muc/${cat.slug}`}
                className="group flex flex-col items-center gap-2 bg-white rounded-2xl border border-black/[0.06] hover:border-orange-200 transition-all p-3"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-[11px] font-medium text-zinc-600 text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilter && (
        <div className="fixed inset-0 z-[70] sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilter(false)} />
          <div className="absolute inset-y-0 right-0 w-[260px] bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-zinc-100">
              <h3 className="text-sm font-semibold">Bộ lọc</h3>
              <button onClick={() => setMobileFilter(false)} className="p-1 hover:bg-zinc-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Thương hiệu</p>
              <div className="space-y-2">
                <button onClick={() => { setBrand(null); setMobileFilter(false); }} className={`block w-full text-left text-sm px-3 py-2 rounded-lg ${!brand ? "bg-orange-50 text-[#ff6b00] font-medium" : "text-zinc-600"}`}>
                  Tất cả ({allProducts.length})
                </button>
                {brands.map((b) => (
                  <button key={b} onClick={() => { setBrand(b); setMobileFilter(false); }} className={`block w-full text-left text-sm px-3 py-2 rounded-lg ${brand === b ? "bg-orange-50 text-[#ff6b00] font-medium" : "text-zinc-600"}`}>
                    {b} ({allProducts.filter((p) => p.brand === b).length})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}