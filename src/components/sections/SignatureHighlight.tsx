'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { signatureDishes } from '@/data/menu'

export default function SignatureHighlight() {
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
      background: 'linear-gradient(160deg, #3D2A18 0%, #472E1A 50%, #3D2A18 100%)',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Multi-point ambient glow */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 120%, rgba(201,150,62,0.09) 0%, transparent 50%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 40%, rgba(201,150,62,0.04) 0%, transparent 45%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.25), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.15), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="ornament" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Hayat Specials</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-ivory)', maxWidth: '540px', margin: '0 auto' }}>
            Dishes That{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>Define Us</em>
          </h2>
        </div>

        {/* Cards grid — no scroll on desktop, snap-scroll on mobile */}
        <div className="sig-cards-grid">
          {signatureDishes.map((dish, i) => (
            <div key={dish.name} className="sig-card-item fade-up" style={{ transitionDelay: `${i * 90}ms` }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,150,62,0.2)',
                borderRadius: '4px',
                overflow: 'hidden',
                height: '100%',
                transition: 'border-color 300ms, box-shadow 300ms, transform 300ms',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(201,150,62,0.5)'
                  el.style.transform = 'translateY(-6px)'
                  el.style.boxShadow = '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,150,62,0.25)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(201,150,62,0.2)'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', aspectRatio: '4/3', background: '#1E1109' }}>
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 80vw, 320px"
                    style={{ objectFit: 'cover', opacity: 0.88, transition: 'opacity 300ms' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,17,9,0.88) 0%, transparent 55%)' }} />
                  {/* Veg/non-veg dot */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(30,17,9,0.78)', backdropFilter: 'blur(6px)', borderRadius: '50%', padding: '5px' }}>
                    <span className={dish.isVeg ? 'dot-veg' : 'dot-nonveg'} style={{ width: '10px', height: '10px' }} />
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: '22px 24px 26px' }}>
                  <h3 className="heading-card" style={{ color: 'var(--color-ivory)', marginBottom: '8px' }}>{dish.name}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(200,184,154,0.75)', lineHeight: 1.65 }}>{dish.description}</p>
                  {/* Gold underline accent */}
                  <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to right, var(--color-gold), transparent)', marginTop: '16px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
