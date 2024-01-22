const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  name: String, //name of user
  userId: String,
  totalExp: Number,
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
