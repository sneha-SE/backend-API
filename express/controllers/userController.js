const User = require("../models/userModel");
const path = require("path");

exports.getProfile = (req, res) => {
    if (!req.session.user) return res.redirect("/");
    res.render("profile", { user: req.session.user });
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render("admin", { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Server Error");
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, phone, address } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, phone, address },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ error: "User not found!" });

        res.json({ message: "User updated successfully!", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) return res.status(404).json({ error: "User not found!" });

        res.json({ message: "User deleted successfully!" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user" });
    }
};
