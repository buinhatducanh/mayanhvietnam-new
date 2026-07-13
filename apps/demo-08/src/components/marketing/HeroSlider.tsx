'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Wrench, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '@/lib/adapter';
import styles from './HeroSlider.module.css';

const INTERVAL = 4000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  const goTo = useCallback((idx: number) => setCurrent((idx + total) % total), [total]);
  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % total);
  }, [total]);
  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className={styles.slider}>
      <div className="container">
        {/* Main carousel wrap — 3:1 ratio giống demo-05 */}
        <div className={styles.carousel_wrap}>
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={[styles.slide, idx === current ? styles.active : ''].filter(Boolean).join(' ')}
              aria-hidden={idx !== current}
            >
              <Link href={slide.ctaHref} className={styles.slide_link}>
                {slide.desktopImage ? (
                  <img
                    src={slide.desktopImage}
                    alt={slide.alt}
                    className={styles.slide_img}
                    fetchPriority={slide.priority ? 'high' : 'auto'}
                    loading={slide.priority ? 'eager' : 'lazy'}
                  />
                ) : (
                  <div className={styles.slide_img} style={{ background: slide.bgGradient }} />
                )}
                {/* Gradient overlay */}
                <div className={styles.slide_overlay} />
                {/* Text overlay */}
                <div className={styles.slide_content}>
                  <p className={styles.slide_brand}>mayanhvietnam.com</p>
                  <h2 className={styles.slide_title}>{slide.title}</h2>
                  <p className={styles.slide_subtitle}>{slide.subtitle}</p>
                </div>
              </Link>
            </div>
          ))}

          {/* Arrows */}
          <button
            type="button"
            className={[styles.nav_btn, styles.nav_prev].join(' ')}
            onClick={(e) => { e.preventDefault(); prev(); }}
            aria-label="Slide trước"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className={[styles.nav_btn, styles.nav_next].join(' ')}
            onClick={(e) => { e.preventDefault(); next(); }}
            aria-label="Slide tiếp theo"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className={styles.dots}>
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={[styles.dot, idx === current ? styles.dot_active : ''].filter(Boolean).join(' ')}
                onClick={() => goTo(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className={styles.progress_track}>
            <div key={current} className={styles.progress_bar} style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: 'running' }} />
          </div>
        </div>

        {/* Trust bar — 4 cards bo góc giống hệt demo-05 */}
        <div className={styles.trust_row}>
          {[
            { icon: <ShieldCheck size={20} color="#f97316" />, title: 'Bảo hành chính hãng', sub: '24 tháng toàn quốc' },
            { icon: <Truck size={20} color="#f97316" />, title: 'Miễn phí vận chuyển', sub: 'Đơn từ 5 triệu' },
            { icon: <Wrench size={20} color="#f97316" />, title: 'Thu cũ trợ giá', sub: 'Lên đến 30%' },
            { icon: <CreditCard size={20} color="#f97316" />, title: 'Trả góp 0% lãi suất', sub: 'Qua thẻ tín dụng' },
          ].map(item => (
            <div key={item.title} className={styles.trust_item}>
              <div className={styles.trust_icon}>{item.icon}</div>
              <div>
                <div className={styles.trust_title}>{item.title}</div>
                <div className={styles.trust_sub}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
