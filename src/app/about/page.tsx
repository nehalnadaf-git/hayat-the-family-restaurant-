import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { restaurant } from '@/data/restaurant'
import AboutBookingCTA from './AboutBookingCTA'

export const metadata: Metadata = {
  title: 'About Us | Hayat Family Restaurant Hubballi — Our Story',
  description: 'Learn about Hayat Family Restaurant Lazeez Pakwan — a Hubballi landmark serving authentic Mughal & Tandoor cuisine with warmth, heritage, and family hospitality.',
  alternates: { canonical: 'https://hayatfamilyrestaurant.in/about' },
}

const pillars = [
  { icon: '🌿', title: 'Authentic Ingredients', desc: 'We source the finest spices, freshest meats, and premium Basmati rice to ensure every dish meets our exacting Mughal standards.' },
  { icon: '🔥', title: 'Mughal Culinary Heritage', desc: "Our recipes carry the legacy of North India's royal kitchens — slow-cooked, layered, and infused with generations of culinary wisdom and passion." },
  { icon: '❤️', title: 'Family Warmth', desc: 'From the moment you walk in, you are treated as an honored Mehman. Our hospitality is as warm and rich as the food we serve.' },
]

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section style={{ position: 'relative', background: 'var(--color-navy)', minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/restaurant/outside-front.png" alt="Hayat Restaurant Front" fill priority sizes="100vw" style={{ objectFit: 'cover', opacity: 0.3 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px' }}>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Know Our Story</p>
          <h1 className="heading-hero" style={{ fontSize: 'clamp(40px, 7vw, 72px)', color: 'var(--color-ivory)' }}>Our Story</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--color-ivory-muted)', marginTop: '16px', maxWidth: '480px', margin: '16px auto 0', lineHeight: 1.7 }}>
            Lazeez Pakwan — Where Every Bite Tells a Story, in the heart of Hubballi
          </p>
        </div>
      </section>

      {/* Origin & Heritage */}
      <section style={{ background: 'var(--color-ivory)', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Origin & Heritage</p>
            <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '24px' }}>
              Born From a Passion for Authentic Mughal Flavours
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: '#4A3728', lineHeight: 1.8, marginBottom: '20px' }}>
              Hayat Family Restaurant Lazeez Pakwan was born from a simple yet powerful vision: to bring the grandeur of Mughal and North Indian cuisine to the heart of Hubballi. Nestled on Shah Bazar Road behind Jamiya Masjid, our restaurant has become a beloved landmark — a place where families gather, celebrations unfold, and memories are made over steaming plates of biryani and sizzling kababs.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: '#4A3728', lineHeight: 1.8 }}>
              Our culinary team draws inspiration from the royal kitchens of the Mughal era, bringing time-honoured recipes to life with locally sourced ingredients. The name &quot;Hayat&quot; — meaning Life — reflects our belief that great food is the celebration of life itself.
            </p>
          </div>
          <div style={{ position: 'relative', aspectRatio: '1', borderRadius: '4px', overflow: 'hidden', outline: '2px solid var(--color-gold)', outlineOffset: '6px', transform: 'rotate(-1deg)', boxShadow: '0 24px 64px rgba(44,26,14,0.15)' }}>
            <Image src="/images/restaurant/entrance.png" alt="Hayat Restaurant Entrance" fill sizes="(max-width:768px) 90vw, 45vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* 3 Pillars on Gold bg */}
      <section style={{ background: 'var(--color-gold)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '56px' }}>What Makes Us Hayat</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {pillars.map(p => (
              <div key={p.title} style={{ background: 'rgba(44,26,14,0.06)', borderRadius: '4px', padding: '36px 28px', textAlign: 'left', border: '1px solid rgba(44,26,14,0.12)' }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '22px', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '12px' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(44,26,14,0.8)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section style={{ background: 'var(--color-charcoal)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="heading-section" style={{ color: 'var(--color-ivory)', marginBottom: '40px', textAlign: 'center' }}>Inside Hayat</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { src: '/images/restaurant/dining-hall.jpg', alt: 'Dining Hall' },
              { src: '/images/restaurant/ac-section.jpg', alt: 'AC Section' },
              { src: '/images/restaurant/family-section.jpg', alt: 'Family Section' },
            ].map(img => (
              <div key={img.alt} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212,168,83,0.3)' }}>
                <Image src={img.src} alt={img.alt} fill sizes="(max-width:768px) 90vw, 33vw" style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Come Dine With Us CTA */}
      <section style={{ background: 'var(--color-navy)', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: '16px' }}>Join Us</p>
        <h2 className="heading-section" style={{ color: 'var(--color-ivory)', marginBottom: '20px' }}>Come Dine With Us</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--color-ivory-muted)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.8 }}>
          Experience the magic of Hayat — where every meal is a celebration and every guest is our honored Mehman.
        </p>
        <AboutBookingCTA />
      </section>
    </div>
  )
}
