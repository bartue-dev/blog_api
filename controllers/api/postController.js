const asyncHandler = require("express-async-handler");
const { postMethods } = require("../../db/prisma");
const CustomErr = require("../../utils/customErr");

//create post middleware controller
const createPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;

  if (!title || !content) {
    const err = new CustomErr(`Invalid data: ${title} or ${content}`, 400);
    next(err);
    return
  }

  const post = await postMethods.createPost(title, content, id)

  if (!post) {
    const err = new CustomErr(`Cannot create Post`, 400);
    next(err);
    return
  }

  res.status(201).json({
    sucess: true,
    data: {
      post
    }
  });
});

//get all post middleware controller
const getAllPost = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  
  if (!id) {
    const err = new CustomErr(`Invalid ${userId}`, 400);
    next(err)
    return
  }

  const posts = await postMethods.getAllPost(id);

  if (!posts) {
    const err = new CustomErr(`${posts} not found`, 404);
    next(err);
    return;
  }

  res.status(200).json({
    sucess: true,
    data: {
      posts
    }
  });
});

//get single post middleware controller
const getPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { id } = req.user;

  console.log("this is get post!")

  if (!id || !postId) {
    const err = new CustomErr(`Invalid params: userId:${id} or postId:${postId}`);
    next(err)
    return;
  } 

  const post = await postMethods.getPost(id, postId);

  if (!post) {
    const err = new CustomErr(`${post} not found`, 404);
    next(err);
    return;
  }

  res.status(200).json({
    sucess: true,
    data: {
      post
    }
  });
});

//update post middleware controller
const updatePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const {title, content} = req.body;
  const { id } = req.user;

  console.log("UpdatePost req.body:", content);
  

  if (!req.params || !req.body) {
    const err = new CustomErr(`invalid params:${req.params} or body:${req.body}`)
    next(err)
    return
  }

  const updatedPost = await postMethods.updatePost(postId, id, title, content);

  if (!updatedPost) {
    const err = new CustomErr(`${updatedPost} cannot update post`, 400);
    next(err);
    return;
  }

  res.status(200).json({
    sucess: true,
    data: {
      updatedPost
    }
  });
});

//delete specifi post middleware controller
const deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { id } = req.user;

  if (!postId || !id) {
    const err = new CustomErr(`Incorrect data: ${postId} or ${id}`, 400);
    next(err);
    return;
  }

  const deletedPost = await postMethods.deletePost(postId, id);

  if (!deletedPost) {
    const err = new CustomErr(`${deletePost} cannot delete post`);
    next(err);
    return;
  }

  res.sendStatus(204)
});

module.exports = {
  createPost,
  getAllPost,
  getPost,
  updatePost,
  deletePost
}