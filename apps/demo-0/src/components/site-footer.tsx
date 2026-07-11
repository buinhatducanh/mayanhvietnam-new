'use client';

import Link from 'next/link';
import {
  Phone, MapPin, Clock, Mail,
  MessageCircle, ExternalLink,
} from 'lucide-react';
import { stores, type StoreInfo } from '@/lib/adapter';

const CDN = 'https://mayanhvietnam.com';

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.76l-.44 2.9h-2.32V22c4.78-.75 8.44-4.91 8.44-9.94Z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" {...props}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}

const POLICIES = [
  { name: 'Chính sách bảo hành', href: '/chinh-sach-bao-hanh' },
  { name: 'Chính sách thanh toán', href: '/chinh-sach-thanh-toan' },
  { name: 'Chính sách đổi trả, Hoàn Tiền', href: '/chinh-sach-bao-hanh' },
  { name: 'Chính sách vận chuyển', href: '/chinh-sach-van-chuyen' },
  { name: 'Chính sách bảo mật thông tin', href: '/chinh-sach-bao-mat' },
  { name: 'Thông tin liên hệ', href: '/lien-he' },
];

const PAYMENT_ICONS = [
  { name: 'VISA', src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg` },
  { name: 'MasterCard', src: `${CDN}/asset/imgs/icon/hinhThucThanalToan/mastercard_icon_c75f94f6a5.svg` }, // Typo fix
  { name: 'JCB', src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg` },
  { name: 'ATM / Napas', src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg` },
  { name: 'HomePayLater', src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg` },
  { name: 'MoMo', src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg` },
];

const SOCIAL_LINKS = [
  { platform: 'YouTube', url: 'https://www.youtube.com/@benhvienmayanhvietnam950', icon: YoutubeIcon },
  { platform: 'Facebook', url: 'https://www.facebook.com/mayanhvietnam', icon: FacebookIcon },
  { platform: 'TikTok', url: 'https://www.tiktok.com/@mayanhvietnam', icon: ExternalLink },
  { platform: 'Email', url: 'mailto:info@mayanhvietnam.com', icon: Mail },
  { platform: 'Hotline', url: 'tel:0907215252', icon: Phone },
];

function StoreCard({ store }: { store: StoreInfo }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/30">
      <h4 className="text-sm font-semibold text-foreground">{store.name}</h4>
      <div className="mt-2 space-y-1.5">
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <MapPin className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden />
          {store.address}
        </p>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="size-3 shrink-0 text-primary" aria-hidden />
          {store.phone}
        </p>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3 shrink-0 text-primary" aria-hidden />
          {store.hours}
        </p>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center">
              <img
                src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png"
                alt="Máy Ảnh Việt Nam Logo"
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Máy Ảnh Việt Nam là đơn vị tiên phong trong lĩnh vực phân phối và bán lẻ
              các sản phẩm máy ảnh tại thị trường Việt Nam.
            </p>
            {/* Social */}
            <div className="mt-4 flex gap-2">
              {SOCIAL_LINKS.map(({ platform, url, icon: Icon }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Chính sách
            </h3>
            <ul className="mt-3 space-y-2">
              {POLICIES.map((p) => (
                <li key={p.name}>
                  <Link
                    href={p.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Thanh toán
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {PAYMENT_ICONS.map((pm) => (
                <div
                  key={pm.name}
                  className="flex h-9 items-center rounded-lg border border-border bg-white/90 px-2.5"
                  title={pm.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pm.src} alt={pm.name} className="h-5 w-auto" loading="lazy" />
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Liên hệ
              </h3>
              <div className="mt-3 space-y-2">
                <a
                  href="tel:0937148222"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Phone className="size-3.5 text-primary" /> 0937.148.222
                </a>
                <a
                  href="tel:0907215252"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Phone className="size-3.5 text-primary" /> 0907.215.252
                </a>
                <a
                  href="mailto:info@mayanhvietnam.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Mail className="size-3.5 text-primary" /> info@mayanhvietnam.com
                </a>
              </div>
            </div>
          </div>

          {/* Stores */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Hệ thống cửa hàng
            </h3>
            <div className="mt-3 space-y-3">
              {stores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
            <div className="text-xs leading-relaxed text-muted-foreground">
              <p>CÔNG TY TNHH DỊCH VỤ TƯ VẤN VÀ CÔNG NGHỆ SÀI GÒN</p>
              <p>MST: 0313859872-002 · GPĐKKD: 0313859872-002 · Cấp ngày 05/08/2024</p>
              <p>Người chịu trách nhiệm nội dung: Nguyễn Hồng Chương</p>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Máy Ảnh Việt Nam. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
