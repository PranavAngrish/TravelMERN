const path = require("path");
// One .env at the repo root, shared by backend and frontend (Railway injects real variables instead)
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { initDb } = require("./db"); // after dotenv so DATABASE_URL is set
const seo = require("./seo");
const site = require("../shared/site.json");
const enquiryRouter = require("./routes/enquiry");
const notMeRouter = require("./routes/notMe");

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");
// How many proxies sit in front of the app: Railway alone = 1. Cloudflare in front of Railway = 2 (see README).
// Wrong value = rate limits see Cloudflare's IP instead of the visitor's.
app.set("trust proxy", Number.parseInt(process.env.TRUST_PROXY, 10) || 1);

app.get("/health", (req, res) => res.send("ok"));

// Public address from FRONTEND_URL, e.g. https://www.hotelmidorchardkasol.in
let canonical = null;
try { if (process.env.FRONTEND_URL) canonical = new URL(process.env.FRONTEND_URL); } catch {}
const stripWww = (h) => h.replace(/^www\./, "");

// Force HTTPS. Redirects to the configured domain, never to whatever Host header the request carried.
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] === "http") {
    return res.redirect(301, `https://${canonical ? canonical.host : req.headers.host}${req.originalUrl}`);
  }
  next();
});

// example.com <-> www.example.com: send both to whichever one FRONTEND_URL uses
if (canonical) {
  app.use((req, res, next) => {
    const host = (req.headers.host || "").toLowerCase();
    if (host !== canonical.host && stripWww(host) === stripWww(canonical.host)) {
      return res.redirect(301, `${canonical.protocol}//${canonical.host}${req.originalUrl}`);
    }
    next();
  });
}

// Security headers: the site only loads its own scripts, plus images from Cloudinary and fonts from Google Fonts.
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.DISABLE_CSP === "1"
        ? false
        : {
            useDefaults: true,
            directives: {
              "default-src": ["'self'"],
              "script-src": ["'self'"],
              "connect-src": ["'self'"],
              "img-src": ["'self'", "data:", "blob:", "https://res.cloudinary.com"],
              "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
              "font-src": ["'self'", "https://fonts.gstatic.com"],
              "object-src": ["'none'"],
              "upgrade-insecure-requests": null, // the server already redirects http to https
              "frame-ancestors": ["'self'"],
            },
          },
    crossOriginEmbedderPolicy: false,
  })
);
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()");
  next();
});
app.use(compression());
app.use(express.json({ limit: "10kb" }));

// Rate limits
const limiter = (windowMin, max, message) =>
  rateLimit({ windowMs: windowMin * 60 * 1000, limit: max, standardHeaders: true, legacyHeaders: false, message: { ok: false, message } });
app.use("/api", limiter(15, 300, "Too many requests. Please try again shortly."));
app.use("/api/enquiry", limiter(60, 8, "Too many enquiries from this connection. Please message us on WhatsApp."));

// "This wasn't me" link from the guest email (page + POST). Not under /api so the link looks clean.
app.use("/enquiry/not-me", limiter(15, 30, "Too many requests. Please try again shortly."), notMeRouter);

// API
app.use("/api/enquiry", enquiryRouter);
app.use("/api", (req, res) => res.status(404).json({ message: "Not found" }));

// Crawl files
app.get("/robots.txt", (req, res) => res.type("text/plain").send(seo.robots(seo.baseUrl(req))));
app.get("/sitemap.xml", (req, res) => res.type("application/xml").send(seo.sitemap(seo.baseUrl(req))));

// Static files: hashed build assets are cached for a year, everything else briefly
app.use(
  express.static(seo.DIST, {
    index: false,
    setHeaders: (res, file) => {
      res.setHeader("Cache-Control", file.includes(`${path.sep}assets${path.sep}`) ? "public, max-age=31536000, immutable" : "public, max-age=3600");
    },
  })
);

// Pages. Old URLs get a permanent redirect so existing Google rankings carry over.
app.get("*", (req, res) => {
  const pathname = req.path.length > 1 ? req.path.replace(/\/+$/, "") : req.path;
  const target = site.redirects[pathname.toLowerCase()];
  if (target) return res.redirect(301, target);

  const meta = seo.resolve(pathname);
  let html;
  try {
    html = seo.render(meta || { path: pathname, title: "Page not found | Mid Orchard Kasol", description: "This page doesn't exist.", noindex: true, image: site.ogImage, type: "website" }, seo.baseUrl(req));
  } catch (e) {
    console.error("index.html missing, did the frontend build run?", e.message);
    return res.status(500).send("Site is not built yet.");
  }
  res.status(meta ? 200 : 404).set("Cache-Control", "no-cache").type("html").send(html);
});

// Never leak stack traces or file paths (Express prints them unless NODE_ENV=production)
app.use((err, req, res, next) => {
  if (err?.type === "entity.too.large") return res.status(413).json({ ok: false, message: "Request too large." });
  if (err?.type === "entity.parse.failed") return res.status(400).json({ ok: false, message: "Invalid request." });
  console.error("Unhandled error:", err);
  res.status(500).json({ ok: false, message: "Something went wrong." });
});
process.on("unhandledRejection", (e) => console.error("Unhandled rejection:", e));

initDb()
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.error("Error connecting to the database:", e));

app.listen(port, "0.0.0.0", () => console.log(`App listening on port ${port}`));
