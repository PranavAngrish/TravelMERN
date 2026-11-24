const nodemailer = require("nodemailer");

const TIMEOUT_MS = 10000;
let transporter;

const smtp = () => {
  if (!transporter) {
    const port = Number(process.env.EMAIL_PORT) || 587;
    transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port,
      secure: port === 465, // 587/25 upgrade with STARTTLS automatically
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      connectionTimeout: TIMEOUT_MS,
      greetingTimeout: TIMEOUT_MS,
      socketTimeout: TIMEOUT_MS,
    });
  }
  return transporter;
};

// Plain HTTPS API. Use this on hosts that block SMTP ports (Railway Hobby/Trial do).
const viaResend = async ({ to, subject, text, html, replyTo, headers }) => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: [to],
      subject,
      text,
      ...(html ? { html } : {}),
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(headers ? { headers } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
};

/**
 * Never throws. Resolves true if the mail was handed off, false otherwise.
 * `text` is always sent (plain-text alternative); `html` is the styled version.
 */
module.exports = async (to, subject, text, { html, replyTo, headers } = {}) => {
  try {
    if (!to) {
      console.warn("Email skipped (no recipient):", subject);
      return false;
    }
    if (process.env.RESEND_API_KEY) {
      await viaResend({ to, subject, text, html, replyTo, headers });
    } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await smtp().sendMail({ from: process.env.EMAIL_FROM || process.env.EMAIL_USER, to, subject, text, html, replyTo, headers });
    } else {
      console.warn("Email not configured; skipped:", subject);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Email failed:", subject, "-", error.message);
    return false;
  }
};
