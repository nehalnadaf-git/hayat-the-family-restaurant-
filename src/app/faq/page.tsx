import type { Metadata } from 'next'
import FAQClient from './FAQClient'
import { faqs } from '@/data/faqs'

export const metadata: Metadata = {
  title: 'FAQ | Hayat Family Restaurant Hubballi',
  description: 'Frequently asked questions about Hayat Family Restaurant Lazeez Pakwan — location, hours, booking, cuisine, bulk orders and more.',
  alternates: { canonical: 'https://hayatfamilyrestaurant.in/faq' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function FAQPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ background: 'var(--color-navy)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: '16px' }}>Got Questions?</p>
        <h1 className="heading-hero" style={{ fontSize: 'clamp(40px,7vw,72px)', color: 'var(--color-ivory)' }}>FAQ</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--color-ivory-muted)', marginTop: '16px', maxWidth: '480px', margin: '16px auto 0', lineHeight: 1.7 }}>
          Everything you need to know before your visit to Hayat Family Restaurant
        </p>
      </section>

      {/* FAQ Accordion */}
      <section style={{ background: 'var(--color-ivory)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <FAQClient />
      </section>
    </div>
  )
}
