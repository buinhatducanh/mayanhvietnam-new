import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartDrawer } from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://mayanhvietnam.com"),
  title: {
    default: "Máy Ảnh Việt Nam — Hệ Thống Bán Máy Ảnh Chính Hãng Cần Thơ",
    template: "%s | Máy Ảnh Việt Nam",
  },
  description:
    "Máy Ảnh Việt Nam — Hệ thống bán máy ảnh, ống kính, flycam, action camera chính hãng tại Cần Thơ, HCM, An Giang, Tiền Giang. Canon, Sony, Nikon, DJI, GoPro giá tốt nhất.",
  keywords: [
    "máy ảnh",
    "máy ảnh Cần Thơ",
    "máy ảnh mirrorless",
    "Canon",
    "Sony",
    "Nikon",
    "ống kính",
    "flycam",
    "DJI",
    "action camera",
    "GoPro",
    "thiết bị studio",
  ],
  authors: [{ name: "Máy Ảnh Việt Nam" }],
  creator: "Máy Ảnh Việt Nam",
  publisher: "Máy Ảnh Việt Nam",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://mayanhvietnam.com",
    siteName: "Máy Ảnh Việt Nam",
    title: "Máy Ảnh Việt Nam — Máy Ảnh Chính Hãng Giá Tốt",
    description:
      "Hệ thống cửa hàng máy ảnh uy tín tại Cần Thơ, HCM, An Giang, Tiền Giang. Canon, Sony, Nikon, DJI chính hãng.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Máy Ảnh Việt Nam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Máy Ảnh Việt Nam — Máy Ảnh Chính Hãng",
    description: "Hệ thống bán máy ảnh chính hãng Cần Thơ, HCM, An Giang, Tiền Giang.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mayanhvietnam.com",
  },
  verification: {
    google: "google-site-verification-token",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#F97316" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <CartDrawer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
