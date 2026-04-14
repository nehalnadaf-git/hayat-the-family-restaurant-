'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'

interface BookingModalContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const BookingModalContext = createContext<BookingModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <BookingModalContext.Provider value={{
      isOpen,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }}>
      {children}
    </BookingModalContext.Provider>
  )
}

export function useBookingModal() {
  return useContext(BookingModalContext)
}
