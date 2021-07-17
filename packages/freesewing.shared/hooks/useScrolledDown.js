import { useLayoutEffect } from 'react'

export default function useScrolledDown(effect) {
  const offset = 100 // Pixels to scroll before we condired scrolled to be true
  const throttle = 500 // Millisecond to throttle callback to avoid perf issues

  let throttleTimeout = null

  const callBack = () => {
    if (typeof window === 'undefined') effect(false)
    effect(window.scrollY > offset ? true : false)
    throttleTimeout = null
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(callBack, throttle)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })
}
