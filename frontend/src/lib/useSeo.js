import { useEffect } from 'react'
import { site } from './site'

// The server already puts correct tags in the first HTML response (good for Google and
// link previews). This keeps title/description right while the visitor navigates.
export default function useSeo(title, description) {
  useEffect(() => {
    document.title = title || site.fullName
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
  }, [title, description])
}
