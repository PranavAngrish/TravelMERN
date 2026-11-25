import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { waLink } from '../lib/site'

export function WhatsAppButton({ text, children = 'WhatsApp us now', className = '' }) {
  return (
    <a href={waLink(text)} target="_blank" rel="noopener noreferrer" className={`btn-wa ${className}`}>
      <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
      {children}
    </a>
  )
}

// Class names are written out in full so Tailwind can see and generate them
const variants = {
  primary: 'btn-primary',
  brand: 'btn-brand',
  light: 'btn-light',
  outline: 'btn-outline',
  'outline-light': 'btn-outline-light',
}

// variant: primary | brand | light | outline | outline-light
export function EnquiryButton({ room, children = 'Send enquiry', variant = 'primary', className = '' }) {
  return (
    <Link to={room ? `/enquiry?room=${room}` : '/enquiry'} className={`${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}
