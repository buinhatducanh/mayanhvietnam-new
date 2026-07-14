import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { categories, storeLocations, HOTLINE } from '@/lib/products'

const policies = [
  { name: 'Chính sách bảo hành', href: '/chinh-sach-bao-hanh' },
  { name: 'Chính sách thanh toán', href: '/chinh-sach-thanh-toan' },
  { name: 'Chính sách đổi trả, Hoàn Tiền', href: '/chinh-sach-doi-tra' },
  { name: 'Chính sách vận chuyển', href: '/chinh-sach-van-chuyen' },
  { name: 'Chính sách bảo mật thông tin', href: '/chinh-sach-bao-mat-thong-tin-khach-hang' },
  { name: 'Thông tin liên hệ', href: '/thong-tin-lien-he' },
]

const socialLinks = [
  { name: 'YouTube', href: 'https://www.youtube.com/@mayanhvietnam' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@mayanhvietnam' },
  { name: 'Facebook', href: 'https://www.facebook.com/mayanhvietnam' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Col 1: Brand + store locations */}
        <div>
          <Link href="/" className="inline-flex items-center">
            <span className="brand-glow flex items-center rounded-xl bg-primary px-3 py-2">
              <img
                src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png"
                alt="Máy Ảnh Việt Nam"
                width={145}
                height={29}
                className="h-[29px] w-[145px] object-contain object-left"
              />
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Đơn vị tiên phong trong lĩnh vực phân phối và bán lẻ máy ảnh tại thị trường Việt Nam.
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {storeLocations.map((loc) => (
              <li key={loc.city} className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">{loc.city}:</strong> {loc.address}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2: Categories */}
        <nav aria-label="Danh mục sản phẩm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">
            Danh mục sản phẩm
          </h3>
          <ul className="flex flex-col gap-2.5">
            {categories.slice(0, 7).map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/danh-muc/${cat.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 3: Policies (real from mayanhvietnam.com) */}
        <nav aria-label="Chính sách">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">
            Chính sách
          </h3>
          <ul className="flex flex-col gap-2.5">
            {policies.map((p) => (
              <li key={p.name}>
                <Link
                  href={p.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/thu-cu-doi-moi"
                className="text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                Thu cũ đổi mới
              </Link>
            </li>
          </ul>
        </nav>

        {/* Col 4: Contact */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">
            Thông tin liên hệ
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                Hotline: <span className="font-mono text-foreground">{HOTLINE}</span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                Tổng đài: <span className="font-mono text-foreground">0907.215.252</span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>info@mayanhvietnam.com</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{'Thời gian làm việc: 8:00 - 21:00 (T2 - CN)'}</span>
            </li>
          </ul>

          {/* Social */}
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest">Kết nối với chúng tôi</p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row lg:px-8">
          <p>© 2025 CÔNG TY TNHH DỊCH VỤ TƯ VẤN VÀ CÔNG NGHỆ SÀI GÒN. All rights reserved.</p>
          <p>Giấy phép ĐKKD số 0313859872-002 do Sở KH&ĐT TP.HCM cấp ngày 05/08/2024</p>
        </div>
      </div>
    </footer>
  )
}
