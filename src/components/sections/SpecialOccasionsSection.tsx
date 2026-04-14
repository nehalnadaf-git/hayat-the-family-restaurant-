'use client'
import { useEffect, useRef } from 'react'
import { restaurant } from '@/data/restaurant'
import { MessageCircle, Cake, Users, Briefcase } from 'lucide-react'

const occasions = [
  {
    Icon: Cake,
    title: 'Birthdays & Anniversaries',
    desc: 'Make your special day unforgettable with our curated setups, personalised decorations, and a custom menu crafted just for you.',
  },
  {
    Icon: Users,
    title: 'Family Celebrations',
    desc: 'Grand family gatherings deserve a grand setting. Our spacious AC hall and warm Mughal hospitality ensure every family moment is cherished.',
  },
  {
    Icon: Briefcase,
    title: 'Corporate Lunches',
    desc: 'Impress your colleagues and clients with our professional service, premium Mughal cuisine, and comfortable AC dining.',
  },
]

export default function SpecialOccasionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view') } }),
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: 'linear-gradient(150deg, #1E1209 0%, #241608 50%, #1C1008 100%)',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative gold lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.3), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.18), transparent)' }} />
      {/* Ambient radial top glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,150,62,0.07) 0%, transparent 55%)', pointerEvents: 'none' }} />
      {/* Side glows */}
      <div style={{ position: 'absolute', top: '30%', left: '-5%', width: '35%', height: '50%', background: 'radial-gradient(ellipse, rgba(201,150,62,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', right: '-5%', width: '35%', height: '50%', background: 'radial-gradient(ellipse, rgba(201,150,62,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="fade-up" style={{ marginBottom: '64px' }}>
          <div className="ornament" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Special Occasions</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-ivory)', marginBottom: '20px', maxWidth: '700px', margin: '0 auto 20px' }}>
            Celebrate Your{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>Special Moments</em>{' '}
            With Us
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(200,184,154,0.75)', maxWidth: '540px', margin: '20px auto 0', lineHeight: 1.85 }}>
            From birthday celebrations to anniversary dinners, family gatherings to corporate lunches — Hayat Family Restaurant is your perfect venue for every occasion.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px', marginBottom: '56px' }}>
          {occasions.map((o, i) => (
            <div key={o.title} className="fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,150,62,0.18)',
                borderRadius: '4px',
                padding: '36px 28px',
                height: '100%',
                textAlign: 'left',
                transition: 'border-color 300ms, background 300ms, box-shadow 300ms, transform 300ms',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(201,150,62,0.45)'
                  el.style.background = 'rgba(201,150,62,0.05)'
                  el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.35)'
                  el.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(201,150,62,0.18)'
                  el.style.background = 'rgba(255,255,255,0.03)'
                  el.style.boxShadow = 'none'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* Icon container */}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'rgba(201,150,62,0.1)',
                  border: '1px solid rgba(201,150,62,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '24px',
                }}>
                  <o.Icon size={22} color="var(--color-gold-light)" strokeWidth={1.5} />
                </div>
                <h3 className="heading-card" style={{ color: 'var(--color-gold-light)', marginBottom: '12px' }}>{o.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(200,184,154,0.72)', lineHeight: 1.75 }}>{o.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="fade-up">
          <a href={restaurant.whatsappEvent} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle size={17} />
            Plan Your Event — WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}
