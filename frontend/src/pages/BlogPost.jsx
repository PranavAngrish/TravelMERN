import { Link, useParams } from 'react-router-dom'
import Img from '../components/Img'
import { WhatsAppButton, EnquiryButton } from '../components/Cta'
import { blog } from '../lib/site'
import useSeo from '../lib/useSeo'
import NotFound from './NotFound'

export default function BlogPost() {
  const post = blog.find((b) => b.slug === useParams().slug)
  useSeo(post && `${post.title} | Mid Orchard`, post?.excerpt)
  if (!post) return <NotFound />
  return (
    <article className="container-page max-w-3xl pb-20 pt-28 sm:pt-36">
      <Link to="/blog" className="text-sm text-brand-deep hover:underline">← All posts</Link>
      <h1 className="mt-4 text-4xl leading-tight text-navy sm:text-5xl">{post.title}</h1>
      <p className="mt-3 text-ink/60">{post.date}</p>
      <Img src={post.imageUrl} alt={post.title} priority sizes="(min-width: 768px) 768px, 100vw" className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />
      {post.content.map((s, i) => (
        <section key={i} className="mt-10">
          <h2 className="text-2xl text-navy sm:text-3xl">{s.subheading}</h2>
          {[].concat(s.text).map((t, j) => <p key={j} className="mt-4 text-lg leading-relaxed text-ink/80">{t}</p>)}
          {s.image && <Img src={s.image} alt={s.subheading} sizes="(min-width: 768px) 768px, 100vw" className="mt-6 w-full rounded-2xl object-cover" />}
        </section>
      ))}
      <div className="mt-14 flex flex-wrap gap-3"><WhatsAppButton /><EnquiryButton variant="outline">Send enquiry</EnquiryButton></div>
    </article>
  )
}
