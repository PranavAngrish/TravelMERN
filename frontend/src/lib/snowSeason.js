// Winter theme: on from 25 November to 25 March (both days included), every year.
// It switches itself on and off using the visitor's own date, so nothing needs changing each year.
// To test outside the season add ?snow=on to any page address (or ?snow=off to hide it in season).
export function isSnowSeason(date = new Date()) {
  const m = date.getMonth() + 1 // 1 = January
  const d = date.getDate()
  return (m === 11 && d >= 25) || m === 12 || m === 1 || m === 2 || (m === 3 && d <= 25)
}

export function snowWanted() {
  try {
    const q = new URLSearchParams(window.location.search).get('snow')
    if (q === 'on') return true
    if (q === 'off') return false
  } catch { /* ignore */ }
  return isSnowSeason()
}
