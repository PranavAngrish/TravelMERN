const { Pool } = require("pg");

// Railway provides DATABASE_URL when you add a Postgres service and reference it.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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
`;

const initDb = () => pool.query(schema);

module.exports = { pool, initDb, schema };
