const { pool, DEFAULT_PIC } = require("../db");

// Shape sent to the frontend (never includes the password hash)
const toPublic = (r) =>
  r && {
    _id: r.id,
    id: r.id,
    userName: r.user_name,
    email: r.email,
    verified: r.verified,
    profilePicture: r.profile_picture,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };

const findByEmail = async (email) =>
  (await pool.query("SELECT * FROM users WHERE email = $1", [email])).rows[0];

const findById = async (id) =>
  (await pool.query("SELECT * FROM users WHERE id = $1", [id])).rows[0];

// Throws a pg error with code 23505 (+ constraint) on duplicate email/userName
const create = async ({ userName, email, password, profilePicture, verified = false }) =>
  (
    await pool.query(
      `INSERT INTO users (user_name, email, password, verified, profile_picture)
       VALUES ($1, $2, $3, $4, COALESCE($5, $6))
       RETURNING *`,
      [userName, email, password, verified, profilePicture || null, DEFAULT_PIC]
    )
  ).rows[0];

const markVerified = (id) =>
  pool.query("UPDATE users SET verified = TRUE, updated_at = NOW() WHERE id = $1", [id]);

const deleteUnverifiedOlderThan = async (date) =>
  (await pool.query("DELETE FROM users WHERE verified = FALSE AND created_at < $1", [date])).rowCount;

module.exports = { toPublic, findByEmail, findById, create, markVerified, deleteUnverifiedOlderThan };
