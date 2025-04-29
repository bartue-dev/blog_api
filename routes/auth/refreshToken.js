const { Router } = require("express");
const router = Router();
const refreshTokenCon = require("../../controllers/auth/refreshToken");

router.get("/", refreshTokenCon);

module.exports = router;