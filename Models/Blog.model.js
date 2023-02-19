const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userID: { type: String, required: true },
});

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = { BlogModel };
