const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.send("Email or Phone already registered! Please use another.");
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating new user
        const newUser = new User({ name, email, phone, address, password: hashedPassword });
        await newUser.save();

        req.session.user = { name, email, phone, address };
        res.status(201).render("home", { naming: name });

    } catch (error) {
        console.error("Signup error:", error);
        res.send("Error during signup!");
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });

        if (!user) return res.send("User not found! Please sign up.");

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            req.session.user = { name: user.name, email: user.email, phone: user.phone, address: user.address };
            res.status(201).render("home", { naming: user.name });
        } else {
            res.send("Incorrect password!");
        }
    } catch (error) {
        console.error(error);
        res.send("Login failed due to an error!");
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send("Error logging out");
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
};
