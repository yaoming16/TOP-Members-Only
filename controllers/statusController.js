const { validationResult, body } = require("express-validator");
const db = require("../db/queries");

const ADMINPASSCODE = "supercalifragilisticexpialidocious";
const MEMBERPASSCODE = "I am, unfortunately, the Hero of Ages";

const statusValidation = [
  body("passcode")
    .notEmpty()
    .withMessage("Name is required")
    .custom((value) => {
      if (value !== ADMINPASSCODE && value !== MEMBERPASSCODE) {
        throw new Error("Passcode is wrong");
      }
      return true;
    }),
];

async function getStatus(req, res) {
  res.render("status");
}

async function updateStatus(req, res) {
  //If no logged in user throw error
  if (!req.user) {
    return res
      .status(401)
      .json({errors:[{ msg: "Please log in before changing status", path: "passcode" }]});
  }

  //Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const passcodeInput = req.body.passcode;

  //Check trying admin before being a member
  if (passcodeInput === ADMINPASSCODE && !req.user.member) {
    return res
      .status(403)
      .json({ errors: [{msg:"You can't be an Administrator before being a member", path: "passcode"}] });
  }

  //If we are here column should be ADMINPASSCODE or MEMBERPASSCODE. If it wasnt an error would have been thrown above
  const column = passcodeInput === ADMINPASSCODE ? "admin" : "member";
  await db.updateMemberStatus(column, true, req.user.email);

  res.status(200).json({ message: "Status updated successfully" });
}

module.exports = {
  statusValidation,
  getStatus,
  updateStatus,
};
