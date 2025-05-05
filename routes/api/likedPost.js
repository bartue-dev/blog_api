const { Router } = require("express");
const router = Router();
const likedPostCon = require("../../controllers/api/likedPostController");

router.get("/",likedPostCon.getAllLikedPost);

router.route("/post/:postId")
  .post(likedPostCon.saveLikedPost)

router.route("/:likedId")
  .delete(likedPostCon.undoLikedPost)

module.exports = router;