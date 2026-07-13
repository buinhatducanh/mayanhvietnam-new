import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-brand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Demo 07 — mayanhvietnam.com',
  description: 'Demo 07 for mayanhvietnam.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`antialiased ${beVietnamPro.variable} ${plusJakartaSans.variable} ${ibmPlexMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
