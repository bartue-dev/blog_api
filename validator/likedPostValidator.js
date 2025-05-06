const { param } = require("express-validator");

const validateSaveLikedPost = [
  param("postId")
    .exists().withMessage("postId doesn't exist")
    .isUUID().withMessage("postId is not a valid UUID")
]

const validateUndoLikedPost = [
  param("likedId")
  .exists().withMessage("likedId doesn't exist")
  .isUUID().withMessage("likedId is not a valid UUID"),
]


module.exports = {
  validateSaveLikedPost,
  validateUndoLikedPost
}