'use client'

import { useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
} from 'framer-motion'
import { ArrowRight, Aperture, ChevronDown } from 'lucide-react'
import { products } from '@/lib/products'
import { ScrollScene } from './scroll-scene'
import { HeroBanners } from './hero-banners'

const FEATURED_INDEX = 1 // Sony A7 IV — flagship

export function LandingExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const featured = products[FEATURED_INDEX]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  // Smoothed progress drives both the 3D scene and the HTML layers
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  // --- Phase A: hero banners fade away ---
  const heroOpacity = useTransform(progress, [0, 0.16, 0.28], [1, 1, 0])
  const heroY = useTransform(progress, [0.14, 0.3], [0, -80])

  // --- Phase B: floating spec cards ---
  const specsOpacity = useTransform(progress, [0.3, 0.38, 0.5, 0.57], [0, 1, 1, 0])
  const specsScale = useTransform(progress, [0.3, 0.38], [0.92, 1])

  // --- Phase C: "taking the shot" caption + flash ---
  const shootOpacity = useTransform(progress, [0.52, 0.57, 0.61, 0.64], [0, 1, 1, 0])
  const flashOpacity = useTransform(progress, [0.61, 0.63, 0.66], [0, 1, 0])

  // --- Phase D: Polaroid Crop & Expand + Specs Analysis ---
  const photoOpacity = useTransform(progress, [0.63, 0.65], [0, 1])
  
  // Photo crop starts square (32vw x 32vh), expands to fullscreen
  const photoW = useTransform(progress, [0.65, 0.74, 0.85], [32, 100, 100])
  const photoH = useTransform(progress, [0.65, 0.74, 0.85], [32, 100, 100])
  const photoRadius = useTransform(progress, [0.65, 0.74], [16, 0])
  const photoRotate = useTransform(progress, [0.65, 0.72], [-3, 0])
  
  const photoWidth = useMotionTemplate`${photoW}vw`
  const photoHeight = useMotionTemplate`${photoH}vh`
  
  // Viewfinder overlay fades out as photo goes fullscreen
  const viewfinderOpacity = useTransform(progress, [0.65, 0.69, 0.72], [1, 1, 0])
  
  // Technical specs analysis cards fade in as photo goes fullscreen
  const analysisOpacity = useTransform(progress, [0.74, 0.80, 0.93, 0.97], [0, 1, 1, 0])
  const analysisScale = useTransform(progress, [0.74, 0.80], [0.93, 1])
  
  // Final caption + CTA buttons at the bottom of the scroll
  const captionOpacity = useTransform(progress, [0.92, 0.97], [0, 1])
  const captionY = useTransform(progress, [0.92, 0.97], [24, 0])

  // Scroll hint
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0])

  const leftSpecs = featured.specs.slice(0, 2)
  const rightSpecs = featured.specs.slice(2, 4)

  return (
    <div ref={containerRef} className="relative h-[550vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Ambient background */}
        <div className="landing-bg absolute inset-0" aria-hidden />

        {/* Layer 1 — Hero banners (Phase A) */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 z-10 flex items-center"
        >
          <HeroBanners />
        </motion.div>

        {/* Layer 2 — 3D model canvas (always on, scroll-driven) */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <ScrollScene progress={progress} bodyColor="#1c1c1c" />
        </div>

        {/* Layer 3 — Spec cards around the centered model (Phase B) */}
        <motion.div
          style={{ opacity: specsOpacity, scale: specsScale }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
        >
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-4 px-4 lg:grid-cols-[1fr_minmax(320px,42%)_1fr]">
            <div className="flex flex-col gap-4">
              {leftSpecs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-primary/25 bg-background/70 p-4 backdrop-blur-md lg:justify-self-end"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm font-bold">{s.value}</p>
                </div>
              ))}
            </div>
            {/* Center space reserved for the model */}
            <div className="hidden lg:block" />
            <div className="flex flex-col gap-4">
              {rightSpecs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-primary/25 bg-background/70 p-4 backdrop-blur-md"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Thông số kỹ thuật
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{featured.name}</p>
          </div>
        </motion.div>

        {/* Layer 4 — "Taking the shot" caption (Phase C) */}
        <motion.div
          style={{ opacity: shootOpacity }}
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-end pb-20 text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/70 px-4 py-2 text-sm font-medium text-primary backdrop-blur">
            <Aperture className="h-4 w-4 animate-spin [animation-duration:4s]" />
            Đang lấy nét... chụp!
          </p>
        </motion.div>

        {/* Layer 5 — The 4K photo growing to fullscreen (Phase D) */}
        <motion.div
          style={{ opacity: photoOpacity }}
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            style={{
              width: photoWidth,
              height: photoHeight,
              borderRadius: photoRadius,
              rotate: photoRotate,
            }}
            className="relative overflow-hidden border-2 border-primary/20 shadow-2xl bg-zinc-900"
          >
            <img
              src="/images/sample-4k-photo.png"
              alt="Ảnh phong cảnh Vịnh Hạ Long chụp bởi máy ảnh"
              className="h-full w-full object-cover"
            />
            
            {/* Viewfinder Overlay (fades out as photo goes fullscreen) */}
            <motion.div
              style={{ opacity: viewfinderOpacity }}
              className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4"
            >
              {/* Viewfinder Corners */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary" />

              {/* Viewfinder metadata */}
              <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-primary/95 bg-black/75 px-3 py-1 rounded border border-primary/20">
                <span>RAW 14-bit</span>
                <span>f/2.8</span>
                <span>1/250s</span>
                <span>ISO 200</span>
                <span>35mm</span>
              </div>

              {/* Viewfinder grid lines */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20 pointer-events-none">
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-white" />
                <div className="border-r border-white" />
                <div />
              </div>
            </motion.div>

            {/* Final caption + CTA (only visible at the end) */}
            <motion.div
              style={{ opacity: captionOpacity, y: captionY }}
              className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-6 pb-12 pt-28 text-center"
            >
              <p className="text-balance text-2xl font-bold tracking-tight text-white lg:text-4xl">
                Chụp bởi {featured.name}
              </p>
              <p className="max-w-xl text-pretty text-xs leading-relaxed text-white/80">
                Cảm biến Full-frame 33.0MP Exmor R — mọi khung hình đều là một tác phẩm nghệ thuật.
              </p>
              <Link
                href="/store"
                className="glow-amber pointer-events-auto inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Khám phá cửa hàng <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Technical Analysis Overlay Cards (only visible during fullscreen zoom) */}
          <motion.div
            style={{ opacity: analysisOpacity, scale: analysisScale }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-7xl mx-auto px-4">
              {/* Target Reticle 1: Sky Dynamic Range */}
              <div className="absolute top-[22%] right-[40%] flex items-center justify-center">
                <div className="w-6 h-6 border border-amber-500/50 rounded-full animate-ping" />
                <div className="absolute w-2 h-2 bg-amber-500 rounded-full" />
              </div>
              
              {/* Card 1: Dynamic Range Details */}
              <div className="absolute top-[15%] right-[8%] max-w-[290px] rounded-2xl border border-amber-500/30 bg-black/90 p-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <p className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                    Cảm biến Exmor R 33.0MP
                  </p>
                </div>
                <p className="text-xs font-bold text-white mb-1">
                  Dải động Dynamic Range rộng
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Tái hiện hoàn hảo sắc thái hoàng hôn trên Vịnh Hạ Long. Vùng sáng mặt trời không bị lóa trắng, chi tiết mây nắng và bóng vách núi tối vẫn sắc nét, rõ ràng.
                </p>
              </div>

              {/* Target Reticle 2: Boat AI Target Lock */}
              <div className="absolute bottom-[44%] left-[32%] flex items-center justify-center">
                <div className="w-8 h-8 border border-green-500/50 rounded-full animate-pulse" />
                <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full" />
                <span className="absolute text-[8px] font-mono font-bold text-green-400 mt-8 bg-black/60 px-1.5 py-0.5 rounded border border-green-500/30">LOCK AF-L</span>
              </div>

              {/* Card 2: AI Autofocus Target Lock Details */}
              <div className="absolute bottom-[20%] left-[6%] max-w-[290px] rounded-2xl border border-green-500/30 bg-black/90 p-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <p className="text-[9px] font-bold uppercase tracking-wider text-green-400">
                    AI AF 759 điểm bám nét
                  </p>
                </div>
                <p className="text-xs font-bold text-white mb-1">
                  Khóa chủ thể di động
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Hệ thống AI tự động phát hiện cấu trúc buồm tàu gỗ, khóa chặt tiêu cự thời gian thực. Bắt trọn vẹn từng thớ gỗ và gợn sóng lăn tăn sắc nét tuyệt đối.
                </p>
              </div>

              {/* Card 3: Color Engine Details */}
              <div className="absolute bottom-[16%] right-[6%] max-w-[290px] rounded-2xl border border-amber-500/30 bg-black/90 p-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <p className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                    Bộ xử lý BIONZ XR
                  </p>
                </div>
                <p className="text-xs font-bold text-white mb-1">
                  Màu sắc 10-bit & Khử nhiễu
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Xử lý tông màu hoàng hôn vàng ấm áp tự nhiên, chuyển sắc mượt mà không bị bết màu. Cơ chế khử nhiễu tự động giúp vùng tối núi đá sâu luôn sạch nhiễu.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Layer 6 — Shutter flash */}
        <motion.div
          style={{ opacity: flashOpacity }}
          className="pointer-events-none absolute inset-0 z-50 bg-white"
          aria-hidden
        />

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2"
        >
          <p className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
            Cuộn xuống để khám phá
            <ChevronDown className="h-4 w-4 animate-bounce text-primary" />
          </p>
        </motion.div>
      </div>
    </div>
  )
}
