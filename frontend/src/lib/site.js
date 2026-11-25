import site from '../../../shared/site.json'
import blog from '../../../shared/blog.json'

export { site, blog }

// Logo files live in frontend/public. The light versions are made for dark (navy) backgrounds.
export const logos = {
  emblemLight: '/logo-emblem-light.png', // mountain and cabin only
  fullLight: '/logo-light.png',          // full lockup with name and tagline
  original: '/logo.jpg',                 // original dark-green-on-cream artwork
}

export const getRoom = (slug) => site.rooms.find((r) => r.slug === slug)

// Opens WhatsApp with a ready-typed message
export const waLink = (text = "Hello Mid Orchard, I'd like to know more about staying with you.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
