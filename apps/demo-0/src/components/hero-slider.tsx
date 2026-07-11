'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Main hero: Canon EOS R6 Mark III (canonical banner từ mayanhvietnam.com)
// Supplement: other real product banners
const HERO_BANNERS = [
  {
    id: 'b1',
    imageUrl: 'https://mayanhvietnam.com/asset/imgs/img/banner/canon-r6-mark-III.webp',
    link: '/san-pham/may-anh-canon-eos-r6-mark-iii-body_may-anh-mirrorless-250315190440715',
  },
  {
    id: 'b2',
    imageUrl: 'https://mayanhvietnam.com/asset/imgs/img/banner/sony-a7r-vi-1.webp',
    link: '/san-pham/may-anh-sony-alpha-a7r-vi_may-anh-mirrorless-260328143107303',
  },
  {
    id: 'b3',
    imageUrl: 'https://mayanhvietnam.com/asset/imgs/img/banner/uuDai-sonya7v-DCHS.webp',
    link: '/san-pham/may-anh-sony-a7-mark-v-a7m5-chinh-hang_may-anh-mirrorless-251126090035598',
  },
  {
    id: 'b4',
    imageUrl: 'https://mayanhvietnam.com/asset/imgs/img/banner/canon_r50_trang_den.webp',
    link: '/san-pham/may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang_may-anh-mirrorless-241228112737843',
  },
  {
    id: 'b5',
    imageUrl: 'https://mayanhvietnam.com/asset/imgs/img/banner/sony-uu-dai-thang-1.webp',
    link: '/danh-muc/may-anh-khuyen-mai-brd-sony',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % HERO_BANNERS.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + HERO_BANNERS.length) % HERO_BANNERS.length),
    [],
  );

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = HERO_BANNERS[current];

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0d10] border-b border-border aspect-[1920/800] md:aspect-[1920/600] max-h-[500px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative size-full"
        >
          <Link href={banner.link} className="relative block size-full">
            <Image
              src={banner.imageUrl}
              alt="May Anh Vietnam Hero Banner"
              fill
              className="object-cover"
              sizes="100vw"
              priority={current === 0}
              unoptimized
              referrerPolicy="no-referrer"
            />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous banner"
        className="absolute left-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next banner"
        className="absolute right-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {HERO_BANNERS.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === current
                ? 'w-6 bg-primary shadow-lg shadow-primary/50'
                : 'w-1.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
