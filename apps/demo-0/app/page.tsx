"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { 
  products, 
  categories, 
  experiences, 
  flashSaleProducts, 
  getByCategory, 
  getProductUrl, 
  formatVND, 
  discountOf,
  Product
} from "@/lib/products";

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1);
  const [now, setNow] = useState(Date.now());
  const [statsDone, setStatsDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroSecRef = useRef<HTMLDivElement>(null);
  const statsSecRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  const statRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];

  const _end = useRef(Date.now() + 22 * 3600 * 1000);
  const _tilt = useRef({ tx: 0, ty: 0, txT: 0, tyT: 0 });
  const _autoTimer = useRef<NodeJS.Timeout | null>(null);

  // Setup count down timer
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Setup auto-slide banner
  const resetAuto = () => {
    if (_autoTimer.current) clearInterval(_autoTimer.current);
    _autoTimer.current = setInterval(() => {
      setSlide((s) => (s + 1) % 3);
      setDir(1);
    }, 6000);
  };

  useEffect(() => {
    resetAuto();
    return () => {
      if (_autoTimer.current) clearInterval(_autoTimer.current);
    };
  }, []);

  // Tilt and Parallax loops
  useEffect(() => {
    let tiltRaf: number;
    let plxRaf: number;

    const tiltLoop = () => {
      tiltRaf = requestAnimationFrame(tiltLoop);
      const t = _tilt.current;
      t.tx += (t.txT - t.tx) * 0.07;
      t.ty += (t.tyT - t.ty) * 0.07;
      const el = heroSecRef.current;
      if (el) {
        el.style.setProperty("--heroTilt", `rotateX(${t.ty.toFixed(3)}deg) rotateY(${t.tx.toFixed(3)}deg)`);
        el.style.setProperty("--heroPan", `translate(${(t.tx * 2.4).toFixed(2)}px, ${(-t.ty * 2.4).toFixed(2)}px)`);
      }
    };
    tiltLoop();

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
      cancelAnimationFrame(tiltRaf);
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

  // Slide content data
  const CDN = "https://mayanhvietnam.com";
  const slides = [
    {
      kicker: "Mirrorless APS-C · Giảm 12% hôm nay", 
      titleA: "Canon EOS", 
      titleB: "R50",
      tagline: "Nhỏ gọn. Mạnh mẽ. Sáng tạo không giới hạn — thân máy chỉ 375g với cảm biến 24.2MP và 4K không crop.",
      price: formatVND(17500000), 
      orig: formatVND(19900000), 
      discount: "-12%",
      buyHref: "/may-anh-canon-r50",
      expHref: "/may-anh-canon-r50", 
      expLabel: "Trải nghiệm 3D",
      image: `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
      alt: "Canon EOS R50",
      chips: [
        { label: "Cảm biến", value: "APS-C 24.2MP", left: "2%", top: "12%", delay: "0s" },
        { label: "Video", value: "4K 30p không crop", left: "68%", top: "6%", delay: "0.8s" },
        { label: "Trọng lượng", value: "Chỉ 375g", left: "72%", top: "74%", delay: "1.6s" },
      ],
    },
    {
      kicker: "Flycam · 4K 60fps · OcuSync 10km", 
      titleA: "DJI Mavic", 
      titleB: "Air 2",
      tagline: "Bầu trời trong tầm tay — cảm biến 1/2 inch 48MP, bay 34 phút và truyền hình ảnh xa 10km.",
      price: formatVND(17900000), 
      orig: formatVND(19900000), 
      discount: "-10%",
      buyHref: "/flycam-dji",
      expHref: "/flycam-dji", 
      expLabel: "Trải nghiệm 3D",
      image: `${CDN}/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg`,
      alt: "DJI Mavic Air 2",
      chips: [
        { label: "Cảm biến", value: "1/2\" CMOS 48MP", left: "2%", top: "14%", delay: "0s" },
        { label: "Thời gian bay", value: "34 phút", left: "70%", top: "8%", delay: "0.8s" },
        { label: "Truyền sóng", value: "OcuSync 2.0 · 10km", left: "64%", top: "76%", delay: "1.6s" },
      ],
    },
    {
      kicker: "Full-frame 33MP · BIONZ XR", 
      titleA: "Sony Alpha", 
      titleB: "A7 IV",
      tagline: "Chuyên nghiệp. Đỉnh cao. Toàn diện — Eye AF thời gian thực và video 4K 60p 10-bit.",
      price: formatVND(47500000), 
      orig: "", 
      discount: "Chính hãng",
      buyHref: "/san-pham#may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang",
      expHref: "/danh-muc#may-anh", 
      expLabel: "Xem dòng máy ảnh",
      image: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
      alt: "Sony Alpha A7 IV",
      chips: [
        { label: "Cảm biến", value: "Full-frame 33MP", left: "2%", top: "12%", delay: "0s" },
        { label: "Lấy nét", value: "759 điểm AF", left: "70%", top: "8%", delay: "0.8s" },
        { label: "Video", value: "4K 60p 10-bit", left: "68%", top: "76%", delay: "1.6s" },
      ],
    },
  ];

  const s = slides[slide];

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
    { subtitle: "Máy ảnh", title: "Top Máy Ảnh", href: "/danh-muc#may-anh", items: getByCategory("may-anh").slice(0, 4).map(getProductCard) },
    { 
      subtitle: "Ống kính", 
      title: "Ống Kính Nổi Bật", 
      href: "/danh-muc#ong-kinh", 
      items: [
        ...getByCategory("ong-kinh").slice(0, 3).map(getProductCard), 
        getTile({ kicker: "243+ ống kính", title: "Đủ mọi hệ ngàm — RF, E, Z, X", sub: "Từ nifty-fifty đến tele flagship, chính hãng bảo hành 12 tháng.", cta: "Xem tất cả", href: "/danh-muc#ong-kinh" }) 
      ] 
    },
    { 
      subtitle: "Flycam", 
      title: "Flycam & Drone", 
      href: "/danh-muc#flycam", 
      items: [
        ...getByCategory("flycam").slice(0, 3).map(getProductCard), 
        getTile({ kicker: "Trải nghiệm 3D", title: "Bay thử DJI Mavic Air 2 ngay trên màn hình", sub: "Cuộn để xoay mô hình 3D và khám phá thông số bay.", cta: "Khám phá", href: "/flycam-dji" }) 
      ] 
    },
    { 
      subtitle: "Camera hành động", 
      title: "Action Camera", 
      href: "/danh-muc#action-camera", 
      items: [
        ...getByCategory("action-camera").slice(0, 2).map(getProductCard), 
        getTile({ kicker: "Mới · Insta360", title: "ONE RS 1-Inch 360 — cảm biến kép Leica", sub: "Video đua xe kịch tính + mô hình 3D xoay theo từng cú lăn chuột.", cta: "Trải nghiệm ngay", href: "/action-camera-insta360" }), 
        getTile({ kicker: "67+ sản phẩm", title: "GoPro · DJI Osmo · Insta360", sub: "Đủ phụ kiện gậy, mount, pin cho mọi chuyến đi.", cta: "Xem tất cả", href: "/danh-muc#action-camera" }) 
      ] 
    },
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

  const heroMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = heroSecRef.current;
    if (!el) return;
    const rct = el.getBoundingClientRect();
    const nx = ((e.clientX - rct.left) / rct.width - 0.5) * 2;
    const ny = ((e.clientY - rct.top) / rct.height - 0.5) * 2;
    _tilt.current.txT = nx * 7;
    _tilt.current.tyT = -ny * 5;
  };

  const heroMouseOut = () => {
    _tilt.current.txT = 0;
    _tilt.current.tyT = 0;
  };

  const heroPrev = () => {
    resetAuto();
    setSlide((st) => (st + 2) % 3);
    setDir(-1);
  };

  const heroNext = () => {
    resetAuto();
    setSlide((st) => (st + 1) % 3);
    setDir(1);
  };

  const heroDots = slides.map((_, i) => ({
    label: `Banner ${i + 1}`,
    isActive: i === slide,
    width: i === slide ? "34px" : "10px",
    bg: i === slide ? "#eee9e2" : "#dcd8d2",
    go: () => {
      resetAuto();
      setSlide(i);
      setDir(i >= slide ? 1 : -1);
    },
  }));

  const heroAnimName = dir < 0 ? "heroInL" : "heroInR";
  const visAnimName = dir < 0 ? "visInL" : "visInR";

  return (
    <div className="font-sans bg-[#fafaf8] text-[#16130f]">
      <SiteHeader active="home" />

      {/* ═══════════ HERO ═══════════ */}
      <section 
        ref={heroSecRef} 
        onMouseMove={heroMouse}
        onMouseLeave={heroMouseOut}
        style={{
          perspective: "1200px",
          background: "linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)",
          borderBottom: "1px solid #e9e6e1"
        }}
        className="relative overflow-hidden"
      >
        <div aria-hidden="true" className="absolute bottom-[-220px] left-[-140px] w-[520px] h-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(255,180,122,0.13),transparent_70%)] blur-[8px]" />

        <div className="relative max-w-[1280px] mx-auto px-8 py-[60px] pb-14 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center min-h-[520px]">
          {/* Left copy */}
          <div 
            key={`hero-${slide}`} 
            style={{ animation: `${heroAnimName} 0.75s cubic-bezier(0.22,1,0.36,1) both` }}
          >
            <div className="inline-flex items-center gap-2 border border-[rgba(255,106,0,0.35)] bg-[rgba(255,106,0,0.07)] rounded-full px-[15px] py-[7px] animate-[heroUp_0.6s_cubic-bezier(0.22,1,0.36,1)_0.02s_both]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] shadow-[0_0_10px_2px_rgba(255,106,0,0.55)]" />
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#c85200]">{s.kicker}</span>
            </div>
            
            <h1 className="mt-[22px] mb-0 text-[48px] md:text-[68px] leading-[0.95] font-light tracking-[-0.035em] text-[#16130f] text-wrap">
              {s.titleA} <span className="font-bold text-[#ff6a00] italic animate-[pulse_3s_ease-in-out_infinite]">{s.titleB}</span>
            </h1>
            
            <p className="mt-[18px] max-w-[500px] text-[15.5px] font-normal leading-[1.6] text-[#7a746c] tracking-[-0.005em]">
              {s.tagline}
            </p>

            <div className="mt-8 flex items-baseline gap-[14px]">
              <span className="text-[34px] font-extrabold text-[#ff6a00] tracking-[-0.02em]">{s.price}</span>
              {s.orig && (
                <>
                  <span className="text-[16px] text-[#a39d94] line-through font-medium">{s.orig}</span>
                  <span className="text-[12px] font-bold text-white bg-[#e2483d] px-[7px] py-[3px] rounded-[6px] tracking-[0.04em] shadow-[0_4px_10px_-2px_rgba(226,72,61,0.3)]">{s.discount}</span>
                </>
              )}
            </div>

            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <Link href={s.buyHref} className="h-[52px] px-8 rounded-2xl bg-[#16130f] text-white no-underline font-bold text-[14.5px] flex items-center justify-center transition-all hover:bg-[#ff6a00] hover:-translate-y-[2px] hover:shadow-[0_16px_32px_-12px_rgba(255,106,0,0.5)]">
                Mua ngay
              </Link>
              <Link href={s.expHref} className="h-[52px] px-7 rounded-2xl border border-[#dcd8d2] bg-white text-[#16130f] no-underline font-bold text-[14.5px] flex items-center justify-center transition-all hover:border-[#ff6a00] hover:text-[#ff6a00] hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-12px_rgba(255,106,0,0.3)]">
                {s.expLabel}
              </Link>
            </div>

            <div className="mt-10 border-t border-[#f1eee9] pt-[18px] flex items-center gap-[22px]">
              <span className="text-[12.5px] text-[#7a746c] flex items-center gap-[6px]"><span className="text-[#1a9e5c] font-bold">✓</span> Bảo hành 12 tháng</span>
              <span className="text-[12.5px] text-[#7a746c] flex items-center gap-[6px]"><span className="text-[#1a9e5c] font-bold">✓</span> Trả góp 0% qua thẻ</span>
              <span className="text-[12.5px] text-[#7a746c] flex items-center gap-[6px]"><span className="text-[#1a9e5c] font-bold">✓</span> Giao hỏa tốc toàn quốc</span>
            </div>
          </div>

          {/* Right visual */}
          <div 
            key={`vis-${slide}`}
            style={{ animation: `${visAnimName} 0.8s cubic-bezier(0.22,1,0.36,1) both`, perspective: "1200px" }}
            className="relative h-[460px]"
          >
            <div 
              style={{ transform: "var(--heroTilt, none)", transformStyle: "preserve-3d" }}
              className="absolute inset-0 will-change-transform transition-transform duration-200"
            >
              <div aria-hidden="true" className="absolute left-[50%] top-[50%] w-[420px] h-[420px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.14),transparent_72%)] animate-[glowPulse_5s_ease-in-out_infinite]" />
              <div aria-hidden="true" className="absolute left-[50%] top-[50%] w-[400px] h-[400px] translate-x-[-50%] translate-y-[-50%] rounded-full border border-dashed border-[rgba(255,106,0,0.35)] animate-[ringSpin_40s_linear_infinite]" />
              <div aria-hidden="true" className="absolute left-[50%] top-[50%] w-[330px] h-[330px] translate-x-[-50%] translate-y-[-50%] rounded-full border border-[#eee9e2]" />
              
              <div 
                style={{ transform: "translateZ(34px)", transformStyle: "preserve-3d" }}
                className="absolute left-[50%] top-[50%] w-[340px] h-[340px] ml-[-170px] mt-[-170px]"
              >
                <div className="w-full h-full animate-[heroFloat_5.5s_ease-in-out_infinite]">
                  <img 
                    ref={heroImgRef} 
                    src={s.image} 
                    alt={s.alt} 
                    className="w-full h-full object-contain rounded-3xl mix-blend-multiply filter drop-shadow-[0_30px_40px_rgba(22,19,15,0.22)]" 
                  />
                </div>
              </div>
              
              <div aria-hidden="true" className="absolute left-[50%] bottom-4 w-[240px] h-[26px] translate-x-[-50%] rounded-full bg-[radial-gradient(closest-side,rgba(22,19,15,0.18),transparent_75%)] blur-[4px]" />
              
              {s.chips.map((chip, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    left: chip.left,
                    top: chip.top,
                    transform: "translateZ(58px) var(--heroPan, translate(0px, 0px))",
                    transformStyle: "preserve-3d"
                  }}
                  className="transition-transform duration-200"
                >
                  <div
                    style={{ animationDelay: chip.delay }}
                    className="bg-[rgba(255,255,255,0.92)] backdrop-blur-[8px] border border-[#e9e6e1] rounded-xl p-[9px_14px] shadow-[0_14px_30px_-14px_rgba(22,19,15,0.25)] animate-[chipFloat_4.5s_ease-in-out_infinite] transition-all hover:border-[rgba(255,106,0,0.5)] hover:scale-[1.06] hover:shadow-[0_18px_38px_-14px_rgba(255,106,0,0.4)]"
                  >
                    <p className="m-0 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#ff6a00]">{chip.label}</p>
                    <p className="m-2-0-0 text-[13.5px] font-bold text-[#16130f]">{chip.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero controls */}
        <div className="relative max-w-[1280px] mx-auto px-8 pb-[26px] flex items-center gap-[14px]">
          <button 
            type="button" 
            aria-label="Banner trước" 
            onClick={heroPrev}
            className="w-[42px] h-[42px] rounded-full border border-[#dcd8d2] bg-white text-[#7a746c] cursor-pointer flex items-center justify-center transition-all hover:border-[#ff6a00] hover:bg-[#ff6a00] hover:text-white hover:scale-[1.1] hover:shadow-[0_12px_26px_-8px_rgba(255,106,0,0.55)] active:scale-[0.94]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
          </button>
          <button 
            type="button" 
            aria-label="Banner sau" 
            onClick={heroNext}
            className="w-[42px] h-[42px] rounded-full border border-[#dcd8d2] bg-white text-[#7a746c] cursor-pointer flex items-center justify-center transition-all hover:border-[#ff6a00] hover:bg-[#ff6a00] hover:text-white hover:scale-[1.1] hover:shadow-[0_12px_26px_-8px_rgba(255,106,0,0.55)] active:scale-[0.94]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
          </button>
          <div className="flex items-center gap-2 ml-1.5">
            {heroDots.map((dot, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={dot.label}
                onClick={dot.go}
                style={{ width: dot.width, background: dot.bg }}
                className="relative h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-350"
              >
                {dot.isActive && (
                  <span 
                    key={`bar-${slide}`} 
                    className="absolute inset-0 rounded-full bg-[#ff6a00] animate-[barGrow_6s_linear_both]" 
                  />
                )}
              </button>
            ))}
          </div>
          <p className="m-0 ml-auto font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#a39d94]">
            {`0${slide + 1} / 03`}
          </p>
        </div>
      </section>

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
      <SiteFooter />
    </div>
  );
}
