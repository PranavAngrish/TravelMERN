import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Waves, Mountain, Leaf, Car, MapPin, Star, Minus, Plus } from 'lucide-react'
import Img from '../components/Img'
import GalleryGrid from '../components/GalleryGrid'
import { RoomFeature } from '../components/RoomCard'
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

const facts = [
  { big: '3 km', small: 'from the Kasol market' },
  { big: '3', small: 'room types, all with balconies' },
  { big: '100%', small: 'pure vegetarian' },
]

const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
const addDays = (s, n) => { const d = new Date(`${s}T00:00:00`); d.setDate(d.getDate() + n); return iso(d) }

// Dates and guests carry over to the enquiry form, so the visitor doesn't type them twice
function BookingBar() {
  const navigate = useNavigate()
  const today = iso(new Date())
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  const onCheckIn = (e) => {
    const v = e.target.value
    setCheckIn(v)
    if (v && (!checkOut || checkOut <= v)) setCheckOut(addDays(v, 1))
  }
  const submit = (e) => {
    e.preventDefault()
    const q = new URLSearchParams({ guests: String(guests) })
    if (checkIn) q.set('checkIn', checkIn)
    if (checkOut) q.set('checkOut', checkOut)
    navigate(`/enquiry?${q}`)
  }
  const label = 'mb-1.5 block text-sm font-medium text-ink/70'
  const input = 'w-full rounded-xl border border-navy/15 bg-mist px-3.5 py-3 text-base text-ink transition focus:border-brand-deep focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/25'

  return (
    <form onSubmit={submit} aria-label="Check dates" className="shape-tl ml-auto grid gap-4 bg-white p-5 shadow-lift sm:grid-cols-2 sm:p-7 sm:pl-10 lg:max-w-4xl lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end lg:gap-5 lg:p-8 lg:pl-16">
      <div>
        <label className={label} htmlFor="bb-in">Check-in</label>
        <input id="bb-in" type="date" min={today} value={checkIn} onChange={onCheckIn} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="bb-out">Check-out</label>
        <input id="bb-out" type="date" min={checkIn ? addDays(checkIn, 1) : addDays(today, 1)} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={input} />
      </div>
      <div>
        <span className={label} id="bb-guests">Guests</span>
        <div role="group" aria-labelledby="bb-guests" className="flex items-center justify-between gap-3 rounded-xl border border-navy/15 bg-mist px-2 py-1.5">
          <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label="Fewer guests" className="rounded-lg p-2 text-navy transition hover:bg-white"><Minus className="h-4 w-4" /></button>
          <span className="min-w-[2ch] text-center font-semibold tabular-nums text-navy" aria-live="polite">{guests}</span>
          <button type="button" onClick={() => setGuests((g) => Math.min(20, g + 1))} aria-label="More guests" className="rounded-lg p-2 text-navy transition hover:bg-white"><Plus className="h-4 w-4" /></button>
        </div>
      </div>
      <button className="btn-primary sm:col-span-2 lg:col-span-1">Check dates</button>
    </form>
  )
}

function Stars({ n }) {
  return (
    <span className="inline-flex gap-0.5 text-brand-deep" role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`h-4 w-4 ${i <= n ? 'fill-current' : 'opacity-30'}`} aria-hidden="true" />)}
    </span>
  )
}

