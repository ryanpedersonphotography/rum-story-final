import { useEffect, useRef, RefObject } from 'react'

export function useRevealOnScroll(ref: RefObject<HTMLElement>, threshold = 0.1) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          element.classList.add('is-visible')
          observer.unobserve(element) // Only reveal once
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before bottom
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold])
}
