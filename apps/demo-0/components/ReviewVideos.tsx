"use client";

import { useRef } from "react";

const VIDEOS = [
  { id: "z9hJFwVLS4A", title: "X-H2S — Quay Slow-motion 4K 120fps" },
  { id: "BIUttXDonuo", title: "Chị khách xinh ghé shop Tiền Giang chốt ngay Canon R50" },
  { id: "jz42ostc6K8", title: "Cầm 200 triệu đi mua máy ảnh là cảm giác gì?" },
  { id: "i5wmKTdzJHo", title: "Khách ghé shop — Chốt luôn Lumix S5 II & đập hộp tại chỗ" },
  { id: "xdoZXGbUQJE", title: "KASE 85mm f/1.4 RF — Đánh giá chi tiết" },
  { id: "v2oxxlfzsBM", title: "Canon R50 — Trải nghiệm thực tế cho người mới" },
];

function YouTubeBadge() {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ff0000] shadow-[0_4px_14px_rgba(255,0,0,0.25)] shrink-0">
      <svg fill="white" width="18" height="18" viewBox="0 0 24 24">
        <path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418A2.506 2.506 0 0 0 2.418 6.186C2 7.746 2 12 2 12s0 4.254.418 5.814a2.506 2.506 0 0 0 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.506 2.506 0 0 0 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z" />
      </svg>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
        fill="#ff6a00"
      />
    </svg>
  );
}

export default function ReviewVideos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: dir * w * 0.6, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <YouTubeBadge />
          <div className="flex flex-col">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#ff6a00]">Video</span>
            <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#16130f] tracking-tight leading-tight">
              REVIEW SẢN PHẨM TỪ KHÁCH HÀNG
            </h2>
          </div>
        </div>
        <a
          href="https://www.youtube.com/@mayanhvietnam"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 text-[13.5px] font-bold text-[#ff6a00] no-underline transition-colors hover:text-[#ea5e00]"
        >
          Xem thêm trên YouTube
          <span className="transition-transform group-hover:translate-x-0.5">
            <ArrowIcon />
          </span>
        </a>
      </div>

      {/* Video carousel */}
      <div className="relative group/carousel">
        {/* Prev button */}
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Video trước"
          className="absolute left-[-18px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-[#e9e6e1] shadow-[0_4px_14px_rgba(22,19,15,0.08)] flex items-center justify-center text-[#16130f] hover:text-[#ff6a00] hover:border-[#ff6a00] transition-all opacity-0 group-hover/carousel:opacity-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {VIDEOS.map((v) => (
            <div
              key={v.id}
              className="group shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] snap-start rounded-2xl overflow-hidden bg-[#16130f] border border-[#e9e6e1] hover:border-[#ff6a00] hover:shadow-[0_12px_30px_-10px_rgba(255,106,0,0.25)] transition-all duration-300"
              style={{ aspectRatio: "16 / 9" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              />
            </div>
          ))}
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Video tiếp"
          className="absolute right-[-18px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-[#e9e6e1] shadow-[0_4px_14px_rgba(22,19,15,0.08)] flex items-center justify-center text-[#16130f] hover:text-[#ff6a00] hover:border-[#ff6a00] transition-all opacity-0 group-hover/carousel:opacity-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}