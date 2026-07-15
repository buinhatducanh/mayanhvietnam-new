'use client';

import { useState } from 'react';

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Hàng Chính Hãng 100%',
    desc: 'Toàn bộ sản phẩm nhập khẩu trực tiếp từ hãng, có hóa đơn VAT đầy đủ và tem chính hãng.',
    color: '#005EB8',
    hudLabel: 'GENUINE',
    hudMetric: '100%'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Bảo Hành 24 Tháng',
    desc: 'Dịch vụ bảo hành tại trung tâm ủy quyền chính thức, hỗ trợ kỹ thuật trọn đời.',
    color: '#10b981',
    hudLabel: 'WARRANTY',
    hudMetric: '24M'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Giao Hàng Siêu Tốc',
    desc: 'Giao hỏa tốc trong 24h tại nội thành, hỗ trợ đóng gói chống va đập chuyên dụng.',
    color: '#f59e0b',
    hudLabel: 'DELIVERY',
    hudMetric: '24H'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Tư Vấn Chuyên Gia 24/7',
    desc: 'Đội ngũ chuyên viên kỹ thuật am hiểu sâu về nhiếp ảnh hỗ trợ setup máy miễn phí.',
    color: '#8b5cf6',
    hudLabel: 'SUPPORT',
    hudMetric: '24/7'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: 'Trả Góp Lãi Suất 0%',
    desc: 'Mua trả góp lãi suất 0% thông qua hơn 25 ngân hàng liên kết, xét duyệt online.',
    color: '#ec4899',
    hudLabel: 'INTEREST',
    hudMetric: '0%'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    ),
    title: '30 Ngày Đổi Trả Dễ Dàng',
    desc: 'Hoàn tiền hoặc đổi mới sản phẩm nguyên hộp trong vòng 30 ngày nếu không ưng ý.',
    color: '#06b6d4',
    hudLabel: 'RETURN',
    hudMetric: '30D'
  },
];

export default function WhyUs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeFeature = features[activeIdx];

  return (
    <section style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.95) 100%), url("https://images.unsplash.com/photo-1507133750073-ec82bb042c17?q=80&w=2560")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background blueprint elements */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 94, 184, 0.04) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      
      <style>{`
        /* Rotational orbit animations */
        @keyframes orbitCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitCCW {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .hud-circle-outer {
          animation: orbitCW 24s linear infinite;
        }

        .hud-circle-inner {
          animation: orbitCCW 16s linear infinite;
        }

        /* Glassmorphic card custom styling in Light Theme */
        .why-glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 94, 184, 0.05);
          border-radius: 16px;
          padding: 22px 24px;
          display: flex;
          gap: 16px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.01), inset 0 1px 0 rgba(255,255,255,0.8);
        }

        .why-glass-card:hover {
          background: #ffffff;
          transform: translateX(10px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.03);
        }

        .why-glass-card.active {
          background: #ffffff;
          border-color: rgba(0, 94, 184, 0.18);
          box-shadow: 0 10px 30px rgba(0, 94, 184, 0.06), inset 0 1px 0 rgba(255,255,255,0.9);
        }
      `}</style>

      <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 16, height: 1, background: '#005EB8' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#005EB8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Tại Sao Chọn Chúng Tôi</span>
            <div style={{ width: 16, height: 1, background: '#005EB8' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
            Cam Kết Vàng <span style={{ color: '#005EB8' }}>CameraVietNam</span>
          </h2>
        </div>

        {/* Dashboard Split Grid */}
        <div className="why-us-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'center' }}>

          {/* Left Side: Dynamic HUD circular dashboard console */}
          <div className="why-us-hud" style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: 420 }}>

            {/* HUD Central ring structure */}
            <div className="why-us-hud-ring" style={{ position: 'relative', width: 340, height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* Outer orbit */}
              <div className="hud-circle-outer" style={{
                position: 'absolute', width: '100%', height: '100%',
                borderRadius: '50%', border: '1.5px dashed rgba(0, 94, 184, 0.12)',
              }} />

              {/* Middle dashed orbit with crosshairs */}
              <div className="hud-circle-inner" style={{
                position: 'absolute', width: '82%', height: '82%',
                borderRadius: '50%', border: '1px solid rgba(0, 94, 184, 0.15)',
                strokeDasharray: '8 16'
              }} />

              {/* Solid inner border containing active color glow */}
              <div style={{
                position: 'absolute', width: '65%', height: '65%',
                borderRadius: '50%', border: `2px solid ${activeFeature.color}`,
                boxShadow: `0 8px 30px ${activeFeature.color}15, inset 0 0 15px ${activeFeature.color}10`,
                transition: 'border-color 0.5s, box-shadow 0.5s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)'
              }}>
                <div style={{ color: activeFeature.color, transition: 'color 0.5s', transform: 'scale(1.3)', marginBottom: 12 }}>
                  {activeFeature.icon}
                </div>
                
                {/* Monospace Active details inside HUD */}
                <div style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  color: 'rgba(15,23,42,0.4)',
                  textTransform: 'uppercase',
                  marginBottom: 2
                }}>
                  {activeFeature.hudLabel}
                </div>

                <div className="why-us-hud-metric" style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#0f172a',
                  lineHeight: 1,
                  fontFamily: 'ui-monospace, monospace',
                  letterSpacing: '-0.03em'
                }}>
                  {activeFeature.hudMetric}
                </div>
              </div>

              {/* Sub-HUD outer coordinates marker lines */}
              <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', fontSize: '0.625rem', fontFamily: 'monospace', color: 'rgba(0, 94, 184, 0.3)' }}>SYS_OK // [01-A]</div>
              <div style={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)', fontSize: '0.625rem', fontFamily: 'monospace', color: 'rgba(0, 94, 184, 0.3)' }}>TELEMETRY_CONNECTED</div>
            </div>

          </div>

          {/* Right Side: 6 feature cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {features.map((f, i) => (
              <div 
                key={i}
                className={`why-glass-card ${activeIdx === i ? 'active' : ''}`}
                onMouseEnter={() => setActiveIdx(i)}
                style={{
                  borderColor: activeIdx === i ? f.color + '30' : undefined
                }}
              >
                <div style={{
                  width: 44, height: 44,
                  borderRadius: 10,
                  background: activeIdx === i ? f.color + '10' : 'rgba(0, 94, 184, 0.02)',
                  border: `1px solid ${activeIdx === i ? f.color + '25' : 'rgba(0, 94, 184, 0.05)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: activeIdx === i ? f.color : 'rgba(15, 23, 42, 0.4)',
                  transition: 'all 0.3s',
                  flexShrink: 0
                }}>
                  {f.icon}
                </div>
                
                <div>
                  <h3 style={{ 
                    fontSize: '0.9375rem', 
                    fontWeight: 700, 
                    color: activeIdx === i ? '#0f172a' : '#1e293b', 
                    margin: '0 0 4px 0',
                    transition: 'color 0.3s'
                  }}>
                    {f.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: activeIdx === i ? '#334155' : 'rgba(30, 41, 59, 0.65)', 
                    margin: 0,
                    lineHeight: 1.5,
                    transition: 'color 0.3s'
                  }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
