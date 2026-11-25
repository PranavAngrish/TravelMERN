import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import Img from './Img'
import Lightbox from './Lightbox'

// Swipeable photo strip for a room (native scroll-snap, so touch feels natural).
// Arrows work on desktop; tap a photo to see it full size.
export default function RoomCarousel({ images, label }) {
  const track = useRef(null)
  const [i, setI] = useState(0)
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const el = track.current
    const onScroll = () => setI(Math.round(el.scrollLeft / el.clientWidth))
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const to = (n) => {
    const el = track.current
    const t = (n + images.length) % images.length
    el.scrollTo({ left: t * el.clientWidth, behavior: 'smooth' })
  }
  const arrow = 'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-soft transition hover:bg-white md:flex'

  return (
    <div className="relative">
      <ul ref={track} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto shape-tl bg-mist" aria-label={`${label} photos`}>
        {images.map((src, n) => (
          <li key={src} className="w-full flex-none snap-center" aria-label={`Photo ${n + 1} of ${images.length}`}>
            <button onClick={() => setOpen(n)} className="block w-full cursor-zoom-in" aria-label={`View photo ${n + 1} full size`}>
              <Img src={src} alt={`${label}, photo ${n + 1}`} priority={n === 0} sizes="(min-width: 1024px) 720px, 100vw" className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]" />
            </button>
          </li>
        ))}
      </ul>
      <button className={`${arrow} left-3`} onClick={() => to(i - 1)} aria-label="Previous photo"><ChevronLeft className="h-6 w-6" /></button>
      <button className={`${arrow} right-3`} onClick={() => to(i + 1)} aria-label="Next photo"><ChevronRight className="h-6 w-6" /></button>
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-navy/70 px-3 py-1 text-sm text-white tabular-nums">{i + 1} / {images.length}</div>
      <button onClick={() => setOpen(i)} className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-navy hover:bg-white">
        <Maximize2 className="h-4 w-4" aria-hidden="true" />Full size
      </button>
      {open !== null && <Lightbox images={images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} label={label} />}
    </div>
  )
}
