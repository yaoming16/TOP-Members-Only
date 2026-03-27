const db = require("../db/queries");

async function getMessages(req, res) {
  const allMessagesInfo = await db.getAllMessages();
  res.render("messages", {messages: allMessagesInfo});
}

async function deleteMessage(req, res) {
  await db.deleteMessage(req.params.messageID);
  res.status(200).json({msg: `Message with id ${req.params.messageID} was deleted successfully`})
}

module.exports = {
  getMessages,
  deleteMessage
}