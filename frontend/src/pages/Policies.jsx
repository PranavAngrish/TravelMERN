import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import policies from '../../../shared/policies.json'
import { site } from '../lib/site'
import useSeo from '../lib/useSeo'

export default function Policies() {
  const p = site.pages['/policies']
  useSeo(p.title, p.description)
  const { hash } = useLocation()
  // Links from other pages (e.g. the enquiry form) land on the right section
  useEffect(() => { if (hash) document.getElementById(hash.slice(1))?.scrollIntoView() }, [hash])
  return (
    <div className="container-page max-w-3xl pb-20 pt-28 sm:pt-36">
      <h1 className="text-4xl text-navy sm:text-5xl">Booking policies</h1>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-brand-deep">
        {policies.map((x) => <li key={x.id}><a href={`#${x.id}`} className="hover:underline">{x.title}</a></li>)}
      </ul>
      {policies.map((x) => (
        <section key={x.id} id={x.id} className="mt-12">
          <h2 className="text-2xl text-navy sm:text-3xl">{x.title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink/80">{x.text}</p>
        </section>
      ))}
    </div>
  )
}
