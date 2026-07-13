'use client';

import { useState, useEffect } from 'react';

function Countdown() {
  const [time, setTime] = useState({ h: 5, m: 42, s: 17 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 5; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {[pad(time.h), pad(time.m), pad(time.s)].map((val, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            background: 'rgba(0, 94, 184, 0.04)',
            border: '1px solid rgba(0, 94, 184, 0.12)',
            color: '#0f172a',
            borderRadius: 10,
            padding: '8px 12px',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '1.25rem',
            fontWeight: 800,
            minWidth: 48,
            textAlign: 'center',
            lineHeight: 1.2,
            boxShadow: '0 4px 15px rgba(0, 94, 184, 0.05)',
          }}>
            {val}
          </div>
          {i < 2 && (
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: 800, 
              color: '#005EB8',
              animation: 'pulse 1s infinite',
            }}>:</span>
          )}
        </span>
      ))}
    </div>
  );
}

const flashDeals = [
  {
    name: 'Sony Alpha A7C II',
    original: 52990000,
    sale: 44990000,
    label: 'Mirrorless Body',
    imageUrl: 'https://mayanhvietnam.com/image-data/san-pham/23-08/23-08-30/230830134714949/avatar/638308197638831519_may-anh-sony-alpha-a7c-ii-body-only-silver-chinh-hang.jpg',
  },
  {
    name: 'Canon EOS R50 Kit',
    original: 28990000,
    sale: 23490000,
    label: 'Kit 18-45mm IS STM',
    imageUrl: 'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg',
  },
  {
    name: 'Nikon Z fc Kit',
    original: 26990000,
    sale: 21990000,
    label: 'Kit 16-50mm VR',
    imageUrl: 'https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620114819084/avatar/638864423515360825_may-anh-nikon-z-fc-bac-kem-ong-kinh-nikkor-z-dx-16-50mm-f-3-5-6-3-vr-chinh-hang.jpg',
  },
];

