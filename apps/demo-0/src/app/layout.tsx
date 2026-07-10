import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Outfit, Geist_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'LUMEN Camera — Máy ảnh chính hãng cao cấp | 3D Demo',
  description:
    'Trải nghiệm mua sắm máy ảnh 3D đỉnh cao. Canon EOS R50, Sony A7C II, Fujifilm X-T5 chính hãng, giá tốt nhất. Demo 3D tương tác.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#09090b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`dark bg-background ${outfit.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
