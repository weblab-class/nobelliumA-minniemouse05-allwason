const mongoose = require("mongoose");

const ToDoItemSchema = new mongoose.Schema({
  userId: String,
  name: String,
  completed: Boolean,
});

module.exports = mongoose.model("todoItem", ToDoItemSchema);
