'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share, Smartphone } from 'lucide-react'

// The BeforeInstallPromptEvent is not in standard TypeScript DOM types
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISSED_KEY = 'hayat_pwa_install_dismissed'

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if user already dismissed
    const wasDismissed = localStorage.getItem(DISMISSED_KEY)
    if (wasDismissed) return

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream
    setIsIOS(isIOSDevice)

    // Handle Android/Chrome install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Delay showing the banner by 3 seconds to not interrupt initial load
      setTimeout(() => setShowBanner(true), 3000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Show iOS banner after 3 seconds delay
    if (isIOSDevice) {
      setTimeout(() => setShowBanner(true), 3000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowBanner(false)
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem(DISMISSED_KEY, 'true')
  }

  if (isInstalled) return null
  // Only show on mobile (banner targets app install on phones)
  // Desktop install is handled by the browser chrome

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            zIndex: 9999,
            borderRadius: '1rem',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1a0800 0%, #2d1200 50%, #1a0800 100%)',
            border: '1px solid rgba(212, 160, 23, 0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,160,23,0.1)',
          }}
        >
          {/* Gold shimmer top border */}
          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #d4a017, #f0c040, #d4a017, transparent)',
          }} />

          <div style={{ padding: '1rem 1rem 1rem 1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              {/* Icon */}
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #d4a017, #f0c040)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Smartphone size={20} color="#1a0800" strokeWidth={2} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#f0c040',
                  letterSpacing: '0.01em',
                  fontFamily: 'var(--font-display)',
                }}>
                  Install Hayat App
                </p>
                <p style={{
                  margin: '0.2rem 0 0',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.4,
                  fontFamily: 'var(--font-body)',
                }}>
                  {isIOS
                    ? 'Tap the Share button below, then "Add to Home Screen"'
                    : 'Add to your home screen for instant menu access & offline browsing'}
                </p>

                {/* iOS share hint */}
                {isIOS && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginTop: '0.5rem',
                    padding: '0.35rem 0.6rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(212,160,23,0.1)',
                    border: '1px solid rgba(212,160,23,0.2)',
                    width: 'fit-content',
                  }}>
                    <Share size={14} color="#d4a017" />
                    <span style={{ fontSize: '0.7rem', color: '#d4a017', fontWeight: 600 }}>
                      Share → Add to Home Screen
                    </span>
                  </div>
                )}
              </div>

              {/* Dismiss */}
              <button
                onClick={handleDismiss}
                aria-label="Dismiss install banner"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Install button — Android/Chrome only */}
            {!isIOS && deferredPrompt && (
              <button
                id="pwa-install-btn"
                onClick={handleInstall}
                style={{
                  marginTop: '0.75rem',
                  width: '100%',
                  padding: '0.625rem 1rem',
                  background: 'linear-gradient(135deg, #d4a017, #f0c040)',
                  border: 'none',
                  borderRadius: '0.625rem',
                  color: '#1a0800',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <Download size={15} />
                Install App — Free
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
