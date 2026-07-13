'use client';

import { useState } from 'react';

const testimonials = [
  {
    name: 'Nguyễn Minh Tuấn',
    role: 'Nhiếp ảnh gia chuyên nghiệp',
    location: 'TP. Hồ Chí Minh',
    avatar: 'MT',
    avatarColor: '#005EB8',
    rating: 5,
    text: 'Tôi đã mua Sony A7 IV tại CameraVietNam và rất hài lòng. Sản phẩm chính hãng, giao hàng đúng hẹn, đội ngũ tư vấn rất am hiểu về nhiếp ảnh. Đây là địa chỉ tôi sẽ quay lại mỗi khi cần nâng cấp gear.',
    product: 'Sony Alpha A7 IV',
  },
  {
    name: 'Trần Thị Lan Anh',
    role: 'Content Creator / YouTuber',
    location: 'Hà Nội',
    avatar: 'LA',
    avatarColor: '#ec4899',
    rating: 5,
    text: 'Mua Canon R6 Mark II để làm video YouTube. Shop tư vấn rất tận tình, giải thích rõ sự khác biệt giữa các model. Máy về đúng như mô tả, đầy đủ phụ kiện. Sẽ giới thiệu cho bạn bè.',
    product: 'Canon EOS R6 Mark II',
  },
  {
    name: 'Phạm Đức Anh',
    role: 'Nhiếp ảnh gia cưới',
    location: 'Đà Nẵng',
    avatar: 'ĐA',
    avatarColor: '#10b981',
    rating: 5,
    text: 'Đặt hàng online lúc 9h tối, sáng hôm sau đã có hàng. Tốc độ giao hàng cực ấn tượng. Chính sách đổi trả 30 ngày cũng cho mình cảm giác yên tâm khi mua hàng đắt tiền.',
    product: 'Nikon Z6 III + 24-70mm f/4',
  },
  {
    name: 'Lê Quang Vinh',
    role: 'Nhiếp ảnh phong cảnh',
    location: 'Cần Thơ',
    avatar: 'QV',
    avatarColor: '#f59e0b',
    rating: 5,
    text: 'Mua Fujifilm X-T5 và ống kính XF 16-80mm. Giá tốt hơn các nơi khác, còn được tặng kèm gói bảo hành mở rộng. Nhân viên biết về Fujifilm rất kỹ, tư vấn được film simulation phù hợp.',
    product: 'Fujifilm X-T5 + XF 16-80mm',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.95) 100%), url("https://images.unsplash.com/photo-1600164317424-9b8162231b1c?q=80&w=2560")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative Blur elements */}
      <div style={{ position: 'absolute', bottom: '5%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 94, 184, 0.04) 0%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0, 94, 184, 0.08), transparent)' }} />

      <style>{`
        .testi-glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 94, 184, 0.06);
          border-radius: 20px;
          padding: 40px 44px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.8);
          position: relative;
        }

        .testi-sidebar-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid rgba(0, 94, 184, 0.04);
          background: rgba(255, 255, 255, 0.65);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          width: 100%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.01);
        }

        .testi-sidebar-btn:hover {
          background: #ffffff;
          border-color: rgba(0, 94, 184, 0.12);
          transform: translateX(4px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.02);
        }

        .testi-sidebar-btn.active {
          background: rgba(0, 94, 184, 0.04);
          border-color: rgba(0, 94, 184, 0.18);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);
        }
      `}</style>

      <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 16, height: 1, background: '#005EB8' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#005EB8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Trải Nghiệm Khách Hàng</span>
            <div style={{ width: 16, height: 1, background: '#005EB8' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
            Hơn <span>200,000 Khách Hàng</span> Tin Tưởng
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 40, alignItems: 'start' }}>
          
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`testi-sidebar-btn ${active === i ? 'active' : ''}`}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  background: item.avatarColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', fontWeight: 800, color: '#fff',
                }}>
                  {item.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(15,23,42,0.45)', marginTop: 2 }}>{item.role}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Main Review Glass Card */}
          <div className="testi-glass-card">
            
            {/* Top row: stars + verified badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#ffb300" stroke="#ffb300" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Verified badge */}
              <span style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.625rem', fontWeight: 800,
                color: '#10b981',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 4,
                padding: '2px 8px',
                letterSpacing: '0.05em'
              }}>
                ✓ ĐÃ XÁC THỰC MUA HÀNG
              </span>
            </div>

            {/* Quote icon SVG */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 12, opacity: 0.05, color: '#005EB8' }}>
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor"/>
            </svg>

            {/* Review text */}
            <p style={{ 
              fontSize: '1.05rem', 
              color: '#1e293b', 
              lineHeight: 1.7, 
              marginBottom: 32, 
              fontStyle: 'italic',
              fontWeight: 500 
            }}>
              &ldquo;{t.text}&rdquo;
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: '50%',
                  background: t.avatarColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.95rem', fontWeight: 800, color: '#fff',
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{t.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(15,23,42,0.5)' }}>{t.role} · {t.location}</div>
                </div>
              </div>

              {/* Monospace product card tag */}
              <div style={{
                background: 'rgba(0, 94, 184, 0.04)',
                border: '1px solid rgba(0, 94, 184, 0.08)',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: '0.75rem',
                color: '#005EB8',
                fontWeight: 700,
                fontFamily: 'ui-monospace, monospace',
                letterSpacing: '-0.01em'
              }}>
                📷 {t.product}
              </div>
            </div>

            {/* Dot indicator sliders */}
            <div style={{ display: 'flex', gap: 8, marginTop: 28, justifyContent: 'center' }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? '#005EB8' : 'rgba(0, 94, 184, 0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: i === active ? '0 0 8px rgba(0, 94, 184, 0.15)' : 'none'
                }} aria-label={`Đánh giá ${i + 1}`}/>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
