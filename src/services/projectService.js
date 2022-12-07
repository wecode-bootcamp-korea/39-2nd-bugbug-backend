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
  project.id = projectId;
  return project;
};

const registerProject = async (
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
) => {
  return await projectDao.registerProject(
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
};

const getFilterByProjectType = async (projectType) => {
  let projectT;
  const projectFiltering = (projectType) => {
    if (!projectType) {
      return (projectT = ``);
    }
    projectT = `WHERE p.type_id = ${projectType}`;

    return projectT;
  };
  await projectFiltering(projectType);
  let filterByProjectType = await projectDao.getFilterByProjectType(projectT);
  return filterByProjectType;
};

module.exports = {
  getProjectByProjectId,
  registerProject,
  getFilterByProjectType,
};
