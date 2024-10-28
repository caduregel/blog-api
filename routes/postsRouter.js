import express from 'express';
import { createCommentController, createPostController, getPostController, getPostsController } from '../controllers/postsController.js';
export const postsRouter = express.Router();

// postsRouter.get('/posts/:id', getPostController)
postsRouter.get('/posts', getPostsController)
postsRouter.get('/posts/:id', getPostController)
postsRouter.post('/posts/new-post', createPostController)
postsRouter.post('/posts/:id/new-comment', createCommentController)