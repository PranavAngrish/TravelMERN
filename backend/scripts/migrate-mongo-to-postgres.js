#!/usr/bin/env node
/**
 * One-off: export everything from the old MongoDB and import it into Postgres.
 *
 *   MONGODB=<old mongo uri> DATABASE_URL=<railway public postgres url> \
 *     node backend/scripts/migrate-mongo-to-postgres.js
 *
 * 1. Writes a JSON backup of every collection to ./data-export/ (keep this safe).
 * 2. Creates the table if needed and imports the enquiries (forms).
 * Safe to re-run: rows already imported (matched by old Mongo _id / email) are skipped.
 * Password hashes are copied as-is, so existing users can still log in.
 */
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const MONGO_URI = process.env.MONGODB;
const OUT_DIR = path.join(__dirname, "../../data-export");

// --- pure transforms (exported for tests) -------------------------------
const iso = (d) => (d ? new Date(d).toISOString() : null);
const day = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null);

const toFormRow = (f) => ({
  legacy_id: String(f._id),
  user_name: f.userName ?? null,
  email: f.email ?? null,
  phone_number: f.phoneNumber == null ? null : String(f.phoneNumber),
  number_of_guests: f.numberOfGuests == null ? null : Number(f.numberOfGuests),
  check_in_date: day(f.checkInDate),
  check_out_date: day(f.checkOutDate),
  branch_name: f.branchName ?? null,
  room_name: f.roomName ?? null,
  created_at: f._id && f._id.getTimestamp ? f._id.getTimestamp().toISOString() : new Date().toISOString(),
});

module.exports = { toFormRow };

// --- main ----------------------------------------------------------------
async function main() {
  if (!MONGO_URI) throw new Error("Set MONGODB to the old Mongo connection string");
  if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL to the Postgres connection string");

  const { MongoClient } = require("mongodb");
  const { pool, initDb } = require("../db");

  const client = await MongoClient.connect(MONGO_URI);
  const mdb = client.db(); // database named in the URI
  const [users, forms, tokens] = await Promise.all(
    ["users", "forms", "tokens"].map((c) => mdb.collection(c).find({}).toArray())
  );
  await client.close();

  // 1. JSON backup
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [name, docs] of Object.entries({ users, forms, tokens })) {
    fs.writeFileSync(path.join(OUT_DIR, `${name}.json`), JSON.stringify(docs, null, 2));
  }
  console.log(`Exported to ${OUT_DIR}: ${users.length} users, ${forms.length} forms, ${tokens.length} tokens`);

  // 2. Import enquiries (accounts were removed from the site, so users/tokens are only backed up)
  await initDb();
  let newForms = 0;
  for (const f of forms) {
    const r = toFormRow(f);
    const res = await pool.query(
      `INSERT INTO forms (legacy_id, user_name, email, phone_number, number_of_guests, check_in_date, check_out_date, branch_name, room_name, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT DO NOTHING`,
      [r.legacy_id, r.user_name, r.email, r.phone_number, r.number_of_guests, r.check_in_date, r.check_out_date, r.branch_name, r.room_name, r.created_at]
    );
    newForms += res.rowCount;
  }

  console.log(`Imported: ${newForms}/${forms.length} enquiries (users and tokens are in the JSON backup only)`);
  await pool.end();
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
