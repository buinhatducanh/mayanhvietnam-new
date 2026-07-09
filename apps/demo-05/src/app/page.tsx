import Link from 'next/link';
import Image from 'next/image';
import { Truck, ShieldCheck, RotateCcw, CreditCard, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { categories, allProducts } from '@/lib/mock-data';
import { MAYANH_IMAGES } from '@/lib/images';
import { formatVND, calcDiscountPercent } from '@/lib/utils';

const TRUST = [
  { icon: Truck, label: 'Freeship đơn từ 5 triệu' },
  { icon: ShieldCheck, label: 'Bảo hành chính hãng 24 tháng' },
  { icon: RotateCcw, label: 'Thu cũ trợ giá 30%' },
  { icon: CreditCard, label: 'Trả góp 0% lãi suất' },
];

const CATEGORY_IMAGES: Record<string, string> = {
  'may-anh': MAYANH_IMAGES.categories['may-anh'],
  'ong-kinh': MAYANH_IMAGES.categories['ong-kinh'],
  'san-pham-cu': MAYANH_IMAGES.categories['san-pham-cu'],
  'lap-phong-studio': MAYANH_IMAGES.categories['lap-phong-studio'],
  'action-camera': MAYANH_IMAGES.categories['action-camera'],
  'flycam': MAYANH_IMAGES.categories['flycam'],
  'thiet-bi-studio': MAYANH_IMAGES.categories['thiet-bi-studio'],
  'phu-kien': MAYANH_IMAGES.categories['phu-kien'],
  'may-quay-phim': MAYANH_IMAGES.categories['may-quay-phim'],
};

// Featured grids — mỗi category lấy từ mayanhvietnam URLs
const FEATURED_BY_SLUG = {
  'may-anh': MAYANH_IMAGES.cameras,
  'ong-kinh': MAYANH_IMAGES.lenses,
  'flycam': MAYANH_IMAGES.drones,
  'action-camera': MAYANH_IMAGES.action,
  'thiet-bi-studio': MAYANH_IMAGES.studio,
  'may-quay-phim': MAYANH_IMAGES.cinema,
  'phu-kien': MAYANH_IMAGES.bags,
} as const;

const PRODUCT_TITLES = [
  'Canon EOS R50 + Kit 18-45mm',
  'Sony Alpha A7R VI',
  'Sony A7 IV Body',
  'Nikon Zf Silver Body',
  'Fujifilm X-H2S Body',
  'Canon PowerShot V1',
  'Canon RF 24-70mm f/2.8L IS USM',
  'Canon RF 70-200mm f/2.8L IS USM',
  'Sony FE 70-200mm f/2.8 GM II',
  'Nikon Z 24-70mm f/2.8 S II',
  'Sigma 200mm f/2 DG OS Sports',
  'Canon RF 50mm f/1.8 STM',
  'DJI Mavic 4 Pro Creator Combo',
  'DJI Mini 5 Pro Base',
  'DJI Air 3S Fly More Combo',
  'DJI Neo',
  'DJI Avata 2 Fly More Combo',
  'DJI Osmo Action 5 Pro Adventure',
  'GoPro Hero 13 Black',
  'DJI Osmo Pocket 4 Creator Combo',
  'Insta360 X4',
  'Godox LA200D Daylight',
  'Nanlite FC-300B Bi-Color',
  'Nanlite Compac 100',
  'Sony FX3 II',
  'Blackmagic BMPCC 6K Pro',
  'Viltrox Cinemaster V',
  'Billingham 335 MKII Black',
  'Billingham 335 MKII Navy',
  'Billingham 207 Khaki',
];

export default function HomePage() {
  const heroProduct = allProducts[0];
  const heroDiscount = calcDiscountPercent(heroProduct.price, heroProduct.originalPrice);

  // Build danh sách ảnh sản phẩm cho từng category (kết hợp mock-data prices với ảnh thật)
  const featuredByCategory = (slug: keyof typeof FEATURED_BY_SLUG) => {
    const images = FEATURED_BY_SLUG[slug] ?? [];
    return images.map((url, i) => ({
      id: `${slug}-${i}`,
      url,
      title: PRODUCT_TITLES[i % PRODUCT_TITLES.length],
      price: 5000000 + (i * 1500000) + Math.floor(Math.random() * 8000000),
      originalPrice: 12000000 + (i * 2000000) + Math.floor(Math.random() * 6000000),
      brand: slug === 'may-anh' ? ['Canon', 'Sony', 'Nikon', 'Fujifilm'][i % 4]
           : slug === 'ong-kinh' ? ['Canon RF', 'Sony FE', 'Nikon Z', 'Sigma'][i % 4]
           : slug === 'flycam' ? 'DJI'
           : slug === 'action-camera' ? ['GoPro', 'DJI', 'Insta360'][i % 3]
           : slug === 'thiet-bi-studio' ? ['Godox', 'Nanlite'][i % 2]
           : slug === 'may-quay-phim' ? ['Sony', 'Blackmagic', 'Viltrox'][i % 3]
           : 'Billingham',
    }));
  };

  return (
    <>
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Banner chính — chiếm 2 cột */}
            <Link href="/danh-muc/may-anh" className="relative lg:col-span-2 aspect-[16/9] lg:aspect-[16/8] rounded-2xl overflow-hidden border border-border group">
              <Image
                src={MAYANH_IMAGES.banners.km1200x400}
                alt="Sản phẩm khuyến mãi"
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#FF6B35' }}>Khuyến mãi đặc biệt</p>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">Trả góp 0% lãi suất · Thu cũ trợ giá 30%</h2>
                <p className="text-sm text-white/80">Áp dụng toàn bộ máy ảnh Canon, Sony, Nikon, Fujifilm</p>
              </div>
            </Link>

            {/* Banner phụ — 1 cột */}
            <Link href="/san-pham/canon-eos-r50-kit-18-45mm" className="relative aspect-square lg:aspect-auto rounded-2xl overflow-hidden border border-border group">
              <Image
                src={MAYANH_IMAGES.banners.eosR50}
                alt="Canon EOS R50"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1" style={{ color: '#FF6B35' }}>Sản phẩm nổi bật</p>
                <p className="text-base font-bold leading-tight">Canon EOS R50 + Kit 18-45mm</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <t.icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-foreground">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Danh mục sản phẩm</h2>
          <Link href="/san-pham" className="text-xs font-semibold text-primary hover:underline">Xem tất cả</Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {categories.map((cat) => {
            const img = CATEGORY_IMAGES[cat.slug];
            return (
              <Link
                key={cat.slug}
                href={`/danh-muc/${cat.slug}`}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:-translate-y-0.5 transition-all"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-elevated">
                  {img && (
                    <Image
                      src={img}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 1024px) 33vw, 11vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                <p className="text-[11px] font-semibold text-foreground text-center leading-tight line-clamp-2">{cat.name}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── FEATURED BY CATEGORY ── */}
      {(Object.keys(FEATURED_BY_SLUG) as Array<keyof typeof FEATURED_BY_SLUG>).map((slug) => {
        const items = featuredByCategory(slug);
        const cat = categories.find((c) => c.slug === slug);
        if (!cat || items.length === 0) return null;
        return (
          <section key={slug} className="mx-auto max-w-[1280px] px-4 sm:px-6 pb-10">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">{cat.name}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{cat.productCount} sản phẩm</p>
              </div>
              <Link href={`/danh-muc/${slug}`} className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {items.map((item) => {
                const discount = calcDiscountPercent(item.price, item.originalPrice);
                return (
                  <Link key={item.id} href={`/danh-muc/${slug}`} className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all">
                    <div className="relative aspect-square overflow-hidden bg-elevated">
                      <Image src={item.url} alt={item.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" className="object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                      {discount > 0 && (
                        <span className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold text-white" style={{ background: '#FF6B35' }}>
                          -{discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">{item.brand}</p>
                      <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight min-h-[2rem]">{item.title}</p>
                      <div className="mt-auto pt-2 flex items-baseline gap-1.5">
                        <span className="price-mono text-sm font-black">{formatVND(item.price)}</span>
                        {discount > 0 && <span className="price-strike text-[10px]">{formatVND(item.originalPrice)}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* ── PAYMENT + BCT ── */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 pb-10">
        <div className="rounded-2xl bg-card border border-border p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image src={MAYANH_IMAGES.logoBCT} alt="Bộ Công Thương" width={64} height={64} className="h-16 w-auto" />
            <div>
              <p className="text-sm font-bold text-foreground">Đã đăng ký Bộ Công Thương</p>
              <p className="text-xs text-muted-foreground">Hoạt động chính thức tại Việt Nam</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {MAYANH_IMAGES.paymentIcons.map((icon) => (
              <div key={icon} className="relative h-8 w-12 rounded-md bg-background border border-border overflow-hidden">
                <Image src={icon} alt="" fill sizes="48px" className="object-contain p-1" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}