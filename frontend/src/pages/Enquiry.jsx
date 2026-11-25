import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api/axios'
import { site, getRoom, waLink } from '../lib/site'
import { WhatsAppButton } from '../components/Cta'
import Page from '../components/Page'
import useSeo from '../lib/useSeo'

const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
const addDays = (s, n) => { const d = new Date(`${s}T00:00:00`); d.setDate(d.getDate() + n); return iso(d) }

export default function Enquiry() {
  const p = site.pages['/enquiry']
  useSeo(p.title, p.description)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const today = iso(new Date())
  // The home page booking bar passes dates and guests along; accept only sensible values
  const dateParam = (k) => { const v = params.get(k); return /^\d{4}-\d{2}-\d{2}$/.test(v || '') && v >= today ? v : '' }
  const preIn = dateParam('checkIn')
  const preOut = dateParam('checkOut')
  const preGuests = Number(params.get('guests'))
  const [f, setF] = useState({
    name: '', phone: '', email: '',
    room: getRoom(params.get('room')) ? params.get('room') : '',
    checkIn: preIn, checkOut: preIn && preOut > preIn ? preOut : preIn ? addDays(preIn, 1) : '',
    guests: preGuests >= 1 && preGuests <= 20 ? String(Math.floor(preGuests)) : '2', message: '', website: '',
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }))
  const roomName = getRoom(f.room)?.name

  const onCheckIn = (e) => {
    const checkIn = e.target.value
    setF((v) => ({ ...v, checkIn, checkOut: !v.checkOut || v.checkOut <= checkIn ? addDays(checkIn, 1) : v.checkOut }))
  }

  const waText = `Hello Mid Orchard, I'd like to enquire${roomName ? ` about the ${roomName}` : ''}${f.checkIn && f.checkOut ? ` from ${f.checkIn} to ${f.checkOut}` : ''} for ${f.guests || '2'} guest(s).${f.name ? ` My name is ${f.name}.` : ''}`

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await api.post('/enquiry', f)
      navigate('/thank-you', { state: { name: f.name, room: roomName, waText } })
    } catch (err) {
      setError(err.response?.data?.message || "We couldn't send your enquiry. Please message us on WhatsApp instead.")
      setBusy(false)
    }
  }

  const label = 'mb-1.5 block text-sm font-medium text-navy'
  return (
    <Page title="Send an enquiry" lede="Tell us your dates and group size. We'll get back to you on the number you give us.">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
            <div><label className={label} htmlFor="name">Your name</label><input id="name" className="field" required minLength={2} maxLength={80} autoComplete="name" value={f.name} onChange={set('name')} /></div>
            <div><label className={label} htmlFor="phone">Phone / WhatsApp</label><input id="phone" className="field" required type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9 +\(\)\-]{8,20}" value={f.phone} onChange={set('phone')} placeholder="+91 98765 43210" /></div>
            <div className="sm:col-span-2"><label className={label} htmlFor="email">Email <span className="font-normal text-ink/55">(optional)</span></label><input id="email" className="field" type="email" autoComplete="email" maxLength={254} value={f.email} onChange={set('email')} /></div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="room">Room</label>
              <select id="room" className="field" value={f.room} onChange={set('room')}>
                <option value="">Not sure yet</option>
                {site.rooms.map((r) => <option key={r.slug} value={r.slug}>{r.name} ({r.view.toLowerCase()})</option>)}
              </select>
            </div>
            <div><label className={label} htmlFor="in">Check-in</label><input id="in" className="field" type="date" required min={today} value={f.checkIn} onChange={onCheckIn} /></div>
            <div><label className={label} htmlFor="out">Check-out</label><input id="out" className="field" type="date" required min={f.checkIn ? addDays(f.checkIn, 1) : addDays(today, 1)} value={f.checkOut} onChange={set('checkOut')} /></div>
            <div><label className={label} htmlFor="guests">Guests</label><input id="guests" className="field" type="number" required min="1" max="20" inputMode="numeric" value={f.guests} onChange={set('guests')} /></div>
            <div className="sm:col-span-2"><label className={label} htmlFor="msg">Message <span className="font-normal text-ink/55">(optional)</span></label><textarea id="msg" className="field" rows="3" maxLength={600} value={f.message} onChange={set('message')} /></div>

            {/* Spam trap: hidden from people, bots tend to fill it */}
            <div aria-hidden="true" className="absolute -left-[9999px]"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></label></div>

            <div className="sm:col-span-2">
              {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-red-800">{error}</p>}
              <p className="mb-4 text-sm text-ink/65">By sending this you agree that we may contact you about your enquiry using these details. If you add an email we send one confirmation to it. See our <Link to="/policies#privacy" className="text-brand-deep underline">privacy notice</Link>.</p>
              <button className="btn-primary w-full sm:w-auto" disabled={busy}>{busy ? 'Sending…' : 'Send enquiry'}</button>
            </div>
          </form>
        </div>

        <aside className="on-dark h-fit rounded-2xl bg-navy p-7 text-white shadow-lift sm:p-8 lg:sticky lg:top-28">
          <h2 className="text-2xl">Prefer to chat?</h2>
          <p className="mt-3 leading-relaxed text-white/75">Message us on WhatsApp for the quickest reply. We'll pass on what you've filled in so far.</p>
          <WhatsAppButton text={waText} className="mt-6 w-full" />
          <p className="mt-5 text-sm text-white/65">Or call {site.phones.map((x) => x.display).join(' / ')}.</p>
        </aside>
      </div>
    </Page>
  )
}
