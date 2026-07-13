"use client";
import { useState, useMemo } from "react";
import { type Product } from "@/lib/data";
import { ProductCard } from "@/components/store/ProductGrid";

const VND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

interface CategoryGridProps {
  products: Product[];
  showBrandFilter?: boolean;
}

export default function CategoryGrid({ products, showBrandFilter = true }: CategoryGridProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [useFilter, setUseFilter] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "name">("default");

  // Unique brands
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (useFilter && selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }
    if (useFilter && priceMax > 0) {
      list = list.filter((p) => p.price >= priceMin && p.price <= priceMax);
    }
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
        break;
    }
    return list;
  }, [products, selectedBrands, priceMin, priceMax, useFilter, sortBy]);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Sidebar filter */}
      {showBrandFilter && (
        <aside className="space-y-4">
          {/* Brand filter */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              Hãng sản xuất
            </h3>
            <div className="space-y-1.5">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => {
                      toggleBrand(b);
                      setUseFilter(true);
                    }}
                    className="w-4 h-4 rounded border-zinc-700 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 bg-zinc-800"
                  />
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                    {b}
                  </span>
                  <span className="text-xs text-zinc-600 ml-auto">
                    ({products.filter((p) => p.brand === b).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              Khoảng giá
            </h3>
            <div className="space-y-2">
              {[
                { label: "Dưới 10 triệu", min: 0, max: 10_000_000 },
                { label: "10 - 25 triệu", min: 10_000_000, max: 25_000_000 },
                { label: "25 - 50 triệu", min: 25_000_000, max: 50_000_000 },
                { label: "Trên 50 triệu", min: 50_000_000, max: 999_999_999 },
              ].map((range) => (
                <button
                  key={range.label}
                  onClick={() => {
                    setPriceMin(range.min);
                    setPriceMax(range.max);
                    setUseFilter(true);
                  }}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    priceMin === range.min && priceMax === range.max
                      ? "bg-orange-500/20 text-orange-300"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {useFilter && (
            <button
              onClick={() => {
                setSelectedBrands([]);
                setPriceMin(0);
                setPriceMax(0);
                setUseFilter(false);
              }}
              className="w-full text-sm text-zinc-400 hover:text-orange-400 transition-colors py-2"
            >
              Xóa bộ lọc
            </button>
          )}
        </aside>
      )}

      {/* Product list */}
      <div>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-zinc-400">
            Hiển thị <span className="text-white font-semibold">{filtered.length}</span> / {products.length} sản phẩm
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-orange-500"
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name">Tên A-Z</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
            <p className="text-zinc-400">Không tìm thấy sản phẩm phù hợp.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
