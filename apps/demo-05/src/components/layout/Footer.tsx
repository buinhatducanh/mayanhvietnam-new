import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { REAL_ASSETS } from '@/lib/real-products';
import { stores } from '@/lib/mock-data';

const POLICY_LINKS = [
  { label: 'Chính sách bảo hành', href: '/chinh-sach-bao-hanh' },
  { label: 'Chính sách thanh toán', href: '/chinh-sach-thanh-toan' },
  { label: 'Chính sách đổi trả, Hoàn tiền', href: '/chinh-sach-doi-tra' },
  { label: 'Chính sách vận chuyển', href: '/chinh-sach-van-chuyen' },
  { label: 'Bảo mật thông tin khách hàng', href: '/chinh-sach-bao-mat' },
  { label: 'Thông tin liên hệ', href: '/thong-tin-lien-he' },
];

export function Footer() {
  // Lấy 4 stores thật từ mock-data (TP.HCM, Cần Thơ, An Giang, Tiền Giang)
  const visibleStores = stores.slice(0, 4);

  return (
    <footer className="relative bg-[#0d0d12] text-muted-foreground border-t border-border/30">
      {/* ── TOP SECTION — 4 columns ── */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ── COLUMN 1: Logo + Description + Social ── */}
          <div>
            <Link href="/" className="block mb-4">
              <img
                src={REAL_ASSETS.logoFull}
                alt="Máy Ảnh Việt Nam"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground mb-5">
              Máy Ảnh Việt Nam là đơn vị tiên phong trong lĩnh vực phân phối và bán lẻ các sản phẩm máy ảnh tại thị trường Việt Nam.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mb-6">
              <a
                href="https://www.youtube.com/@benhvienmayanhvietnam950"
                aria-label="Youtube"
                title="Youtube: Máy Ảnh Việt Nam"
                className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-500/40 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@mayanhvietnam"
                aria-label="TikTok"
                title="TikTok: Máy Ảnh Việt Nam"
                className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.80 15.66a6.34 6.34 0 0 0 10.86-4.42V8.43a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.86z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/mayanhvietnam"
                aria-label="Facebook"
                title="Facebook: Máy Ảnh Việt Nam"
                className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500/40 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a
                href="mailto:info@mayanhvietnam.com"
                aria-label="Email"
                title="Email: Máy Ảnh Việt Nam"
                className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:0907215252"
                aria-label="Gọi ngay: 0907215252"
                title="Gọi ngay"
                className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-success hover:border-success/40 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Payment methods */}
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Phương thức thanh toán
            </p>
            <div className="grid grid-cols-3 gap-1.5 mb-6">
              {REAL_ASSETS.paymentIcons.map((icon) => (
                <div key={icon} className="relative aspect-[1.6/1] rounded bg-white overflow-hidden">
                  <img src={icon} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-contain p-1" />
                </div>
              ))}
            </div>

            {/* BCT */}
            <a
              href="http://online.gov.vn/Home/WebDetails/140624"
              target="_blank"
              rel="nofollow"
              className="inline-block"
            >
              <img src={REAL_ASSETS.logoBCT} alt="Bộ Công Thương" className="h-16 w-auto" />
            </a>
          </div>

          {/* ── COLUMN 2: Chính sách ── */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Chính sách</h4>
            <ul className="space-y-2.5">
              {POLICY_LINKS.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mt-6 mb-4">Thông tin liên hệ</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
                <span>
                  Fanpage:{' '}
                  <a
                    href="https://www.facebook.com/mayanhvietnam"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Máy Ảnh Việt Nam
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <span>
                  Hotline:{' '}
                  <a href="tel:0907215252" className="font-bold" style={{ color: '#FF6B35' }}>0907-215-252</a>
                  <span className="text-muted-foreground/60 mx-1">|</span>
                  <a href="tel:0937148222" className="font-bold" style={{ color: '#FF6B35' }}>0937-148-222</a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <span>
                  Email:{' '}
                  <a href="mailto:info@mayanhvietnam.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@mayanhvietnam.com
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* ── COLUMN 3 & 4 merged: Hệ thống cửa hàng (4 stores thật) ── */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Hệ thống cửa hàng</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visibleStores.map((s) => (
                <div key={s.id} className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#FF6B35' }} />
                  <div>
                    <p className="text-xs font-bold text-foreground mb-0.5">{s.name}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{s.address}</p>
                    <p className="text-[10px] text-text-muted mt-0.5 font-mono">{s.hours}</p>
                    <a
                      href={`tel:${s.phone}`}
                      className="text-[11px] font-semibold inline-block mt-0.5 hover:underline"
                      style={{ color: '#FF6B35' }}
                    >
                      📞 {s.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── COPYRIGHT SECTION ── */}
      <div className="border-t border-border/30 bg-[#08080d]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-center">
            {/* Copyright text — like mayanhvietnam.com */}
            <div className="lg:col-span-2 text-[11px] text-muted-foreground leading-relaxed">
              <p>
                © 2022 <span className="font-semibold text-foreground">CÔNG TY TNHH DỊCH VỤ TƯ VẤN VÀ CÔNG NGHỆ SÀI GÒN</span>
                <span className="text-success ml-1">✓</span>
              </p>
              <p className="mt-1.5">
                • Địa chỉ: Số 09 Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh. Mã số thuế:{' '}
                <span className="font-mono">0313859872-002</span>
              </p>
              <p className="mt-1">
                • GPĐKKD số:{' '}
                <span className="font-mono">0313859872-002</span>. Đơn vị cấp: Sở Kế Hoạch và Đầu Tư TP.HCM, cấp ngày 05 tháng 08 năm 2024.
              </p>
              <p className="mt-1">
                • Điện thoại:{' '}
                <a href="tel:0903148222" className="hover:text-primary">0903 148 222</a>. Email:{' '}
                <a href="mailto:info@mayanhvietnam.com" className="hover:text-primary">info@mayanhvietnam.com</a>
              </p>
              <p className="mt-1">
                Chịu trách nhiệm nội dung: <span className="font-medium text-foreground">Nguyễn Hồng Chương</span>.
              </p>
            </div>

            {/* Footer menu */}
            <div className="lg:col-span-1 lg:text-right">
              <ul className="flex flex-wrap items-center justify-start lg:justify-end gap-x-4 gap-y-2 text-xs">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Trang chủ</Link></li>
                <li><Link href="/san-pham" className="text-muted-foreground hover:text-primary transition-colors">Sản phẩm</Link></li>
                <li><Link href="/danh-muc/thiet-bi-studio" className="text-muted-foreground hover:text-primary transition-colors">Setup phòng studio</Link></li>
                <li><Link href="/chinh-sach-bao-hanh" className="text-muted-foreground hover:text-primary transition-colors">Bảo hành</Link></li>
                <li><Link href="/thong-tin-lien-he" className="text-muted-foreground hover:text-primary transition-colors">Liên hệ</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}