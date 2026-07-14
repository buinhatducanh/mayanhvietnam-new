'use client';

import { useState, useEffect, useRef } from 'react';
import { REAL_CATEGORIES } from '@/lib/real-products';

const categories = REAL_CATEGORIES.map((c) => {
  const meta: Record<string, { count: string; desc: string; bg: string; color: string }> = {
    'may-anh':           { count: '1,240 sản phẩm', desc: 'Mirrorless, DSLR, rangefinder',        bg: '#EBF4FF', color: '#003087' },
    'ong-kinh':          { count: '2,100 sản phẩm', desc: 'Fix, zoom, tele, macro, wide',        bg: '#FFF3E0', color: '#E65100' },
    'may-quay-phim':    { count: '320 sản phẩm',  desc: 'Máy quay 4K, vlog, cinema',           bg: '#F3E5F5', color: '#6A1B9A' },
    'action-camera':     { count: '280 sản phẩm',  desc: 'GoPro, DJI, Insta360',                bg: '#E8F5E9', color: '#1B5E20' },
    'flycam':            { count: '320 sản phẩm',  desc: 'DJI, Autel, drone 4K',                bg: '#E0F7FA', color: '#006064' },
    'thiet-bi-studio':   { count: '780 sản phẩm',  desc: 'Đèn flash, softbox, backdrop',        bg: '#E8EAF6', color: '#283593' },
    'phu-kien':         { count: '5,400 sản phẩm', desc: 'Túi, tripod, pin, thẻ nhớ',          bg: '#FCE4EC', color: '#B71C1C' },
    'lap-phong-studio':  { count: '180 sản phẩm',  desc: 'Lắp phòng studio trọn gói',          bg: '#EFEBE9', color: '#4E342E' },
    'san-pham-flash-sale': { count: 'Flash Sale',  desc: 'Giảm đến 50% hôm nay',                bg: '#FFF9C4', color: '#F57F17' },
    'san-pham-khuyen-mai': { count: 'Khuyến mãi',  desc: 'Quà tặng, ưu đãi đặc biệt',          bg: '#F3E5F5', color: '#6A1B9A' },
  };
  const m = meta[c.slug] ?? { count: '', desc: '', bg: '#F8FAFF', color: '#003087' };
  return { id: c.slug, imageUrl: c.image, label: c.name, ...m };
});

export default function CategorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ 
        padding: '80px 0', 
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.95) 100%), url("https://images.unsplash.com/photo-1553095066-5014ce727e93?q=80&w=2560")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }} 
      id="categories"
    >
      <div className="container-xl">
        {/* Header */}
        <div 
          className={`reveal ${isVisible ? 'is-visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <span className="section-label">Danh Mục Sản Phẩm</span>
          <div className="divider-blue" style={{ margin: '0 auto 20px' }}/>
          <h2 className="section-title">
            Tất Cả <span>Thiết Bị Nhiếp Ảnh</span>
          </h2>
          <p style={{ color: '#6B7A99', marginTop: 14, fontSize: '1rem', maxWidth: 520, margin: '14px auto 0' }}>
            Hơn 10,000 sản phẩm từ các thương hiệu uy tín hàng đầu thế giới
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 20,
        }}>
          {categories.map((cat, i) => (
            <a key={cat.id} href="#" style={{ textDecoration: 'none' }}>
              <div
                className={`reveal ${isVisible ? 'is-visible' : ''}`}
                style={{
                  background: '#fff',
                  border: '1.5px solid #E9EDF5',
                  borderRadius: 14,
                  padding: '24px 22px',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, opacity 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transitionDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = '0 12px 36px rgba(0,48,135,0.14)';
                  el.style.borderColor = cat.color + '40';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = '';
                  el.style.boxShadow = '';
                  el.style.borderColor = '#E9EDF5';
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 60, height: 60,
                  background: cat.bg,
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                  transition: 'transform 0.2s',
                  overflow: 'hidden'
                }}>
                  <img src={cat.imageUrl} alt={cat.label} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                </div>

                {/* Content */}
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#1A2444', marginBottom: 4 }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6B7A99', marginBottom: 8 }}>
                  {cat.desc}
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: '0.75rem', fontWeight: 600, color: cat.color,
                }}>
                  {cat.count}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
