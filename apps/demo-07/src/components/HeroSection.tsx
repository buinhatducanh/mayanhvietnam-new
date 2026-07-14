'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const Camera3D = dynamic(() => import('./Camera3D'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 80, height: 80,
        border: '3px solid #E8F1FB',
        borderTop: '3px solid #003087',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}/>
    </div>
  ),
});

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      const startY = window.scrollY;
      const offsetTop = containerRef.current.offsetTop;
      const totalScrollable = containerHeight - windowHeight;
      
      let progress = (startY - offsetTop) / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Compute sub-sections visibility
  const showIntro = scrollProgress < 0.2;
  const showSpecs = scrollProgress >= 0.2 && scrollProgress < 0.45;
  const showFeatures = scrollProgress >= 0.45 && scrollProgress < 0.7;
  const showFront = scrollProgress >= 0.7 && scrollProgress < 0.85;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '450vh', // long scroll track
        background: '#020b1e', // deep premium dark blue background
      }}
    >
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .tech-card {
          background: rgba(4, 15, 37, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        /* Premium tech corners */
        .tech-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 14px; height: 14px;
          border-top: 2px solid #93c5fd;
          border-left: 2px solid #93c5fd;
          border-top-left-radius: 16px;
        }
        .tech-card::after {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 14px; height: 14px;
          border-bottom: 2px solid #93c5fd;
          border-right: 2px solid #93c5fd;
          border-bottom-right-radius: 16px;
        }
        .tech-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
          padding-bottom: 14px;
          margin-bottom: 20px;
        }
        .tech-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.75rem;
          color: #93C5FD;
          background: rgba(147, 197, 253, 0.1);
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.05em;
          border: 1px solid rgba(147, 197, 253, 0.15);
        }
        .tech-spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tech-spec-item:hover {
          background: rgba(147, 197, 253, 0.05);
          border-color: rgba(147, 197, 253, 0.2);
          transform: translateX(4px);
        }
        .tech-spec-label {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tech-spec-label::before {
          content: '◇';
          color: #93c5fd;
          font-size: 0.6rem;
        }
        .tech-spec-val {
          font-size: 0.875rem;
          color: #ffffff;
          font-weight: 600;
          text-align: right;
        }
        .scrolly-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        .scrolly-fade-out {
          opacity: 0;
          transform: translateY(30px);
          pointer-events: none;
        }
      `}</style>

      {/* Sticky view container */}
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Subtle background grids */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
          <svg style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="scrollyGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#scrollyGrid)"/>
          </svg>
        </div>

        {/* 3D Canvas wrapper */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}>
          <Camera3D scrollProgress={scrollProgress} />
        </div>

        {/* LCD full-screen overlay that zooms into the camera LCD */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: scrollProgress < 0.2 ? 1 : 0,
          // Scale down as scroll progresses (0->1 shrink to ~0.4)
          transform: `scale(${1 - Math.min(scrollProgress, 0.2) * 3})`,
          // Keep overlay above 3D canvas but below later content
          zIndex: 3,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}/>

        {/* Fade overlay for smooth section transition at the end */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 20%, #020b1e 90%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}/>

        {/* Canon flash transition – appears near the end of the Hero 3D animation */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#f8faff',
          opacity: scrollProgress > 0.8 ? (scrollProgress - 0.8) / 0.18 : 0,
          zIndex: 5,
          pointerEvents: 'none',
          transition: 'opacity 0.1s ease-out',
        }} />



        {/* === SECTION 1: Huge 4K Image Shrinking Intro === */}
        <div className={`container-xl ${showIntro ? 'scrolly-fade-in' : 'scrolly-fade-out'}`} style={{
          position: 'absolute',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 800,
          padding: '0 20px',
          transition: 'all 0.5s ease',
        }}>
          <span style={{
            background: 'rgba(0, 94, 184, 0.2)',
            border: '1px solid rgba(147, 197, 253, 0.4)',
            color: '#93C5FD',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: 24,
            padding: '6px 18px',
            marginBottom: 20,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            CameraVietNam • Trình Diễn Nghệ Thuật
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 20,
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}>
            Khám Phá Tuyệt Tác<br/>
            Qua Khung Ngắm 3D
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 580,
            lineHeight: 1.6,
          }}>
            Cuộn chuột xuống dưới để bắt đầu hành trình tương tác, khám phá cấu tạo và thông số chi tiết của chiếc máy ảnh flagship đỉnh cao.
          </p>
        </div>

        {/* === SECTION 2: Rotate Left / Show Specs on Right === */}
        <div className={`container-xl`} style={{
          position: 'absolute',
          zIndex: 3,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          padding: '0 60px',
          pointerEvents: 'none',
        }}>
          <div /> {/* Left space for rotated Camera */}
          <div className={`tech-card ${showSpecs ? 'scrolly-fade-in' : 'scrolly-fade-out'}`} style={{
            pointerEvents: 'auto',
          }}>
            <div className="tech-card-header">
              <span className="tech-tag" style={{ color: '#fff', background: 'rgba(0, 94, 184, 0.4)' }}>SPECIFICATION</span>
              <span className="tech-tag">SYS_ACTIVE // v1.0.4</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: 20, letterSpacing: '-0.02em' }}>
              Thông Số Siêu Phẩm
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Cảm biến', val: '61.0 MP Full-Frame Exmor R CMOS' },
                { label: 'Bộ xử lý', val: 'BIONZ XR + AI Co-processor' },
                { label: 'Lấy nét', val: '759 điểm AF, Tracking AI Real-time' },
                { label: 'Video', val: '8K 30p / 4K 120p 10-bit 4:2:2' },
                { label: 'Chống rung', val: '5 trục tích hợp (8.0 Stops)' },
              ].map((spec, index) => (
                <div key={index} className="tech-spec-item">
                  <div className="tech-spec-label">{spec.label}</div>
                  <div className="tech-spec-val">{spec.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === SECTION 3: Rotate Right / Show Feature on Left === */}
        <div className={`container-xl`} style={{
          position: 'absolute',
          zIndex: 3,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          padding: '0 60px',
          pointerEvents: 'none',
        }}>
          <div className={`tech-card ${showFeatures ? 'scrolly-fade-in' : 'scrolly-fade-out'}`} style={{
            pointerEvents: 'auto',
          }}>
            <div className="tech-card-header">
              <span className="tech-tag" style={{ color: '#fff', background: 'rgba(0, 94, 184, 0.4)' }}>TECHNOLOGY</span>
              <span className="tech-tag">OPTICS_CALIBRATED</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: 20, letterSpacing: '-0.02em' }}>
              Công Nghệ Đột Phá
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 16 }}>
              Sở hữu dải nhạy sáng (Dynamic Range) vượt trội lên tới <strong style={{ color: '#93c5fd' }}>15+ Stops</strong>, đem lại khả năng tái tạo ánh sáng hoàn hảo trong môi trường phức tạp nhất.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 24 }}>
              Tương thích hoàn toàn với hệ sinh thái hơn <strong style={{ color: '#93c5fd' }}>70 dòng ống kính cao cấp</strong>, đồng hành cùng bạn ghi lại trọn vẹn mọi khoảnh khắc chân thực.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ background: '#005EB8', color: '#fff', fontSize: '0.75rem', fontWeight: 600, padding: '6px 12px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>AI Processing</span>
              <span style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.75rem', fontWeight: 600, padding: '6px 12px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>15+ Stops DR</span>
            </div>
          </div>
          <div /> {/* Right space for rotated Camera */}
        </div>

        {/* === SECTION 4: Lens Facing Forward === */}
        <div className={`container-xl ${showFront ? 'scrolly-fade-in' : 'scrolly-fade-out'}`} style={{
          position: 'absolute',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 600,
          padding: '0 20px',
          transition: 'all 0.5s ease',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 16,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}>
            Ống Kính Siêu Cấp
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6,
          }}>
            Hệ thống thấu kính tráng phủ Nano chống lóa, thu nhận trọn vẹn lượng ánh sáng lớn, mang lại độ sắc nét hoàn hảo tới từng góc ảnh.
          </p>
        </div>

      </div>
    </div>
  );
}

