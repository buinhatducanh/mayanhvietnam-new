"use client";

import { useRef } from "react";

// Video IDs thật từ kênh YouTube Máy Ảnh Việt Nam
const VIDEOS = [
  { id: "z9hJFwVLS4A", title: "Review Fujifilm X-H2S" },
  { id: "BIUttXDonuo", title: "Chị khách xinh ghé shop Tiền Giang chốt Canon R50" },
  { id: "jz42ostc6K8", title: "Cầm 200 triệu đi mua máy ảnh là cảm" },
  { id: "i5wmKTdzJHo", title: "Khách ghé shop chốt Lumix S5 II & đập hộp tại chỗ" },
  { id: "xdoZXGbUQJE", title: "Review Kase 85mm f/1.4 RF" },
  { id: "v2oxxlfzsBM", title: "Canon R50 — Trải nghiệm nhanh" },
];

function YouTubePlayIcon() {
  return (
    <svg fill="none" height="28px" viewBox="0 0 87 115" width="22px">
      <path
        clipRule="evenodd"
        d="M83.99 10.81C90.08 21.24 86.62 34.66 76.26 40.79L69.05 45.06L74.17 47.38C81.58 50.74 86.52 57.99 86.96 66.17C87.40 74.34 83.27 82.09 76.26 86.24L32.76 111.97C22.41 118.10 9.08 114.61 3.00 104.18C-3.08 93.75 .37 80.33 10.73 74.20L17.94 69.93L12.82 67.61C5.41 64.25 .47 57.00 .03 48.82C-0.40 40.65 3.72 32.90 10.73 28.75L54.23 3.02C64.58 -3.10 77.91 .38 83.99 10.81Z"
        fill="#f00"
        fillRule="evenodd"
      />
      <path clipRule="evenodd" d="M33 74L33 41L61 57.5L33 74Z" fill="white" fillRule="evenodd" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none">
      <path d="M9.71 18.29a1 1 0 001.41 0l4.89-4.89a1.25 1.25 0 000-1.77L11.12 6.74a1 1 0 00-1.41 1.41l4.19 4.19a.25.25 0 010 .35l-4.19 4.19a1 1 0 000 1.41z" fill="currentColor" />
    </svg>
  );
}

export default function YouTubeReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: dir * w * 0.6, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-10 border-t border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <YouTubePlayIcon />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">REVIEWS SẢN PHẨM</h2>
        </div>
        <a
          href="https://www.youtube.com/@mayanhvietnam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:opacity-80 transition-opacity"
        >
          Xem youtube
          <ArrowIcon />
        </a>
      </div>

      {/* Video carousel */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 no-scrollbar"
        >
          {VIDEOS.map((v) => (
            <div
              key={v.id}
              className="shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] snap-start rounded-2xl overflow-hidden bg-black"
              style={{ aspectRatio: "16 / 9" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${v.id}?vq=hd1080&rel=0`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "16px" }}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}
