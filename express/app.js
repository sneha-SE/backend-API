const express = require("express");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const multer = require("multer");
const connectDB = require("./config/db"); // Import DB connection
const userRoutes = require("./routes/userRoutes"); // Import Routes
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Session middleware
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Use Routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
