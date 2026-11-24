import { Link } from 'react-router-dom'
import { Waves, Mountain, Leaf, Car } from 'lucide-react'
import Img from '../components/Img'
import GalleryGrid from '../components/GalleryGrid'
import RoomCard from '../components/RoomCard'
import { WhatsAppButton, EnquiryButton } from '../components/Cta'
import { site } from '../lib/site'
import people from '../../../shared/people.json'
import useSeo from '../lib/useSeo'

const features = [
  { icon: Waves, title: 'On the Parvati river', text: 'Wake up to the sound of the river, a short way from the market and away from the crowd.' },
  { icon: Leaf, title: 'Pure vegetarian kitchen', text: 'Our restaurant serves fresh vegetarian food, the only pure veg hotel in Kasol.' },
  { icon: Mountain, title: 'Private balconies', text: 'Every room opens to a balcony with mountain or river views.' },
  { icon: Car, title: 'Parking and WiFi', text: 'Secure on-site parking and high-speed WiFi for a comfortable stay.' },
]

export default function Home() {
  const p = site.pages['/']
  useSeo(p.title, p.description)
  return (
    <>
      <section className="on-dark relative flex min-h-[88svh] items-end bg-navy">
        <Img src={site.hero} alt="Mid Orchard hotel in Kasol with mountain and river views" priority sizes="100vw" widths={[800, 1200, 1600, 2000]} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
        <div className="container-page relative pb-14 pt-32 sm:pb-20">
          <h1 className="max-w-3xl text-4xl leading-[1.08] text-white sm:text-6xl">A pure vegetarian riverside stay in Kasol</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">Rooms with private balconies, mountain and river views, an in-house restaurant and parking, in the heart of Parvati Valley.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton />
            <EnquiryButton variant="light">Send enquiry</EnquiryButton>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="text-3xl text-navy sm:text-4xl">Choose your room</h2>
          <p className="mt-3 max-w-xl text-ink/75">Three room types, each with a private balcony.</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {site.rooms.map((r) => <RoomCard key={r.slug} room={r} />)}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl text-navy sm:text-4xl">Around the property</h2>
            <Link to="/gallery" className="btn-outline !py-2.5">View all photos</Link>
          </div>
          <GalleryGrid images={site.gallery} limit={5} />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="max-w-2xl text-3xl text-navy sm:text-4xl">Why guests choose Mid Orchard</h2>
          <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t border-navy/15 pt-5">
                <Icon className="h-6 w-6 text-brand-deep" aria-hidden="true" />
                <h3 className="mt-4 text-xl text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink/75">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-page">
          <h2 className="text-3xl text-navy sm:text-4xl">What guests say</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {people.reviews.map((r) => (
              <figure key={r.name} className="border-l-2 border-brand pl-6">
                <p className="text-sm font-medium text-brand-deep" aria-label={`${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
                <blockquote className="mt-2 leading-relaxed text-ink/85">{r.text}</blockquote>
                <figcaption className="mt-3 text-sm text-ink/65">{r.name}, {r.location}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark bg-navy py-16 text-center sm:py-20">
        <div className="container-page">
          <h2 className="text-3xl text-white sm:text-4xl">Planning a stay in Kasol?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Message us on WhatsApp for the quickest reply, or send an enquiry with your dates and we'll get back to you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton />
            <EnquiryButton variant="light">Send enquiry</EnquiryButton>
          </div>
        </div>
      </section>
    </>
  )
}
