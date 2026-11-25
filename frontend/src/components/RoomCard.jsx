import { Link } from 'react-router-dom'
import { Waves, Mountain, Images } from 'lucide-react'
import Img from './Img'
import { EnquiryButton } from './Cta'
import { site } from '../lib/site'

const ViewIcon = ({ view, className }) => (/river/i.test(view) ? <Waves className={className} aria-hidden="true" /> : <Mountain className={className} aria-hidden="true" />)

// Compact card: used for "other rooms" on a room page
export default function RoomCard({ room }) {
  return (
    <article className="group flex flex-col">
      <Link to={`/rooms/${room.slug}`} className="relative block overflow-hidden rounded-2xl bg-mist" aria-label={`${room.name}, view details`}>
        <Img src={room.image} alt={`${room.name} with ${room.view.toLowerCase()} at Mid Orchard, Kasol`} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-navy/80 px-3 py-1 text-sm text-white backdrop-blur"><ViewIcon view={room.view} className="h-4 w-4 text-brand" />{room.view}</span>
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="text-2xl text-navy"><Link to={`/rooms/${room.slug}`}>{room.name}</Link></h3>
        <p className="mt-2 flex-1 leading-relaxed text-ink/75">{room.summary}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to={`/rooms/${room.slug}`} className="btn-outline !px-5 !py-2.5">View room</Link>
          <EnquiryButton room={room.slug} className="!px-5 !py-2.5">Enquire</EnquiryButton>
        </div>
      </div>
    </article>
  )
}

// Large editorial row: big photo with the signature corner, details card overlapping it.
// `flip` swaps sides so a list of rooms alternates.
export function RoomFeature({ room, flip = false }) {
  return (
    <article className="group grid items-center lg:grid-cols-12">
      <Link
        to={`/rooms/${room.slug}`}
        aria-label={`${room.name}, view details`}
        className={`relative block overflow-hidden bg-mist lg:col-span-7 ${flip ? 'shape-tr lg:order-2' : 'shape-tl'}`}
      >
        <Img src={room.image} alt={`${room.name} with ${room.view.toLowerCase()} at Mid Orchard, Kasol`} sizes="(min-width: 1024px) 700px, 100vw" widths={[600, 900, 1200, 1600]} className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] lg:aspect-[16/11]" />
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-navy/80 px-3.5 py-1.5 text-sm text-white backdrop-blur"><Images className="h-4 w-4 text-brand" aria-hidden="true" />{room.images.length} photos</span>
      </Link>
      <div className={`relative z-10 -mt-10 mx-4 rounded-2xl bg-white p-7 shadow-lift sm:p-9 lg:col-span-5 lg:mx-0 lg:mt-0 ${flip ? 'lg:order-1 lg:-mr-14' : 'lg:-ml-14'}`}>
        <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-deep"><ViewIcon view={room.view} className="h-4 w-4" />{room.view}</p>
        <h3 className="mt-2 text-3xl text-navy sm:text-4xl"><Link to={`/rooms/${room.slug}`}>{room.name}</Link></h3>
        <p className="mt-3 leading-relaxed text-ink/75">{room.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Included in the room">
          {site.amenities.slice(0, 3).map((a) => <li key={a} className="rounded-full bg-foam px-3 py-1 text-sm text-navy">{a}</li>)}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to={`/rooms/${room.slug}`} className="btn-outline !px-5 !py-2.5">View room</Link>
          <EnquiryButton room={room.slug} className="!px-5 !py-2.5">Enquire</EnquiryButton>
        </div>
      </div>
    </article>
  )
}
