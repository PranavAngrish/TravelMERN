const { Pool } = require("pg");

// Railway provides DATABASE_URL when you add a Postgres service and reference it.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// An idle connection dropping (database restart, network blip) must not crash the whole site.
pool.on("error", (e) => console.error("Database pool error:", e.message));

const schema = `
CREATE TABLE IF NOT EXISTS forms (
  id               SERIAL PRIMARY KEY,
  user_name        TEXT,
  email            TEXT,
  phone_number     TEXT,
  number_of_guests INTEGER,
  check_in_date    DATE,
  check_out_date   DATE,
  branch_name      TEXT,
  room_name        TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  legacy_id        TEXT UNIQUE
);
ALTER TABLE forms ADD COLUMN IF NOT EXISTS message TEXT;
-- Secret link in the guest email ("This wasn't me"), and when the email owner used it
ALTER TABLE forms ADD COLUMN IF NOT EXISTS token TEXT;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS email_disowned_at TIMESTAMPTZ;
CREATE UNIQUE INDEX IF NOT EXISTS forms_token_idx ON forms (token) WHERE token IS NOT NULL;
-- Addresses that must never be emailed again. Stored as SHA-256 hashes, not as addresses.
CREATE TABLE IF NOT EXISTS email_suppressions (
  email_hash TEXT PRIMARY KEY,
  reason     TEXT NOT NULL DEFAULT 'not-me',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

const initDb = () => pool.query(schema);

module.exports = { pool, initDb, schema };
