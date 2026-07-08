import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingCTA } from '@/components/layout/floating-cta';
import './globals.css';

const BRAND = 'Máy Ảnh Việt Nam';

export const metadata: Metadata = {
  title: {
    default: `${BRAND} — Cửa hàng máy ảnh, ống kính chính hãng giá tốt`,
    template: `%s | ${BRAND}`,
  },
  description: `${BRAND} — Cửa hàng máy ảnh, ống kính, flycam, camera hành động chính hãng. Flash sale hàng ngày · Freeship từ 5 triệu · 4 cửa hàng toàn quốc.`,
  keywords: [
    'máy ảnh', 'mua máy ảnh', 'máy ảnh chính hãng', 'ống kính',
    'Canon', 'Sony', 'Nikon', 'DJI', 'GoPro',
    'máy ảnh mirrorless', 'flycam', 'action camera',
    'thu cũ đổi mới', 'trả góp máy ảnh',
    'máy ảnh Việt Nam', 'mayanhvietnam',
  ],
  authors: [{ name: BRAND }],
  creator: BRAND,
  metadataBase: new URL('https://mayanhvietnam.com'),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://mayanhvietnam.com',
    title: `${BRAND} — Cửa hàng máy ảnh chính hãng giá tốt`,
    description: 'Mua máy ảnh, ống kính, flycam chính hãng · Flash sale · Freeship từ 5 triệu',
    siteName: BRAND,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND} — Cửa hàng máy ảnh chính hãng`,
    description: 'Mua máy ảnh, ống kính, flycam chính hãng · Flash sale · Freeship',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'theme-color': '#0a0a0f',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <head>
        {/* Outfit (body) + Playfair Display (headings) + JetBrains Mono (prices) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily:
            "'Outfit', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Bỏ qua đến nội dung chính
        </a>
        <ThemeProvider>
          <Header />
          <main
            id="main-content"
            className="min-h-screen pt-16 md:pt-[140px]"
          >
            {children}
          </main>
          <Footer />
          <FloatingCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}