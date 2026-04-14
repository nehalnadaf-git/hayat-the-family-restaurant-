'use client'
import { MessageCircle } from 'lucide-react'
import { useBookingModal } from '@/contexts/BookingModalContext'

export default function AboutBookingCTA() {
  const { openModal } = useBookingModal()
  return (
    <button
      onClick={openModal}
      className="btn-primary"
      style={{ border: 'none', cursor: 'pointer' }}
    >
      <MessageCircle size={18} /> Book a Table
    </button>
  )
}
