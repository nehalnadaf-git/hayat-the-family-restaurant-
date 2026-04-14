'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { galleryItems } from '@/data/gallery'

/* Subtle, tasteful tilts — feel like resting prints, not a messy pile */
const ROTATIONS = [-2.5, 1, -1.5, 2, -1, 1.5, -2, 1, -1.5, 2]

export default function GalleryStrip() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stripRef   = useRef<HTMLDivElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  /* Fade-in observer */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* Drag-to-scroll on desktop */
  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    let isDown = false, startX = 0, scrollLeft = 0
    const down  = (e: MouseEvent) => { isDown = true; el.classList.add('dragging'); startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft }
    const up    = () => { isDown = false; el.classList.remove('dragging') }
    const move  = (e: MouseEvent) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) }
    el.addEventListener('mousedown', down)
    el.addEventListener('mouseleave', up)
    el.addEventListener('mouseup', up)
    el.addEventListener('mousemove', move, { passive: false })
    return () => {
      el.removeEventListener('mousedown', down)
      el.removeEventListener('mouseleave', up)
      el.removeEventListener('mouseup', up)
      el.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(165deg, #FDF8F2 0%, #F8F0E4 55%, #F4EAD5 100%)',
        padding: 'clamp(80px,10vw,140px) 0',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'visible',
      }}
    >
      {/* Gold top / bottom lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.28), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(28,16,8,0.08), transparent)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 25%, rgba(201,150,62,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* ── Header ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', padding: '0 clamp(24px,5vw,80px)', marginBottom: '64px' }}>
          <div className="ornament ornament-dark" style={{ marginBottom: '18px' }}>
            <span className="eyebrow-dark">A Feast for the Eyes</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-ink)', maxWidth: '540px', margin: '0 auto' }}>
            Taste the Vibes Through{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-copper)' }}>Our Gallery</em>
          </h2>
        </div>
      </div>

      {/* ── Photo strip ── */}
      <div className="fade-up">
      <div
        ref={stripRef}
        className="gallery-strip-scroll"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          paddingLeft:  'clamp(24px,4vw,60px)',
          paddingRight: 'clamp(24px,4vw,60px)',
          paddingTop:   '28px',
          paddingBottom:'48px',
          overflowX: 'auto',
          scrollSnapType: 'x proximity',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'pan-x',
          overscrollBehaviorX: 'contain',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {galleryItems.map((item, i) => {
          const rot   = ROTATIONS[i % ROTATIONS.length]
          const isHov = hoveredIdx === i

          return (
            <div
              key={item.id}
              className="gallery-photo-frame"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                flexShrink: 0,
                scrollSnapAlign: 'center',
                width: 'clamp(170px, 18vw, 220px)',
                /* Photo-print frame */
                background:   '#FEFBF7',
                borderRadius: '3px',
                padding:      '10px 10px 36px',
                border:       `1px solid ${isHov ? 'rgba(201,150,62,0.45)' : 'rgba(28,16,8,0.09)'}`,
                /* Subtle tilt + hover lift */
                transform: isHov
                  ? 'rotate(0deg) translateY(-12px) scale(1.05)'
                  : `rotate(${rot}deg)`,
                transition: 'transform 400ms cubic-bezier(0.16,1,0.3,1), box-shadow 360ms ease, border-color 260ms',
                /* Professional shadow */
                boxShadow: isHov
                  ? '0 20px 48px rgba(28,16,8,0.20), 0 8px 20px rgba(28,16,8,0.10), 0 0 0 1.5px rgba(201,150,62,0.30)'
                  : '0 8px 24px rgba(28,16,8,0.12), 0 2px 6px rgba(28,16,8,0.07)',
                zIndex: isHov ? 10 : 1,
                cursor: 'default',
              }}
            >
              {/* Photo print area */}
              <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                borderRadius: '2px',
                overflow: 'hidden',
                background: '#EDE4D8',
              }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width:640px) 60vw, (max-width:1024px) 22vw, 220px"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
                    transform: isHov ? 'scale(1.06)' : 'scale(1.0)',
                  }}
                  loading="lazy"
                />
                {/* Warm tint on hover */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(201,150,62,0.07)',
                  opacity: isHov ? 1 : 0,
                  transition: 'opacity 300ms',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Caption */}
              <p style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '9.5px',
                fontWeight:    600,
                color:         isHov ? 'var(--color-copper)' : 'rgba(58,37,16,0.5)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textAlign:     'center',
                margin:        '10px 0 0',
                transition:    'color 260ms',
                lineHeight:    1,
              }}>
                {item.caption}
              </p>
            </div>
          )
        })}
      </div>
      </div>

      {/* ── CTA ── */}
      <div className="fade-up" style={{ textAlign: 'center', padding: '0 clamp(24px,5vw,80px)', marginTop: '16px' }}>
        <Link
          href="/gallery"
          className="btn-secondary-dark"
          style={{ display: 'inline-block' }}
        >
          View Full Gallery
        </Link>
      </div>

      <style>{`
        .gallery-strip-scroll::-webkit-scrollbar { display: none; }
        .gallery-strip-scroll { -ms-overflow-style: none; }
        .gallery-strip-scroll.dragging { cursor: grabbing !important; }
        .gallery-strip-scroll.dragging .gallery-photo-frame { pointer-events: none; }

        @media (max-width: 640px) {
          .gallery-photo-frame {
            width: clamp(150px, 58vw, 200px) !important;
          }
        }
      `}</style>
    </section>
  )
}
