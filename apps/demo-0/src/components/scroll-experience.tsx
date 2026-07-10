'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles, Aperture } from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatVND } from '@/lib/products';
import { SpecCallouts, SpecCalloutsMobile } from './spec-callouts';

const CameraCanvas = dynamic(() => import('./camera-canvas'), { ssr: false });

type ScrollExperienceProps = {
  product: Product;
  bodyColor: string;
};

export function ScrollExperience({ product, bodyColor }: ScrollExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });

  const heroOpacity = useTransform(progress, [0, 0.14], [1, 0]);
  const heroY = useTransform(progress, [0, 0.14], [0, -80]);
  const specsTitleOpacity = useTransform(progress, [0.26, 0.32, 0.46, 0.52], [0, 1, 1, 0]);
  const flashOpacity = useTransform(progress, [0.52, 0.555, 0.63], [0, 1, 0]);
  const photoOpacity = useTransform(progress, [0.545, 0.6], [0, 1]);
  const photoScale = useTransform(progress, [0.56, 0.86], [0.32, 1]);
  const photoRadius = useTransform(progress, [0.7, 0.86], [28, 0]);
  const finalOpacity = useTransform(progress, [0.88, 0.95], [0, 1]);
  const finalY = useTransform(progress, [0.88, 0.95], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[520vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 1 (back): captured 4K photo */}
        <motion.div
          style={{ opacity: photoOpacity, scale: photoScale, borderRadius: photoRadius }}
          className="absolute inset-0 z-[5] overflow-hidden will-change-transform"
        >
          <Image
            src="/images/captured-landscape.png"
            alt="Bức ảnh phong cảnh 4K được chụp bởi máy ảnh"
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pb-16 pt-32 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Chụp bằng {product.name}
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-balance text-3xl font-extralight text-white md:text-5xl">
              Sắc nét đến từng chi tiết nhỏ nhất
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-white/70">
              Độ phân giải 4K siêu thực — bằng chứng cho khả năng chụp ảnh chuyên nghiệp đỉnh cao.
            </p>
          </motion.div>
        </motion.div>

        {/* Layer 2: 3D canvas */}
        <div className="absolute inset-0 z-10">
          <CameraCanvas progress={progress} bodyColor={bodyColor} />
        </div>

        {/* Layer 3: Hero overlay */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 z-20 flex items-end pb-14 md:items-center md:pb-0"
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 lg:px-12">
            <div className="pointer-events-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="size-3.5 text-primary" aria-hidden />
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Giảm đến {product.discountPercent}% hôm nay
                </span>
              </div>
              <h1 className="mt-6 text-balance text-5xl font-extralight leading-[1.05] tracking-tight text-foreground md:text-7xl">
                {product.name.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="font-medium text-primary">{product.name.split(' ').slice(-1)}</span>
              </h1>
              <p className="mt-5 max-w-md text-pretty text-lg font-light leading-relaxed text-muted-foreground">
                {product.tagline}
              </p>
              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-3xl font-light text-foreground">{formatVND(product.price)}</span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatVND(product.originalPrice)}
                </span>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <ChevronDown className="size-4 animate-bounce text-primary" aria-hidden />
                Cuộn xuống để khám phá trải nghiệm 3D
              </p>
            </div>

            {/* Right: 3D showcase banner frame */}
            <div className="relative hidden aspect-square md:block" aria-hidden>
              <div className="absolute inset-0 rounded-3xl border border-border bg-card/30 backdrop-blur-[2px]" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-3 py-1.5 backdrop-blur-sm">
                <Aperture className="size-3.5 text-primary" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Xem trực tiếp 3D
                </span>
              </div>
              <div className="absolute bottom-5 right-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Tự động xoay — 360°
              </div>
              <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
            </div>
          </div>
        </motion.div>

        {/* Layer 3b: Specs phase */}
        <motion.div
          style={{ opacity: specsTitleOpacity }}
          className="pointer-events-none absolute inset-x-0 top-24 z-20 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Thông số kỹ thuật</p>
          <h2 className="mt-2 text-balance text-2xl font-extralight text-foreground md:text-4xl">
            Phô diễn mọi góc cạnh
          </h2>
        </motion.div>
        <SpecCallouts progress={progress} callouts={product.callouts} />
        <SpecCalloutsMobile progress={progress} callouts={product.callouts} />

        {/* Layer 4: Flash */}
        <motion.div
          style={{ opacity: flashOpacity }}
          className="pointer-events-none absolute inset-0 z-40 bg-white"
          aria-hidden
        />
      </div>
    </div>
  );
}
