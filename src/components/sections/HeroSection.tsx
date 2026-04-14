'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { restaurant } from '@/data/restaurant'

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        background: 'var(--color-ivory)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '76px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top text region — warm ivory background */}
      <div className="hero-text-region" style={{
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '28px',
        paddingTop: '32px',
        paddingLeft: '24px',
        paddingRight: '24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="tag-pill" style={{ color: 'rgba(44,26,14,0.6)', borderColor: 'rgba(44,26,14,0.2)', background: 'transparent', marginBottom: '20px', display: 'inline-flex' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4A853', flexShrink: 0 }} />
            Authentic Mughal &amp; Tandoor — <strong style={{ color: 'var(--color-navy)' }}>Lazeez Pakwan</strong>
          </span>
        </motion.div>

        {/* H1 — large serif */}
        <h1
          className="heading-hero"
          style={{ color: 'var(--color-navy)', maxWidth: '860px', lineHeight: 1.02, marginBottom: '0' }}
        >
          {['Where', 'Every', 'Bite', 'Tells', 'a', 'Story'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', marginRight: '0.22em' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Image + overlapping CTA */}
      <div style={{ width: '100%', position: 'relative', flex: '0 0 auto' }}>
        {/* CTA Pill — overlapping top edge of image, mathematically centered */}
        <div className="hero-cta-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href={restaurant.whatsapp} target="_blank" rel="noopener noreferrer" className="hero-cta-pill">
              <span style={{ fontSize: '16px', lineHeight: 1 }}>↓</span>
              <span>RESERVE A<br />TABLE</span>
            </a>
          </motion.div>
        </div>

        {/* Restaurant photo */}
        <motion.div
          className="hero-image-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3712/1152',
            minHeight: '300px',
          }}
        >
          {/* Desktop Banner */}
          <div className="hero-banner-desktop" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/restaurant/inside-empty2.png"
              alt="Hayat Family Restaurant Lazeez Pakwan — Hubballi"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Mobile Banner */}
          <div className="hero-banner-mobile" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', display: 'none' }}>
            <Image
              src="/images/restaurant/inside-empty2.png"
              alt="Hayat Family Restaurant — Mobile View"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          {/* Subtle vignette overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(to bottom, rgba(250,246,240,0.15) 0%, transparent 30%, rgba(44,26,14,0.15) 100%)'
          }} />
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          #hero { padding-top: 64px; min-height: auto !important; padding-bottom: 0; }
          #hero .hero-text-region { padding-top: 20px; padding-bottom: 16px; justify-content: center !important; flex: none !important; }
          #hero .hero-image-wrap { aspect-ratio: 4/3 !important; min-height: 220px !important; max-height: 44vh !important; }
          #hero .tag-pill { font-size: 11px; padding: 5px 12px; margin-bottom: 14px; }
          #hero .hero-banner-desktop { display: none !important; }
          #hero .hero-banner-mobile { display: block !important; }
        }
        @media (max-width: 380px) {
          #hero .hero-image-wrap { aspect-ratio: 1/1 !important; max-height: 52vw !important; }
        }
      `}</style>
    </section>
  )
}
