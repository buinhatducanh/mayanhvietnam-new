import Link from "next/link";
import Image from "next/image";
import { stores, COMPANY_NAME, HOTLINE_FULL, SITE_EMAIL, COMPANY_ADDRESS, paymentIcons, socialLinks } from "@/data/store";

const POLICY_LINKS = [
  { label: "Chính sách bảo hành", href: "/chinh-sach-bao-hanh" },
  { label: "Chính sách thanh toán", href: "/chinh-sach-thanh-toan" },
  { label: "Chính sách đổi trả, Hoàn tiền", href: "/chinh-sach-doi-tra" },
  { label: "Chính sách vận chuyển", href: "/chinh-sach-van-chuyen" },
  { label: "Bảo mật thông tin khách hàng", href: "/chinh-sach-bao-mat" },
  { label: "Thông tin liên hệ", href: "/thong-tin-lien-he" },
];

const socialIconMap: Record<string, string> = {
  YouTube: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z",
  TikTok: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 15.66a6.34 6.34 0 0 0 10.86-4.42V8.43a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.86z",
  Facebook: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z",
};

const socialColorMap: Record<string, string> = {
  YouTube: "hover:text-red-500 hover:border-red-500/40",
  TikTok: "hover:text-foreground hover:border-foreground/40",
  Facebook: "hover:text-blue-500 hover:border-blue-500/40",
  Zalo: "hover:text-blue-600 hover:border-blue-600/40",
};

function SocialIcon({ name }: { name: string }) {
  if (name === "Email") {
    return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
  }
  if (name === "Hotline") {
    return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
  }
  const d = socialIconMap[name];
  if (d) {
    return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>;
  }
  return <span className="text-xs font-bold">{name[0]}</span>;
}

export default function StoreFooter() {
  const visibleStores = stores.slice(0, 4);

  return (
    <footer className="relative bg-white text-gray-500 border-t border-gray-200">
      {/* ── Top section — 4 columns ── */}
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ── Column 1: Logo + description + social + payment ── */}
          <div>
            <Link href="/" className="block mb-4">
              <div className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-3 py-2 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png" alt="Máy Ảnh Việt Nam" className="h-8 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-gray-500 mb-5">
              Máy Ảnh Việt Nam là đơn vị tiên phong trong lĩnh vực phân phối và bán lẻ các sản phẩm máy ảnh tại thị trường Việt Nam. Vì lợi ích khách hàng.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mb-6">
              {socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  title={`${s.platform}: Máy Ảnh Việt Nam`}
                  className={`w-9 h-9 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 ${socialColorMap[s.platform] || "hover:text-gray-800 hover:border-gray-800/40"} transition-colors`}
                >
                  <SocialIcon name={s.platform} />
                </a>
              ))}
            </div>

            {/* Payment methods */}
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
              Phương thức thanh toán
            </p>
            <div className="grid grid-cols-3 gap-1.5 mb-6">
              {paymentIcons.map((icon) => (
                <div key={icon.name} className="relative aspect-[1.6/1] rounded bg-white border border-gray-200 overflow-hidden">
                  <Image src={icon.url} alt={icon.name} width={60} height={36} loading="lazy" className="absolute inset-0 w-full h-full object-contain p-1" unoptimized />
                </div>
              ))}
            </div>

            {/* BCT */}
            <a href="http://online.gov.vn/Home/WebDetails/140624" target="_blank" rel="nofollow" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://mayanhvietnam.com/asset/imgs/icon/logoBCT.png" alt="Bộ Công Thương" className="h-16 w-auto" />
            </a>
          </div>

          {/* ── Column 2: Policies + Contact ── */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Chính sách</h4>
            <ul className="space-y-2.5">
              {POLICY_LINKS.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className="text-xs text-gray-500 hover:text-[var(--color-primary)] transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mt-6 mb-4">Thông tin liên hệ</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
                <span>Fanpage: <a href="https://www.facebook.com/mayanhvietnam" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors">Máy Ảnh Việt Nam</a></span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>
                  Hotline: <a href={`tel:${HOTLINE_FULL.replace(/-/g, "")}`} className="font-bold text-[var(--color-primary)]">{HOTLINE_FULL}</a>
                  <span className="text-gray-300 mx-1">|</span>
                  <a href="tel:0937148222" className="font-bold text-[var(--color-primary)]">0937-148-222</a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>
                  Email: <a href={`mailto:${SITE_EMAIL}`} className="text-gray-500 hover:text-[var(--color-primary)] transition-colors">{SITE_EMAIL}</a>
                </span>
              </li>
            </ul>
          </div>

          {/* ── Column 3+4: Hệ thống cửa hàng ── */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Hệ thống cửa hàng</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visibleStores.map((s) => (
                <div key={s.id} className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 bg-gray-50">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <div>
                    <p className="text-xs font-bold text-gray-900 mb-0.5">{s.name}</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{s.address}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{s.hours}</p>
                    <a href={`tel:${s.phone}`} className="text-[11px] font-semibold inline-block mt-0.5 text-[var(--color-primary)] hover:underline">
                      📞 {s.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-[1440px] px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-center">
            <div className="lg:col-span-2 text-[11px] text-gray-500 leading-relaxed">
              <p>
                © 2022 <span className="font-semibold text-gray-900">CÔNG TY TNHH DỊCH VỤ TƯ VẤN VÀ CÔNG NGHỆ SÀI GÒN</span>
                <span className="text-green-600 ml-1">✓</span>
              </p>
              <p className="mt-1.5">
                • Địa chỉ: {COMPANY_ADDRESS}. Mã số thuế: <span className="font-mono">0313859872-002</span>
              </p>
              <p className="mt-1">
                • GPĐKKD số: <span className="font-mono">0313859872-002</span>. Đơn vị cấp: Sở Kế Hoạch và Đầu Tư TP.HCM, cấp ngày 05 tháng 08 năm 2024.
              </p>
              <p className="mt-1">
                • Điện thoại: <a href="tel:0903148222" className="hover:text-[var(--color-primary)]">0903 148 222</a>. Email: <a href="mailto:info@mayanhvietnam.com" className="hover:text-[var(--color-primary)]">info@mayanhvietnam.com</a>
              </p>
              <p className="mt-1">
                Chịu trách nhiệm nội dung: <span className="font-medium text-gray-900">Nguyễn Hồng Chương</span>.
              </p>
            </div>
            <div className="lg:col-span-1 lg:text-right">
              <ul className="flex flex-wrap items-center justify-start lg:justify-end gap-x-4 gap-y-2 text-xs">
                <li><Link href="/" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors">Trang chủ</Link></li>
                <li><Link href="/san-pham" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors">Sản phẩm</Link></li>
                <li><Link href="/setup-studio" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors">Setup phòng studio</Link></li>
                <li><Link href="/chinh-sach-bao-hanh" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors">Bảo hành</Link></li>
                <li><Link href="/thong-tin-lien-he" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors">Liên hệ</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
