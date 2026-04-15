'use client'
import { useEffect, useRef, useCallback } from 'react'

interface UseScrollAnimationOptions {
  /** CSS selector for animated children. Defaults to '[data-animate], .fade-up' */
  selector?: string
  /** IntersectionObserver threshold. Defaults to 0 */
  threshold?: number
  /** Root margin. Defaults to '0px 0px -48px 0px' for slightly early triggers */
  rootMargin?: string
  /** Whether to unobserve after first animation (defaults to true for perf) */
  once?: boolean
}

/**
 * Premium scroll animation hook.
 * Attach the returned ref to the container element.
 * All children matching `selector` will animate in when they enter the viewport.
 *
 * Usage:
 *   const ref = useScrollAnimation()
 *   <section ref={ref}>
 *     <div data-animate="fade-up" data-delay="100">...</div>
 *     <div data-animate="blur-up" data-delay="200">...</div>
 *   </section>
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    selector    = '[data-animate], .fade-up',
    threshold   = 0,
    rootMargin  = '0px 0px -48px 0px',
    once        = true,
  } = options

  const containerRef = useRef<HTMLElement | null>(null)

  const observe = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('in-view')
          }
        })
      },
      { threshold, rootMargin }
    )

    const els = container.querySelectorAll<HTMLElement>(selector)
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector, threshold, rootMargin, once])

  useEffect(() => {
    const cleanup = observe()
    return cleanup
  }, [observe])

  return containerRef as React.RefObject<HTMLElement>
}

/**
 * Lightweight version for a single element reference.
 */
export function useElementAnimation(options: Omit<UseScrollAnimationOptions, 'selector'> = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -48px 0px', once = true } = options
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          if (once) observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return elementRef as React.RefObject<HTMLElement>
}
