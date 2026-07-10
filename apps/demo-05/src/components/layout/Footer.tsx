import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { stores } from '@/lib/mock-data';
import { REAL_ASSETS, REAL_CATEGORIES, REAL_BRANDS } from '@/lib/real-products';

const SUPPORT_LINKS = [
  { label: 'Hướng dẫn mua hàng', href: '/blog' },
  { label: 'Chính sách bảo hành', href: '/blog' },
  { label: 'Chính sách đổi trả', href: '/blog' },
  { label: 'Trả góp 0% lãi suất', href: '/blog' },
  { label: 'Câu hỏi thường gặp', href: '/blog' },
  { label: 'Liên hệ', href: '/blog' },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-muted">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="block mb-4">
              <img src={REAL_ASSETS.logoFull} alt="Máy Ảnh Việt Nam" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Hệ thống bán lẻ máy ảnh, máy quay phim và phụ kiện chính hãng hàng đầu Việt Nam. Bảo hành toàn quốc, trả góp 0%.
            </p>
            <div className="flex gap-2">
              {['FB', 'YT', 'IG', 'TT'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-md bg-card border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Danh mục — từ REAL_CATEGORIES */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Danh mục</h4>
            <ul className="space-y-2">
              {REAL_CATEGORIES.filter((c) => !c.slug.startsWith('san-pham-')).map((c) => (
                <li key={c.slug}>
                  <Link href={`/danh-muc/${c.slug}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thương hiệu — 16 brands từ jsonHangSanXuatList.js */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Thương hiệu</h4>
            <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {REAL_BRANDS.map((b) => (
                <li key={b}>
                  <Link href={`/san-pham?brand=${b}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">
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
                <li key={s.label}>
                  <Link href={s.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Hệ thống cửa hàng</h4>
            {stores.slice(0, 3).map((s) => (
              <div key={s.id} className="flex gap-2 mb-2">
                <MapPin className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold text-foreground leading-tight">{s.city} · {s.phone}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{s.address}</p>
                </div>
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