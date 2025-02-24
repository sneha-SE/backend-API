const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Signup Page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Login Page
router.get("/", (req, res) => {
  res.render("login");
});

// Signup API
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) return res.send("Email or Phone already registered!");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, phone, address, password: hashedPassword });
    await newUser.save();

    req.session.user = { name, email, phone, address };
    res.status(201).render("home", { naming: name });
  } catch (error) {
    res.send("Error during signup!");
  }
});

// Login API
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.send("User not found!");

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.send("Incorrect password!");

    req.session.user = user;
    res.status(201).render("home", { naming: user.name });
  } catch (error) {
    res.send("Login failed!");
  }
});

// Logout API
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;