export default function PromoSection() {
  return (
    <section id="promo" style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.95) 100%), url("https://images.unsplash.com/photo-1497215848128-4abdc59000b1?q=80&w=2560")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative Grid Blueprint lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0, 94, 184, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 94, 184, 0.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Abstract Glowing Light blobs */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 94, 184, 0.04) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(147, 197, 253, 0.03) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 1 }} />

      <style>{`
        /* Local animations & style tokens */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        .promo-grid-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 94, 184, 0.08);
          border-radius: 20px;
          padding: 24px 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 8px 30px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.9);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .promo-grid-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 94, 184, 0.03) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .promo-grid-card:hover {
          background: #ffffff;
          border-color: rgba(0, 94, 184, 0.22);
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 94, 184, 0.08);
        }

        .promo-grid-card:hover::before {
          opacity: 1;
        }

        .promo-grid-card:hover .promo-img {
          transform: scale(1.05);
        }

        .promo-service-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 94, 184, 0.05);
          border-radius: 16px;
          padding: 24px 30px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
        }

        .promo-service-card:hover {
          border-color: rgba(0, 94, 184, 0.15);
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.01);
        }

        .promo-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 800;
          color: #005EB8;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Main interactive area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 2fr', gap: 40, alignItems: 'center', marginBottom: 40 }}>
          
          {/* Left: Interactive Header / Countdown */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="promo-tag">⚡ Chương Trình Đặc Biệt</span>
              <div style={{ width: 30, height: 1, background: 'rgba(0, 94, 184, 0.25)' }} />
            </div>

            <h2 style={{ 
              fontSize: 'clamp(2rem, 3vw, 2.75rem)', 
              fontWeight: 900, 
              color: '#0f172a', 
              letterSpacing: '-0.03em', 
              lineHeight: 1.1,
              marginBottom: 14 
            }}>
              Flash Sale<br/>
              <span style={{ 
                background: 'linear-gradient(135deg, #0f172a 30%, #005EB8 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>Giảm Đến 30%</span>
            </h2>

            <p style={{ color: 'rgba(15, 23, 42, 0.5)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 28, maxWidth: 360 }}>
              Sở hữu những dòng máy ảnh đỉnh cao với mức giá ưu đãi giới hạn. Thời gian ưu đãi còn lại:
            </p>

            <div style={{ marginBottom: 36 }}>
              <Countdown />
            </div>

            <a href="#" className="ig-btn" style={{ display: 'inline-flex', padding: '12px 32px' }}>
              Xem Tất Cả Ưu Đãi
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 8 }}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right: Grid of High-Tech Glass Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {flashDeals.map((deal, i) => {
              const disc = Math.round(((deal.original - deal.sale) / deal.original) * 100);
              return (
                <div key={i} className="promo-grid-card">
                  
                  {/* Diagonal HUD Accent */}
                  <div style={{ 
                    position: 'absolute', top: 0, right: 0, width: 32, height: 32,
                    background: 'linear-gradient(135deg, transparent 50%, rgba(0, 94, 184, 0.1) 50%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Discount percentage tag */}
                  <span style={{
                    position: 'absolute', top: 14, left: 14, zIndex: 3,
                    background: 'rgba(211, 47, 47, 0.08)',
                    border: '1px solid rgba(211, 47, 47, 0.18)',
                    color: '#d32f2f',
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.68rem', fontWeight: 800,
                    padding: '2px 8px', borderRadius: 4,
                  }}>
                    -{disc}%
                  </span>

                  {/* Image container */}
                  <div style={{ 
                    height: 120, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    marginBottom: 20, 
                    background: '#f8faff',
                    borderRadius: 12,
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img 
                      src={deal.imageUrl} 
                      alt={deal.name} 
                      className="promo-img"
                      style={{ 
                        maxWidth: '90%', 
                        maxHeight: '90%', 
                        objectFit: 'contain',
                        transition: 'transform 0.4s ease'
                      }} 
                    />
                  </div>

                  {/* Specs / Info */}
                  <div style={{ fontSize: '0.68rem', color: '#005EB8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    {deal.label}
                  </div>

                  <h3 style={{ 
                    fontSize: '0.88rem', 
                    fontWeight: 800, 
                    color: '#0f172a', 
                    lineHeight: 1.3, 
                    margin: '0 0 12px 0',
                    height: 38,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {deal.name}
                  </h3>

                  <div style={{ fontSize: '0.78rem', color: 'rgba(15, 23, 42, 0.4)', textDecoration: 'line-through', marginBottom: 2 }}>
                    {deal.original.toLocaleString('vi-VN')}₫
                  </div>

                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#d32f2f', letterSpacing: '-0.02em' }}>
                    {deal.sale.toLocaleString('vi-VN')}₫
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-col Services Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          
          {/* Free Shipping */}
          <div className="promo-service-card">
            <div style={{ 
              width: 52, height: 52, 
              borderRadius: 12, 
              background: 'rgba(0, 94, 184, 0.04)', 
              border: '1px solid rgba(0, 94, 184, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#005EB8'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.96rem', marginBottom: 4, letterSpacing: '-0.01em' }}>MIỄN PHÍ GIAO HÀNG TOÀN QUỐC</div>
              <div style={{ color: 'rgba(15,23,42,0.5)', fontSize: '0.82rem' }}>Đơn hàng từ 5,000,000₫ – Đóng gói chuyên nghiệp, giao nhanh trong 24h</div>
            </div>
          </div>

          {/* Trade-in */}
          <div className="promo-service-card">
            <div style={{ 
              width: 52, height: 52, 
              borderRadius: 12, 
              background: 'rgba(0, 94, 184, 0.04)', 
              border: '1px solid rgba(0, 94, 184, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#005EB8'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.96rem', marginBottom: 4, letterSpacing: '-0.01em' }}>THU CŨ ĐỔI MỚI - LÊN ĐỜI SIÊU TỐC</div>
              <div style={{ color: 'rgba(15,23,42,0.5)', fontSize: '0.82rem' }}>Định giá máy cũ online miễn phí – Hỗ trợ trợ giá thêm tới 500.000₫</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
