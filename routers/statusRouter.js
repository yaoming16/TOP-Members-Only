const { Router } = require("express");
const statusController = require("../controllers/statusController");

const statusRouter = Router();

statusRouter.get("/", statusController.getStatus);

module.exports = statusRouter;
