import type { Metadata } from 'next';
import { Outfit, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingCTA } from '@/components/layout/floating-cta';
import './globals.css';

const BRAND = 'Máy Ảnh Việt Nam';
const SITE_URL = 'https://mayanhvietnam.com';
const SITE_TITLE = `${BRAND} — Cửa hàng máy ảnh, ống kính chính hãng giá tốt`;
const SITE_DESCRIPTION = `${BRAND} — Cửa hàng máy ảnh, ống kính, flycam, camera hành động chính hãng. Flash sale hàng ngày · Freeship từ 5 triệu · 4 cửa hàng toàn quốc.`;

// Tier 1.1 — Next.js font (zero-CLS, không load link Google Fonts cũ)
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${BRAND}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'máy ảnh',
    'mua máy ảnh',
    'máy ảnh chính hãng',
    'ống kính',
    'Canon',
    'Sony',
    'Nikon',
    'DJI',
    'GoPro',
    'máy ảnh mirrorless',
    'flycam',
    'action camera',
    'thu cũ đổi mới',
    'trả góp máy ảnh',
    'máy ảnh Việt Nam',
    'mayanhvietnam',
  ],
  authors: [{ name: BRAND, url: SITE_URL }],
  creator: BRAND,
  publisher: BRAND,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: BRAND,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${BRAND} — Cửa hàng máy ảnh chính hãng`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
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
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  manifest: '/manifest.webmanifest',
  category: 'shopping',
  classification: 'E-commerce · Máy ảnh · Ống kính · Thiết bị nhiếp ảnh',
  verification: {
    google: 'google-site-verification-placeholder',
  },
  other: {
    'theme-color': '#0a0a0f',
    'format-detection': 'telephone=yes',
    'HandheldFriendly': 'True',
    'MobileOptimized': '320',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`dark ${outfit.variable} ${playfair.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* DNS prefetch + preconnect cho mayanhvietnam.com CDN */}
        <link rel="preconnect" href="https://mayanhvietnam.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://mayanhvietnam.com" />
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily:
            'var(--font-outfit), -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Bỏ qua đến nội dung chính
        </a>
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main
              id="main-content"
              className="min-h-screen pt-16 md:pt-[140px]"
            >
              {children}
            </main>
            <Footer />
            <FloatingCTA />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
