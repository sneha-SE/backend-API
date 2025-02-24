const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[0-9]{10,15}$/ 
  },
  address: { type: String, required: true },
  profileImage: { type: String, default: "/uploads/default.png" },
});

module.exports = mongoose.model("User", userSchema);
