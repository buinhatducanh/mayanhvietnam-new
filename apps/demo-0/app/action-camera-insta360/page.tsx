"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ThreeDStage from "@/components/ThreeDStage";
import { getBySlug, formatVND } from "@/lib/products";

export default function ActionCameraShowcasePage() {
  const [specGroups, setSpecGroups] = useState<any[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [fbFlag, setFbFlag] = useState(false);
  const [mode, setMode] = useState("wait"); // 'wait', '3d', 'fb'

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const noVideoRef = useRef<HTMLDivElement>(null);
  const noModelRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const barTopRef = useRef<HTMLDivElement>(null);
  const barBotRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const buyBarRef = useRef<HTMLDivElement>(null);

  const seg0 = useRef<HTMLDivElement>(null);
  const seg1 = useRef<HTMLDivElement>(null);
  const seg2 = useRef<HTMLDivElement>(null);
  const seg3 = useRef<HTMLDivElement>(null);

  const poseRef = useRef({
    x: 0,
    y: -1.4,
    rotY: 0.5,
    rotX: 0.02,
    scale: 0.7,
    opacity: 0,
    idle: 1,
  });

  const pScroll = useRef(0);
  const durationRef = useRef(0);

  useEffect(() => {
    const cam = getBySlug("insta360-one-rs-1-inch-360-edition");
    if (cam) {
      setSpecGroups(cam.specs || []);
      setHighlights(cam.highlights || []);
    }

    const fallbackTimer = setTimeout(() => {
      const stageEl = document.querySelector('glb-stage') as any;
      if (!stageEl || !stageEl.ready) {
        console.warn('[action-camera] 3D model failed to load, showing fallback');
        setFbFlag(true);
      }
    }, 8000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    let rafId: number;

    // Fallback duration if video never loads (5s race clip)
    const durationTimeout = setTimeout(() => {
      if (!durationRef.current) {
        durationRef.current = 5;
      }
    }, 3000);

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const c = containerRef.current;
      if (!c) return;

      const rect = c.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(1, rect.height - vh);
      const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
      pScroll.current += (raw - pScroll.current) * 0.08;
      const p = pScroll.current;

      const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
      const r = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
      const sm = (t: number) => t * t * (3 - 2 * t);
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      // Video scrub logic
      const v = videoRef.current;
      if (v && !durationRef.current) {
        let d = v.duration;
        if (!d || !isFinite(d)) {
          d = (v.seekable && v.seekable.length) ? v.seekable.end(v.seekable.length - 1) : 0;
        }
        if (d && isFinite(d)) durationRef.current = d;
      }

      if (v && durationRef.current) {
        const clipStart = 0; // default start
        const clipLen = Math.max(2, durationRef.current);
        const clipEnd = Math.min(durationRef.current - 0.06, clipStart + clipLen);
        const target = Math.min(clipEnd, clipStart + p * (clipEnd - clipStart));
        
        if (!v.seeking && Math.abs((v.currentTime || 0) - target) > 0.02 && v.readyState >= 1) {
          try {
            v.currentTime = target;
          } catch (e) {}
        }

        if (tcRef.current) {
          const t = v.currentTime || 0;
          const mm = String(Math.floor(t / 60)).padStart(2, "0");
          const ss = String(Math.floor(t % 60)).padStart(2, "0");
          const ff = String(Math.floor((t % 1) * 30)).padStart(2, "0");
          tcRef.current.textContent = `${mm}:${ss}:${ff}`;
        }
      }

      if (tlRef.current) {
        tlRef.current.style.width = `${(p * 100).toFixed(2)}%`;
      }

      // Hero overlay
      const hero = heroRef.current;
      if (hero) {
        const op = 1 - r(p, 0.02, 0.12);
        hero.style.opacity = String(op);
        hero.style.transform = `translateY(${-70 * r(p, 0.02, 0.12)}px)`;
        hero.style.pointerEvents = op > 0.5 ? "auto" : "none";
      }

      // Segments
      const windows = [
        [0.14, 0.30], [0.30, 0.46], [0.46, 0.62], [0.62, 0.78],
      ];
      const segs = [seg0, seg1, seg2, seg3];
      segs.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        const [a, b] = windows[i];
        const op = Math.min(r(p, a, a + 0.035), 1 - r(p, b - 0.03, b));
        el.style.opacity = String(op);
        el.style.transform = `translateY(calc(-50% + ${lerp(36, -20, r(p, a, b))}px))`;
      });

      // Final CTA + dim
      const fin = finalRef.current;
      if (fin) {
        const op = r(p, 0.82, 0.9);
        fin.style.opacity = String(op);
        fin.style.transform = `translateY(${lerp(46, 0, sm(r(p, 0.82, 0.92)))}px)`;
        fin.style.pointerEvents = op > 0.5 ? "auto" : "none";
      }

      const dim = dimRef.current;
      if (dim) {
        dim.style.opacity = String(0.65 * r(p, 0.8, 0.9));
      }

      // Letterbox cinematic bar widths
      const cine = Math.min(r(p, 0.08, 0.16), 1 - r(p, 0.84, 0.92));
      const bt = barTopRef.current, bb = barBotRef.current;
      if (bt) bt.style.height = `${(6.2 * cine).toFixed(2)}vh`;
      if (bb) bb.style.height = `${(6.2 * cine).toFixed(2)}vh`;

      const vg = vignetteRef.current;
      if (vg) vg.style.opacity = String((0.85 * cine).toFixed(3));

      const flare = flareRef.current;
      if (flare) {
        const bounds = [0.14, 0.3, 0.46, 0.62, 0.78];
        let k = 0;
        for (const b of bounds) k = Math.max(k, 1 - Math.abs(p - b) / 0.022);
        k = Math.max(0, k) * cine;
        flare.style.opacity = String((k * 0.9).toFixed(3));
        flare.style.transform = `translateY(-50%) scaleX(${(0.55 + k * 0.55).toFixed(3)}) rotate(-0.4deg)`;
      }

      // Products studio glow
      const glow = glowRef.current;
      if (glow) {
        const gEntry = sm(r(p, 0.02, 0.14));
        const gExit = 1 - sm(r(p, 0.8, 0.9));
        glow.style.opacity = String((Math.min(gEntry * 1.4, gExit) * 0.95).toFixed(3));
        glow.style.transform = `translate(-50%, -50%) scale(${(0.85 + 0.15 * gEntry).toFixed(3)})`;
      }

      // 3D staging poses
      let seg = -1;
      for (let i = 0; i < windows.length; i++) {
        if (p >= windows[i][0] && p < windows[i][1]) {
          seg = i;
          break;
        }
      }
      if (p >= windows[windows.length - 1][1]) seg = windows.length;

      const entry = sm(r(p, 0.02, 0.14));
      const finPose = sm(r(p, 0.8, 0.9));
      const poses = [
        { rotY: 0.5, rotX: 0.02, s: 1.0 },
        { rotY: 0.5 + Math.PI * 0.85, rotX: 0.1, s: 1.05 },
        { rotY: 0.5 + Math.PI * 1.7, rotX: -0.08, s: 1.0 },
        { rotY: 0.5 + Math.PI * 2.55, rotX: 0.12, s: 1.05 },
        { rotY: 0.5 + Math.PI * 3.4, rotX: 0, s: 0.98 },
        { rotY: 0.5 + Math.PI * 4.25, rotX: -0.05, s: 0.9 },
      ];
      const activePose = poses[Math.max(0, seg + 1)];

      const newPose = {
        x: 0,
        y: lerp(-1.4, 0.05, entry) - finPose * 0.08,
        rotY: lerp(activePose.rotY, 0.5 + Math.PI * 4.6, finPose),
        rotX: lerp(activePose.rotX, 0.05, finPose),
        scale: lerp(0.7, 1.06, entry) * lerp(activePose.s, 0.94, finPose),
        opacity: Math.min(entry * 1.4, 1),
        idle: seg >= 0 ? lerp(0.35, 1, finPose) : 1,
      };
      poseRef.current = newPose;
      const stageEl = document.querySelector('glb-stage') as any;
      if (stageEl?.ready) stageEl.setPose(newPose);

      // Sticky buy bar show/hide
      const bar = buyBarRef.current;
      if (bar) {
        const show = raw > 0.985 || rect.bottom < vh * 0.6;
        bar.style.transform = show ? "translateY(0)" : "translateY(110%)";
      }
    };

    tick();
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(durationTimeout);
    };
  }, []);

  const onReady = () => setMode("3d");
  const onError = () => { setFbFlag(true); setMode("fb"); };

  useEffect(() => {
    if (fbFlag) {
      setMode("fb");
    }
  }, [fbFlag]);

  return (
    <div className="font-sans bg-[#fafaf8] text-[#16130f]">
      <SiteHeader active="action-camera" />

      {/* ═══════════ SCROLL EXPERIENCE (620vh) ═══════════ */}
      <div ref={containerRef} className="relative h-[620vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0b0a09]">
          
          {/* Layer 0: background video scrub */}
          <video
            ref={videoRef}
            src="/assets/video/race.mp4" 
            muted 
            playsInline 
            preload="auto" 
            className="absolute inset-0 w-full h-full object-cover filter saturate-[1.15] contrast-[1.07] brightness-[1.03]" 
          />

          {/* Fallback space when video or 3D is loading */}
          <div 
            ref={noVideoRef} 
            className="absolute inset-0 hidden items-center justify-center bg-gradient-to-b from-[#14110e] to-[#0b0a09] animate-[speedLines_3s_linear_infinite]"
          />

          {/* Scrims */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[rgba(8,7,6,0.6)] via-transparent to-[rgba(8,7,6,0.22)] pointer-events-none" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(8,7,6,0.6)] to-transparent pointer-events-none" />
          <div ref={dimRef} aria-hidden="true" className="absolute inset-0 bg-[rgba(8,7,6,0.65)] opacity-0 pointer-events-none transition-opacity" />

          {/* Cinema borders / Vignette / Flare */}
          <div ref={vignetteRef} aria-hidden="true" className="absolute inset-0 z-14 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(0,0,0,0.4)_100%)] opacity-0 pointer-events-none" />
          <div ref={barTopRef} aria-hidden="true" className="absolute left-0 right-0 top-0 h-0 bg-[#050403] z-27 pointer-events-none transition-all" />
          <div ref={barBotRef} aria-hidden="true" className="absolute left-0 right-0 bottom-0 h-0 bg-[#050403] z-27 pointer-events-none transition-all" />
          <div ref={flareRef} aria-hidden="true" className="absolute left-[-10%] right-[-10%] top-[50%] h-[2px] z-26 bg-gradient-to-r from-transparent via-[rgba(255,138,61,0.85)] to-transparent opacity-0 pointer-events-none will-change-transform shadow-[0_0_26px_5px_rgba(255,106,0,0.45)]" />

          {/* Layer 1: 3D Stage on the right */}
          <div className="absolute top-0 bottom-0 right-0 w-full md:w-[46%] z-12 pointer-events-none opacity-30 md:opacity-100">
            <div ref={glowRef} aria-hidden="true" style={{ transform: "translate(-50%, -50%)" }} className="absolute left-[50%] top-[50%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] opacity-0 will-change-transform">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.34),rgba(255,106,0,0.08)_55%,transparent_72%)] filter blur-[6px] animate-[glowPulse_5s_ease-in-out_infinite]" />
              <div className="absolute inset-[26px] md:inset-[42px] rounded-full border border-dashed border-[rgba(255,164,96,0.5)] animate-[ringSpin_32s_linear_infinite]" />
              <div className="absolute inset-[56px] md:inset-[92px] rounded-full border border-white/16" />
            </div>
            {mode !== "fb" && (
              <ThreeDStage
                src="/assets/models/action-cam.glb"
                colorParts="body,paint,frame"
                fit="2.6"
                exposure="1.15"
                color="#1c1c1c"
                pose={poseRef.current}
                onReady={onReady}
                onError={onError}
                style={{ width: "100%", height: "100%" }}
              />
            )}
            <div 
              ref={noModelRef} 
              style={{ display: mode === "fb" ? "flex" : "none" }}
              className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[300px] rounded-full border border-dashed border-white/30 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_8px,transparent_8px,transparent_20px)] items-center justify-center text-center text-[10.5px] font-mono uppercase text-white/60 leading-[1.9]"
            >
              Model 3D Insta360<br />assets/models/action-cam.glb
            </div>
          </div>

          {/* Layer 2: Hero intro Overlay copy */}
          <div ref={heroRef} className="absolute inset-0 z-20 flex items-center will-change-transform">
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-5 lg:px-8">
              <div className="max-w-[560px]">
                <div className="inline-flex items-center gap-2 border border-[rgba(255,138,61,0.5)] bg-[#110a09]/55 backdrop-blur-[8px] rounded-full px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] shadow-[0_0_10px_2px_rgba(255,106,0,0.7)] animate-[recBlink_1.4s_ease-in-out_infinite]" />
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#ff8a3d]">Cuộn chuột = tua video đua xe</span>
                </div>
                <h1 className="mt-6 mb-0 text-[30px] sm:text-[42px] md:text-[58px] lg:text-[74px] leading-[1.05] font-extralight tracking-[-0.02em] text-white">
                  Insta360 <span className="font-bold text-[#ff6a00]">ONE RS</span><br />
                  <span className="text-[18px] sm:text-[26px] md:text-[34px] lg:text-[44px] font-light text-white/92">1-Inch 360 Edition</span>
                </h1>
                <p className="mt-5 max-w-[440px] text-[14px] sm:text-[15px] md:text-[17.5px] font-light leading-[1.6] text-white/75">
                  Cảm biến kép 1-inch đồng phát triển cùng Leica. Quay 6K 360° — bắt trọn mọi khoảnh khắc tốc độ.
                </p>
                <div className="flex items-baseline gap-3.5 mt-7">
                  <span className="text-[22px] sm:text-[26px] md:text-[32px] font-medium text-white">18.990.000đ</span>
                  <span className="text-[14px] sm:text-[15px] md:text-[17px] text-white/45 line-through">20.990.000đ</span>
                  <span className="text-[12px] font-extrabold text-white bg-[#ff6a00] rounded-full px-2.5 py-1 shadow-[0_6px_18px_-4px_rgba(255,106,0,0.7)]">-10%</span>
                </div>
                <p className="flex items-center gap-2 mt-[32px] text-[14px] text-white/70">
                  <svg className="animate-[bounceDown_1.6s_ease-in-out_infinite]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2.4"><path d="m6 9 6 6 6-6"></path></svg>
                  Cuộn xuống — video chạy theo từng cú lăn chuột
                </p>
              </div>
            </div>
          </div>

          {/* Layer 3: Segment copy steps (left side) */}
          <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
            <div className="w-full max-w-[1280px] mx-auto px-8 relative h-full">
              
              <div ref={seg0} style={{ transform: "translateY(-50%)" }} className="absolute left-5 right-5 sm:right-auto sm:left-8 top-1/2 max-w-[460px] opacity-0 will-change-transform">
                <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff8a3d]">01 · Cảm biến</p>
                <h2 className="mt-3.5 mb-0 text-[36px] sm:text-[48px] md:text-[66px] lg:text-[88px] leading-[0.95] font-extralight tracking-[-0.03em] text-white">1-inch <span className="font-bold text-[#ff6a00]">×2</span></h2>
                <p className="mt-4 mb-0 text-[14px] sm:text-[16px] font-light leading-[1.6] text-white/75">
                  Đồng phát triển cùng Leica. Dải nhạy sáng vượt trội bắt trọn chi tiết trong đêm tối.
                </p>
              </div>

              <div ref={seg1} style={{ transform: "translateY(-50%)" }} className="absolute left-5 right-5 sm:right-auto sm:left-8 top-1/2 max-w-[460px] opacity-0 will-change-transform">
                <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff8a3d]">02 · Quay phim</p>
                <h2 className="mt-3.5 mb-0 text-[36px] sm:text-[48px] md:text-[66px] lg:text-[88px] leading-[0.95] font-extralight tracking-[-0.03em] text-white">6K <span className="font-bold text-[#ff6a00]">360°</span></h2>
                <p className="mt-4 mb-0 text-[14px] sm:text-[16px] font-light leading-[1.6] text-white/75">
                  Tự do tái khung hình (reframe) sau khi quay mà không lo suy giảm độ phân giải.
                </p>
              </div>

              <div ref={seg2} style={{ transform: "translateY(-50%)" }} className="absolute left-5 right-5 sm:right-auto sm:left-8 top-1/2 max-w-[460px] opacity-0 will-change-transform">
                <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff8a3d]">03 · Chống rung</p>
                <h2 className="mt-3.5 mb-0 text-[32px] sm:text-[44px] md:text-[60px] lg:text-[76px] leading-[0.98] font-bold text-white">Flow<span className="text-[#ff6a00]">State</span></h2>
                <p className="mt-4 mb-0 text-[16px] font-light leading-[1.6] text-white/75">
                  Thuật toán ổn định hình ảnh 6 trục và khóa chân trời 360° giúp thước phim mượt mà tuyệt đối.
                </p>
              </div>

              <div ref={seg3} style={{ transform: "translateY(-50%)" }} className="absolute left-5 right-5 sm:right-auto sm:left-8 top-1/2 max-w-[460px] opacity-0 will-change-transform">
                <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff8a3d]">04 · Bền bỉ</p>
                <h2 className="mt-3.5 mb-0 text-[32px] sm:text-[44px] md:text-[60px] lg:text-[76px] leading-[0.98] font-bold text-white">IPX<span className="text-[#ff6a00]">8</span></h2>
                <p className="mt-4 mb-0 text-[16px] font-light leading-[1.6] text-white/75">
                  Chống nước IPX8 — tự tin quay dưới mưa, dưới biển mà không cần vỏ bảo vệ.
                </p>
              </div>
            </div>
          </div>

          {/* Layer 4: Final Screen */}
          <div ref={finalRef} className="absolute inset-0 z-20 flex items-center justify-center text-center opacity-0 pointer-events-none">
            <div className="max-w-[560px] px-6">
              <p className="m-0 font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-[#ff6a00]">Trải nghiệm đỉnh cao</p>
              <h2 className="mt-3 mb-0 text-[24px] sm:text-[32px] md:text-[48px] font-extralight tracking-[-0.025em] text-white">Sáng tạo không giới hạn</h2>
              <p className="mt-4 mb-0 text-[16px] font-light leading-[1.65] text-white/75">
                Cảm biến kép Leica 1-inch mang lại chất lượng hình ảnh vượt bậc mà các camera hành động khác không thể sánh kịp.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <button 
                  type="button" 
                  onClick={() => alert("Cảm ơn bạn! Sản phẩm đã được thêm vào giỏ hàng.")}
                  className="h-[52px] px-8 rounded-2xl bg-[#ff6a00] text-white border-none font-bold text-[14.5px] cursor-pointer shadow-[0_12px_26px_-10px_rgba(255,106,0,0.6)] hover:bg-[#ea6100]"
                >
                  Mua ngay
                </button>
                <Link href="/danh-muc" className="h-[52px] px-7 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-[6px] text-white no-underline font-bold text-[14.5px] flex items-center justify-center hover:bg-white/20">
                  Xem dòng sản phẩm
                </Link>
              </div>
            </div>
          </div>

          {/* Video progress indicator at bottom */}
          <div className="absolute left-5 right-5 bottom-5 sm:left-8 sm:right-8 sm:bottom-8 z-20 flex items-center justify-between font-mono text-white text-[10px] uppercase tracking-[0.12em]">
            <span>REC · <span ref={tcRef}>00:00:00</span></span>
            <div className="flex-1 mx-4 sm:mx-6 relative h-[2px] rounded-full bg-white/20 overflow-hidden">
              <div ref={tlRef} className="h-full rounded-full bg-[#ff6a00] w-0" />
            </div>
            <span className="hidden sm:inline">TUA NHANH VIDEO</span>
          </div>
        </div>
      </div>

      {/* ═══════════ DETAILED INFO & SPECS (Below scroll area) ═══════════ */}
      <section className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-8 pt-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start bg-[#fafaf8]">
        {/* Specs */}
        <div>
          <h2 className="m-0 text-[24px] sm:text-[32px] font-extralight tracking-[-0.025em]">Thông số kỹ thuật chi tiết</h2>
          <div className="mt-8 flex flex-col gap-6">
            {specGroups.map((group, idx) => (
              <div key={idx} className="border border-[#e9e6e1] bg-white rounded-2xl overflow-hidden">
                <div className="bg-[#f7f5f1] border-b border-[#e9e6e1] px-5 py-3 font-semibold text-[13.5px] uppercase tracking-[0.08em] text-[#7a746c]">
                  {group.group}
                </div>
                <div className="flex flex-col">
                  {group.items.map((item: any, iIdx: number) => (
                    <div key={iIdx} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 px-5 py-3 border-t border-[#f1eee9] first:border-none text-[13.5px]">
                      <span className="font-semibold text-[#7a746c]">{item.label}</span>
                      <span className="text-[#16130f]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Included package sidebar */}
        <div className="border border-[#e9e6e1] bg-white rounded-3xl p-7 sticky top-[132px]">
          <h3 className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#ff6a00]">Trong hộp gồm có</h3>
          <div className="flex flex-col gap-3 mt-4 text-[13.5px]">
            {["1× Ống kính ONE RS 1-Inch 360", "1× ONE RS Core điều khiển", "1× Đế pin dọc 1350mAh", "1× Khung lắp bảo vệ", "1× Nắp che bảo vệ ống kính", "Cáp sạc USB-C + Hướng dẫn"].map((inc, idx) => (
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
      <div ref={buyBarRef} style={{ transform: "translateY(110%)" }} className="fixed left-0 right-0 bottom-0 z-50 transition-transform duration-400 cubic-bezier(0.22,1,0.36,1)">
        <div className="max-w-[1080px] mx-4 xl:mx-auto mb-[18px] px-4 sm:px-6 py-3.5 border border-[#e9e6e1] bg-[rgba(255,255,255,0.92)] backdrop-blur-[14px] rounded-2xl shadow-[0_24px_60px_-20px_rgba(22,19,15,0.3)] flex items-center gap-3 sm:gap-[18px]">
          <span className="w-2 h-2 rounded-full bg-[#1a9e5c] shadow-[0_0_8px_2px_rgba(26,158,92,0.4)] shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[14.5px] font-bold text-[#16130f] truncate">Insta360 ONE RS 1-Inch 360 Edition — Chính hãng</p>
            <p className="mt-[1px] mb-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[#a39d94]">Còn hàng · Bảo hành 12 tháng</p>
          </div>
          <div className="hidden sm:flex items-baseline gap-2.5">
            <span className="text-[19px] font-bold text-[#ff6a00]">18.990.000đ</span>
            <span className="text-[13px] text-[#a39d94] line-through">20.990.000đ</span>
          </div>
          <button 
            type="button" 
            onClick={() => alert("Cảm ơn bạn! Insta360 ONE RS đã được thêm vào giỏ hàng.")}
            className="flex items-center justify-center h-11 px-6 rounded-xl bg-[#ff6a00] text-white border-none text-[14px] font-bold cursor-pointer shadow-[0_12px_26px_-10px_rgba(255,106,0,0.6)] transition-all hover:bg-[#ea6100] hover:-translate-y-[1px]"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
