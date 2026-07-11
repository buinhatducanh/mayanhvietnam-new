/**
 * Dãy thương hiệu chính hãng — giống mayanhvietnam.com
 */

const BRANDS = ['Canon', 'Sony', 'Nikon', 'Fujifilm', 'DJI', 'GoPro', 'Sigma', 'Tamron', 'Viltrox', 'Kase'];

export function BrandStrip() {
  return (
    <section className="border-b border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <p className="mb-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Thương hiệu chính hãng
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="cursor-default select-none text-sm font-bold text-muted-foreground/40 transition-colors hover:text-foreground/60 sm:text-base"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
