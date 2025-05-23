import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: '21 Couture House | Zəriflik Sənəti',
  description: 'Sənətkarlığa və incəliyə olan dərin hörmətdən doğan atelyemiz, əbədi ənənələri müasir baxışla birləşdirir. Yüksək keyfiyyətli materiallar və fərdi ölçüyə uyğunlaşdırma.',
  keywords: 'couture, fashion, atelier, dəb, moda, zəriflik, geyim, azərbaycan dəbi, yüksək moda, xüsusi geyim',
  authors: [{ name: '21 Couture House' }],
  creator: '21 Couture House',
  publisher: '21 Couture House',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://21couture.az'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '21 Couture House | Zəriflik Sənəti',
    description: 'Sənətkarlığa və incəliyə olan dərin hörmətdən doğan atelyemiz, əbədi ənənələri müasir baxışla birləşdirir.',
    url: 'https://21couture.az',
    siteName: '21 Couture House',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: '21 Couture House - Yüksək dəb və zəriflik',
      },
    ],
    locale: 'az_AZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '21 Couture House | Zəriflik Sənəti',
    description: 'Sənətkarlığa və incəliyə olan dərin hörmətdən doğan atelyemiz, əbədi ənənələri müasir baxışla birləşdirir.',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  } satisfies Metadata['robots'],
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
}; 