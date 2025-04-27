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

  res.status(200).json({
    staus: 200,
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
    status: 200,
    data: {
      posts
    }
  });
});

module.exports = {
  createPost,
  getAllPost
}