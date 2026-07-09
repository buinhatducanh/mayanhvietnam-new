'use client';

import { Truck, ShieldCheck, Headphones, CreditCard } from 'lucide-react';

const ITEMS = [
  { icon: <Truck size={24} />, title: 'Giao hàng toàn quốc', desc: 'Miễn phí ship đơn từ 500.000₫' },
  { icon: <ShieldCheck size={24} />, title: 'Sản phẩm chính hãng', desc: '100% hàng nhập khẩu trực tiếp' },
  { icon: <Headphones size={24} />, title: 'Bảo hành dài hạn', desc: '12–24 tháng tùy sản phẩm' },
  { icon: <CreditCard size={24} />, title: 'Thanh toán đa dạng', desc: 'Tiền mặt · MoMo · VNPay · Trả góp' },
];

export default function TrustBadges() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50/50 transition-colors group"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-orange-50 text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                {it.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-800 leading-tight">{it.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5 truncate">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
