import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { CartClient } from './CartClient';

export const metadata: Metadata = {
  title: 'Giỏ Hàng | Máy Ảnh Việt Nam',
  description: 'Quản lý giỏ hàng và tiến hành thanh toán đơn hàng máy ảnh chính hãng tại Máy Ảnh Việt Nam.',
};

export default function CartPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main>
        <CartClient />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
