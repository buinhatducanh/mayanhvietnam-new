import { Truck, ShieldCheck, Award } from 'lucide-react';

const SIGNALS = [
  {
    icon: Truck,
    label: 'Giao hàng toàn quốc',
    desc: 'Miễn phí với đơn từ 2 triệu',
  },
  {
    icon: ShieldCheck,
    label: 'Sản phẩm chính hãng',
    desc: 'Cam kết 100% chính hãng',
  },
  {
    icon: Award,
    label: 'Bảo hành lâu dài',
    desc: 'Bảo hành chính hãng 2 năm',
  },
];

export function TrustSignalsBar() {
  return (
    <div className="landing-trust">
      {SIGNALS.map((signal) => (
        <div key={signal.label} className="landing-trust__item">
          <div className="landing-trust__icon">
            <signal.icon size={20} aria-hidden="true" />
          </div>
          <div>
            <div className="landing-trust__text-label">{signal.label}</div>
            <div className="landing-trust__text-desc">{signal.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
