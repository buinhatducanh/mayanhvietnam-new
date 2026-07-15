'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reviews section — đúng theo cấu trúc REVIEWS SẢN PHẨM trên mayanhvietnam.com
 * 6 video YouTube thật từ kênh @mayanhvietnam
 * Carousel ngang với iframe embed YouTube + arrow prev/next
 */
const VIDEOS = [
  { id: 'z9hJFwVLS4A', title: 'Review Fujifilm X-H2S' },
  { id: 'BIUttXDonuo', title: 'Chị khách ghé shop Tiền Giang chốt ngay Canon R50' },
  { id: 'jz42ostc6K8', title: 'Cầm 200 triệu đi mua máy ảnh là cảm' },
  { id: 'i5wmKTdzJHo', title: 'Chốt Lumix S5 II & Đập hộp tại chỗ' },
  { id: 'xdoZXGbUQJE', title: 'KASE 85mm f/1.4 RF' },
  { id: 'v2oxxlfzsBM', title: 'Canon R50' },
];

/** YouTube play icon — lấy đúng từ SVG gốc mayanhvietnam.com */
function YouTubePlayIcon() {
  return (
    <svg fill="none" height="30px" viewBox="0 0 87 115" width="30px">
      <path
        clipRule="evenodd"
        d="M83.99 10.81C90.08 21.24 86.62 34.66 76.26 40.79L69.05 45.06L74.17 47.38C81.58 50.74 86.52 57.99 86.96 66.17C87.40 74.34 83.27 82.09 76.26 86.24L32.76 111.97C22.41 118.10 9.08 114.61 3.00 104.18C-3.08 93.75 .37 80.33 10.73 74.20L17.94 69.93L12.82 67.61C5.41 64.25 .47 57.00 .03 48.82C-0.40 40.65 3.72 32.90 10.73 28.75L54.23 3.02C64.58 -3.10 77.91 .38 83.99 10.81Z"
        fill="#CE1312"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M33 74L33 41L61 57.5L33 74Z"
        fill="white"
        fillRule="evenodd"
      />
    </svg>
  );
}

/** Arrow icon — lấy đúng SVG gốc */
function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.71 18.293c.39.39 1.024.39 1.414 0l4.888-4.892c.78-.781.78-2.047 0-2.828l-4.888-4.889a1.003 1.003 0 00-1.414 1.414l4.185 4.186-4.185 4.186a1.003 1.003 0 000 1.414z"
        fill="#ff6a00"
      />
    </svg>
  );
}

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: dir * w * 0.6, behavior: 'smooth' });
  };

  return (
    <section
      aria-label="Reviews sản phẩm"
      className="mx-auto w-full max-w-7xl px-4 lg:px-8 py-10"
    >
      {/* Header — giống mayanhvietnam.com */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <YouTubePlayIcon />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            REVIEWS SẢN PHẨM
          </h2>
        </div>
        <a
          href="https://www.youtube.com/@mayanhvietnam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-semibold transition-colors"
          style={{ color: '#ff6a00' }}
        >
          Xem youtube
          <ArrowIcon />
        </a>
      </div>

      {/* Video carousel ngang */}
      <div className="relative group">
        {/* Nút prev */}
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Video trước"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white transition-colors hover:bg-black/80 sm:left-0 sm:w-10 sm:h-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {VIDEOS.map((v) => (
            <div
              key={v.id}
              className="flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[420px] snap-start rounded-[20px] overflow-hidden bg-black"
              style={{ aspectRatio: '16 / 9' }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ width: '100%', height: '100%', border: 0, borderRadius: 20 }}
              />
            </div>
          ))}
        </div>

        {/* Nút next */}
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Video tiếp"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white transition-colors hover:bg-black/80 sm:right-0 sm:w-10 sm:h-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
