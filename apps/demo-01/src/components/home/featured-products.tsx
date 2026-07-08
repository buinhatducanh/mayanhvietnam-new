import { ChevronRight } from 'lucide-react';
import { ShowcaseCard } from '@/components/product/showcase-card';

const PRODUCTS = [
  {
    id: 'p1',
    slug: 'canon-eos-r6-mark-ii',
    name: 'Canon EOS R6 Mark II',
    brand: 'Canon',
    category: 'Mirrorless',
    price: 49990000,
    originalPrice: 54900000,
    rating: 4.9,
    reviews: 312,
    badge: 'HOT' as const,
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop&auto=format',
    href: '/san-pham/canon-eos-r6-mark-ii',
  },
  {
    id: 'p2',
    slug: 'sony-a7-iv',
    name: 'Sony A7 IV',
    brand: 'Sony',
    category: 'Mirrorless',
    price: 64000000,
    originalPrice: null,
    rating: 4.8,
    reviews: 187,
    badge: 'NEW' as const,
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop&auto=format',
    href: '/san-pham/sony-a7-iv',
  },
  {
    id: 'p3',
    slug: 'canon-rf-24-70-f28l',
    name: 'Canon RF 24-70mm f/2.8L IS',
    brand: 'Canon',
    category: 'Lens',
    price: 73990000,
    originalPrice: 79000000,
    rating: 4.7,
    reviews: 94,
    badge: null,
    image:
      'https://images.unsplash.com/photo-1606986628253-d3bd1d2d0e9c?w=400&h=400&fit=crop&auto=format',
    href: '/san-pham/canon-rf-24-70-f28l',
  },
  {
    id: 'p4',
    slug: 'sony-fe-200-600',
    name: 'Sony FE 200-600mm f/5.6-6.3G',
    brand: 'Sony',
    category: 'Lens',
    price: 47000000,
    originalPrice: 52000000,
    rating: 4.8,
    reviews: 63,
    badge: 'SALE' as const,
    image:
      'https://images.unsplash.com/photo-1573868396651-ca8a5fca84f6?w=400&h=400&fit=crop&auto=format',
    href: '/san-pham/sony-fe-200-600',
  },
  {
    id: 'p5',
    slug: 'dji-mini-pro-4',
    name: 'DJI Mini Pro 4',
    brand: 'DJI',
    category: 'Flycam',
    price: 20990000,
    originalPrice: null,
    rating: 4.6,
    reviews: 241,
    badge: 'NEW' as const,
    image:
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop&auto=format',
    href: '/san-pham/dji-mini-pro-4',
  },
];

export function FeaturedProducts() {
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
              className="text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sản phẩm nổi bật
            </h2>
          </div>
          <a
            href="/san-pham"
            className="hidden items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80 sm:flex"
            style={{ color: '#FF6B35' }}
          >
            Xem tất cả <ChevronRight className="h-3 w-3" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {PRODUCTS.map((p) => (
            <ShowcaseCard key={p.id} {...p} />
          ))}
        </div>

        {/* Mobile "view all" */}
        <div className="mt-5 flex justify-center sm:hidden">
          <a
            href="/san-pham"
            className="flex items-center gap-2 rounded-xl border px-6 py-2.5 text-sm font-medium transition-colors hover:border-primary"
            style={{ color: '#FF6B35', borderColor: 'rgba(255,107,53,0.4)' }}
          >
            Xem tất cả <ChevronRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}