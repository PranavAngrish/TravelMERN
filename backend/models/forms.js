const { pool } = require("../db");

const create = async (f) =>
  (
    await pool.query(
      `INSERT INTO forms (user_name, email, phone_number, number_of_guests, check_in_date, check_out_date, branch_name, room_name)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [f.userName, f.email, f.phoneNumber, f.numberOfGuests || null, f.checkInDate, f.checkOutDate, f.branchName, f.roomName]
    )
  ).rows[0];

module.exports = { create };
