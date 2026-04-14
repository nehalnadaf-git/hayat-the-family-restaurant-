'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { restaurant } from '@/data/restaurant'
import { MessageCircle, Phone, Package, Star } from 'lucide-react'
import { useBulkOrderModal } from '@/contexts/BulkOrderModalContext'

/* ── Bulk menu items ─────────────────────────────────────── */
const bulkMenu = [
  {
    category: 'Biryani — Basmati',
    items: [
      { name: 'Beef Biryani', price: '₹800/kg' },
      { name: 'Chicken Biryani', price: '₹900/kg' },
      { name: 'Mutton Biryani', price: '₹1,600/kg' },
      { name: 'Veg Biryani', price: '₹650/kg' },
      { name: 'Khushka (Plain Rice)', price: '₹500/kg' },
    ],
  },
  {
    category: 'Biryani — Jeera Rice',
    items: [
      { name: 'Beef Biryani', price: '₹750/kg' },
      { name: 'Chicken Biryani', price: '₹850/kg' },
      { name: 'Mutton Biryani', price: '₹1,550/kg' },
      { name: 'Khushka (Plain Rice)', price: '₹470/kg' },
    ],
  },
  {
    category: 'Gravies & Kababs',
    items: [
      { name: 'Beef Gravy', price: '₹800/kg' },
      { name: 'Chicken Gravy', price: '₹950/kg' },
      { name: 'Chicken Fried Kabab', price: '₹600/kg' },
    ],
  },
]

export default function BulkOrdersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { openModal } = useBulkOrderModal()

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        /* Richer, slightly lighter warm-walnut gradient */
        background: 'linear-gradient(150deg, #1C120A 0%, #241508 40%, #1C120A 75%, #2E1A0C 100%)',
        padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative lines ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(203,152,115,0.45), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(203,152,115,0.22), transparent)' }} />

      {/* ── Ambient glows — richer than before ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% -10%, rgba(203,152,115,0.13) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', left: '-8%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(203,152,115,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-6%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(203,152,115,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ════ HEADER ════ */}
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="ornament" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Catering & Bulk Orders</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-ivory)', maxWidth: '760px', margin: '0 auto 18px' }}>
            Feed the Crowd.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>Impress Everyone.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(200,184,154,0.75)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.85 }}>
            From intimate dawats of 50 to grand weddings of 5,000+ guests — Hayat delivers fresh, authentic Mughal cuisine right to your venue.
          </p>
        </div>

        {/* ════ MAIN GRID ════ */}
        <div
          className="bulk-main-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}
        >
          {/* ── Left: Photo banner + Pricing table ── */}
          <div className="fade-up">
            {/* Photo banner */}
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px', aspectRatio: '21/8' }}>
              <Image
                src="/images/food/beef-biryani.webp"
                alt="Hayat Bulk Biryani Catering"
                fill
                sizes="(max-width:900px) 100vw, 750px"
                style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(30,17,9,0.78) 0%, rgba(30,17,9,0.2) 65%, transparent 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '28px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Package size={16} color="var(--color-gold)" strokeWidth={1.5} />
                  <span className="eyebrow" style={{ color: 'var(--color-gold)' }}>Bulk Pricing</span>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(18px,2.2vw,26px)', color: 'var(--color-ivory)', fontWeight: 600, lineHeight: 1.25 }}>
                  Priced per kilogram.<br />Minimum order: 5 kg.
                </p>
              </div>
            </div>

            {/* Pricing categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {bulkMenu.map((cat) => (
                <div key={cat.category} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(203,152,115,0.2)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}>
                  {/* Category header */}
                  <div style={{
                    background: 'rgba(203,152,115,0.1)',
                    borderBottom: '1px solid rgba(203,152,115,0.15)',
                    padding: '11px 20px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                  }}>
                    <Star size={12} color="var(--color-gold)" strokeWidth={2} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                      {cat.category}
                    </span>
                  </div>
                  {/* Items */}
                  {cat.items.map((item, ii) => (
                    <div key={item.name} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '13px 20px',
                      borderBottom: ii < cat.items.length - 1 ? '1px solid rgba(203,152,115,0.07)' : 'none',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0, opacity: 0.55 }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-ivory-2)', fontWeight: 400 }}>
                          {item.name}
                        </span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-gold-light)', fontWeight: 700, flexShrink: 0 }}>
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
              {/* Footnote */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(200,184,154,0.38)', lineHeight: 1.6, paddingLeft: '4px' }}>
                Prices inclusive of taxes · Advance booking recommended · Subject to change
              </p>
            </div>
          </div>

          {/* ── Right: CTA Panel (sticky) ── */}
          <div className="fade-up" style={{ position: 'sticky', top: '96px' }}>
            <div style={{
              background: 'linear-gradient(145deg, rgba(203,152,115,0.13) 0%, rgba(203,152,115,0.05) 100%)',
              border: '1px solid rgba(203,152,115,0.38)',
              borderRadius: '10px',
              padding: '36px 28px',
              textAlign: 'center',
            }}>
              {/* Icon halo */}
              <div style={{
                width: '58px', height: '58px', borderRadius: '50%',
                background: 'rgba(203,152,115,0.15)',
                border: '1px solid rgba(203,152,115,0.32)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 22px',
                boxShadow: '0 0 28px rgba(203,152,115,0.12)',
              }}>
                <Package size={24} color="var(--color-gold-light)" strokeWidth={1.4} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '24px', color: 'var(--color-ivory)', fontWeight: 600, marginBottom: '12px', lineHeight: 1.2 }}>
                Ready to Order?
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(200,184,154,0.68)', lineHeight: 1.75, marginBottom: '28px' }}>
                WhatsApp us your event date, guest count & preferred menu — we'll send a personalised quote within the hour.
              </p>

              {/* Gold divider */}
              <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(203,152,115,0.3), transparent)', marginBottom: '28px' }} />

              {/* Primary CTA */}
              <button
                onClick={openModal}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '11px', marginBottom: '12px', border: 'none', cursor: 'pointer' }}
              >
                <MessageCircle size={16} />
                Book a Bulk Order
              </button>

              {/* Secondary — phone */}
              <a
                href={restaurant.phoneHref}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '11px' }}
              >
                <Phone size={14} strokeWidth={1.5} />
                {restaurant.phone}
              </a>

              {/* Badges row */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '24px', flexWrap: 'wrap' }}>
                {['50–5000+ Guests', 'Doorstep Delivery', 'Fresh Daily'].map(b => (
                  <span key={b} style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, color: 'rgba(200,184,154,0.55)', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)', opacity: 0.6 }} />
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 900px) {
          .bulk-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
