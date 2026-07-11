import Link from "next/link";
import Image from "next/image";
import { footerColumns, COMPANY_NAME, paymentIcons } from "@/data/store";

export default function StoreFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-gray-900 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
              alt={COMPANY_NAME}
              width={120}
              height={32}
              className="h-7 w-auto brightness-0 invert"
              unoptimized
            />
            <span className="text-xs text-gray-400">© 2026 {COMPANY_NAME}. Mọi quyền được bảo lưu.</span>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {paymentIcons.map((icon) => (
              <Image
                key={icon.name}
                src={icon.url}
                alt={icon.name}
                width={48}
                height={20}
                className="h-5 w-auto object-contain opacity-70"
                unoptimized
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
