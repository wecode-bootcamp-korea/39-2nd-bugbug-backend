const { database } = require("./dataSource");

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

module.exports = {
  getProjectByProjectId,
};
