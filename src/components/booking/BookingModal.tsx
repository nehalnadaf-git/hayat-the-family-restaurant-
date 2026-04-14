'use client'
import { useState, useEffect, useRef } from 'react'
import { X, User, Phone, Calendar, Clock, Users, MessageSquare, MessageCircle } from 'lucide-react'
import { useBookingModal } from '@/contexts/BookingModalContext'

/* ── Time slots 11:00 AM → 10:30 PM ─────────────────────── */
const TIME_SLOTS = (() => {
  const slots: { label: string; value: string }[] = []
  for (let h = 11; h <= 22; h++) {
    for (const m of [0, 30]) {
      if (h === 22 && m === 30) break
      const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h
      const ampm = h >= 12 ? 'PM' : 'AM'
      const pad = (n: number) => String(n).padStart(2, '0')
      slots.push({ label: `${hour12}:${pad(m)} ${ampm}`, value: `${pad(h)}:${pad(m)}` })
    }
  }
  return slots
})()

const PARTY_SIZES = ['1', '2', '3', '4', '5', '6', '7', '8+']

const today = new Date().toISOString().split('T')[0]
const maxDate = new Date(Date.now() + 60 * 86_400_000).toISOString().split('T')[0]

const PHONE = '919740271679'

/* ── Field wrapper ───────────────────────────────────────── */
function Field({ label, icon, error, children }: { label: string; icon: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: error ? '#c0392b' : 'var(--color-ink-muted)',
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        <span style={{ color: error ? '#c0392b' : 'var(--color-copper)', display: 'flex', alignItems: 'center' }}>{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#c0392b' }}>{error}</span>
      )}
    </div>
  )
}

const inputStyle = (error?: string): React.CSSProperties => ({
  width: '100%',
  height: '48px',
  padding: '0 14px',
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  color: 'var(--color-ink)',
  background: '#FDFAF6',
  border: `1.5px solid ${error ? '#c0392b' : 'rgba(18,12,7,0.14)'}`,
  borderRadius: '6px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 200ms',
  WebkitAppearance: 'none',
})

