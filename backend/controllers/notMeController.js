const Forms = require("../models/forms");
const sendEmail = require("../Utils/sendEmail");
const seo = require("../seo");
const { statusPage, adminDisownedNotice } = require("../emails/templates");

const TOKEN = /^[a-f0-9]{48}$/;
const page = (res, status, state, token) =>
  res.status(status).set({ "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" }).type("html").send(statusPage(state, token));

// GET only shows a confirm button. Email security scanners open links automatically,
// so nothing is changed until the person presses the button (POST).
module.exports.show = async (req, res) => {
  const t = String(req.query.t || "");
  if (!TOKEN.test(t)) return page(res, 400, "invalid");
  try {
    const row = await Forms.findByToken(t);
    if (!row) return page(res, 404, "invalid");
    return page(res, 200, row.email_disowned_at ? "already" : "confirm", t);
  } catch (e) {
    console.error("not-me lookup failed:", e.message);
    return page(res, 500, "error");
  }
};

// POST handles both the button on the page and the mail client's one-click "Unsubscribe" (RFC 8058).
module.exports.confirm = async (req, res) => {
  const body = req.body || {};
  const oneClick = "List-Unsubscribe" in body;
  const t = String(body.t || req.query.t || "");
  if (!TOKEN.test(t)) return oneClick ? res.sendStatus(400) : page(res, 400, "invalid");
  try {
    const r = await Forms.disown(t);
    if (!r) return oneClick ? res.sendStatus(404) : page(res, 404, "invalid");
    if (r.fresh && process.env.EMAIL_USER) {
      const n = adminDisownedNotice({ ref: Forms.ref(r.id), name: r.name, room: r.room, base: seo.baseUrl(req) });
      sendEmail(process.env.EMAIL_USER, n.subject, n.text, { html: n.html });
    }
    return oneClick ? res.status(200).type("text/plain").send("ok") : page(res, 200, r.fresh ? "done" : "already");
  } catch (e) {
    console.error("not-me failed:", e.message);
    return oneClick ? res.sendStatus(500) : page(res, 500, "error");
  }
};
