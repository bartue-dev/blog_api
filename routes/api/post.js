const { Router } = require("express");
const router = Router();
const postCon = require("../../controllers/api/postController");


router.get("/:userId", postCon.getAllPost);
router.post("/:userId", postCon.createPost);

module.exports = router;

