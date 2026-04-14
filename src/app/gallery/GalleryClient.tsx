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
              color: activeCategory === cat ? 'var(--color-parchment)' : 'var(--color-navy)',
              borderColor: activeCategory === cat ? 'var(--color-gold)' : 'rgba(18,12,7,0.2)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stylish Masonry Grid */}
      <div className="masonry-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {filtered.map((img, i) => (
          <div
            key={img.id}
            className="masonry-item"
            onClick={() => setLightboxIndex(i)}
            style={{ 
              cursor: 'pointer', 
              position: 'relative', 
              marginBottom: '24px',
              borderRadius: '8px',
              border: '1px solid rgba(203,152,115,0.15)',
              overflow: 'hidden',
              background: 'var(--color-linen)',
              transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(18,12,7,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800} // Placeholder width
              height={600} // Placeholder height, will be eclipsed by height: auto
              sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
              style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block',
                transition: 'transform 0.6s ease'
              }}
              loading="lazy"
            />
            {/* Subtle Overlay on Hover */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'rgba(45,28,16,0.05)', 
              opacity: 0, 
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none' 
            }}
            className="item-overlay"
            />
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
