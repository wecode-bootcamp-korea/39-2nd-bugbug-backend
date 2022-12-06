const express = require("express");

const router = express.Router();

const projectRouter = require("./projectRouter");
const userRouter = require("./userRouter");
const paymentRouter = require("./paymentRouter");

router.use("/projects", projectRouter);
router.use("/user", userRouter);
router.use("/payments", paymentRouter);

module.exports = router;
