const { Router } = require("express");
const router = Router();
const postCon = require("../../controllers/api/postController");

//mock query. userId should not in params. 
router.route("/:userId")
  .get(postCon.getAllPost)
  .post(postCon.createPost)


router.route("/:postId/user/:userId")
  .get(postCon.getPost)
  .put(postCon.updatePost)
  .delete(postCon.deletePost)

module.exports = router;

