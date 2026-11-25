import Img from '../components/Img'
import Page from '../components/Page'
import { WhatsAppButton, EnquiryButton } from '../components/Cta'
import { site } from '../lib/site'
import people from '../../../shared/people.json'
import useSeo from '../lib/useSeo'

export default function About() {
  const p = site.pages['/about']
  useSeo(p.title, p.description)
  const h = people.host
  return (
    <Page
      title="About Mid Orchard"
      lede="Mid Orchard is a pure vegetarian riverside hotel in Kasol, set in a quiet spot about 3 km from the busy market. Rooms have private balconies with views of the Parvati river and the mountains, and the restaurant serves fresh vegetarian food."
    >
      <section className="grid items-start gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <Img src={h.imageSrc} alt={`${h.name}, host of Mid Orchard`} sizes="(min-width: 768px) 320px, 100vw" widths={[400, 640, 800]} className="shape-tl aspect-square w-full max-w-xs object-cover shadow-lift md:aspect-[4/5]" />
        <div>
          <h2 className="text-3xl text-navy sm:text-4xl">Meet your host, {h.name}</h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink/80">{h.description}</p>
          <div className="mt-9 flex flex-wrap gap-3"><WhatsAppButton /><EnquiryButton variant="outline">Send enquiry</EnquiryButton></div>
        </div>
      </section>
    </Page>
  )
}
