"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ThreeDStage from "@/components/ThreeDStage";
import { products, getBySlug, formatVND } from "@/lib/products";

export default function CanonR50ShowcasePage() {
  const [color, setColor] = useState("#1c1c1c");
  const [colorName, setColorName] = useState("Đen");
  const [specGroups, setSpecGroups] = useState<any[]>([]);
  const [fbFlag, setFbFlag] = useState(false);
  const [mode, setMode] = useState("wait"); // 'wait', '3d', 'fb'

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const specsTitleRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoCapRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const colorsRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLImageElement>(null);
  const buyBarRef = useRef<HTMLDivElement>(null);

  const co0 = useRef<HTMLDivElement>(null);
  const co1 = useRef<HTMLDivElement>(null);
  const co2 = useRef<HTMLDivElement>(null);
  const co3 = useRef<HTMLDivElement>(null);

  const [pose, setPose] = useState<any>({
    x: 1.7,
    y: 0.05,
    rotY: 0,
    rotX: 0,
    scale: 0.72,
    opacity: 1,
    idle: 1,
    ground: 1,
  });

  const pScroll = useRef(0);
  const worldW = useRef(8);

  useEffect(() => {
    const r50 = getBySlug("canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang");
    setSpecGroups(r50 ? r50.specs || [] : []);

    // Set fallback timeout
    const fallbackTimer = setTimeout(() => {
      setFbFlag(true);
    }, 14000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const c = containerRef.current;
      if (!c) return;

      const rect = c.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = Math.min(1, Math.max(0, -rect.top / (rect.height - vh)));
      pScroll.current += (raw - pScroll.current) * 0.05;
      const p = pScroll.current;

      const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
      const r = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
      const sm = (t: number) => t * t * (3 - 2 * t);
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      // Hero animation
      const hero = heroRef.current;
      if (hero) {
        const op = 1 - r(p, 0, 0.14);
        hero.style.opacity = String(op);
        hero.style.transform = `translateY(${-80 * r(p, 0, 0.14)}px)`;
        hero.style.pointerEvents = op > 0.5 ? "auto" : "none";
      }

      // Specs title animation
      const st = specsTitleRef.current;
      if (st) {
        st.style.opacity = String(Math.min(r(p, 0.26, 0.32), 1 - r(p, 0.46, 0.52)));
      }

      // Callouts animation
      const cos = [co0, co1, co2, co3];
      cos.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        const start = 0.28 + i * 0.02;
        el.style.opacity = String(Math.min(r(p, start, start + 0.06), 1 - r(p, 0.46, 0.52)));
        const dir = i % 2 === 0 ? -1 : 1;
        el.style.transform = `translateX(${dir * 40 * (1 - r(p, start, start + 0.08))}px)`;
      });

      // Colors control animation
      const cp = colorsRef.current;
      if (cp) {
        const op = 1 - r(p, 0.46, 0.54);
        cp.style.opacity = String(op);
        cp.style.pointerEvents = op > 0.4 ? "auto" : "none";
      }

      // Flash animation
      const fl = flashRef.current;
      if (fl) {
        fl.style.opacity = String(Math.min(r(p, 0.52, 0.555), 1 - r(p, 0.555, 0.63)));
      }

      // Captured Photo animation
      const ph = photoRef.current;
      if (ph) {
        ph.style.opacity = String(r(p, 0.545, 0.6));
        ph.style.transform = `scale(${lerp(0.32, 1, sm(r(p, 0.56, 0.86)))})`;
        ph.style.borderRadius = `${lerp(28, 0, r(p, 0.7, 0.86))}px`;
      }

      const pc = photoCapRef.current;
      if (pc) {
        pc.style.opacity = String(r(p, 0.88, 0.95));
        pc.style.transform = `translateY(${lerp(40, 0, r(p, 0.88, 0.95))}px)`;
      }

      // 3D parameters calculation
      const idle = 1 - sm(r(p, 0.04, 0.24));
      const move = sm(r(p, 0.05, 0.3));
      const spin = sm(r(p, 0.3, 0.52)) * Math.PI * 2;
      const bump = Math.sin(Math.PI * r(p, 0.5, 0.6));
      const fade = 1 - sm(r(p, 0.62, 0.78));

      // Align model position with the frame element on screen
      const frame = document.getElementById("hero-frame-cam");
      let fx = 1.7, fy = 0.05, heroScale = 0.72;
      if (frame) {
        const fr = frame.getBoundingClientRect();
        if (fr.width > 1) {
          const worldH = 4.513; // 2·tan(fov/2)·camDist
          const wW = worldH * (window.innerWidth / window.innerHeight);
          fx = (((fr.left + fr.width / 2) - (window.innerWidth / 2)) / window.innerWidth) * wW;
          fy = -(((fr.top + fr.height / 2) - (window.innerHeight / 2)) / window.innerHeight) * worldH;
          heroScale = ((fr.height / window.innerHeight) * worldH * 0.5) / 2.4;
          worldW.current = wW;
        }
      }

      const scale = lerp(heroScale, 1.15, move) * (1 + bump * 0.25) * lerp(0.55, 1, fade);
      const back = sm(r(p, 0.9, 0.975));

      // Set new pose
      setPose({
        x: lerp(lerp(fx, 0, move), worldW.current * 0.28, back),
        y: lerp(lerp(fy, 0.15, move), 0.1, back),
        rotY: spin + back * 0.6,
        rotX: 0,
        scale: lerp(scale, 0.5, back),
        opacity: Math.max(fade, back),
        idle: Math.max(idle * 0.5, back * 0.8),
        ground: 1 - back,
      });

      // Fallback styling
      const img = fallbackRef.current;
      if (img && fbFlag) {
        img.style.opacity = String(fade);
        img.style.transform = `translateX(${lerp(24, 0, move)}vw) translateY(${Math.sin(Date.now() / 800) * 6 * idle}px) rotate(${Math.sin(spin) * 5}deg) scale(${scale * 0.9})`;
      }

      // Sticky buy bar show/hide
      const bar = buyBarRef.current;
      if (bar) {
        const show = raw > 0.985 || rect.bottom < vh * 0.6;
        bar.style.transform = show ? "translateY(0)" : "translateY(110%)";
      }
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, [fbFlag]);

  const onReady = () => setMode("3d");
  const onError = () => { setFbFlag(true); setMode("fb"); };

  useEffect(() => {
    if (fbFlag) {
      setMode("fb");
    }
  }, [fbFlag]);

  return (
    <div className="font-sans bg-[#fafaf8] text-[#16130f]">
      <SiteHeader active="may-anh" />

      {/* ═══════════ SCROLL EXPERIENCE (520vh) ═══════════ */}
      <div ref={containerRef} className="relative h-[520vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-white to-[#f6f4f0]">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgba(22,19,15,0.05)_1px,transparent_1px)] bg-[size:26px_26px]" />
          <div aria-hidden="true" className="absolute top-[-200px] right-[-140px] w-[620px] h-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.13),transparent_70%)] blur-[12px] animate-[glowPulse_6s_ease-in-out_infinite]" />

          {/* Layer 1 (back): captured 4K photo */}
          <div 
            ref={photoRef} 
            className="absolute inset-0 z-5 overflow-hidden opacity-0 scale-[0.32] rounded-[28px] will-change-transform"
          >
            <img src="assets/images/pavel-s-esYrpYZ_5JI-unsplash.jpg" alt="Landscape shot by Canon R50" className="absolute inset-0 w-full h-full object-cover" />
            <div 
              ref={photoCapRef} 
              className="absolute left-0 right-0 bottom-0 z-10 bg-gradient-to-t from-[rgba(10,8,6,0.82)] to-transparent pt-32 px-6 pb-[60px] text-center opacity-0 translate-y-10"
            >
              <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff8a3d]">Chụp bằng Canon EOS R50</p>
              <h2 className="mt-3 mb-0 text-[46px] font-extralight tracking-[-0.02em] text-white">Sắc nét đến từng chi tiết nhỏ nhất</h2>
              <p className="mt-3 mb-0 text-[14.5px] font-light leading-[1.65] text-white/70 max-w-[520px] mx-auto">
                Cảm biến 24.2MP + DIGIC X — minh chứng cho khả năng chụp ảnh sắc nét, màu sắc chân thực vượt trội.
              </p>
            </div>
          </div>

          {/* Layer 2: 3D stage */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {mode !== "fb" && (
              <ThreeDStage
                src="assets/models/canon-r50.glb"
                colorParts="body,paint,frame,grip,leather"
                fit="2.4"
                exposure="1.05"
                color={color}
                pose={pose}
                onReady={onReady}
                onError={onError}
                style={{ width: "100%", height: "100%" }}
              />
            )}
            <img
              ref={fallbackRef}
              src="https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg"
              alt="Canon EOS R50"
              style={{ display: mode === "fb" ? "block" : "none" }}
              className="absolute left-[50%] top-[50%] w-[430px] h-[430px] ml-[-215px] mt-[-215px] object-contain mix-blend-multiply filter drop-shadow-[0_34px_44px_rgba(22,19,15,0.24)] will-change-transform"
            />
          </div>

          {/* Layer 3: hero overlay */}
          <div ref={heroRef} className="absolute inset-0 z-20 flex items-center will-change-transform">
            <div className="w-full max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="pointer-events-auto">
                <div className="inline-flex items-center gap-2 border border-[rgba(255,106,0,0.35)] bg-[rgba(255,106,0,0.07)] backdrop-blur-[6px] rounded-full px-[15px] py-[7px]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2.2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path></svg>
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#c85200]">Giảm 12% hôm nay · Kèm lens 18-45mm</span>
                </div>
                <h1 className="mt-6 mb-0 text-[76px] leading-[1.02] font-extralight tracking-[-0.025em] text-[#16130f]">
                  Canon EOS <span className="font-bold text-[#ff6a00]">R50</span>
                </h1>
                <p className="mt-5 max-w-[420px] text-[18px] font-light leading-[1.6] text-[#7a746c]">
                  Nhỏ gọn. Mạnh mẽ. Sáng tạo không giới hạn — thân máy 375g, cảm biến 24.2MP, quay 4K không crop.
                </p>
                <div className="flex items-baseline gap-3.5 mt-7">
                  <span className="text-[32px] font-medium tracking-[-0.01em]">17.500.000đ</span>
                  <span className="text-[17px] text-[#a39d94] line-through">19.900.000đ</span>
                </div>
                <p className="flex items-center gap-2 mt-[30px] text-[14px] text-[#7a746c]">
                  <svg className="animate-[bounceDown_1.6s_ease-in-out_infinite]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2.4"><path d="m6 9 6 6 6-6"></path></svg>
                  Cuộn xuống để khám phá trải nghiệm 3D
                </p>
              </div>
              
              <div id="hero-frame-cam" className="relative aspect-square max-h-[62vh] hidden lg:block">
                <div className="absolute inset-0 rounded-[28px] border border-[#e9e6e1] bg-white/35 backdrop-blur-[2px]" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 border border-[rgba(255,106,0,0.4)] bg-white/75 backdrop-blur-[6px] rounded-full px-3 py-1.8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] shadow-[0_0_9px_2px_rgba(255,106,0,0.55)]" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c85200]">Xem trực tiếp 3D</span>
                </div>
                <div className="absolute right-5 bottom-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#a39d94]">Tự động xoay — 360°</div>
                <div className="absolute left-[50%] top-[50%] w-[300px] h-[300px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.12),transparent_72%)] animate-[glowPulse_5s_ease-in-out_infinite]" />
                <div className="absolute left-[50%] top-[50%] w-[340px] h-[340px] ml-[-170px] mt-[-170px] rounded-full border border-dashed border-[rgba(255,106,0,0.35)] animate-[ringSpin_40s_linear_infinite]" />
              </div>
            </div>
          </div>

          {/* Layer 3b: specs phase title */}
          <div ref={specsTitleRef} className="absolute left-0 right-0 top-24 z-20 text-center pointer-events-none opacity-0">
            <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6a00]">Thông số kỹ thuật</p>
            <h2 className="mt-2.5 mb-0 text-[40px] font-extralight tracking-[-0.02em] text-[#16130f]">Phô diễn mọi góc cạnh</h2>
          </div>

          {/* Spec callouts */}
          <div className="absolute inset-0 z-20 flex items-center justify-between px-16 pointer-events-none">
            <div className="flex flex-col gap-20">
              <div ref={co0} className="flex items-center opacity-0 will-change-transform">
                <div className="max-w-[210px] border border-[#e9e6e1] bg-white/88 backdrop-blur-[8px] rounded-xl p-[13px_17px] shadow-[0_18px_40px_-18px_rgba(22,19,15,0.2)]">
                  <p className="m-0 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#ff6a00]">Sensor</p>
                  <p className="mt-1 mb-0 text-[14.5px] font-bold text-[#16130f]">Cảm biến</p>
                  <p className="mt-[2px] mb-0 text-[12.5px] text-[#7a746c]">APS-C 24.2MP CMOS</p>
                </div>
                <div className="flex items-center">
                  <div className="h-[1px] w-[110px] bg-gradient-to-r from-[rgba(255,106,0,0.7)] to-[rgba(255,106,0,0.15)]" />
                  <span className="w-1.8 h-1.8 rounded-full bg-[#ff6a00] shadow-[0_0_10px_3px_rgba(255,106,0,0.45)]" />
                </div>
              </div>

              <div ref={co2} className="flex items-center opacity-0 will-change-transform">
                <div className="max-w-[210px] border border-[#e9e6e1] bg-white/88 backdrop-blur-[8px] rounded-xl p-[13px_17px] shadow-[0_18px_40px_-18px_rgba(22,19,15,0.2)]">
                  <p className="m-0 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#ff6a00]">Auto Focus</p>
                  <p className="mt-1 mb-0 text-[14.5px] font-bold text-[#16130f]">Lấy nét AF</p>
                  <p className="mt-[2px] mb-0 text-[12.5px] text-[#7a746c]">Dual Pixel CMOS AF II</p>
                </div>
                <div className="flex items-center">
                  <div className="h-[1px] w-[130px] bg-gradient-to-r from-[rgba(255,106,0,0.7)] to-[rgba(255,106,0,0.15)]" />
                  <span className="w-1.8 h-1.8 rounded-full bg-[#ff6a00] shadow-[0_0_10px_3px_rgba(255,106,0,0.45)]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-20">
              <div ref={co1} className="flex items-center flex-row-reverse opacity-0 will-change-transform">
                <div className="max-w-[210px] border border-[#e9e6e1] bg-white/88 backdrop-blur-[8px] rounded-xl p-[13px_17px] shadow-[0_18px_40px_-18px_rgba(22,19,15,0.2)]">
                  <p className="m-0 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#ff6a00]">Processor</p>
                  <p className="mt-1 mb-0 text-[14.5px] font-bold text-[#16130f]">Bộ xử lý</p>
                  <p className="mt-[2px] mb-0 text-[12.5px] text-[#7a746c]">DIGIC X cực mạnh</p>
                </div>
                <div className="flex items-center flex-row-reverse">
                  <div className="h-[1px] w-[120px] bg-gradient-to-l from-[rgba(255,106,0,0.7)] to-[rgba(255,106,0,0.15)]" />
                  <span className="w-1.8 h-1.8 rounded-full bg-[#ff6a00] shadow-[0_0_10px_3px_rgba(255,106,0,0.45)]" />
                </div>
              </div>

              <div ref={co3} className="flex items-center flex-row-reverse opacity-0 will-change-transform">
                <div className="max-w-[210px] border border-[#e9e6e1] bg-white/88 backdrop-blur-[8px] rounded-xl p-[13px_17px] shadow-[0_18px_40px_-18px_rgba(22,19,15,0.2)]">
                  <p className="m-0 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#ff6a00]">Design</p>
                  <p className="mt-1 mb-0 text-[14.5px] font-bold text-[#16130f]">Thiết kế</p>
                  <p className="mt-[2px] mb-0 text-[12.5px] text-[#7a746c]">Nhỏ gọn chỉ 375g</p>
                </div>
                <div className="flex items-center flex-row-reverse">
                  <div className="h-[1px] w-[140px] bg-gradient-to-l from-[rgba(255,106,0,0.7)] to-[rgba(255,106,0,0.15)]" />
                  <span className="w-1.8 h-1.8 rounded-full bg-[#ff6a00] shadow-[0_0_10px_3px_rgba(255,106,0,0.45)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Color pickers */}
          <div ref={colorsRef} className="absolute left-8 bottom-10 z-20 pointer-events-auto bg-white/80 backdrop-blur-[10px] border border-[#e9e6e1] rounded-2xl p-4 flex flex-col gap-3 shadow-[0_14px_30px_-12px_rgba(22,19,15,0.15)]">
            <div>
              <p className="m-0 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#ff6a00]">Màu sắc thân máy</p>
              <p className="mt-[2px] mb-0 text-[13.5px] font-semibold text-[#16130f]">{colorName}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button 
                type="button" 
                aria-label="Màu đen" 
                onClick={() => { setColor("#1c1c1c"); setColorName("Đen"); }}
                style={{ borderColor: color === "#1c1c1c" ? "#ff6a00" : "#e9e6e1" }}
                className="w-8 h-8 rounded-full bg-[#1c1c1c] border-2 cursor-pointer transition-all hover:scale-[1.1]"
              />
              <button 
                type="button" 
                aria-label="Màu trắng" 
                onClick={() => { setColor("#f0ede8"); setColorName("Trắng"); }}
                style={{ borderColor: color === "#f0ede8" ? "#ff6a00" : "#e9e6e1" }}
                className="w-8 h-8 rounded-full bg-[#f0ede8] border-2 cursor-pointer transition-all hover:scale-[1.1]"
              />
            </div>
          </div>

          {/* Flash screen effect */}
          <div ref={flashRef} className="absolute inset-0 bg-white pointer-events-none z-30 opacity-0" />
        </div>
      </div>

      {/* ═══════════ DETAILED INFO & SPECS (Below scroll area) ═══════════ */}
      <section className="relative z-20 max-w-[1280px] mx-auto px-8 pt-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start bg-[#fafaf8]">
        {/* Specs */}
        <div>
          <h2 className="m-0 text-[32px] font-extralight tracking-[-0.025em]">Thông số kỹ thuật chi tiết</h2>
          <div className="mt-8 flex flex-col gap-6">
            {specGroups.map((group, idx) => (
              <div key={idx} className="border border-[#e9e6e1] bg-white rounded-2xl overflow-hidden">
                <div className="bg-[#f7f5f1] border-b border-[#e9e6e1] px-5 py-3 font-semibold text-[13.5px] uppercase tracking-[0.08em] text-[#7a746c]">
                  {group.group}
                </div>
                <div className="flex flex-col">
                  {group.items.map((item: any, iIdx: number) => (
                    <div key={iIdx} className="grid grid-cols-[180px_1fr] gap-4 px-5 py-3 border-t border-[#f1eee9] first:border-none text-[13.5px]">
                      <span className="font-semibold text-[#7a746c]">{item.label}</span>
                      <span className="text-[#16130f]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights sidebar */}
        <div className="border border-[#e9e6e1] bg-white rounded-3xl p-7 sticky top-[132px]">
          <h3 className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#ff6a00]">Trong hộp gồm có</h3>
          <div className="flex flex-col gap-3 mt-4 text-[13.5px]">
            {["1× Thân máy Canon EOS R50", "1× Lens RF-S 18-45mm IS STM", "1× Pin LP-E17", "1× Sạc LC-E17", "1× Dây đeo", "Bao đựng + Thẻ bảo hành"].map((inc, idx) => (
              <div key={idx} className="flex items-center gap-3 border-t border-[#f1eee9] first:border-none pt-3 first:pt-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] shrink-0" />
                <span className="text-[#5f5a53]">{inc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-[96px]" />
      <SiteFooter />

      {/* Sticky buy bar */}
      <div ref={buyBarRef} className="fixed left-0 right-0 bottom-0 z-50 translate-y-[110%] transition-transform duration-400 cubic-bezier(0.22,1,0.36,1)">
        <div className="max-w-[1080px] mx-auto mb-[18px] px-6 py-3.5 border border-[#e9e6e1] bg-[rgba(255,255,255,0.92)] backdrop-blur-[14px] rounded-2xl shadow-[0_24px_60px_-20px_rgba(22,19,15,0.3)] flex items-center gap-[18px]">
          <span className="w-2.2 height-2.2 rounded-full bg-[#1a9e5c] shadow-[0_0_8px_2px_rgba(26,158,92,0.4)] shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[14.5px] font-bold text-[#16130f] truncate">Canon EOS R50 + RF-S 18-45mm — Chính hãng</p>
            <p className="mt-[1px] mb-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[#a39d94]">Còn hàng · Bảo hành 12 tháng</p>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-[19px] font-bold text-[#ff6a00]">17.500.000đ</span>
            <span className="text-[13px] text-[#a39d94] line-through">19.900.000đ</span>
          </div>
          <button 
            type="button" 
            onClick={() => alert("Cảm ơn bạn! Canon EOS R50 đã được thêm vào giỏ hàng.")}
            className="flex items-center justify-center h-11 px-6 rounded-xl bg-[#ff6a00] text-white border-none text-[14px] font-bold cursor-pointer shadow-[0_12px_26px_-10px_rgba(255,106,0,0.6)] transition-all hover:bg-[#ea6100] hover:-translate-y-[1px]"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
