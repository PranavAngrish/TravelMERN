// Cloudinary delivers a resized, compressed, modern-format copy when asked in the URL.
export const cdn = (url, width) =>
  url && url.includes('/upload/') ? url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`) : url

export const srcSet = (url, widths = [480, 800, 1200, 1600]) =>
  widths.map((w) => `${cdn(url, w)} ${w}w`).join(', ')
