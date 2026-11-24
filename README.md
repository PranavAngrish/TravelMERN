# Mid Orchard Kasol

Website for Mid Orchard, a pure vegetarian riverside hotel in Kasol. React (Vite + Tailwind) frontend, Node/Express backend, PostgreSQL. One service serves both the site and the API.

## Pages

| URL | What |
|---|---|
| `/` | Home: hero, rooms, gallery, why us, reviews |
| `/rooms`, `/rooms/:slug` | Room list and room details (swipe carousel, full-size viewer) |
| `/gallery` | All photos with full-screen viewer |
| `/enquiry` | Enquiry form (no login needed; `?room=<slug>` preselects a room) |
| `/thank-you` | After a successful enquiry |
| `/about`, `/blog`, `/blog/:slug`, `/policies` | Content pages |

Old URLs (`/signin`, `/signup`, `/midorchard-kasol`, `/kasol-river-view-hotel`, `/river-view-booking`, ...) get a permanent 301 redirect to the new ones, so existing search rankings carry over.

## Where to edit content

Everything lives in `shared/` and is read by both the site and the server (for SEO):

- `shared/site.json`: business details, WhatsApp number, rooms (names, descriptions, photos), gallery photos, per-page titles and descriptions
- `shared/blog.json`: blog posts
- `shared/people.json`: reviews and host bio
- `shared/policies.json`: booking policies

Add a room by adding an entry to `rooms` in `site.json`. It gets its own page, sitemap entry and enquiry option automatically.

## Local development

```bash
cp .env.example .env        # fill in the values
npm install && npm run install:all
npm run dev                 # API on :3000, site on :5173
```

## Environment variables

One `.env` at the repo root locally (see `.env.example`). On Railway paste the same keys into Variables.

| Variable | Value | Notes |
|---|---|---|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` | Reference the Postgres service, don't paste a URL |
| `FRONTEND_URL` | `https://www.hotelmidorchardkasol.in` | Public address, no trailing slash. Drives canonical links, sitemap, the apex-to-www redirect and the links inside emails |
| `NODE_ENV` | `production` | Hides error details from visitors |
| `TRUST_PROXY` | `2` | 1 = Railway only. 2 = Cloudflare proxy (orange cloud) + Railway. Wrong value makes the rate limiter see Cloudflare's IP instead of the visitor's |
| `RESEND_API_KEY` | `re_...` | Sends email over HTTPS (Railway blocks SMTP on Hobby/Trial) |
| `EMAIL_FROM` | `Mid Orchard <enquiries@hotelmidorchardkasol.in>` | Must be on a domain verified in Resend |
| `EMAIL_USER` | inbox that receives enquiries | Also used as Reply-To on guest emails |
| `MONGODB` | only while running `npm run migrate` | Remove afterwards |

Remove leftovers from the old setup: `HOST`, `SERVICE`, `EMAIL_PASS`, `EMAIL_PORT` (unless you deliberately use SMTP), `DISABLE_CSP`, `VITE_API_URL`.

## Emails

Each enquiry is saved first, then two emails go out in the background (a failure never affects the visitor):

1. **Guest confirmation** (only if they gave an email): branded HTML plus plain-text version, reference number (`MO-00042`), stay summary, "not a confirmed booking" notice, next steps, WhatsApp and call buttons, and a **"This wasn't me"** link.
2. **Admin notification** to `EMAIL_USER`: dates, nights, guests, contact details, message, one-tap WhatsApp / call / reply buttons, and whether the guest email was sent. Reply-To is the guest.

Templates live in `backend/emails/` (`layout.js` = shared header/footer/colours, `templates.js` = the messages). Logo, address, phones and name come from `shared/site.json`. Preview by running `node` against the templates, or open the HTML files in `email-previews/`.

**"This wasn't me" flow.** The link is `/enquiry/not-me?t=<secret token>`. Opening it only shows a confirm button (mail scanners open links automatically, so nothing changes on GET). Confirming deletes the email address from that enquiry, adds a SHA-256 hash of it to `email_suppressions` so it is never emailed again, and notifies the admin inbox. The same endpoint answers the one-click "Unsubscribe" button that Gmail and Apple Mail show (`List-Unsubscribe` headers).

