import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Insta360 Official Store",
  description: "Shop the full range of Insta360 cameras and accessories.",
  icons: {
    icon: "https://res.insta360.com/static/b8721190913876c5c9f91ee12ec8dd5f/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}