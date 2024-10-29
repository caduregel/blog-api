const { Router } = require("express");
const { registerController, logInController } = require("../controllers/authControllers");
const { postsRouter } = require("./postsRouter");
const { confirmRegister } = require("../middleware/ErrorMiddleware");
const { commentsRouter } = require("./commentRouter");

const indexRouter = Router()

indexRouter.get('/api', (req, res)=>{res.json({})})


// user authentication
indexRouter.post('/api/register', confirmRegister ,registerController )
indexRouter.post('/api/auth/login', logInController)

// Posts router
indexRouter.use('/api/posts', postsRouter)

// Comments router
indexRouter.use('/api/comments', commentsRouter)

module.exports = indexRouter