**Why the guest email never repeats the visitor's message.** The email address is typed by whoever fills in the form, so it may belong to someone else. Echoing free text would let anyone use the hotel's domain to send words of their choice to a stranger.

**DNS for email (Cloudflare).** In Resend add the domain, then create the SPF, DKIM and MX records it shows. These must be **DNS only (grey cloud)**. Add a DMARC record too, starting soft: TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:<your inbox>`. Move to `p=quarantine` after a few weeks of clean reports.

## Deploying on Railway

1. Add a PostgreSQL service. Set the variables above on the app service.
2. Build `npm run build`, start `npm start` (already in `railway.json`). Tables and new columns are created on start; nothing to migrate by hand.
3. Settings > Networking > Custom Domain: add `www.hotelmidorchardkasol.in` and create the records Railway shows (CNAME plus the `_railway-verify` TXT) in Cloudflare.
4. Health check path: `/health`.

## Domain, www and Cloudflare

The site is served on `www`. The root domain (`hotelmidorchardkasol.in`) must redirect to it.

**Why the root domain fails:** Railway only answers for domains added under the service's Custom Domain list. If only `www` was added, requests for the bare domain never reach the app (so the app's own apex redirect can't run).

**Fix (recommended): redirect at Cloudflare.**
1. DNS > add `A` record, name `@`, value `192.0.2.1`, **Proxied (orange cloud)**. The IP is a placeholder; the proxy answers before it is ever used.
2. Rules > Redirect Rules > Create rule "Root to www": When *Hostname equals* `hotelmidorchardkasol.in` > *Dynamic* redirect to `concat("https://www.hotelmidorchardkasol.in", http.request.uri.path)`, status **301**, **preserve query string** on.
3. SSL/TLS > Overview: set encryption mode to **Full** (or Full strict). Never *Flexible*: Cloudflare would talk to Railway over http and the app's https redirect would loop forever.
4. SSL/TLS > Edge Certificates: *Always Use HTTPS* on, minimum TLS 1.2.

**Alternative:** also add the bare domain in Railway (second custom domain, CNAME `@` to the target Railway gives; Cloudflare flattens it). The app then redirects it to `FRONTEND_URL` itself. Check your Railway plan's custom-domain limit first.

**Verify:**

```bash
curl -sI http://hotelmidorchardkasol.in      | grep -iE "^(HTTP|location)"   # 301 to https://www...
curl -sI https://hotelmidorchardkasol.in     | grep -iE "^(HTTP|location)"   # 301 to https://www...
curl -sI https://www.hotelmidorchardkasol.in | grep -iE "^(HTTP|strict|content-security)"  # 200 plus headers
curl -s  https://www.hotelmidorchardkasol.in/robots.txt                       # Sitemap line must show www
curl -s  https://www.hotelmidorchardkasol.in/health                           # ok
```

## Moving old MongoDB data

Set `MONGODB` (old URI) and `DATABASE_URL` (Railway public URL) in `.env`, then `npm run migrate`. It writes a JSON backup of everything to `data-export/` (git-ignored; keep it private, it contains old account data) and imports the enquiries. Safe to re-run. When finished, remove `MONGODB` from everywhere and delete `data-export/`.

## Security notes

- Helmet headers with a strict content security policy (own scripts only), HSTS, Permissions-Policy.
- Rate limits: 300 requests / 15 min on the API, 8 enquiries / hour per visitor, 30 / 15 min on the not-me link. They rely on `TRUST_PROXY` being right.
- 10 KB body limit, server-side validation of every field, strict email check, honeypot field.
- All visitor text is HTML-escaped before it goes into an email; the guest email does not echo free text.
- Unknown errors return a generic message (no stack traces or file paths).
- HTTPS and www redirects go to `FRONTEND_URL`, never to the incoming Host header.
- No accounts or logins. Enquiries (name, phone, email, dates) are personal data: keep the Railway project and Resend/Cloudflare logins on two-factor authentication.
- A short privacy notice lives in `shared/policies.json` (id `privacy`, shown on /policies and linked from the enquiry form). It is a plain-language draft: have it checked against your own practice before relying on it.
- Keep dependencies current: run `npm audit` in `backend/` and `frontend/` now and then.
