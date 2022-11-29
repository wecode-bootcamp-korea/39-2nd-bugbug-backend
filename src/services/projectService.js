const projectDao = require("../models/projectDao");
const { raiseCustomError } = require("../utils/error");

const getProjectByProjectId = async (projectId) => {
  const project = await projectDao.getProjectByProjectId(projectId);

  if (!project) {
    raiseCustomError("project does not exist", 404);
  }

  const gathered_amount = project.gift * project.cnt;
  const amountPercent = (gathered_amount / project.target_amount) * 100;
  project.gathered_People = project.cnt;
  project.gathered_amount = gathered_amount;
  project.amountPercent = amountPercent;
  return project;
};

module.exports = {
  getProjectByProjectId,
};
