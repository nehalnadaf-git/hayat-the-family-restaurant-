'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone, Star } from 'lucide-react'
import { restaurant } from '@/data/restaurant'
import AboutBookingCTA from './AboutBookingCTA'

const pillars = [
  {
    icon: '🌿',
    title: 'Authentic Ingredients',
    desc: 'We source the finest spices, freshest meats, and premium Basmati rice to ensure every dish meets our exacting Mughal standards.',
  },
  {
    icon: '🔥',
    title: 'Mughal Culinary Heritage',
    desc: "Our recipes carry the legacy of North India's royal kitchens — slow-cooked, layered, and infused with generations of culinary wisdom.",
  },
  {
    icon: '❤️',
    title: 'Family Warmth',
    desc: 'From the moment you walk in, you are treated as an honored Mehman. Our hospitality is as warm and rich as the food we serve.',
  },
  {
    icon: '✨',
    title: 'Premium Experience',
    desc: 'From our elegant AC dining hall to our attentive service, every detail is crafted to make your visit an unforgettable occasion.',
  },
]

const stats = [
  { num: '500+', label: 'Families Monthly' },
  { num: '4.5★', label: 'Google Rating' },
  { num: '48+', label: 'Reviews' },
  { num: '100%', label: 'Authentic Recipes' },
]

const timeline = [
  { year: 'Founded', title: 'A Vision Takes Root', desc: 'Hayat Family Restaurant Lazeez Pakwan opened its doors on Shah Bazar Road with a simple promise — royal Mughal flavours served with heartfelt hospitality.' },
  { year: 'Heritage', title: 'Recipes from the Royal Kitchen', desc: 'Drawing from centuries-old Mughal culinary traditions, our chefs mastered the art of slow-cooked biryanis, tender kababs, and richly spiced curries.' },
  { year: 'Growth', title: 'A Hubballi Landmark', desc: 'Word spread across Hubballi and beyond. Families, food lovers, and celebrations made Hayat their go-to destination for authentic North Indian cuisine.' },
  { year: 'Today', title: 'Continuing the Legacy', desc: 'As a cherished destination in Hubballi, Hayat remains committed to excellence, authenticity, and making every meal a royal occasion.' },
]



