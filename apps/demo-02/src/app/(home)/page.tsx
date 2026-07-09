'use client';

import { Camera, Aperture, Wind, Zap } from 'lucide-react';
import HeroSlider from './components/HeroSlider';
import TrustBadges from './components/TrustBadges';
import FlashSaleBanner from './components/FlashSaleBanner';
import ProductSection from './components/ProductSection';
import BrandsStrip from './components/BrandsStrip';
import ReviewsVideo from './components/ReviewsVideo';

/* ─── QuickNav ──────────────────────────────────────────────── */
function QuickNav() {
  const items = [
    { label: 'Máy ảnh', sub: 'Mirrorless & DSLR', icon: <Camera size={22} />, link: '/san-pham?cat=camera', color: 'from-orange-500 to-amber-500' },
    { label: 'Ống kính', sub: 'RF · FE · Z · Art', icon: <Aperture size={22} />, link: '/san-pham?cat=lens', color: 'from-sky-500 to-blue-600' },
    { label: 'Drone', sub: 'DJI · Autel', icon: <Wind size={22} />, link: '/san-pham?cat=drone', color: 'from-violet-500 to-purple-600' },
    { label: 'Phụ kiện', sub: 'Flash · Gimbal · Bag', icon: <Zap size={22} />, link: '/san-pham?cat=acc', color: 'from-emerald-500 to-green-600' },
  ];

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.link}
            className="group flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/40 transition-all"
          >
            <span
              className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br ${it.color} text-white shrink-0 group-hover:scale-105 transition-transform`}
            >
              {it.icon}
            </span>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-tight">{it.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{it.sub}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ─── Home ────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div>
      <HeroSlider />
      <TrustBadges />
      <QuickNav />
      <FlashSaleBanner />

      <div className="bg-[#f7f7f8]">
        <ProductSection
          id="may-anh"
          sectionNum="01"
          title="TOP MÁY ẢNH"
          subtitle="Mirrorless & DSLR — Sản phẩm mới & bán chạy"
          catLink="/san-pham?cat=camera"
          category="camera"
        />

        <div className="h-px bg-gray-200 max-w-[1280px] mx-auto" />

        <ProductSection
          id="ong-kinh"
          sectionNum="02"
          title="TOP ỐNG KÍNH"
          subtitle="Canon RF · Sony FE · Nikon Z · Sigma Art"
          catLink="/san-pham?cat=lens"
          category="lens"
        />

        <div className="h-px bg-gray-200 max-w-[1280px] mx-auto" />

        <ProductSection
          id="flycam"
          sectionNum="03"
          title="TOP FLYCAM"
          subtitle="DJI Mavic · Mini · Air · FPV"
          catLink="/san-pham?cat=drone"
          category="drone"
        />

        <div className="h-px bg-gray-200 max-w-[1280px] mx-auto" />

        <ProductSection
          id="phu-kien"
          sectionNum="04"
          title="TOP PHỤ KIỆN"
          subtitle="Đèn Flash · Gimbal · Túi · Rig"
          catLink="/san-pham?cat=acc"
          category="acc"
        />
      </div>

      <BrandsStrip />
      <ReviewsVideo />
    </div>
  );
}
