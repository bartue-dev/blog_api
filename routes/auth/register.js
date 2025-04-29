const { Router } = require("express")
const router = Router();
const registerCon = require("../../controllers/auth/register");


router.post("/", registerCon);


module.exports = router;