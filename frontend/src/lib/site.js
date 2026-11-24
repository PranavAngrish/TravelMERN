import site from '../../../shared/site.json'
import blog from '../../../shared/blog.json'

export { site, blog }

export const getRoom = (slug) => site.rooms.find((r) => r.slug === slug)

// Opens WhatsApp with a ready-typed message
export const waLink = (text = "Hello Mid Orchard, I'd like to know more about staying with you.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
