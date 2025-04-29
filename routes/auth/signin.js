const { Router } = require("express");
const router = Router();
const signinCon = require("../../controllers/auth/signin");


router.post("/", signinCon);

module.exports = router;

