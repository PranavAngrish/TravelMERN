import { useEffect, useRef, useState } from 'react'
import { snowWanted } from '../lib/snowSeason'

// Gentle falling snow over the whole site during the winter season (see lib/snowSeason.js).
// One lightweight canvas, no clicks blocked, paused when the tab is hidden, and skipped
// completely for visitors who have asked their device for reduced motion.
export default function Snow() {
  const [on, setOn] = useState(false)
  const canvas = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    setOn(snowWanted() && !reduce)
  }, [])

  useEffect(() => {
    if (!on) return undefined
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    let w = 0
    let h = 0
    let flakes = []
    let raf = 0
    let last = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const make = (initial) => {
      const depth = Math.random() // 0 = far, 1 = near
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : -10,
        r: 1.2 + depth * 3.2,
        v: 22 + depth * 55,           // fall speed, px per second
        sway: 8 + Math.random() * 22, // sideways drift
        ph: Math.random() * Math.PI * 2,
        a: 0.55 + depth * 0.4,
      }
    }
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      cv.width = w * dpr
      cv.height = h * dpr
      cv.style.width = `${w}px`
      cv.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(130, Math.max(36, w / 11)))
      flakes = Array.from({ length: n }, () => make(true))
    }
    const draw = (t) => {
      raf = requestAnimationFrame(draw)
      const dt = Math.min((t - last) / 1000 || 0.016, 0.05)
      last = t
      ctx.clearRect(0, 0, w, h)
      for (const f of flakes) {
        f.y += f.v * dt
        const x = f.x + Math.sin(t / 1600 + f.ph) * f.sway
        if (f.y > h + 10) Object.assign(f, make(false))
        // white core with a faint cool edge so flakes also show up on white sections
        const g = ctx.createRadialGradient(x, f.y, 0, x, f.y, f.r)
        g.addColorStop(0, `rgba(255,255,255,${f.a})`)
        g.addColorStop(0.65, `rgba(255,255,255,${f.a})`)
        g.addColorStop(1, `rgba(150,196,214,${f.a * 0.75})`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(draw) }
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [on])

  if (!on) return null
  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[45]" />
}
