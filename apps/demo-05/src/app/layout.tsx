import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: 'Máy Ảnh Việt Nam — Camera chính hãng · Trả góp 0% · Thu cũ đổi mới',
  description:
    'Hệ thống bán lẻ máy ảnh, máy quay phim, ống kính chính hãng Canon, Sony, Fujifilm, Nikon, DJI. Freeship đơn từ 5 triệu. Bảo hành 24 tháng. Trả góp 0% lãi suất.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <CartProvider>
          <Header />
          <main className="pt-[80px] md:pt-[136px]">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}