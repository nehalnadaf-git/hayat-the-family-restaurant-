'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { menuCategories } from '@/data/menu'
import { ChevronLeft, ChevronRight, Utensils, Flame, Star, Crown } from 'lucide-react'

const featured = [
  {
    name: 'Beef Biryani & Starters',
    tagline: 'Slow-cooked biryanis and bold beef preparations',
    items: ['Beef Biryani (Basmati)', 'Beef Barbeque', 'Beef Chilli', 'Beef Kadai', 'Beef Lahori'],
    slug: 'beef-starters',
    image: '/images/food/beef-barbeque-premium.webp',
  },
  {
    name: 'Tandoori Kababs',
    tagline: 'Char-grilled masterpieces from our clay tandoor',
    items: ['Tandoori Chicken Full', 'Lazeez Kabab', 'Gulzari Kabab', 'Sholay Kabab', 'Murg Hariyali'],
    slug: 'tandoori-kababs',
    image: '/images/food/tandoori-chicken.webp',
  },
  {
    name: 'Chicken Starters',
    tagline: 'Sizzling chicken in every style — 20+ varieties',
    items: ['Chicken 65', 'Chicken Barbeque', 'Chicken Dragon', 'Chicken Satay', 'Chicken Lollipop'],
    slug: 'chicken-starters',
    image: '/images/food/chicken-65-premium.webp',
  },
]

const vegItems = new Set(['Veg Biryani', 'Paneer Biryani', 'Paneer Butter Masala'])


export default function MenuPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sidebarIdx, setSidebarIdx] = useState(0)
  const sidebarItems = [
    { title: 'Beef Specialties', items: ['Beef Biryani', 'Beef Kadai', 'Beef Roghan Josh'], desc: 'Slow-cooked beef in rich Mughal gravies — the heart of Hayat.' },
    { title: 'Tandoor Favourites', items: ['Lazeez Kabab', 'Gulzari Kabab', 'Tandoori Chicken'], desc: 'Perfectly charred from our clay tandoor — smoky and unforgettable.' },
    { title: 'Chicken Delights', items: ['Chicken 65', 'Chicken Dragon', 'Chicken Satay'], desc: 'Over 20 chicken starter varieties — crispy, spiced, and bold.' },
    { title: 'Veg Favourites', items: ['Paneer Butter Masala', 'Shahi Paneer', 'Dal Tadka'], desc: 'Rich, aromatic vegetarian dishes crafted with equal care and passion.' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view') } }),
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: 'linear-gradient(160deg, #FDF8F2 0%, #F8F0E4 60%, #F4EAD5 100%)',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle warm texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(203,152,115,0.07) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(203,152,115,0.2), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(18,12,7,0.08), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="ornament ornament-dark" style={{ justifyContent: 'flex-start', marginBottom: '16px' }}>
              <span className="eyebrow-dark">Our Menu</span>
            </div>
            <h2 className="heading-section" style={{ color: 'var(--color-ink)', maxWidth: '460px' }}>
              Your Next Favourite<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-copper)' }}>Meal Awaits</em>
            </h2>
          </div>
          <Link href="/menu" className="btn-secondary-dark" style={{ alignSelf: 'flex-end' }}>
            Full Menu →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px', alignItems: 'start' }} className="menu-preview-grid fade-up">
          {/* Left Sidebar */}
          <div style={{
            background: 'rgba(255,255,255,0.75)',
            borderRadius: '6px', padding: '28px',
            border: '1px solid rgba(18,12,7,0.1)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(18,12,7,0.06)',
          }} className="menu-sidebar">
            <Utensils size={20} color="var(--color-copper)" strokeWidth={1.5} style={{ marginBottom: '14px' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '20px', color: 'var(--color-ink)', marginBottom: '16px', fontWeight: 600 }}>
              {sidebarItems[sidebarIdx].title}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sidebarItems[sidebarIdx].items.map(item => (
                <li key={item} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-ink-mid)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-copper)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-ink-soft)', lineHeight: 1.65, marginBottom: '20px' }}>
              {sidebarItems[sidebarIdx].desc}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setSidebarIdx(i => (i - 1 + sidebarItems.length) % sidebarItems.length)}
                style={{ width: '34px', height: '34px', border: '1px solid rgba(18,12,7,0.15)', borderRadius: '2px', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-copper)', transition: 'all 200ms' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(181,116,58,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setSidebarIdx(i => (i + 1) % sidebarItems.length)}
                style={{ width: '34px', height: '34px', border: '1px solid rgba(18,12,7,0.15)', borderRadius: '2px', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-copper)', transition: 'all 200ms' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(181,116,58,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Featured Category Cards — now with images */}
          <div className="menu-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {featured.map((cat, i) => (
              <Link key={cat.slug} href={`/menu/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <div className="menu-card" style={{
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: `1px solid ${i === 1 ? 'rgba(203,152,115,0.45)' : 'rgba(18,12,7,0.09)'}`,
                  background: 'white',
                  boxShadow: i === 1 ? '0 8px 32px rgba(203,152,115,0.14)' : '0 2px 12px rgba(18,12,7,0.06)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease',
                }}>
                  {/* Category photo */}
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width:900px) 80vw, 33vw"
                      style={{ objectFit: 'cover', transition: 'transform 500ms ease' }}
                    />
                    {/* Gradient overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(30,17,9,0.65) 0%, rgba(30,17,9,0.15) 50%, transparent 100%)',
                    }} />

                  </div>

                  {/* Card content */}
                  <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 className="heading-card" style={{ color: 'var(--color-ink)', marginBottom: '6px', fontSize: '18px' }}>{cat.name}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-ink-soft)', marginBottom: '16px', lineHeight: 1.55 }}>{cat.tagline}</p>

                    {/* Divider */}
                    <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(203,152,115,0.25), transparent)', marginBottom: '14px' }} />

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                      {cat.items.map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-ink-mid)' }}>
                          <span className={vegItems.has(item) ? 'dot-veg' : 'dot-nonveg'} style={{ width: '7px', height: '7px' }} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Explore link */}
                    <div style={{
                      marginTop: '16px',
                      fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700,
                      color: 'var(--color-copper)', letterSpacing: '1.5px', textTransform: 'uppercase',
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      Explore →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="fade-up" style={{ textAlign: 'right', marginTop: '32px' }}>
          <Link href="/menu" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--color-copper)', textDecoration: 'none', letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: '1px solid rgba(181,116,58,0.4)', paddingBottom: '2px' }}>
            View Full Menu →
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 901px) {
          .menu-preview-grid { grid-template-columns: 240px 1fr !important; }
        }
        @media (max-width: 900px) {
          .menu-preview-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .menu-sidebar { display: block !important; width: 100% !important; max-width: 100% !important; box-sizing: border-box; }
          .menu-cards-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            gap: 16px !important;
            padding-bottom: 8px !important;
          }
          .menu-cards-grid::-webkit-scrollbar { display: none !important; }
          .menu-cards-grid > a {
            scroll-snap-align: start !important;
            flex: 0 0 78vw !important;
            max-width: 300px !important;
          }
        }
        @media (max-width: 480px) {
          .menu-cards-grid > a { flex: 0 0 85vw !important; }
        }
        .menu-card:hover { transform: translateY(-5px) !important; box-shadow: 0 20px 52px rgba(18,12,7,0.13) !important; border-color: rgba(203,152,115,0.4) !important; }
        .menu-card:hover img { transform: scale(1.04) !important; }
      `}</style>
    </section>
  )
}
