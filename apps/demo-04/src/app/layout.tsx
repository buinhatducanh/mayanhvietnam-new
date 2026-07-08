import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo demo-04 — mayanhvietnam.com',
  description: 'Demo interface demo-04 for mayanhvietnam.com',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