/* ── Modal ───────────────────────────────────────────────── */
export default function BookingModal() {
  const { isOpen, closeModal } = useBookingModal()
  const [visible, setVisible] = useState(false)
  const [animIn, setAnimIn] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hoverClose, setHoverClose] = useState(false)

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)))
      document.body.style.overflow = 'hidden'
    } else {
      setAnimIn(false)
      const t = setTimeout(() => setVisible(false), 380)
      document.body.style.overflow = ''
      return () => clearTimeout(t)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.phone.trim()) e.phone = 'Please enter a phone number'
    if (!form.date) e.date = 'Please select a date'
    if (!form.time) e.time = 'Please select a time'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const dateStr = new Date(form.date + 'T12:00:00').toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
    const timeLabel = TIME_SLOTS.find(t => t.value === form.time)?.label ?? form.time
    const msg = [
      'HAYAT FAMILY RESTAURANT',
      'Table Reservation Request',
      '--------------------------------',
      '',
      `Name         : ${form.name.trim()}`,
      `Phone        : ${form.phone.trim()}`,
      `Date         : ${dateStr}`,
      `Time         : ${timeLabel}`,
      `Party Size   : ${form.guests} guest${form.guests === '1' ? '' : 's'}`,
      form.notes.trim() ? `\nSpecial Request:\n${form.notes.trim()}` : '',
      '',
      '--------------------------------',
      'Kindly confirm my reservation at your earliest convenience.',
      '',
      'Thank you.',
    ].filter(l => l !== undefined).join('\n')
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank')
    closeModal()
    setForm({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' })
    setErrors({})
  }

  if (!visible) return null

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={closeModal}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(20,11,5,0.72)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 900,
          opacity: animIn ? 1 : 0,
          transition: 'opacity 350ms ease',
        }}
      />

      {/* ── Modal panel ── */}
      <div
        style={{
          position: 'fixed',
          zIndex: 901,
          /* Desktop: centered */
          top: '50%',
          left: '50%',
          transform: animIn
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -48%) scale(0.97)',
          width: 'min(520px, 100vw)',
          maxHeight: '92dvh',
          backgroundColor: '#FFFDF9',
          borderRadius: '12px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          opacity: animIn ? 1 : 0,
          transition: 'opacity 350ms ease, transform 380ms cubic-bezier(0.16,1,0.3,1)',
        }}
        className="booking-modal-panel"
        onClick={e => e.stopPropagation()}
      >

        {/* ── Dark header ── */}
        <div style={{
          background: 'linear-gradient(135deg, #1C120A 0%, #2E1A0C 100%)',
          padding: '28px 24px 24px',
          flexShrink: 0,
          position: 'relative',
        }}>
          {/* Gold top line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, rgba(203,152,115,0.8), transparent)' }} />

          {/* Close button */}
          <button
            onClick={closeModal}
            onMouseEnter={() => setHoverClose(true)}
            onMouseLeave={() => setHoverClose(false)}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '34px', height: '34px',
              background: hoverClose ? 'rgba(203,152,115,0.18)' : 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 200ms',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <X size={16} />
          </button>

          {/* Restaurant name */}
          <p className="booking-modal-header-eyebrow" style={{
            fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '4px', textTransform: 'uppercase',
            color: 'rgba(203,152,115,0.85)', margin: '0 0 10px',
          }}>
            HAYAT Family Restaurant
          </p>

          {/* Heading */}
          <h2 className="booking-modal-header-title" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,4vw,28px)',
            fontWeight: 600, color: '#FAF6F0',
            margin: '0 0 6px', lineHeight: 1.2,
          }}>
            Reserve Your Table
          </h2>
          <p className="booking-modal-header-sub" style={{
            fontFamily: 'var(--font-body)', fontSize: '13px',
            color: 'rgba(200,184,154,0.65)', margin: 0, lineHeight: 1.5,
          }}>
            Fill in your details — we'll open WhatsApp pre-filled for you.
          </p>
        </div>

        {/* ── Form body (scrollable) ── */}
        <div
          ref={bodyRef}
          className="booking-modal-body"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(203,152,115,0.3) transparent',
          }}
        >
          {/* Name + Phone row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="booking-two-col">
            <Field label="Your Name" icon={<User size={13} />} error={errors.name}>
              <input
                placeholder="e.g. Ahmed Khan"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                style={inputStyle(errors.name)}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')}
                onBlur={e => (e.currentTarget.style.borderColor = errors.name ? '#c0392b' : 'rgba(18,12,7,0.14)')}
              />
            </Field>
            <Field label="Phone Number" icon={<Phone size={13} />} error={errors.phone}>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                style={inputStyle(errors.phone)}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')}
                onBlur={e => (e.currentTarget.style.borderColor = errors.phone ? '#c0392b' : 'rgba(18,12,7,0.14)')}
              />
            </Field>
          </div>

          {/* Date + Time row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="booking-two-col">
            <Field label="Date" icon={<Calendar size={13} />} error={errors.date}>
              <input
                type="date"
                min={today}
                max={maxDate}
                value={form.date}
                onChange={e => set('date', e.target.value)}
                style={inputStyle(errors.date)}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')}
                onBlur={e => (e.currentTarget.style.borderColor = errors.date ? '#c0392b' : 'rgba(18,12,7,0.14)')}
              />
            </Field>
            <Field label="Time" icon={<Clock size={13} />} error={errors.time}>
              <select
                value={form.time}
                onChange={e => set('time', e.target.value)}
                style={{ ...inputStyle(errors.time), paddingRight: '32px', cursor: 'pointer', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9963E' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', backgroundSize: '10px', WebkitAppearance: 'none' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')}
                onBlur={e => (e.currentTarget.style.borderColor = errors.time ? '#c0392b' : 'rgba(18,12,7,0.14)')}
              >
                <option value="">Select time</option>
                {TIME_SLOTS.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Party Size chips */}
          <Field label="Party Size" icon={<Users size={13} />}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {PARTY_SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => set('guests', size)}
                  className="party-chip"
                  style={{
                    height: '40px', minWidth: '44px', padding: '0 12px',
                    fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
                    borderRadius: '6px', cursor: 'pointer',
                    border: form.guests === size ? '1.5px solid var(--color-copper)' : '1.5px solid rgba(18,12,7,0.14)',
                    background: form.guests === size ? 'rgba(203,152,115,0.1)' : '#FDFAF6',
                    color: form.guests === size ? 'var(--color-copper)' : 'var(--color-ink-muted)',
                    transition: 'all 180ms ease',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </Field>

          {/* Special Requests */}
          <Field label="Special Requests" icon={<MessageSquare size={13} />}>
            <textarea
              placeholder="Dietary needs, seating preference, high chair for child…"
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              rows={3}
              style={{
                ...inputStyle(),
                height: 'auto',
                padding: '12px 14px',
                resize: 'none',
                lineHeight: '1.5',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(18,12,7,0.14)')}
            />
          </Field>

          {/* Trust badges */}
          <div className="booking-trust-badges" style={{
            display: 'flex', gap: '6px', flexWrap: 'wrap',
            padding: '14px', borderRadius: '8px',
            background: 'rgba(203,152,115,0.07)',
            border: '1px solid rgba(203,152,115,0.18)',
          }}>
            {['No booking fee', 'Open daily 11AM–11PM', 'Instant WhatsApp confirm'].map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
                color: 'var(--color-copper)', letterSpacing: '0.5px',
                background: 'rgba(203,152,115,0.12)', borderRadius: '4px',
                padding: '4px 10px',
              }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div className="booking-modal-footer" style={{
          padding: '16px 24px 20px',
          borderTop: '1px solid rgba(18,12,7,0.08)',
          background: '#FFFDF9',
          flexShrink: 0,
        }}>
          <button
            onClick={handleSubmit}
            style={{
              width: '100%', height: '52px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              background: 'linear-gradient(135deg, #25D366 0%, #1DA851 100%)',
              color: '#fff',
              fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 700,
              letterSpacing: '0.3px',
              border: 'none', borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37,211,102,0.35)',
              transition: 'transform 150ms ease, box-shadow 150ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(37,211,102,0.45)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(37,211,102,0.35)' }}
          >
            <MessageCircle size={20} />
            Confirm Reservation via WhatsApp
          </button>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            color: 'var(--color-ink-muted)', textAlign: 'center',
            margin: '10px 0 0', letterSpacing: '0.2px',
          }}>
            Your details will open in WhatsApp — just hit Send.
          </p>
        </div>
      </div>

      <style>{`
        /* ── Mobile: full-width bottom sheet ── */
        @media (max-width: 600px) {
          .booking-modal-panel {
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            transform: ${animIn ? 'translateY(0)' : 'translateY(100%)'} !important;
            width: 100% !important;
            max-height: 88dvh !important;
            border-radius: 18px 18px 0 0 !important;
            transition: opacity 350ms ease, transform 380ms cubic-bezier(0.16,1,0.3,1) !important;
          }

          /* Compact header */
          .booking-modal-panel > div:first-child {
            padding: 16px 16px 14px !important;
          }
          .booking-modal-header-title {
            font-size: 20px !important;
            margin-bottom: 3px !important;
          }
          .booking-modal-header-sub {
            font-size: 11.5px !important;
          }
          .booking-modal-header-eyebrow {
            font-size: 9px !important;
            margin-bottom: 6px !important;
          }

          /* Compact form body */
          .booking-modal-body {
            padding: 14px 14px 10px !important;
            gap: 12px !important;
          }

          /* Stack all two-col rows to single column */
          .booking-two-col {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          /* Compact inputs */
          .booking-modal-panel input,
          .booking-modal-panel select {
            height: 42px !important;
            font-size: 14px !important;
            padding: 0 12px !important;
          }

          /* Shorter textarea */
          .booking-modal-panel textarea {
            font-size: 14px !important;
            padding: 10px 12px !important;
            min-height: 56px !important;
          }

          /* Party size chips */
          .booking-modal-panel .party-chip {
            height: 36px !important;
            min-width: 38px !important;
            padding: 0 10px !important;
            font-size: 13px !important;
          }

          /* Hide trust badges on small screens to save space */
          .booking-trust-badges { display: none !important; }

          /* Compact footer */
          .booking-modal-footer {
            padding: 10px 14px 16px !important;
          }
          .booking-modal-footer button {
            height: 46px !important;
            font-size: 14px !important;
          }
          .booking-modal-footer p {
            display: none !important;
          }

          /* Label text */
          .booking-modal-panel label {
            font-size: 10px !important;
          }
        }
      `}</style>
    </>
  )
}
