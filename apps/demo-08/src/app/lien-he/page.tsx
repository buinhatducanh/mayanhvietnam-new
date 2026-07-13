import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Hệ Thống Cửa Hàng & Liên Hệ | Máy Ảnh Việt Nam',
  description: 'Danh sách 4 showroom Máy Ảnh Việt Nam tại Cần Thơ, TP. HCM, An Giang, Tiền Giang. Hotline hỗ trợ 24/7: 0937.148.222',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactClient />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
