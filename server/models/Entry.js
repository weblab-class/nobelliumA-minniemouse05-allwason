//https://docs.google.com/presentation/d/1-096jf5d_j9RhdTW_1PsGPb2rre7fSY_tmhFqhMVpWE/edit#slide=id.g764826f3d7_2_370
const mongoose = require("mongoose");
const EntrySchema = new mongoose.Schema({
  user_id: String,
  text: String,
  header: String,
});
module.exports = mongoose.model("Entry", EntrySchema);
