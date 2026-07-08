import { Truck, ShieldCheck, Award, ShoppingCart } from 'lucide-react';

const TRUST = [
  {
    icon: Truck,
    title: 'Giao hàng toàn quốc',
    desc: 'Miễn phí đơn từ 500K, giao tận nơi',
  },
  {
    icon: ShieldCheck,
    title: 'Sản phẩm chính hãng',
    desc: 'Cam kết 100% hàng chính hãng',
  },
  {
    icon: Award,
    title: 'Bảo hành 24 tháng',
    desc: 'Hỗ trợ đổi trả trong 30 ngày',
  },
  {
    icon: ShoppingCart,
    title: 'Thanh toán dễ dàng',
    desc: 'Ví điện tử, thẻ, trả góp 0%',
  },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid grid-cols-2 divide-border sm:grid-cols-4 sm:divide-x">
          {TRUST.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 px-4 py-4">
              <div
                className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ background: 'rgba(255,107,53,0.1)' }}
              >
                <Icon className="h-4 w-4" style={{ color: '#FF6B35' }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{title}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}