export default function Home() {
  const p = site.pages['/']
  useSeo(p.title, p.description)
  const [featured, ...others] = [people.reviews[3], people.reviews[0], people.reviews[1], people.reviews[2]].filter(Boolean)
  return (
    <>
      <div>
        <section className="on-dark relative flex min-h-[92svh] items-end overflow-hidden bg-navy">
          <Img src={site.hero} alt="Mid Orchard hotel in Kasol with mountain and river views" priority sizes="100vw" widths={[800, 1200, 1600, 2000]} className="settle absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent" />
          <div className="container-page relative pb-32 pt-36 sm:pb-40">
            <p className="rise inline-flex items-center gap-2 text-sm text-white/85" style={{ animationDelay: '.15s' }}>
              <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />Kasol, Parvati Valley, Himachal Pradesh
            </p>
            <h1 className="rise mt-4 max-w-3xl text-balance text-[2.6rem] leading-[1.04] text-white sm:text-6xl lg:text-7xl" style={{ animationDelay: '.3s' }}>A pure vegetarian riverside stay in Kasol</h1>
            <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-white/85" style={{ animationDelay: '.5s' }}>Rooms with private balconies, mountain and river views, an in-house restaurant and parking, in the heart of Parvati Valley.</p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '.7s' }}>
              <WhatsAppButton />
              <EnquiryButton variant="outline-light">Send enquiry</EnquiryButton>
            </div>
          </div>
        </section>
        <div className="container-page relative z-10 -mt-20 sm:-mt-24"><BookingBar /></div>
      </div>

      {/* Welcome */}
      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <h2 className="max-w-xl text-balance text-3xl text-navy sm:text-5xl sm:leading-[1.1]">A quiet corner of Kasol, away from the market</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">Mid Orchard sits by the Parvati river, about 3 km from the busy market. Step onto your own balcony for mountain or river views, then sit down to fresh vegetarian food in our restaurant.</p>
            <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-navy/15 border-y border-navy/15">
              {facts.map((f) => (
                <div key={f.big} className="px-4 py-5 first:pl-0 sm:px-6">
                  <dt className="font-display text-3xl text-brand-deep sm:text-4xl">{f.big}</dt>
                  <dd className="mt-1 text-sm leading-snug text-ink/70">{f.small}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/about" className="btn-outline">About Mid Orchard</Link>
              <Link to="/rooms" className="btn-primary">See the rooms</Link>
            </div>
          </div>
          <div className="relative pb-10 pr-6 sm:pb-14 sm:pr-12">
            <Img src={site.gallery[1] || site.hero} alt="Mid Orchard hotel, Kasol" sizes="(min-width: 1024px) 520px, 90vw" widths={[500, 800, 1100]} className="shape-tl aspect-[4/5] w-full object-cover shadow-lift" />
            <Img src={site.gallery[4] || site.hero} alt="A corner of Mid Orchard, Kasol" sizes="(min-width: 1024px) 260px, 45vw" widths={[300, 500, 700]} className="absolute bottom-0 right-0 aspect-square w-[46%] rounded-2xl border-[6px] border-white object-cover shadow-lift" />
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="section bg-mist pt-16 sm:pt-24">
        <div className="container-page">
          <div className="mb-12 max-w-2xl sm:mb-16">
            <h2 className="text-3xl text-navy sm:text-5xl">Choose your room</h2>
            <p className="mt-4 text-lg text-ink/75">Three room types, each with a private balcony, a lounge area and a wardrobe.</p>
          </div>
          <div className="grid gap-16 sm:gap-24">
            {site.rooms.map((r, i) => <RoomFeature key={r.slug} room={r} flip={i % 2 === 1} />)}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
            <h2 className="text-3xl text-navy sm:text-5xl">Around the property</h2>
            <Link to="/gallery" className="btn-outline !py-2.5">View all photos</Link>
          </div>
          <GalleryGrid images={site.gallery} limit={5} />
        </div>
      </section>

      {/* Why */}
      <section className="on-dark relative overflow-hidden bg-navy py-20 text-white sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <h2 className="text-balance text-3xl sm:text-5xl sm:leading-[1.1]">Why guests choose Mid Orchard</h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/75">A calm base for the Parvati Valley, with everything you need close by.</p>
            <EnquiryButton variant="brand" className="mt-8">Send enquiry</EnquiryButton>
          </div>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t border-white/15 pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand/40 bg-brand/10"><Icon className="h-5 w-5 text-brand" aria-hidden="true" /></span>
                <h3 className="mt-5 text-xl">{title}</h3>
                <p className="mt-2 leading-relaxed text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section bg-mist">
        <div className="container-page">
          <h2 className="text-3xl text-navy sm:text-5xl">What guests say</h2>
          <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            {featured && (
              <figure className="shape-tl relative bg-white p-7 shadow-soft sm:p-12 sm:pl-16">
                <span aria-hidden="true" className="absolute right-6 top-2 font-display text-[7rem] leading-none text-brand/25 sm:right-10 sm:text-[10rem]">&rdquo;</span>
                <Stars n={featured.rating} />
                <blockquote className="relative mt-5 font-display text-xl leading-relaxed text-navy sm:text-2xl sm:leading-[1.5]">{featured.text}</blockquote>
                <figcaption className="mt-6 text-ink/70"><span className="font-semibold text-navy">{featured.name}</span>, {featured.location}</figcaption>
              </figure>
            )}
            <div className="grid content-start gap-6">
              {others.map((r) => (
                <figure key={r.name} className="border-l-2 border-brand pl-5">
                  <Stars n={r.rating} />
                  <blockquote className="mt-2 leading-relaxed text-ink/85">{r.text}</blockquote>
                  <figcaption className="mt-2 text-sm text-ink/65">{r.name}, {r.location}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="pt-16 sm:pt-24">
        <div className="container-page">
          <div className="on-dark shape-tl relative isolate overflow-hidden bg-navy px-6 py-14 sm:px-14 sm:py-20">
            <Img src={site.hero} alt="" aria-hidden="true" sizes="1000px" widths={[800, 1200, 1600]} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
            <h2 className="max-w-xl text-balance text-3xl text-white sm:text-5xl sm:leading-[1.1]">Planning a stay in Kasol?</h2>
            <p className="mt-5 max-w-xl text-lg text-white/80">Message us on WhatsApp for the quickest reply, or send an enquiry with your dates and we'll get back to you.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton />
              <EnquiryButton variant="outline-light">Send enquiry</EnquiryButton>
            </div>
          </div>
        </div>
        <div className="h-16 bg-white sm:h-24" />
      </section>
    </>
  )
}
