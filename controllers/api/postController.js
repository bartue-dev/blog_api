const asyncHandler = require("express-async-handler");
const { postMethods } = require("../../db/prisma");
const CustomErr = require("../../utils/customErr");
const { validationResult } = require("express-validator");
const validator = require("../../validator/apiValidator");

//create post middleware controller
const createPost = [ validator.validateCreatePost, asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;

  if (!id) {
    const err = new CustomErr(`Unauthorized`, 401);
    next(err);
    return;
  }

  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      fail: true,
      errors: errors.array()
    });
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
})];

//get all post middleware controller
const getAllPost = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  
  if (!id) {
    const err = new CustomErr(`Unauthorized`, 401);
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

  if (!id) {
    const err = new CustomErr(`Unauthorized`, 401);
    next(err)
    return;
  } 

  if (!postId) {
    const err = new CustomErr(`Invalid postId:${postId}`, 400);
    next(err)
    return;
  }

  const post = await postMethods.getPost(id, postId);

  if (!post) {
    const err = new CustomErr(`Post not found`, 404);
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
const updatePost = [ validator.validateUpdatePost, asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const {title, content} = req.body;
  const { id } = req.user;
  
  if (!id) {
    const err = new CustomErr(`Unauthorized`, 401);
    next(err)
    return
  }

  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      fail: true,
      errors: errors.array()
    });
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
})];

//delete specifi post middleware controller
const deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { id } = req.user;

  if (!id) {
    const err = new CustomErr(`Invalid userId:${id}`, 400);
    next(err)
    return;
  } 

  if (!postId) {
    const err = new CustomErr(``, 400);
    next(err)
    return;
  } 

  const deletedPost = await postMethods.deletePost(postId, id);

  if (!deletedPost) {
    const err = new CustomErr(`${deletePost} cannot delete post`, 400);
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