// Server-side SEO: per-URL meta tags, JSON-LD, sitemap and robots. Content comes
// from shared/site.json and shared/blog.json, the same files the React app reads.
const fs = require("fs");
const path = require("path");
const site = require("../shared/site.json");
const blog = require("../shared/blog.json");

const DIST = path.join(__dirname, "../frontend/dist");
let template;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ldJson = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

const baseUrl = (req) => (process.env.FRONTEND_URL || `${req.protocol}://${req.get("host")}`).replace(/\/+$/, "");
const cdnImg = (url, w) => url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
const plain = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s);

/** Returns page meta for a pathname, or null if the URL doesn't exist. */
function resolve(pathname) {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (site.pages[p]) return { path: p, ...site.pages[p], image: site.ogImage, type: "website" };

  let m = p.match(/^\/rooms\/([a-z0-9-]+)$/);
  if (m) {
    const r = site.rooms.find((x) => x.slug === m[1]);
    if (r)
      return {
        path: p,
        title: `${r.name} with ${r.view} in Kasol | Mid Orchard`,
        description: plain(`${r.name} at Mid Orchard, Kasol: ${r.summary} Photos and enquiry.`, 155),
        image: cdnImg(r.image, 1200),
        type: "website",
        room: r,
      };
  }
  m = p.match(/^\/blog\/([a-z0-9-]+)$/);
  if (m) {
    const b = blog.find((x) => x.slug === m[1]);
    if (b)
      return {
        path: p,
        title: `${plain(b.title, 52)} | Mid Orchard`,
        description: plain(b.content?.[0]?.text?.[0] || b.excerpt, 155),
        image: cdnImg(b.imageUrl, 1200),
        type: "article",
        post: b,
      };
  }
  return null;
}

function jsonLd(meta, base) {
  const hotel = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: site.fullName,
    description: site.pages["/"].description,
    url: base + "/",
    logo: site.logo,
    image: [site.ogImage, ...site.gallery.slice(0, 4).map((u) => cdnImg(u, 1200))],
    telephone: "+" + site.whatsapp,
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: site.address.locality, addressRegion: site.address.region, addressCountry: site.address.country },
    amenityFeature: site.amenities.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    sameAs: Object.values(site.social),
  };
  const out = [ldJson(hotel)];
  if (meta.room)
    out.push(
      ldJson({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: base + "/" },
          { "@type": "ListItem", position: 2, name: "Rooms", item: base + "/rooms" },
          { "@type": "ListItem", position: 3, name: meta.room.name, item: base + meta.path },
        ],
      })
    );
  if (meta.post) {
    const d = new Date(meta.post.date);
    out.push(
      ldJson({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: meta.post.title,
        image: meta.image,
        ...(Number.isNaN(d.getTime()) ? {} : { datePublished: d.toISOString().slice(0, 10) }),
        author: { "@type": "Organization", name: site.fullName },
        publisher: { "@type": "Organization", name: site.fullName, logo: { "@type": "ImageObject", url: site.logo } },
        mainEntityOfPage: base + meta.path,
      })
    );
  }
  return out.join("");
}

function render(meta, base) {
  if (!template) template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
  const url = base + (meta.path === "/" ? "/" : meta.path);
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta name="robots" content="${meta.noindex ? "noindex,follow" : "index,follow,max-image-preview:large"}">`,
    `<meta property="og:site_name" content="${esc(site.fullName)}">`,
    `<meta property="og:type" content="${meta.type}">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${esc(meta.image)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.description)}">`,
    `<meta name="twitter:image" content="${esc(meta.image)}">`,
    jsonLd(meta, base),
  ].join("\n    ");
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/i, "")
    .replace("</head>", `    ${tags}\n  </head>`);
  return html;
}

function sitemap(base) {
  const paths = [
    ...Object.entries(site.pages).filter(([, v]) => !v.noindex).map(([k]) => k),
    ...site.rooms.map((r) => `/rooms/${r.slug}`),
    ...blog.map((b) => `/blog/${b.slug}`),
  ];
  const urls = paths.map((p) => `  <url><loc>${esc(base + (p === "/" ? "/" : p))}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const robots = (base) =>
  `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /thank-you\n\nSitemap: ${base}/sitemap.xml\n`;

module.exports = { resolve, render, sitemap, robots, baseUrl, DIST };
