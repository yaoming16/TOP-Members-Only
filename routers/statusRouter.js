const { Router } = require("express");
const statusController = require("../controllers/statusController");

const statusRouter = Router();

statusRouter.get("/", statusController.getStatus);
statusRouter.put(
  "/update",
  statusController.statusValidation,
  statusController.updateStatus,
);

module.exports = statusRouter;
