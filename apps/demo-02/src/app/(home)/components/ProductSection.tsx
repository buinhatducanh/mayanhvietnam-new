'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/app/components/ui/utils';
import { PRODUCTS, type Product } from '@/app/data/products';
import ProductCard from './ProductCard';

type TabKey = 'new' | 'hot' | 'sale';
type Category = 'camera' | 'lens' | 'drone' | 'acc';

interface TabDef {
  key: TabKey;
  label: string;
}

const TABS: TabDef[] = [
  { key: 'new', label: 'Mới' },
  { key: 'hot', label: 'Nổi bật' },
  { key: 'sale', label: 'Giảm giá' },
];

interface ProductSectionProps {
  id: string;
  sectionNum: string;
  title: string;
  subtitle: string;
  catLink: string;
  category: Category;
}

function filterAndSort(products: Product[], tab: TabKey): Product[] {
  let filtered: Product[] = [];
  if (tab === 'new') {
    filtered = products.filter((p) => p.badge === 'NEW' || p.badge === 'LIMITED');
  } else if (tab === 'hot') {
    filtered = products.filter((p) => p.badge === 'HOT' || p.badge === 'PRO' || p.badge === null);
  } else {
    filtered = products.filter((p) => p.oldPrice !== null);
    filtered.sort((a, b) => {
      const da = a.oldPrice ? 1 - a.price / a.oldPrice : 0;
      const db = b.oldPrice ? 1 - b.price / b.oldPrice : 0;
      return db - da;
    });
  }
  // Fallback: pad with rest of category if fewer than 5 items
  if (filtered.length < 5) {
    const extra = products.filter((p) => !filtered.includes(p));
    filtered = [...filtered, ...extra].slice(0, 10);
  }
  return filtered.slice(0, 10);
}

export default function ProductSection({
  id,
  sectionNum,
  title,
  subtitle,
  catLink,
  category,
}: ProductSectionProps) {
  const [tab, setTab] = useState<TabKey>('new');

  const categoryProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === category),
    [category],
  );

  const items = useMemo(() => filterAndSort(categoryProducts, tab), [categoryProducts, tab]);

  return (
    <section id={id} className="bg-white py-10">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
          <div className="relative flex items-center gap-3">
            <span className="absolute -left-1 -top-6 text-[72px] sm:text-[88px] font-black leading-none select-none pointer-events-none text-gray-100">
              {sectionNum}
            </span>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-5 bg-orange-500 rounded-sm" />
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">
                  {title}
                </h2>
              </div>
              <p className="text-xs text-gray-500 ml-3.5">{subtitle}</p>
            </div>
          </div>

          <Link
            href={catLink}
            className="text-xs font-semibold text-orange-500 hover:text-orange-600 border border-orange-500/40 hover:border-orange-500 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
          >
            Xem tất cả →
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'relative px-4 py-2 text-sm font-semibold transition-colors rounded-t-md',
                tab === t.key
                  ? 'text-orange-600'
                  : 'text-gray-500 hover:text-gray-800',
              )}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange-500 rounded-t-sm" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
