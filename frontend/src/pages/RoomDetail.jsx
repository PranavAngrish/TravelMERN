import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import RoomCarousel from '../components/RoomCarousel'
import RoomCard from '../components/RoomCard'
import Page from '../components/Page'
import { WhatsAppButton, EnquiryButton } from '../components/Cta'
import { site, getRoom } from '../lib/site'
import useSeo from '../lib/useSeo'
import NotFound from './NotFound'

export default function RoomDetail() {
  const room = getRoom(useParams().slug)
  useSeo(room && `${room.name} with ${room.view} in Kasol | Mid Orchard`, room?.summary)
  if (!room) return <NotFound />
  const msg = `Hello Mid Orchard, I'd like to enquire about the ${room.name}.`
  return (
    <Page
      title={room.name}
      lede={`${room.view} · Private balcony`}
      crumb={(
        <nav aria-label="Breadcrumb">
          <Link to="/rooms" className="link-u hover:text-white">Rooms</Link> / <span aria-current="page" className="text-white">{room.name}</span>
        </nav>
      )}
    >
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <div>
          <RoomCarousel images={room.images} label={`${room.name} at Mid Orchard`} />
          <h2 className="mt-12 text-2xl text-navy sm:text-3xl">About this room</h2>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink/80">{room.description}</p>
          <h2 className="mt-12 text-2xl text-navy sm:text-3xl">What's included</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {site.amenities.map((a) => (
              <li key={a} className="flex items-center gap-3"><span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-foam"><Check className="h-4 w-4 text-brand-deep" aria-hidden="true" /></span>{a}</li>
            ))}
          </ul>
        </div>

        <aside className="on-dark h-fit rounded-2xl bg-navy p-7 text-white shadow-lift sm:p-8 lg:sticky lg:top-28">
          <h2 className="text-2xl">Interested in this room?</h2>
          <p className="mt-3 leading-relaxed text-white/75">Tell us your dates and group size and we'll confirm availability.</p>
          <div className="mt-6 grid gap-3">
            <WhatsAppButton text={msg} />
            <EnquiryButton room={room.slug} variant="brand">Send enquiry</EnquiryButton>
          </div>
        </aside>
      </div>

      <h2 className="mb-8 mt-20 text-3xl text-navy sm:text-4xl">Other rooms</h2>
      <div className="grid gap-10 md:grid-cols-2">
        {site.rooms.filter((r) => r.slug !== room.slug).map((r) => <RoomCard key={r.slug} room={r} />)}
      </div>
    </Page>
  )
}
