import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  title: 'Máy Ảnh Việt Nam — Máy ảnh, ống kính, flycam chính hãng',
  description:
    'Máy Ảnh Việt Nam — Phân phối máy ảnh, ống kính, flycam, action camera chính hãng giá tốt. Hệ thống 4 chi nhánh.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
