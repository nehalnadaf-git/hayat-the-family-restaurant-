'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { galleryItems, galleryCategories, type GalleryCategory } from '@/data/gallery'
import type { SlideImage } from 'yet-another-react-lightbox'

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false })

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(img => img.category === activeCategory.toLowerCase())

  const slides: SlideImage[] = filtered.map(img => ({ src: img.src, alt: img.alt }))

  return (
    <>
      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px', justifyContent: 'center' }}>
        {galleryCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              padding: '10px 20px', borderRadius: '2px', cursor: 'pointer',
              transition: 'all 200ms ease', border: '1px solid',
              background: activeCategory === cat ? 'var(--color-gold)' : 'transparent',
              color: activeCategory === cat ? 'var(--color-navy)' : 'var(--color-navy)',
              borderColor: activeCategory === cat ? 'var(--color-gold)' : 'rgba(27,31,75,0.2)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {filtered.map((img, i) => (
          <div
            key={img.id}
            className="masonry-item"
            onClick={() => setLightboxIndex(i)}
            style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid rgba(212,160,23,0.15)' }}
          >
            <div style={{ position: 'relative', paddingBottom: i % 3 === 0 ? '130%' : '75%' }}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                style={{ objectFit: 'cover', transition: 'transform 300ms ease' }}
                loading="lazy"
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.04)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,31,75,0)', transition: 'background 200ms ease' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(27,31,75,0.2)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(27,31,75,0)')}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={slides}
        />
      )}
    </>
  )
}
