'use client'
import { MessageCircle, ShoppingBag, ExternalLink } from 'lucide-react'
import { useBookingModal } from '@/contexts/BookingModalContext'
import { useBulkOrderModal } from '@/contexts/BulkOrderModalContext'
import { restaurant } from '@/data/restaurant'

export default function ContactCTAs() {
  const { openModal: openBooking }   = useBookingModal()
  const { openModal: openBulkOrder } = useBulkOrderModal()

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <button 
        onClick={openBooking} 
        className="btn-primary"
        style={{ border: 'none', cursor: 'pointer' }}
      >
        <MessageCircle size={18} /> Book a Table
      </button>

      <button 
        onClick={openBulkOrder} 
        className="btn-primary"
        style={{ border: 'none', cursor: 'pointer', background: 'var(--color-navy)', color: 'var(--color-ivory)' }}
      >
        <ShoppingBag size={18} color="var(--color-gold)" /> Bulk Order
      </button>

      <a 
        href={restaurant.googleMapsUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn-secondary" 
        style={{ color: 'var(--color-navy)', borderColor: 'var(--color-navy)' }}
      >
        <ExternalLink size={16} /> Get Directions
      </a>
    </div>
  )
}
