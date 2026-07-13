import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OrderConfirmClient } from './OrderConfirmClient';

export const metadata: Metadata = {
  title: 'Xác Nhận Đơn Hàng | Máy Ảnh Việt Nam',
  description: 'Đơn hàng của bạn đã được tiếp nhận thành công tại hệ thống Máy Ảnh Việt Nam.',
};

export default function OrderConfirmPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>Đang tải thông tin đơn hàng...</div>}>
          <OrderConfirmClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
