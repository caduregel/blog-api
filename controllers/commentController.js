const expressAsyncHandler = require("express-async-handler");
const { Post, Comment } = require("../model/postSchema");


// Creating a comment
const createComment = expressAsyncHandler(async (req, res, next) => {
    const postToAddComment = await Post.findById(req.params.postId)
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    const newComment = await new Comment({
        user: req.body.user,
        message: req.body.message
    })
    console.log(postToAddComment)
    postToAddComment.comments.push(newComment)
    await postToAddComment.save()
    res.status(200).json(postToAddComment)
})

// Deleting a comment
const deleteComment = expressAsyncHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.postId);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // Find the comment by ID and remove it
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.commentId);

    if (commentIndex === -1) {
        return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment from the array
    post.comments.splice(commentIndex, 1);

    // Save the updated post
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully", post });
})

module.exports = { createComment, deleteComment }