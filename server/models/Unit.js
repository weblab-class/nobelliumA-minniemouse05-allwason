const mongoose = require("mongoose");
import Entry from "./Entry";
const NotebookUnitSchema = new mongoose.Schema({
  user_id: String,
  entries: [Entry],
  header: String,
});
module.exports = mongoose.model("Entry", NotebookUnitSchema);
