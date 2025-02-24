const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Admin Dashboard
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin", { users });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Update User
router.put("/update-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone, address } = req.body;

    await User.findByIdAndUpdate(userId, { name, email, phone, address });
    res.json({ message: "User updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete User
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
