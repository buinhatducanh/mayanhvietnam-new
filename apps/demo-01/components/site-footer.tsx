import Image from 'next/image'
import Link from 'next/link'
import {
  Camera,
  Clock,
  CreditCard,
  Headset,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Truck,
} from 'lucide-react'
import {
  HOTLINE,
  HOTLINE_FULL,
  SITE_EMAIL,
  COMPANY_NAME,
  COMPANY_ADDRESS,
  TAX_ID,
  categories,
  footerPolicies,
  paymentIcons,
  paymentMethods,
  socialLinks,
  storeLocations,
} from '@/lib/products'

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.76l-.44 2.9h-2.32V22c4.78-.75 8.44-4.91 8.44-9.94Z" />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  )
}

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .58.04.86.13V9.4a6.33 6.33 0 0 0-5.39 10.69 6.33 6.33 0 0 0 10.86-4.43V8.69a8.18 8.18 0 0 0 4.77 1.52V6.79c-.34 0-.68-.03-.99-.1Z" />
    </svg>
  )
}

const services = [
  { icon: Truck, title: 'Giao hàng toàn quốc', desc: 'Miễn phí đơn từ 1 triệu' },
  { icon: RotateCcw, title: 'Đổi trả dễ dàng', desc: 'Trong 7 ngày' },
  { icon: CreditCard, title: 'Thanh toán đa dạng', desc: 'An toàn, bảo mật' },
  { icon: Headset, title: 'Hỗ trợ tận tâm', desc: 'Hotline 0907-215-252' },
]

const socialIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
  TikTok: TiktokIcon,
  Zalo: FacebookIcon, // reuse icon as fallback
}

const socialItems = socialLinks.map((s) => ({
  ...s,
  icon: socialIconMap[s.platform] || FacebookIcon,
}))

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Services strip */}
      <div className="border-b border-border">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:gap-6 sm:py-8 lg:grid-cols-4 lg:px-8">
          {services.map((service) => (
            <li key={service.title} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <service.icon className="size-5 text-primary" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">{service.title}</span>
                <span className="text-xs text-muted-foreground">{service.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="flex items-center">
            <Image
              src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
              alt="Máy Ảnh Việt Nam"
              width={200}
              height={50}
              className="logo-theme h-12 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Máy Ảnh Việt Nam là đơn vị tiên phong trong lĩnh vực phân phối và bán lẻ các sản phẩm
            máy ảnh tại thị trường Việt Nam. Vì lợi ích khách hàng.
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
          <ul className="mt-5 flex gap-2.5">
            {socialItems.map((social) => (
              <li key={social.platform}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <social.icon className="size-4" aria-hidden="true" />
                </Link>
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

        <nav aria-label="Chính sách & Hỗ trợ">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">
            Chính sách & Hỗ trợ
          </h3>
          <ul className="flex flex-col gap-2.5">
            {footerPolicies.map((p) => (
              <li key={p.name}>
                <Link
                  href={p.link}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {p.name}
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
                Hotline: <span className="font-mono text-foreground">{HOTLINE_FULL}</span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{SITE_EMAIL}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-xs leading-relaxed">
                {COMPANY_ADDRESS}
                <br />
                MST: {TAX_ID}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row lg:px-8">
          <p>© 2026 {COMPANY_NAME}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-2" aria-label="Phương thức thanh toán">
            {paymentIcons.map((icon) => (
              <li key={icon.name}>
                <Image
                  src={icon.url}
                  alt={icon.name}
                  width={60}
                  height={24}
                  className="h-6 w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
