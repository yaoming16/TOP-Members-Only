const db = require("../db/queries");

async function getMessages(req, res) {
  const allMessagesInfo = await db.getAllMessages();
  res.render("messages", {messages: allMessagesInfo});
}

module.exports = {
  getMessages,
}