'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import {
  allProducts,
  getCategoryBySlug,
  formatVND,
  type ProductSummary,
} from '@/lib/adapter';
import { ProductCard } from '@/components/product-card';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ q?: string }>;
}) {
  const { slug } = use(params);
  const resolvedSearchParams = searchParams ? use(searchParams) : {};
  const searchQuery = resolvedSearchParams.q;

  const category = getCategoryBySlug(slug);
  const [sort, setSort] = useState<SortOption>('default');
  const [brandFilter, setBrandFilter] = useState<string | null>(null);

  const categoryProducts = useMemo(() => {
    // If slug is 'tat-ca', filter nothing by default, else filter by category slug
    let items = slug === 'tat-ca' ? allProducts : allProducts.filter((p) => p.category === slug);
    
    // Apply search query filter if present
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortSpecs?.some((s) => s.toLowerCase().includes(q)),
      );
    }

    if (brandFilter) {
      items = items.filter((p) => p.brand === brandFilter);
    }

    switch (sort) {
      case 'price-asc':
        return [...items].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...items].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...items].sort(
          (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0),
        );
      default:
        return items;
    }
  }, [slug, searchQuery, sort, brandFilter]);

  const brands = useMemo(() => {
    const baseItems = slug === 'tat-ca' ? allProducts : allProducts.filter((p) => p.category === slug);
    return Array.from(new Set(baseItems.map((p) => p.brand))).sort();
  }, [slug]);

  const pageTitle = searchQuery
    ? `Kết quả tìm kiếm cho "${searchQuery}"`
    : category?.name ?? 'Sản phẩm';

  return (
    <main className="bg-background">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-12">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{pageTitle}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-extralight text-foreground md:text-4xl">
            {pageTitle}
          </h1>
          {category?.description && !searchQuery && (
            <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            {categoryProducts.length} sản phẩm
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {/* Filter sidebar */}
          <aside className="shrink-0 lg:w-56">
            <div className="rounded-xl border border-border p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <SlidersHorizontal className="size-4 text-primary" />
                Bộ lọc
              </h3>

              {/* Brand filter */}
              {brands.length > 1 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-muted-foreground">Thương hiệu</p>
                  <div className="mt-2 space-y-1">
                    <button
                      type="button"
                      onClick={() => setBrandFilter(null)}
                      className={`w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                        !brandFilter
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Tất cả
                    </button>
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setBrandFilter(brand)}
                        className={`w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                          brandFilter === brand
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sort */}
              <div className="mt-4">
                <p className="text-xs font-medium text-muted-foreground">Sắp xếp</p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {categoryProducts.length === 0 ? (
              <div className="rounded-xl border border-border p-12 text-center">
                <p className="text-muted-foreground">
                  Không tìm thấy sản phẩm nào khớp với bộ lọc/từ khóa.
                </p>
                <Link
                  href="/"
                  className="mt-4 inline-flex rounded-xl bg-primary px-6 py-2 text-sm font-medium text-primary-foreground"
                >
                  Về trang chủ
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {categoryProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
