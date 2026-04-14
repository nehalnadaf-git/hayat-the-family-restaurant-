import type { Metadata } from 'next'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery | Hayat Family Restaurant Hubballi — Interiors & Food',
  description: 'Photos of Hayat Family Restaurant — our warm dining hall, AC section, food, ambience and special occasions.',
  alternates: { canonical: 'https://hayatfamilyrestaurant.in/gallery' },
}

export default function GalleryPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section style={{ background: 'var(--color-navy)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: '16px' }}>A Feast for the Eyes</p>
        <h1 className="heading-hero" style={{ fontSize: 'clamp(40px,7vw,72px)', color: 'var(--color-ivory)' }}>Our Gallery</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--color-ivory-muted)', marginTop: '16px', maxWidth: '480px', margin: '16px auto 0', lineHeight: 1.7 }}>
          Step inside Hayat — from our warm dining hall to signature Mughal dishes
        </p>
      </section>

      {/* Gallery */}
      <section style={{ background: 'var(--color-ivory)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <GalleryClient />
        </div>
      </section>
    </div>
  )
}
