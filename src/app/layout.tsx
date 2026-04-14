import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import InstallBanner from '@/components/pwa/InstallBanner'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BookingModalProvider } from '@/contexts/BookingModalContext'
import { BulkOrderModalProvider } from '@/contexts/BulkOrderModalContext'
import BookingModal from '@/components/booking/BookingModal'
import BulkOrderModal from '@/components/booking/BulkOrderModal'
import { restaurant } from '@/data/restaurant'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#1a0800',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hayatfamilyrestaurant.in'),
  applicationName: 'Hayat Family Restaurant',
  title: { default: 'Hayat Family Restaurant Hubballi | Authentic Mughal & Tandoor Cuisine', template: '%s | Hayat Family Restaurant Hubballi' },
  description: 'Hayat Family Restaurant Lazeez Pakwan in Hubballi serves authentic Mughal, North Indian & Tandoor cuisine — Beef Biryani, Tandoori Chicken, Kababs, Beef Gravies & more. Open daily 11 AM–11 PM, Shah Bazar Road.',
  keywords: ['Hayat Family Restaurant', 'Hubballi restaurant', 'best biryani Hubballi', 'Mughal cuisine Hubli', 'beef biryani Hubballi', 'tandoori chicken Hubballi', 'halal restaurant Hubballi', 'Lazeez Pakwan', 'Shah Bazar Road restaurant'],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Hayat',
  },
  formatDetection: { telephone: false },
  openGraph: {
    siteName: 'Hayat Family Restaurant',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/og/og-homepage.png', width: 1200, height: 630, alt: 'Hayat Family Restaurant Hubballi' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Hayat Family Restaurant Lazeez Pakwan',
  description: 'Premium Mughal, North Indian and Tandoor cuisine restaurant in Hubballi.',
  telephone: '+919740271679',
  url: 'https://hayatfamilyrestaurant.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bhandiwad Base, Shah Bazar Road, Behind Jamiya Masjid, Durgad Bail, New Hubli',
    addressLocality: 'Hubballi',
    addressRegion: 'Karnataka',
    postalCode: '580028',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 15.3647, longitude: 75.1240 },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '11:00',
    closes: '23:00',
  }],
  servesCuisine: ['Mughal', 'North Indian', 'Tandoor', 'Biryani', 'Kebab'],
  priceRange: '₹₹',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', reviewCount: '48' },
  hasMenu: 'https://hayatfamilyrestaurant.in/menu',
  image: 'https://hayatfamilyrestaurant.in/images/og/og-homepage.png',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        <BulkOrderModalProvider>
          <BookingModalProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <InstallBanner />
            <BookingModal />
            <BulkOrderModal />
          </BookingModalProvider>
        </BulkOrderModalProvider>
      </body>
    </html>
  )
}
