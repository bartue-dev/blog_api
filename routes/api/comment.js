const { Router } = require("express");
const router = Router();
const commentCon = require("../../controllers/api/commentController");

router.route("/post/:postId")
  .post(commentCon.createComment)
  .get(commentCon.getAllComments)

router.route("/:commentId")
  .post(commentCon.createChildComment)
  .put(commentCon.updateComment)
  .delete(commentCon.deleteComment)

module.exports = router;