import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import RoomCarousel from '../components/RoomCarousel'
import RoomCard from '../components/RoomCard'
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
    <div className="container-page pb-20 pt-24 sm:pt-32">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink/65">
        <Link to="/rooms" className="hover:text-navy">Rooms</Link> / <span aria-current="page">{room.name}</span>
      </nav>
      <h1 className="text-4xl text-navy sm:text-5xl">{room.name}</h1>
      <p className="mt-2 text-lg text-brand-deep">{room.view} · Private balcony</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <RoomCarousel images={room.images} label={`${room.name} at Mid Orchard`} />
          <h2 className="mt-10 text-2xl text-navy">About this room</h2>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink/80">{room.description}</p>
          <h2 className="mt-10 text-2xl text-navy">What's included</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {site.amenities.map((a) => (
              <li key={a} className="flex items-center gap-3"><Check className="h-5 w-5 text-brand-deep" aria-hidden="true" />{a}</li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-2xl bg-mist p-6 lg:sticky lg:top-28">
          <h2 className="text-2xl text-navy">Interested in this room?</h2>
          <p className="mt-2 leading-relaxed text-ink/75">Tell us your dates and group size and we'll confirm availability.</p>
          <div className="mt-6 grid gap-3">
            <WhatsAppButton text={msg} />
            <EnquiryButton room={room.slug}>Send enquiry</EnquiryButton>
          </div>
        </aside>
      </div>

      <h2 className="mb-8 mt-20 text-3xl text-navy">Other rooms</h2>
      <div className="grid gap-10 md:grid-cols-2">
        {site.rooms.filter((r) => r.slug !== room.slug).map((r) => <RoomCard key={r.slug} room={r} />)}
      </div>
    </div>
  )
}
