const mongoose = require("mongoose");

const AchievementsSchema = new mongoose.Schema({
  name: String, //name of user
  userId: String,
  awardName: String, //name of award
  hasAttained: Boolean,
  awardExp: Number,
});

// compile model from schema
module.exports = mongoose.model("Achievements", AchievementsSchema);
