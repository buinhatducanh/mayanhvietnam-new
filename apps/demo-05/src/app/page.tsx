import Link from 'next/link';
import { Truck, ShieldCheck, RotateCcw, CreditCard, ChevronRight, Star } from 'lucide-react';
import { formatVND, cn } from '@/lib/utils';
import { REAL_CATEGORIES, REAL_ASSETS, productsByCategory, CATEGORY_BANNERS } from '@/lib/real-products';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategorySection } from '@/components/home/CategorySection';
import { YouTubeReviews } from '@/components/home/YouTubeReviews';
import { reviews } from '@/lib/mock-data';

const TRUST = [
  { icon: ShieldCheck, label: 'Bảo hành chính hãng', sub: '24 tháng toàn quốc' },
  { icon: Truck, label: 'Miễn phí vận chuyển', sub: 'Đơn từ 5 triệu' },
  { icon: RotateCcw, label: 'Thu cũ trợ giá', sub: 'Lên đến 30%' },
  { icon: CreditCard, label: 'Trả g��p 0% lãi suất', sub: 'Qua thẻ tín dụng' },
];

const BRANDS_LOGOS = ['Canon', 'Sony', 'Nikon', 'Fujifilm', 'DJI', 'GoPro', 'Sigma', 'Tamron'];

// Category sections theo đúng pattern mayanhvietnam.com
const SECTION_SLUGS = ['may-anh', 'ong-kinh', 'flycam', 'action-camera', 'may-quay-phim', 'thiet-bi-studio'] as const;

export default function HomePage() {
  return (
    <>
      {/* ── HERO CAROUSEL ── */}
      <HeroCarousel />

      {/* ── TRUST STRIP ── */}
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

      {/* ── BRAND LOGOS ── */}
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

      {/* ── DANH MỤC GRID ── */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 rounded-full bg-primary" />
          <h2 className="text-xl font-bold text-foreground">Danh mục sản phẩm</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
          {REAL_CATEGORIES.filter((c) => !c.slug.startsWith('san-pham-')).map((cat) => (
            <Link
              key={cat.slug}
              href={`/danh-muc/${cat.slug}`}
              className="group relative flex flex-col items-center rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <img src={cat.image} alt={cat.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-foreground text-center leading-tight py-2.5 px-1">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CATEGORY SECTIONS — mỗi category có banner carousel riêng ── */}
      {SECTION_SLUGS.map((slug) => (
        <CategorySection key={slug} catSlug={slug} showBanner={!!CATEGORY_BANNERS[slug]?.length} />
      ))}

      {/* ── YOUTUBE REVIEWS ── */}
      <YouTubeReviews />

      {/* ── ĐÁNH GIÁ KHÁCH HÀNG ── */}
      {reviews.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-10 border-t border-border/30">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 rounded-full bg-primary" />
            <h2 className="text-xl font-bold text-foreground">Đánh giá từ khách hàng</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {reviews.map((r) => (
              <div key={r.id} className="bg-card border border-border/50 rounded-xl p-4 hover:border-primary/20 transition-colors">
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
                  <p className="text-[10px] text-primary font-semibold mt-2 flex items-center gap-1">✓ Đã mua hàng</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── VÌ SAO CHỌN CHÚNG TÔI ── */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-10">
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-5 rounded-full bg-primary" />
            <h2 className="text-xl font-bold text-foreground">Tại sao chọn mayanhvietnam.com?</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🛡️', title: '100% Chính hãng', desc: 'Cam kết chính hãng, có hóa đơn VAT và bảo hành toàn quốc.' },
              { icon: '🎯', title: 'Tư vấn chuyên sâu', desc: 'Đội ngũ nhiếp ảnh gia kinh nghiệm tư vấn free.' },
              { icon: '🚚', title: 'Giao hàng nhanh', desc: 'Freeship đơn từ 5 triệu, đổi trả 7 ngày.' },
              { icon: '💳', title: 'Trả góp linh hoạt', desc: '0% lãi suất qua thẻ tín dụng, thủ tục nhanh gọn.' },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center">
                <span className="text-3xl mb-3">{f.icon}</span>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{f.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BỘ CÔNG THƯƠNG + PAYMENT ── */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 pb-10">
        <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
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