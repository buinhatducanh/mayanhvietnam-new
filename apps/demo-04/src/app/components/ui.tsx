'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Heart } from "lucide-react";
import { ACCENT, vnd, type Product } from "@/app/data";
import { useTheme } from "@/app/context";

export const BADGE_BG: Record<string, string> = { HOT: "#ef4444", NEW: "#3b82f6", SALE: "#22c55e" };

export function Stars({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size}
          fill={i <= Math.round(rating) ? ACCENT : "none"}
          style={{ color: ACCENT }} />
      ))}
    </div>
  );
}

export function Chip({ label }: { label: string }) {
  return (
    <span className="text-white text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded-sm"
      style={{ background: BADGE_BG[label] ?? ACCENT }}>
      {label}
    </span>
  );
}

export function SectionHeader({ eyebrow, title, link, onLink }: { eyebrow: string; title: string; link?: string; onLink?: () => void }) {
  return (
    <div className="flex items-end justify-between mb-7">
      <div>
        <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-1.5">{eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      {link && (
        <button onClick={onLink} className="hidden sm:flex items-center gap-1.5 text-xs font-semibold hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>
          {link} <span style={{ fontSize: 13 }}>›</span>
        </button>
      )}
    </div>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const [hov, setHov] = useState(false);
  const { dark } = useTheme();
  const router = useRouter();
  const disc = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => router.push(`/san-pham/${p.id}`)}
      className="rounded-2xl overflow-hidden border border-border bg-card cursor-pointer transition-all duration-300 flex flex-col"
      style={hov ? {
        borderColor: "rgba(255,107,53,0.5)",
        boxShadow: dark ? "0 0 32px rgba(255,107,53,0.13)" : "0 8px 32px rgba(255,107,53,0.11)",
        transform: "translateY(-3px)",
      } : {}}>
      <div className="relative overflow-hidden bg-muted" style={{ paddingBottom: "72%" }}>
        <img src={p.img} alt={p.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          style={hov ? { transform: "scale(1.07)" } : {}} />
        <div className="absolute top-2.5 left-2.5 flex gap-1">
          {p.badge && <Chip label={p.badge} />}
          {disc && <Chip label={`-${disc}%`} />}
        </div>
        <button
          onClick={e => e.stopPropagation()}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-background/75 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 hover:!opacity-100 transition-opacity">
          <Heart size={11} />
        </button>
      </div>
      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
        <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">{p.brand}</p>
        <h3 className="text-xs font-semibold leading-snug line-clamp-2 flex-1">{p.name}</h3>
        <div className="flex items-center gap-1.5">
          <Stars rating={p.rating} />
          <span className="text-[10px] font-mono text-muted-foreground">({p.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono font-bold text-sm" style={{ color: ACCENT }}>{vnd(p.price)}</span>
          {p.originalPrice && (
            <span className="text-[10px] font-mono text-muted-foreground line-through">{vnd(p.originalPrice)}</span>
          )}
        </div>
        <button className="mt-1 w-full py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 active:scale-95 transition-all"
          style={{ background: ACCENT }}>
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
