"use client";

import React from "react";
import Link from "next/link";
import { Store, stores } from "@/lib/products";

interface Payment {
  name: string;
  src: string;
}

const CDN = "https://mayanhvietnam.com";

const payments: Payment[] = [
  { name: "VISA", src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg` },
  { name: "MasterCard", src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg` },
  { name: "JCB", src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg` },
  { name: "ATM / Napas", src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg` },
  { name: "HomePayLater", src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg` },
  { name: "MoMo", src: `${CDN}/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg` },
];

export default function SiteFooter() {
  return (
    <footer className="font-sans bg-[#f6f4f0] border-t border-[#e9e6e1]">
      <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center bg-[#16130f] rounded-xl px-3.5 py-[9px] no-underline">
              <img src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png" alt="Máy Ảnh Việt Nam" className="h-[30px] w-auto object-contain block" />
            </Link>
            <p className="mt-4 text-[13.5px] leading-[1.65] text-[#7a746c] max-w-[300px]">
              Máy Ảnh Việt Nam là đơn vị tiên phong trong lĩnh vực phân phối và bán lẻ các sản phẩm máy ảnh tại thị trường Việt Nam.
            </p>
            <div className="flex gap-2 mt-[18px]">
              <a
                href="https://www.youtube.com/@benhvienmayanhvietnam950"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e2ded8] bg-white text-[#7a746c] no-underline transition-all hover:border-[rgba(255,106,0,0.5)] hover:text-[#ff6a00] hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-10px_rgba(255,106,0,0.4)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z"></path></svg>
              </a>
              <a
                href="https://www.facebook.com/mayanhvietnam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e2ded8] bg-white text-[#7a746c] no-underline transition-all hover:border-[rgba(255,106,0,0.5)] hover:text-[#ff6a00] hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-10px_rgba(255,106,0,0.4)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.76l-.44 2.9h-2.32V22c4.78-.75 8.44-4.91 8.44-9.94Z"></path></svg>
              </a>
              <a
                href="mailto:info@mayanhvietnam.com"
                aria-label="Email"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e2ded8] bg-white text-[#7a746c] no-underline transition-all hover:border-[rgba(255,106,0,0.5)] hover:text-[#ff6a00] hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-10px_rgba(255,106,0,0.4)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </a>
              <a
                href="tel:0907215252"
                aria-label="Hotline"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e2ded8] bg-white text-[#7a746c] no-underline transition-all hover:border-[rgba(255,106,0,0.5)] hover:text-[#ff6a00] hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-10px_rgba(255,106,0,0.4)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="m-0 text-[12px] font-bold tracking-[0.14em] uppercase text-[#16130f]">Chính sách</h3>
            <ul className="list-none mt-4 m-0 p-0 flex flex-col gap-2.5">
              {["Chính sách bảo hành", "Chính sách thanh toán", "Chính sách đổi trả, hoàn tiền", "Chính sách vận chuyển", "Chính sách bảo mật thông tin", "Thông tin liên hệ"].map((policy, idx) => (
                <li key={idx}>
                  <Link href="#" className="text-[13.5px] text-[#7a746c] no-underline transition-all hover:text-[#ff6a00] hover:pl-1">
                    {policy}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment + contact */}
          <div>
            <h3 className="m-0 text-[12px] font-bold tracking-[0.14em] uppercase text-[#16130f]">Thanh toán</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {payments.map((pm, idx) => (
                <span key={idx} title={pm.name} className="h-[34px] flex items-center px-2.5 rounded-[9px] border border-[#e2ded8] bg-white">
                  <img src={pm.src} alt={pm.name} className="h-[18px] w-auto block" />
                </span>
              ))}
            </div>
            <h3 className="mt-[26px] mb-0 text-[12px] font-bold tracking-[0.14em] uppercase text-[#16130f]">Liên hệ</h3>
            <div className="flex flex-col gap-2.2 mt-3.5">
              <a href="tel:0937148222" className="flex items-center gap-2 text-[13.5px] text-[#7a746c] no-underline hover:text-[#ff6a00]"><span className="text-[#ff6a00]">✆</span> 0937.148.222</a>
              <a href="tel:0907215252" className="flex items-center gap-2 text-[13.5px] text-[#7a746c] no-underline hover:text-[#ff6a00]"><span className="text-[#ff6a00]">✆</span> 0907.215.252</a>
              <a href="mailto:info@mayanhvietnam.com" className="flex items-center gap-2 text-[13.5px] text-[#7a746c] no-underline hover:text-[#ff6a00]"><span className="text-[#ff6a00]">✉</span> info@mayanhvietnam.com</a>
            </div>
          </div>

          {/* Stores */}
          <div>
            <h3 className="m-0 text-[12px] font-bold tracking-[0.14em] uppercase text-[#16130f]">Hệ thống cửa hàng</h3>
            <div className="flex flex-col gap-2.5 mt-4">
              {stores.map((st) => (
                <div key={st.id} className="border border-[#e2ded8] bg-white rounded-[13px] px-3.8 py-[13px] transition-all hover:border-[rgba(255,106,0,0.4)] hover:shadow-[0_14px_30px_-18px_rgba(255,106,0,0.45)] hover:-translate-y-[2px]">
                  <p className="m-0 text-[13px] font-bold text-[#16130f]">{st.name}</p>
                  <p className="mt-1.5 mb-0 text-[12px] line-clamp-2 leading-[1.5] text-[#7a746c]">{st.address}</p>
                  <p className="mt-1.2 mb-0 font-mono text-[10.5px] text-[#a39d94]">{st.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-[52px] border-t border-[#e2ded8] py-[22px] pb-[26px] flex items-center justify-between gap-4 flex-wrap">
          <div className="text-[11.5px] leading-[1.6] text-[#a39d94]">
            <p className="m-0">CÔNG TY TNHH DỊCH VỤ TƯ VẤN VÀ CÔNG NGHỆ SÀI GÒN</p>
            <p className="m-0">MST: 0313859872-002 · GPĐKKD: 0313859872-002 · Cấp ngày 05/08/2024 · Người chịu trách nhiệm nội dung: Nguyễn Hồng Chương</p>
          </div>
          <p className="m-0 text-[11.5px] text-[#a39d94]">© 2026 Máy Ảnh Việt Nam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
