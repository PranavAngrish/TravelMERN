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

One `.env` at the repo root (see `.env.example`). On Railway paste the same keys into Variables.

## Deploying on Railway

1. Add a PostgreSQL service. On the app service set `DATABASE_URL` to `${{Postgres.DATABASE_URL}}`.
2. Set the other variables. `FRONTEND_URL` is your public domain (no trailing slash).
3. Build: `npm run build`, start: `npm start` (already in `railway.json`). Tables are created on first start.
4. Add your custom domain in Railway and the CNAME it shows at your DNS provider.

Email: Railway Hobby/Trial block SMTP, so set `RESEND_API_KEY`, `EMAIL_FROM` and `EMAIL_USER` (HTTPS, works everywhere). Enquiries are always saved in the `forms` table first, so none are lost.

## Moving old MongoDB data

Set `MONGODB` (old URI) and `DATABASE_URL` (Railway public URL) in `.env`, then `npm run migrate`. It writes a JSON backup of everything to `data-export/` (git-ignored; keep it private) and imports the enquiries. There are no accounts any more, so users are only in the backup. Safe to re-run.

## Security notes

Helmet security headers with a strict content security policy (own scripts only), rate limits on the API and the enquiry endpoint, 10 KB body limit, server-side validation, a honeypot field on the enquiry form, HTTPS and www redirects. There are no accounts or logins, so there is nothing to take over. Put the domain behind Cloudflare for bot and flood protection.
