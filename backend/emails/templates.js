"use strict";
const { site, C, FONT, SERIF, esc, raw, logoUrl, button, ghostButton, rows, para, h1, h2, callout, shell } = require("./layout");

// Matches shared/policies.json (Terms: check-in 13:00, check-out 11:00)
const CHECK_IN_TIME = "from 1:00 PM";
const CHECK_OUT_TIME = "by 11:00 AM";

const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const nightsLabel = (n) => `${n} night${n === 1 ? "" : "s"}`;
const nightsBetween = (a, b) => Math.round((new Date(`${b}T00:00:00Z`) - new Date(`${a}T00:00:00Z`)) / 86400000);

// Digits only. A bare 10-digit number is assumed to be Indian.
const waDigits = (phone) => {
  let d = String(phone).replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  if (d.length === 10) d = "91" + d;
  return d;
};
const telHref = (phone) => "tel:" + String(phone).replace(/[^0-9+]/g, "");

/* ---------------------------------------------------------------- guest */

function guestConfirmation(d) {
  // d: { name, ref, room, checkIn, checkOut, guests, phone, base, notMeUrl }
  const first = d.name.split(" ")[0];
  const nights = nightsBetween(d.checkIn, d.checkOut);
  const waUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello Mid Orchard, my enquiry reference is ${d.ref}.`)}`;
  const subject = `We received your enquiry (${d.ref}) | Mid Orchard Kasol`;

  // The visitor's free-text message is deliberately NOT echoed back: this email goes to an
  // address the form submitter typed, so repeating their text would let anyone use us to send it.
  const body = [
    h1(`Thank you, ${first}`),
    para(`We have received your enquiry and our team will contact you on <strong>${esc(d.phone)}</strong> soon. Here is a copy of what you sent us.`),
    rows([
      ["Reference", d.ref],
      ["Room", d.room],
      ["Check-in", raw(`${esc(fmtDate(d.checkIn))}<br><span style="font:normal 13px/1.4 ${FONT};color:${C.muted}">${CHECK_IN_TIME}</span>`)],
      ["Check-out", raw(`${esc(fmtDate(d.checkOut))}<br><span style="font:normal 13px/1.4 ${FONT};color:${C.muted}">${CHECK_OUT_TIME}</span>`)],
      ["Length of stay", nightsLabel(nights)],
      ["Guests", String(d.guests)],
    ]),
    callout(
      `<strong>This is an acknowledgement, not a confirmed booking.</strong> Your dates are not reserved until our team confirms availability and your booking is confirmed under our <a href="${esc(d.base)}/policies" style="color:${C.warn}">booking policies</a>.`,
      { bg: C.warnBg, border: C.warnLine, color: C.warn }
    ),
    h2("What happens next"),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${[
      "We check availability for your dates.",
      `Our team contacts you on ${esc(d.phone)} (call or WhatsApp) with rates and payment options.`,
      "Your booking is confirmed once the payment steps are completed.",
    ]
      .map(
        (t, i) =>
          `<tr><td width="30" valign="top" style="padding:4px 0"><div style="width:24px;height:24px;line-height:24px;border-radius:12px;background:${C.tealSoft};color:${C.teal};text-align:center;font:bold 13px/24px ${FONT}">${i + 1}</div></td><td valign="top" style="padding:4px 0 8px;font:15px/1.5 ${FONT};color:${C.ink}">${t}</td></tr>`
      )
      .join("")}</table>`,
    `<div style="margin-top:22px">${para("Need a faster reply? Message us directly:", "margin-bottom:12px")}${button(waUrl, "Chat on WhatsApp", C.wa)}${button(`tel:${site.phones[0].tel}`, `Call ${site.phones[0].display}`, C.navy)}</div>`,
    callout(
      `<strong style="font-size:14px;color:${C.navy}">Didn't make this enquiry?</strong><br>Someone may have typed your email address by mistake. No action is needed from you, but you can tell us and we will remove your email address from this enquiry and not email you again.<div style="margin-top:12px">${ghostButton(d.notMeUrl, "This wasn't me")}</div>`
    ),
  ].join("");

  const html = shell({
    title: subject,
    preheader: `Enquiry ${d.ref}: ${d.room}, ${fmtDate(d.checkIn)} to ${fmtDate(d.checkOut)}. This is not yet a confirmed booking.`,
    body,
    base: d.base,
    footerNote: `You are receiving this one-time message because an enquiry was submitted on ${esc(d.base.replace(/^https?:\/\//, ""))} using this email address. You have not been added to any mailing list. Please do not share this email, as it contains a private link.`,
  });

  const text = [
    `Hello ${first},`,
    ``,
    `Thank you for your enquiry. Our team will contact you on ${d.phone} soon.`,
    ``,
    `Reference:      ${d.ref}`,
    `Room:           ${d.room}`,
    `Check-in:       ${fmtDate(d.checkIn)} (${CHECK_IN_TIME})`,
    `Check-out:      ${fmtDate(d.checkOut)} (${CHECK_OUT_TIME})`,
    `Length of stay: ${nightsLabel(nights)}`,
    `Guests:         ${d.guests}`,
    ``,
    `This is an acknowledgement, not a confirmed booking. Your dates are not reserved until our team confirms availability and your booking is confirmed under our booking policies: ${d.base}/policies`,
    ``,
    `Faster reply: WhatsApp ${site.whatsappDisplay} (${waUrl}) or call ${site.phones[0].display}.`,
    ``,
    `Didn't make this enquiry? Someone may have typed your email by mistake. Tell us and we will remove your email address and not email you again:`,
    d.notMeUrl,
    ``,
    `Warm regards,`,
    `${site.fullName}`,
    `${site.address.text}`,
  ].join("\n");

  return { subject, html, text };
}

