# Mid Orchard: go-live checklist

Do these in order. Tick each one off. Everything marked (you) needs your logins.

## 0. Make sure YOU control the domain accounts
- [ ] GoDaddy: log in, open the domain > DNS > Nameservers. They should read `something.ns.cloudflare.com`. That means Cloudflare runs your DNS (leave it that way).
- [ ] Cloudflare: log in at dash.cloudflare.com and check `hotelmidorchardkasol.in` is listed. If your friend set it up in THEIR account, ask them to add you (Manage Account > Members > Super Administrator), or create your own Cloudflare account, add the domain there and paste its two nameservers into GoDaddy. The business should own this account.
- [ ] Turn on two-factor login for GoDaddy, Cloudflare, Railway, GitHub and Resend.

## 1. Put the new code on Railway
- [ ] Unzip, copy the contents over your GitHub repo (replace files), commit and push. Railway rebuilds by itself.
- [ ] Do not commit a `.env` file. Real values go in Railway only.

## 2. Railway variables (service > Variables > Raw Editor)
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
FRONTEND_URL=https://www.hotelmidorchardkasol.in
NODE_ENV=production
TRUST_PROXY=2
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM=Mid Orchard <enquiries@hotelmidorchardkasol.in>
EMAIL_USER=<inbox that should receive enquiries>
```
- [ ] Delete old ones if present: `HOST`, `SERVICE`, `EMAIL_PASS`, `EMAIL_PORT`, `DISABLE_CSP`, `VITE_API_URL`, `MONGODB` (after the data move).
- [ ] Settings > Networking: health check path `/health`.

## 3. Cloudflare DNS: make the bare domain work
Railway's Cloudflare pop-up already created the `www` records. Check they are still there:
- [ ] `CNAME  www  ->  <something>.up.railway.app` (proxied or DNS only both work)
- [ ] `TXT  _railway-verify.www  ->  railway-verify=...` (DNS only)

Then add the bare domain:
- [ ] DNS > Add record: `A`, name `@`, content `192.0.2.1`, **Proxied (orange cloud)**.
- [ ] Rules > Redirect Rules > Create rule: When Hostname equals `hotelmidorchardkasol.in`, then Dynamic redirect to `concat("https://www.hotelmidorchardkasol.in", http.request.uri.path)`, status 301, tick "Preserve query string". Save and deploy.
- [ ] Delete leftover GoDaddy records (parked-page A records, "forwarding" CNAMEs) except the ones above and the email ones in step 4.

## 4. Cloudflare SSL
- [ ] SSL/TLS > Overview: set to **Full** (or Full (strict)). Not "Flexible", that causes an endless redirect loop.
- [ ] SSL/TLS > Edge Certificates: Always Use HTTPS = On, Minimum TLS = 1.2.

## 5. Email sending (Resend)
- [ ] resend.com > Domains > Add `hotelmidorchardkasol.in`. It shows SPF, DKIM and MX records.
- [ ] Add each in Cloudflare DNS exactly as shown, all **DNS only (grey cloud)**. Click Verify in Resend.
- [ ] Add TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:<your inbox>`.
- [ ] Resend > API Keys > create a key with "Sending access" and paste it as `RESEND_API_KEY`.

## 6. Test (after the deploy finishes)
- [ ] Run these. Expect 301 to https://www... for the first two, 200 for the third:
```
curl -sI http://hotelmidorchardkasol.in  | grep -iE "^(HTTP|location)"
curl -sI https://hotelmidorchardkasol.in | grep -iE "^(HTTP|location)"
curl -sI https://www.hotelmidorchardkasol.in | grep -iE "^HTTP"
curl -s https://www.hotelmidorchardkasol.in/robots.txt     # Sitemap line must say www
```
- [ ] Send a real enquiry using an email you own. You should get the guest email, and the hotel inbox gets the admin email. Check spam too.
- [ ] Open the guest email's "This wasn't me" link and confirm. NOTE: that blocks that address from future guest emails. To undo during testing, in the Railway Postgres Query tab run `DELETE FROM email_suppressions;`.
- [ ] Send 10 enquiries quickly from a normal phone: the 9th should be refused ("Too many enquiries"). If normal visitors get refused after only one or two, change `TRUST_PROXY` to `1`.
- [ ] Check the privacy notice at `/policies#privacy` and read it once: change anything that is not true for your business.

## 7. Protect the form (Cloudflare, free plan)
- [ ] Security > Bots: turn on Bot Fight Mode.
- [ ] Security > WAF > Rate limiting rules: for URI path `/api/enquiry`, limit to about 5 requests per 10 minutes per IP, action Block.

## 8. Search
- [ ] Google Search Console: add `https://www.hotelmidorchardkasol.in` and submit `/sitemap.xml`.

## Later
- Railway Postgres: enable backups (Postgres service > Backups) once you are on a plan that has them.
- After the old Mongo data is moved: delete `data-export/` and the `MONGODB` variable.
