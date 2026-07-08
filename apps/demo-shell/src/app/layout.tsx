import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo Gallery — mayanhvietnam.com',
  description: 'Gallery preview for 10 FE demo projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
