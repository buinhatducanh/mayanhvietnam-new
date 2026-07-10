import Link from 'next/link';
import { Truck, ShieldCheck, RotateCcw, CreditCard, ChevronRight, Star, Phone, Shield, Truck as TruckIcon, BadgeCheck, Zap } from 'lucide-react';
import { formatVND, calcDiscountPercent, cn } from '@/lib/utils';
import { REAL_CATEGORIES, REAL_BANNERS, REAL_ASSETS, REAL_PRODUCTS, productsByCategory } from '@/lib/real-products';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { reviews } from '@/lib/mock-data';
import type { RealProduct } from '@/lib/real-products';

const TRUST = [
  { icon: ShieldCheck, label: 'Bảo hành chính hãng', sub: '24 tháng toàn quốc' },
  { icon: Truck, label: 'Miễn phí vận chuyển', sub: 'Đơn từ 5 triệu' },
  { icon: RotateCcw, label: 'Thu cũ trợ giá', sub: 'Lên đến 30%' },
  { icon: CreditCard, label: 'Trả góp 0% lãi suất', sub: 'Qua thẻ tín dụng' },
];

const BRANDS_LOGOS = ['Canon', 'Sony', 'Nikon', 'Fujifilm', 'DJI', 'GoPro', 'Sigma', 'Tamron'];

const FEATURED_CATEGORIES = ['may-anh', 'flycam', 'action-camera', 'ong-kinh', 'may-quay-phim'] as const;

