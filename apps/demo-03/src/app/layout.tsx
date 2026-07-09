import type { Metadata, Viewport } from 'next';
import Providers from './providers';
import RootShell from './components/RootClient';
import './globals.css';

export const metadata: Metadata = {
  title: 'LENS PRO — Máy Ảnh Việt Nam | Chính hãng · Giá tốt nhất',
  description:
    'LENS PRO — Hệ thống cửa hàng máy ảnh, ống kính, flycam chính hãng. Bảo hành 24 tháng, trả góp 0%, giao hàng miễn phí toàn quốc. Đại lý ủy quyền Canon, Sony, Nikon, DJI.',
  keywords: ['máy ảnh', 'ống kính', 'flycam', 'DJI', 'Canon', 'Sony', 'Nikon', 'Fujifilm', 'chính hãng'],
  authors: [{ name: 'LENS PRO Vietnam' }],
  openGraph: {
    title: 'LENS PRO — Máy Ảnh Việt Nam',
    description: 'Mua máy ảnh chính hãng, giá tốt nhất, bảo hành 24 tháng.',
    locale: 'vi_VN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ff6b00',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <RootShell>{children}</RootShell>
        </Providers>
      </body>
    </html>
  );
}