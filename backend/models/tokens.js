const { pool } = require("../db");

const TTL_SECONDS = 3600; // verification links expire after 1 hour

const create = async (userId, token) =>
  pool.query(
    `INSERT INTO tokens (user_id, token) VALUES ($1, $2)
     ON CONFLICT (user_id) DO UPDATE SET token = EXCLUDED.token, created_at = NOW()`,
    [userId, token]
  );

const find = async (userId, token) =>
  (
    await pool.query(
      `SELECT * FROM tokens WHERE user_id = $1 AND token = $2
       AND created_at > NOW() - make_interval(secs => $3)`,
      [userId, token, TTL_SECONDS]
    )
  ).rows[0];

const remove = (userId) => pool.query("DELETE FROM tokens WHERE user_id = $1", [userId]);

const deleteExpired = () =>
  pool.query("DELETE FROM tokens WHERE created_at < NOW() - make_interval(secs => $1)", [TTL_SECONDS]);

module.exports = { create, find, remove, deleteExpired };
