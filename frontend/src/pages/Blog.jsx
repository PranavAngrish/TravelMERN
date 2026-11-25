import { Link } from 'react-router-dom'
import Img from '../components/Img'
import Page from '../components/Page'
import { site, blog } from '../lib/site'
import useSeo from '../lib/useSeo'

export default function Blog() {
  const p = site.pages['/blog']
  useSeo(p.title, p.description)
  return (
    <Page title="Kasol travel blog" lede="Stay ideas and travel notes for families and couples visiting Kasol and the Parvati Valley.">
      <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
        {blog.map((b) => (
          <article key={b.slug} className="group">
            <Link to={`/blog/${b.slug}`} className="block overflow-hidden rounded-2xl bg-mist" aria-label={b.title}>
              <Img src={b.imageUrl} alt="" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </Link>
            <p className="mt-5 text-sm text-ink/60">{b.date}</p>
            <h2 className="mt-1 text-2xl text-navy sm:text-3xl"><Link to={`/blog/${b.slug}`} className="link-u">{b.title}</Link></h2>
            <p className="mt-3 leading-relaxed text-ink/75">{b.excerpt}</p>
          </article>
        ))}
      </div>
    </Page>
  )
}
