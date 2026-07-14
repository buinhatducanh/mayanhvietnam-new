"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CDN = "https://mayanhvietnam.com";

export interface Banner {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export const HERO_BANNERS: Banner[] = [
  {
    title: "Canon EOS R6 Mark III — Chính hãng",
    subtitle: "Máy ảnh hybrid đỉnh cao · Phù hợp mọi nhiếp ảnh gia",
    image: `${CDN}/asset/imgs/img/banner/canon-r6-mark-III.webp`,
    href: "/san-pham#may-anh-canon-eos-r6-mark-iii-body",
  },
  {
    title: "Ra mắt Sony A7R VI",
    subtitle: "Máy ảnh Full-frame đỉnh cao mới nhất từ Sony",
    image: `${CDN}/asset/imgs/img/banner/sony-a7r-vi-1.webp`,
    href: "/danh-muc#may-anh",
  },
  {
    title: "Sony A7 V (A7M5) chính hãng",
    subtitle: "Ưu đãi đặc biệt khi đặt trước tại mayanhvietnam",
    image: `${CDN}/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp`,
    href: "/danh-muc#may-anh",
  },
  {
    title: "Canon EOS R50 Black + RF-S 18-45mm",
    subtitle: "Máy ảnh entry-level tốt nhất 2025",
    image: `${CDN}/asset/imgs/img/banner/canon_r50_trang_den.webp`,
    href: "/may-anh-canon-r50",
  },
  {
    title: "DJI Neo — Thiết kế siêu nhỏ gọn 135g",
    subtitle: "Flash Sale: Bỏ túi, mang theo mọi nơi",
    image: `${CDN}/asset/imgs/img/1200x200_flycam.png`,
    href: "/danh-muc#flycam",
  },
  {
    title: "Ống kính Sony — Ưu đãi tháng 1",
    subtitle: "Đăng ký Sony CTKM — Nhận ngay quà tặng hấp dẫn",
    image: `${CDN}/asset/imgs/img/banner/sony-uu-dai-thang-1.webp`,
    href: "/danh-muc#ong-kinh",
  },
  {
    title: "Ống kính Sony — Tết siêu chuẩn sáng tạo",
    subtitle: "Chào đón năm mới với ống kính Sony chính hãng",
    image: `${CDN}/asset/imgs/img/banner/tetSieuChuansangtaoSony.webp`,
    href: "/danh-muc#ong-kinh",
  },
];

const INTERVAL = 5500;

export default function BannerCarousel({ banners }: { banners?: Banner[] }) {
  const items = banners ?? HERO_BANNERS;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % items.length), [items.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="relative bg-[#0a0a0a]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Panoramic carousel — 3:1 like mayanhvietnam.com */}
        <div
          className="relative overflow-hidden bg-black"
          style={{ aspectRatio: "3/1" }}
        >
          {items.map((banner, i) => (
            <div
              key={banner.title + i}
              className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
            >
              <Link href={banner.href} className="block w-full h-full relative group">
                <img
                  src={banner.image}
                  alt={banner.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-contain"
                />
                {/* Rich gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Text overlay */}
                <div className="absolute bottom-5 left-6 sm:bottom-7 sm:left-8 right-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5 text-[#ff6a00]">
                    mayanhvietnam.com
                  </p>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-1 group-hover:text-[#ff6a00] transition-colors">
                    {banner.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/75 leading-snug max-w-xl">
                    {banner.subtitle}
                  </p>
                </div>
              </Link>
            </div>
          ))}

          {/* Arrows */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Banner ${i + 1}`}
                onClick={() => setActive(i)}
                className={`rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${i === active ? "w-8 h-2 bg-[#ff6a00]" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-5 z-20 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white/70 text-xs font-mono">
            {active + 1} / {items.length}
          </div>
        </div>
      </div>
    </section>
  );
}
