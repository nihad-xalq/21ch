import type { Metadata } from 'next';
import { defaultMetadata } from './metadata';
import { Montserrat } from 'next/font/google';
import './globals.css';
import RootWrapper from '@/components/RootWrapper';

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
        <link rel="canonical" href="https://21couture.az" />
        <link rel="alternate" hrefLang="az" href="https://21couture.az" />

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/hero-bg.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className={montserrat.className}>
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
