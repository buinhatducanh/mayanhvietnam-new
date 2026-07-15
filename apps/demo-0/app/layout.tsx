import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Máy Ảnh Việt Nam — Trải nghiệm 3D tương tác",
  description: "Trải nghiệm Landing Page 3D tương tác — đổi màu 3D model real-time, showcase Canon EOS R50 / Sony A7C II / Fujifilm X-T5 chính hãng Máy Ảnh Việt Nam.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fafaf8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased text-[#16130f]">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
