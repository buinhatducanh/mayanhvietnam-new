import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CheckoutClient } from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Thanh Toán & Đặt Hàng | Máy Ảnh Việt Nam',
  description: 'Tiến hành đặt hàng máy ảnh chính hãng, giao tận nơi toàn quốc hoặc nhận tại cửa hàng Cần Thơ.',
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main>
        <CheckoutClient />
      </main>
      <Footer />
    </>
  );
}
