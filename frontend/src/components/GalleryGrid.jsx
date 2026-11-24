import { useState } from 'react'
import Img from './Img'
import Lightbox from './Lightbox'

// A tidy mosaic: first photo is large, the rest are even tiles. Tap any photo to open the viewer.
// `limit` shows only the first N tiles; the last one says how many more there are.
export default function GalleryGrid({ images, limit, label = 'Mid Orchard Kasol photo' }) {
  const [open, setOpen] = useState(null)
  const shown = limit ? images.slice(0, limit) : images
  const hidden = images.length - shown.length

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {shown.map((src, i) => {
          const big = i === 0
          const last = hidden > 0 && i === shown.length - 1
          return (
            <li key={src} className={big ? 'col-span-2 md:relative md:row-span-2' : ''}>
              <button
                onClick={() => setOpen(i)}
                className={`group relative block w-full overflow-hidden rounded-xl bg-mist ${big ? 'md:absolute md:inset-0 md:h-full' : ''}`}
                aria-label={last ? `Open gallery, ${hidden} more photos` : `View photo ${i + 1} full size`}
              >
                <Img
                  src={src}
                  alt={`${label} ${i + 1}`}
                  sizes={big ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${big ? 'aspect-[16/10] md:aspect-auto md:h-full' : 'aspect-[4/3]'}`}
                />
                {last && (
                  <span className="absolute inset-0 flex items-center justify-center bg-navy/60 font-display text-2xl text-white">+{hidden} photos</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
      {open !== null && <Lightbox images={images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} label={label} />}
    </>
  )
}
