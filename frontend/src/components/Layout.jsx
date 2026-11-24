import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Menu, X } from 'lucide-react'
import { site, waLink } from '../lib/site'
import { cdn } from '../lib/cdn'
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
  const link = 'px-1 py-2 text-[0.95rem] font-medium transition-colors'

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${solid ? 'bg-navy/95 shadow-sm backdrop-blur' : 'bg-transparent'} on-dark`}>
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link to="/" className="flex items-center gap-3" aria-label="Mid Orchard Kasol, home">
          <img src={cdn(site.logo, 160)} alt="" width="48" height="48" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
          <span className="font-display text-lg text-white sm:text-xl">Mid Orchard</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `${link} ${isActive ? 'text-brand' : 'text-white/85 hover:text-white'}`}>
              {n.label}
            </NavLink>
          ))}
          <a href="#contact" className={`${link} text-white/85 hover:text-white`}>Contact</a>
          <EnquiryButton variant="light" className="!px-5 !py-2.5">Send enquiry</EnquiryButton>
        </nav>

        <button
          className="rounded-lg p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="on-dark fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-navy px-5 pb-10 pt-6 md:hidden" aria-label="Mobile">
          <ul className="space-y-1">
            {[...nav, { to: '/#contact', label: 'Contact' }].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="block border-b border-white/10 py-4 font-display text-2xl text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-wa"><FaWhatsapp className="h-5 w-5" aria-hidden="true" />WhatsApp us now</a>
            <EnquiryButton variant="light">Send enquiry</EnquiryButton>
          </div>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer id="contact" className="on-dark bg-navy text-white/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <img src={cdn(site.logo, 160)} alt="Mid Orchard logo" width="64" height="64" loading="lazy" className="mb-4 h-16 w-16 object-contain" />
          <p className="font-display text-2xl text-white">{site.fullName}</p>
          <p className="mt-3 max-w-sm leading-relaxed">Pure vegetarian riverside hotel.<br />{site.address.text}.</p>
          <div className="mt-6 flex gap-4">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-white/20 p-3 hover:bg-white/10"><FaInstagram className="h-5 w-5" /></a>
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-full border border-white/20 p-3 hover:bg-white/10"><FaYoutube className="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold text-white">Contact</h2>
          <ul className="space-y-3">
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white"><FaWhatsapp className="h-4 w-4 text-brand" aria-hidden="true" />WhatsApp {site.whatsappDisplay}</a></li>
            {site.phones.map((p) => (
              <li key={p.tel}><a href={`tel:${p.tel}`} className="inline-flex items-center gap-3 hover:text-white"><FaPhone className="h-4 w-4 text-brand" aria-hidden="true" />{p.display} <span className="text-white/50">({p.label})</span></a></li>
            ))}
            <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 break-all hover:text-white"><FaEnvelope className="h-4 w-4 text-brand" aria-hidden="true" />{site.email}</a></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold text-white">Explore</h2>
          <ul className="space-y-3">
            {[...nav, { to: '/enquiry', label: 'Send enquiry' }, { to: '/policies', label: 'Booking policies' }].map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
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
  return (
    <>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa fixed bottom-6 right-6 z-30 hidden shadow-lg shadow-black/20 md:inline-flex"
      >
        <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
        WhatsApp us now
      </a>
      <div className="on-dark fixed inset-x-0 bottom-0 z-30 grid gap-2 border-t border-white/10 bg-navy/95 p-3 backdrop-blur md:hidden" style={{ gridTemplateColumns: onEnquiry ? '1fr' : '1fr 1fr', paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-wa !py-2.5"><FaWhatsapp className="h-5 w-5" aria-hidden="true" />WhatsApp</a>
        {!onEnquiry && <EnquiryButton variant="light" className="!py-2.5">Send enquiry</EnquiryButton>}
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
    </>
  )
}
