import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { stores } from '@/lib/mock-data';
import { categories } from '@/lib/mock-data';

const BRAND_LINKS = ['Canon', 'Sony', 'Fujifilm', 'Nikon', 'DJI', 'GoPro'];
const SUPPORT_LINKS = ['Hướng dẫn mua hàng', 'Chính sách bảo hành', 'Chính sách đổi trả', 'Trả góp 0%', 'Câu hỏi thường gặp'];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-muted">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: '#FF6B35' }}>
                <span className="text-sm font-black text-white">M</span>
              </div>
              <div>
                <p className="text-sm font-bold leading-tight text-foreground">MÁY ẢNH</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] leading-tight" style={{ color: '#FF6B35' }}>VIỆT NAM</p>
              </div>
            </Link>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              Hệ thống bán lẻ máy ảnh, máy quay phim và phụ kiện chính hãng hàng đầu Việt Nam. Bảo hành toàn quốc, trả góp 0%.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {['FB', 'YT', 'IG'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-md bg-card border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Danh mục */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Danh mục</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/danh-muc/${c.slug}`} className="text-xs text-text-secondary hover:text-primary transition-colors">
                    {c.icon} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thương hiệu */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Thương hiệu</h4>
            <ul className="space-y-2">
              {BRAND_LINKS.map((b) => (
                <li key={b}>
                  <Link href={`/san-pham?brand=${b.toLowerCase()}`} className="text-xs text-text-secondary hover:text-primary transition-colors">
                    {b}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ + stores */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 mb-5">
              {SUPPORT_LINKS.map((s) => (
                <li key={s}>
                  <Link href="/blog" className="text-xs text-text-secondary hover:text-primary transition-colors">{s}</Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Cửa hàng</h4>
            {stores.slice(0, 2).map((s) => (
              <div key={s.id} className="flex gap-2 mb-2">
                <MapPin className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                <p className="text-[11px] text-text-secondary leading-tight">{s.city}: {s.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>© {new Date().getFullYear()} mayanhvietnam.com — Tất cả quyền được bảo lưu.</p>
          <p>Hotline: <a href="tel:+84937148222" className="font-semibold" style={{ color: '#FF6B35' }}>0937.148.222</a></p>
        </div>
      </div>
    </footer>
  );
}