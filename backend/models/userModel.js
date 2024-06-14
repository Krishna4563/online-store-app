const mongoose = require("mongoose");

let User;
try {
  User = mongoose.model("User");
} catch (error) {
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  User = mongoose.model("User", userSchema);
}

module.exports = User;
