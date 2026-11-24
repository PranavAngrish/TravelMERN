import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { site, blog } from '../lib/site'
import useSeo from '../lib/useSeo'

export default function Blog() {
  const p = site.pages['/blog']
  useSeo(p.title, p.description)
  return (
    <div className="container-page pb-20 pt-28 sm:pt-36">
      <h1 className="text-4xl text-navy sm:text-5xl">Kasol travel blog</h1>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {blog.map((b) => (
          <article key={b.slug} className="group">
            <Link to={`/blog/${b.slug}`} className="block overflow-hidden rounded-2xl bg-mist">
              <Img src={b.imageUrl} alt={b.title} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </Link>
            <p className="mt-4 text-sm text-ink/60">{b.date}</p>
            <h2 className="mt-1 text-2xl text-navy"><Link to={`/blog/${b.slug}`}>{b.title}</Link></h2>
            <p className="mt-2 text-ink/75">{b.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
