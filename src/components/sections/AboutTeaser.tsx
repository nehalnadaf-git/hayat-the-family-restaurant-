'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutTeaser() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view') } }),
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    if (leftRef.current) observer.observe(leftRef.current)
    if (rightRef.current) observer.observe(rightRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="about-teaser"
      style={{
        background: 'linear-gradient(160deg, #1C120A 0%, #241508 55%, #1C120A 100%)',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '-15%', right: '-8%', width: '55%', height: '75%', background: 'radial-gradient(ellipse at center, rgba(203,152,115,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '40%', height: '60%', background: 'radial-gradient(ellipse at center, rgba(203,152,115,0.03) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(203,152,115,0.25), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div ref={leftRef} className="fade-up about-header-region" style={{ marginBottom: '64px' }}>
          <div className="ornament" style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
            <span className="eyebrow">Our Story</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
          {/* Left: Text */}
          <div ref={leftRef} className="fade-up">
            <h2 className="heading-section" style={{ color: 'var(--color-ivory)', marginBottom: '28px', maxWidth: '500px' }}>
              A Heritage of Mughal Flavour —{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>Crafted</em>{' '}
              With Generations of Passion
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(200,184,154,0.8)', lineHeight: 1.85, marginBottom: '36px' }}>
              Located in the vibrant heart of Shah Bazar Road, Hayat Family Restaurant Lazeez Pakwan is a culinary haven where Mughal heritage meets warm family hospitality. Known for bold flavours, authentic recipes, and exceptional service — every meal here feels like a royal occasion.
            </p>

            {/* Stats row */}
            <div className="about-stats-row" style={{ display: 'flex', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
              {[
                { num: '500+', label: 'Happy Families / Month' },
                { num: '4.5★', label: 'Google Rating' },
                { num: '100%', label: 'Authentic Flavours' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-ivory-muted)', letterSpacing: '1.5px', marginTop: '6px', textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-secondary">
              Read Our Story →
            </Link>
          </div>

          {/* Right: Photo */}
          <div ref={rightRef} className="fade-up" style={{ transitionDelay: '180ms' }}>
            <div style={{
              position: 'relative',
              aspectRatio: '4/5',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(203,152,115,0.2)',
            }}>
              <Image
                src="/images/restaurant/entrance.webp"
                alt="Hayat Family Restaurant Front — Hubballi"
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
              {/* Warm tint overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(203,152,115,0.06) 0%, transparent 40%, transparent 60%, rgba(203,152,115,0.04) 100%)', pointerEvents: 'none' }} />
              {/* Serving tag — glassmorphism */}
              <div style={{
                position: 'absolute', bottom: '20px', left: '20px',
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                border: '1px solid rgba(203,152,115,0.45)',
                borderRadius: '8px',
                padding: '14px 22px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.08) inset',
                overflow: 'hidden',
              }}>
                {/* Inner top-edge shimmer line */}
                <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)', pointerEvents: 'none' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '15px', color: 'var(--color-gold-light)', textShadow: '0 0 18px rgba(232,188,106,0.35)' }}>Serving Hubballi</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', color: 'rgba(250,246,240,0.65)', letterSpacing: '2.5px', textTransform: 'uppercase', marginTop: '3px' }}>With Pride &amp; Passion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          #about-teaser { padding: 48px 24px !important; }
          .about-header-region { margin-bottom: 24px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-photo { aspect-ratio: 3/2 !important; }
          .about-eyebrow-row { margin-bottom: 32px !important; }
        }
      `}</style>
    </section>
  )
}
