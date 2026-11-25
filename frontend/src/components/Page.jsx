// Shared frame for inner pages: a navy title band, then the content on a white panel
// with the signature big rounded corner overlapping it.
export default function Page({ title, lede, crumb, narrow = false, children }) {
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-navy pb-24 pt-28 sm:pb-32 sm:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-brand-deep/20 blur-3xl" />
        <div className={`container-page relative ${narrow ? 'max-w-3xl' : ''}`}>
          {crumb && <div className="mb-5 text-sm text-white/70">{crumb}</div>}
          <h1 className="max-w-3xl text-balance text-4xl leading-[1.08] text-white sm:text-6xl">{title}</h1>
          {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{lede}</p>}
        </div>
      </section>
      <div className="relative -mt-12 rounded-t-[2rem] bg-white pb-20 pt-12 sm:-mt-16 sm:rounded-tl-[5rem] sm:rounded-tr-[2rem] sm:pb-28 sm:pt-16">
        <div className={`container-page ${narrow ? 'max-w-3xl' : ''}`}>{children}</div>
      </div>
    </>
  )
}
