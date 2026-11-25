import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Menu, X, ChevronRight, MapPin } from 'lucide-react'
import { site, logos, waLink } from '../lib/site'
import Snow from './Snow'
import { EnquiryButton } from './Cta'

const nav = [
  { to: '/rooms', label: 'Rooms' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
]

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return undefined
    }
    const t = setTimeout(() => { document.querySelector(hash)?.scrollIntoView() }, 50)
    return () => clearTimeout(t)
  }, [pathname, hash])
  return null
}

function Header() {
  const { pathname } = useLocation()
  const overHero = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    setOpen(false)
  }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  const solid = scrolled || !overHero || open
  const link = 'relative py-2 text-[0.95rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100'

  return (
    <header className={`on-dark fixed inset-x-0 top-0 z-40 transition-all duration-300 ${solid ? 'border-b border-white/10 bg-navy/95 backdrop-blur' : 'bg-gradient-to-b from-navy/70 to-transparent'}`}>
      <div className={`container-page flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-16 sm:h-20'}`}>
        <Link to="/" className="flex items-center gap-3" aria-label="Mid Orchard Kasol, home">
          <img src={logos.emblemLight} alt="" width="106" height="48" className="h-9 w-auto sm:h-11" />
          <span className="font-display text-lg tracking-tight text-white sm:text-xl">Mid Orchard</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `${link} ${isActive ? 'text-white after:scale-x-100' : 'text-white/80 hover:text-white'}`}>
              {n.label}
            </NavLink>
          ))}
          <a href="#contact" className={`${link} text-white/80 hover:text-white`}>Contact</a>
          <EnquiryButton variant="brand" className="!px-5 !py-2.5">Send enquiry</EnquiryButton>
        </nav>

        <button
          className="rounded-full border border-white/25 p-2.5 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="on-dark fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-navy px-5 pb-10 pt-6 md:hidden" aria-label="Mobile">
          <ul>
            {[...nav, { to: '/#contact', label: 'Contact' }].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="flex items-center justify-between border-b border-white/10 py-5 font-display text-3xl text-white">{n.label}<ChevronRight className="h-5 w-5 text-brand" aria-hidden="true" /></Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-wa"><FaWhatsapp className="h-5 w-5" aria-hidden="true" />WhatsApp us now</a>
            <EnquiryButton variant="brand">Send enquiry</EnquiryButton>
          </div>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.fullName}, ${site.address.text}`)}`
  const col = 'mb-5 font-display text-lg text-white'
  return (
    <footer id="contact" className="on-dark relative overflow-hidden bg-navy-deep text-white/75">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="container-page relative grid gap-12 py-16 sm:py-20 md:grid-cols-[1.3fr_1.3fr_0.8fr]">
        <div>
          <img src={logos.fullLight} alt="Mid Orchard" width="720" height="435" loading="lazy" className="h-auto w-56 sm:w-64" />
          <p className="mt-6 font-display text-xl text-white">{site.fullName}</p>
          <p className="mt-2 max-w-sm leading-relaxed">Pure vegetarian riverside hotel.<br />{site.address.text}.</p>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="link-u mt-4 inline-flex items-center gap-2 text-white"><MapPin className="h-4 w-4 text-brand" aria-hidden="true" />View on map</a>
          <div className="mt-7 flex gap-3">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-white/20 p-3 transition-colors hover:border-brand hover:text-brand"><FaInstagram className="h-5 w-5" /></a>
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-full border border-white/20 p-3 transition-colors hover:border-brand hover:text-brand"><FaYoutube className="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <h2 className={col}>Contact</h2>
          <ul className="space-y-3.5">
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition-colors hover:text-white"><FaWhatsapp className="h-4 w-4 text-brand" aria-hidden="true" />WhatsApp {site.whatsappDisplay}</a></li>
            {site.phones.map((p) => (
              <li key={p.tel}><a href={`tel:${p.tel}`} className="inline-flex items-center gap-3 transition-colors hover:text-white"><FaPhone className="h-4 w-4 text-brand" aria-hidden="true" />{p.display} <span className="text-white/50">({p.label})</span></a></li>
            ))}
            <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 break-all transition-colors hover:text-white"><FaEnvelope className="h-4 w-4 text-brand" aria-hidden="true" />{site.email}</a></li>
          </ul>
        </div>

        <div>
          <h2 className={col}>Explore</h2>
          <ul className="space-y-3.5">
            {[...nav, { to: '/enquiry', label: 'Send enquiry' }, { to: '/policies', label: 'Booking policies' }].map((n) => (
              <li key={n.to}><Link to={n.to} className="link-u transition-colors hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 pb-24 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between md:pb-6">
          <p>© {new Date().getFullYear()} Mid Orchard. All rights reserved.</p>
          <p>
            Developed and managed by{' '}
            <a href="https://www.linkedin.com/in/mohin-gupta-3bb267305" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-white">Mohin Gupta</a> and{' '}
            <a href="https://www.linkedin.com/in/pranav-angrish-2b3693252" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-white">Pranav Angrish</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

// WhatsApp is always one tap away: a bar on phones, a button on larger screens
function FloatingActions() {
  const { pathname } = useLocation()
  const onEnquiry = pathname === '/enquiry'
  // On the home page the hero already has a WhatsApp button, so the floating one appears after it scrolls away
  const [past, setPast] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const showFloat = pathname !== '/' || past
  return (
    <>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-wa fixed bottom-6 right-6 z-30 hidden shadow-lift transition-opacity duration-300 md:inline-flex ${showFloat ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        tabIndex={showFloat ? 0 : -1}
        aria-hidden={!showFloat}
      >
        <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
        WhatsApp us now
      </a>
      <div className="on-dark fixed inset-x-0 bottom-0 z-30 grid gap-2 border-t border-white/10 bg-navy/95 p-3 backdrop-blur md:hidden" style={{ gridTemplateColumns: onEnquiry ? '1fr' : '1fr 1fr', paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-wa !py-2.5"><FaWhatsapp className="h-5 w-5" aria-hidden="true" />WhatsApp</a>
        {!onEnquiry && <EnquiryButton variant="brand" className="!py-2.5">Send enquiry</EnquiryButton>}
      </div>
    </>
  )
}

export default function Layout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <FloatingActions />
      <Snow />
    </>
  )
}
