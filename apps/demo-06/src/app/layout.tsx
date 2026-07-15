import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Máy Ảnh Việt Nam — Canon | Sony | Nikon | DJI Chính Hãng",
  description:
    "Máy Ảnh Việt Nam — Hệ thống cửa hàng máy ảnh chính hàng từ 2010. Canon, Sony, Nikon, Fujifilm, DJI, GoPro, Insta360. Tư vấn miễn phí, bảo hành đến 5 năm.",
  keywords: [
    "máy ảnh",
    "máy ảnh chính hãng",
    "Canon",
    "Sony",
    "Nikon",
    "DJI",
    "flycam",
    "ống kính",
    "máy quay phim",
    "action camera",
    "mayanhvietnam",
  ],
  icons: {
    icon: "https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png",
  },
  openGraph: {
    title: "Máy Ảnh Việt Nam — Canon | Sony | Nikon | DJI Chính Hãng",
    description:
      "Hệ thống cửa hàng máy ảnh chính hãng từ 2010. Canon, Sony, Nikon, DJI, GoPro — Tư vấn miễn phí, bảo hành đến 5 năm.",
    siteName: "Máy Ảnh Việt Nam",
    locale: "vi_VN",
    type: "website",
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
    <html lang="vi" className="antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
