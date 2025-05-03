const { body, param } = require("express-validator");

const isEmptyMsg = "must not be empty";

const validateCreatePost = [
  body("title").trim()
    .notEmpty().withMessage(`Title ${isEmptyMsg}`),
  body("content").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`)
]

const validateUpdatePost = [
  body("title").trim()
    .notEmpty().withMessage(`Title ${isEmptyMsg}`),
  body("content").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`),
  param("postId")
  .exists().withMessage("postId doesn't exist")
  .isUUID().withMessage("postId must be a valid UUID")
]

const validateGetPost = [
  param("postId")
    .exists().withMessage("postId doesn't exist")
    .isUUID().withMessage("postId is not a valid UUID")
]

const validateDeletePost = [
  param("postId")
    .exists().withMessage("postId doesn't exist")
    .isUUID().withMessage("postId is not a valid UUID")
]

module.exports = {
  validateCreatePost,
  validateUpdatePost,
  validateGetPost,
  validateDeletePost
}