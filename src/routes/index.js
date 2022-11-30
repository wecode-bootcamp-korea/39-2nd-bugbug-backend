const express = require("express");

const router = express.Router();

const projectRouter = require("./projectRouter");
const userRouter = require("./userRouter");

router.use("/projects", projectRouter);
router.use("/user", userRouter);

module.exports = router;
