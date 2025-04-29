const { Router } = require("express");
const router = Router();
const logoutCon = require("../../controllers/auth/logout");

router.get("/", logoutCon);

module.exports = router;