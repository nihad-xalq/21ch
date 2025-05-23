import RootWrapper from '@/components/RootWrapper';
import { Montserrat } from 'next/font/google';
import { defaultMetadata } from './metadata';
import type { Metadata } from 'next';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" dir="ltr">
      <head>
        {/* Meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="21 Couture House - Əl işləri ilə hazırlanmış dəbdəbəli geyimlər, müasir və ənənəvi dizaynların vəhdəti. Yeni kolleksiyamızı kəşf edin."
        />
        <meta
          name="keywords"
          content="21 Couture, moda, dəb, əl işi, geyim, kolleksiya, atelye, Azərbaycan, lüks, couture"
        />
        <meta name="author" content="21 Couture House" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="21 Couture House" />
        <meta
          property="og:description"
          content="Əl işləri ilə hazırlanmış dəbdəbəli geyimlər və yeni kolleksiyalar. 21 Couture House ilə tanış olun."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://21couture.az" />
        <meta property="og:image" content="https://21couture.az/og-image.webp" />
        <meta property="og:locale" content="az_AZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="21 Couture House" />
        <meta
          name="twitter:description"
          content="Əl işləri ilə hazırlanmış dəbdəbəli geyimlər və yeni kolleksiyalar. 21 Couture House ilə tanış olun."
        />
        <meta name="twitter:image" content="https://21couture.az/og-image.webp" />

        <link rel="canonical" href="https://21couture.az" />
        <link rel="alternate" hrefLang="az" href="https://21couture.az" />

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/hero/hero-1.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/hero/hero-2.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/hero/hero-3.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/hero/hero-4.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body className={montserrat.className}>
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
