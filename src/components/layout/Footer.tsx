'use client'
import Link from 'next/link'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { restaurant } from '@/data/restaurant'

const quickLinks = [
  { label: 'Home',        href: '/' },
  { label: 'About Us',    href: '/about' },
  { label: 'Our Menu',    href: '/menu' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'Reviews',     href: '/reviews' },
  { label: 'FAQ',         href: '/faq' },
  { label: 'Contact',     href: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-charcoal)', color: 'var(--color-ivory)', position: 'relative', overflow: 'hidden' }}>

      {/* Top signature-sand border */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(203,152,115,0.6), transparent)' }} />

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: '60%', background: 'radial-gradient(ellipse at top, rgba(203,152,115,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '88px 48px 52px', position: 'relative', zIndex: 1 }}>

        {/* ── 2-column layout ── */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: '80px',
          alignItems: 'start',
          marginBottom: '72px',
        }}>

          {/* ── Col 1: Brand ── */}
          <div>
            {/* Logo wordmark */}
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '56px', fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1, letterSpacing: '4px', marginBottom: '4px' }}>
              HAYAT
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(250,246,240,0.35)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '6px' }}>
              Family Restaurant
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '15px', color: 'var(--color-gold)', opacity: 0.65, marginBottom: '28px', letterSpacing: '0.5px' }}>
              Lazeez Pakwan
            </div>

            {/* Gold rule */}
            <div style={{ width: '52px', height: '1px', background: 'var(--color-gold)', opacity: 0.45, marginBottom: '26px' }} />

            {/* Tagline */}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-ivory-muted)', lineHeight: 1.9, marginBottom: '36px', maxWidth: '460px' }}>
              {restaurant.tagline} — Authentic Mughal, North Indian &amp; Tandoor cuisine, served with royal warmth in the heart of Hubballi.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <MapPin size={15} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '3px', opacity: 0.85 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-ivory-muted)', lineHeight: 1.7 }}>
                  {restaurant.addressFull}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Phone size={15} style={{ color: 'var(--color-gold)', flexShrink: 0, opacity: 0.85 }} />
                <a href={restaurant.phoneHref}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.5px', transition: 'opacity 200ms' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                >
                  {restaurant.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Clock size={15} style={{ color: 'var(--color-gold)', flexShrink: 0, opacity: 0.85 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-ivory-muted)' }}>
                  {restaurant.hours}
                </span>
              </div>
            </div>

            {/* Get Directions CTA */}
            <a href={restaurant.googleMapsUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', border: '1px solid rgba(203,152,115,0.38)', borderRadius: '2px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold)', textDecoration: 'none', transition: 'all 250ms ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(203,152,115,0.10)'; el.style.borderColor = 'rgba(203,152,115,0.7)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(203,152,115,0.38)' }}
            >
              <Navigation size={13} /> Get Directions
            </a>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: 'var(--color-ivory)', marginBottom: '10px', letterSpacing: '0.5px' }}>
              Quick Links
            </h3>
            <div style={{ width: '36px', height: '1px', background: 'var(--color-gold)', opacity: 0.5, marginBottom: '28px' }} />
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {quickLinks.map(l => (
                <Link key={l.href} href={l.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--color-ivory-muted)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'color 200ms, gap 200ms',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--color-gold)'; el.style.gap = '16px' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--color-ivory-muted)'; el.style.gap = '12px' }}
                >
                  <span style={{ width: '5px', height: '1px', background: 'rgba(203,152,115,0.55)', display: 'block', flexShrink: 0, transition: 'width 200ms' }} />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(203,152,115,0.35)', letterSpacing: '0.3px' }}>
            © 2026 Hayat Family Restaurant Lazeez Pakwan, Hubballi. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(250,246,240,0.18)', letterSpacing: '0.3px' }}>
            Shah Bazar Road, Behind Jamiya Masjid, Hubballi — 580028
          </p>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </footer>
  )
}
