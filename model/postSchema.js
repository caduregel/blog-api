const { default: mongoose } = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  user: String,
  message: String,
});

const postSchema = new Schema({
  title: String,
  published: Boolean,
  content: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  comments: [commentSchema]
});



const Comment = model('Comment', commentSchema)
const Post = model('Post', postSchema);
module.exports = { Post, Comment }