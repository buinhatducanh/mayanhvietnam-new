"use client";
import { useState, useMemo } from "react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/store/ProductGrid";
import PageHeader from "@/components/shared/PageHeader";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.specs?.some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <>
      <PageHeader
        title="Tìm kiếm sản phẩm"
        subtitle={`Tìm thấy ${results.length} sản phẩm${query ? ` cho "${query}"` : ""}`}
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Tìm kiếm" }]}
      />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nhập tên sản phẩm, hãng, mã sản phẩm..."
                className="w-full h-12 pl-12 pr-4 bg-zinc-900 border border-zinc-800 rounded-full text-base text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all placeholder:text-zinc-500"
                autoFocus
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {query && results.length === 0 ? (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-zinc-400 text-lg">Không tìm thấy sản phẩm nào.</p>
              <p className="text-zinc-500 text-sm mt-2">Thử từ khóa khác hoặc gọi hotline 0907.215.252 để được tư vấn.</p>
            </div>
          ) : !query ? (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <p className="text-zinc-400 mb-4">Gợi ý tìm kiếm:</p>
              <div className="flex flex-wrap gap-2">
                {["Canon", "Sony", "DJI", "GoPro", "Sigma", "Ống kính", "Flycam", "A7 IV", "Mavic", "Hero 13"].map(s => (
                  <button key={s} onClick={() => setQuery(s)} className="px-3 py-1.5 bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-300 text-zinc-300 text-sm rounded-full transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
