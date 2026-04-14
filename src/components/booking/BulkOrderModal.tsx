'use client'
import { useState, useEffect } from 'react'
import { X, User, Phone, Calendar, Users, Truck, Home, MessageCircle, Package, Star, ChevronDown, ChevronUp } from 'lucide-react'
import { useBulkOrderModal } from '@/contexts/BulkOrderModalContext'

/* ── Menu data (mirrors BulkOrdersSection) ───────────────── */
const bulkMenu = [
  {
    category: 'Biryani — Basmati Rice',
    items: [
      { name: 'Beef Biryani',        price: 800  },
      { name: 'Chicken Biryani',     price: 900  },
      { name: 'Mutton Biryani',      price: 1600 },
      { name: 'Veg Biryani',         price: 650  },
      { name: 'Khushka (Plain Rice)',price: 500  },
    ],
  },
  {
    category: 'Biryani — Jeera Rice',
    items: [
      { name: 'Beef Biryani',        price: 750  },
      { name: 'Chicken Biryani',     price: 850  },
      { name: 'Mutton Biryani',      price: 1550 },
      { name: 'Khushka (Plain Rice)',price: 470  },
    ],
  },
  {
    category: 'Gravies & Kababs',
    items: [
      { name: 'Beef Gravy',          price: 800  },
      { name: 'Chicken Gravy',       price: 950  },
      { name: 'Chicken Fried Kabab', price: 600  },
    ],
  },
]

/* Use category index + item name as unique key */
const itemKey = (catIdx: number, name: string) => `${catIdx}::${name}`

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

/* ── Quantity row ─────────────────────────────────────────── */
function QtyRow({ label, price, qty, onInc, onDec, onSet }: {
  label: string; price: number; qty: number
  onInc: () => void; onDec: () => void; onSet: (v: number) => void
}) {
  const [inputVal, setInputVal] = useState(qty > 0 ? String(qty) : '')
  const [isFocused, setIsFocused] = useState(false)
  const selected = qty > 0

  // Sync display when qty changes externally (e.g. +/- buttons, reset)
  // but NOT while the user is actively typing
  useEffect(() => {
    if (!isFocused) setInputVal(qty > 0 ? String(qty) : '')
  }, [qty, isFocused])

  const commitBlur = () => {
    setIsFocused(false)
    const v = parseInt(inputVal)
    if (!inputVal || isNaN(v) || v < 1) { setInputVal(''); onSet(0) }
    else { setInputVal(String(v)); onSet(v) }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid rgba(28,16,8,0.07)',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: selected ? 600 : 400,
          color: selected ? 'var(--color-ink)' : 'var(--color-ink-muted)',
          margin: 0, transition: 'color 180ms',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{label}</p>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
          color: selected ? 'var(--color-copper)' : 'rgba(100,80,60,0.4)',
          margin: '2px 0 0', transition: 'color 180ms',
        }}>₹{price.toLocaleString('en-IN')}/kg</p>
      </div>

      {/* ── Controls ── */}
      {!selected && !isFocused ? (
        // Dashed "Add" chip when quantity is 0
        <button
          onClick={() => { onSet(5); setInputVal('5'); setIsFocused(false) }}
          style={{
            height: '36px', padding: '0 18px', flexShrink: 0, marginLeft: '12px',
            fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700,
            color: 'var(--color-copper)', letterSpacing: '0.5px',
            background: 'rgba(201,150,62,0.07)',
            border: '1.5px dashed rgba(201,150,62,0.38)',
            borderRadius: '6px', cursor: 'pointer', transition: 'all 180ms',
          }}
          onMouseEnter={e => {
            (e.currentTarget).style.background = 'rgba(201,150,62,0.15)'
            ;(e.currentTarget).style.borderStyle = 'solid'
          }}
          onMouseLeave={e => {
            (e.currentTarget).style.background = 'rgba(201,150,62,0.07)'
            ;(e.currentTarget).style.borderStyle = 'dashed'
          }}
        >+ Add</button>
      ) : (
        // [−] [kg input] [+] when active
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginLeft: '12px' }}>
          {/* − */}
          <button
            onClick={onDec}
            style={{
              width: '36px', height: '36px', borderRadius: '6px 0 0 6px',
              background: 'rgba(201,150,62,0.1)',
              border: '1.5px solid rgba(201,150,62,0.35)', borderRight: 'none',
              cursor: 'pointer', fontSize: '20px',
              color: 'var(--color-copper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 300, transition: 'background 180ms',
            }}
          >−</button>

          {/* Editable quantity */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputVal}
              placeholder="kg"
              onChange={e => {
                const raw = e.target.value.replace(/[^0-9]/g, '')
                setInputVal(raw)
                const v = parseInt(raw)
                if (!isNaN(v) && v >= 1) onSet(v)
                else if (raw === '') onSet(0)
              }}
              onFocus={e => { setIsFocused(true); e.currentTarget.select() }}
              onBlur={commitBlur}
              onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur() }}
              style={{
                width: '56px', height: '36px',
                textAlign: 'center', paddingRight: '16px',
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700,
                color: 'var(--color-copper)',
                background: 'rgba(201,150,62,0.06)',
                border: '1.5px solid rgba(201,150,62,0.35)',
                borderLeft: 'none', borderRight: 'none',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            <span style={{
              position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)',
              fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700,
              color: 'rgba(201,150,62,0.55)', letterSpacing: '0.3px',
              pointerEvents: 'none',
            }}>kg</span>
          </div>

          {/* + */}
          <button
            onClick={onInc}
            style={{
              width: '36px', height: '36px', borderRadius: '0 6px 6px 0',
              background: 'rgba(201,150,62,0.14)',
              border: '1.5px solid rgba(201,150,62,0.35)', borderLeft: 'none',
              cursor: 'pointer', fontSize: '20px',
              color: 'var(--color-copper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 300, transition: 'background 180ms',
            }}
          >+</button>
        </div>
      )}
    </div>
  )
}

