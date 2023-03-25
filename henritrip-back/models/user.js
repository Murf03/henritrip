const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  adminKey: { type: String, required: true },
});

module.exports = mongoose.model("users", userSchema);
