'use client'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { restaurant } from '@/data/restaurant'
import { useBookingModal } from '@/contexts/BookingModalContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const photos = [
  { src: '/images/restaurant/dining-hall.webp', alt: 'Hayat Dining Hall' },
  { src: '/images/restaurant/ac-section.webp', alt: 'Hayat AC Section' },
  { src: '/images/restaurant/family-section.webp', alt: 'Hayat Family Section' },
  { src: '/images/restaurant/ambience.webp', alt: 'Hayat Warm Ambience' },
]

export default function ReservationsTeaser() {
  const sectionRef = useScrollAnimation()
  const { openModal } = useBookingModal()

  return (
    <section ref={sectionRef} style={{
      background: 'linear-gradient(160deg, #FDF8F2 0%, #F8F0E4 60%, #F4EAD5 100%)',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle gold divider lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(203,152,115,0.25), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(18,12,7,0.08), transparent)', pointerEvents: 'none' }} />
      {/* Ambient warm glows */}
      <div style={{ position: 'absolute', bottom: '-15%', right: '-8%', width: '50%', height: '80%', background: 'radial-gradient(ellipse, rgba(203,152,115,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(203,152,115,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
          {/* Left */}
          <div data-animate="fade-right">
            <div className="ornament ornament-dark" style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
              <span className="eyebrow-dark">Reserve Your Table</span>
            </div>
            <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '20px', maxWidth: '440px' }}>
              Reserve Your Spot —{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-copper)' }}>Joy of Dining</em>{' '}
              Done Right
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--color-ink-muted)', lineHeight: 1.85, marginBottom: '40px', maxWidth: '420px' }}>
              Whether it&apos;s a family celebration, a special date, or just a great meal — we make every visit memorable. Book your table in seconds on WhatsApp.
            </p>

            {/* Info chips */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
              {['Open Daily 11AM–11PM', 'No Booking Fee', 'Instant Confirmation'].map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-ink-muted)',
                  border: '1px solid rgba(18,12,7,0.15)', borderRadius: '100px',
                  padding: '5px 14px', letterSpacing: '0.5px',
                  background: 'rgba(255,255,255,0.6)',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <button onClick={openModal} className="btn-primary" style={{ border: 'none', cursor: 'pointer' }}>
              <MessageCircle size={17} />
              Book a Table
            </button>
          </div>

          {/* Right: 2×2 photo grid */}
          <div data-animate="fade-left" data-delay="150">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {photos.map((p, i) => (
                <div key={i} style={{
                  position: 'relative', aspectRatio: '1',
                  borderRadius: '4px', overflow: 'hidden',
                  border: '1px solid rgba(18,12,7,0.1)',
                  transition: 'transform 300ms ease, box-shadow 300ms ease',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'scale(1.03)'
                    el.style.boxShadow = '0 16px 48px rgba(18,12,7,0.2)'
                    el.style.borderColor = 'rgba(203,152,115,0.4)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'scale(1)'
                    el.style.boxShadow = 'none'
                    el.style.borderColor = 'rgba(18,12,7,0.1)'
                  }}
                >
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 45vw, 22vw" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,11,4,0.08)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
