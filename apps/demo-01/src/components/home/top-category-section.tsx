'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allProducts, categories } from '@/lib/mock-data';
import type { ProductSummary } from '@mayanhvietnam/mock-data';
import { ShowcaseCard } from '@/components/product/showcase-card';

type TabKey = 'new' | 'hot' | 'sale';

interface TabDef {
  key: TabKey;
  label: string;
}

const TABS: TabDef[] = [
  { key: 'new', label: 'Mới' },
  { key: 'hot', label: 'Nổi bật' },
  { key: 'sale', label: 'Giảm giá' },
];

interface TopCategorySectionProps {
  id: string;
  sectionNum: string;
  title: string;
  subtitle: string;
  catLink: string;
  category: string;
}

function filterAndSort(products: ProductSummary[], tab: TabKey): ProductSummary[] {
  let filtered: ProductSummary[] = [];

  if (tab === 'new') {
    filtered = products.filter(
      (p) =>
        p.badges?.some((b) => b.type === 'new') ||
        p.badges?.some((b) => b.type === 'pre_order'),
    );
  } else if (tab === 'hot') {
    filtered = products.filter(
      (p) =>
        p.badges?.some((b) => b.type === 'hot') ||
        p.badges?.some((b) => b.type === 'best_seller'),
    );
  } else {
    filtered = products.filter((p) => p.originalPrice && p.originalPrice > p.price);
    filtered.sort((a, b) => {
      const da = a.originalPrice ? 1 - a.price / a.originalPrice : 0;
      const db = b.originalPrice ? 1 - b.price / b.originalPrice : 0;
      return db - da;
    });
  }

  // Fallback: pad with rest of category if fewer than 5 items
  if (filtered.length < 5) {
    const catProducts = products.filter((p) => !filtered.includes(p));
    filtered = [...filtered, ...catProducts].slice(0, 10);
  }
  return filtered.slice(0, 10);
}

export function TopCategorySection({
  id,
  sectionNum,
  title,
  subtitle,
  catLink,
  category,
}: TopCategorySectionProps) {
  const [tab, setTab] = useState<TabKey>('new');

  const categoryProducts = useMemo(
    () => allProducts.filter((p) => p.category === category),
    [category],
  );

  const items = useMemo(
    () => filterAndSort(categoryProducts, tab),
    [categoryProducts, tab],
  );

  // Category label fallback
  const catLabel =
    categories.find((c) => c.slug === category)?.name ?? category;

  return (
    <section id={id} className="py-10 sm:py-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Header */}
        <div className="relative mb-7 flex items-end justify-between border-b border-border pb-4">
          <div className="relative flex items-center gap-3">
            <span className="pointer-events-none absolute -left-1 -top-7 select-none text-[72px] font-black leading-none text-primary/8 sm:text-[88px]">
              {sectionNum}
            </span>
            <div className="relative z-10">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-5 w-1.5 rounded-sm bg-primary" />
                <h2
                  className="text-xl font-bold tracking-tight sm:text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  TOP {title}
                </h2>
              </div>
              <p className="ml-3.5 text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <Link
            href={catLink}
            className="hidden items-center gap-1.5 text-xs font-medium text-primary transition-opacity hover:opacity-80 sm:flex"
          >
            Xem tất cả <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex items-center gap-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                'relative rounded-t-md px-4 py-2 text-sm font-semibold transition-colors',
                tab === t.key
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-t-sm bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {items.map((p) => (
            <ShowcaseCard
              key={p.id}
              id={p.id}
              slug={p.slug}
              name={p.name}
              brand={p.brand}
              category={catLabel}
              price={p.price}
              originalPrice={p.originalPrice}
              rating={p.rating?.average}
              reviews={p.rating?.count}
              badge={(p.badges?.[0]?.label as 'HOT' | 'NEW' | 'SALE') ?? null}
              image={p.thumbnail}
              href={`/san-pham/${p.slug}`}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-5 flex justify-center sm:hidden">
          <Link
            href={catLink}
            className="flex items-center gap-2 rounded-xl border border-primary/40 px-6 py-2.5 text-sm font-medium text-primary"
          >
            Xem tất cả <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
