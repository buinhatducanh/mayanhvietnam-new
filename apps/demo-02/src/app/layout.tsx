import type { Metadata, Viewport } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import { CartProvider } from '@/components/cart-context'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Mayanhvietnam — Máy ảnh, ống kính & thiết bị studio chính hãng',
  description:
    'Mayanhvietnam — Vì lợi ích khách hàng. Cung cấp máy ảnh, ống kính, flycam, thiết bị studio chính hãng với bảo hành toàn quốc 12-24 tháng.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafd' },
    { media: '(prefers-color-scheme: dark)', color: '#060a14' },
  ],
}

/* Inline script runs before paint to avoid flash of wrong theme */
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('demo-02-theme');
    var theme = stored === 'dark' || stored === 'light' ? stored : 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (_) {}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`bg-background ${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
