const mongoose = require("mongoose");

const FriendListSchema = new mongoose.Schema({
  userId: String,
  friends: [String],
});

module.exports = mongoose.model("FriendList", FriendListSchema);
