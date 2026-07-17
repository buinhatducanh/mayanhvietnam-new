'use client';

import { useRef } from 'react';

/**
 * YouTube Shorts — section bổ sung bên dưới REVIEWS SẢN PHẨM
 * Hiển thị các short video TikTok-style dạng iframe 9:16 carousel
 */

const SHORTS = [
  { id: '7592485223573507335', title: 'Đánh giá Sony A7 Mark V' },
  { id: '7582111209424653576', title: 'Khám phá Sony A7C2' },
  { id: '7362785365398146311', title: 'Trải nghiệm shop MTVN' },
  { id: '7635980890610421010', title: 'Sony + Nikon Adapter' },
];

/** TikTok icon */
function TikTokIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.6 5.6a4.8 4.8 0 0 1-3.2-3.2h-3.4v12.4a2.6 2.6 0 1 1-1.9-2.5V8.8A5.9 5.9 0 1 0 6.1 15a6 6 0 0 0 .5-2.4V8.6a4.8 4.8 0 0 0 3 1V6a4.8 4.8 0 0 1 0-.4z" />
    </svg>
  );
}

export function YouTubeShorts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: dir * w * 0.4, behavior: 'smooth' });
  };

  return (
    <section
      aria-label="Video short"
      className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-background">
            <TikTokIcon />
          </span>
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">SHORT VIDEO</h2>
            <p className="text-xs text-muted-foreground">Từ TikTok @mayanhvietnam</p>
          </div>
        </div>
        <a
          href="https://www.tiktok.com/@mayanhvietnam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
          style={{ color: '#ff6a00' }}
        >
          Xem thêm
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9.71 18.293c.39.39 1.024.39 1.414 0l4.888-4.892c.78-.781.78-2.047 0-2.828l-4.888-4.889a1.003 1.003 0 0 0-1.414 1.414l4.185 4.186-4.185 4.186a1.003 1.003 0 0 0 0 1.414z"
              fill="#ff6a00"
            />
          </svg>
        </a>
      </div>

      {/* Carousel ngang — Shorts dạng 9:16 */}
      <div className="group relative">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Short trước"
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 text-foreground backdrop-blur-sm hover:border-primary hover:text-primary opacity-0 transition-opacity group-hover:opacity-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" stroke="currentColor" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SHORTS.map((v) => (
            <a
              key={v.id}
              href={`https://www.tiktok.com/@mayanhvietnam/video/${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/short shrink-0 snap-start overflow-hidden rounded-[20px] border border-border bg-card hover:border-primary/40 transition-colors w-[42vw] max-w-[180px] sm:w-[160px] sm:max-w-none"
              style={{ aspectRatio: '9 / 16' }}
            >
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover/short:opacity-100" />
                <span className="absolute right-3 top-3 inline-flex size-7 items-center justify-center rounded-full bg-foreground text-background">
                  <TikTokIcon />
                </span>
                <span className="text-3xl">▶</span>
                <p className="text-sm font-bold leading-snug">{v.title}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  TikTok
                </p>
              </div>
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Short tiếp"
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 text-foreground backdrop-blur-sm hover:border-primary hover:text-primary opacity-0 transition-opacity group-hover:opacity-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" stroke="currentColor" />
          </svg>
        </button>
      </div>
    </section>
  );
}
