const { validationResult, body } = require("express-validator");
const db = require("../db/queries");

const addMessageValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("message").notEmpty().withMessage("Message is required"),
];

async function getMessages(req, res) {
  const allMessagesInfo = await db.getAllMessages();
  res.render("messages", { messages: allMessagesInfo });
}

async function addMessage(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  await db.createMessage({
    title: req.body.title,
    message: req.body.message,
    date: new Date(),
    userId: req.user.id,
  });

  res.status(201).json({ msg: "Message created correctly" });
}

async function deleteMessage(req, res) {
  await db.deleteMessage(req.params.messageID);
  res.status(200).json({
    msg: `Message with id ${req.params.messageID} was deleted successfully`,
  });
}

module.exports = {
  addMessageValidation,
  getMessages,
  deleteMessage,
  addMessage,
};
