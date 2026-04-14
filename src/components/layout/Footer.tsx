'use client'
import Link from 'next/link'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import { restaurant } from '@/data/restaurant'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-charcoal)', color: 'var(--color-ivory)', position: 'relative' }}>
      {/* Gold top border */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.5), transparent)' }} />

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '40%', background: 'radial-gradient(ellipse at top, rgba(212,168,83,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 32px 44px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '56px', marginBottom: '64px' }}>

          {/* Brand column */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1, letterSpacing: '3px', marginBottom: '4px' }}>
              HAYAT
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(250,246,240,0.4)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Family Restaurant
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '14px', color: 'var(--color-teak)', marginBottom: '20px', letterSpacing: '0.5px' }}>
              Lazeez Pakwan
            </div>

            {/* Gold rule */}
            <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', marginBottom: '20px', opacity: 0.6 }} />

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-ivory-muted)', lineHeight: 1.8, marginBottom: '28px', maxWidth: '280px' }}>
              {restaurant.tagline} — Authentic Mughal, North Indian &amp; Tandoor cuisine in the heart of Hubballi.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={15} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-ivory-muted)', lineHeight: 1.65 }}>
                  {restaurant.addressFull}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={15} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <a href={restaurant.phoneHref} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.5px' }}>
                  {restaurant.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={15} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-ivory-muted)' }}>
                  {restaurant.hours}
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              <a href={restaurant.googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Google Maps"
                style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-ivory-muted)', transition: 'all 250ms', textDecoration: 'none' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-gold)'; el.style.color = 'var(--color-gold)'; el.style.background = 'rgba(212,168,83,0.08)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-border)'; el.style.color = 'var(--color-ivory-muted)'; el.style.background = 'transparent' }}
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-ivory)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.5px' }}>
              Quick Links
            </h3>
            <div style={{ width: '32px', height: '1px', background: 'var(--color-gold)', marginBottom: '24px', opacity: 0.6 }} />
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {quickLinks.map(l => (
                <Link key={l.href} href={l.href} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-ivory-muted)', textDecoration: 'none', transition: 'color 200ms', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-ivory-muted)')}
                >
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(212,168,83,0.5)', flexShrink: 0 }} />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Map */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-ivory)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.5px' }}>
              Find Us
            </h3>
            <div style={{ width: '32px', height: '1px', background: 'var(--color-gold)', marginBottom: '24px', opacity: 0.6 }} />
            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', marginBottom: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.462!2d75.1183!3d15.3647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d4b03fa04adf%3A0x6c6f57d5f7d57b2e!2sShah%20Bazar%20Road%20Hubballi!5e0!3m2!1sen!2sin!4v1712345678901"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block', filter: 'grayscale(20%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hayat Family Restaurant Location"
              />
            </div>
            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: '11px', padding: '10px 20px', letterSpacing: '1.5px' }}
            >
              <MapPin size={14} /> Get Directions
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(200,184,154,0.4)', letterSpacing: '0.3px' }}>
            © 2026 Hayat Family Restaurant Lazeez Pakwan, Hubballi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
