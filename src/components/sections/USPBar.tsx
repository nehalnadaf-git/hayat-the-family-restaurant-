import { Utensils, Star, Users, Clock } from 'lucide-react'

const usps = [
  { Icon: Utensils, number: '100+', label: 'Dishes on Menu' },
  { Icon: Star,     number: '4.5★', label: 'Google Rating' },
  { Icon: Users,    number: 'Family', label: 'AC Dining Sections' },
  { Icon: Clock,    number: 'Daily', label: '11 AM – 11 PM' },
]

export default function USPBar() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #FAF4E8 0%, #F4EAD5 100%)',
      borderTop: '1px solid rgba(201,150,62,0.18)',
      borderBottom: '1px solid rgba(201,150,62,0.15)',
      padding: 'clamp(28px, 4vw, 52px) clamp(24px, 5vw, 80px)',
      position: 'relative',
    }}>
      {/* Subtle warm gradient accent */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,150,62,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0' }}>
          {usps.map((usp, i) => (
            <div key={usp.label} style={{
              textAlign: 'center',
              padding: '24px 20px',
              borderRight: i < usps.length - 1 ? '1px solid rgba(28,16,8,0.1)' : 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
            }}>
              <usp.Icon size={20} color="var(--color-copper)" strokeWidth={1.5} />
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-ink)',
                lineHeight: 1,
              }}>
                {usp.number}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--color-ink-muted)',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}>
                {usp.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
