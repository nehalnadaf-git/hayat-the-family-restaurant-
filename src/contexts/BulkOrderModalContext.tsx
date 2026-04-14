'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'

interface BulkOrderModalContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const BulkOrderModalContext = createContext<BulkOrderModalContextType>({
  isOpen: false, openModal: () => {}, closeModal: () => {},
})

export function BulkOrderModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <BulkOrderModalContext.Provider value={{
      isOpen,
      openModal:  () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }}>
      {children}
    </BulkOrderModalContext.Provider>
  )
}

export function useBulkOrderModal() {
  return useContext(BulkOrderModalContext)
}
