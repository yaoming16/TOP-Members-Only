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
    "INSERT INTO users (name, last_name, email, password, member, admin) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, lastName, email, password, member, admin],
  );
  return rows[0];
}

async function createMessage(messageInfo) {
  const { title, date, message, userId } = messageInfo;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    //Add new message to messages table. We return the id of the created row
    const { rows } = await client.query(
      `
      INSERT INTO messages (title, creation_date, message) VALUES ($1, $2, $3) RETURNING id;
      `,
      [title, date, message],
    );
    const newMessageId = rows[0].id;
    //Add the relation of the message with the user that created it.
    await client.query(
      `
      INSERT INTO users_messages (message_id, user_id) VALUES ($1, $2);
      `,
      [newMessageId, userId],
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function getAllMessages() {
  const { rows } = await pool.query(`
  SELECT
    m.id,
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
  INNER JOIN users AS u ON u.id = um.user_id;
  `);
  return rows;
}

async function getLatestMessages(limit) {
  const { rows } = await pool.query(
    `
  SELECT
    m.id,
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
  INNER JOIN users AS u ON u.id = um.user_id
  ORDER BY creation_date DESC
  LIMIT $1;
  `,
    [limit],
  );
  return rows;
}

async function updateMemberStatus(column, newStatus, memberEmail) {
  // Ensure the column name is safe to prevent SQL injection
  const safeColumn = column === "admin" ? "admin" : "member";

  await pool.query(
    `
    UPDATE users 
    SET ${safeColumn} = $1
    WHERE email = $2 
    `,
    [newStatus, memberEmail],
  );
}

async function deleteMessage(messageID) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    //Delete row from users_messages with message_id messageID
    await client.query(
      `DELETE FROM users_messages
          WHERE message_id = $1`,
      [messageID],
    );

    //Delete row from message table with id messageID
    await client.query(
      `DELETE FROM messages
      WHERE id = $1`,
      [messageID],
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  getUserByUsername,
  getUserById,
  createUser,
  getAllMessages,
  updateMemberStatus,
  deleteMessage,
  createMessage,
  getLatestMessages,
};
