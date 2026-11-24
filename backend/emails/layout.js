"use strict";
// Shared building blocks for every email. Email clients ignore most modern CSS,
// so this is table-based with inline styles and system fonts on purpose.
const site = require("../../shared/site.json");

const C = {
  navy: "#0F1A29",
  teal: "#0E7C86",
  tealSoft: "#E6F4F5",
  mist: "#F2F6F7",
  ink: "#14202E",
  muted: "#5B6776",
  line: "#E3E9EC",
  wa: "#0F7A40",
  warn: "#7A5200",
  warnBg: "#FFF6E0",
  warnLine: "#F1D9A0",
};
const FONT = "Arial,Helvetica,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

// Every piece of visitor-supplied text must pass through esc() before it goes into HTML.
const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Marks a string as already-safe HTML (built by us, from escaped parts).
const raw = (html) => ({ raw: html });
const val = (v) => (v && typeof v === "object" && "raw" in v ? v.raw : esc(v));

// PNG renders everywhere (Gmail and Outlook do not show SVG or WebP reliably).
const logoUrl = (w) => site.logo.replace("/upload/", `/upload/f_png,q_auto,w_${w}/`);

const button = (href, label, bg = C.teal) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;margin:0 8px 10px 0"><tr><td bgcolor="${bg}" style="border-radius:8px"><a href="${esc(href)}" target="_blank" rel="noopener" style="display:inline-block;padding:13px 22px;font:bold 15px/1 ${FONT};color:#ffffff;text-decoration:none;border-radius:8px">${esc(label)}</a></td></tr></table>`;

const ghostButton = (href, label) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;margin:0 8px 6px 0"><tr><td style="border:1px solid ${C.teal};border-radius:8px"><a href="${esc(href)}" target="_blank" rel="noopener" style="display:inline-block;padding:10px 18px;font:bold 14px/1 ${FONT};color:${C.teal};text-decoration:none;border-radius:8px">${esc(label)}</a></td></tr></table>`;

const rows = (items) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">${items
    .filter(Boolean)
    .map(
      ([k, v]) =>
        `<tr><td width="36%" valign="top" style="padding:10px 12px 10px 0;border-bottom:1px solid ${C.line};font:13px/1.45 ${FONT};color:${C.muted}">${esc(k)}</td><td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.line};font:bold 15px/1.45 ${FONT};color:${C.ink}">${val(v)}</td></tr>`
    )
    .join("")}</table>`;

const para = (html, extra = "") => `<p style="margin:0 0 16px;font:15px/1.6 ${FONT};color:${C.ink};${extra}">${html}</p>`;
const h1 = (text) => `<h1 style="margin:0 0 14px;font:normal 26px/1.25 ${SERIF};color:${C.navy}">${esc(text)}</h1>`;
const h2 = (text) => `<h2 style="margin:28px 0 10px;font:bold 15px/1.3 ${FONT};color:${C.navy};text-transform:uppercase;letter-spacing:.06em">${esc(text)}</h2>`;
const callout = (html, { bg = C.mist, border = C.line, color = C.ink } = {}) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0"><tr><td style="background:${bg};border:1px solid ${border};border-radius:10px;padding:16px 18px;font:14px/1.55 ${FONT};color:${color}">${html}</td></tr></table>`;

/**
 * Wraps body HTML in the branded shell: logo header, contact footer, hidden preheader.
 * opts: { title, preheader, body, footerNote, base }
 */
function shell({ title, preheader, body, footerNote = "", base }) {
  const host = base ? base.replace(/^https?:\/\//, "") : "";
  const phone = site.phones[0];
  const filler = "&nbsp;&zwnj;".repeat(40);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(title)}</title>
<style>@media only screen and (max-width:620px){.container{width:100%!important;border-radius:0!important}.px{padding-left:20px!important;padding-right:20px!important}}</style>
</head>
<body style="margin:0;padding:0;background:${C.mist};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px">${esc(preheader)}${filler}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.mist}">
<tr><td align="center" style="padding:24px 12px">
  <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid ${C.line};border-radius:12px;overflow:hidden">
    <tr><td style="height:6px;line-height:6px;font-size:0;background:${C.teal}">&nbsp;</td></tr>
    <tr><td class="px" align="center" style="padding:26px 32px 18px">
      <img src="${esc(logoUrl(216))}" width="72" alt="Mid Orchard logo" style="display:block;border:0;outline:none;width:72px;height:auto;margin:0 auto 10px">
      <div style="font:normal 20px/1.3 ${SERIF};color:${C.navy}">${esc(site.fullName)}</div>
      <div style="margin-top:4px;font:12px/1.4 ${FONT};color:${C.muted}">${esc(site.tagline)}</div>
    </td></tr>
    <tr><td class="px" style="padding:8px 32px 28px;border-top:1px solid ${C.line}">
      <div style="height:20px;line-height:20px;font-size:0">&nbsp;</div>
      ${body}
    </td></tr>
    <tr><td class="px" style="padding:22px 32px;background:${C.navy};font:12px/1.65 ${FONT};color:#C9D3DD">
      <strong style="color:#ffffff">${esc(site.fullName)}</strong><br>
      ${esc(site.address.text)}<br>
      <a href="tel:${esc(phone.tel)}" style="color:#C9D3DD;text-decoration:none">${esc(phone.display)}</a> &nbsp;|&nbsp;
      <a href="mailto:${esc(site.email)}" style="color:#C9D3DD;text-decoration:underline">${esc(site.email)}</a>${
        host ? ` &nbsp;|&nbsp; <a href="${esc(base)}" style="color:#C9D3DD;text-decoration:underline">${esc(host)}</a>` : ""
      }
      ${footerNote ? `<div style="margin-top:14px;padding-top:14px;border-top:1px solid #2A3A4F;color:#9FB0C2">${footerNote}</div>` : ""}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

module.exports = { site, C, FONT, SERIF, esc, raw, val, logoUrl, button, ghostButton, rows, para, h1, h2, callout, shell };
