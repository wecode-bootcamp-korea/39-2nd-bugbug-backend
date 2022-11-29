const projectService = require("../services/projectService");
const { catchAsync } = require("../utils/error");

const getProjectByProjectId = catchAsync(async (req, res) => {
  const project = await projectService.getProjectByProjectId(
    req.params.projectId
  );

  return res.status(200).json(project);
});

module.exports = {
  getProjectByProjectId,
};
