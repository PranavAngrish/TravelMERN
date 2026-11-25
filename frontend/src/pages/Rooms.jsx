import { RoomFeature } from '../components/RoomCard'
import Page from '../components/Page'
import { site } from '../lib/site'
import useSeo from '../lib/useSeo'

export default function Rooms() {
  const p = site.pages['/rooms']
  useSeo(p.title, p.description)
  return (
    <Page title="Rooms in Kasol" lede="Every room has a private balcony, a lounge area and a wardrobe. Pick a view and tell us your dates.">
      <div className="grid gap-16 pt-4 sm:gap-24">
        {site.rooms.map((r, i) => <RoomFeature key={r.slug} room={r} flip={i % 2 === 1} />)}
      </div>
    </Page>
  )
}
