const { Router } = require("express");
require('dotenv').config()
const { confirmUser } = require("../middleware/ErrorMiddleware");
const { default: mongoose } = require("mongoose");
const { createComment, deleteComment } = require("../controllers/commentController");

mongoose.connect(process.env.DATABASE_CONNECTION_URL)
const commentsRouter = Router()

// getting comments endpoints
commentsRouter.post("/:postId/new-comment", createComment)
commentsRouter.post('/:postId/:commentId/delete', confirmUser, deleteComment)

module.exports = { commentsRouter }