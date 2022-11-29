const express = require("express");

const { upload } = require("../utils/s3");

const projectController = require("../controllers/projectController");
const { loginRequired } = require("../utils/checkUser");

const router = express.Router();

router.get("/:projectId", projectController.getProjectByProjectId);
router.post("", loginRequired, upload, projectController.registerProject);

module.exports = router;
