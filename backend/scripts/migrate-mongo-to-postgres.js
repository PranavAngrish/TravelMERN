#!/usr/bin/env node
/**
 * One-off: export everything from the old MongoDB and import it into Postgres.
 *
 *   MONGODB=<old mongo uri> DATABASE_URL=<railway public postgres url> \
 *     node backend/scripts/migrate-mongo-to-postgres.js
 *
 * 1. Writes a JSON backup of every collection to ./data-export/ (keep this safe).
 * 2. Creates the tables if needed and inserts users, forms and live tokens.
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

const toUserRow = (u) => ({
  legacy_id: String(u._id),
  user_name: u.userName,
  email: u.email,
  password: u.password,
  verified: Boolean(u.verified),
  profile_picture: u.profilePicture || null,
  created_at: iso(u.createdAt) || new Date().toISOString(),
  updated_at: iso(u.updatedAt) || iso(u.createdAt) || new Date().toISOString(),
});

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

const isLiveToken = (t, now = Date.now()) => t.createdAt && now - new Date(t.createdAt).getTime() < 3600 * 1000;

module.exports = { toUserRow, toFormRow, isLiveToken };

// --- main ----------------------------------------------------------------
async function main() {
  if (!MONGO_URI) throw new Error("Set MONGODB to the old Mongo connection string");
  if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL to the Postgres connection string");

  const { MongoClient } = require("mongodb");
  const { pool, initDb, DEFAULT_PIC } = require("../db");

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

  // 2. Import
  await initDb();
  const idMap = new Map(); // mongo user _id -> new postgres id
  let newUsers = 0, newForms = 0;

  for (const u of users) {
    const r = toUserRow(u);
    const res = await pool.query(
      `INSERT INTO users (legacy_id, user_name, email, password, verified, profile_picture, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,COALESCE($6, $9),$7,$8)
       ON CONFLICT DO NOTHING RETURNING id`,
      [r.legacy_id, r.user_name, r.email, r.password, r.verified, r.profile_picture, r.created_at, r.updated_at, DEFAULT_PIC]
    );
    if (res.rowCount) newUsers++;
    const found = await pool.query("SELECT id FROM users WHERE legacy_id = $1 OR email = $2 LIMIT 1", [r.legacy_id, r.email]);
    if (found.rows[0]) idMap.set(String(u._id), found.rows[0].id);
  }

  for (const f of forms) {
    const r = toFormRow(f);
    const res = await pool.query(
      `INSERT INTO forms (legacy_id, user_name, email, phone_number, number_of_guests, check_in_date, check_out_date, branch_name, room_name, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT DO NOTHING`,
      [r.legacy_id, r.user_name, r.email, r.phone_number, r.number_of_guests, r.check_in_date, r.check_out_date, r.branch_name, r.room_name, r.created_at]
    );
    newForms += res.rowCount;
  }

  let newTokens = 0;
  for (const t of tokens.filter((t) => isLiveToken(t))) {
    const uid = idMap.get(String(t.userId));
    if (!uid) continue;
    const res = await pool.query(
      `INSERT INTO tokens (user_id, token, created_at) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`,
      [uid, t.token, iso(t.createdAt)]
    );
    newTokens += res.rowCount;
  }

  console.log(`Imported: ${newUsers}/${users.length} users, ${newForms}/${forms.length} forms, ${newTokens} live tokens`);
  await pool.end();
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
