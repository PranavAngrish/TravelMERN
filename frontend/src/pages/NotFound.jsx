import { Link } from 'react-router-dom'
import useSeo from '../lib/useSeo'

export default function NotFound() {
  useSeo('Page not found | Mid Orchard Kasol', "This page doesn't exist.")
  return (
    <div className="container-page flex min-h-[70svh] flex-col items-start justify-center pb-20 pt-32">
      <h1 className="text-4xl text-navy sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-lg text-ink/75">The page you're looking for isn't here. Try our rooms or go back home.</p>
      <div className="mt-8 flex gap-3"><Link to="/rooms" className="btn-primary">See rooms</Link><Link to="/" className="btn-outline">Home</Link></div>
    </div>
  )
}
