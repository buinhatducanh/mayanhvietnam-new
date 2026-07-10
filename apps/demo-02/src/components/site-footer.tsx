import Link from 'next/link'
import { Camera, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { HOTLINE, categories, storeLocations } from '@/lib/products'

const supportLinks = [
  'Hướng dẫn mua hàng',
  'Chính sách bảo hành',
  'Chính sách đổi trả',
  'Phương thức thanh toán',
  'Câu hỏi thường gặp',
  'Liên hệ hỗ trợ',
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="brand-glow flex size-10 items-center justify-center rounded-xl bg-primary">
              <Camera className="size-5 text-primary-foreground" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wide">MAYANHVIETNAM</span>
              <span className="text-[11px] italic text-primary">Vì lợi ích khách hàng</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Địa chỉ tin cậy hàng đầu về máy ảnh, ống kính và thiết bị nhiếp ảnh chính hãng tại
            Việt Nam với hệ thống 4 chi nhánh.
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

        <nav aria-label="Hỗ trợ khách hàng">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">
            Hỗ trợ khách hàng
          </h3>
          <ul className="flex flex-col gap-2.5">
            {supportLinks.map((link) => (
              <li key={link}>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/thu-cu-doi-moi"
                className="text-sm text-primary transition-colors hover:text-accent"
              >
                Thu cũ đổi mới
              </Link>
            </li>
          </ul>
        </nav>

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
              <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>info@mayanhvietnam.vn</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{'Thời gian làm việc: 8:00 - 21:00 (T2 - CN)'}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row lg:px-8">
          <p>© 2025 Mayanhvietnam. All rights reserved.</p>
          <p>Giấy phép ĐKKD số 0312345678 do Sở KH&ĐT TP.HCM cấp</p>
        </div>
      </div>
    </footer>
  )
}
