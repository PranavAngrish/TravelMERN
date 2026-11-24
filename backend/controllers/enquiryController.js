const Forms = require("../models/forms");
const sendEmail = require("../Utils/sendEmail");
const { clean, isEmail, isoDate } = require("../validate");
const site = require("../../shared/site.json");
const seo = require("../seo");
const { guestConfirmation, adminNotification } = require("../emails/templates");

const ROOMS = new Map(site.rooms.map((r) => [r.slug, r.name]));
const DAY = 86400000;

const fail = (res, message) => res.status(400).json({ ok: false, message });

module.exports.submitEnquiry = async (req, res) => {
  const b = req.body || {};

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (clean(b.website, 50)) return res.status(201).json({ ok: true });

  const name = clean(b.name, 80);
  const phone = clean(b.phone, 25);
  const email = clean(b.email, 254).toLowerCase();
  const roomSlug = clean(b.room, 60);
  const message = clean(b.message, 600);
  const guests = Number.parseInt(b.guests, 10);
  const checkIn = isoDate(clean(b.checkIn, 10));
  const checkOut = isoDate(clean(b.checkOut, 10));
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) return fail(res, "Please enter your name.");
  if (!/^[0-9+()\-\s]+$/.test(phone) || digits.length < 8 || digits.length > 15)
    return fail(res, "Please enter a valid phone number.");
  if (email && !isEmail(email)) return fail(res, "Please enter a valid email address.");
  if (roomSlug && !ROOMS.has(roomSlug)) return fail(res, "Please choose a room from the list.");
  if (!Number.isInteger(guests) || guests < 1 || guests > 20) return fail(res, "Guests must be between 1 and 20.");
  if (!checkIn || !checkOut) return fail(res, "Please choose your check-in and check-out dates.");
  if (checkIn.getTime() < Date.now() - 2 * DAY) return fail(res, "Check-in can't be in the past.");
  const nights = Math.round((checkOut - checkIn) / DAY);
  if (nights < 1) return fail(res, "Check-out must be after check-in.");
  if (nights > 60) return fail(res, "For stays longer than 60 nights, please message us on WhatsApp.");

  const data = {
    name,
    phone,
    email: email || null,
    guests,
    checkIn: clean(b.checkIn, 10),
    checkOut: clean(b.checkOut, 10),
    branch: "Kasol",
    room: roomSlug ? ROOMS.get(roomSlug) : "Not sure yet",
    message: message || null,
  };

  const token = Forms.newToken();
  let saved;
  try {
    saved = await Forms.create({ ...data, token });
  } catch (e) {
    console.error("Enquiry save failed:", e);
    return res.status(500).json({ ok: false, message: "We couldn't save your enquiry. Please message us on WhatsApp instead." });
  }

  // The enquiry is safely stored. Answer now; email in the background so a slow
  // or blocked mail server can never make the form hang or fail.
  res.status(201).json({ ok: true });
  notify(data, saved.id, token, seo.baseUrl(req)).catch((e) => console.error("Notification failed:", e.message));
};

async function notify(data, id, token, base) {
  const ref = Forms.ref(id);
  const replyTo = process.env.EMAIL_USER || site.email;

  // 1. Guest confirmation (skipped if no email, or the address was reported "not me" before)
  let guestEmail = "no-email";
  if (data.email) {
    try {
      if (await Forms.isSuppressed(data.email)) guestEmail = "suppressed";
      else {
        const notMeUrl = `${base}/enquiry/not-me?t=${token}`;
        const g = guestConfirmation({ ...data, ref, base, notMeUrl });
        const ok = await sendEmail(data.email, g.subject, g.text, {
          html: g.html,
          replyTo,
          headers: {
            // Shows an "Unsubscribe" option in Gmail/Apple Mail and lets them report a wrong address in one tap
            "List-Unsubscribe": `<${base}/enquiry/not-me?t=${token}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        });
        guestEmail = ok ? "sent" : "failed";
      }
    } catch (e) {
      console.error("Guest email step failed:", e.message);
      guestEmail = "skipped";
    }
  }

  // 2. Notification to the hotel inbox
  const a = adminNotification({ ...data, id, ref, base, receivedAt: new Date(), guestEmail });
  await sendEmail(process.env.EMAIL_USER, a.subject, a.text, { html: a.html, replyTo: data.email || undefined });
}
