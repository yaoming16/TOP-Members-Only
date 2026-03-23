const path = require("node:path");
const { Pool } = require("pg");
const { localStrategy, serializeUser, deserializeUser } = require("./middleware/bcrypt");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(localStrategy());

passport.serializeUser((user, done) => {
  serializeUser(user, done);
});

passport.deserializeUser((id, done) => {
  deserializeUser(id, done);
});

