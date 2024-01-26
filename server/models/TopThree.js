const mongoose = require("mongoose");

const TopThreeSchema = new mongoose.Schema({
  arrayId: Number,
  results: [],
  // [{userId: as124fa23s454df,  name: "minnie", totalExp: 10}, {}, {}]
});

// compile model from schema
module.exports = mongoose.model("topthree", TopThreeSchema);
