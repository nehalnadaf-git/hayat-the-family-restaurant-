'use client'

export default function OfflinePage() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #0d0500 0%, #1a0800 50%, #0d0500 100%)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Gold top glow */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #d4a017, transparent)',
      }} />

      {/* Logo / Icon */}
      <div style={{
        width: '5rem',
        height: '5rem',
        borderRadius: '1.5rem',
        background: 'linear-gradient(135deg, #d4a017 0%, #f0c040 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        boxShadow: '0 0 60px rgba(212, 160, 23, 0.4)',
        fontSize: '2.25rem',
      }}>
        🍽️
      </div>

      {/* Heading */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
        fontWeight: 700,
        color: '#f0c040',
        margin: 0,
        letterSpacing: '0.01em',
        lineHeight: 1.2,
      }}>
        You&apos;re Offline
      </h1>

      {/* Subtitle */}
      <p style={{
        marginTop: '0.75rem',
        fontSize: 'clamp(0.9rem, 3vw, 1rem)',
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.6,
        maxWidth: '22rem',
      }}>
        No internet connection right now. But you can still reach us!
      </p>

      {/* Divider */}
      <div style={{
        width: '4rem',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.5), transparent)',
        margin: '1.5rem auto',
      }} />

      {/* Contact card */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(212,160,23,0.2)',
        borderRadius: '1rem',
        padding: '1.25rem 2rem',
        marginBottom: '1.5rem',
        minWidth: '16rem',
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.5rem',
        }}>
          Call us directly
        </p>
        <a
          href="tel:+919740271679"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#f0c040',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          +91 97402 71679
        </a>
        <p style={{
          margin: '0.4rem 0 0',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.35)',
        }}>
          Open daily 11 AM – 11 PM
        </p>
      </div>

      {/* Retry button */}
      <button
        id="offline-retry-btn"
        onClick={() => window.location.reload()}
        style={{
          padding: '0.75rem 2rem',
          background: 'linear-gradient(135deg, #d4a017, #f0c040)',
          border: 'none',
          borderRadius: '0.625rem',
          color: '#1a0800',
          fontSize: '0.875rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>

      {/* Bottom gold glow */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.3), transparent)',
      }} />
    </main>
  )
}
