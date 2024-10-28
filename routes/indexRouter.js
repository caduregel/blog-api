import express from 'express';
import { authRouter } from './authRouter.js';
import { postsRouter } from './postsRouter.js';
export const routes = express.Router();

routes.use(authRouter);
routes.use(postsRouter)