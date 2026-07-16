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
      <head>
        {/* Preload heavy 3D models — avoids scroll-triggered loading lag */}
        <link rel="preload" as="fetch" href="/assets/models/drone.glb" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/assets/models/canon-r50.glb" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/assets/models/action-cam.glb" crossOrigin="anonymous" />
        {/* Preload key images used in scroll animations */}
        <link rel="preload" as="image" href="/assets/images/pavel-s-esYrpYZ_5JI-unsplash.jpg" />
        <link rel="preload" as="image" href="https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-12/230212121212567/avatar/01_flycam-dji-mavic-air-2-chinh-hang.jpg" />
      </head>
      <body className="font-sans antialiased text-[#16130f]">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
