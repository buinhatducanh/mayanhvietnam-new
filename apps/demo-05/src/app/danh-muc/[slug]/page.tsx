import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Star } from 'lucide-react';
import { formatVND, calcDiscountPercent } from '@/lib/utils';
import { REAL_CATEGORIES, REAL_PRODUCTS, productsByCategory, REAL_ASSETS, findProductBySlug } from '@/lib/real-products';

export function generateStaticParams() {
  return REAL_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = REAL_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const products = productsByCategory(slug);

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{cat.name}</span>
      </nav>

      {/* Category cover banner */}
      <div className="relative aspect-[21/6] sm:aspect-[21/5] rounded-2xl overflow-hidden border border-border mb-6">
        <Image src={cat.image} alt={cat.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#FF6B35' }}>Danh mục</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{cat.name}</h1>
          <p className="text-sm text-white/80">
            {products.length > 0
              ? `${products.length} sản phẩm · Chính hãng · Bảo hành 24 tháng`
              : 'Chính hãng · Bảo hành 24 tháng · Trả góp 0%'}
          </p>
        </div>
      </div>

      {/* Trust row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {['Freeship đơn từ 5 triệu', 'Bảo hành chính hãng 24T', 'Trả góp 0% lãi suất', 'Thu cũ trợ giá 30%'].map((label) => (
          <div key={label} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-card border border-border text-xs font-semibold text-foreground">
            {label}
          </div>
        ))}
      </div>

      {/* Product grid */}
      {products.length > 0 ? (
        <>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-foreground">Sản phẩm {cat.name}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Hiển thị <span className="font-bold text-primary">{products.length}</span> sản phẩm
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((p) => {
              const discount = calcDiscountPercent(p.price, p.originalPrice ?? p.price);
              return (
                <Link key={p.id} href={`/san-pham/${p.slug}`} className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all">
                  <div className="relative aspect-square overflow-hidden bg-elevated">
                    <Image src={p.image} alt={p.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                    {discount > 0 && (
                      <span className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold text-white" style={{ background: '#FF6B35' }}>
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">{p.brand}</p>
                    <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight min-h-[2.5rem]">{p.name}</p>
                    <div className="mt-auto pt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="price-mono text-sm font-black">{formatVND(p.price)}</span>
                        {discount > 0 && p.originalPrice && <span className="price-strike text-[10px]">{formatVND(p.originalPrice)}</span>}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className={`w-3 h-3 ${i <= 4 ? 'fill-primary text-primary' : 'text-border'}`} />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">4.{8 - (p.id.charCodeAt(0) % 4)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg font-bold text-foreground mb-2">Sắp có hàng</p>
          <p className="text-sm text-muted-foreground mb-4">Sản phẩm {cat.name} sẽ sớm có mặt trên mayanhvietnam.com</p>
          <Link href="/san-pham" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Xem sản phẩm khác →
          </Link>
        </div>
      )}

      {/* Related: sản phẩm từ các danh mục khác */}
      <section className="mt-12 mb-8">
        <h2 className="text-lg font-bold text-foreground mb-5">Có thể bạn quan tâm</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {REAL_PRODUCTS.filter((p) => p.category !== slug).slice(0, 6).map((p) => (
            <Link key={p.id} href={`/san-pham/${p.slug}`} className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all">
              <div className="relative aspect-square overflow-hidden bg-elevated">
                <Image src={p.image} alt={p.name} fill sizes="16vw" className="object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <p className="text-[10px] font-mono font-bold uppercase text-muted-foreground">{p.brand}</p>
                <p className="text-xs font-medium text-foreground line-clamp-2 mt-1">{p.name}</p>
                <p className="price-mono text-sm font-black mt-1">{formatVND(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}