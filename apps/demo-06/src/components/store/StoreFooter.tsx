import { footerColumns, storeLocations, paymentMethods } from "@/lib/data";

export default function StoreFooter() {
  return (
    <footer className="bg-black border-t border-zinc-800">
      {/* Floating contact bar */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <a
          href="https://zalo.me/0907215252"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          aria-label="Chat Zalo"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.6 13.2h-1.6v-1.4c0-.4-.2-.6-.6-.6H12v2h-2.8c-.4 0-.8.2-.8.6v.8c0 .4.2.8.6.8h3.2l-2.8 3.2h2l2.8-3.2c.4-.4.6-.8.6-1.2v-2z"/>
          </svg>
        </a>
        <a
          href="https://m.me/mayanhvietnam"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-[#0084FF] hover:bg-[#0073E6] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          aria-label="Messenger"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.04 2 11c0 2.84 1.24 5.38 3.24 7.08V22l3.12-1.72c.82.22 1.7.34 2.64.34 5.52 0 10-4.04 10-9S17.52 2 12 2z"/>
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

      <div className="max-w-[1440px] mx-auto px-6 py-14">
        {/* Store locations */}
        <div className="mb-12 pb-8 border-b border-zinc-800">
          <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Hệ thống cửa hàng</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {storeLocations.map((loc) => (
              <div key={loc.city} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-sm font-bold text-white">{loc.city}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{loc.address}</p>
                <p className="text-[11px] text-zinc-500 mt-1.5">{loc.hours}</p>
                <p className="text-xs text-orange-500 font-medium mt-1">📞 {loc.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white mb-4">{col.title}</h4>
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

          {/* Contact & Social */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Liên hệ</h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <p>📞 <a href="tel:0907215252" className="hover:text-orange-400">0907.215.252</a></p>
              <p>📞 <a href="tel:0937148222" className="hover:text-orange-400">0937.148.222</a></p>
              <p>✉️ <a href="mailto:info@mayanhvietnam.com" className="hover:text-orange-400">info@mayanhvietnam.com</a></p>
            </div>
            <div className="flex gap-2 mt-4">
              {["FB", "YT", "ZL", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 bg-zinc-800 hover:bg-orange-500 rounded-full flex items-center justify-center text-zinc-400 hover:text-white text-[10px] font-bold transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Payment + Copyright */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-base text-white">Máy Ảnh Việt Nam</span>
            <span className="text-[11px] text-zinc-500">© 2010–2026. Bảo lưu mọi quyền.</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[10px] text-zinc-500">Thanh toán:</span>
            {paymentMethods.map((m) => (
              <span key={m} className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}