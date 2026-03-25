const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const signUpValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

async function postSignUp(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { name, lastName, email } = req.body;
    await db.createUser({
      name,
      lastName,
      email,
      password: hashedPassword,
      member: false,
      admin: false,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
}

async function getSignUp(req, res) {
  res.render("signUp");
}

module.exports = {
  getSignUp,
  postSignUp,
  signUpValidation,
};
