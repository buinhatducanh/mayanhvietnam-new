'use client'

import Link from 'next/link'
import { Camera, Mail, Phone, MapPin } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Branding & Intro */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                <Camera className="h-4 w-4 text-zinc-950" />
              </span>
              <span className="text-base font-bold tracking-tight">
                Máy Ảnh <span className="text-primary">Việt Nam</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Đại lý máy ảnh chính hãng cao cấp tại Việt Nam. Trải nghiệm mô phỏng 3D tương tác chân thực và đặt mua hàng nhanh chóng với các chính sách bảo hành tối ưu.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="#" aria-label="Youtube" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Products Quick Links */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">Sản phẩm nổi bật</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs text-muted-foreground" role="list">
              <li>
                <Link href="/store" className="hover:text-primary transition-colors">Canon EOS R50</Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-primary transition-colors">Sony A7C II</Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-primary transition-colors">Fujifilm X-T5</Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-primary transition-colors">DJI Pocket 3</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Commitments */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">Dịch vụ & Cam kết</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs text-muted-foreground" role="list">
              <li className="flex items-center gap-2">Bảo hành 24 tháng chính hãng</li>
              <li className="flex items-center gap-2">Hỗ trợ trả góp 0% lãi suất</li>
              <li className="flex items-center gap-2">Giao hàng miễn phí toàn quốc</li>
              <li className="flex items-center gap-2">Đổi trả nhanh trong 7 ngày</li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="flex flex-col gap-3.5 text-xs text-muted-foreground">
            <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">Thông tin liên hệ</h2>
            <p className="mt-1 flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>Hotline: 1900 8888 (08:00 - 21:00)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>Email: info@mayanhvietnam.com</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>Địa chỉ showroom: mayanhvietnam.com - Hệ thống phân phối toàn quốc</span>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-[10px] text-muted-foreground">
          <p>© {new Date().getFullYear()} Máy Ảnh Việt Nam. Tất cả quyền được bảo lưu. Thiết kế và phát triển chuẩn 3D E-commerce.</p>
        </div>
      </div>
    </footer>
  )
}
