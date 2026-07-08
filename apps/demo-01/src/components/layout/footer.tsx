import Link from 'next/link';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { stores } from '@/lib/mock-data';
import { FooterNewsletter } from './footer-newsletter';

const POLICIES = [
  { label: 'Chính sách bảo hành', href: '/chinh-sach-bao-hanh' },
  { label: 'Chính sách thanh toán', href: '/chinh-sach-thanh-toan' },
  { label: 'Chính sách vận chuyển', href: '/chinh-sach-van-chuyen' },
  { label: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' },
  { label: 'Chính sách đổi trả', href: '/chinh-sach-doi-tra' },
];

const PAYMENT_METHODS = ['VISA', 'MasterCard', 'JCB', 'NAPAS', 'MoMo', 'COD'];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* NEWSLETTER */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Đăng ký nhận tin khuyến mãi
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Nhận thông tin flash sale & sản phẩm mới trước ai hết
            </p>
          </div>
          <FooterNewsletter />
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-md"
                style={{ background: '#FF6B35' }}
              >
                <span className="text-sm font-bold text-white">M</span>
              </div>
              <div>
                <p className="text-sm font-bold leading-tight text-foreground">
                  MÁY ẢNH
                </p>
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: '#FF6B35' }}
                >
                  VIỆT NAM
                </p>
              </div>
            </Link>
            <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
              Cửa hàng máy ảnh, ống kính & thiết bị nhiếp ảnh chính hãng · Uy tín từ 2020
            </p>
            <div className="flex items-center gap-3">
              {['YouTube', 'TikTok', 'Facebook'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary"
                  aria-label={s}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
              Chính sách
            </h3>
            <ul className="space-y-2">
              {POLICIES.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stores */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
              Hệ thống cửa hàng
            </h3>
            <ul className="space-y-3">
              {stores.slice(0, 3).map((s) => (
                <li key={s.id} className="flex gap-2">
                  <MapPin
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    style={{ color: '#FF6B35' }}
                  />
                  <div>
                    <p className="text-xs font-medium text-foreground">{s.city}</p>
                    <p className="text-[11px] leading-snug text-muted-foreground">
                      {s.address}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
              Liên hệ
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+84937148222"
                className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-3.5 w-3.5" />
                0937.148.222
              </a>
              <a
                href="mailto:info@mayanhvietnam.com"
                className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-3.5 w-3.5" />
                info@mayanhvietnam.com
              </a>
              <div className="pt-2">
                <p className="mb-2 text-xs font-semibold text-foreground">Thanh toán:</p>
                <div className="flex flex-wrap gap-1.5">
                  {PAYMENT_METHODS.map((m) => (
                    <span
                      key={m}
                      className="flex h-6 items-center rounded border border-border px-2 text-[10px] font-medium text-muted-foreground"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 md:flex-row md:px-6">
          <p className="text-[11px] text-muted-foreground">
            © 2020–2026 Máy Ảnh Việt Nam. Bảo lưu mọi quyền.
          </p>
          <p className="text-[11px] text-muted-foreground">mayanhvietnam.com</p>
        </div>
      </div>
    </footer>
  );
}