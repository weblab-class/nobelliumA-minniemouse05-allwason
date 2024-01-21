const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  award: String,
  hasAttained: Boolean,
  expValue: Number,
});

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  achievements: [achievementSchema], //array of comments
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
