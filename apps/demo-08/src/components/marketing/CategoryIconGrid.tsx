'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/categories';
import styles from './CategoryIconGrid.module.css';

export function CategoryIconGrid() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section} aria-label="Danh mục sản phẩm">
      <div className="container">
        <div className={styles.sliderContainer}>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnLeft}`}
            onClick={() => scroll('left')}
            aria-label="Xem danh mục trước"
          >
            <ChevronLeft size={22} />
          </button>

          <div className={styles.sliderGrid} ref={sliderRef} role="list">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={cat.slug === 'lap-phong-studio' ? '/dich-vu-lap-phong' : `/danh-muc/${cat.slug}`}
                className={styles.card}
                role="listitem"
              >
                <div className={styles.imageWrap}>
                  <img
                    src={cat.image}
                    alt={cat.cardLabel || cat.name}
                    className={styles.productImg}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85';
                    }}
                  />
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardLabel}>
                    {cat.slug === 'lap-phong-studio' ? '🔥 Setup Phòng Studio' : (cat.cardLabel || cat.name)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnRight}`}
            onClick={() => scroll('right')}
            aria-label="Xem danh mục tiếp theo"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
