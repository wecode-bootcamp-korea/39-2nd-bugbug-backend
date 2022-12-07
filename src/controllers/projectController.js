const fs = require("fs");

const projectService = require("../services/projectService");
const { catchAsync } = require("../utils/error");
const { uploadFile, unlinkFile } = require("../utils/s3");

const getProjectByProjectId = catchAsync(async (req, res) => {
  const project = await projectService.getProjectByProjectId(
    req.params.projectId
  );

  return res.status(200).json(project);
});

const registerProject = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const file = req.file;
  const project = JSON.parse(req.body.targetValue);

  let {
    title,
    summary,
    category,
    story,
    price,
    gift,
    gift_information,
    date_start,
    date_end,
  } = project;

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  const url = result.Location;

  await projectService.registerProject(
    userId,
    title,
    summary,
    url,
    category,
    story,
    price,
    gift,
    gift_information,
    date_start,
    date_end
  );

  return res.status(201).json({ message: "Project registered" });
});

const getFilterByProjectType = catchAsync(async (req, res) => {
  const filterByProjectType = await projectService.getFilterByProjectType(
    req.query.type
  );
  return res.status(200).json(filterByProjectType);
});

module.exports = {
  getProjectByProjectId,
  registerProject,
  getFilterByProjectType,
};
