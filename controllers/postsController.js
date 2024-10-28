import expressAsyncHandler from "express-async-handler"
import Post from '../model/Post.js';

// Return all posts
const getPostsController = expressAsyncHandler(async (req, res, next) => {
    const posts = await Post.where("published").equals(true);

    return res.json({
        posts: [...posts]
    })
}
)

// Return a single post
const getPostController = expressAsyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)

  return res.json({
      post: post
  })
}
)

// Create a post
const createPostController = expressAsyncHandler(async(req, res, next)=>{
  console.log(req.body)
    const post = new Post({
        title: req.body.title,
        slug: req.body.slug,
        published: req.body.published,
        content: req.body.content,
        tags: [...req.body.tags],
      });
      await post.save();
      return res.json(post) 
})

// Create a comment on a post
const createCommentController = expressAsyncHandler(async(req, res)=>{
 
  const post = await Post.findById(req.params.id)
  const user = req.body.user ? req.body.user : "anonymous";
  const comment = {
    user: user,
    content: req.body.content,
    votes: Number(req.body.votes)
  }

  post.comments.push(comment)
  await post.save()
  return res.json(post)
})

export { getPostsController, createPostController, createCommentController, getPostController }