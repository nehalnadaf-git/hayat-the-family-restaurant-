import type { Metadata } from 'next'
import { MapPin, Phone, Clock, MessageCircle, ExternalLink } from 'lucide-react'
import { restaurant } from '@/data/restaurant'

export const metadata: Metadata = {
  title: 'Contact Us | Hayat Family Restaurant Hubballi — Location & Hours',
  description: 'Visit Hayat Family Restaurant at Shah Bazar Road, Hubballi. Open daily 11 AM–11 PM. Call 097402 71679 or book via WhatsApp.',
  alternates: { canonical: 'https://hayatfamilyrestaurant.in/contact' },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Hayat Family Restaurant Lazeez Pakwan',
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
    opens: '11:00', closes: '23:00',
  }],
}

const hours = [
  { day: 'Monday – Friday', time: '11:00 AM – 11:00 PM' },
  { day: 'Saturday', time: '11:00 AM – 11:00 PM' },
  { day: 'Sunday', time: '11:00 AM – 11:00 PM' },
]

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero */}
      <section style={{ background: 'var(--color-navy)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: '16px' }}>Come Visit Us</p>
        <h1 className="heading-hero" style={{ fontSize: 'clamp(40px,7vw,72px)', color: 'var(--color-ivory)' }}>Find Us</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--color-ivory-muted)', marginTop: '16px', maxWidth: '480px', margin: '16px auto 0', lineHeight: 1.7 }}>
          We&apos;re located on Shah Bazar Road, behind Jamiya Masjid, New Hubli — Hubballi
        </p>
      </section>

      {/* Content */}
      <section style={{ background: 'var(--color-ivory)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'start' }}>

          {/* Left: Info */}
          <div>
            <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '40px', fontSize: 'clamp(28px,4vw,40px)' }}>
              Get in Touch
            </h2>

            {/* Address */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
              <div style={{ width: '44px', height: '44px', background: 'var(--color-navy)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={20} color="var(--color-gold)" />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', color: 'var(--color-navy)', marginBottom: '4px' }}>Address</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#555', lineHeight: 1.6 }}>{restaurant.addressFull}</p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
              <div style={{ width: '44px', height: '44px', background: 'var(--color-navy)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={20} color="var(--color-gold)" />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', color: 'var(--color-navy)', marginBottom: '4px' }}>Phone / WhatsApp</p>
                <a href={restaurant.phoneHref} style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600 }}>
                  {restaurant.phone}
                </a>
              </div>
            </div>

            {/* Hours table */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
              <div style={{ width: '44px', height: '44px', background: 'var(--color-navy)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={20} color="var(--color-gold)" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', color: 'var(--color-navy)', marginBottom: '12px' }}>Opening Hours</p>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {hours.map(h => (
                      <tr key={h.day} style={{ borderBottom: '1px solid rgba(18,12,7,0.08)' }}>
                        <td style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#555', padding: '8px 0', paddingRight: '16px' }}>{h.day}</td>
                        <td style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-navy)', fontWeight: 500, padding: '8px 0', textAlign: 'right' }}>{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a href={restaurant.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={18} /> Book via WhatsApp
              </a>
              <a href={restaurant.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ color: 'var(--color-navy)', borderColor: 'var(--color-navy)' }}>
                <ExternalLink size={16} /> Get Directions
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <div>
            <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '24px', fontSize: 'clamp(28px,4vw,40px)' }}>
              Our Location
            </h2>
            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '2px solid rgba(212,168,83,0.3)', boxShadow: '0 8px 40px rgba(18,12,7,0.1)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.462!2d75.1183!3d15.3647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d4b03fa04adf%3A0x6c6f57d5f7d57b2e!2sShah%20Bazar%20Road%20Hubballi!5e0!3m2!1sen!2sin!4v1712345678901"
                width="100%"
                height="400"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hayat Family Restaurant on Google Maps"
              />
            </div>
            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', marginTop: '12px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-gold)', textDecoration: 'none', textAlign: 'center' }}
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
