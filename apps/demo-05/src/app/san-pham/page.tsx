'use client';

import { useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Filter, ChevronDown, X, Star } from 'lucide-react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { cn, formatVND } from '@/lib/utils';
import { REAL_PRODUCTS, REAL_CATEGORIES, REAL_BRANDS, type RealProduct } from '@/lib/real-products';
import type { ProductSummary } from '../../../lib/mock-data';

type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'selling' | 'rating';

// Adapter: RealProduct → ProductSummary (theo schema của monorepo)
function toProductSummary(p: RealProduct): ProductSummary {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    thumbnail: p.image,
    images: [{ url: p.image, alt: p.name, isPrimary: true }],
    price: p.price,
    originalPrice: p.originalPrice,
    badges: p.originalPrice
      ? [{ type: 'sale', label: `-${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%` }]
      : [],
    rating: { average: 4.5 + (parseInt(p.id) % 5) * 0.1, count: 50 + (parseInt(p.id) * 7) },
    isUsed: false,
    brand: p.brand,
    mount: undefined,
    availability: 'in_stock',
    category: p.category,
    shortSpecs: p.shortSpecs,
  };
}

const ALL_SUMMARIES: ProductSummary[] = REAL_PRODUCTS.map(toProductSummary);

function ProductListingContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || null;
  const initialBrand = searchParams.get('brand') || null;
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [brand, setBrand] = useState<string | null>(initialBrand);
  const [maxPrice, setMaxPrice] = useState(80000000);
  const [sort, setSort] = useState<SortKey>('newest');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = ALL_SUMMARIES.slice();
    if (category) list = list.filter((p) => p.category === category);
    if (brand) list = list.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    list = list.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0)); break;
      case 'selling': list.sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0)); break;
    }
    return list;
  }, [category, brand, maxPrice, sort]);

  const brands = [...new Set(ALL_SUMMARIES.map((p) => p.brand))];

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
        <span>/</span>
        <span className="text-foreground">Sản phẩm</span>
      </nav>

      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Tất cả sản phẩm</h1>
          <p className="text-sm text-muted-foreground">
            Hiển thị <span className="font-bold text-primary">{filtered.length}</span> sản phẩm
          </p>
        </div>
        <button onClick={() => setFilterOpen(true)} className="lg:hidden flex items-center gap-2 h-9 px-4 rounded-lg bg-card border border-border text-xs font-semibold text-muted-foreground">
          <Filter className="w-3.5 h-3.5" /> Lọc
        </button>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        {/* Filter sidebar */}
        <aside className={cn(
          'bg-card border border-border rounded-xl p-5 space-y-5',
          'lg:sticky lg:top-28 lg:self-start',
          filterOpen ? 'fixed inset-y-0 right-0 z-50 w-80 overflow-y-auto lg:inset-auto lg:relative lg:w-auto' : 'hidden lg:block'
        )}>
          {filterOpen && (
            <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setFilterOpen(false)} />
          )}
          <div className="relative z-50 lg:z-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-foreground">Bộ lọc</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => { setCategory(null); setBrand(null); setMaxPrice(80000000); }} className="text-[11px] text-primary font-semibold hover:underline">Đặt lại</button>
                {filterOpen && <button onClick={() => setFilterOpen(false)} className="lg:hidden text-muted-foreground"><X className="w-4 h-4" /></button>}
              </div>
            </div>

            {/* Category */}
            <div className="border-b border-border pb-4 mb-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Danh mục</p>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!category} onChange={() => setCategory(null)} className="accent-primary" />
                  <span className="text-xs text-foreground">Tất cả</span>
                </label>
                {REAL_CATEGORIES.filter((c) => !c.slug.startsWith('san-pham-')).map((c) => (
                  <label key={c.slug} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={category === c.slug} onChange={() => setCategory(c.slug)} className="accent-primary" />
                    <span className="text-xs text-muted-foreground">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="border-b border-border pb-4 mb-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Thương hiệu</p>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!brand} onChange={() => setBrand(null)} className="accent-primary" />
                  <span className="text-xs text-foreground">Tất cả</span>
                </label>
                {brands.map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={brand === b} onChange={() => setBrand(b)} className="accent-primary" />
                    <span className="text-xs text-muted-foreground">{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Giá tối đa</p>
              <input type="range" min={1000000} max={80000000} step={1000000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1 font-mono">
                <span>1.000.000₫</span>
                <span className="text-primary font-bold">{formatVND(maxPrice)}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              {category && (
                <button onClick={() => setCategory(null)} className="flex items-center gap-1 h-7 px-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-semibold">
                  {REAL_CATEGORIES.find((c) => c.slug === category)?.name}
                  <X className="w-3 h-3" />
                </button>
              )}
              {brand && (
                <button onClick={() => setBrand(null)} className="flex items-center gap-1 h-7 px-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-semibold">
                  {brand}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="relative">
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="appearance-none h-9 pl-3 pr-9 rounded-lg bg-card border border-border text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer">
                <option value="newest">Mới nhất</option>
                <option value="selling">Phổ biến nhất</option>
                <option value="price-asc">Giá thấp → cao</option>
                <option value="price-desc">Giá cao → thấp</option>
                <option value="rating">Đánh giá cao</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-muted-foreground" />
            </div>
          </div>
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-muted-foreground text-center">Đang tải...</div>}>
      <ProductListingContent />
    </Suspense>
  );
}