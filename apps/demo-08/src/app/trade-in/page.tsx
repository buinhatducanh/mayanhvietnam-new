import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { TradeInWidget } from '@/components/widgets/TradeInWidget';

export const metadata: Metadata = {
  title: 'Thu Mua & Trade-in Định Giá Máy Cũ | Máy Ảnh Việt Nam',
  description: 'Định giá tự động máy ảnh, ống kính cũ chỉ trong 30 giây. Trợ giá lên đời đến 3 triệu đồng.',
};

export default function TradeInPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '32px 0 64px' }}>
        <TradeInWidget />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
