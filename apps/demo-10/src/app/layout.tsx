import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo demo-10 — mayanhvietnam.com',
  description: 'Demo interface demo-10 for mayanhvietnam.com',
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
