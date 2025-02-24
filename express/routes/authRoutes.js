const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/signup", (req, res) => res.render("signup"));
router.post("/signup", authController.signup);
router.get("/", (req, res) => res.render("login"));
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
