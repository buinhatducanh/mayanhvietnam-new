"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryBannerSlides, { type CategoryBanner } from "@/components/CategoryBannerSlides";
import ReviewVideos from "@/components/ReviewVideos";
import {
  products,
  categories,
  experiences,
  flashSaleProducts,
  getByCategory,
  getProductUrl,
  formatVND,
  categoryBanners,
  Product
} from "@/lib/products";

export default function HomePage() {
  const [now, setNow] = useState(Date.now());
  const [statsDone, setStatsDone] = useState(false);

  const statsSecRef = useRef<HTMLDivElement>(null);

  const statRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];

  const _end = useRef(Date.now() + 22 * 3600 * 1000);

  // Setup count down timer
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Parallax loop for section background orbs
  useEffect(() => {
    let plxRaf: number;

    let lastSy = -1;
    const plxLoop = () => {
      plxRaf = requestAnimationFrame(plxLoop);
      const sy = window.scrollY;
      if (sy === lastSy) return;
      lastSy = sy;
      const de = document.documentElement;
      de.style.setProperty("--plxA", `${(sy * -0.05).toFixed(1)}px`);
      de.style.setProperty("--plxB", `${(sy * 0.045).toFixed(1)}px`);
      de.style.setProperty("--plxC", `${(sy * -0.035).toFixed(1)}px`);
    };
    plxLoop();

    return () => {
      cancelAnimationFrame(plxRaf);
    };
  }, []);

  // Stats counting logic on scroll
  const fmtStat = (i: number, v: number) => {
    return i === 1 ? String(v).padStart(2, "0") : v.toLocaleString("vi-VN");
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    const statsEl = statsSecRef.current;

    if (statsEl) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((x) => x.isIntersecting)) {
            // Start counter animation
            const targets = [12, 4, 50000, 1000];
            const startTime = performance.now();
            
            const step = (timeNow: number) => {
              const k = Math.min(1, (timeNow - startTime) / 1500);
              const e = 1 - Math.pow(1 - k, 3); // ease-out cubic
              
              targets.forEach((t, i) => {
                const el = statRefs[i].current;
                if (el) {
                  el.textContent = fmtStat(i, Math.round(t * e));
                }
              });
              
              if (k < 1) {
                requestAnimationFrame(step);
              } else {
                setStatsDone(true);
              }
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      observer.observe(statsEl);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  // Count down calculation
  const diff = Math.max(0, _end.current - now);
  const pad = (n: number) => String(n).padStart(2, "0");
  const cdH = pad(Math.floor(diff / 3600000));
  const cdM = pad(Math.floor((diff % 3600000) / 60000));
  const cdS = pad(Math.floor((diff % 60000) / 1000));

  // Product cards and categories helper
  const badgeBg = (t: string) => (t === "hot" ? "#e2483d" : t === "sale" ? "#ff6a00" : "#1a9e5c");
  
  const getProductCard = (p: Product) => ({
    id: p.id,
    isCard: true, 
    isTile: false,
    href: `/${getProductUrl(p.slug)}`,
    thumbnail: p.thumbnail, 
    name: p.name, 
    brand: p.brand,
    badgeList: p.badges.slice(0, 1).map((b) => ({ label: b.label, bg: badgeBg(b.type) })),
    hasDiscount: !!p.originalPrice && p.originalPrice > p.price,
    discountLabel: p.originalPrice && p.originalPrice > p.price ? `-${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%` : "",
    priceLabel: p.callForPrice ? "Liên hệ" : formatVND(p.price),
    origLabel: p.originalPrice && p.originalPrice > p.price ? formatVND(p.originalPrice) : "",
    specsLine: (p.shortSpecs || []).slice(0, 3).join(" · "),
    ratingLabel: p.rating ? `${p.rating.average} (${p.rating.count} đánh giá)` : "",
  });

  const getTile = (o: any) => ({ isCard: false, isTile: true, badgeList: [], ...o });

  const flashItems = flashSaleProducts.map((p, i) => ({
    id: p.id,
    range: `entry ${(i % 6) * 5}% entry ${62 + (i % 6) * 5}%`,
    href: `/${getProductUrl(p.slug)}`,
    thumbnail: p.thumbnail, 
    name: p.name, 
    brand: p.brand,
    badge: "Flash", 
    soldPercent: p.soldPercent, 
    soldWidth: `${p.soldPercent}%`,
    hasDiscount: !!p.originalPrice && p.originalPrice > p.price,
    discountLabel: p.originalPrice && p.originalPrice > p.price ? `-${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%` : "",
    priceLabel: p.callForPrice ? "Liên hệ" : formatVND(p.price),
  }));

  const staticSections = [
    { subtitle: "Máy ảnh", title: "Top Máy Ảnh", slug: "may-anh", href: "/danh-muc#may-anh", items: getByCategory("may-anh").slice(0, 4).map(getProductCard) },
    { subtitle: "Ống kính", title: "Ống Kính Nổi Bật", slug: "ong-kinh", href: "/danh-muc#ong-kinh", items: getByCategory("ong-kinh").slice(0, 4).map(getProductCard) },
    { subtitle: "Flycam", title: "Flycam & Drone", slug: "flycam", href: "/danh-muc#flycam", items: getByCategory("flycam").slice(0, 4).map(getProductCard) },
    { subtitle: "Camera hành động", title: "Action Camera", slug: "action-camera", href: "/danh-muc#action-camera", items: getByCategory("action-camera").slice(0, 3).map(getProductCard) },
  ];

  const sections = staticSections.map((sec, si) => ({
    ...sec,
    orbVar: si % 2 ? "--plxC" : "--plxB",
    orbPos: si % 2 ? { right: "-160px", top: "60px" } : { left: "-160px", top: "40px" },
    items: sec.items.map((it: any, i) => ({ ...it, range: `entry ${(i % 4) * 7}% entry ${62 + (i % 4) * 7}%` })),
  }));

  const cats = categories.map((c, i) => ({
    id: c.id,
    href: `/danh-muc#${c.slug}`, 
    image: c.image, 
    name: c.name, 
    countLabel: `${c.productCount} sản phẩm`, 
    range: `entry ${(i % 5) * 6}% entry ${62 + (i % 5) * 6}%` 
  }));

  const exps = experiences.map((e, i) => {
    const pr = products.find((p) => p.slug === e.productSlug);
    const thumb = pr ? pr.thumbnail : "";
    return { ...e, num: `0${i + 1}`, thumb, hasThumb: !!thumb, range: `entry ${(i % 3) * 10}% entry ${62 + (i % 3) * 10}%` };
  });

  const marqueeBrands = ["Canon", "Sony", "Nikon", "Fujifilm", "DJI", "GoPro", "Insta360", "Sigma", "Tamron", "Godox", "Leica"];

  const stats = [
    { target: 12, plus: "+", label: "Năm kinh nghiệm" },
    { target: 4, plus: "", label: "Showroom toàn quốc" },
    { target: 50000, plus: "+", label: "Khách hàng tin chọn" },
    { target: 1000, plus: "+", label: "Sản phẩm chính hãng" },
  ].map((s, i) => ({ 
    ...s, 
    ref: statRefs[i], 
    value: statsDone ? fmtStat(i, s.target) : "0", 
    borderLeft: i ? "1px solid #f1eee9" : "none" 
  }));

  return (
    <div className="font-sans bg-[#fafaf8] text-[#16130f]">
      <SiteHeader active="home" />

      {/* ═══════════ HERO BANNER (panoramic 3:1) ═══════════ */}
      <BannerCarousel />

      {/* ═══════════ LOGO MARQUEE ═══════════ */}
      <div className="border-b border-[#e9e6e1] bg-white py-[22px] overflow-hidden">
        <div className="flex w-[200%] animate-[marqueeX_25s_linear_infinite] hover:[animation-play-state:paused]">
          <div className="flex items-center gap-[46px] pr-[46px]">
            {marqueeBrands.map((brand, idx) => (
              <span key={idx} className="display: flex; align-items: center; gap-[46px]">
                <span className="text-[14px] font-bold tracking-[0.14em] uppercase text-[#b6afa5] whitespace-nowrap">{brand}</span>
                <span className="w-1.2 h-1.2 rounded-full bg-[rgba(255,106,0,0.45)] shrink-0 block" />
              </span>
            ))}
          </div>
          <div className="flex items-center gap-[46px] pr-[46px]">
            {marqueeBrands.map((brand, idx) => (
              <span key={`dup-${idx}`} className="display: flex; align-items: center; gap-[46px]">
                <span className="text-[14px] font-bold tracking-[0.14em] uppercase text-[#b6afa5] whitespace-nowrap">{brand}</span>
                <span className="w-1.2 h-1.2 rounded-full bg-[rgba(255,106,0,0.45)] shrink-0 block" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ THỐNG KÊ ═══════════ */}
      <section ref={statsSecRef} data-screen-label="Thống kê" className="max-w-[1280px] mx-auto px-8 pt-14">
        <div className="border border-[#e9e6e1] bg-white rounded-3xl py-9 px-5 grid grid-cols-2 md:grid-cols-4 shadow-[0_30px_60px_-44px_rgba(22,19,15,0.18)] animate-fadeUp">
          {stats.map((st, idx) => (
            <div key={idx} style={{ borderLeft: st.borderLeft }} className="text-center px-3 py-1">
              <p className="m-0 text-[46px] font-light tracking-[-0.02em] text-[#16130f]">
                <span ref={st.ref}>{st.value}</span>
                <span className="text-[#ff6a00] font-normal">{st.plus}</span>
              </p>
              <p className="mt-[9px] mb-0 font-mono text-[10px] font-semibold text-[#a39d94] uppercase tracking-[0.2em]">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ DANH MỤC ═══════════ */}
      <section data-screen-label="Danh mục" className="relative max-w-[1280px] mx-auto px-8 pt-[88px]">
        <div 
          aria-hidden="true"
          style={{ transform: "translate3d(0, var(--plxA, 0px), 0)" }}
          className="absolute right-[-20px] top-[-30px] text-[148px] font-extrabold tracking-[-0.04em] leading-[1] text-transparent select-none pointer-events-none z-[-1] whitespace-nowrap font-serif [webkit-text-stroke:1.5px_#efe9e0] transition-transform duration-100"
        >
          MÁY ẢNH
        </div>
        
        <div className="text-center animate-fadeUp">
          <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6a00]">Danh mục sản phẩm</p>
          <h2 className="mt-2.5 mb-0 text-[38px] font-light tracking-[-0.02em] text-[#16130f] text-balance">Khám phá thế giới nhiếp ảnh</h2>
        </div>
        
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {cats.map((cat) => (
            <div 
              key={cat.id} 
              style={{ animation: `revealUp linear both`, animationTimeline: "view()", animationRange: cat.range }}
            >
              <Link 
                href={cat.href}
                className="flex flex-col items-center gap-2.5 border border-[#e9e6e1] bg-white rounded-[18px] px-3.5 py-[22px] pb-[18px] no-underline transition-all hover:border-[rgba(255,106,0,0.45)] hover:-translate-y-[4px] hover:shadow-[0_22px_40px_-20px_rgba(255,106,0,0.4)]"
              >
                <span className="w-[62px] h-[62px] flex items-center justify-center rounded-2xl bg-[#f7f4ef] overflow-hidden transition-transform hover:scale-[1.1] hover:rotate-[-2deg]">
                  <img src={cat.image} alt={cat.name} className="w-[46px] h-[46px] object-contain" />
                </span>
                <span className="text-[13.5px] font-semibold text-[#16130f] text-center">{cat.name}</span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[#a39d94]">{cat.countLabel}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ TRẢI NGHIỆM 3D ═══════════ */}
      <section id="trai-nghiem-3d" data-screen-label="Trải nghiệm 3D" className="max-w-[1280px] mx-auto mt-[88px] px-8">
        <div className="relative overflow-hidden bg-[#16130f] rounded-[28px] px-14 py-14 pb-[60px]">
          <div aria-hidden="true" className="absolute top-[-160px] left-[30%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.28),transparent_70%)] blur-[20px] animate-[glowPulse_7s_ease-in-out_infinite]" />
          
          <div className="relative flex items-end justify-between gap-6 flex-wrap animate-fadeUp">
            <div>
              <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff8a3d]">Trải nghiệm 3D tương tác</p>
              <h2 className="mt-3 mb-0 text-[40px] font-light tracking-[-0.02em] text-[#f7f4ef] text-balance">
                Xem sản phẩm 360° <span className="font-semibold text-[#ff6a00]">trước khi mua</span>
              </h2>
              <p className="mt-3 mb-0 max-w-[520px] text-[15px] font-light leading-[1.6] text-[#a39d94]">
                Mỗi dòng máy là một hành trình cuộn riêng — xoay mô hình 3D, phô diễn thông số và cảm nhận sản phẩm như đang cầm trên tay.
              </p>
            </div>
            <p className="m-0 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#7a746c]">03 dòng máy · Cuộn để khám phá</p>
          </div>
          
          <div className="relative mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {exps.map((exp, idx) => (
              <div 
                key={idx} 
                style={{ animation: `revealUp linear both`, animationTimeline: "view()", animationRange: exp.range }}
              >
                <Link 
                  href={exp.href}
                  className="relative flex flex-col gap-0 border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.045)] rounded-[20px] px-[26px] py-[26px] pb-6 no-underline overflow-hidden transition-all hover:border-[rgba(255,106,0,0.55)] hover:bg-[rgba(255,106,0,0.07)] hover:-translate-y-[5px] hover:shadow-[0_28px_56px_-24px_rgba(255,106,0,0.5)]"
                >
                  <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#ff8a3d]">{exp.num}</span>
                  {exp.hasThumb && (
                    <span className="absolute top-[18px] right-[18px] w-[76px] h-[76px] rounded-2xl bg-white shadow-[0_16px_32px_-12px_rgba(0,0,0,0.55)] overflow-hidden flex items-center justify-center transition-transform hover:scale-[1.08] hover:rotate-[-2deg]">
                      <img src={exp.thumb} alt={exp.title} className="w-full h-full object-contain p-1.5" />
                    </span>
                  )}
                  <span className="mt-[42px] font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[#7a746c]">{exp.label}</span>
                  <span className="mt-2 text-[25px] font-medium tracking-[-0.01em] text-[#f7f4ef]">{exp.title}</span>
                  <span className="mt-[7px] text-[13.5px] font-light leading-[1.55] text-[#a39d94]">{exp.tagline}</span>
                  <span className="mt-5 flex items-center justify-between border-t border-[rgba(255,255,255,0.1)] pt-[15px]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#cfc9c2]">{exp.stat}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FLASH SALE ═══════════ */}
      <section id="flash-sale" data-screen-label="Flash Sale" className="max-w-[1280px] mx-auto px-8 pt-[88px]">
        <div className="flex items-center justify-between gap-5 flex-wrap animate-fadeUp">
          <div className="flex items-center gap-4">
            <span className="w-[46px] h-[46px] rounded-[14px] bg-[rgba(255,106,0,0.1)] flex items-center justify-center">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="#ff6a00" stroke="#ff6a00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
              </svg>
            </span>
            <div>
              <h2 className="m-0 text-[27px] font-bold tracking-[-0.01em] text-[#16130f]">Flash Sale — Ưu đãi cực sốc</h2>
              <p className="mt-1 mb-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#a39d94]">Kết thúc sau</p>
            </div>
            <div className="flex items-center gap-[7px] ml-2">
              <span className="min-w-[46px] h-[46px] px-1.5 rounded-xl bg-[#16130f] text-white font-mono text-[19px] font-semibold flex items-center justify-center">{cdH}</span>
              <span className="text-[19px] font-bold text-[#ff6a00]">:</span>
              <span className="min-w-[46px] h-[46px] px-1.5 rounded-xl bg-[#16130f] text-white font-mono text-[19px] font-semibold flex items-center justify-center">{cdM}</span>
              <span className="text-[19px] font-bold text-[#ff6a00]">:</span>
              <span className="min-w-[46px] h-[46px] px-1.5 rounded-xl bg-[#ff6a00] text-white font-mono text-[19px] font-semibold flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(255,106,0,0.6)]">{cdS}</span>
            </div>
          </div>
          <Link href="/danh-muc" className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-[#dcd8d2] bg-white text-[#16130f] no-underline text-[14px] font-semibold transition-all hover:border-[rgba(255,106,0,0.5)] hover:text-[#ff6a00] hover:-translate-y-[2px] hover:shadow-[0_14px_28px_-16px_rgba(255,106,0,0.45)]">
            Xem tất cả <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </div>

        {/* Flash sale banner */}
        {categoryBanners['flash-sale'] && (
          <div className="mt-6">
            <CategoryBannerSlides banners={categoryBanners['flash-sale']} />
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {flashItems.map((p) => (
            <div 
              key={p.id}
              style={{ animation: `revealUp linear both`, animationTimeline: "view()", animationRange: p.range }}
              className="flex flex-col"
            >
              <Link 
                href={p.href}
                className="relative flex flex-col border border-[#e9e6e1] bg-white rounded-2xl overflow-hidden no-underline transition-all hover:border-[rgba(255,106,0,0.45)] hover:-translate-y-[4px] hover:shadow-[0_22px_44px_-20px_rgba(255,106,0,0.42)]"
              >
                <span className="absolute left-2 top-2 z-[2] text-[9px] font-extrabold uppercase tracking-[0.04em] text-white bg-[#e2483d] rounded-full px-2 py-0.5">{p.badge}</span>
                {p.hasDiscount && (
                  <span className="absolute right-2 top-2 z-[2] text-[9.5px] font-extrabold text-white bg-[#ff6a00] rounded-full px-1.8 py-0.5 shadow-[0_6px_14px_-6px_rgba(255,106,0,0.7)]">{p.discountLabel}</span>
                )}
                <span className="block aspect-square bg-white overflow-hidden">
                  <img src={p.thumbnail} alt={p.name} className="w-full h-full object-contain p-2.5 transition-transform duration-400 hover:scale-[1.07]" />
                </span>
                <span className="flex flex-col p-[11px_12px_12px] border-t border-[#f1eee9]">
                  <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[#a39d94]">{p.brand}</span>
                  <span className="mt-1 text-[12.5px] font-medium leading-[1.35] text-[#16130f] line-clamp-2 min-h-[34px]">{p.name}</span>
                  <span className="mt-1.8 text-[13.5px] font-extrabold text-[#ff6a00]">{p.priceLabel}</span>
                </span>
              </Link>
              
              {/* Flash sale sold bar */}
              <div className="mt-2.5 relative h-1.5 rounded-full bg-[#eee9e2] overflow-hidden">
                <div style={{ width: p.soldWidth }} className="h-full rounded-full bg-gradient-to-r from-[#ff6a00] to-[#e2483d]" />
              </div>
              <p className="mt-[5px] mb-0 font-mono text-[9px] font-semibold text-[#7a746c] text-center">ĐÃ BÁN {p.soldPercent}%</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ PRODUCT SECTIONS ═══════════ */}
      {sections.map((sec, si) => (
        <section 
          key={si}
          data-screen-label={sec.title} 
          className="relative max-w-[1280px] mx-auto px-8 pt-[88px]"
        >
          <div 
            aria-hidden="true" 
            style={{ 
              ...sec.orbPos,
              transform: `translate3d(0, var(${sec.orbVar}, 0px), 0)` 
            }}
            className="absolute w-[420px] h-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.08),transparent_70%)] blur-[14px] pointer-events-none z-[-1] transition-transform duration-100" 
          />
          
          <div className="flex items-end justify-between gap-5 flex-wrap animate-fadeUp">
            <div>
              <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6a00]">{sec.subtitle}</p>
              <h2 className="mt-2.5 mb-0 text-[34px] font-light tracking-[-0.02em] text-[#16130f]">{sec.title}</h2>
            </div>
            <Link href={sec.href} className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#7a746c] no-underline p-[8px_4px] transition-colors hover:text-[#ff6a00] hover:gap-3">
              Xem tất cả <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          {/* Category banner slides — like demo-05 */}
          {categoryBanners[sec.slug as keyof typeof categoryBanners] && (
            <div className="mt-7">
              <CategoryBannerSlides banners={categoryBanners[sec.slug as keyof typeof categoryBanners]} />
            </div>
          )}

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {sec.items.map((p: any, idx) => (
              <div 
                key={idx} 
                style={{ animation: `revealUp linear both`, animationTimeline: "view()", animationRange: p.range }}
              >
                {p.isCard ? (
                  <Link 
                    href={p.href}
                    className="relative flex flex-col border border-[#e9e6e1] bg-white rounded-[18px] overflow-hidden no-underline transition-all hover:border-[rgba(255,106,0,0.45)] hover:-translate-y-[4px] hover:shadow-[0_24px_48px_-22px_rgba(255,106,0,0.42)] h-full"
                  >
                    <span className="absolute left-2.5 top-2.5 z-[2] flex flex-col gap-1 items-start">
                      {p.badgeList.map((b: any, bIdx: number) => (
                        <span key={bIdx} style={{ background: b.bg }} className="text-[9px] font-extrabold uppercase tracking-[0.04em] text-white rounded-full px-2.2 py-[3.5px]">
                          {b.label}
                        </span>
                      ))}
                    </span>
                    {p.hasDiscount && (
                      <span className="absolute right-2.5 top-2.5 z-[2] text-[10px] font-extrabold text-white bg-[#ff6a00] rounded-full px-2 py-[3.5px] shadow-[0_6px_14px_-6px_rgba(255,106,0,0.7)]">{p.discountLabel}</span>
                    )}
                    <span className="block aspect-square bg-white overflow-hidden">
                      <img src={p.thumbnail} alt={p.name} className="w-full h-full object-contain p-4 transition-transform duration-400 hover:scale-[1.06]" />
                    </span>
                    <span className="flex flex-col flex-1 p-[14px_16px_16px] border-t border-[#f1eee9]">
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a39d94]">{p.brand}</span>
                      <span className="mt-1 text-[14.5px] font-medium leading-[1.38] text-[#16130f] line-clamp-2 min-h-[40px]">{p.name}</span>
                      <span className="mt-1.5 text-[11.5px] text-[#a39d94] truncate">{p.specsLine}</span>
                      <span className="mt-2.5 flex items-baseline gap-2">
                        <span className="text-[16px] font-extrabold text-[#ff6a00]">{p.priceLabel}</span>
                        {p.hasDiscount && (
                          <span className="text-[12px] color-[#a39d94] line-through">{p.origLabel}</span>
                        )}
                      </span>
                      {p.ratingLabel && (
                        <span className="mt-2 flex items-center gap-1.2 text-[12px] text-[#7a746c]"><span className="text-[#ff6a00]">★</span> {p.ratingLabel}</span>
                      )}
                    </span>
                  </Link>
                ) : (
                  <Link 
                    href={p.href}
                    className="relative flex flex-col justify-between border border-dashed border-[#dcd8d2] bg-[#f7f4ef] rounded-[18px] p-6 no-underline overflow-hidden transition-all hover:border-[rgba(255,106,0,0.55)] hover:bg-[rgba(255,106,0,0.06)] hover:-translate-y-[4px] hover:shadow-[0_24px_48px_-24px_rgba(255,106,0,0.4)] h-full"
                  >
                    <span>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff6a00]">{p.kicker}</span>
                      <span className="block mt-3 text-[21px] font-medium tracking-[-0.01em] leading-[1.25] text-[#16130f] text-balance">{p.title}</span>
                      <span className="block mt-2.2 text-[13px] font-light leading-[1.55] text-[#7a746c]">{p.sub}</span>
                    </span>
                    <span className="flex items-center gap-2 mt-4 text-[13.5px] font-bold text-[#ff6a00] hover:text-[#ea6100]">
                      {p.cta} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="h-[96px]" />

      {/* Review Videos */}
      <ReviewVideos />

      <div className="h-[96px]" />
      <SiteFooter />
    </div>
  );
}
