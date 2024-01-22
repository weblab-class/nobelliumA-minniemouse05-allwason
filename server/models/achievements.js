const mongoose = require("mongoose");

const SingleAchievementSchema = new mongoose.Schema({
  award: String,
  hasAttained: Boolean,
  expValue: Number,
});

const AchievementsSchema = new mongoose.Schema({
  name: String, //name of user
  userId: String,
  achievements: [SingleAchievementSchema], //array of comments
});

// compile model from schema
module.exports = mongoose.model("Achievements", AchievementsSchema);
