const pool = require("../db/pool");

async function getUserByUsername(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
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

async function getAllMessages() {
  const {rows} = await pool.query(`
  SELECT
    m.title,
    m.creation_date,
    m.message,
    u.name,
    u.last_name,
    u.email,
    u.password,
    u.member,
    u.admin
  FROM messages AS m
  INNER JOIN users_messages AS um ON um.message_id = m.id 
  INNER JOIN users AS u ON u.id = um.user_id;`)
return rows;
}

module.exports = {
  getUserByUsername,
  getUserById,
  createUser,
  getAllMessages,
};
