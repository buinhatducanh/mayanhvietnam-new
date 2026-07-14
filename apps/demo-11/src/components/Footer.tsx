import type { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-navy text-white mt-16">
      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <button onClick={() => onNavigate('home')} className="flex items-center mb-4 group">
              <img
                src="/logo-white.png"
                alt="Máy Ảnh Việt Nam"
                width={160}
                height={32}
                className="h-[32px] w-[160px] object-contain object-left"
              />
            </button>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Hệ thống bán lẻ máy ảnh, ống kính, flycam và thiết bị studio chính hãng hàng đầu Việt Nam từ năm 2010.
            </p>
            <div className="flex gap-3">
              {['facebook', 'youtube', 'tiktok'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange transition-colors flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-white capitalize">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Sản phẩm</h3>
            <ul className="space-y-2">
              {['Máy ảnh', 'Ống kính', 'Flycam/Drone', 'Thiết bị studio', 'Sản phẩm cũ'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/60 hover:text-orange transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-orange/40 group-hover:bg-orange transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Hỗ trợ</h3>
            <ul className="space-y-2">
              {['Chính sách bảo hành', 'Hướng dẫn mua hàng', 'Đổi trả hàng', 'Trả góp 0%', 'Blog nhiếp ảnh'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/60 hover:text-orange transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-orange/40 group-hover:bg-orange transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Liên hệ</h3>
            <div className="space-y-3">
              {[
                { icon: '📍', text: '123 Nguyễn Huệ, Quận 1\nTP.HCM, Việt Nam' },
                { icon: '📞', text: 'Hotline: 0937.148.222\nThứ 2–Thứ 7: 8:00 – 21:00' },
                { icon: '✉️', text: 'info@mayanhvietnam.com' },
              ].map(({ icon, text }) => (
                <div key={icon} className="flex gap-2.5">
                  <span className="text-base leading-tight mt-0.5">{icon}</span>
                  <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Phương thức thanh toán</p>
              <div className="flex gap-2 flex-wrap">
                {['VISA', 'MasterCard', 'JCB', 'NAPAS', 'MoMo', 'ZaloPay'].map(method => (
                  <span
                    key={method}
                    className="px-2.5 py-1 bg-white/10 rounded text-[11px] font-semibold text-white/70"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2026 Máy Ảnh Việt Nam. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Chính sách bảo mật', 'Điều khoản dịch vụ', 'Chính sách cookie'].map(link => (
              <a key={link} href="#" className="text-xs text-white/40 hover:text-orange transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}