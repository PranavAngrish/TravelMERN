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

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");
app.set("trust proxy", 1); // Railway sits behind one proxy; needed for real client IPs

app.get("/health", (req, res) => res.send("ok"));

// Force HTTPS (Railway terminates TLS and tells us via this header)
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] === "http") return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
  next();
});

// Send example.com <-> www.example.com to whichever one FRONTEND_URL uses
if (process.env.FRONTEND_URL) {
  let canonical;
  try { canonical = new URL(process.env.FRONTEND_URL).host; } catch {}
  if (canonical) {
    const strip = (h) => h.replace(/^www\./, "");
    app.use((req, res, next) => {
      const host = (req.headers.host || "").toLowerCase();
      if (host !== canonical && strip(host) === strip(canonical)) {
        return res.redirect(301, `${new URL(process.env.FRONTEND_URL).protocol}//${canonical}${req.originalUrl}`);
      }
      next();
    });
  }
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
app.use(compression());
app.use(express.json({ limit: "10kb" }));

// Rate limits
const limiter = (windowMin, max, message) =>
  rateLimit({ windowMs: windowMin * 60 * 1000, limit: max, standardHeaders: true, legacyHeaders: false, message: { ok: false, message } });
app.use("/api", limiter(15, 300, "Too many requests. Please try again shortly."));
app.use("/api/enquiry", limiter(60, 8, "Too many enquiries from this connection. Please message us on WhatsApp."));

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

initDb()
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.error("Error connecting to the database:", e));

app.listen(port, "0.0.0.0", () => console.log(`App listening on port ${port}`));
