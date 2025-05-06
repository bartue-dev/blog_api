const asyncHanlder = require("express-async-handler");
const { likedPostMethods } = require("../../db/likePostQueries");
const CustomErr = require("../../utils/customErr");
const { validationResult } = require("express-validator");
const { validateSaveLikedPost, validateUndoLikedPost } = require("../../validator/likedPostValidator");

const saveLikedPost = [validateSaveLikedPost, asyncHanlder(async (req, res, next) => {
  const { postId } = req.params;
  const { id } = req.user;

  if (!id) {
    const err = new CustomErr(`Unauthorized ${id}`, 401);
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

  const likedPost = await likedPostMethods.saveLikedPost(postId, id);

  if (!likedPost) {
    const err = new CustomErr(`Liked post: ${likedPost} cannot be saved`, 400);
    next(err);
    return;
  }

  res.status(201).json({
    success: true,
    data: {
      likedPost
    }
  });
})];

const getAllLikedPost = asyncHanlder(async (req, res, next) => {
  const { id } = req.user;

  if (!id) {
    const err = new CustomErr(`Unauthorized ${id}`, 401);
    next(err);
    return;
  }

  const allLikedPost = await likedPostMethods.getAllLikedPost(id);

  if (!allLikedPost) {
    const err = new CustomErr(`All liked post ${allLikedPost} cannot be rendered`);
    next(err);
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      allLikedPost
    }
  });
});

const undoLikedPost = [validateUndoLikedPost, asyncHanlder(async (req, res, next) => {
  const { likedId } = req.params;
  const { id } = req.user;
  
  if (!id) {
    const err = new CustomErr(`Unauthorized ${id}`, 401);
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

  const undoLikedPost = await likedPostMethods.undoLikedPost(likedId, id);

  if (!undoLikedPost) {
    const err = new CustomErr(`Undo liked post: ${undoLikedPost} cannot be undo`)
    next(err);
    return;
  }

  res.sendStatus(204)
})];

module.exports = {
  saveLikedPost,
  getAllLikedPost,
  undoLikedPost
}