/* ---------------------------------------------------------------- admin */

const GUEST_EMAIL_STATUS = {
  sent: "Confirmation email sent to the guest",
  failed: "Confirmation email could not be sent (check Resend logs)",
  "no-email": "No email given, so no confirmation was sent",
  suppressed: "Not sent: this address was previously reported as \"not me\"",
  skipped: "Not sent: could not check the opt-out list",
};

function adminNotification(d) {
  // d: { id, ref, name, phone, email, room, guests, checkIn, checkOut, message, receivedAt, guestEmail, base }
  const nights = nightsBetween(d.checkIn, d.checkOut);
  const when = (d.receivedAt || new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";
  const wa = `https://wa.me/${waDigits(d.phone)}?text=${encodeURIComponent(`Hello ${d.name.split(" ")[0]}, this is Mid Orchard, Kasol. Thank you for your enquiry (${d.ref}).`)}`;
  const subject = `New enquiry ${d.ref}: ${d.name}, ${d.room}, ${d.checkIn} to ${d.checkOut}`;
  const status = GUEST_EMAIL_STATUS[d.guestEmail] || "";

  const body = [
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px"><tr><td style="background:${C.navy};border-radius:10px;padding:18px 20px"><div style="font:bold 12px/1 ${FONT};letter-spacing:.08em;text-transform:uppercase;color:#7FD3DF">New website enquiry</div><div style="margin-top:8px;font:normal 22px/1.25 ${SERIF};color:#ffffff">${esc(d.room)}</div><div style="margin-top:6px;font:14px/1.5 ${FONT};color:#C9D3DD">${esc(fmtDate(d.checkIn))} &rarr; ${esc(fmtDate(d.checkOut))} &nbsp;&middot;&nbsp; ${esc(nightsLabel(nights))} &nbsp;&middot;&nbsp; ${esc(String(d.guests))} guest${d.guests === 1 ? "" : "s"}</div></td></tr></table>`,
    h2("Guest"),
    rows([
      ["Name", d.name],
      ["Phone / WhatsApp", raw(`<a href="${esc(telHref(d.phone))}" style="color:${C.teal};text-decoration:none">${esc(d.phone)}</a>`)],
      d.email ? ["Email (not verified)", raw(`<a href="mailto:${esc(d.email)}" style="color:${C.teal};text-decoration:none">${esc(d.email)}</a>`)] : ["Email", "Not provided"],
      ["Reference", d.ref],
      ["Received", when],
    ]),
    d.message
      ? h2("Message") + `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${C.mist};border-left:4px solid ${C.teal};padding:14px 16px;font:15px/1.6 ${FONT};color:${C.ink};white-space:pre-wrap">${esc(d.message)}</td></tr></table>`
      : "",
    `<div style="margin-top:26px">${button(wa, "WhatsApp guest", C.wa)}${button(telHref(d.phone), "Call guest", C.navy)}${
      d.email ? button(`mailto:${d.email}?subject=${encodeURIComponent(`Your enquiry ${d.ref} | Mid Orchard Kasol`)}`, "Reply by email") : ""
    }</div>`,
    status ? callout(esc(status), { bg: C.tealSoft, border: "#BFE3E7", color: C.navy }) : "",
  ].join("");

  const html = shell({
    title: subject,
    preheader: `${d.name} (${d.phone}) wants ${d.room}, ${fmtDate(d.checkIn)} to ${fmtDate(d.checkOut)}, ${d.guests} guest(s).`,
    body,
    base: d.base,
    footerNote: `Internal notification. Stored in the database as enquiry #${esc(String(d.id))}. Details were typed by a website visitor and have not been verified.`,
  });

  const text = [
    `NEW ENQUIRY ${d.ref}`,
    ``,
    `Name:      ${d.name}`,
    `Phone:     ${d.phone}`,
    `Email:     ${d.email || "-"} (not verified)`,
    `Room:      ${d.room}`,
    `Guests:    ${d.guests}`,
    `Check-in:  ${fmtDate(d.checkIn)}`,
    `Check-out: ${fmtDate(d.checkOut)} (${nightsLabel(nights)})`,
    `Received:  ${when}`,
    `Message:   ${d.message || "-"}`,
    ``,
    `WhatsApp guest: ${wa}`,
    status ? `\n${status}` : "",
  ].join("\n");

  return { subject, html, text };
}

function adminDisownedNotice(d) {
  // d: { ref, name, room, base }
  const subject = `Guest says "not me": enquiry ${d.ref}`;
  const body = [
    h1("Email address removed"),
    para(`The person who received the confirmation for enquiry <strong>${esc(d.ref)}</strong> (${esc(d.name)}, ${esc(d.room)}) said they did not make it. Their email address has been deleted from the enquiry and added to the do-not-email list.`),
    para("The phone number and dates are still on file. The enquiry may be a typo, a prank or spam, so check before spending time on it."),
  ].join("");
  const html = shell({ title: subject, preheader: `Enquiry ${d.ref} was reported as not made by the email owner.`, body, base: d.base, footerNote: "Internal notification." });
  const text = `Enquiry ${d.ref} (${d.name}, ${d.room}): the email owner said they did not make it. Their email was deleted from the enquiry and added to the do-not-email list. The phone number and dates are still on file; it may be a typo, prank or spam.`;
  return { subject, html, text };
}

/* ---------------------------------------------------------- web page for the "not me" link */

const PAGES = {
  confirm: { title: "Remove my email address", text: "Press the button to confirm that you did not make this enquiry. We will delete your email address from it and will not email you again.", form: true },
  done: { title: "Done, thank you", text: "Your email address has been removed from the enquiry and we will not email you again. You do not need to do anything else." },
  already: { title: "Already done", text: "Your email address was already removed, and we will not email you again." },
  invalid: { title: "This link isn't valid", text: `The link may be incomplete or already used. If you still receive emails from us that you did not ask for, write to ${site.email}.` },
  error: { title: "Something went wrong", text: `We could not process this just now. Please try again in a few minutes or write to ${site.email}.` },
};

function statusPage(state, token = "") {
  const p = PAGES[state] || PAGES.error;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><title>${esc(p.title)} | ${esc(site.name)}</title></head>
<body style="margin:0;background:${C.mist};font-family:${FONT};color:${C.ink}">
<div style="max-width:480px;margin:48px auto;padding:0 16px">
<div style="background:#fff;border:1px solid ${C.line};border-top:6px solid ${C.teal};border-radius:12px;padding:32px 28px;text-align:center">
<img src="${esc(logoUrl(216))}" width="72" alt="Mid Orchard logo" style="width:72px;height:auto">
<h1 style="margin:16px 0 12px;font:normal 24px/1.3 ${SERIF};color:${C.navy}">${esc(p.title)}</h1>
<p style="margin:0 0 20px;font-size:15px;line-height:1.6">${esc(p.text)}</p>
${p.form ? `<form method="post" action="/enquiry/not-me"><input type="hidden" name="t" value="${esc(token)}"><button type="submit" style="background:${C.teal};color:#fff;border:0;border-radius:8px;padding:13px 22px;font:bold 15px ${FONT};cursor:pointer">Yes, remove my email</button></form>` : ""}
<p style="margin:24px 0 0;font-size:12px;color:${C.muted}">${esc(site.fullName)}, ${esc(site.address.text)}</p>
</div></div></body></html>`;
}

module.exports = { guestConfirmation, adminNotification, adminDisownedNotice, statusPage };
