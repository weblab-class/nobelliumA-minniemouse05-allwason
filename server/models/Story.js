const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  userId: String,
  text: String,
  length: Number,
  latest: String,
});

// compile model from schema
module.exports = mongoose.model("Story", StorySchema);
