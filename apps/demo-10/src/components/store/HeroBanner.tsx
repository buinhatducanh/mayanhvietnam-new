"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { banners } from "@/data/store";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  if (banners.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: "clamp(280px, 50vw, 560px)" }}>
      {banners.map((banner, idx) => (
        <Link
          key={banner.name}
          href={banner.link}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={banner.image} alt={banner.name} className="w-full h-full object-cover object-center" />
        </Link>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none z-20" />
      {/* Arrows */}
      <button onClick={() => goTo((current - 1 + banners.length) % banners.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors" aria-label="Trước">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={() => goTo((current + 1) % banners.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors" aria-label="Sau">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {banners.map((_, idx) => (
          <button key={idx} onClick={() => goTo(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? "bg-white w-8" : "bg-white/40 w-1.5 hover:bg-white/60"}`} aria-label={`Slide ${idx + 1}`} />
        ))}
      </div>
    </section>
  );
}
