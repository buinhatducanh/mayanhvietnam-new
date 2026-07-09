'use client';

import { cn } from '@/lib/utils';

/* impeccable-disable design-system-color: Brand identity colors — real-world Canon/Sony/Nikon/DJI/Fujifilm/GoPro/Hasselblad/Leica/Sigma/Panasonic hex, cannot be replaced with studio palette */

// Brand partner data — logos rendered as styled typography (no external SVGs)
const BRANDS = [
  { name: 'Canon', color: '#c41818' },
  { name: 'Sony', color: '#003087' },
  { name: 'Nikon', color: '#f7c948' },
  { name: 'DJI', color: '#444' },
  { name: 'Fujifilm', color: '#006838' },
  { name: 'GoPro', color: '#0088cc' },
  { name: 'Hasselblad', color: '#1a1a1a' },
  { name: 'Leica', color: '#cc0000' },
  { name: 'Sigma', color: '#111' },
  { name: 'Panasonic', color: '#0038a8' },
];

// Duplicate set for seamless loop
const BRAND_SET = [...BRANDS, ...BRANDS];

export function BrandTicker() {
  return (
    <section
      className="relative border-b border-border bg-card overflow-hidden"
      aria-label="Thương hiệu đồng hành"
    >
      {/* Section label */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="flex items-center gap-4 py-4 border-b border-border">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
            Đối tác &amp; nhà cung cấp
          </p>
          <div className="flex-1 h-px bg-border" />
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap">
            Authorized Dealer
          </p>
        </div>
      </div>

      {/* Ticker row */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 sm:w-40"
          style={{
            background: 'linear-gradient(to right, var(--color-card, #12111a), transparent)',
          }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 sm:w-40"
          style={{
            background: 'linear-gradient(to left, var(--color-card, #12111a), transparent)',
          }}
        />

        {/* Scroll container */}
        <div className="brand-ticker-track flex items-center gap-8 sm:gap-14 py-5">
          {BRAND_SET.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="brand-ticker-item flex shrink-0 items-center gap-2.5 group"
            >
              {/* Brand logo mark */}
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${brand.color}18`, border: `1.5px solid ${brand.color}40` }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: brand.color }}
                >
                  {brand.name[0]}
                </span>
              </div>
              {/* Brand name */}
              <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap transition-colors duration-300 group-hover:text-foreground">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
