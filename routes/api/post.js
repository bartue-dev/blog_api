const { Router } = require("express");
const router = Router();
const postCon = require("../../controllers/api/postController");
 
//api route

router.route("/")
  //get all post
  .get(postCon.getAllPost)
  //create post
  .post(postCon.createPost)

router.route("/:postId/")
  //get specific post with postId params
  .get(postCon.getPost)
  //update specific post with postId params
  .put(postCon.updatePost)
  //delete specific post with postId params
  .delete(postCon.deletePost)

module.exports = router;

