"use client";

import React from "react";
import Link from "next/link";
import { stores } from "@/lib/products";

const IconMapPin = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconPhone = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

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

const POLICY_LINKS = [
  { label: "Chính sách bảo hành", href: "#" },
  { label: "Chính sách thanh toán", href: "#" },
  { label: "Chính sách đổi trả, Hoàn tiền", href: "#" },
  { label: "Chính sách vận chuyển", href: "#" },
  { label: "Bảo mật thông tin khách hàng", href: "#" },
  { label: "Thông tin liên hệ", href: "#" },
];

const QUICK_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/danh-muc" },
  { label: "Setup phòng studio", href: "/danh-muc#thiet-bi-studio" },
  { label: "Bảo hành", href: "#" },
  { label: "Liên hệ", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="font-sans relative bg-[#f6f4f0] text-[#7a746c] border-t border-[#e9e6e1]">
      {/* ── TOP SECTION — 4 columns ── */}
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ── COLUMN 1: Logo + Description + Social + Payments ── */}
          <div>
            <Link href="/" className="inline-block mb-4 no-underline">
              <div className="inline-flex items-center rounded-xl bg-[#16130f] px-3.5 py-[9px] shadow-sm">
                <img
                  src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png"
                  alt="Máy Ảnh Việt Nam"
                  width={150}
                  height={30}
                  className="h-[30px] w-[150px] object-contain object-left block"
                />
              </div>
            </Link>
            <p className="text-[13px] leading-relaxed text-[#7a746c] mb-5 max-w-[300px]">
              Máy Ảnh Việt Nam là đơn vị tiên phong trong lĩnh vực phân phối và bán lẻ các sản phẩm máy ảnh tại thị trường Việt Nam.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mb-6">
              <a
                href="https://www.youtube.com/@benhvienmayanhvietnam950"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="Youtube: Máy Ảnh Việt Nam"
                className="w-9 h-9 rounded-md bg-white border border-[#e2ded8] flex items-center justify-center text-[#7a746c] no-underline transition-all hover:text-[#ff0000] hover:border-[#ff0000]/40 hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-10px_rgba(255,0,0,0.4)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z"></path>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/mayanhvietnam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook: Máy Ảnh Việt Nam"
                className="w-9 h-9 rounded-md bg-white border border-[#e2ded8] flex items-center justify-center text-[#7a746c] no-underline transition-all hover:text-[#1877f2] hover:border-[#1877f2]/40 hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-10px_rgba(24,119,242,0.4)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.76l-.44 2.9h-2.32V22c4.78-.75 8.44-4.91 8.44-9.94Z"></path>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@mayanhvietnam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="TikTok: Máy Ảnh Việt Nam"
                className="w-9 h-9 rounded-md bg-white border border-[#e2ded8] flex items-center justify-center text-[#7a746c] no-underline transition-all hover:text-[#16130f] hover:border-[#16130f]/40 hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-10px_rgba(22,19,15,0.4)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 15.66a6.34 6.34 0 0 0 10.86-4.42V8.43a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.86z" />
                </svg>
              </a>
              <a
                href="mailto:info@mayanhvietnam.com"
                aria-label="Email"
                title="Email: Máy Ảnh Việt Nam"
                className="w-9 h-9 rounded-md bg-white border border-[#e2ded8] flex items-center justify-center text-[#7a746c] no-underline transition-all hover:text-[#ff6a00] hover:border-[#ff6a00]/40 hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-10px_rgba(255,106,0,0.4)]"
              >
                <IconMail className="w-4 h-4" />
              </a>
              <a
                href="tel:0907215252"
                aria-label="Hotline"
                title="Gọi ngay"
                className="w-9 h-9 rounded-md bg-white border border-[#e2ded8] flex items-center justify-center text-[#7a746c] no-underline transition-all hover:text-[#10b981] hover:border-[#10b981]/40 hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-10px_rgba(16,185,129,0.4)]"
              >
                <IconPhone className="w-4 h-4" />
              </a>
            </div>

            {/* Payment methods */}
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#7a746c] mb-2">
              Phương thức thanh toán
            </p>
            <div className="grid grid-cols-3 gap-1.5 mb-5">
              {payments.map((pm, idx) => (
                <div
                  key={idx}
                  title={pm.name}
                  className="relative aspect-[1.6/1] rounded-[9px] bg-white border border-[#e2ded8] overflow-hidden transition-all hover:border-[#ff6a00]/40 hover:-translate-y-[1px] hover:shadow-[0_6px_14px_-8px_rgba(255,106,0,0.35)]"
                >
                  <img src={pm.src} alt={pm.name} className="absolute inset-0 w-full h-full object-contain p-1.5" />
                </div>
              ))}
            </div>

            {/* BCT */}
            <a
              href="http://online.gov.vn/Home/WebDetails/140624"
              target="_blank"
              rel="nofollow"
              className="inline-block transition-transform hover:-translate-y-[2px]"
            >
              <img
                src="https://mayanhvietnam.com/asset/imgs/icon/dathongbaobocongthuong.png"
                alt="Bộ Công Thương"
                className="h-16 w-auto"
              />
            </a>
          </div>

          {/* ── COLUMN 2: Chính sách + Liên hệ ── */}
          <div>
            <h4 className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#16130f] mb-4">
              Chính sách
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {POLICY_LINKS.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="text-[13px] text-[#7a746c] no-underline transition-all hover:text-[#ff6a00] hover:pl-1 inline-block"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#16130f] mt-7 mb-4">
              Thông tin liên hệ
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5 text-[13px]">
              <li className="flex items-start gap-2.5">
                <IconMapPin className="w-3.5 h-3.5 text-[#ff6a00] mt-0.5 shrink-0" />
                <a
                  href="https://www.facebook.com/mayanhvietnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7a746c] no-underline hover:text-[#ff6a00]"
                >
                  Fanpage: <span className="font-semibold">Máy Ảnh Việt Nam</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconPhone className="w-3.5 h-3.5 text-[#ff6a00] mt-0.5 shrink-0" />
                <span className="text-[#7a746c]">
                  Hotline:{" "}
                  <a href="tel:0907215252" className="font-bold text-[#ff6a00] no-underline hover:underline">
                    0907-215-252
                  </a>
                  <span className="text-[#a39d94] mx-1">|</span>
                  <a href="tel:0937148222" className="font-bold text-[#ff6a00] no-underline hover:underline">
                    0937-148-222
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconMail className="w-3.5 h-3.5 text-[#ff6a00] mt-0.5 shrink-0" />
                <span className="text-[#7a746c]">
                  Email:{" "}
                  <a
                    href="mailto:info@mayanhvietnam.com"
                    className="text-[#7a746c] no-underline hover:text-[#ff6a00]"
                  >
                    info@mayanhvietnam.com
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* ── COLUMN 3 & 4 merged: Hệ thống cửa hàng ── */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#16130f] mb-4">
              Hệ thống cửa hàng
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {stores.map((s) => (
                <div
                  key={s.id}
                  className="flex items-start gap-2.5 p-3.5 rounded-[13px] border border-[#e2ded8] bg-white transition-all hover:border-[#ff6a00]/40 hover:shadow-[0_14px_30px_-18px_rgba(255,106,0,0.45)] hover:-translate-y-[2px]"
                >
                  <IconMapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#ff6a00]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#16130f] mb-0.5">{s.name}</p>
                    <p className="text-[11.5px] text-[#7a746c] leading-relaxed">{s.address}</p>
                    <div className="flex items-center justify-between gap-2 mt-1.5">
                      <p className="text-[10.5px] text-[#a39d94] font-mono">{s.hours}</p>
                      <a
                        href={`tel:${s.phone.replace(/\./g, "")}`}
                        className="text-[11px] font-semibold text-[#ff6a00] no-underline hover:underline shrink-0"
                      >
                        📞 {s.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── COPYRIGHT SECTION ── */}
      <div className="border-t border-[#e2ded8] bg-[#efece7]">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-center">
            {/* Copyright text */}
            <div className="lg:col-span-2 text-[11.5px] text-[#7a746c] leading-relaxed">
              <p className="m-0">
                © 2026{" "}
                <span className="font-semibold text-[#16130f]">
                  CÔNG TY TNHH DỊCH VỤ TƯ VẤN VÀ CÔNG NGHỆ SÀI GÒN
                </span>
                <span className="text-[#10b981] ml-1">✓</span>
              </p>
              <p className="mt-1.5 mb-0">
                • Địa chỉ: Số 09 Nam Quốc Cang, Phường Bến Thành, TP Hồ Chí Minh. Mã số thuế:{" "}
                <span className="font-mono text-[#16130f]">0313859872-002</span>
              </p>
              <p className="mt-1 mb-0">
                • GPĐKKD số:{" "}
                <span className="font-mono text-[#16130f]">0313859872-002</span>. Đơn vị cấp: Sở Kế Hoạch và Đầu Tư TP.HCM, cấp ngày 05 tháng 08 năm 2024.
              </p>
              <p className="mt-1 mb-0">
                • Điện thoại:{" "}
                <a href="tel:0903148222" className="text-[#7a746c] no-underline hover:text-[#ff6a00]">
                  0903 148 222
                </a>
                . Email:{" "}
                <a
                  href="mailto:info@mayanhvietnam.com"
                  className="text-[#7a746c] no-underline hover:text-[#ff6a00]"
                >
                  info@mayanhvietnam.com
                </a>
              </p>
              <p className="mt-1 mb-0">
                Chịu trách nhiệm nội dung:{" "}
                <span className="font-medium text-[#16130f]">Nguyễn Hồng Chương</span>.
              </p>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-1 lg:text-right">
              <ul className="list-none m-0 p-0 flex flex-wrap items-center justify-start lg:justify-end gap-x-4 gap-y-2 text-[12px]">
                {QUICK_LINKS.map((q) => (
                  <li key={q.label}>
                    <Link
                      href={q.href}
                      className="text-[#7a746c] no-underline transition-colors hover:text-[#ff6a00]"
                    >
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
