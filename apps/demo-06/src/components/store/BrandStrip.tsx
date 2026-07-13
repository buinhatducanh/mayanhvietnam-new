/**
 * Dãy thương hiệu chính hãng — giống demo-05 landing
 */
const BRANDS = ['Canon', 'Sony', 'Nikon', 'Fujifilm', 'DJI', 'GoPro', 'Sigma', 'Tamron', 'Viltrox', 'Kase'];

export default function BrandStrip() {
  return (
    <section className="bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-[1440px] mx-auto px-6 py-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-3 text-center">
          Thương hiệu chính hãng
        </p>
        <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="text-sm sm:text-base font-bold text-zinc-500 hover:text-zinc-200 transition-colors cursor-default select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
