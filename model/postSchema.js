const { default: mongoose } = require("mongoose");
const { Schema, model } = mongoose;


const postSchema = new Schema({
  title: String,
  published: Boolean,
  content: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  comments: [{
    id: String,
    user: String,
    message: String,
    _id: false,
  }]
});

const Post = model('Post', postSchema);
module.exports = { Post }