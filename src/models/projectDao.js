const { database } = require("./dataSource");
const { raiseCustomError } = require("../utils/error");
const { deleteFile } = require("../utils/s3");

const getProjectByProjectId = async (projectId) => {
  const [project] = await database.query(
    `SELECT
      (SELECT
        count (*)
      FROM
        orders
      WHERE
        project_id =?) cnt,
      PT.type,
      P.deadline,
      P.img_url,
      P.target_amount,
      P.opening,
      P.name,
      P.story,
      P.gift,
      P.gift_information,
      C.creator_nickname,
      C.explanation
  From
    project_types PT
  LEFT JOIN
    projects P
  ON
    PT.id = P.type_id
  LEFT JOIN
    creators C
  ON
    P.user_id = C.user_id
  WHERE
    P.id =?
    `,
    [projectId, projectId]
  );
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
  try {
    return await database.query(
      `INSERT INTO
        projects(
          user_id,
          type_id,
          name,
          img_url,
          summary,
          story,
          gift,
          gift_information,
          target_amount,
          opening,
          deadline)
      VALUES(?,?,?,?,?,?,?,?,?,?,?)
      `,
      [
        userId,
        category,
        title,
        url,
        summary,
        story,
        gift,
        gift_information,
        price,
        date_start,
        date_end,
      ]
    );
  } catch {
    const key = url.split("/")[3];
    deleteFile(key);
    raiseCustomError("INVALID_DATA_INPUT", 500);
  }
};

const getFilterByProjectType = async (projectType) => {
  const filterByProjectType = await database.query(
    `SELECT
    p.id,
    pt.type,
    p.name,
    p.gift,
    p.img_url,
    p.summary,
    p.target_amount,
    p.deadline,
    c.creator_nickname,
    OD.o,
    OD.o * p.gift AS gatheredAmount
  FROM
    projects p
    JOIN project_types pt ON p.type_id = pt.id
    JOIN creators c ON c.user_id = p.user_id
    LEFT JOIN (
      SELECT 
		project_id,
      count(*) o
    FROM
    orders GROUP BY project_id) OD ON p.id = OD.project_id
  ${projectType}
`
  );
  return filterByProjectType;
};

module.exports = {
  getProjectByProjectId,
  registerProject,
  getFilterByProjectType,
};
