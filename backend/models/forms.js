const { pool } = require("../db");

const create = async (f) =>
  (
    await pool.query(
      `INSERT INTO forms (user_name, email, phone_number, number_of_guests, check_in_date, check_out_date, branch_name, room_name, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
      [f.name, f.email, f.phone, f.guests, f.checkIn, f.checkOut, f.branch, f.room, f.message]
    )
  ).rows[0];

module.exports = { create };
