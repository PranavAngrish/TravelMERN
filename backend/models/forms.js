const crypto = require("crypto");
const { pool } = require("../db");

// Suppression list stores hashes, so an address that asked to be forgotten is not kept in readable form.
const hash = (email) => crypto.createHash("sha256").update(String(email).trim().toLowerCase()).digest("hex");
const newToken = () => crypto.randomBytes(24).toString("hex"); // 48 hex chars, 192 bits
const ref = (id) => `MO-${String(id).padStart(5, "0")}`;

const create = async (f) =>
  (
    await pool.query(
      `INSERT INTO forms (user_name, email, phone_number, number_of_guests, check_in_date, check_out_date, branch_name, room_name, message, token)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      [f.name, f.email, f.phone, f.guests, f.checkIn, f.checkOut, f.branch, f.room, f.message, f.token]
    )
  ).rows[0];

const isSuppressed = async (email) =>
  (await pool.query("SELECT 1 FROM email_suppressions WHERE email_hash = $1", [hash(email)])).rowCount > 0;

const findByToken = async (token) =>
  (await pool.query("SELECT id, email_disowned_at FROM forms WHERE token = $1", [token])).rows[0] || null;

/** "This wasn't me": delete the email from the enquiry and never email that address again. */
const disown = async (token) => {
  const c = await pool.connect();
  try {
    await c.query("BEGIN");
    const { rows } = await c.query("SELECT id, email, email_disowned_at, user_name, room_name FROM forms WHERE token = $1 FOR UPDATE", [token]);
    const row = rows[0];
    if (!row) {
      await c.query("ROLLBACK");
      return null;
    }
    if (row.email_disowned_at) {
      await c.query("COMMIT");
      return { id: row.id, fresh: false };
    }
    if (row.email) await c.query("INSERT INTO email_suppressions (email_hash) VALUES ($1) ON CONFLICT DO NOTHING", [hash(row.email)]);
    await c.query("UPDATE forms SET email = NULL, email_disowned_at = NOW() WHERE id = $1", [row.id]);
    await c.query("COMMIT");
    return { id: row.id, fresh: true, name: row.user_name, room: row.room_name };
  } catch (e) {
    await c.query("ROLLBACK").catch(() => {});
    throw e;
  } finally {
    c.release();
  }
};

module.exports = { create, isSuppressed, findByToken, disown, newToken, ref };
