const { validationResult, body } = require("express-validator");

const ADMINPASSCODE = "supercalifragilisticexpialidocious";
const MEMBERPASSCODE = "I am, unfortunately, the Hero of Ages."

const statusValidation = [
  body("passcode").notEmpty().withMessage("Name is required")
  .custom((value) => {
    if (value !== ADMINPASSCODE || value !== MEMBERPASSCODE) {

    }
  })
]

async function getStatus(req, res) {
  res.render("status");
}

module.exports = {
  getStatus,
}