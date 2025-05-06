const { Router } = require("express");
const router = Router();
const publicData = require("../../controllers/api/publicData");
 
//api route

router.get("/", publicData.getPublicPost)

module.exports = router;

