import type { Metadata } from 'next';
import Providers from './providers';
import LayoutShell from './components/LayoutClient';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo 04 — mayanhvietnam.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <LayoutShell />
          {children}
        </Providers>
      </body>
    </html>
  );
}
