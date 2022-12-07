const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { loginRequired } = require("../utils/checkUser");

router.get("/signin", userController.signIn);
router.get("/info", loginRequired, userController.nicknameAppear);

module.exports = router;
