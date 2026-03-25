const pool = require("../db/pool");

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function createUser(userData) {
  const { name, lastName, email, password, member, admin } = userData;
  const { rows } = await pool.query(
    "INSERT INTO users (name, last_name, email, password, member, admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, lastName, email, password, member, admin],
  );
  return rows[0];
}

module.exports = {
  getUserByUsername,
  getUserById,
  createUser,
};
