'use client';

import { useRef } from 'react';

/**
 * REVIEWS SẢN PHẨM — đúng mẫu mayanhvietnam.com
 * Carousel ngang, 6 iframe YouTube thật, SVG play icon đỏ giống hệt trang gốc.
 */

const VIDEOS = [
  { id: 'z9hJFwVLS4A', title: 'Review Fujifilm X-H2S' },
  { id: 'BIUttXDonuo', title: 'Chị khách ghé shop Tiền Giang chốt ngay Canon R50' },
  { id: 'jz42ostc6K8', title: 'Cầm 200 triệu đi mua máy ảnh là cảm' },
  { id: 'i5wmKTdzJHo', title: 'Nay khách ghé shop — chốt luôn Lumix S5 II & đập hộp' },
  { id: 'xdoZXGbUQJE', title: 'KASE 85mm f/1.4 RF' },
  { id: 'v2oxxlfzsBM', title: 'Canon R50' },
];

function YouTubePlayIcon() {
  return (
    <svg fill="none" height="30" viewBox="0 0 87 115" width="30">
      <path
        clipRule="evenodd"
        d="M83.99 10.81C90.08 21.24 86.62 34.66 76.26 40.79L69.05 45.06 74.17 47.38C81.58 50.74 86.52 57.99 86.96 66.17 87.40 74.34 83.27 82.09 76.26 86.24L32.76 111.97C22.41 118.10 9.08 114.61 3.00 104.18 -3.08 93.75 .37 80.33 10.73 74.20L17.94 69.93 12.82 67.61C5.41 64.25 .47 57.00 .03 48.82 -0.40 40.65 3.72 32.90 10.73 28.75L54.23 3.02C64.58 -3.10 77.91 .38 83.99 10.81Z"
        fill="#CE1312"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M33 74L33 41 61 57.5 33 74Z"
        fill="#fff"
        fillRule="evenodd"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254 9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
        fill="#ff6a00"
      />
    </svg>
  );
}

export function YouTubeReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: dir * w * 0.6, behavior: 'smooth' });
  };

  return (
    <section
      aria-label="Reviews sản phẩm"
      className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8"
    >
      {/* Header — giống mayanhvietnam.com */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <YouTubePlayIcon />
          <h2 className="text-xl font-bold sm:text-2xl">REVIEWS SẢN PHẨM</h2>
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
      <div className="group relative">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Video trước"
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 text-foreground backdrop-blur-sm hover:border-primary hover:text-primary opacity-0 transition-opacity group-hover:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" stroke="currentColor" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {VIDEOS.map((v) => (
            <div
              key={v.id}
              className="shrink-0 snap-start overflow-hidden rounded-[20px] bg-black w-[72vw] sm:w-[55vw] md:w-[38vw] lg:w-[320px]"
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

        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Video tiếp"
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 text-foreground backdrop-blur-sm hover:border-primary hover:text-primary opacity-0 transition-opacity group-hover:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" stroke="currentColor" />
          </svg>
        </button>
      </div>
    </section>
  );
}
