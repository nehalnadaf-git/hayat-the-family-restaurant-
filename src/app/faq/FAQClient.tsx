'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/data/faqs'

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`accordion-item${openIndex === i ? ' open' : ''}`}
          style={{ borderBottom: '1px solid rgba(27,31,75,0.1)', marginBottom: '0' }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: '100%', textAlign: 'left', background: 'none', border: 'none',
              padding: '24px 0', cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: '16px',
            }}
            aria-expanded={openIndex === i}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.5vw,22px)', fontWeight: 600, color: 'var(--color-navy)', lineHeight: 1.3 }}>
              {faq.question}
            </span>
            <ChevronDown size={20} className="accordion-arrow" style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
          </button>
          <div className="accordion-content">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A4A4A', lineHeight: 1.8, paddingBottom: '24px' }}>
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
