'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

interface Slide {
  id: number;
  img: string;
  alt: string;
  headline: string;
  sub: string;
  badge?: string;
  objectPosition?: string;
}

/* Real product imagery from mayanhvietnam.com CDN */
const SLIDES: Slide[] = [
  {
    id: 1,
    img: 'https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png_may-anh-sony-alpha-a7r-vi.jpg',
    alt: 'Sony Alpha A7R VI',
    headline: 'Sony Alpha A7R VI — Đỉnh Cao Mới',
    sub: 'AI Processor thế hệ mới · 8K 30p · Real-time Recognition AF',
    badge: 'HÀNG CHÍNH HÃNG',
    objectPosition: 'center 35%',
  },
  {
    id: 2,
    img: 'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg',
    alt: 'DJI Mavic 4 Pro Creator Combo',
    headline: 'DJI Mavic 4 Pro Creator Combo',
    sub: '4/3 Hasselblad 100MP · Bay 52 phút · O4+ 30km · Trả góp 0%',
    badge: 'TRẢ GÓP 0%',
    objectPosition: 'center 30%',
  },
  {
    id: 3,
    img: 'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg',
    alt: 'Canon EOS R50 + RF-S 18-45mm',
    headline: 'Canon EOS R50 Black — Vlog & Mirrorless',
    sub: '4K 30p · Eye AF · Kit 18-45mm · Phù hợp người mới & vlogger',
    badge: 'FREESHIP 500K+',
    objectPosition: 'center 35%',
  },
];

function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [anim, setAnim] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (dir: 1 | -1) => {
    setAnim(true);
    setTimeout(() => {
      setCur((c) => (c + dir + SLIDES.length) % SLIDES.length);
      setAnim(false);
    }, 350);
    startTimer();
  };

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => go(1), 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const s = SLIDES[cur];

  return (
    <section className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] overflow-hidden group bg-gray-900">
      <img
        key={s.id}
        src={s.img}
        alt={s.alt}
        className={cn(
          'absolute inset-0 w-full h-full object-cover transition-all duration-500',
          anim ? 'opacity-0 scale-[1.04]' : 'opacity-100 scale-100',
        )}
        style={{ objectPosition: s.objectPosition ?? 'center' }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 w-full">
          <div className="max-w-lg">
            {s.badge && (
              <span className="inline-block bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-sm mb-4 tracking-wide">
                {s.badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
              {s.headline}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
              {s.sub}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/san-pham"
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Mua sắm ngay →
              </Link>
              <Link
                href="/san-pham"
                className="border border-white/30 hover:border-white/60 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCur(i); startTimer(); }}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i === cur ? 'w-8 bg-orange-500' : 'w-2 bg-white/50 hover:bg-white/70',
            )}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
