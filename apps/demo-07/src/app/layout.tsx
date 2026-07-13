import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CameraVietNam – Máy Ảnh Kỹ Thuật Số Chính Hãng',
  description: 'Chuyên cung cấp máy ảnh kỹ thuật số, ống kính, và phụ kiện nhiếp ảnh chính hãng. Canon, Nikon, Sony, Fujifilm – bảo hành chính hãng, giao hàng toàn quốc.',
  keywords: 'máy ảnh, camera, ống kính, Sony, Canon, Nikon, Fujifilm, máy ảnh kỹ thuật số, mirrorless, DSLR',
  openGraph: {
    title: 'CameraVietNam – Máy Ảnh Kỹ Thuật Số Chính Hãng',
    description: 'Chuyên cung cấp máy ảnh kỹ thuật số, ống kính, và phụ kiện nhiếp ảnh chính hãng.',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
