import GalleryGrid from '../components/GalleryGrid'
import Page from '../components/Page'
import { WhatsAppButton, EnquiryButton } from '../components/Cta'
import { site } from '../lib/site'
import useSeo from '../lib/useSeo'

export default function Gallery() {
  const p = site.pages['/gallery']
  useSeo(p.title, p.description)
  return (
    <Page title="Photo gallery" lede="Tap any photo to see it full size. Swipe or use the arrow keys to move between photos.">
      <GalleryGrid images={site.gallery} />
      <div className="mt-14 flex flex-wrap gap-3">
        <WhatsAppButton />
        <EnquiryButton variant="outline">Send enquiry</EnquiryButton>
      </div>
    </Page>
  )
}
