import { Link, useLocation } from 'react-router-dom'
import { WhatsAppButton } from '../components/Cta'
import { site } from '../lib/site'
import useSeo from '../lib/useSeo'

export default function ThankYou() {
  const { state } = useLocation()
  useSeo(site.pages['/thank-you'].title, site.pages['/thank-you'].description)
  return (
    <div className="container-page flex min-h-[70svh] flex-col items-start justify-center pb-20 pt-32">
      <h1 className="text-4xl text-navy sm:text-5xl">Thank you{state?.name ? `, ${state.name}` : ''}</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">We've received your enquiry{state?.room ? ` for the ${state.room}` : ''} and will get back to you soon. For a faster reply, message us on WhatsApp.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <WhatsAppButton text={state?.waText} />
        <Link to="/" className="btn-outline">Back to home</Link>
      </div>
    </div>
  )
}
