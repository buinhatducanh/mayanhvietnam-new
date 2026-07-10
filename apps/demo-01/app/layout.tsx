import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import { CartProvider } from '@/components/cart-context'
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
  themeColor: '#08080C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      className={`bg-background ${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
