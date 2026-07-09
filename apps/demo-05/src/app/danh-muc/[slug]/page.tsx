import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { categories, allProducts } from '@/lib/mock-data';
import { MAYANH_IMAGES } from '@/lib/images';
import { formatVND, calcDiscountPercent } from '@/lib/utils';

const SLUG_TO_IMAGES: Record<string, readonly string[]> = {
  'may-anh': MAYANH_IMAGES.cameras,
  'ong-kinh': MAYANH_IMAGES.lenses,
  'flycam': MAYANH_IMAGES.drones,
  'action-camera': MAYANH_IMAGES.action,
  'thiet-bi-studio': MAYANH_IMAGES.studio,
  'may-quay-phim': MAYANH_IMAGES.cinema,
  'phu-kien': MAYANH_IMAGES.bags,
  'san-pham-cu': MAYANH_IMAGES.cameras,
  'lap-phong-studio': MAYANH_IMAGES.studio,
};

const PRODUCT_TITLES = [
  'Canon EOS R50 + Kit 18-45mm', 'Sony Alpha A7R VI', 'Sony A7 IV Body',
  'Nikon Zf Silver Body', 'Fujifilm X-H2S Body', 'Canon PowerShot V1',
  'Canon RF 24-70mm f/2.8L', 'Canon RF 70-200mm f/2.8L',
  'Sony FE 70-200mm f/2.8 GM II', 'Nikon Z 24-70mm f/2.8 S II',
  'Sigma 200mm f/2 DG OS', 'Canon RF 50mm f/1.8 STM',
];

const BRANDS: Record<string, string[]> = {
  'may-anh': ['Canon', 'Sony', 'Nikon', 'Fujifilm'],
  'ong-kinh': ['Canon RF', 'Sony FE', 'Nikon Z', 'Sigma', 'Tamron'],
  'flycam': ['DJI', 'Fimi'],
  'action-camera': ['GoPro', 'DJI', 'Insta360', 'Sony'],
  'thiet-bi-studio': ['Godox', 'Nanlite', 'Jinbei', 'Amaran'],
  'may-quay-phim': ['Sony', 'Canon', 'Blackmagic', 'Panasonic'],
  'phu-kien': ['Billingham'],
  'san-pham-cu': ['Sony', 'Canon', 'Nikon'],
  'lap-phong-studio': ['Godox', 'Nanlite'],
};

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const images = SLUG_TO_IMAGES[slug] ?? [];
  const brands = BRANDS[slug] ?? ['Canon', 'Sony', 'Nikon'];
  const cover = MAYANH_IMAGES.categories[slug as keyof typeof MAYANH_IMAGES.categories];

  const products = images.map((url, i) => ({
    id: `${slug}-${i}`,
    url,
    title: PRODUCT_TITLES[i % PRODUCT_TITLES.length],
    brand: brands[i % brands.length],
    price: 8000000 + (i * 1200000) + (i * 800000),
    originalPrice: 14000000 + (i * 2500000),
    rating: 4.5 + (i % 5) * 0.1,
    reviews: 12 + (i * 7),
  }));

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Category banner */}
      {cover && (
        <div className="relative aspect-[21/6] sm:aspect-[21/5] rounded-2xl overflow-hidden border border-border mb-6">
          <Image src={cover} alt={category.name} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#FF6B35' }}>Danh mục</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{category.name}</h1>
            <p className="text-sm text-white/80">{category.productCount} sản phẩm · Chính hãng · Bảo hành 24 tháng</p>
          </div>
        </div>
      )}

      {/* Trust row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Freeship đơn từ 5 triệu' },
          { label: 'Bảo hành chính hãng 24T' },
          { label: 'Trả góp 0% lãi suất' },
          { label: 'Thu cũ trợ giá 30%' },
        ].map((t) => (
          <div key={t.label} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-card border border-border text-xs font-semibold text-foreground">
            {t.label}
          </div>
        ))}
      </div>

      {/* Product grid */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">Sản phẩm {category.name}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Hiển thị <span className="font-bold text-primary">{products.length}</span> sản phẩm</p>
        </div>
        <Link href="/san-pham" className="text-xs font-semibold text-primary hover:underline">Xem dạng danh sách →</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((p) => {
          const discount = calcDiscountPercent(p.price, p.originalPrice);
          return (
            <Link key={p.id} href="/san-pham" className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all">
              <div className="relative aspect-square overflow-hidden bg-elevated">
                <Image src={p.url} alt={p.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                {discount > 0 && (
                  <span className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold text-white" style={{ background: '#FF6B35' }}>
                    -{discount}%
                  </span>
                )}
              </div>
              <div className="p-3 flex flex-col flex-1">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">{p.brand}</p>
                <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight min-h-[2.5rem]">{p.title}</p>
                <div className="mt-auto pt-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="price-mono text-sm font-black">{formatVND(p.price)}</span>
                    {discount > 0 && <span className="price-strike text-[10px]">{formatVND(p.originalPrice)}</span>}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{p.reviews} đánh giá</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}