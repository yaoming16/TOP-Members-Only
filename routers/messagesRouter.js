const { Router } = require("express");
const messagesController = require("../controllers/messagesController");

const messagesRouter = Router();

messagesRouter.get("/", messagesController.getMessages);
messagesRouter.delete("/:messageID/delete", messagesController.deleteMessage);
messagesRouter.post(
  "/add",
  messagesController.addMessageValidation,
  messagesController.addMessage,
);

module.exports = messagesRouter;
