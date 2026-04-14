import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import AboutTeaser from '@/components/sections/AboutTeaser'
import MenuPreview from '@/components/sections/MenuPreview'
import SignatureHighlight from '@/components/sections/SignatureHighlight'
import ReservationsTeaser from '@/components/sections/ReservationsTeaser'
import GalleryStrip from '@/components/sections/GalleryStrip'
import BulkOrdersSection from '@/components/sections/BulkOrdersSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import USPBar from '@/components/sections/USPBar'

export const metadata: Metadata = {
  title: 'Hayat Family Restaurant Hubballi | Best Biryani, Tandoori & Mughal Cuisine',
  description: 'Hayat Family Restaurant Lazeez Pakwan in Hubballi — serving authentic Mughal & Tandoor cuisine. Beef Biryani, Tandoori Chicken, Kababs & more. Open daily 11 AM–11 PM, Shah Bazar Road.',
  alternates: { canonical: 'https://hayatfamilyrestaurant.in' },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutTeaser />
      <MenuPreview />
      <SignatureHighlight />
      <ReservationsTeaser />
      <GalleryStrip />
      <BulkOrdersSection />
      <ReviewsSection />
      <USPBar />
    </>
  )
}
