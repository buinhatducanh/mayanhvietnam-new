import { brandAssets, footerColumns, storeLocations } from "@/lib/data";

export default function StoreFooter() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      {/* Floating contact bar (Zalo + Messenger + Phone) */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <a
          href="https://zalo.me/2875467351509223987"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          aria-label="Chat Zalo"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.6 13.2h-1.6v-1.4c0-.4-.2-.6-.6-.6H12v2h-2.8c-.4 0-.8.2-.8.6v.8c0 .4.2.8.6.8h3.2l-2.8 3.2h2l2.8-3.2c.4-.4.6-.8.6-1.2v-2z" />
          </svg>
        </a>
        <a
          href="https://www.facebook.com/mayanhvietnam"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-[#0084FF] hover:bg-[#0073E6] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          aria-label="Chat Messenger"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.04 2 11c0 2.84 1.24 5.38 3.24 7.08V22l3.12-1.72c.82.22 1.7.34 2.64.34 5.52 0 10-4.04 10-9S17.52 2 12 2z" />
          </svg>
        </a>
        <a
          href="tel:0907215252"
          className="w-12 h-12 bg-emerald-600 hover:bg-emerald-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          aria-label="Gọi hotline"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>

      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1+2: Categories & Policy (combined) */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-zinc-400 hover:text-orange-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Col 3: Thông tin liên hệ */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Thông tin liên hệ</h4>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li>
                <a href="https://www.facebook.com/mayanhvietnam" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Fanpage: Máy Ảnh Việt Nam
                </a>
              </li>
              <li>
                Hotline: <a href="tel:0907215252" className="text-orange-500 font-semibold hover:underline">0907.215.252</a>
              </li>
              <li>
                Hotline: <a href="tel:0937148222" className="text-orange-500 font-semibold hover:underline">0937.148.222</a>
              </li>
              <li>
                Email: <a href="mailto:info@mayanhvietnam.com" className="text-zinc-300 hover:text-orange-400">info@mayanhvietnam.com</a>
              </li>
            </ul>
            <div className="flex gap-2 mt-4">
              {[
                { label: "FB", href: "https://www.facebook.com/mayanhvietnam" },
                { label: "YT", href: "https://www.youtube.com/@mayanhvietnam" },
                { label: "TT", href: "https://www.tiktok.com/@mayanhvietnam" },
                { label: "ZL", href: "https://zalo.me/2875467351509223987" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-zinc-800 hover:bg-orange-500 rounded-full flex items-center justify-center text-zinc-400 hover:text-white text-[10px] font-bold transition-colors"
                  title={s.label}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Hệ thống cửa hàng */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Hệ thống cửa hàng</h4>
            <ul className="space-y-3">
              {storeLocations.map((loc) => (
                <li key={loc.city} className="text-xs text-zinc-400 leading-relaxed">
                  <span className="text-white font-semibold">{loc.city}:</span> {loc.address}{" "}
                  <span className="text-zinc-500">({loc.hours})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment icons + Government seal */}
        <div className="mt-10 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Thanh toán</p>
            <div className="flex items-center gap-2 flex-wrap">
              <img src={brandAssets.paymentIcons.visa} alt="Visa" className="h-7 bg-white rounded px-1.5 py-0.5" />
              <img src={brandAssets.paymentIcons.mastercard} alt="MasterCard" className="h-7 bg-white rounded px-1.5 py-0.5" />
              <img src={brandAssets.paymentIcons.jcb} alt="JCB" className="h-7 bg-white rounded px-1.5 py-0.5" />
              <img src={brandAssets.paymentIcons.napas} alt="NAPAS" className="h-7 bg-white rounded px-1.5 py-0.5" />
              <img src={brandAssets.paymentIcons.homePayLater} alt="Home PayLater" className="h-7 bg-white rounded px-1.5 py-0.5" />
              <img src={brandAssets.paymentIcons.momo} alt="MoMo" className="h-7 bg-white rounded px-1.5 py-0.5" />
            </div>
          </div>
          <a
            href="http://online.gov.vn/Home/WebDetails/140624"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <img
              src={brandAssets.logoBCT}
              alt="Đã thông báo Bộ Công Thương"
              className="h-14 w-auto"
            />
          </a>
        </div>
      </div>

      {/* Copyright — y nguyên mayanhvietnam.com */}
      <div className="bg-black border-t border-zinc-800 py-5 px-6">
        <div className="max-w-[1440px] mx-auto text-xs text-zinc-500 leading-relaxed space-y-1.5">
          <p>© 2022 CÔNG TY TNHH DỊCH VỤ TƯ VẤN VÀ CÔNG NGHỆ SÀI GÒN</p>
          <p>Địa chỉ: Số 09 Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh. Mã số thuế: 0313859872-002.</p>
          <p>GPĐKKD số: 0313859872-002. Đơn vị cấp: Sở Kế Hoạch và Đầu Tư TP.HCM, cấp ngày 05/08/2024.</p>
          <p>Điện thoại: 0903.148.222. Email: info@mayanhvietnam.com — Chịu trách nhiệm nội dung: Nguyễn Hồng Chương.</p>
        </div>
      </div>
    </footer>
  );
}
