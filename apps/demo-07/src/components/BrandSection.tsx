'use client';

import { useState } from 'react';
import { getAllBrands } from '@mayanhvietnam/mock-data';

const BRAND_META: Record<string, { color: string; tagline: string; logo: string }> = {
  Sony:       { color: '#005EB8', tagline: 'α Series',           logo: 'SONY' },
  Canon:      { color: '#CC0000', tagline: 'EOS R Series',       logo: 'Canon' },
  Nikon:      { color: '#E5A900', tagline: 'Z Series',           logo: 'Nikon' },
  DJI:        { color: '#00d2ff', tagline: 'Drone & Gimbal',     logo: 'dji' },
  GoPro:      { color: '#E60000', tagline: 'Hero Series',        logo: 'GoPro' },
  Insta360:   { color: '#FF6A00', tagline: '360° & Action',      logo: 'Insta360' },
  Godox:      { color: '#1E293B', tagline: 'Lighting',           logo: 'Godox' },
  Blackmagic: { color: '#420072', tagline: 'Cinema',             logo: 'Blackmagic' },
  Aputure:    { color: '#FF4400', tagline: 'LED Lighting',       logo: 'Aputure' },
  Nanlite:    { color: '#0055AA', tagline: 'LED Studio',         logo: 'Nanlite' },
  Kase:       { color: '#222222', tagline: 'Filters & Lenses',   logo: 'Kase' },
  'Peak Design': { color: '#2D3748', tagline: 'Bags & Straps',   logo: 'PD' },
  Lowepro:    { color: '#005F2B', tagline: 'Camera Bags',        logo: 'Lowepro' },
};

const DEFAULT_META = { color: '#64748B', tagline: '', logo: '' };

const brands = getAllBrands().map((name) => ({
  name,
  ...(BRAND_META[name] ?? DEFAULT_META),
  logo: BRAND_META[name]?.logo ?? name,
}));

export default function BrandSection() {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  return (
    <section style={{ 
      padding: '100px 0 60px', 
      background: '#ffffff', // Clean White Theme
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid #eef2f6'
    }}>
      
      {/* Accent Grid Lines in Light Theme */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0, 94, 184, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 94, 184, 0.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Abstract Glowing Pastel Blobs */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 94, 184, 0.05) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(147, 197, 253, 0.04) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 1 }} />

      <style>{`
        /* Infinite Marquee animations */
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .brand-track-left {
          display: flex;
          width: max-content;
          gap: 20px;
          animation: marqueeLeft 28s linear infinite;
        }

        .brand-track-right {
          display: flex;
          width: max-content;
          gap: 20px;
          animation: marqueeRight 28s linear infinite;
        }

        .brand-marquee-container:hover .brand-track-left,
        .brand-marquee-container:hover .brand-track-right {
          animation-play-state: paused;
        }

        .brand-glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 94, 184, 0.06);
          border-radius: 16px;
          padding: 22px 40px;
          min-width: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.8);
          cursor: pointer;
          user-select: none;
        }

        .brand-glass-card:hover {
          background: #ffffff;
          transform: scale(1.05) rotateX(4deg) rotateY(-4deg);
        }

        .brand-text-logo {
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: rgba(15, 23, 42, 0.4);
          transition: color 0.3s;
          font-family: 'Outfit', 'Inter', sans-serif;
        }

        .brand-glass-card:hover .brand-text-logo {
          color: #0f172a;
          text-shadow: 0 0 10px rgba(0, 94, 184, 0.1);
        }
      `}</style>

      <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 16, height: 1, background: '#005EB8' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#005EB8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Hệ Sinh Thái Thiết Bị</span>
            <div style={{ width: 16, height: 1, background: '#005EB8' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
            Đối Tác <span style={{ color: '#005EB8' }}>Chính Hãng</span>
          </h2>
        </div>

        {/* Floating Marquees */}
        <div className="brand-marquee-container" style={{ display: 'flex', flexDirection: 'column', gap: 20, overflow: 'hidden', padding: '10px 0' }}>
          
          {/* Track 1: Moving Left */}
          <div className="brand-track-left">
            {[...brands, ...brands].map((brand, idx) => (
              <div 
                key={`l-${idx}`}
                className="brand-glass-card"
                style={{
                  borderColor: hoveredBrand === brand.name ? brand.color : 'rgba(0, 94, 184, 0.06)',
                  boxShadow: hoveredBrand === brand.name ? `0 12px 30px ${brand.color}15, 0 0 15px ${brand.color}08` : undefined,
                }}
                onMouseEnter={() => setHoveredBrand(brand.name)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                <div className="brand-text-logo" style={{ color: hoveredBrand === brand.name ? brand.color : undefined }}>
                  {brand.logo}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(15,23,42,0.4)', marginTop: 4, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {brand.tagline}
                </div>
              </div>
            ))}
          </div>

          {/* Track 2: Moving Right */}
          <div className="brand-track-right">
            {[...brands, ...brands].reverse().map((brand, idx) => (
              <div 
                key={`r-${idx}`}
                className="brand-glass-card"
                style={{
                  borderColor: hoveredBrand === brand.name ? brand.color : 'rgba(0, 94, 184, 0.06)',
                  boxShadow: hoveredBrand === brand.name ? `0 12px 30px ${brand.color}15, 0 0 15px ${brand.color}08` : undefined,
                }}
                onMouseEnter={() => setHoveredBrand(brand.name)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                <div className="brand-text-logo" style={{ color: hoveredBrand === brand.name ? brand.color : undefined }}>
                  {brand.logo}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(15,23,42,0.4)', marginTop: 4, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {brand.tagline}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
