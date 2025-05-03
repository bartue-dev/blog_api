const { body, param } = require("express-validator");

const isEmptyMsg = "must not be empty";

const validateCreateComment = [
  body("content").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`),
  param("postId")
    .exists().withMessage("postId doesn't exist")
    .isUUID().withMessage("postId must be a valid UUID") 
]

const validateCreateChildComment = [
  body("content").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`),
  param("commentId")
    .exists().withMessage("commentId doesn't exist")
    .isUUID().withMessage("commentId must be a valid UUID")
]

const validateGetAllComments = [
  param("postId")
    .exists().withMessage("postId doesn't exist")
    .isUUID().withMessage("postId must be a valid UUID")
]

const validateGetChildComments = [
  param("commentId")
    .exists().withMessage("CommentId doesn't exist")
    .isUUID().withMessage("CommentId is not a valid UUID")
]

const validateUpdateComment = [
  body("content").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`),
  param("commentId")
  .exists().withMessage("commentId doesn't exist")
  .isUUID().withMessage("commentId must be a valid UUID")
]

const validateDeleteComment = [
  param("commentId")
  .exists().withMessage("commentId doesn't exist")
  .isUUID().withMessage("commentId must be a valid UUID")
]

module.exports = {
  validateCreateComment,
  validateCreateChildComment,
  validateGetAllComments,
  validateGetChildComments,
  validateUpdateComment,
  validateDeleteComment
}