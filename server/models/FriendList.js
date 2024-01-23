const mongoose = require("mongoose");

const FriendListSchema = new mongoose.Schema({
  userId: String,
  friends: [String],
  requests: [String],
  requested: [String],
});

module.exports = mongoose.model("FriendList", FriendListSchema);
