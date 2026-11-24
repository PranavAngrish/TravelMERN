import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X, Maximize, Minimize } from 'lucide-react'
import { cdn, srcSet } from '../lib/cdn'

// Full-screen photo viewer: arrows, keyboard (← → Esc), swipe, thumbnails, fullscreen.
export default function Lightbox({ images, index, onIndex, onClose, label = 'Photo' }) {
  const root = useRef(null)
  const closeBtn = useRef(null)
  const start = useRef(null)
  const dragged = useRef(false) // a drag must not count as a click on the backdrop
  const [fs, setFs] = useState(false)
  const count = images.length
  const canFs = typeof document !== 'undefined' && document.fullscreenEnabled

  const go = useCallback((d) => onIndex((index + d + count) % count), [index, count, onIndex])

  const close = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.()
    onClose()
  }, [onClose])

  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else root.current?.requestFullscreen?.()
  }

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Escape') close()
      else if (e.key === 'Tab') { // keep focus inside the viewer
        const f = root.current?.querySelectorAll('button')
        if (!f?.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, close])

  // lock page scroll, focus the close button, give focus back afterwards
  useEffect(() => {
    const opener = document.activeElement
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onFs = () => setFs(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('fullscreenchange', onFs)
      opener?.focus?.()
    }
  }, [])

  // warm the neighbours so next/previous feels instant
  useEffect(() => {
    ;[1, -1].forEach((d) => { new Image().src = cdn(images[(index + d + count) % count], 1600) })
  }, [index, images, count])

  // swipe
  const onDown = (e) => { start.current = { x: e.clientX, y: e.clientY } }
  const onUp = (e) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    start.current = null
    dragged.current = Math.abs(dx) > 10 || Math.abs(dy) > 10
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1)
  }

  const btn = 'flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25'

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-label={`${label} viewer`} className="lb-in on-dark fixed inset-0 z-[60] flex flex-col bg-black">
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <p className="text-sm tabular-nums" aria-live="polite">{index + 1} / {count}</p>
        <div className="flex gap-2">
          {canFs && (
            <button className={btn} onClick={toggleFs} aria-label={fs ? 'Exit full screen' : 'Full screen'}>
              {fs ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>
          )}
          <button ref={closeBtn} className={btn} onClick={close} aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (start.current = null)}
        onClick={(e) => {
          if (dragged.current) { dragged.current = false; return }
          if (e.target === e.currentTarget) close()
        }}
      >
        <button className={`${btn} absolute left-2 z-10 sm:left-4`} onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft className="h-6 w-6" /></button>
        <img
          key={index}
          src={cdn(images[index], 1600)}
          srcSet={srcSet(images[index], [800, 1200, 1600, 2400])}
          sizes="100vw"
          alt={`${label} ${index + 1} of ${count}`}
          draggable="false"
          className="lb-in max-h-full max-w-full select-none object-contain"
        />
        <button className={`${btn} absolute right-2 z-10 sm:right-4`} onClick={() => go(1)} aria-label="Next photo"><ChevronRight className="h-6 w-6" /></button>
      </div>

      <div className="no-scrollbar hidden gap-2 overflow-x-auto px-4 py-3 md:flex md:justify-center">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => onIndex(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            ref={(el) => i === index && el?.scrollIntoView({ block: 'nearest', inline: 'center' })}
            className={`h-14 w-20 flex-none overflow-hidden rounded transition-opacity ${i === index ? 'opacity-100 ring-2 ring-brand' : 'opacity-50 hover:opacity-80'}`}
          >
            <img src={cdn(src, 160)} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
