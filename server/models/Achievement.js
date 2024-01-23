const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  achievementId: Number,
  awardDescription: String, //description of achievement
  awardName: String, //name of achievement
});

// compile model from schema
module.exports = mongoose.model("achievements", AchievementSchema);
