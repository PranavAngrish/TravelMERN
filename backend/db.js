const { Pool } = require("pg");

// Railway provides DATABASE_URL when you add a Postgres service and reference it.
const DEFAULT_PIC =
  "https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const schema = `
CREATE TABLE IF NOT EXISTS users (
  id              SERIAL PRIMARY KEY,
  user_name       TEXT NOT NULL UNIQUE,
  email           TEXT NOT NULL UNIQUE,
  password        TEXT NOT NULL,
  verified        BOOLEAN NOT NULL DEFAULT FALSE,
  profile_picture TEXT NOT NULL DEFAULT '${DEFAULT_PIC}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  legacy_id       TEXT UNIQUE            -- old MongoDB _id, set only by the migration
);

CREATE TABLE IF NOT EXISTS tokens (
  user_id    INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  token      TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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
`;

const initDb = () => pool.query(schema);

module.exports = { pool, initDb, schema, DEFAULT_PIC };
