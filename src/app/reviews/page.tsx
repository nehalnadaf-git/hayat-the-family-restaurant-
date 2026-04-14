import type { Metadata } from 'next'
import { Star, ExternalLink } from 'lucide-react'
import { reviews } from '@/data/reviews'
import { restaurant } from '@/data/restaurant'

export const metadata: Metadata = {
  title: 'Customer Reviews | Hayat Family Restaurant Hubballi',
  description: 'Read what our guests say about Hayat Family Restaurant Lazeez Pakwan — real reviews from happy families and food lovers in Hubballi.',
  alternates: { canonical: 'https://hayatfamilyrestaurant.in/reviews' },
}

const aggregateSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Hayat Family Restaurant Lazeez Pakwan',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    reviewCount: String(reviews.length),
    bestRating: '5',
  },
}

export default function ReviewsPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateSchema) }} />

      {/* Hero */}
      <section style={{ background: 'var(--color-navy)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: '16px' }}>What Our Guests Say</p>
        <h1 className="heading-hero" style={{ fontSize: 'clamp(40px,7vw,72px)', marginBottom: '24px', color: 'var(--color-ivory)' }}>Guest Reviews</h1>
        {/* Aggregate rating */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', background: 'rgba(212,168,83,0.12)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: '4px', padding: '20px 32px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '64px', fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1 }}>4.5</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
              {[1,2,3,4].map(s => <Star key={s} size={20} fill="var(--color-gold)" color="var(--color-gold)" />)}
              <Star size={20} fill="none" color="var(--color-gold)" />
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-ivory-muted)' }}>
              {reviews.length} Google Reviews
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-gold)', marginTop: '2px' }}>
              Google Rating
            </div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section style={{ background: 'var(--color-ivory)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '56px' }}>
            {reviews.map((review, i) => {
              const isDark = i % 5 === 1
              return (
                <div key={review.id} style={{
                  background: isDark ? 'var(--color-navy)' : 'white',
                  border: isDark ? '1px solid var(--color-gold)' : '1px solid rgba(18,12,7,0.1)',
                  borderRadius: '4px', padding: '28px 24px',
                  boxShadow: '0 4px 20px rgba(18,12,7,0.06)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={15} fill="var(--color-gold)" color="var(--color-gold)" />
                    ))}
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '17px', color: isDark ? 'var(--color-ivory)' : 'var(--color-navy)', lineHeight: 1.65, marginBottom: '20px', flex: 1 }}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: `1px solid ${isDark ? 'rgba(212,168,83,0.2)' : 'rgba(18,12,7,0.08)'}`, paddingTop: '14px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: isDark ? 'var(--color-gold)' : 'var(--color-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-body)', color: isDark ? 'var(--color-navy)' : 'white', flexShrink: 0 }}>
                      {review.name[0]}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: isDark ? 'var(--color-ivory)' : 'var(--color-navy)' }}>
                        {review.name} {review.isLocalGuide && <span style={{ color: 'var(--color-gold)', fontSize: '11px' }}>· Local Guide</span>}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: isDark ? 'var(--color-ivory-muted)' : '#888' }}>{review.location}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Leave Review CTA */}
          <div style={{ textAlign: 'center' }}>
            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex' }}
            >
              <ExternalLink size={18} /> Leave Us a Review on Google
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
