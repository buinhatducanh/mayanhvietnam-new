import type { Metadata } from 'next';
import RootShell from './components/RootClient';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo 03 — mayanhvietnam.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
