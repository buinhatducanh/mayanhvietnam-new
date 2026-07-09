import { ChevronRight } from 'lucide-react';
import { ShowcaseCard } from '@/components/product/showcase-card';
import { allProducts } from '@/lib/mock-data';

export function FeaturedProducts() {
  // Lấy sản phẩm nổi bật từ mock-data — slice 5 sản phẩm đầu
  const featured = allProducts.slice(0, 5);

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Bộ sưu tập
            </p>
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
            >
              Sản phẩm nổi bật
            </h2>
          </div>
          <a
            href="/san-pham"
            className="hidden items-center gap-1.5 text-xs font-medium text-primary transition-opacity hover:opacity-80 sm:flex"
          >
            Xem tất cả <ChevronRight className="h-3 w-3" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {featured.map((p) => (
            <ShowcaseCard
              key={p.id}
              id={p.id}
              slug={p.slug}
              name={p.name}
              brand={p.brand}
              category={p.category}
              price={p.price}
              originalPrice={p.originalPrice}
              rating={p.rating ? p.rating.average : undefined}
              reviews={p.rating ? p.rating.count : undefined}
              badge={p.badges?.[0]?.label as 'HOT' | 'NEW' | 'SALE' | null}
              image={p.thumbnail}
              href={`/san-pham/${p.slug}`}
            />
          ))}
        </div>

        {/* Mobile "view all" */}
        <div className="mt-5 flex justify-center sm:hidden">
          <a
            href="/san-pham"
            className="flex items-center gap-2 rounded-xl border px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:border-primary"
            style={{ borderColor: 'rgba(255,107,53,0.4)' }}
          >
            Xem tất cả <ChevronRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
