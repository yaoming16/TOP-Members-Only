const path = require("node:path");
require("dotenv").config();
const {
  localStrategy,
  serializeUser,
  deserializeUser,
} = require("./middleware/bcrypt");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const signUpRouter = require("./routers/signUpRouter");
const loginRouter = require("./routers/loginRouter");
const messagesRouter = require("./routers/messagesRouter");
const statusRouter = require("./routers/statusRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

passport.use(localStrategy());

passport.serializeUser((user, done) => {
  serializeUser(user, done);
});

passport.deserializeUser(async (id, done) => {
  await deserializeUser(id, done);
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/messages", messagesRouter);
app.use("/status", statusRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ msg: "Logged out correctly" });
  });
});

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
