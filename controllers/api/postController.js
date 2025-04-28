const asyncHandler = require("express-async-handler");
const { postMethods } = require("../../db/prisma");
const CustomErr = require("../../utils/customErr");

const createPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const { userId } = req.params;

  if (!title || !content) {
    const err = new CustomErr(`Invalid data: ${title} or ${content}`, 400);
    next(err);
    return
  }

  const post = await postMethods.createPost(title, content, userId)

  res.status(201).json({
    sucess: true,
    data: {
      post
    }
  });
});

const getAllPost = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  
  if (!userId) {
    const err = new CustomErr(`Invalid ${userId}`, 400);
    next(err)
    return
  }

  const posts = await postMethods.getAllPost(userId);

  res.status(200).json({
    sucess: true,
    data: {
      posts
    }
  });
});

const getPost = asyncHandler(async (req, res, next) => {
  const {userId, postId} = req.params

  console.log("this is get post!")

  if (!userId || !postId) {
    const err = new CustomErr(`Invalid params: userId:${userId} or postId:${postId}`);
    next(err)
    return;
  } 

  const post = await postMethods.getPost(userId, postId);

  res.status(200).json({
    sucess: true,
    data: {
      post
    }
  })

});

const updatePost = asyncHandler(async (req, res, next) => {
  const { postId, userId } = req.params;
  const {title, content} = req.body;

  if (!req.params || !req.body) {
    const err = new CustomErr(`invalid params:${req.params} or body:${req.body}`)
    next(err)
    return
  }

  const updatedPost = await postMethods.updatePost(postId, userId, title, content);

  res.status(200).json({
    sucess: true,
    data: {
      updatedPost
    }
  });
});

const deletePost = asyncHandler(async (req, res, next) => {
  const { postId, userId } = req.params;

  if (!req.params) {
    const err = new CustomErr(`Invalid params: ${req.params}`);
    next(err);
    return
  }

  await postMethods.deletePost(postId, userId);

  res.sendStatus(204)
});

module.exports = {
  createPost,
  getAllPost,
  getPost,
  updatePost,
  deletePost
}