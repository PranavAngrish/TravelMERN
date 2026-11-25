import { Link, useLocation } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import { WhatsAppButton } from '../components/Cta'
import { site } from '../lib/site'
import useSeo from '../lib/useSeo'

export default function ThankYou() {
  const { state } = useLocation()
  useSeo(site.pages['/thank-you'].title, site.pages['/thank-you'].description)
  return (
    <section className="on-dark relative flex min-h-[80svh] items-center overflow-hidden bg-navy pb-20 pt-32 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-brand/15 blur-3xl" />
      <div className="container-page relative">
        <CircleCheck className="h-12 w-12 text-brand" aria-hidden="true" />
        <h1 className="mt-6 text-4xl sm:text-6xl">Thank you{state?.name ? `, ${state.name}` : ''}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">We've received your enquiry{state?.room ? ` for the ${state.room}` : ''} and will get back to you soon. For a faster reply, message us on WhatsApp.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <WhatsAppButton text={state?.waText} />
          <Link to="/" className="btn-outline-light">Back to home</Link>
        </div>
      </div>
    </section>
  )
}
