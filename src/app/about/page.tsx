import type { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About Us | Hayat Family Restaurant Hubballi — Our Story',
  description: 'Learn about Hayat Family Restaurant Lazeez Pakwan — a Hubballi landmark serving authentic Mughal & Tandoor cuisine with warmth, heritage, and family hospitality.',
  alternates: { canonical: 'https://hayatfamilyrestaurant.in/about' },
}

export default function AboutPage() {
  return <AboutPageClient />
}
