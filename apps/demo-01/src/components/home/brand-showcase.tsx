import Link from 'next/link';
import { allProducts, categories } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

/* impeccable-disable design-system-color: Brand identity colors — real-world Canon/Sony/Nikon/DJI/GoPro/Fuji hex, cannot be replaced with studio palette */

// Các thương hiệu chính — màu nhận diện thương hiệu thật
const BRANDS = [
  { name: 'Canon', slug: 'canon', color: '#c41818' },
  { name: 'Sony', slug: 'sony', color: '#003087' },
  { name: 'Nikon', slug: 'nikon', color: '#f7c948' },
  { name: 'DJI', slug: 'dji', color: '#333333' },
  { name: 'GoPro', slug: 'gopro', color: '#0088cc' },
  { name: 'Fujifilm', slug: 'fujifilm', color: '#1a1a1a' },
];

// Đếm sản phẩm theo brand
function getBrandCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of allProducts) {
    const key = p.brand.toLowerCase();
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

export function BrandShowcase() {
  const counts = getBrandCounts();

  return (
    <section className="py-10 sm:py-14 bg-card/40">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Header */}
        <div className="mb-7 text-center">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Đối tác chính hãng
          </p>
          <h2
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Thương hiệu uy tín
          </h2>
        </div>

        {/* Brand cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
          {BRANDS.map((brand) => {
            const count = counts[brand.slug] ?? 0;
            return (
              <Link
                key={brand.slug}
                href={`/san-pham?q=${encodeURIComponent(brand.name)}`}
                className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/40 hover:shadow-lg"
              >
                {/* Brand initial as icon */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold text-white transition-transform group-hover:scale-110"
                  style={{ background: brand.color }}
                >
                  {brand.name[0]}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">{brand.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {count > 0 ? `${count} sản phẩm` : 'Sắp có'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.slug}
              href={`/danh-muc/${cat.slug}`}
              className="flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="ml-0.5 text-[10px] text-muted-foreground">({cat.productCount}+)</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