export default function HomePage() {
  const promoBanner1 = REAL_BANNERS.find((b) => b.title.includes('Sony A7V') || b.title.includes('Sony A7 V'));
  const promoBanner2 = REAL_BANNERS.find((b) => b.title.includes('Canon R6 III') || b.title.includes('R6 Mark III'));
  const r50 = REAL_PRODUCTS.find((p) => p.slug.includes('r50'));
  const discount5 = r50 ? calcDiscountPercent(r50.price, r50.originalPrice ?? r50.price) : 0;

  return (
    <>
      {/* ── HERO CAROUSEL ── */}
      <HeroCarousel />

      {/* ── TRUST STRIP — accent top border ── */}
      <section className="relative bg-background border-b border-border">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-card/60 border border-border/50 hover:border-primary/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <t.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground leading-tight">{t.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND LOGOS STRIP ── */}
      <section className="border-b border-border/50 bg-background">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-4">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3 text-center">
            Thương hiệu chính hãng
          </p>
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            {BRANDS_LOGOS.map((brand) => (
              <span key={brand} className="text-sm sm:text-base font-bold text-muted-foreground/40 hover:text-foreground/60 transition-colors cursor-default select-none">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── DANH MỤC — grid lớn hơn, gradient overlay ── */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-1">Phân loại</p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Danh mục sản phẩm</h2>
          </div>
          <Link href="/san-pham" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
            Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
          {REAL_CATEGORIES.filter((c) => !c.slug.startsWith('san-pham-')).map((cat) => (
            <Link
              key={cat.slug}
              href={`/danh-muc/${cat.slug}`}
              className="group relative flex flex-col items-center rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-foreground text-center leading-tight py-2.5 px-1">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED: MÁY ẢNH — wider cards ── */}
      <FeaturedSection catSlug="may-anh" layout="wide" />

      {/* ── PROMO BANNERS — giữa sections ── */}
      {(promoBanner1 || promoBanner2) && (
        <section className="mx-auto max-w-[1280px] px-4 sm:px-6 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(promoBanner1 || promoBanner2) && (
              <Link
                href={(promoBanner1 || promoBanner2)!.href}
                className="group relative aspect-[16/7] sm:aspect-[21/8] rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all"
              >
                <img src={(promoBanner1 || promoBanner2)!.image} alt={(promoBanner1 || promoBanner2)!.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1" style={{ color: '#FF6B35' }}>mayanhvietnam.com</p>
                  <p className="text-lg sm:text-xl font-bold text-white leading-tight">{(promoBanner1 || promoBanner2)!.title}</p>
                  <p className="text-xs text-white/70 mt-1">{(promoBanner1 || promoBanner2)!.subtitle}</p>
                </div>
              </Link>
            )}
            {r50 && (
              <Link
                href={`/san-pham/${r50.slug}`}
                className="group relative flex flex-col justify-between p-5 rounded-2xl border border-border/50 hover:border-primary/30 transition-all overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a0f00 0%, #0a0a0f 100%)' }}
              >
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold mb-3" style={{ background: 'rgba(255,107,53,0.15)', color: '#FF6B35' }}>
                    <Zap className="w-2.5 h-2.5" /> Giảm {discount5}%
                  </span>
                  <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2">{r50.name}</p>
                </div>
                <div>
                  <p className="price-mono text-xl font-black text-primary mt-3">{formatVND(r50.price)}</p>
                  {r50.originalPrice && (
                    <p className="price-strike text-xs mt-1">{formatVND(r50.originalPrice)}</p>
                  )}
                </div>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* ── FEATURED: FLYCAM ── */}
      <FeaturedSection catSlug="flycam" layout="standard" />

      {/* ── FEATURED: ACTION CAMERA ── */}
      <FeaturedSection catSlug="action-camera" layout="standard" />

      {/* ── FEATURED: ỐNG KÍNH ── */}
      <FeaturedSection catSlug="ong-kinh" layout="standard" />

      {/* ── FEATURED: MÁY QUAY ── */}
      <FeaturedSection catSlug="may-quay-phim" layout="compact" />

      {/* ── ĐÁNH GIÁ KHÁCH HÀNG ── */}
      {reviews.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-10">
          <div className="text-center mb-8">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-1">Khách hàng nói gì</p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Đánh giá từ người mua</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {reviews.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    {r.authorName[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{r.authorName}</p>
                    <p className="text-[10px] text-muted-foreground">{r.productPurchased}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={cn('w-3 h-3', i <= r.rating ? 'fill-primary text-primary' : 'text-border')} />
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">{r.comment}</p>
                {r.verified && (
                  <p className="text-[10px] text-primary font-semibold mt-2 flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> Đã mua hàng
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── VÌ SAO CHỌN CHÚNG TÔI ── */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-10">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-card/80 to-card p-8 sm:p-10">
          <div className="text-center mb-8">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-1">mayanhvietnam.com</p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Tại sao chọn chúng tôi?</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: '100% Chính hãng', desc: 'Cam kết sản phẩm chính hãng, có hóa đơn VAT và bảo hành toàn quốc.', color: '#00d4aa' },
              { icon: Headphones, title: 'Tư vấn chuyên sâu', desc: 'Đội ngũ nhiếp ảnh gia giàu kinh nghiệm tư vấn free.', color: '#5b9aff' },
              { icon: TruckIcon, title: 'Giao hàng nhanh', desc: 'Freeship đơn từ 5 triệu, hỗ trợ đổi trả 7 ngày.', color: '#00d4aa' },
              { icon: CreditCard, title: 'Trả góp linh hoạt', desc: 'Trả góp 0% lãi suất qua thẻ tín dụng, thủ tục nhanh gọn.', color: '#ffc107' },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                  style={{ background: `${f.color}15`, color: f.color }}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{f.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BỘ CÔNG THƯƠNG + PAYMENT ── */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 pb-10">
        <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={REAL_ASSETS.logoBCT} alt="Bộ Công Thương" className="h-14 w-auto shrink-0" />
            <div>
              <p className="text-sm font-bold text-foreground">Đã đăng ký Bộ Công Thương</p>
              <p className="text-[11px] text-muted-foreground">Website TMĐT chính thức • Giao dịch an toàn</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {REAL_ASSETS.paymentIcons.map((icon) => (
              <div key={icon} className="relative h-9 w-14 rounded-lg bg-background border border-border/50 overflow-hidden">
                <img src={icon} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-contain p-1.5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Reusable Featured Products Section ── */

function FeaturedSection({
  catSlug,
  layout = 'standard',
}: {
  catSlug: string;
  layout?: 'wide' | 'standard' | 'compact';
}) {
  const cat = REAL_CATEGORIES.find((c) => c.slug === catSlug);
  const products = productsByCategory(catSlug);
  if (!cat || products.length === 0) return null;

  const cols = layout === 'wide' ? 'lg:grid-cols-4' : layout === 'compact' ? 'lg:grid-cols-3' : 'lg:grid-cols-6';

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 pb-8">
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary/60 mb-1">{cat.name}</p>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Sản phẩm {cat.name}</h2>
        </div>
        <Link
          href={`/danh-muc/${catSlug}`}
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-3', cols)}>
        {products.map((p) => {
          const discount = calcDiscountPercent(p.price, p.originalPrice ?? p.price);
          return (
            <Link
              key={p.id}
              href={`/san-pham/${p.slug}`}
              className="group flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden hover:border-primary/25 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-elevated">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                {discount > 0 && (
                  <span className="absolute left-2.5 top-2.5 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold text-white" style={{ background: '#FF6B35' }}>
                    -{discount}%
                  </span>
                )}
              </div>
              <div className="p-3.5 flex flex-col flex-1">
                <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">
                  {p.brand}
                </p>
                <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug min-h-[2rem] group-hover:text-primary transition-colors">
                  {p.name}
                </p>
                <div className="mt-auto pt-2.5 flex items-baseline gap-1.5">
                  <span className="price-mono text-sm font-black text-primary">{formatVND(p.price)}</span>
                  {discount > 0 && p.originalPrice && (
                    <span className="price-strike text-[10px]">{formatVND(p.originalPrice)}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={cn('w-3 h-3', i <= 4 ? 'fill-primary text-primary' : 'text-border')} />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">4.{8 - (p.id.charCodeAt(0) % 4)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ── Small icon helper ── */
function Headphones(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function Truck2(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}