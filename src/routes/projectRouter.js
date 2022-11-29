const express = require("express");

const projectController = require("../controllers/projectController");

const router = express.Router();

router.get("/:projectId", projectController.getProjectByProjectId);

module.exports = router;
