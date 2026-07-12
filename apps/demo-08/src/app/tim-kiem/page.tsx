import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchClient } from './SearchClient';

export const metadata: Metadata = {
  title: 'Tìm Kiếm Sản Phẩm | Máy Ảnh Việt Nam',
  description: 'Tìm kiếm máy ảnh, ống kính, flycam, phụ kiện chính hãng giá tốt tại Máy Ảnh Việt Nam.',
};

export default function SearchPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>Đang tìm kiếm...</div>}>
          <SearchClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
