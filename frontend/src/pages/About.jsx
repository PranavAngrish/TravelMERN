import Img from '../components/Img'
import { WhatsAppButton, EnquiryButton } from '../components/Cta'
import { site } from '../lib/site'
import people from '../../../shared/people.json'
import useSeo from '../lib/useSeo'

export default function About() {
  const p = site.pages['/about']
  useSeo(p.title, p.description)
  const h = people.host
  return (
    <div className="container-page pb-20 pt-28 sm:pt-36">
      <h1 className="text-4xl text-navy sm:text-5xl">About Mid Orchard</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">Mid Orchard is a pure vegetarian riverside hotel in Kasol, set in a quiet spot about 3 km from the busy market. Rooms have private balconies with views of the Parvati river and the mountains, and the restaurant serves fresh vegetarian food.</p>

      <section className="mt-16 grid items-start gap-10 md:grid-cols-[1fr_2fr]">
        <Img src={h.imageSrc} alt={`${h.name}, host of Mid Orchard`} sizes="(min-width: 768px) 320px, 100vw" widths={[400, 640, 800]} className="aspect-square w-full max-w-xs rounded-2xl object-cover" />
        <div>
          <h2 className="text-3xl text-navy">Meet your host, {h.name}</h2>
          <p className="mt-4 max-w-prose leading-relaxed text-ink/80">{h.description}</p>
        </div>
      </section>

      <div className="mt-14 flex flex-wrap gap-3"><WhatsAppButton /><EnquiryButton variant="outline">Send enquiry</EnquiryButton></div>
    </div>
  )
}
