// Generates a self-contained SVG data URI so product images work fully offline,
// with no dependency on an external image host.
export function makePlaceholder(text, { bg = '#e5e7eb', fg = '#4b5563', w = 500, h = 500 } = {}) {
  const safeText = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="100%" height="100%" fill="${bg}"/>
    <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="28" fill="${fg}" text-anchor="middle" dominant-baseline="middle">${safeText}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
