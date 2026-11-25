import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Page from '../components/Page'
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
    <Page narrow title="Booking policies">
      <ul className="flex flex-wrap gap-2">
        {policies.map((x) => <li key={x.id}><a href={`#${x.id}`} className="inline-block rounded-full bg-foam px-4 py-1.5 text-sm font-medium text-navy transition-colors hover:bg-brand/30">{x.title}</a></li>)}
      </ul>
      {policies.map((x) => (
        <section key={x.id} id={x.id} className="mt-12 border-t border-navy/10 pt-10">
          <h2 className="text-2xl text-navy sm:text-3xl">{x.title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink/80">{x.text}</p>
        </section>
      ))}
    </Page>
  )
}
