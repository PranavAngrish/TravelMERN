import { cdn, srcSet } from '../lib/cdn'

// Responsive, lazy image. `ratio` reserves space so the page doesn't jump while loading.
export default function Img({ src, alt, sizes = '100vw', priority = false, className = '', widths, ...rest }) {
  return (
    <img
      src={cdn(src, 800)}
      srcSet={srcSet(src, widths)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
      {...rest}
    />
  )
}
