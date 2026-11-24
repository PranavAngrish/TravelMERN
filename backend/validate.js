// Small input helpers. Everything user-supplied goes through these.
const clean = (v, max) =>
  String(v ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

const isEmail = (s) => /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(s) && s.length <= 254;

const isoDate = (s) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const d = new Date(`${s}T00:00:00Z`);
  return Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== s ? null : d;
};

module.exports = { clean, isEmail, isoDate };
