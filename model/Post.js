import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  slug: String,
  published: Boolean,
  author: String,
  content: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  comments: [{
    user: String,
    content: String,
    votes: Number
  }]
});

const Post = model('Post', postSchema);
export default Post;