'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { restaurant } from '@/data/restaurant'
import { useBookingModal } from '@/contexts/BookingModalContext'

const navLinksLeft = [
  { label: 'Home',    href: '/'        },
  { label: 'About',   href: '/about'   },
  { label: 'Gallery', href: '/gallery' },
]
const navLinksRight = [
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ',     href: '/faq'     },
  { label: 'Contact', href: '/contact' },
]
const menuCategories = [
  { label: 'Soups',               href: '/menu/soups'            },
  { label: 'Veg Starters',        href: '/menu/veg-starters'     },
  { label: 'Veg Main Course',     href: '/menu/veg-mains'        },
  { label: 'Veg Biryani & Rice',  href: '/menu/veg-biryani-rice' },
  { label: 'Beef Starters',       href: '/menu/beef-starters'    },
  { label: 'Chicken Starters',    href: '/menu/chicken-starters' },
  { label: 'Mutton Starters',     href: '/menu/mutton-starters'  },
  { label: 'Tandoori Kababs',     href: '/menu/tandoori-kababs'  },
  { label: 'Beef Main Course',    href: '/menu/beef-mains'       },
  { label: 'Bulk Orders',         href: '/menu/bulk-orders'      },
]

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [drawerOpen,  setDrawerOpen]  = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const pathname = usePathname()
  const menuRef  = useRef<HTMLDivElement>(null)
  const { openModal } = useBookingModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => { setDrawerOpen(false); setMenuOpen(false) }, [pathname])
  useEffect(() => { document.body.style.overflow = drawerOpen ? 'hidden' : '' }, [drawerOpen])

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* ════════════════════════════════════════
          MAIN HEADER
      ════════════════════════════════════════ */}
      <header className={`luxury-header ${scrolled ? 'header-scrolled' : ''}`}>

        {/* Gold pixel stripe at very top */}
        <div className="header-gold-stripe" />

        <div className="header-inner">

          {/* ── Left nav (flex: 1 → pushes equally from center) ── */}
          <nav className="header-nav header-nav--left hidden-mobile">
            {navLinksLeft.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`hdr-link ${isActive(l.href) ? 'hdr-link--active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ── Center Logo — absolute so it can never shift ── */}
          <Link href="/" className="header-logo" aria-label="Hayat Family Restaurant — Home">
            {/* Top ornament line */}
            <span className="logo-ornament" />

            <span className="logo-wordmark">HAYAT</span>

            <span className="logo-sub">Family Restaurant</span>

            {/* Italic Urdu-style tag */}
            <span className="logo-tagline">Lazeez Pakwan</span>

            {/* Bottom ornament line */}
            <span className="logo-ornament" />
          </Link>

          {/* ── Right nav (flex: 1, justify flex-end) ── */}
          <nav className="header-nav header-nav--right hidden-mobile">
            {/* Our Menu dropdown */}
            <div style={{ position: 'relative' }} ref={menuRef}>
              <button
                onClick={() => setMenuOpen(m => !m)}
                className={`hdr-link hdr-link--btn ${pathname.startsWith('/menu') ? 'hdr-link--active' : ''}`}
              >
                Our Menu
                <ChevronDown
                  size={12}
                  style={{
                    transition: 'transform 280ms ease',
                    transform: menuOpen ? 'rotate(180deg)' : 'none',
                    color: 'var(--color-gold)',
                    marginLeft: '3px',
                  }}
                />
              </button>

              {/* Dropdown */}
              <div className={`menu-dropdown ${menuOpen ? 'dropdown-open' : ''}`}>
                <Link
                  href="/menu"
                  className="dropdown-item"
                  style={{
                    borderBottom: '1px solid rgba(203,152,115,0.12)',
                    fontWeight: 700,
                    color: 'var(--color-gold-light)',
                    letterSpacing: '0.5px',
                  }}
                >
                  All Categories
                </Link>
                {menuCategories.map(c => (
                  <Link key={c.href} href={c.href} className="dropdown-item">{c.label}</Link>
                ))}
              </div>
            </div>

            {navLinksRight.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`hdr-link ${isActive(l.href) ? 'hdr-link--active' : ''}`}
              >
                {l.label}
              </Link>
            ))}

            {/* CTA */}
            <button
              onClick={() => openModal()}
              className="hdr-cta"
            >
              Book a Table
            </button>
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="show-mobile hdr-hamburger"
            aria-label="Open navigation menu"
          >
            <Menu size={22} strokeWidth={1.6} />
          </button>

        </div>{/* /header-inner */}

      </header>

      {/* ════════════════════════════════════════
          MOBILE DRAWER OVERLAY
      ════════════════════════════════════════ */}
      <div
        className={`drawer-overlay ${drawerOpen ? 'overlay-visible' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════ */}
      <div className={`mobile-drawer ${drawerOpen ? 'drawer-open' : ''}`} style={{ background: '#221509' }}>
        {/* Drawer header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700,
              color: 'var(--color-gold)', letterSpacing: '5px', lineHeight: 1,
            }}>
              HAYAT
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '8px', fontWeight: 600,
              color: 'rgba(250,246,240,0.4)', letterSpacing: '3.5px',
              textTransform: 'uppercase', marginTop: '4px',
            }}>
              Family Restaurant
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: '13px', color: 'var(--color-teak)', marginTop: '4px', letterSpacing: '0.5px',
            }}>
              Lazeez Pakwan
            </div>
          </div>

          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(203,152,115,0.18)',
              borderRadius: '50%',
              width: '36px', height: '36px',
              cursor: 'pointer',
              color: 'var(--color-ivory-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={17} strokeWidth={1.5} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(203,152,115,0.4), transparent)', marginBottom: '32px' }} />

        {/* Links */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {[
            { label: 'Home',     href: '/'        },
            { label: 'About',    href: '/about'   },
            { label: 'Our Menu', href: '/menu'    },
            { label: 'Gallery',  href: '/gallery' },
            { label: 'Reviews',  href: '/reviews' },
            { label: 'FAQ',      href: '/faq'     },
            { label: 'Contact',  href: '/contact' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 600,
                color: isActive(l.href) ? 'var(--color-gold-light)' : 'rgba(250,246,240,0.68)',
                textDecoration: 'none',
                padding: '11px 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                transition: 'color 200ms, padding-left 200ms',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
              onMouseEnter={e => {
                if (!isActive(l.href)) {
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--color-gold-light)'
                  ;(e.currentTarget as HTMLElement).style.paddingLeft = '6px'
                }
              }}
              onMouseLeave={e => {
                if (!isActive(l.href)) {
                  ;(e.currentTarget as HTMLElement).style.color = 'rgba(250,246,240,0.68)'
                  ;(e.currentTarget as HTMLElement).style.paddingLeft = '0'
                }
              }}
            >
              {isActive(l.href) && (
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0 }} />
              )}
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(203,152,115,0.2), transparent)', margin: '28px 0' }} />

        <button
          onClick={() => { openModal(); setDrawerOpen(false) }}
          className="btn-primary"
          style={{ justifyContent: 'center', width: '100%', cursor: 'pointer', border: 'none' }}
        >
          Book a Table
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a
            href={restaurant.phoneHref}
            style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600 }}
          >
            {restaurant.phone}
          </a>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(200,184,154,0.4)', letterSpacing: '0.5px', marginTop: '4px' }}>
            {restaurant.hoursShort}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SCOPED STYLES
      ════════════════════════════════════════ */}
      <style>{`

        /* ═══════════════════════════════════════════════════
           BASE HEADER — always solid, always premium
           No transparency. The ivory hero section sits
           BELOW the header, not behind it.
        ═══════════════════════════════════════════════════ */
        .luxury-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: #1A1007;
          border-bottom: 1px solid rgba(203,152,115,0.16);
          transition: box-shadow 400ms ease, border-color 400ms ease;
        }

        /* ── Scrolled state — deepens shadow & brightens gold line ── */
        .luxury-header.header-scrolled {
          box-shadow:
            0 1px 0 rgba(203,152,115,0.24),
            0 4px 32px rgba(0,0,0,0.55);
          border-bottom-color: rgba(203,152,115,0.28);
        }

        /* ── Gold top pixel stripe — always visible, amplifies on scroll ── */
        .header-gold-stripe {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(203,152,115,0.45), transparent);
          opacity: 1;
          transition: opacity 400ms ease;
        }
        .header-scrolled .header-gold-stripe {
          background: linear-gradient(to right, transparent, rgba(203,152,115,0.7), transparent);
        }

        /* ── Inner layout ── */
        .header-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        /* ── Nav groups ── */
        .header-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
        }
        .header-nav--right { justify-content: flex-end; }

        /* ── Nav links ── */
        .hdr-link {
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.6px;
          color: rgba(250,246,240,0.68);
          text-decoration: none;
          padding: 8px 13px;
          border-radius: 3px;
          position: relative;
          transition: color 200ms ease, background 200ms ease;
          white-space: nowrap;
        }
        .hdr-link--btn {
          background: none;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
        }
        .hdr-link:hover {
          color: var(--color-gold-light);
          background: rgba(203,152,115,0.07);
        }
        .hdr-link--active {
          color: var(--color-gold-light) !important;
        }
        .hdr-link--active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 13px;
          right: 13px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(203,152,115,0.7), transparent);
        }

        /* ── CTA button ── */
        .hdr-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-left: 10px;
          padding: 9px 22px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #1C1008;
          background: linear-gradient(135deg, #CB9873 0%, #EBD0B9 55%, #CB9873 100%);
          background-size: 200% 200%;
          background-position: left center;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: background-position 400ms ease, box-shadow 300ms ease, transform 150ms ease;
          box-shadow: 0 2px 14px rgba(203,152,115,0.25);
          flex-shrink: 0;
        }
        .hdr-cta:hover {
          background-position: right center;
          box-shadow: 0 6px 28px rgba(203,152,115,0.45);
          transform: translateY(-1px);
        }
        .hdr-cta:active { transform: scale(0.97) translateY(0); }

        /* ── Center logo (absolutely centered) ── */
        .header-logo {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          gap: 0;
          padding: 4px 0;
          transition: opacity 200ms ease;
          user-select: none;
        }
        .header-logo:hover { opacity: 0.88; }

        .logo-ornament {
          display: block;
          width: 44px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(203,152,115,0.55), transparent);
          margin: 3px 0;
        }

        .logo-wordmark {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          color: var(--color-gold);
          letter-spacing: 6px;
          line-height: 1;
          text-shadow: 0 0 28px rgba(203,152,115,0.22);
        }

        .logo-sub {
          font-family: var(--font-body);
          font-size: 8px;
          font-weight: 600;
          color: rgba(250,246,240,0.42);
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-top: 2px;
          line-height: 1;
        }

        .logo-tagline {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 11px;
          color: var(--color-teak);
          letter-spacing: 0.5px;
          margin-top: 1px;
          line-height: 1;
          opacity: 0.85;
        }


        /* ── Hamburger ── */
        .hdr-hamburger {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(250,246,240,0.82);
          padding: 8px;
          border-radius: 4px;
          transition: color 200ms, background 200ms;
          touch-action: manipulation;
          display: flex;
          align-items: center;
          margin-left: auto;
        }
        .hdr-hamburger:hover {
          color: var(--color-gold-light);
          background: rgba(203,152,115,0.08);
        }

        /* ── Responsive ── */
        .hidden-mobile { display: flex; }
        .show-mobile   { display: none;  }
        @media (max-width: 960px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
          .header-inner  { padding: 0 20px; }
        }
      `}</style>
    </>
  )
}
