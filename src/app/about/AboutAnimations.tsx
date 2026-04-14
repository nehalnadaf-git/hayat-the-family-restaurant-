'use client'
import { useEffect } from 'react'

export default function AboutAnimations() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('in-view')
        }),
      { threshold: 0.06 }
    )
    document.querySelectorAll('.about-fade-up').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
