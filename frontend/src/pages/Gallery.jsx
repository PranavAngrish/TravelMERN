import GalleryGrid from '../components/GalleryGrid'
import { WhatsAppButton, EnquiryButton } from '../components/Cta'
import { site } from '../lib/site'
import useSeo from '../lib/useSeo'

export default function Gallery() {
  const p = site.pages['/gallery']
  useSeo(p.title, p.description)
  return (
    <div className="container-page pb-20 pt-28 sm:pt-36">
      <h1 className="text-4xl text-navy sm:text-5xl">Photo gallery</h1>
      <p className="mb-10 mt-4 max-w-2xl text-lg text-ink/75">Tap any photo to see it full size. Swipe or use the arrow keys to move between photos.</p>
      <GalleryGrid images={site.gallery} />
      <div className="mt-14 flex flex-wrap gap-3">
        <WhatsAppButton />
        <EnquiryButton variant="outline">Send enquiry</EnquiryButton>
      </div>
    </div>
  )
}
