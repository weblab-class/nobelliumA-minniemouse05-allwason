//https://docs.google.com/presentation/d/1-096jf5d_j9RhdTW_1PsGPb2rre7fSY_tmhFqhMVpWE/edit#slide=id.g764826f3d7_2_370
const mongoose = require("mongoose");
const FolderSchema = new mongoose.Schema({
  userId: String,
  folders: [String],
});
module.exports = mongoose.model("Folder", FolderSchema);
