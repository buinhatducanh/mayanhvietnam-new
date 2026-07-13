import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Outfit, Geist_Mono } from 'next/font/google';
import './globals.css';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { FloatingCTA } from '@/components/floating-cta';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: {
    default: 'Máy Ảnh Việt Nam — Trải nghiệm 3D | Canon, Sony, Nikon, DJI chính hãng',
    template: '%s | Máy Ảnh Việt Nam',
  },
  description:
    'Máy Ảnh Việt Nam — đơn vị tiên phong phân phối máy ảnh, ống kính, flycam, action camera chính hãng. Trải nghiệm 3D tương tác, bảo hành 12-24 tháng, 4 cửa hàng toàn quốc.',
  keywords: [
    'máy ảnh', 'Canon', 'Sony', 'Nikon', 'Fujifilm', 'DJI', 'GoPro',
    'chính hãng', 'mayanhvietnam', 'mua máy ảnh', 'bảo hành máy ảnh',
    '3D camera', 'ống kính', 'flycam', 'action camera',
  ],
  authors: [{ name: 'Máy Ảnh Việt Nam' }],
  openGraph: {
    title: 'Máy Ảnh Việt Nam — Trải nghiệm 3D',
    description: 'Canon, Sony, Nikon, DJI chính hãng — xem trực tiếp 3D, bảo hành toàn quốc.',
    locale: 'vi_VN',
    type: 'website',
    siteName: 'Máy Ảnh Việt Nam',
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#ff6a00',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`dark bg-background ${outfit.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingCTA />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