export default function AboutPageClient() {
  const rootRef = useRef<HTMLDivElement>(null)

  /* Scroll-driven fade-up animations */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    rootRef.current?.querySelectorAll('.fade-up').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} style={{ paddingTop: '72px', background: 'var(--color-charcoal)' }}>

      {/* ═══════════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(250px, 35vw, 600px)',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(201,150,62,0.2)',
      }}>
        <Image
          src="/images/new-web-banner3.png"
          alt="Hayat Family Restaurant — Hubballi"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </section>

      {/* ═══════════════════════════════════════════════
          ORIGIN — text + image
      ═══════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(160deg, var(--color-linen) 0%, var(--color-parchment-deep) 60%, var(--color-stone) 100%)',
        padding: 'clamp(72px,10vw,140px) clamp(24px,5vw,80px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 80% 20%, rgba(201,150,62,0.07) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.25), transparent)',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(48px,6vw,96px)',
            alignItems: 'center',
          }}>
            <div className="fade-up">
              <div className="ornament ornament-dark" style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
                <span className="eyebrow-dark">Origin & Heritage</span>
              </div>
              <h2 className="heading-section" style={{ color: 'var(--color-ink)', marginBottom: '28px', maxWidth: '460px' }}>
                A Culinary Legacy{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--color-copper)' }}>Rooted in Mughal Tradition</em>
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px,1.6vw,17px)',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.85,
                marginBottom: '20px',
              }}>
                Hayat Family Restaurant Lazeez Pakwan was born from a simple yet powerful vision: to bring the grandeur of Mughal and North Indian cuisine to the heart of Hubballi. Nestled on Shah Bazar Road behind Jamiya Masjid, our restaurant has become a beloved landmark — a place where families gather, celebrations unfold, and memories are made over steaming plates of biryani and sizzling kababs.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px,1.6vw,17px)',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.85,
                marginBottom: '36px',
              }}>
                The name <strong style={{ color: 'var(--color-ink)', fontWeight: 600 }}>"Hayat"</strong> — meaning <em>Life</em> — reflects our belief that great food is the celebration of life itself.
              </p>
              <Link href="/menu" className="btn-secondary-dark">Explore Our Menu →</Link>
            </div>

            <div className="fade-up" style={{ transitionDelay: '150ms' }}>
              <div style={{
                position: 'relative',
                aspectRatio: '4/5',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(44,26,14,0.18), 0 12px 32px rgba(44,26,14,0.10)',
                border: '1px solid rgba(201,150,62,0.2)',
              }}>
                <Image
                  src="/images/restaurant/dining-hall.jpg"
                  alt="Hayat Family Restaurant Dining Hall"
                  fill sizes="(max-width:768px) 90vw, 45vw"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(44,26,14,0.4) 0%, transparent 50%)',
                }} />
                <div style={{
                  position: 'absolute', bottom: '20px', left: '20px',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                  border: '1px solid rgba(201,150,62,0.4)',
                  borderRadius: '6px',
                  padding: '10px 18px',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '14px', color: 'var(--color-gold-light)' }}>Our Grand Dining Hall</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(250,246,240,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '3px' }}>Hubballi, Karnataka</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4 PILLARS
      ═══════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(160deg, var(--color-navy) 0%, var(--color-navy-mid) 50%, var(--color-navy) 100%)',
        padding: 'clamp(72px,10vw,140px) clamp(24px,5vw,80px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(201,150,62,0.08) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.3), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.2), transparent)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}>
            <div className="ornament" style={{ marginBottom: '20px' }}>
              <span className="eyebrow">The Hayat Standard</span>
            </div>
            <h2 className="heading-section" style={{ color: 'var(--color-ivory)', maxWidth: '520px', margin: '0 auto' }}>
              What Makes Us{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>Hayat</em>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(16px,2vw,24px)',
          }}>
            {pillars.map((p, i) => (
              <div key={p.title} className="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <div
                  style={{
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
                  {/* Gold top accent line */}
                  <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.55), transparent)' }} />
                  {/* Content */}
                  <div style={{ padding: 'clamp(28px,3vw,40px) clamp(24px,2.5vw,32px) clamp(32px,3.5vw,44px)' }}>
                    {/* Number badge */}
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '3px',
                      color: 'rgba(201,150,62,0.5)',
                      textTransform: 'uppercase',
                      marginBottom: '20px',
                    }}>0{i + 1}</div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(20px,2vw,24px)',
                      fontWeight: 600,
                      color: 'var(--color-ivory)',
                      marginBottom: '14px',
                      lineHeight: 1.2,
                    }}>{p.title}</h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'rgba(200,184,154,0.75)',
                      lineHeight: 1.75,
                    }}>{p.desc}</p>
                    {/* Gold underline accent */}
                    <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to right, var(--color-gold), transparent)', marginTop: '20px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TIMELINE
      ═══════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(165deg, var(--color-linen) 0%, var(--color-parchment-deep) 100%)',
        padding: 'clamp(72px,10vw,140px) clamp(24px,5vw,80px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.25), transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 80%, rgba(201,150,62,0.05) 0%, transparent 55%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}>
            <div className="ornament ornament-dark" style={{ marginBottom: '20px' }}>
              <span className="eyebrow-dark">Our Journey</span>
            </div>
            <h2 className="heading-section" style={{ color: 'var(--color-ink)', maxWidth: '480px', margin: '0 auto' }}>
              The Story Behind{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-copper)' }}>Every Dish</em>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px,4vw,56px)' }}>
            {timeline.map((item, i) => (
              <div key={item.year} className="afu about-timeline-row" style={{
                display: 'flex',
                gap: 'clamp(20px,3vw,40px)',
                alignItems: 'flex-start',
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                transitionDelay: `${i * 90}ms`,
              }}>
                {/* Badge */}
                <div style={{ flexShrink: 0, paddingTop: '6px' }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%)',
                    borderRadius: '100px',
                    padding: '8px 20px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'var(--color-charcoal)',
                    whiteSpace: 'nowrap',
                  }}>{item.year}</div>
                </div>
                {/* Card */}
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.78)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(201,150,62,0.2)',
                  borderRadius: '6px',
                  padding: 'clamp(22px,3vw,34px)',
                  boxShadow: '0 4px 24px rgba(44,26,14,0.07)',
                  maxWidth: '580px',
                }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,25px)', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,1.4vw,16px)', color: 'var(--color-ink-muted)', lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          VISIT INFO
      ═══════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(165deg, var(--color-linen) 0%, var(--color-stone) 100%)',
        padding: 'clamp(72px,10vw,140px) clamp(24px,5vw,80px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.25), transparent)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(48px,6vw,80px)',
            alignItems: 'start',
          }}>
            <div className="fade-up">
              <div className="ornament ornament-dark" style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
                <span className="eyebrow-dark">Visit Us</span>
              </div>
              <h2 className="heading-section" style={{ color: 'var(--color-ink)', marginBottom: '40px', maxWidth: '420px' }}>
                Come Find Us in the{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--color-copper)' }}>Heart of Hubballi</em>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {[
                  { icon: <MapPin size={18} />, label: 'Address', value: restaurant.addressFull, link: restaurant.googleMapsUrl, linkText: 'Open in Maps →' },
                  { icon: <Clock size={18} />, label: 'Hours', value: restaurant.hours, link: null, linkText: null },
                  { icon: <Phone size={18} />, label: 'Phone', value: restaurant.phone, link: restaurant.phoneHref, linkText: 'Call Now →' },
                ].map((info) => (
                  <div key={info.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(201,150,62,0.1)',
                      border: '1px solid rgba(201,150,62,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--color-copper)',
                    }}>{info.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-copper)', marginBottom: '4px' }}>{info.label}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>{info.value}</div>
                      {info.link && (
                        <a href={info.link} target="_blank" rel="noopener noreferrer" style={{
                          fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-copper)',
                          letterSpacing: '1px', fontWeight: 600, textDecoration: 'none',
                          borderBottom: '1px solid rgba(181,116,58,0.35)', paddingBottom: '1px',
                          marginTop: '6px', display: 'inline-block',
                        }}>{info.linkText}</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up" style={{ transitionDelay: '150ms' }}>
              <div style={{
                borderRadius: '8px', overflow: 'hidden',
                border: '1px solid rgba(201,150,62,0.25)',
                boxShadow: '0 20px 60px rgba(44,26,14,0.12)',
                position: 'relative', aspectRatio: '4/3',
              }}>
                <Image
                  src="/images/og/og-homepage.png"
                  alt="Hayat Family Restaurant — Hubballi"
                  fill
                  sizes="(max-width:768px) 90vw, 45vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              <a href={restaurant.googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                marginTop: '16px',
                fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: 'var(--color-copper)', textDecoration: 'none',
              }}>
                <MapPin size={13} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(150deg, var(--color-charcoal) 0%, var(--color-navy-mid) 50%, var(--color-charcoal) 100%)',
        padding: 'clamp(72px,10vw,140px) clamp(24px,5vw,80px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,150,62,0.10) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.35), transparent)' }} />

        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="afu">
            <div className="ornament" style={{ marginBottom: '20px' }}>
              <span className="eyebrow">Join Us</span>
            </div>
            <h2 className="heading-section" style={{ color: 'var(--color-ivory)', marginBottom: '20px' }}>
              Your Table Awaits at{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>Hayat</em>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px,1.7vw,18px)',
              color: 'var(--color-ivory-muted)',
              maxWidth: '480px', margin: '0 auto 40px',
              lineHeight: 1.8,
            }}>
              Experience the magic of Hayat — where every meal is a celebration and every guest is our honored Mehman.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <AboutBookingCTA />
              <Link href="/menu" className="btn-secondary">View Our Menu</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scoped styles ── */}
      <style>{`
        /* fade-up animation */
        .afu {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.78s cubic-bezier(0.16,1,0.3,1), transform 0.78s cubic-bezier(0.16,1,0.3,1);
        }
        .afu.in-view { opacity: 1; transform: translateY(0); }

        /* Stats bar — 2×2 on xs */
        @media (max-width: 520px) {
          .about-stats-grid {
            grid-template-columns: repeat(2,1fr) !important;
          }
          .about-stats-grid > div { border-right: none !important; border-bottom: 1px solid rgba(201,150,62,0.15); }
          .about-stats-grid > div:nth-child(odd) { border-right: 1px solid rgba(201,150,62,0.15) !important; }
          .about-stats-grid > div:nth-last-child(-n+2) { border-bottom: none; }
        }

        /* Timeline — stack on mobile */
        @media (max-width: 600px) {
          .about-timeline-row { flex-direction: column !important; }
        }

        /* Gallery — simple 2-col on mobile */
        @media (max-width: 640px) {
          .about-gallery-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
          .about-hero-img  { grid-column: 1 / -1 !important; grid-row: auto !important; }
          .about-tall-img  { grid-column: auto !important; grid-row: auto !important; aspect-ratio: 4/3 !important; position: relative; }
        }
      `}</style>
    </div>
  )
}
