const { Router } = require("express");
require('dotenv').config()
const { confirmUser } = require("../middleware/ErrorMiddleware");
const { default: mongoose } = require("mongoose");
const { getPosts, getAdminPost, getPost, createPost, updatePost, deletePost, getAdminPosts } = require("../controllers/postController");
const passport = require("../config/passport.config");

mongoose.connect(process.env.DATABASE_CONNECTION_URL)
const postsRouter = Router()

// getting posts endpoints
postsRouter.get('/', getPosts)
postsRouter.get('/admin', confirmUser, getAdminPosts)
postsRouter.get('/:id', getPost)
postsRouter.get('/admin/:id', confirmUser, getAdminPost)

// Creating a post endpoint
postsRouter.post('/admin/new-post', confirmUser, createPost)

// Updating a post endpoint
postsRouter.post('/admin/:id/update', confirmUser, updatePost)
postsRouter.post('/admin/:id/delete', confirmUser, deletePost)



module.exports = { postsRouter }