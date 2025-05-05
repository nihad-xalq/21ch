// import { Playfair_Display, Inter } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";
import RootWrapper from "@/components/RootWrapper";

// const playfair = Playfair_Display({
//   subsets: ['latin'],
//   variable: '--font-playfair',
//   display: 'swap',
// });

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: "Couture - Elegance Redefined",
  description: "Discover the art of bespoke fashion and timeless elegance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
    <html lang="en">
      <body className="antialiased font-sans">
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
