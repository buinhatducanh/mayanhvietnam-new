'use client';

import { useMemo, useState } from 'react';
import { ProductGrid } from '@/components/product/product-grid';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductSummary } from '@mayanhvietnam/mock-data';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'rating-desc';

interface ProductFilterBarProps {
  products: ProductSummary[];
  initialCategory?: string;
}

export function ProductFilterBar({ products, initialCategory }: ProductFilterBarProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200_000_000]);
  const [condition, setCondition] = useState<'all' | 'new' | 'used'>('all');
  const [sort, setSort] = useState<SortKey>('default');
  const [showFilters, setShowFilters] = useState(false);

  const allBrands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (initialCategory && p.category !== initialCategory) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (condition === 'new' && p.isUsed) return false;
      if (condition === 'used' && !p.isUsed) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'vi'));
        break;
      case 'rating-desc':
        result = [...result].sort(
          (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0)
        );
        break;
    }
    return result;
  }, [products, initialCategory, selectedBrands, priceRange, condition, sort]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const activeCount =
    selectedBrands.length + (condition !== 'all' ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 200_000_000 ? 1 : 0);

  return (
    <>
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-mono text-foreground font-semibold">{filtered.length}</span>
          <span>sản phẩm</span>
          {activeCount > 0 && (
            <button
              onClick={() => {
                setSelectedBrands([]);
                setPriceRange([0, 200_000_000]);
                setCondition('all');
              }}
              className="ml-2 text-xs text-primary hover:underline flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Xóa bộ lọc ({activeCount})
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:border-primary/50 transition-colors md:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Bộ lọc {activeCount > 0 && `(${activeCount})`}
          </button>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="appearance-none rounded-lg border border-border bg-card pl-3 pr-9 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá thấp → cao</option>
              <option value="price-desc">Giá cao → thấp</option>
              <option value="name-asc">Tên A → Z</option>
              <option value="rating-desc">Đánh giá cao nhất</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar filters */}
        <aside
          className={cn(
            'rounded-lg bg-card border border-border p-4 space-y-5 h-fit md:sticky md:top-48',
            showFilters ? 'block' : 'hidden md:block'
          )}
        >
          {/* Condition */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2.5">
              Tình trạng
            </h3>
            <div className="space-y-1.5">
              {[
                { value: 'all', label: 'Tất cả' },
                { value: 'new', label: 'Mới 100%' },
                { value: 'used', label: 'Đã qua sử dụng' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground"
                >
                  <input
                    type="radio"
                    name="condition"
                    value={opt.value}
                    checked={condition === opt.value}
                    onChange={(e) => setCondition(e.target.value as 'all' | 'new' | 'used')}
                    className="accent-[#00d4aa]"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2.5">
              Thương hiệu
            </h3>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {allBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="accent-[#00d4aa]"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2.5">
              Khoảng giá
            </h3>
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={200_000_000}
                step={1_000_000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-[#00d4aa]"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>0₫</span>
                <span className="text-foreground font-semibold">
                  đến {(priceRange[1] / 1_000_000).toFixed(0)}tr
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Products */}
        <div>
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <div className="text-center py-16 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground">
                Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
