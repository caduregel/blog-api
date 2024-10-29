const expressAsyncHandler = require("express-async-handler");
const { Post } = require("../model/postSchema");
const { default: mongoose } = require("mongoose");

// Controller for getting published posts as an anonymous user
const getPosts = expressAsyncHandler(async (req, res, next) => {
    const posts = await Post.where('published').equals("true")
    return res.status(200).json(posts)
})

// Controller for getting posts as an admin user, with a filter property for only published/unpublished
const getAdminPosts = expressAsyncHandler(async (req, res, next) => {
    const posts = await Post.find()
    return res.status(200).json(posts)
})

// Controller for getting a single published post
const getPost = expressAsyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)
    if(post.published == false){
        return res.status(401).json({Error: "you dont have permission to view this post"})
    } else {
        return res.status(200).json(post)
    }
})

// Controller for getting a single unpublished posts
const getAdminPost = expressAsyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)
    return res.status(200).json(post)
})

// Controller for creating a post
const createPost = expressAsyncHandler(async (req, res, next) => {
    const newPost = await new Post({
        title: req.body.title,
        published: req.body.published,
        content: req.body.content,
        tags: [...req.body.tags],
    });
    await newPost.save()
    res.status(200).json(newPost)

})
// Controller for updating a post
const updatePost = expressAsyncHandler(async (req, res, next) => {
    const postToUpdate = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        published: req.body.published,
        content: req.body.content,
        tags: [...req.body.tags],
    }, {new: true})
    await postToUpdate.save()
    res.status(200).json(postToUpdate)
})

// Controller for deleting a post
const deletePost = expressAsyncHandler(async (req, res, next) => {
    const postToDelete = await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({result: "post deleted"})
})

module.exports = { getPosts, getAdminPost, getPost, getAdminPosts, createPost, updatePost, deletePost }