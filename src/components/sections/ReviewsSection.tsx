'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { reviews } from '@/data/reviews'
import { Star, Quote } from 'lucide-react'

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view') } }),
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const featured = reviews.slice(0, 3)

  return (
    <section ref={sectionRef} style={{
      background: 'linear-gradient(165deg, #FAF4E8 0%, #F5EDE0 50%, #F0E6D2 100%)',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Warm glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, rgba(203,152,115,0.07) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(203,152,115,0.2), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(18,12,7,0.08), transparent)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px', flexWrap: 'wrap', gap: '32px' }}>
          <div className="fade-up">
            <div className="ornament ornament-dark" style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
              <span className="eyebrow-dark">Customer Reviews</span>
            </div>
            <h2 className="heading-section" style={{ color: 'var(--color-ink)', maxWidth: '460px' }}>
              Where Every Visit Becomes a{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-copper)' }}>Great Memory</em>
            </h2>
          </div>

          {/* Rating badge */}
          <div className="fade-up" style={{ transitionDelay: '100ms', alignSelf: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(203,152,115,0.3)',
              borderRadius: '4px',
              padding: '20px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 24px rgba(18,12,7,0.08)',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '54px', fontWeight: 700, color: 'var(--color-copper)', lineHeight: 1 }}>4.5</div>
              <div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
                  {[1,2,3,4].map(s => <Star key={s} size={16} fill="var(--color-gold)" color="var(--color-gold)" />)}
                  <Star size={16} fill="none" color="var(--color-gold)" />
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-ink-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Google Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {featured.map((review, i) => {
            const isHighlighted = i === 1
            return (
              <div key={review.id} className="fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <div style={{
                  background: isHighlighted ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)',
                  border: `1px solid ${isHighlighted ? 'rgba(203,152,115,0.35)' : 'rgba(18,12,7,0.09)'}`,
                  borderRadius: '4px',
                  padding: '32px 28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isHighlighted ? '0 4px 28px rgba(203,152,115,0.1)' : '0 2px 12px rgba(18,12,7,0.06)',
                  transition: 'box-shadow 300ms, border-color 300ms, transform 300ms',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = '0 20px 60px rgba(18,12,7,0.14)'
                    el.style.borderColor = 'rgba(203,152,115,0.4)'
                    el.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = isHighlighted ? '0 4px 28px rgba(203,152,115,0.1)' : '0 2px 12px rgba(18,12,7,0.06)'
                    el.style.borderColor = isHighlighted ? 'rgba(203,152,115,0.35)' : 'rgba(18,12,7,0.09)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Quote icon */}
                  <Quote size={24} color="var(--color-copper)" strokeWidth={1.5} style={{ marginBottom: '16px', opacity: 0.6 }} />

                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={14} fill="var(--color-gold)" color="var(--color-gold)" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic',
                    fontSize: '19px', color: 'var(--color-ink)',
                    lineHeight: 1.65, marginBottom: '24px', flex: 1,
                  }}>
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Reviewer */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(18,12,7,0.08)', paddingTop: '20px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: isHighlighted ? 'rgba(203,152,115,0.15)' : 'rgba(18,12,7,0.06)',
                      border: `1px solid ${isHighlighted ? 'rgba(203,152,115,0.3)' : 'rgba(18,12,7,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px',
                      color: 'var(--color-copper)', flexShrink: 0,
                    }}>
                      {review.name[0]}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', color: 'var(--color-ink)' }}>
                        {review.name}{review.isLocalGuide && <span style={{ fontSize: '11px', color: 'var(--color-copper)', marginLeft: '6px', fontWeight: 400 }}>· Local Guide</span>}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-ink-muted)', marginTop: '2px' }}>{review.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="fade-up" style={{ textAlign: 'right' }}>
          <Link href="/reviews" style={{
            fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
            color: 'var(--color-copper)', textDecoration: 'none', letterSpacing: '1.5px',
            textTransform: 'uppercase', borderBottom: '1px solid rgba(181,116,58,0.4)',
            paddingBottom: '2px', transition: 'border-color 200ms',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(181,116,58,0.4)')}
          >
            Read All Reviews →
          </Link>
        </div>
      </div>
    </section>
  )
}
