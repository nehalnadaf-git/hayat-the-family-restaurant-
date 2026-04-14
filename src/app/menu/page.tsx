import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { menuCategories } from '@/data/menu'

export const metadata: Metadata = {
  title: 'Our Full Menu | Hayat Family Restaurant Hubballi',
  description: "Explore Hayat Family Restaurant's full menu — Beef Biryani, Tandoori Kababs, Chicken Starters, Mutton, Veg Mains, Soups & more. Authentic Mughal cuisine in Hubballi.",
  alternates: { canonical: 'https://hayatfamilyrestaurant.in/menu' },
}

export default function MenuPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section style={{ background: 'var(--color-navy)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: '16px' }}>Explore Our</p>
        <h1 className="heading-hero" style={{ fontSize: 'clamp(40px,7vw,72px)', color: 'var(--color-ivory)' }}>Full Menu</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--color-ivory-muted)', marginTop: '16px', maxWidth: '520px', margin: '16px auto 0', lineHeight: 1.7 }}>
          From slow-cooked Beef Biryani to sizzling Tandoori Kababs — discover the full breadth of our Mughal royal kitchen.
        </p>
      </section>

      {/* Category Grid */}
      <section style={{ background: 'var(--color-ivory)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {menuCategories.map((cat) => (
              <Link key={cat.slug} href={`/menu/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <div className="category-card" style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212,168,83,0.3)', boxShadow: '0 4px 20px rgba(44,26,14,0.08)' }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--color-charcoal)' }}>
                    <Image src={cat.image} alt={cat.name} fill sizes="(max-width:768px) 90vw, 33vw" style={{ objectFit: 'cover', opacity: 0.7 }} />
                    <div className="card-overlay" />
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>

                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: 'var(--color-ivory)', marginBottom: '4px' }}>{cat.name}</h2>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--color-gold)', letterSpacing: '1px' }}>
                        {cat.items.length} items
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
