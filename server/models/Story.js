const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  userId: String,
  text: String,
});

// compile model from schema
module.exports = mongoose.model("Story", StorySchema);
