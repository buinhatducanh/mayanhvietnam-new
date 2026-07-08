import type { Metadata } from 'next';
import LayoutShell from './components/LayoutClient';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo 02 — mayanhvietnam.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
