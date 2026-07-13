"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryBanner {
  title: string;
  image: string;
  href: string;
}

interface Props {
  banners: CategoryBanner[];
}

/** Carousel banner nhỏ — giống bannerSileSmall-2 mayanhvietnam.com (3 banner/trang, tự scroll, dots + arrows). */
export function SmallBannerCarousel({ banners }: Props) {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalPages = Math.ceil(banners.length / 3);

  const next = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);
  const prev = useCallback(
    () => setPage((p) => (p - 1 + totalPages) % totalPages),
    [totalPages],
  );

  useEffect(() => {
    if (paused || totalPages <= 1) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next, totalPages]);

  if (banners.length === 0) return null;

  return (
    <div
      className="relative group/banner overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${page * (100 / 3)}%)`,
          willChange: "transform",
        }}
      >
        {banners.map((b) => (
          <div key={b.title} className="shrink-0 w-full sm:w-1/3 px-1.5">
            <Link href={b.href} className="block overflow-hidden rounded-xl bg-black">
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="w-full h-auto object-contain hover:opacity-90 transition-opacity"
                style={{ aspectRatio: "1305 / 435" }}
              />
            </Link>
          </div>
        ))}
      </div>

      {banners.length > 3 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover/banner:opacity-100 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover/banner:opacity-100 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === page
                  ? "w-5 h-1.5 bg-orange-500"
                  : "w-1.5 h-1.5 bg-zinc-400/30 hover:bg-zinc-400/50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}