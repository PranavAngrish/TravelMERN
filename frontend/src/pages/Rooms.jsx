import RoomCard from '../components/RoomCard'
import { site } from '../lib/site'
import useSeo from '../lib/useSeo'

export default function Rooms() {
  const p = site.pages['/rooms']
  useSeo(p.title, p.description)
  return (
    <div className="container-page pb-20 pt-28 sm:pt-36">
      <h1 className="text-4xl text-navy sm:text-5xl">Rooms in Kasol</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/75">Every room has a private balcony, a lounge area and a wardrobe. Pick a view and tell us your dates.</p>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {site.rooms.map((r) => <RoomCard key={r.slug} room={r} />)}
      </div>
    </div>
  )
}
