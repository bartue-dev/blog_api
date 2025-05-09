const asyncHandler = require("express-async-handler");
const { postMethods } = require("../../db/postQueries");
const CustomErr = require("../../utils/customErr");
const { validationResult } = require("express-validator");
const validator = require("../../validator/postValidator");

//create post
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
      status: 400,
      message: "validation error",
      error: errors.array()
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

//get all post with specific user
const getAllPost = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { skip, take } = req.query;
  
  if (!id) {
    const err = new CustomErr(`Unauthorized`, 401);
    next(err)
    return
  }

  let posts;

  if (skip !== undefined && take !== undefined) {
    posts = await postMethods.getAllPostWithPagination(id, skip, take) 
  } else {
    posts = await postMethods.getAllPost(id);
  }

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

//get single post with specific user
const getPost = [validator.validateGetPost,asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { id } = req.user;

  if (!id) {
    const err = new CustomErr(`Unauthorized`, 401);
    next(err)
    return;
  } 

 //validation
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({
     status: 400,
     message: "validation error",
     error: errors.array()
   });
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
})];

//update post
const updatePost = [validator.validateUpdatePost, asyncHandler(async (req, res, next) => {
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
      status: 400,
      message: "validation error",
      error: errors.array()
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

//delete specifi post
const deletePost = [validator.validateDeletePost, asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { id } = req.user;

  if (!id) {
    const err = new CustomErr(`Invalid userId:${id}`, 400);
    next(err)
    return;
  } 

  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: "validation error",
      error: errors.array()
    });
  }

  const deletedPost = await postMethods.deletePost(postId, id);

  if (!deletedPost) {
    const err = new CustomErr(`${deletePost} cannot delete post`, 400);
    next(err);
    return;
  }

  res.sendStatus(204)
})];

module.exports = {
  createPost,
  getAllPost,
  getPost,
  updatePost,
  deletePost
}