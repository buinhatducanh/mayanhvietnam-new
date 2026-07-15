'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getProductsByCategory, getFeaturedProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { categoryBanners } from '../../../lib/mock-data';
import styles from './ProductSection.module.css';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  categorySlug: string;
  viewAllHref: string;
  showUsedTab?: boolean;
  maxItems?: number;
}

// ── Banner carousel nhỏ (3 ảnh/trang) giống demo-05 SmallBannerCarousel ────
function SmallBannerCarousel({ banners }: { banners: { title: string; image: string; href: string }[] }) {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalPages = Math.ceil(banners.length / 3);

  const next = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);
  const prev = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages]);

  useEffect(() => {
    if (paused || totalPages <= 1) return;
    const t = setInterval(next, 2000);
    return () => clearInterval(t);
  }, [paused, next, totalPages]);

  if (banners.length === 0) return null;

  return (
    <div
      className={styles.small_carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track */}
      <div
        className={styles.small_track}
        style={{ transform: `translateX(-${page * (100 / 3)}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.title} className={styles.small_item}>
            <Link href={banner.href} className={styles.small_link}>
              <img
                src={banner.image}
                alt={banner.title}
                loading="lazy"
                className={styles.small_img}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Arrows — chỉ hiện khi hover */}
      {banners.length > 3 && (
        <>
          <button type="button" onClick={prev} className={[styles.small_btn, styles.small_prev].join(' ')}>
            <ChevronLeft size={15} />
          </button>
          <button type="button" onClick={next} className={[styles.small_btn, styles.small_next].join(' ')}>
            <ChevronRight size={15} />
          </button>
        </>
      )}

      {/* Dots */}
      {totalPages > 1 && (
        <div className={styles.small_dots}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              className={[styles.small_dot, i === page ? styles.small_dot_active : ''].filter(Boolean).join(' ')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Banner carousel lớn (1 ảnh, tỉ lệ 3:1) ─────────────────────────────────
function CategoryCarousel({ banners }: { banners: { title: string; image: string; href: string; subtitle?: string }[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % banners.length), [banners.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + banners.length) % banners.length), [banners.length]);

  useEffect(() => {
    if (paused || banners.length <= 1) return;
    const t = setInterval(next, 2000);
    return () => clearInterval(t);
  }, [paused, next, banners.length]);

  if (banners.length === 0) return null;

  return (
    <div
      className={styles.cat_carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {banners.map((banner, i) => (
        <div
          key={banner.title}
          className={[styles.cat_slide, i === active ? styles.cat_slide_active : ''].filter(Boolean).join(' ')}
        >
          <Link href={banner.href} className={styles.cat_slide_link}>
            <img
              src={banner.image}
              alt={banner.title}
              loading="lazy"
              className={styles.cat_slide_img}
            />
            <div className={styles.cat_slide_overlay} />
            <div className={styles.cat_slide_text}>
              <p className={styles.cat_slide_title}>{banner.title}</p>
              {banner.subtitle && <p className={styles.cat_slide_sub}>{banner.subtitle}</p>}
            </div>
          </Link>
        </div>
      ))}

      {banners.length > 1 && (
        <>
          <button
            type="button"
            className={[styles.cat_btn, styles.cat_prev].join(' ')}
            onClick={(e) => { e.preventDefault(); prev(); }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className={[styles.cat_btn, styles.cat_next].join(' ')}
            onClick={(e) => { e.preventDefault(); next(); }}
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}

// ── Main ProductSection ──────────────────────────────────────────────────────
export function ProductSection({
  title,
  subtitle,
  categorySlug,
  viewAllHref,
  showUsedTab = true,
  maxItems = 8,
}: ProductSectionProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'used'>('new');

  const newProducts = getFeaturedProducts(categorySlug, maxItems);
  const usedProducts = getProductsByCategory(categorySlug, true).slice(0, maxItems);
  const products = activeTab === 'new' ? newProducts : usedProducts;
  const banners = (categoryBanners[categorySlug] ?? []) as { title: string; image: string; href: string }[];

  if (newProducts.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.header_left}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <div className={styles.header_right}>
            {showUsedTab && usedProducts.length > 0 && (
              <div className={styles.tabs}>
                <button
                  className={[styles.tab, activeTab === 'new' ? styles.tab_active : ''].filter(Boolean).join(' ')}
                  onClick={() => setActiveTab('new')}
                >
                  Hàng mới
                </button>
                <button
                  className={[styles.tab, activeTab === 'used' ? styles.tab_active : ''].filter(Boolean).join(' ')}
                  onClick={() => setActiveTab('used')}
                >
                  Hàng cũ
                </button>
              </div>
            )}
            <Link href={viewAllHref} className={styles.view_all}>
              Xem tất cả →
            </Link>
          </div>
        </div>

        {/* Banner carousel lớn */}
        {banners.length > 0 && <CategoryCarousel banners={banners} />}

        {/* Product grid */}
        <div className={styles.grid}>
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>

        {/* Small banner carousel */}
        {banners.length > 0 && <SmallBannerCarousel banners={banners} />}
      </div>
    </section>
  );
}
