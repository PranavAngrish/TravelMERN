import { Link } from 'react-router-dom'
import Img from './Img'
import { EnquiryButton } from './Cta'

export default function RoomCard({ room }) {
  return (
    <article className="group flex flex-col">
      <Link to={`/rooms/${room.slug}`} className="block overflow-hidden rounded-2xl bg-mist" aria-label={`${room.name}, view details`}>
        <Img src={room.image} alt={`${room.name} with ${room.view.toLowerCase()} at Mid Orchard, Kasol`} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="text-2xl text-navy"><Link to={`/rooms/${room.slug}`}>{room.name}</Link></h3>
        <p className="mt-1 text-sm font-medium text-brand-deep">{room.view} · Private balcony</p>
        <p className="mt-3 flex-1 leading-relaxed text-ink/75">{room.summary}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to={`/rooms/${room.slug}`} className="btn-outline !px-5 !py-2.5">View room</Link>
          <EnquiryButton room={room.slug} className="!px-5 !py-2.5">Enquire</EnquiryButton>
        </div>
      </div>
    </article>
  )
}
