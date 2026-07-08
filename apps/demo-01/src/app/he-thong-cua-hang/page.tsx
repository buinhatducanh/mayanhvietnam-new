import { Metadata } from 'next';
import { MapPin, Phone, Clock } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { CountUp } from '@/components/animations/section-divider';
import { stores } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Hệ thống cửa hàng',
  description: '4 cửa hàng Máy Ảnh Việt Nam tại TP.HCM, Cần Thơ, An Giang, Tiền Giang.',
};

export default function StoresPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Hệ thống cửa hàng' }]} />
      <FadeIn>
        <h1 className="text-2xl font-bold text-foreground mt-6 mb-2">Hệ thống cửa hàng</h1>
        <p className="text-sm text-muted-foreground mb-8">
          <CountUp end={4} className="font-mono font-bold text-primary" /> cửa hàng · Trải nghiệm thực tế trước khi mua
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stores.map((store, i) => (
          <FadeIn key={store.id} delay={i * 0.1}>
            <article className="rounded-lg bg-card border border-border p-6 hover:border-primary/30 transition-all" id={store.id}>
              <h2 className="text-base font-semibold text-foreground mb-3">{store.name}</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a href="tel:+84937148222" className="hover:text-primary transition-colors">{store.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>{store.hours}</span>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
