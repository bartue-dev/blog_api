const asyncHandler = require("express-async-handler");
const CustomErr = require("../../utils/customErr");
const { commentMethods } = require("../../db/commentQueries")
const { validationResult } = require("express-validator");
const validator = require("../../validator/commentValidator");

//create comment
const createComment = [validator.validateCreateComment, asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { id } = req.user;
  const { postId } = req.params;

  if (!id) {
    const err = new CustomErr("Unauthorized", 401);
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

  const createdComment = await commentMethods.createComment(content, id, postId);

  //check if createdComment return a value if not...
  if (!createdComment) {
    const err = new CustomErr(`Comment; ${createdComment} cannot be created`, 400)
    next(err)
    return
  }

  res.status(201).json({
    success: true,
    data: {
      createdComment
    }
  });
})];

//create child comment
const createChildComment = [validator.validateCreateChildComment, asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { id } = req.user;
  const { commentId } = req.params;

  if (!id) {
    const err = new CustomErr("Unauthorized", 401);
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

  const childComment = await commentMethods.creatChildComment(content, id, commentId);

  if (!childComment) {
    const err = new CustomErr(`Child comment: ${childComment} cannot be create`, 400);
    next(err);
    return
  }

  res.status(201).json({
    success: true,
    data: {
      childComment
    }
  })
})];

//getAllComment
const getAllComments = [validator.validateGetAllComments,asyncHandler(async (req, res, next) => {
  const { postId } = req.params
  const { id } = req.user;
  const { skip, take } = req.query;

  if (!id) {
    const err = new CustomErr(`Unauthorized: ${postId}`, 401);
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

  let allComments;
  if (skip !== undefined && take !== undefined) {
    allComments = await commentMethods.getAllComments(postId, skip, take);
  } else {
    allComments = await commentMethods.getAllComments(postId);
  }


  if (!allComments) {
    const err = new CustomErr(`Comments: ${allComments} cannot be found`, 400);
    next(err);
    return
  }

  res.status(200).json({
    success: true,
    data: {
      allComments
    }
  })
})];

//get child comments
const getChildComments = [validator.validateGetChildComments, asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;
  const { id } = req.user;
  const { skip, take } = req.query

  if (!id) {
    const err = new CustomErr(`Unauthorized ${id}`, 401);
    next(err);
    return;
  }

  let childComments;
  if (skip !== undefined && take !== undefined) {
    childComments = await commentMethods.getChildCommentsWithPagination(commentId, skip, take);
  } else {
    childComments = await commentMethods.getChildComments(commentId);
  }


  if (!childComments) {
    const err = new CustomErr(`Comments: ${childComments} cannot be found`, 404);
    next(err);
    return
  }

  res.status(200).json({
    success: true,
    data: {
      childComments
    }
  });
})];

//update comment
const updateComment = [validator.validateUpdateComment, asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { id } = req.user;
  const { commentId } = req.params;

  if (!id) {
    const err = new CustomErr(`Unauthorized ${id}`, 401);
    next(err);
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

  const updatedComment = await commentMethods.updateComment(content, id, commentId);

  if (!updatedComment) {
    const err = new CustomErr(`Comment: ${updatedComment} cannot updated comment`, 400)
    next(err);
    return
  }

  res.status(200).json({
    success: true,
    data: {
      updatedComment
    }
  });
})];

//delete comment
const deleteComment = [validator.validateDeleteComment, asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;
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

  const deletedComment = await commentMethods.deleteComment(commentId, id);

  if (!deletedComment) {
    const err = new CustomErr(`Comment: ${deletedComment}, Cannot be deleted`, 400);
    next(err);
    return;
  }

  res.sendStatus(204)
})];


module.exports = {
  createComment,
  createChildComment,
  getAllComments,
  getChildComments,
  updateComment,
  deleteComment
}