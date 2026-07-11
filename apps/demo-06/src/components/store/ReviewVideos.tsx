"use client";
import { useRef } from "react";
import { reviewVideos } from "@/lib/data";

export default function ReviewVideos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: 1 | -1) => {
    if (!scrollRef.current) return;
    const cardW = scrollRef.current.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 320;
    scrollRef.current.scrollBy({ left: dir * (cardW + 16), behavior: "smooth" });
  };

  return (
    <section className="bg-zinc-950 py-14 px-0 overflow-hidden">
      {/* ─── Header ─── */}
      <div className="max-w-[1440px] mx-auto px-6 mb-10">
        <div className="flex items-end justify-between gap-4">
          {/* Left — tiêu đề + icon YouTube */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
              Reviews sản phẩm
            </h2>
            {/* YouTube play icon — giống SVG gốc */}
            <svg
              className="flex-shrink-0"
              fill="none"
              width="32"
              height="40"
              viewBox="0 0 87 115"
            >
              <path
                clipRule="evenodd"
                d="M83.99 10.81C90.08 21.24 86.62 34.66 76.26 40.79L69.05 45.06L74.17 47.38C81.58 50.74 86.52 57.99 86.96 66.17C87.40 74.34 83.27 82.09 76.26 86.24L32.76 111.97C22.41 118.10 9.08 114.61 3.00 104.18C-3.08 93.75 .37 80.33 10.73 74.20L17.94 69.93L12.82 67.61C5.41 64.25 .47 57.00 .03 48.82C-0.40 40.65 3.72 32.90 10.73 28.75L54.23 3.02C64.58 -3.10 77.91 .38 83.99 10.81Z"
                fill="#f00"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d="M33 74L33 41L61 57.5L33 74Z"
                fill="#fff"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* Right — link YouTube */}
          <a
            href="https://www.youtube.com/@mayanhvietnam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
          >
            Xem youtube
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.71 18.293c.39.39 1.024.39 1.414 0l4.888-4.892c.78-.781.78-2.047 0-2.828l-4.888-4.889a1.003 1.003 0 00-1.414 1.414l4.185 4.186-4.185 4.186a1.003 1.003 0 000 1.414z"
                fill="#ff6a00"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* ─── Carousel (giống layout-previews-gp gốc) ─── */}
      <div className="relative max-w-[1440px] mx-auto px-6">
        {/* Arrow trước */}
        <button
          onClick={() => scrollCarousel(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700 text-white hover:bg-orange-500 hover:border-orange-500 transition-all flex items-center justify-center shadow-lg"
          aria-label="Video trước"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Arrow tiếp */}
        <button
          onClick={() => scrollCarousel(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700 text-white hover:bg-orange-500 hover:border-orange-500 transition-all flex items-center justify-center shadow-lg"
          aria-label="Video tiếp"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scrollable video strip */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
          style={{ touchAction: "pan-x", overscrollBehavior: "contain" }}
          role="region"
          aria-label="Video carousel"
        >
          {reviewVideos.map((video) => (
            <div
              key={video.youtubeId}
              className="flex-shrink-0 snap-center w-[85vw] sm:w-[70vw] md:w-[45vw] lg:w-[32vw] aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
            >
              <iframe
                src={video.embedUrl}
                title={video.title}
                className="w-full h-full border-0 rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ touchAction: "pan-y" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
