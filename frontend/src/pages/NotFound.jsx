import { Link } from 'react-router-dom'
import useSeo from '../lib/useSeo'

export default function NotFound() {
  useSeo('Page not found | Mid Orchard Kasol', "This page doesn't exist.")
  return (
    <section className="on-dark relative flex min-h-[80svh] items-center overflow-hidden bg-navy pb-20 pt-32 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-brand/15 blur-3xl" />
      <div className="container-page relative">
        <h1 className="text-4xl sm:text-6xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-lg text-white/75">The page you're looking for isn't here. Try our rooms or go back home.</p>
        <div className="mt-8 flex gap-3"><Link to="/rooms" className="btn-brand">See rooms</Link><Link to="/" className="btn-outline-light">Home</Link></div>
      </div>
    </section>
  )
}
