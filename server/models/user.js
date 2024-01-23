const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  achievementArray: [], // array of Achievement ids
  totalExp: Number,
});

// compile model from schema
module.exports = mongoose.model("User", UserSchema);