/* ── Input field ─────────────────────────────────────────── */
const inputStyle = (err?: string): React.CSSProperties => ({
  width: '100%', height: '48px', padding: '0 14px',
  fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-ink)',
  background: '#FDFAF6', border: `1.5px solid ${err ? '#c0392b' : 'rgba(28,16,8,0.14)'}`,
  borderRadius: '6px', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 200ms', WebkitAppearance: 'none',
})

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
      {error && <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#c0392b' }}>{error}</span>}
    </div>
  )
}

/* ── Main Modal ──────────────────────────────────────────── */
export default function BulkOrderModal() {
  const { isOpen, closeModal } = useBulkOrderModal()
  const [visible, setVisible] = useState(false)
  const [animIn, setAnimIn]   = useState(false)

  const [form, setForm] = useState({
    name: '', phone: '', date: '', guests: '',
    delivery: 'venue', address: '', notes: '',
  })
  const [errors,     setErrors]     = useState<Record<string, string>>({})
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [hoverClose, setHoverClose] = useState(false)

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  const inc = (catIdx: number, name: string) => {
    const k = itemKey(catIdx, name)
    setQuantities(q => ({ ...q, [k]: (q[k] ?? 0) + 1 }))
  }
  const dec = (catIdx: number, name: string) => {
    const k = itemKey(catIdx, name)
    setQuantities(q => ({ ...q, [k]: Math.max(0, (q[k] ?? 0) - 1) }))
  }
  const setQty = (catIdx: number, name: string, val: number) => {
    const k = itemKey(catIdx, name)
    setQuantities(q => ({ ...q, [k]: Math.max(0, val) }))
  }
  const qty = (catIdx: number, name: string) => quantities[itemKey(catIdx, name)] ?? 0

  /* Compute selected items + grand total */
  const selectedItems: { category: string; name: string; qty: number; price: number }[] = []
  for (let ci = 0; ci < bulkMenu.length; ci++) {
    const cat = bulkMenu[ci]
    for (const item of cat.items) {
      const q = qty(ci, item.name)
      if (q > 0) selectedItems.push({ category: cat.category, name: item.name, qty: q, price: item.price })
    }
  }
  const grandTotal = selectedItems.reduce((s, i) => s + i.qty * i.price, 0)

  /* Animation lifecycle */
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

  const today   = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 365 * 86_400_000).toISOString().split('T')[0]

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())  e.name  = 'Please enter your name'
    if (!form.phone.trim()) e.phone = 'Please enter a phone number'
    if (!form.date)         e.date  = 'Please select the event date'
    if (!form.guests.trim() || isNaN(Number(form.guests)) || Number(form.guests) < 1)
      e.guests = 'Please enter number of guests'
    if (form.delivery === 'doorstep' && !form.address.trim())
      e.address = 'Please enter the delivery address'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const dateStr = new Date(form.date + 'T12:00:00').toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
    const lines = [
      'I would like to place a bulk catering order with Hayat Family Restaurant. Please find the details below:',
      '',
      `Name           : ${form.name.trim()}`,
      `Phone          : ${form.phone.trim()}`,
      `Event Date     : ${dateStr}`,
      `Guests         : ${form.guests}`,
      `Delivery       : ${form.delivery === 'doorstep' ? 'Doorstep Delivery' : 'At Restaurant / Self Pickup'}`,
      form.delivery === 'doorstep' && form.address.trim() ? `Address        : ${form.address.trim()}` : '',
      '',
      'Menu Order',
      '──────────────────────────────',
    ]
    for (const cat of bulkMenu) {
      const catIdx = bulkMenu.indexOf(cat)
      const items = cat.items.filter(i => qty(catIdx, i.name) > 0)
      if (!items.length) continue
      lines.push(`\n${cat.category}`)
      for (const item of items) {
        const q = qty(catIdx, item.name)
        const total = q * item.price
        lines.push(`  ${item.name}: ${q} kg x Rs.${item.price.toLocaleString('en-IN')}/kg = ${fmt(total)}`)
      }
    }
    lines.push('──────────────────────────────')
    if (grandTotal > 0) lines.push(`Estimated Total: ${fmt(grandTotal)}`)
    if (!selectedItems.length) lines.push('(No items pre-selected — please discuss the menu with us)')
    if (form.notes.trim()) lines.push('', `Special Instructions: ${form.notes.trim()}`)
    lines.push('', 'Kindly confirm this order and share the final quotation at your earliest convenience.', '', 'Thank you.')

    const msg = lines.filter(l => l !== undefined).join('\n')
    window.open(`https://wa.me/919740271679?text=${encodeURIComponent(msg)}`, '_blank')
    closeModal()
    setForm({ name: '', phone: '', date: '', guests: '', delivery: 'venue', address: '', notes: '' })
    setErrors({})
    setQuantities({})
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div onClick={closeModal} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(20,11,5,0.75)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        zIndex: 900, opacity: animIn ? 1 : 0,
        transition: 'opacity 350ms ease',
      }} />

      {/* Panel */}
      <div
        className="bulk-modal-panel"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', zIndex: 901,
          top: '50%', left: '50%',
          transform: animIn ? 'translate(-50%,-50%) scale(1)' : 'translate(-50%,-48%) scale(0.97)',
          width: 'min(680px, 100vw)',
          maxHeight: '92dvh',
          backgroundColor: '#FFFDF9',
          borderRadius: '12px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          opacity: animIn ? 1 : 0,
          transition: 'opacity 350ms ease, transform 380ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* ── HEADER ── */}
        <div className="bulk-modal-header" style={{
          background: 'linear-gradient(135deg, #3D2A18 0%, #52351E 100%)',
          padding: '28px 28px 24px', flexShrink: 0, position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, rgba(201,150,62,0.8), transparent)' }} />
          <button onClick={closeModal} onMouseEnter={() => setHoverClose(true)} onMouseLeave={() => setHoverClose(false)} style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer',
            background: hoverClose ? 'rgba(201,150,62,0.18)' : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.7)', transition: 'background 200ms',
          }}>
            <X size={16} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="bulk-modal-header-icon" style={{
              width: '48px', height: '48px', borderRadius: '10px', flexShrink: 0,
              background: 'rgba(201,150,62,0.18)', border: '1px solid rgba(201,150,62,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Package size={22} color="var(--color-gold-light)" strokeWidth={1.4} />
            </div>
            <div>
              <p className="bulk-modal-header-eyebrow" style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '3.5px', textTransform: 'uppercase', color: 'rgba(201,150,62,0.8)', margin: '0 0 5px' }}>HAYAT Family Restaurant</p>
              <h2 className="bulk-modal-header-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px,3.5vw,25px)', fontWeight: 600, color: '#FAF6F0', margin: 0, lineHeight: 1.2 }}>
                Bulk Order &amp; Catering
              </h2>
            </div>
          </div>
          <p className="bulk-modal-header-sub" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(200,184,154,0.62)', margin: '12px 0 0', lineHeight: 1.55 }}>
            Select your menu items, fill in event details — we'll open WhatsApp with everything pre-filled.
          </p>
        </div>

        {/* ── BODY ── */}
        <div className="bulk-modal-body" style={{
          flex: 1, overflowY: 'auto', padding: '24px 28px',
          display: 'flex', flexDirection: 'column', gap: '28px',
          scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,150,62,0.3) transparent',
        }}>

          {/* ── Section label ── */}
          <div>
            <SectionLabel icon={<User size={13} />} label="Event Details" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="bulk-two-col">
              <Field label="Your Name" icon={<User size={13} />} error={errors.name}>
                <input placeholder="e.g. Ahmed Khan" value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle(errors.name)}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')} onBlur={e => (e.currentTarget.style.borderColor = errors.name ? '#c0392b' : 'rgba(28,16,8,0.14)')} />
              </Field>
              <Field label="Phone Number" icon={<Phone size={13} />} error={errors.phone}>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} style={inputStyle(errors.phone)}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')} onBlur={e => (e.currentTarget.style.borderColor = errors.phone ? '#c0392b' : 'rgba(28,16,8,0.14)')} />
              </Field>
              <Field label="Event Date" icon={<Calendar size={13} />} error={errors.date}>
                <input type="date" min={today} max={maxDate} value={form.date} onChange={e => set('date', e.target.value)} style={inputStyle(errors.date)}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')} onBlur={e => (e.currentTarget.style.borderColor = errors.date ? '#c0392b' : 'rgba(28,16,8,0.14)')} />
              </Field>
              <Field label="No. of Guests" icon={<Users size={13} />} error={errors.guests}>
                <input type="number" min="1" placeholder="e.g. 200" value={form.guests} onChange={e => set('guests', e.target.value)} style={inputStyle(errors.guests)}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')} onBlur={e => (e.currentTarget.style.borderColor = errors.guests ? '#c0392b' : 'rgba(28,16,8,0.14)')} />
              </Field>
            </div>
          </div>

          {/* ── Delivery type ── */}
          <div>
            <SectionLabel icon={<Truck size={13} />} label="Delivery Preference" />
            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
              {[
                { value: 'venue',    label: 'At Restaurant / Pickup' },
                { value: 'doorstep', label: 'Doorstep Delivery' },
              ].map(opt => (
                <button key={opt.value} onClick={() => set('delivery', opt.value)} className="bulk-delivery-btn" style={{
                  flex: 1, height: '44px', padding: '0 12px', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                  borderRadius: '6px', transition: 'all 180ms',
                  border: form.delivery === opt.value ? '1.5px solid var(--color-copper)' : '1.5px solid rgba(28,16,8,0.14)',
                  background: form.delivery === opt.value ? 'rgba(201,150,62,0.1)' : '#FDFAF6',
                  color: form.delivery === opt.value ? 'var(--color-copper)' : 'var(--color-ink-muted)',
                }}>
                  {opt.label}
                </button>
              ))}
            </div>
            {form.delivery === 'doorstep' && (
              <Field label="Delivery Address" icon={<Home size={13} />} error={errors.address}>
                <input placeholder="Full delivery address with landmark" value={form.address} onChange={e => set('address', e.target.value)} style={inputStyle(errors.address)}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')} onBlur={e => (e.currentTarget.style.borderColor = errors.address ? '#c0392b' : 'rgba(28,16,8,0.14)')} />
              </Field>
            )}
          </div>

          {/* ── Menu Selection ── */}
          <div>
            <SectionLabel icon={<Package size={13} />} label="Select Menu Items" />
            <div style={{
              background: 'rgba(201,150,62,0.06)', border: '1px solid rgba(201,150,62,0.2)',
              borderRadius: '8px', padding: '4px 16px 0', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px', width: '100%', boxSizing: 'border-box',
            }}>
              <Star size={11} color="var(--color-copper)" />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-copper)', fontWeight: 600, margin: '10px 0', letterSpacing: '0.3px' }}>
                Priced per kg · Type any quantity or use +/− buttons
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {bulkMenu.map((cat, catIdx) => (
                <div key={cat.category} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(28,16,8,0.1)' }}>
                  <div className="bulk-cat-header" style={{ background: 'linear-gradient(135deg,#3D2A18,#52351E)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Star size={11} color="var(--color-gold)" strokeWidth={2} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      {cat.category}
                    </span>
                  </div>
                  <div className="bulk-cat-body" style={{ background: '#FFFCF8', padding: '0 16px' }}>
                    {cat.items.map(item => (
                      <QtyRow
                        key={item.name}
                        label={item.name}
                        price={item.price}
                        qty={qty(catIdx, item.name)}
                        onInc={() => inc(catIdx, item.name)}
                        onDec={() => dec(catIdx, item.name)}
                        onSet={v => setQty(catIdx, item.name, v)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Order Summary ── */}
          {selectedItems.length > 0 && (
            <div style={{ borderRadius: '8px', border: '1.5px solid rgba(201,150,62,0.35)', overflow: 'hidden' }}>
              <div style={{ background: 'rgba(201,150,62,0.1)', padding: '10px 16px', borderBottom: '1px solid rgba(201,150,62,0.2)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: 'var(--color-copper)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Order Summary
                </span>
              </div>
              <div style={{ padding: '12px 16px', background: '#FFFDF9' }}>
                {selectedItems.map(item => (
                  <div key={item.name + item.category} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(28,16,8,0.05)' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-ink)' }}>
                      {item.name} <span style={{ color: 'var(--color-ink-muted)', fontWeight: 400 }}>× {item.qty}kg</span>
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, color: 'var(--color-copper)' }}>
                      {fmt(item.qty * item.price)}
                    </span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', marginTop: '4px', borderTop: '1.5px solid rgba(201,150,62,0.25)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, color: 'var(--color-ink)' }}>Estimated Total</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--color-copper)', fontStyle: 'italic' }}>{fmt(grandTotal)}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(100,80,60,0.45)', margin: '6px 0 0' }}>
                  * Final price may vary. We'll confirm via WhatsApp.
                </p>
              </div>
            </div>
          )}

          {/* ── Notes ── */}
          <Field label="Special Instructions" icon={<MessageCircle size={13} />}>
            <textarea placeholder="Delivery time, venue details, specific requests, dietary requirements…" value={form.notes} onChange={e => set('notes', e.target.value)} rows={3}
              style={{ ...inputStyle(), height: 'auto', padding: '12px 14px', resize: 'none', lineHeight: 1.5, fontFamily: 'var(--font-body)', fontSize: '15px' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-copper)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(28,16,8,0.14)')} />
          </Field>

          {/* Trust row */}
          <div className="bulk-trust-badges" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', padding: '14px', borderRadius: '8px', background: 'rgba(201,150,62,0.06)', border: '1px solid rgba(201,150,62,0.18)' }}>
            {['No advance required', '50–5000+ guests', 'Doorstep delivery', 'Fresh & daily-made'].map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: 'var(--color-copper)', background: 'rgba(201,150,62,0.12)', borderRadius: '4px', padding: '4px 10px' }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="bulk-modal-footer" style={{ padding: '16px 28px 20px', borderTop: '1px solid rgba(28,16,8,0.08)', background: '#FFFDF9', flexShrink: 0 }}>
          {grandTotal > 0 && (
            <div className="bulk-footer-total" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '10px 14px', background: 'rgba(201,150,62,0.08)', borderRadius: '6px', border: '1px solid rgba(201,150,62,0.2)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-ink-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>ESTIMATED TOTAL</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--color-copper)', fontStyle: 'italic' }}>{fmt(grandTotal)}</span>
            </div>
          )}
          <button onClick={handleSubmit} style={{
            width: '100%', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            background: 'linear-gradient(135deg, #25D366 0%, #1DA851 100%)',
            color: '#fff', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 700,
            border: 'none', borderRadius: '8px', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(37,211,102,0.35)',
            transition: 'transform 150ms ease, box-shadow 150ms ease',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(37,211,102,0.45)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(37,211,102,0.35)' }}
          >
            <MessageCircle size={20} />
            Send Bulk Order via WhatsApp
          </button>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-ink-muted)', textAlign: 'center', margin: '10px 0 0' }}>
            All your selections will open pre-filled in WhatsApp — just hit Send.
          </p>
        </div>
      </div>

      <style>{`
        /* ── Mobile: full-width bottom sheet ── */
        @media (max-width: 640px) {
          .bulk-modal-panel {
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            transform: ${animIn ? 'translateY(0)' : 'translateY(100%)'} !important;
            width: 100% !important;
            max-height: 90dvh !important;
            border-radius: 18px 18px 0 0 !important;
            transition: opacity 350ms ease, transform 380ms cubic-bezier(0.16,1,0.3,1) !important;
          }

          /* Compact header */
          .bulk-modal-header {
            padding: 14px 16px 12px !important;
          }
          .bulk-modal-header-icon {
            width: 36px !important;
            height: 36px !important;
            border-radius: 8px !important;
          }
          .bulk-modal-header-icon svg {
            width: 17px !important;
            height: 17px !important;
          }
          .bulk-modal-header-eyebrow {
            font-size: 8.5px !important;
            margin-bottom: 3px !important;
          }
          .bulk-modal-header-title {
            font-size: 17px !important;
          }
          .bulk-modal-header-sub {
            font-size: 11px !important;
            margin-top: 8px !important;
          }

          /* Compact body */
          .bulk-modal-body {
            padding: 14px 14px 8px !important;
            gap: 16px !important;
          }

          /* Stack all two-col form grids */
          .bulk-two-col {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          /* Compact inputs */
          .bulk-modal-panel input,
          .bulk-modal-panel select {
            height: 42px !important;
            font-size: 14px !important;
            padding: 0 12px !important;
          }

          /* Delivery buttons */
          .bulk-delivery-btn {
            height: 38px !important;
            font-size: 12px !important;
            padding: 0 8px !important;
          }

          /* Shorter textarea */
          .bulk-modal-panel textarea {
            font-size: 14px !important;
            padding: 8px 12px !important;
            min-height: 50px !important;
          }

          /* Section labels smaller */
          .bulk-modal-panel .bulk-section-label {
            margin-bottom: 10px !important;
            padding-bottom: 8px !important;
          }
          .bulk-modal-panel .bulk-section-label span:last-child {
            font-size: 10px !important;
          }

          /* Menu category headers */
          .bulk-cat-header {
            padding: 8px 12px !important;
          }
          .bulk-cat-body {
            padding: 0 12px !important;
          }

          /* QtyRow text */
          .bulk-modal-panel .qty-row-label {
            font-size: 13px !important;
          }
          .bulk-modal-panel .qty-row-price {
            font-size: 10px !important;
          }
          .bulk-modal-panel .qty-row-add-btn {
            height: 32px !important;
            padding: 0 12px !important;
            font-size: 11px !important;
          }
          .bulk-modal-panel .qty-btn {
            width: 30px !important;
            height: 32px !important;
          }
          .bulk-modal-panel .qty-input {
            width: 46px !important;
            height: 32px !important;
            font-size: 12px !important;
          }

          /* Order summary */
          .bulk-order-summary {
            font-size: 12px !important;
          }
          .bulk-order-summary-total {
            font-size: 15px !important;
          }

          /* Hide trust badges */
          .bulk-trust-badges { display: none !important; }

          /* Compact footer */
          .bulk-modal-footer {
            padding: 10px 14px 16px !important;
          }
          .bulk-modal-footer button {
            height: 46px !important;
            font-size: 14px !important;
          }
          .bulk-modal-footer p {
            display: none !important;
          }
          .bulk-footer-total {
            margin-bottom: 8px !important;
            padding: 8px 12px !important;
          }
          .bulk-footer-total span:first-child {
            font-size: 10px !important;
          }
          .bulk-footer-total span:last-child {
            font-size: 17px !important;
          }

          /* Label text */
          .bulk-modal-panel label {
            font-size: 10px !important;
          }
        }
      `}</style>
    </>
  )
}

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid rgba(28,16,8,0.08)' }}>
      <span style={{ color: 'var(--color-copper)', display: 'flex' }}>{icon}</span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-ink)' }}>
        {label}
      </span>
    </div>
  )
}
