import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { StudioSetupService } from '@/components/marketing/StudioSetupService';

export const metadata: Metadata = {
  title: 'Dịch Vụ Lắp Phòng & Setup Phòng Studio Chuyên Nghiệp | Máy Ảnh Việt Nam',
  description: 'Tư vấn thi công và cung cấp thiết bị phòng studio trọn gói: đèn studio, softbox, phông nền, trục treo, chân đèn chất lượng cao.',
  alternates: { canonical: 'https://mayanhvietnam.com/dich-vu-lap-phong' },
};

export default function StudioServicePage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main id="main-content">
        <StudioSetupService />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
