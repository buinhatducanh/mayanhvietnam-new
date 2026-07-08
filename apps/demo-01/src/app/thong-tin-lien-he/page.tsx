import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { stores } from '@/lib/mock-data';
import { formatPhone } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Thông tin liên hệ',
  description: 'Liên hệ Máy Ảnh Việt Nam — Hotline: 0937.148.222 · Email: info@mayanhvietnam.com · 4 cửa hàng toàn quốc.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Liên hệ' }]} />
      <FadeIn>
        <h1 className="text-2xl font-bold text-foreground mt-6 mb-8">Thông tin liên hệ</h1>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <FadeIn delay={0.1}>
          <div className="rounded-lg bg-card border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Liên hệ trực tiếp</h2>
            <div className="space-y-3 text-sm">
              <a href="tel:+84937148222" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                Hotline: 0937.148.222
              </a>
              <a href="mailto:info@mayanhvietnam.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                info@mayanhvietnam.com
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                T2–CN: 08:00–21:00
              </div>
            </div>
          </div>
        </FadeIn>

        {stores.map((store, i) => (
          <FadeIn key={store.id} delay={0.1 + i * 0.1}>
            <div className="rounded-lg bg-card border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{store.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{store.address}</p>
              <p className="text-xs text-muted-foreground">📞 {formatPhone(store.phone)} · 🕐 {store.hours}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
