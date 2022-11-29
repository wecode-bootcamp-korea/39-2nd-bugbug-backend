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

module.exports = {
  getProjectByProjectId,
  registerProject,
};
